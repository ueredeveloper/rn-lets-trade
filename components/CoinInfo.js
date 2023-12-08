import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { List } from 'react-native-paper';


const CoinInfo = ({ pair, price }) => {
    
    return (
        <View style={styles.container}>
            <Text style={styles.text}> {pair}</Text>
            <Text style={styles.text}> {price}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'orange',
    },
    text: {
        margin: 'auto',
    },
});

export default CoinInfo;