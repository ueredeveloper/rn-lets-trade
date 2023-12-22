import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';
import { editCurrency, insertCurrency } from '../../services/db';


const BlackListButton = ({ pair }) => {

  const { currencies } = useContext(OptionsCurrenciesContext);

  const [currency, setCurrency] = useState({
    object: {
      id: null,
      symbol: null,
      is_blacklisted: false
    }
  });

  useEffect(() => {

    const foundCurrency = currencies.find(c => pair === c.symbol);

    if (foundCurrency) {
      console.log('use eff found cu', foundCurrency.symbol)
      setCurrency(prev => {
        return {
          ...prev,
          object: {
            id: foundCurrency.id,
            symbol: foundCurrency.symbol,
            is_blacklisted: foundCurrency.is_blacklisted
          }

        }
      });
    }
  }, []);

  const handleEditcurrency = () => {

    let _isBlacklisted = !currency.object.is_blacklisted;

    let _currency = {
      object: {
        id: currency.object.id,
        is_blacklisted: _isBlacklisted
      }
    }
    setCurrency(_currency);

    if (currency.object.id !== null) {
      editCurrency(_currency);
    } else {
      insertCurrency({ object: { symbol: pair, is_blacklisted: _isBlacklisted } });
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.text}>Lista Negra</Text>
        <View style={styles.viewButtons}>
          <TouchableOpacity onPress={() => { handleEditcurrency() }}>
            <MaterialCommunityIcons
              name={currency.object.is_blacklisted ? "currency-usd-off" : "currency-usd"}
              size={20}
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
