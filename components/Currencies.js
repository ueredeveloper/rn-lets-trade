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
import searchCurrencies from './SearchCurrencies';

const Currencies = ({ navigation }) => {
  
  const [listCoins, setListCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [sortedCoins, setSortedCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { quoteCurrencies, indicatorsCurrencies, intervals, searchCurrencies } = useContext(OptionsCurrenciesContext);

  const [interval, setInterval] = useState('1d');

  // Buscar todas as moedas ao renderizar pela primeira vez
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const fetchedCoins = await fetchAllCoins();
        setListCoins(fetchedCoins);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();

  }, []);



  /**
   * Mudar o intervalo de pesquisa dos candles (1h, 2h, 1d, ...)
   */
  useEffect(() => {
    let interval = intervals.find(i => i.checked === true);
    setInterval(interval.name);
  }, [intervals]);

  /**
 * Filtra as moedas com base no tipo de moeda de cotação (USDT, BNB, etc.) e na palavra-chave digitada pelo usuário.
 * @param {Array} listCoins - Lista de moedas a serem filtradas.
 * @param {Array} quoteCurrencies - Lista de moedas de cotação a serem consideradas no filtro.
 * @param {string} searchCurrencies - Palavra-chave digitada pelo usuário para busca.
 */
  useEffect(() => {
    // Filtra moedas com base nas moedas de cotação selecionadas e na palavra-chave digitada pelo usuário.
    setFilteredCoins(listCoins.filter(coin => {
      const checked = quoteCurrencies.filter(crypto => crypto.checked);
      return checked.some(crypto => coin.pair.endsWith(crypto.name) && coin.pair.toLowerCase().indexOf(searchCurrencies.toLowerCase()) > -1);
    }));

  }, [listCoins, quoteCurrencies, searchCurrencies]);

  /**
 * Filtra as moedas com base na posição próxima à linha inferior do indicador Bollinger Bands. 
 * Como são por volta de 475 moedas pareadas com USDT, busca de 50 em 50.
 * @param {Array} indicatorsCurrencies - Array de indicadores de moedas.
 */
  useEffect(() => {
    // Encontra a moeda indicadora selecionada
    let indicatorCurrency = indicatorsCurrencies.find(ic => ic.checked === true);
    // Verifica se o indicador selecionado é 'BolllingerBands'
    if (indicatorCurrency.name === 'BolllingerBands') {
      (async () => {
        try {
          // Moedas a serem buscadas
          const coinsToFetch = filteredCoins;
          const fetchedCoins = [];

          // Itera sobre as moedas para buscar informações
          for (let i = 0; i < coinsToFetch.length; i += 50) {
            const chunk = coinsToFetch.slice(i, i + 50);
            // Busca as velas (candles) para cada moeda
            const updatedCoins = await Promise.all(
              chunk.map(async coin => {
                const fetchedCandles = await fetchCandles(coin.pair, 36, interval);
                const bollingerBands = calculateBollingerBands(14, fetchedCandles);
                const candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles);

                return { ...coin, bollingerBands, candles };
              })
            );

            fetchedCoins.push(...updatedCoins);
            let sortedCoins = sortByBollingersLowerAndCandlesClose(fetchedCoins)

            // Adiciona as moedas atualizadas ao estado utilizando push
            setFilteredCoins(sortedCoins);

            console.log(fetchedCoins.length)

            if (i + 50 < coinsToFetch.length) {
              // Aguarda 3 segundos antes de fazer a próxima requisição
              await new Promise(resolve => setTimeout(resolve, 3000));
            }
          }

        } catch (error) {
          console.error('Error fetching candles:', error);
        }
      })();
    }
  }, [indicatorsCurrencies]);



  // Teste
  useEffect(() => {
    // criação de objeto para teste no js fiddle
    /*let sc = sortedCoins.map(sc => {
      return {
        bollingerBands: { lower: sc.bollingerBands.lower },
        candles: sc.candles.map(c => { return { close: c.close } })
      }
    })*/

    //console.log(JSON.stringify(sc))
  }, [sortedCoins])

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
        <FlatListCoins listCoins={filteredCoins} navigation={navigation} />
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
