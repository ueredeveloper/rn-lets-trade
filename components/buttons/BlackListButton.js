import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BlackListButton = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Lista Negra</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="playlist-remove"
              size={24}
              color="black"
            />
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
  viewButtons: {
    flexDirection: 'column',

  },
  text: {
    marginLeft: 5,
    marginRight: 5,
    fontSize: 10,
  },
});

export default BlackListButton;
