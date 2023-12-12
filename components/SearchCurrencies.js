import React, { useContext, useEffect, useRef, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';

function searchCurrencies() {

    const [inputValue, setInputValue] = useState('');
    const textInputRef = useRef();

    const { setSearchCurrencies } = useContext(OptionsCurrenciesContext);

    const onPress = () => {
        console.log('pressed button', inputValue)
    }

    const handleInputChange = (text) => {
        // Converter text digitado para maiúculo, ex: btc -> BTC
        const textToUpper = text.toUpperCase();
        setInputValue(textToUpper);
        setSearchCurrencies(textToUpper)
    };


    return (
        <View style={styles.container}>
            <TextInput
                secureTextEntry={Platform.OS === 'ios' ? false : true}
                keyboardType={Platform.OS === 'ios' ? null : 'visible-password'}
                autoCapitalize="characters"
                style={styles.input}
                onChangeText={handleInputChange}
                value={inputValue}
                placeholder='BTCUSDT'

            />
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Ionicons name="search" size={24} color="black" />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',

    },
    input: {
        flex: 2,
        borderRadius: 5,
        marginLeft: 5, marginRight: 5,
        borderWidth: 0.5,
        padding: 5, // distância da letra para a parte esquerda da tela*/

    },
    button: {
        marginLeft: 10,
        marginRight: 10
    },
});


export default searchCurrencies;