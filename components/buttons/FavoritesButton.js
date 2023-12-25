import { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';
import { editCurrency, insertCurrency } from '../../services/db';

const FavoritesButton = ({ pair }) => {

  const { dbCurrencies } = useContext(OptionsCurrenciesContext);

  const [currency, setCurrency] = useState({
    object: {
      id: null,
      symbol: null,
      is_favorite: false
    }
  });

  useEffect(() => {

    const foundCurrency = dbCurrencies.find(c => pair === c.symbol);

    if (foundCurrency) {
      setCurrency(prev => {
        return {
          ...prev,
          object: {
            id: foundCurrency.id,
            symbol: foundCurrency.symbol,
            is_favorite: foundCurrency.is_favorite
          }

        }
      });
    }
  }, []);

  const handleEditcurrency = () => {

    let _is = !currency.object.is_favorite;

    let _currency = {
      object: {
        id: currency.object.id,
        is_favorite: _is
      }
    }
    setCurrency(_currency);

    if (currency.object.id !== null) {
      editCurrency(_currency);
    } else {
      insertCurrency({ object: { symbol: pair, is_favorite: _is } });
    }

  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { handleEditcurrency() }}>
        <View style={styles.buttonContent}>
          <Text style={styles.text}>Favoritos</Text>
          <MaterialIcons name="favorite" size={20} color={currency.object.is_favorite ? 'red' : 'black'} />
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

export default FavoritesButton;
