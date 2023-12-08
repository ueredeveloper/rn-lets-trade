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

const BBLineChart = ({symbol}) => {
  

  /*const [candles, setCandles] = useState([]);
  const [bollingerBands, setBollingerBands] = useState([]);
  const [labels, setLabels] = useState([]);
  const [candlesClosed, setCandlesClosed] = useState([]);
  const [lastCandlesClosed, setLastCandlesClosed] = useState([]);*/

  const [data, setData] = useState({
    labels: ['', '', '', '', '', ''],
    candles: [0, 0, 0, 0, 0, 0],
    bollingerBands: {
      upper: [0, 0, 0, 0, 0, 0],
      middle: [0, 0, 0, 0, 0, 0],
      lower:[0, 0, 0, 0, 0, 0],
    },
    closedCandles: [0, 0, 0, 0, 0, 0],
    lastCandles: [0, 0, 0, 0, 0, 0],
  })

  useEffect(() => {
    (async () => {
      try {
        await fetchCandles(symbol, 36, '1h')
          .then(candles => {

            let labels = candles.map((item) =>
              new Date(item.closeTime).getHours()
            );
            let closedCandles = candles.map((item) => parseFloat(item.close));

            let bb = calculateBollingerBands(14, closedCandles);

            let bollingerBands = {
              upper: bb.map((item) => item.upper),
              middle: bb.map(item=> item.middle),
              lower: bb.map(item=>item.lower)
            }

            let lastCandles = closedCandles.filter(
              (item, i) => i > closedCandles.length - bollingerBands.length - 1
            );

            setData({
              labels: labels,
              candles: candles,
              bollingerBands: bollingerBands,
              closedCandles: closedCandles,
              lastCandles: lastCandles
            })

          });

      } catch (error) {
        console.error('Error fetching candles:', error);
      }
    })();

    console.log(data.bollingerBands)
  });

  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        data={{
          labels: data.labels,
          datasets: [
            {
              data: data.bollingerBands.lower,
              color: (opacity = 1) => `rgba(0,0,255, ${opacity})`, // optional
              strokeWidth: 4, // optional
            },
            {
              data: data.bollingerBands.middle,
              color: (opacity = 1) => `rgba(106,90,205, ${opacity})`, // optional
              strokeWidth: 4, // optional
            },
            {
              data: data.bollingerBands.lower,
              color: (opacity = 1) => `rgba(0,0,255, ${opacity})`, // optional
              strokeWidth: 4, // optional
            },
            {
              data: data.lastCandles,
              color: (opacity = 1) => `rgba(60,179,113, ${opacity})`, // optional
              strokeWidth: 4, // optional
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
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
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
