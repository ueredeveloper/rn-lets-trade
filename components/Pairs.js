import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const Pairs = () => {

    const [pairs, setPairs] = useState([
        { name: 'USDT', checked: false },
        { name: 'BTC', checked: false },
        { name: 'BNB', checked: true },
        { name: 'ETH', checked: true },
        { name: 'BRL', checked: true },
    ]);

    return (
        <View>
            <FlatList
                style={styles.container}
                horizontal={true}
                data={pairs}
                /*style={[
                     tailwind('px-4 h-10 max-h-10 items-center border-t-2'),
                     styles.bgColor,
                 ]}*/
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setPairs(
                                [...pairs].map((i) => {
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
        backgroundColor: 'blue',
        padding: 10,

    },
    text: {
        minWidth: 60,
        textAlign: "center"

    }
})

export default Pairs;