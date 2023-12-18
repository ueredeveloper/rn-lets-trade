import { useContext, useEffect } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import CoinInfo from './CoinInfo';
import CustomAnimatedAccordion from './CustomAnimatedAccordion';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';


const FlatListCoins = ({ listCoins, navigation }) => {

    const { intervals, setIntervals } = useContext(OptionsCurrenciesContext);

    const renderAccordionItem = ({ item }) => (
        <>
            <CoinInfo navigation={navigation} pair={item.pair} price={item.price} />
            <CustomAnimatedAccordion symbol={item.pair} />
        </>
    );

    return (
        <FlatList
            data={listCoins}
            renderItem={renderAccordionItem}
            keyExtractor={(item) => `${item.pair}-${item.price} -${Math.random()}`}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

});

export default FlatListCoins;
