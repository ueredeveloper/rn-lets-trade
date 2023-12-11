import React, { useRef, useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { SVGRenderer, SkiaChart, echarts } from '@wuba/react-native-echarts';
import { bollingerbands } from 'technicalindicators';

import { fetchCandles } from '../services/fetchCandles';
import { calculateBollingerBands } from '../utilities/calculateBollingerBands';
import { calculateRecentCandles } from '../utilities/calculateRecenteCandles';

echarts.use([SVGRenderer]);
const E_HEIGHT = 400;
const E_WIDTH = Dimensions.get('window').width;

function CandlestickBandsChart({ symbol, interval }) {

  // cor dos candles (compra e venda)
  const upColor = '#00da3c';
  const upBorderColor = '#008F28';
  const downColor = '#ec0000';
  const downBorderColor = '#8A0000';


  const skiaRef = useRef(null);

  const [chartData, setChartData] = useState({
    labels: ['', '', '', '', '', ''],
    candles: [{ open: 0 }, { close: 0 }, { high: 0 }, { low: 0 }],
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
          .then(fetchedCandles => {

            // lables para o chart
            let labels = fetchedCandles.map((item) =>
              new Date(item.closeTime).getHours()
            );
            // cálculo do indicador bollinger bands
            let bollingerBands = calculateBollingerBands(14, fetchedCandles);

            // Busca dos últimos componentes da array `fetchedCandles` para mostrar com os resultados calculados bollinger bands no chart
            let candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles)

            setChartData({
              labels: labels,
              candles: candles,
              bollingerBands: bollingerBands,
            });
          });

      } catch (error) {
        console.error('Error fetching candles:', error);
      }
    })();

  }, [symbol, interval]);

  useEffect(() => {
   // console.log(chartData)
  }, [chartData])


  useEffect(() => {

    let chart = echarts.getInstanceByDom(skiaRef.current);

    const createChart = () => {
      const option = {
        title: {
          text: `${symbol}, ${interval}`,
          top: 20,
          left: 0,
        },
        // ... (other chart configurations)
        ...(chartData.labels.length > 0 && chartData.candles.length > 0 && {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
            },
            // Other tooltip configurations as needed
          },
        }),
        legend: {
          data: ['Candles', 'Upper', 'Middle', 'Lower', 'Close']
        },
        grid: {
          left: '12%',
          right: '15%',
          bottom: '15%'
        },
        xAxis: {
          type: 'category',
          data: chartData.labels,
          boundaryGap: false,
          axisLine: { onZero: false },
          splitLine: { show: false },
          min: 'dataMin',
          max: 'dataMax',
        },
        yAxis: {
          scale: true,
          splitArea: {
            show: true,
          },
        },
        dataZoom: [
          {
            type: 'inside',
            start: 30, /* zoom do slide*/
            end: 100,
          },
          {
            show: true,
            type: 'slider',
            top: '90%', /* posição do slide: abaixo do chart */
            start: 50,
            end: 100,
          },
        ],
        series: [
          {
            name: 'Candles',
            type: 'candlestick',
            data: chartData.candles.map(c => [c.open, c.close, c.low, c.high]),
            itemStyle: {
              color: upColor,
              color0: downColor,
              borderColor: upBorderColor,
              borderColor0: downBorderColor,
            },
            markPoint: {
              label: {

              },
              data: [
                {
                  name: 'Mark',
                  coord: [chartData.labels[0], chartData.candles[0].high],
                  value: chartData.candles[0].high,
                  itemStyle: {
                    color: 'rgb(41,60,85)',
                  },
                },
                {
                  name: 'highest value',
                  type: 'max',
                  valueDim: 'highest',
                },
                {
                  name: 'lowest value',
                  type: 'min',
                  valueDim: 'lowest',
                },
                {
                  name: 'average value on close',
                  type: 'average',
                  valueDim: 'close',
                },
              ],
              tooltip: {
                formatter: function (param) {
                  return param.name + '<br>' + (param.data.coord || '');
                },
              },
            },
            markLine: {
              symbol: ['none', 'none'],
              data: [
                [
                  {
                    name: 'from lowest to highest',
                    type: 'min',
                    valueDim: 'lowest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                  {
                    type: 'max',
                    valueDim: 'highest',
                    symbol: 'circle',
                    symbolSize: 10,
                    label: {
                      show: false,
                    },
                    emphasis: {
                      label: {
                        show: false,
                      },
                    },
                  },
                ],
                {
                  name: 'min line on close',
                  type: 'min',
                  valueDim: 'close',
                },
                {
                  name: 'max line on close',
                  type: 'max',
                  valueDim: 'close',
                },
              ],
            },
          },
          {
            name: 'Upper',
            type: 'line',
            data: chartData.bollingerBands.upper,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: 'Middle',
            type: 'line',
            data: chartData.bollingerBands.middle,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: 'Lower',
            type: 'line',
            data: chartData.bollingerBands.lower,
            smooth: true,
            lineStyle: {
              opacity: 0.5,
            },
          },
          {
            name: 'Close',
            type: 'line',
            data: chartData.candles.map(c => c.close),
            smooth: true,
            lineStyle: {
              opacity: 0.5,
              color: 'gray'
            },
          }
        ],
      };


      if (!chart) {
        chart = echarts.init(skiaRef.current, 'light', {
          renderer: 'svg',
          width: E_WIDTH,
          height: E_HEIGHT,
        });
      }

      chart.setOption(option);

      return () => {
        if (chart) {
          chart.dispose();
          chart = null; // Reset chart variable after disposal
        }
      };
    };

    createChart();
  }, [chartData]);




  return (
    <View style={styles.container}>
      <SkiaChart ref={skiaRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

  },
});

export { CandlestickBandsChart }