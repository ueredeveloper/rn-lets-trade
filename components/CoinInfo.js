import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { BlackListButton, BollingerBandsButton, FavoritesButton, WebAnalyticsButton } from './buttons'


const CoinInfo = ({ navigation, pair, price }) => {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.text}> {pair}</Text>
                <Text style={styles.text}> {price}</Text>
            </View>
            <ScrollView horizontal={true}>
                <BollingerBandsButton />
                <FavoritesButton pair={pair} />
                <BlackListButton pair={pair} />
                <WebAnalyticsButton navigation={navigation} pair={pair} />
            </ScrollView>
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

export default CoinInfo;