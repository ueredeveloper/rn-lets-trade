import React, { useEffect, useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text } from 'react-native';
import FlatListCoins from './FlatListCoins';
import { fetchAllCoins } from '../services/fetchAllCoins';
import SearchCoins from './SearchCoins';
import Intervals from './Intervals'
import Pairs from './Pairs';

const ListCoinsPricePair = React.memo(() => {
  const [listCoins, setListCoins] = useState([]);
  const [loading, setLoading] = useState(true);

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
      <Intervals/>
      <Pairs/>
      <SearchCoins/>
      {loading ? (
        /* Show a loading indicator here if needed */
        <Text>Loading...</Text>
      ) : (
        <FlatListCoins listCoins={listCoins} />
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

export default ListCoinsPricePair;
