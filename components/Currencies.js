import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import FlatListCoins from './ListCurrencies';
import SearchCurrencies from './SearchCurrencies';
import Intervals from './Intervals'
import QuoteCurrencies from './QuoteCurrencies';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import IndicatorsCurrencies from './IndicatorsCurrencies';

const Currencies = ({ navigation }) => {

  // HomeScreen -> Currencies

  const [loading, setLoading] = useState(true);
  const { whiteListCurrencies } = useContext(OptionsCurrenciesContext);

  useEffect(() => {
    if (whiteListCurrencies) {
      setLoading(false)
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
       {/*console.log('currencies render')*/}
      <SearchCurrencies />
      <Intervals />
      <QuoteCurrencies />
      <IndicatorsCurrencies />
      {loading ? (
        /* Show a loading indicator here if needed */
        <Text>Loading...</Text>
      ) : (

        <FlatListCoins currencies={whiteListCurrencies} navigation={navigation} />

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
