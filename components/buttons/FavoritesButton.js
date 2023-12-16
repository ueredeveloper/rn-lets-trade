import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const FavoritesButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Favoritos</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity>
            <Entypo name="add-to-list" size={24} color="black" />
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

export default FavoritesButton;
