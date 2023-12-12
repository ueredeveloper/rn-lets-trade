import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CoinInfo = ({ navigation, pair, price }) => {

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => {
                navigation.navigate('BrowserScreen', { symbol: pair });
            }}>
                <Text style={styles.text}> {pair}</Text>
                <Text style={styles.text}> {price}</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({

    container: {

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

export default CoinInfo;