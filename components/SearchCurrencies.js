import React from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function searchCurrencies() {
    

    const [text, onChangeText] = React.useState('Useless Multiline Placeholder');
    const onPress = () => {
        console.log('pressed button')
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                onChangeText={onChangeText}
                value={text}
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