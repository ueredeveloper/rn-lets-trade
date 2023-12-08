import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import FlatListCoins from './FlatListCoins';
import { fetchAllCoins } from '../services/fetchAllCoins';


const ListCoinsPricePair = () => {

  const [listCoins, setListCoins] = useState([]);

  useEffect(() => {

    (async () => {
      try {
        const listCoins = await fetchAllCoins(); // Replace with your actual method
        setListCoins(listCoins);
      } catch (error) {
        console.error('Error fetching coins:', error);
      }
    })();

  }, []);

  return (
    <SafeAreaView>
      <FlatListCoins listCoins={listCoins} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

export default ListCoinsPricePair;
