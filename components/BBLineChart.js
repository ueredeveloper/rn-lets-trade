import React, { useEffect, useState } from 'react';
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

const BBLineChart = ({ symbol }) => {


  /*const [candles, setCandles] = useState([]);
  const [bollingerBands, setBollingerBands] = useState([]);
  const [labels, setLabels] = useState([]);
  const [candlesClosed, setCandlesClosed] = useState([]);
  const [lastCandlesClosed, setLastCandlesClosed] = useState([]);*/

  const [chartData, setChartData] = useState({
    labels: ['', '', '', '', '', ''],
    candles: {
      closed: [0, 0, 0, 0, 0, 0],
      last: [0, 0, 0, 0, 0, 0]
    },
    bollingerBands: {
      upper: [0, 0, 0, 0, 0, 0],
      middle: [0, 0, 0, 0, 0, 0],
      lower: [0, 0, 0, 0, 0, 0]
    }
  })

  useEffect(() => {
    (async () => {
      try {
        await fetchCandles(symbol, 36, '1d')
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
            let last = closed.slice(-bollingerBands.upper.length);
      
            setChartData({
              labels: labels,
              candles: {
                closed: closed,
                last: last
              },
              bollingerBands: bollingerBands,
            });

          });

      } catch (error) {
        console.error('Error fetching candles:', error);
      }
    })();
  }, []);

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: chartData.labels,
          datasets: [
            {
              data: chartData.bollingerBands.upper,
              color: (opacity = 1) => `rgba(41,98,255, 1)`,
              strokeWidth: 2,
            },
            {
              data: chartData.bollingerBands.middle,
              color: (opacity = 1) => `rgba(255,109,0, 1)`,
              strokeWidth: 2,
            },
            {
              data: chartData.bollingerBands.lower,
              color: (opacity = 1) => `rgba(41,98,255, 1)`,
              strokeWidth: 2,
            },
            {
              data: chartData.candles.last,
              color: (opacity = 1) => `#25a750`,
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
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'yellow'
  },
});

export default BBLineChart;
