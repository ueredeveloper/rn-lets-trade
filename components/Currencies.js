import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import FlatListCoins from './FlatListCoins';
import { fetchAllCoins } from '../services/fetchAllCoins';
import SearchCurrencies from './SearchCurrencies';
import Intervals from './Intervals'
import QuoteCurrencies from './QuoteCurrencies';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import { fetchCandles } from '../services/fetchCandles';
import { calculateBollingerBands } from '../utilities/calculateBollingerBands';
import { calculateRecentCandles } from '../utilities/calculateRecenteCandles';
import IndicatorsCurrencies from './IndicatorsCurrencies';
import { sortByBollingersLowerAndCandlesClose } from '../utilities/sortByBollingersLowerAndCandlesClose';
import { listCurrenciesByIndicator } from '../utilities/listCurrenciesByIndicator';
import { insertCurrency } from '../services/db';

const Currencies = ({ navigation }) => {

  const [sortedCoins, setSortedCoins] = useState([]);
  const [loading, setLoading] = useState(true);


  const {
    quoteCurrencies,
    indicatorsCurrencies,
    intervals,
    searchCurrencies,
    listAllCurrencies, setListAllCurrencies,
    listFilteredByQuotation, setListFilteredByQuotation,
    listFilteredByIndicator, setListFilteredByIndicator,
    dbCurrencies } = useContext(OptionsCurrenciesContext);

  const [interval, setInterval] = useState('1d');

  // Buscar todas as moedas ao renderizar pela primeira vez
  useEffect(() => {
    if (listAllCurrencies.length>0) {
      setLoading(false)
    }
  }, []);

  /**
   * Mudar o intervalo de pesquisa dos candles (1h, 2h, 1d, ...)
   */
  useEffect(() => {
    let interval = intervals.find(i => i.checked === true);
    setInterval(interval.name);
  }, [intervals]);

  useEffect(() => {
    let indicatorCurrency = indicatorsCurrencies.find(ic => ic.checked === true);

    // Verifica se o indicador selecionado é 'BolllingerBands'
    if (indicatorCurrency.name === 'Bolllinger Bands' && listFilteredByIndicator.length === 0) {
      (async () => {
        try {
          // Moedas a serem buscadas
          const coinsToFetch = listAllCurrencies.filter(coin => {
            const checked = quoteCurrencies.filter(qc => qc.checked);
            return checked.some(crypto => coin.pair.endsWith(crypto.name));
          });
          //ex: [{"pair": "BTCUSDT", "price": "43663.64000000"},]
          const fetchedCoins = [];

          // Itera sobre as moedas para buscar informações
          for (let i = 0; i < coinsToFetch.length; i += 50) {
            const chunk = coinsToFetch.slice(i, i + 50);
            // Busca as velas (candles) para cada moeda
            const updatedCoins = await Promise.all(
              chunk.map(async coin => {
                //ex: coin => {"pair": "CELOUSDT", "price": "0.69000000"}


                // ex: fetchCandles ('ETHDOWNUSDT', 46, '1d')
                const fetchedCandles = await fetchCandles(coin.pair, 46, interval);
                // return fetchedCandles -> [{"baseAssetVolume": ".0", "close": "0.", "quoteVolume": "0", "trades": 0, "volume": ""}, {"baseAssetVolume": ...]
                const bollingerBands = calculateBollingerBands(20, fetchedCandles);
                // return -> bollingerBands -> {"lower": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,...}

                // ex calculateRecentCandles( 27 [{"baseAssetVolume": "8881899022.0", "close": "0.0", "closeTime": 0, "high": "0.0",
                const candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles);
                //ex: candles -> [{"baseAssetVolume": "4022022447.0", "close": "0.0", "closeTime": 0, "high": 

                // return ->  {"pair": "BTTUSDT", "price": "0.00277700"} {"lower": 
                return { ...coin, bollingerBands, candles };
              })
            );

            fetchedCoins.push(...updatedCoins);
            // Sortear pela mais próxima da linha mais baixa (lower) do indicador bollinger bands.
            let sortedCoins = sortByBollingersLowerAndCandlesClose(fetchedCoins)

            // Adiciona as moedas atualizadas ao estado utilizando push
            setListFilteredByIndicator(sortedCoins);

            console.log('use eff indicator cur ', fetchedCoins.length)

            if (i + 50 < coinsToFetch.length) {
              // Aguarda 1 segundo antes de fazer a próxima requisição
              await new Promise(resolve => setTimeout(resolve, 1000));
            }
          }

        } catch (error) {
          console.error('Error fetching candles:', error);
        }
      })();
    }

  }, [indicatorsCurrencies, listFilteredByIndicator, quoteCurrencies]);
/*
  const [listFilteredBySearch, setListFilteredBySearch]  = useState([])
  useEffect(() => {
    // Filtra moedas com base nas moedas de cotação selecionadas e na palavra-chave digitada pelo usuário.
    let filterBySearch = listAllCurrencies.filter(coin => {
      const checked = quoteCurrencies.filter(crypto => crypto.checked);
      return checked.some(crypto => coin.pair.endsWith(crypto.name) && coin.pair.toLowerCase().indexOf(searchCurrencies.toLowerCase()) > -1);
    });

    setListFilteredByQuotation(filterBySearch)


    console.log('currencias filter coins ', filterBySearch)

  }, [listAllCurrencies, quoteCurrencies, searchCurrencies]);*/

  return (
    <SafeAreaView style={styles.container}>

      <SearchCurrencies />
      <Intervals />
      <QuoteCurrencies />
      <IndicatorsCurrencies />
      {loading ? (
        /* Show a loading indicator here if needed */
        <Text>Loading...</Text>
      ) : (

        <FlatListCoins listCoins={
          listFilteredByIndicator.length !== 0 ? 
            listFilteredByIndicator : listFilteredByQuotation
          } navigation={navigation} />

      )}

    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Currencies;
