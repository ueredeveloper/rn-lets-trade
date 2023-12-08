import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CoinInfo from './CoinInfo';
import CustomAnimatedAccordion from './CustomAnimatedAccordion';

const FlatListCoins = ({ listCoins }) => {
    

    const renderAccordionItem = ({ item }) => (
        <>
            <CoinInfo pair={item.pair} price={item.price} />
            <CustomAnimatedAccordion symbol={item.pair} />
        </>
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
        flex: 1,
    },

});

export default FlatListCoins;
