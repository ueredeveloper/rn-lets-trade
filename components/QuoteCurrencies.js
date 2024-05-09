import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { OptionsCurrenciesContext } from "../context/OptionsCurrencyContext";

/** Moeda de cotação */
const QuoteCurrencies = () => {

    // Currencies -> QuoteCurrencies

    const { allCurrencies, setQuotationCurrencies, setWhiteListCurrencies } = useContext(OptionsCurrenciesContext);

    const [quoteCurrencies, setQuoteCurrencies] = useState([
        { name: 'USDT', checked: true },
        { name: 'BTC', checked: false },
        { name: 'BNB', checked: false },
        { name: 'ETH', checked: false },
        { name: 'BRL', checked: false },
    ]);

    const handle = (item) => {

        let quote = item.name;

        setQuoteCurrencies(
            [...quoteCurrencies].map((i) => {
                if (i.checked === true) {
                    i.checked = false;
                }
                if (i.name === item.name) {
                    i.checked = true;
                }
                return i;
            })
        );

        let filtered = allCurrencies.filter(currency => {
            return currency.symbol.endsWith(quote)
        });

        setQuotationCurrencies(filtered);
        setWhiteListCurrencies(filtered);
    }

    return (
        <View>
            <FlatList
                style={styles.container}
                horizontal={true}
                data={quoteCurrencies}
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
                            style={[styles.text, item.checked ? { color: "red" } : { color: "#666" }]}>
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
        backgroundColor: 'rgb(237, 231, 225);, 1 ',
        padding: 10,

    },
    text: {
        minWidth: 60,
        textAlign: "center"

    }
});

export default QuoteCurrencies;