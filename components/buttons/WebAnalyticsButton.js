import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WebAnalyticsButton = ({ navigation, pair }) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => {
        navigation.navigate('BrowserScreen', { symbol: pair });
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
    marginLeft: 5,
    marginRight: 5,
  },
  button: {
    flex: 1, placeContent: 'stretch'
  },
  text: { fontSize: 10, marginLeft: 5, marginRight: 5 },
  buttonContent: {
    flex: 1,
    alignItems: 'center',
    placeContent: 'stretch',
    flexDirection: 'row',
  }
});

export default WebAnalyticsButton;
