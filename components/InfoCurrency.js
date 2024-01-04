import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';

import CurrencyCollection from './CurrencyCollections';


const InfoCurrency = ({ navigation, currency, collections }) => {

    // ListCurrencies -> InfoCurrency

    return (
        <View style={styles.container}>
             {/*console.log('info currency render')*/}
            <View style={styles.content}>
                <Text style={styles.text}> {currency.symbol}</Text>
                <Text style={styles.text}> {currency.price}</Text>
            </View>
            
        </View>
    );
};


const styles = StyleSheet.create({

    container: {

    },
    content: {

        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'orange',
        padding: 10,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    text: {
        margin: 'auto',
    },
});

export default InfoCurrency;