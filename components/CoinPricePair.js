import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../colors';

const CoinPricePair = ({ pair, price }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{pair}</Text>
    <Text style={styles.text}>{price}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.background,

    margin: 1,
  },
  text: {
    color: colors.text,
    padding: 10,
  },
});

export {CoinPricePair};
