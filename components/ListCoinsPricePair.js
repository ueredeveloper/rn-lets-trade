import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
} from 'react-native';
import Binance from 'binance-api-react-native';
import { BINANCE_API_KEY, BINANCE_SECRECT_KEY } from "@env";
import FlatListCoins from './FlatListCoins';

const ListCoinsPricePair = () => {

  const [listCoins, setListCoins] = useState([]);

  const client = Binance({
    apiKey: BINANCE_API_KEY,
    apiSecret: BINANCE_SECRECT_KEY,
  });

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const prices = await client.prices();
        // Convert object to array of objects
        const _listCoins = Object.entries(prices).map(([pair, price]) => ({
          pair: pair,
          price: price,
        }));
        setListCoins(_listCoins); // Update coins state with the fetched data
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    };

    fetchPrices();
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
