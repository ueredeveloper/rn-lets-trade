import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LineChart = () => {
  const showCoin = () => {
    return (
      <View style={styles.text}>
        <Text> BTCUSDT</Text>
        <Text> $ 47,000</Text>
      </View>
    );
  };
  return (
    <View><Text> My line chart </Text></View>
  );
};

const styles = StyleSheet.create({
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default LineChart;
