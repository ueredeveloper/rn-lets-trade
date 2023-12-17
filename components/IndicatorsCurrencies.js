import { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext'; // Import the context

const IndicatorsCurrencies = () => {
    
    const {indicatorsCurrencies, setIndicatorsCurrencies } = useContext(OptionsCurrenciesContext);

    return (
        <View>
            <FlatList
                style={styles.container}
                horizontal={true}
                data={indicatorsCurrencies}
                /*style={[
                     tailwind('px-4 h-10 max-h-10 items-center border-t-2'),
                     styles.bgColor,
                 ]}*/
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setIndicatorsCurrencies(
                                [...indicatorsCurrencies].map((i) => {
                                    if (i.checked === true) {
                                        i.checked = false;
                                    }
                                    if (i.name === item.name) {
                                        i.checked = true;
                                    }
                                    return i;
                                })
                            );
                        }}>
                        <Text
                            style={styles.text}
                            /*style={
                                item.checked
                                    ? tailwind('text-red-500')
                                    : tailwind('text-gray-500')
                            }*/>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.name}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    },
    button: {
        minHeight: 40,
        minWidth: 40,
        backgroundColor:'rgb(189, 195, 199);, 1',
        padding: 10,
      
    },
    text: {
        minWidth: 50, 
        textAlign: "center"
        
    }
})

export default IndicatorsCurrencies;
