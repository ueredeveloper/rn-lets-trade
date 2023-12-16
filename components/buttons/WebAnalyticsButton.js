import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const WebAnalyticsButton = ({ navigation, pair }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>TradingView</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity onPress={() => {
              navigation.navigate('BrowserScreen', { symbol: pair });
            }}>
            
            <Ionicons name="analytics" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginLeft: 5,
    marginRight: 5,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewButtons: {},
  text: { fontSize: 10, marginLeft: 5, marginRight: 5 },
});

export default WebAnalyticsButton;
