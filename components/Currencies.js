import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import FlatListCoins from './FlatListCoins';
import { fetchAllCoins } from '../services/fetchAllCoins';
import SearchCoins from './SearchCoins';
import Intervals from './Intervals'
import QuoteCurrencies from './QuoteCurrencies';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';

const Currencies = React.memo(() => {
  const [listCoins, setListCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  const { quoteCurrencies} = useContext(OptionsCurrenciesContext);

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

  return (
    <SafeAreaView style={styles.container}>
      <SearchCoins />

      <Intervals />
      <QuoteCurrencies />
      {loading ? (
        /* Show a loading indicator here if needed */
        <Text>Loading...</Text>
      ) : (
        <FlatListCoins listCoins={
          listCoins.filter(coin => {
            const checked = quoteCurrencies.filter(crypto => crypto.checked);
            return checked.some(crypto => coin.pair.endsWith(crypto.name));
          })
        } />
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
