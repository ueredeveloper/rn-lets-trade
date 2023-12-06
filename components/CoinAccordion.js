import * as React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { List } from 'react-native-paper';
import LineChart from './LineChart';

const CoinAccordion = ({ listPrices }) => {
    const showCoin = (price) => {
        return (
            <View style={styles.textContainer}>
                <Text style={styles.text}> {price.pair}</Text>
                <Text style={styles.text}>{price.price}</Text>
            </View>
        );
    };

    return (
        <List.AccordionGroup>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 0 }}>
                {listPrices.map((price, i) => {
                    while (i < 20) {
                        return (
                            <List.Accordion
                                key={'_accordion_' + i}
                                title={showCoin(price)}
                                id={'_accordion_' + i}>
                                <List.Item title={<LineChart />} />
                            </List.Accordion>
                        );
                    }

                })}
            </ScrollView>
        </List.AccordionGroup>
    );
};

const styles = StyleSheet.create({
    textContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        margin: 5,
    },
});

export default CoinAccordion;
