
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import InfoCurrency from './InfoCurrency';
import CustomAnimatedAccordion from './CustomAnimatedAccordion';
import { listCollections } from '../services/db';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';

const ListCurrencies = ({ currencies, navigation }) => {

    // Currrencies -> ListCurrencies

    const { collections } = useContext(OptionsCurrenciesContext);

    const renderInfoCurrencyAndAccordionChart = ({ item }) => (
        <>
            <InfoCurrency navigation={navigation} currency={item} collections={collections} />
            <CustomAnimatedAccordion navigation={navigation} currency={item} collections={collections} />
        </>);

    return (
        <FlatList
            data={currencies}
            renderItem={renderInfoCurrencyAndAccordionChart}
            keyExtractor={(item) => `${item.symbol}-${item.price}`}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default ListCurrencies;
