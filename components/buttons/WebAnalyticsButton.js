import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WebAnalyticsButton = ({ navigation, symbol }) => {


  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('BrowserScreen', { symbol: symbol });
      }}>
        <View style={styles.buttonContent}>
          <Text style={styles.text}>Trading View</Text>
          <Ionicons name="analytics" size={20} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
   flex: 1
  },
  button: {
    padding: 10,
    alignSelf: 'flex-end'
  },
  text: {
    fontSize: 10,
    marginLeft: 5,
    marginRight: 5
  },
  buttonContent: {
    alignItems: 'center', /* text e ícone centralizado verticalmente */
    flexDirection: 'row', /* texto e ícone na horizontal*/
  }
});

export default WebAnalyticsButton;
