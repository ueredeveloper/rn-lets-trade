import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext'; // Import the context
import QuoteCurrencies from "./QuoteCurrencies";
import { fetchCandles } from "../services/fetchCandles";
import { calculateBollingerBands } from "../utilities/calculateBollingerBands";
import { calculateRecentCandles } from "../utilities/calculateRecenteCandles";
import { sortByBollingersLowerAndCandlesClose } from "../utilities/sortByBollingersLowerAndCandlesClose";

const IndicatorsCurrencies = () => {

    const [indicatorsCurrencies, setIndicatorsCurrencies] = useState([
        { name: 'Bolllinger Bands', checked: false, },
        { name: 'RSI', checked: true, },
        { name: 'EFI', checked: false, },
        { name: 'Candlesticks', checked: false, },
        { name: 'MacD', checked: false, },
    ])

    const { filteredCurrencies, setFilteredCurrencies, intervals } = useContext(OptionsCurrenciesContext);

    const [interval, setInterval] = useState('1d');

    /**
  * Mudar o intervalo de pesquisa dos candles (1h, 2h, 1d, ...)
  */
    useEffect(() => {
        let interval = intervals.find(i => i.checked === true);
        setInterval(interval.name);
    }, [intervals]);


    const handle = (item) => {
        setIndicatorsCurrencies(
            [...indicatorsCurrencies].map((i) => {
                if (i.checked === true) {
                    i.checked = false;
                }
                if (i.name === item.name) {
                    i.checked = true;
                }
                return i;
            })
        );

        //setListFilteredByIndicator([])

        //let indicatorCurrency = indicatorsCurrencies.find(ic => ic.checked === true);

        // Verifica se o indicador selecionado é 'BolllingerBands'
        if (item.name === 'Bolllinger Bands' /*&& listFilteredByIndicator.length === 0*/) {
            (async () => {
                try {
                    // Moedas a serem buscadas
                    const coinsToFetch = filteredCurrencies;

                    /*binanceCurrencies.filter(coin => {
                      const checked = quoteCurrencies.filter(qc => qc.checked);
                      return checked.some(crypto => coin.pair.endsWith(crypto.name));
                    });*/
                    //ex: [{"pair": "BTCUSDT", "price": "43663.64000000"},]
                    const fetchedCoins = [];

                    // Itera sobre as moedas para buscar informações
                    for (let i = 0; i < coinsToFetch.length; i += 50) {
                        const chunk = coinsToFetch.slice(i, i + 50);
                        // Busca as velas (candles) para cada moeda
                        const updatedCoins = await Promise.all(
                            chunk.map(async coin => {
                                //ex: coin => {"pair": "CELOUSDT", "price": "0.69000000"}


                                // ex: fetchCandles ('ETHDOWNUSDT', 46, '1d')
                                const fetchedCandles = await fetchCandles(coin.pair, 46, interval);
                                // return fetchedCandles -> [{"baseAssetVolume": ".0", "close": "0.", "quoteVolume": "0", "trades": 0, "volume": ""}, {"baseAssetVolume": ...]
                                const bollingerBands = calculateBollingerBands(20, fetchedCandles);
                                // return -> bollingerBands -> {"lower": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,...}

                                // ex calculateRecentCandles( 27 [{"baseAssetVolume": "8881899022.0", "close": "0.0", "closeTime": 0, "high": "0.0",
                                const candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles);
                                //ex: candles -> [{"baseAssetVolume": "4022022447.0", "close": "0.0", "closeTime": 0, "high": 

                                // return ->  {"pair": "BTTUSDT", "price": "0.00277700"} {"lower": 
                                return { ...coin, bollingerBands, candles };
                            })
                        );

                        fetchedCoins.push(...updatedCoins);
                        // Sortear pela mais próxima da linha mais baixa (lower) do indicador bollinger bands.
                        let sortedCoins = sortByBollingersLowerAndCandlesClose(fetchedCoins)

                        // Adiciona as moedas atualizadas ao estado utilizando push
                        //setListFilteredByIndicator(sortedCoins);
                        setFilteredCurrencies(sortedCoins)

                        if (i + 50 < coinsToFetch.length) {
                            // Aguarda 1 segundo antes de fazer a próxima requisição
                            await new Promise(resolve => setTimeout(resolve, 1000));
                        }
                    }

                } catch (error) {
                    console.error('Error fetching candles:', error);
                }
            })();
        }
    }


    return (
        <View>
            <FlatList
                style={styles.container}
                horizontal={true}
                data={indicatorsCurrencies}
                /*style={[
                     tailwind('px-4 h-10 max-h-10 items-center border-t-2'),
                     styles.bgColor,
                 ]}*/
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            handle(item)
                        }}>
                        <Text
                            style={[styles.text, item.checked ? { color: "red" } : { color: "black" }]}
                            /*style={
                                item.checked
                                    ? tailwind('text-red-500')
                                    : tailwind('text-gray-500')
                            }*/>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    button: {
        minHeight: 40,
        minWidth: 40,
        backgroundColor: 'rgb(189, 195, 199);, 1',
        padding: 10,

    },
    text: {
        minWidth: 50,
        textAlign: "center"

    }
})

export default IndicatorsCurrencies;
