import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';
import { calculateBollingerBands } from '../utilities/calculateBollingerBands';

import { fetchCandles } from '../services/fetchCandles';
import { bollingerbands } from 'technicalindicators';

const ChartData = React.memo(
  ({ labels, upperData, middleData, lowerData, lastData }) => {
    return (
      <LineChart
        data={{
          labels: labels,
          datasets: [
            {
              data: upperData,
              color: (opacity = 1) => `rgba(41,98,255, 1)`,
              strokeWidth: 2,
            },
            {
              data: middleData,
              color: (opacity = 1) => `rgba(255,109,0, 1)`,
              strokeWidth: 2,
            },
            {
              data: lowerData,
              color: (opacity = 1) => `rgba(41,98,255, 1)`,
              strokeWidth: 2,
            },
            {
              data: lastData,
              color: (opacity = 1) => `rgba(0,128,0, 1)`,
              strokeWidth: 2,
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#404040',
          backgroundGradientTo: '#404040',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {

          },
          propsForDots: {
            r: '0',
            strokeWidth: '0',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          borderRadius: 5,
          margin: 5,

        }}
      />
    );
  }
);

const BBLineChart = ({ symbol, interval }) => {
  const [chartData, setChartData] = useState({
    labels: ['', '', '', '', '', ''],
    candles: {
      // change to closedCandles and lastCandles, ou closeList e lastList
      closed: [0, 0, 0, 0, 0, 0],
      last: [0, 0, 0, 0, 0, 0]
    },
    closedCandles: [0, 0, 0, 0, 0, 0],
    lastCandles: [0, 0, 0, 0, 0, 0],
    bollingerBands: {
      upper: [0, 0, 0, 0, 0, 0],
      middle: [0, 0, 0, 0, 0, 0],
      lower: [0, 0, 0, 0, 0, 0]
    }
  });


  useEffect(() => {

    (async () => {
      try {
        await fetchCandles(symbol, 36, interval)
          .then(candles => {

            let labels = candles.map((item) =>
              new Date(item.closeTime).getHours()
            );
            let closed = candles.map((item) => parseFloat(item.close));

            let bb = calculateBollingerBands(8, closed);

            let bollingerBands = {
              upper: bb.map((item) => item.upper),
              middle: bb.map(item => item.middle),
              lower: bb.map(item => item.lower)
            }
            // Busca últimos componentes da array `candles` para comparar com as bollinger bands no chart
            let last = candles.slice(-bollingerBands.upper.length);

            setChartData({
              labels: labels,
              candles: {
                closed: closed,
                last: last
              },
              closedCandles: closed,
              lastCandles: last,
              bollingerBands: bollingerBands,
            });

          });

      } catch (error) {
        console.error('Error fetching candles:', error);
      }
    })();

    
  }, [interval]);

  return (
    <View>
     
      <Text> Intervalo: {interval}, Par: {symbol}</Text>
      <ChartData
        labels={chartData.labels}
        upperData={chartData.bollingerBands.upper}
        middleData={chartData.bollingerBands.middle}
        lowerData={chartData.bollingerBands.lower}
        lastData={chartData.candles.last}
      />
    </View>
  );
};

export default BBLineChart;

