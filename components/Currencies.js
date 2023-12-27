import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FlatListCoins from './FlatListCoins';
import SearchCurrencies from './SearchCurrencies';
import Intervals from './Intervals'
import QuoteCurrencies from './QuoteCurrencies';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import IndicatorsCurrencies from './IndicatorsCurrencies';

const Currencies = ({ navigation }) => {

  const [loading, setLoading] = useState(true);
  const { filteredCurrencies } = useContext(OptionsCurrenciesContext);

  useEffect(() => {
    if (filteredCurrencies) {
      setLoading(false)
    }
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
