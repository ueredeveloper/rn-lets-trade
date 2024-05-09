import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const BollingerBandsButton = () => {

  
  const handleEditcurrency = () => {
    console.log('up')
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Bollinger Bands</Text>
      <View>
        <TouchableOpacity>
          <View>
            <AntDesign name="caretup" size={17} color="black" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View>
            <AntDesign name="caretdown" size={17} color="black" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
  },
  text: { fontSize: 10, marginLeft: 5, marginRight: 5 },
  buttonContent: { flexDirection: 'row', alignItems: 'center' }
});
export default BollingerBandsButton;
