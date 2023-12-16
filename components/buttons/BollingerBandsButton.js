import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BollingerBandsButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Bollinger Bands</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity>
            <AntDesign name="caretup" size={16} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <AntDesign name="caretdown" size={16} color="black" />
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

export default BollingerBandsButton;
