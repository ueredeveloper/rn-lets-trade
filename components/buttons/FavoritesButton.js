import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';

const FavoritesButton = ({ pair }) => {

  const { currencies } = useContext(OptionsCurrenciesContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    // Assuming `pair` is defined somewhere in your code.
    const foundCurrency = currencies.find(c => pair.startsWith(c.symbol));

    if (foundCurrency) {
      setIsFavorite(foundCurrency.is_favorite);
    }
    
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Favoritos</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity>
            <MaterialIcons name="favorite" size={20} color={isFavorite ? 'red' : 'black'} />
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
