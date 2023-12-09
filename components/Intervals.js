import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';


const Intervals = () => {

    const [intervals, setIntervals] = useState([
        { name: '1m', checked: false },
        { name: '5m', checked: false },
        { name: '15m', checked: false },
        { name: '30m', checked: false },
        { name: '1h', checked: true },
        { name: '2h', checked: false },
        { name: '4h', checked: false },
        { name: '6h', checked: false },
        { name: '8h', checked: false },
        { name: '12h', checked: false },
        { name: '1d', checked: false },
        { name: '3d', checked: false },
        { name: '1w', checked: false },
        { name: '1M', checked: false },
    ]);

    return (
        <View>
            <FlatList
                style={styles.container}
                horizontal={true}
                data={intervals}
                /*style={[
                     tailwind('px-4 h-10 max-h-10 items-center border-t-2'),
                     styles.bgColor,
                 ]}*/
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                            setIntervals(
                                [...intervals].map((i) => {
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
        backgroundColor: 'red',
        padding: 10,
      
    },
    text: {
        minWidth: 50, 
        textAlign: "center"
        
    }
})

export default Intervals;