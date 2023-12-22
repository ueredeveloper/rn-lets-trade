import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';
import { editDbCurrency } from '../../services/db/editDbCurrency';

const BlackListButton = ({ pair }) => {

  const { currencies } = useContext(OptionsCurrenciesContext);
  const [currency, setCurrency] = useState({
    object: {
      id: null,
      is_blacklisted: false
    }
  });

  useEffect(() => {
    // Assuming `pair` is defined somewhere in your code.
    const foundCurrency = currencies.find(c => pair.startsWith(c.symbol));

    if (foundCurrency) {
      let _currency = {
        object: {
          id: foundCurrency.id,
          is_blacklisted: foundCurrency.is_blacklisted
        }
      }
      console.log('use eff',pair,  _currency)

      setCurrency(_currency);
    }

  }, []);

  const handleEditcurrency = () => {

    console.log('handle ', currency)
    let _currency = {
      object: {
        id: currency.id,
        is_blacklisted: !currency.is_blacklisted
      }
    }
    setCurrency(_currency);

    editDbCurrency(_currency);
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
