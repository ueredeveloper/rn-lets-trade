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

const Currencies = React.memo(() => {
  const [listCoins, setListCoins] = useState([]);
  const [filteredCoins, setFilteredCoins] = useState([]);
  const [sortedCoins, setSortedCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { quoteCurrencies, indicatorsCurrencies, intervals } = useContext(OptionsCurrenciesContext);


  const [interval, setInterval] = useState('1d');

  useEffect(() => {
    let interval = intervals.find(i => i.checked === true);
    setInterval(interval.name);
  }, [intervals])

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

  useEffect(() => {

    setFilteredCoins(listCoins.filter(coin => {
      const checked = quoteCurrencies.filter(crypto => crypto.checked);
      return checked.some(crypto => coin.pair.endsWith(crypto.name));
    }));

  }, [listCoins, quoteCurrencies])

  useEffect(() => {
    let indicatorCurrency = indicatorsCurrencies.find(ic => ic.checked === true);

    if (indicatorCurrency.name === 'BolllingerBands') {
      (async () => {
        try {
          let bolllingerAndCandles = await Promise.all(
            filteredCoins.slice(0, 60).map(async coin => {
              const fetchedCandles = await fetchCandles(coin.pair, 36, interval);
              const bollingerBands = calculateBollingerBands(14, fetchedCandles);
              const candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles);

              return { ...coin, bollingerBands, candles };
            })
          );

          let sortedCoins = sortByBollingersLowerAndCandlesClose(bolllingerAndCandles)
          //setSortedCoins(sortedCoins);
          setFilteredCoins(sortedCoins)
        } catch (error) {
          console.error('Error fetching candles:', error);
        }
      })();
    }
  }, [indicatorsCurrencies]);



  useEffect(() => {
    // criação de objeto para teste no js fiddle
    let sc = sortedCoins.map(sc => {
      return {
        bollingerBands: { lower: sc.bollingerBands.lower },
        candles: sc.candles.map(c => { return { close: c.close } })
      }
    })

    console.log(JSON.stringify(sc))
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
        <FlatListCoins listCoins={filteredCoins} />
      )}

    </SafeAreaView>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //marginTop: StatusBar.currentHeight || 0,
  },
});

export default Currencies;
