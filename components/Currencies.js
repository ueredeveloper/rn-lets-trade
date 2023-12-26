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

  const [loading, setLoading] = useState(true);
  const { filteredCurrencies, } = useContext(OptionsCurrenciesContext);

  // Buscar todas as moedas ao renderizar pela primeira vez
  useEffect(() => {
    console.log(filteredCurrencies.length)
    // if (filteredCurrencies.length>0) {
    setLoading(false)
    // }
  }, []);



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

        <FlatListCoins listCoins={filteredCurrencies} navigation={navigation} />

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
