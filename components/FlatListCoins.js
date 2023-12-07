import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { List } from 'react-native-paper';
import LineChart from './LineChart';
import CoinInfo from './CoinInfo';

const FlatListCoins = ({ listCoins }) => {

    const renderAccordionItem = ({ item }) => (
        <View style={styles.container}>
            <CoinInfo pair={item.pair} price={item.price} />
            <List.Accordion style={{ paddingBottom:0, paddingTop:0}} title="" id="1">
                <List.Item title={<View><Text>chart</Text></View>}></List.Item>
            </List.Accordion>
        </View>
    );

    return (
        <FlatList
            data={listCoins}
            renderItem={renderAccordionItem}
            keyExtractor={(item) => `${item.pair}_${item.price}`}
        />
    );
};

const styles = StyleSheet.create({
    container: {

    },
    accordion: {
        flex: 1,
        backgroundColor: 'orange',
    }
});

export default FlatListCoins;
