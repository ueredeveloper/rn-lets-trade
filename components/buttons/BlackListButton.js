import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';
import { editCurrency, insertCurrency, listCurrencies } from '../../services/db';


const BlackListButton = ({ pair }) => {

  const { dataBaseCurrencies, setDataBaseCurrencies, filteredByQuotation, setFilteredByQuotation, setFilteredCurrencies } = useContext(OptionsCurrenciesContext);

  const [currency, setCurrency] = useState({
    object: {
      id: null,
      symbol: null,
      is_blacklisted: false
    }
  });

  useEffect(() => {
    const foundCurrency = dataBaseCurrencies.find(c => c.symbol === pair);
    if (foundCurrency) {
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

      editCurrency(_currency).then(response => {
        //{"data": {"update_currency_by_pk": {"family_id": null, "id": 19, "is_blacklisted": true, "is_favorite": false, "symbol": "BCCUSDT"}}, "status": 200}
        if (response.status === 200) {

          let obj = response.data.update_currency_by_pk;
          setDataBaseCurrencies(prevState => {
            return prevState.map(coin => {

              if (coin.symbol === obj.symbol) {
                setCurrency({ object: obj })
                return obj;
              }
              return coin;
            });
          });

          let isWhiteListed = filteredByQuotation.list.filter(c => c.pair !== obj.symbol);

          setFilteredByQuotation(prev => {
            return {
              ...prev,
              list: isWhiteListed
            }
          });

          setFilteredCurrencies(isWhiteListed)
        }
      });

    } else {
      insertCurrency({ object: { symbol: pair, is_blacklisted: _isBlacklisted } }).then(
        response => {
          //{"insert_currency_one": {"family_id": null, "id": 73, "is_blacklisted": true, "is_favorite": null, "symbol": "CITYUSDT"}}, "status": 200}
          if (response.status === 200) {
            let obj = response.data.insert_currency_one;
            setDataBaseCurrencies(prevState => {
              return [...prevState, obj]
            });
            let isWhiteListed = filteredByQuotation.list.filter(c => c.pair !== obj.symbol);

            setFilteredByQuotation(prev => {
              return {
                ...prev,
                list: isWhiteListed
              }
            });

            setFilteredCurrencies(isWhiteListed)
          }

        });
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => { handleEditcurrency() }}>
        <View style={styles.buttonContent}>
          <Text style={styles.text}>Lista Negra</Text>
          <MaterialCommunityIcons
            name={currency.object.is_blacklisted ? "currency-usd-off" : "currency-usd"}
            size={20}
            color="black"
          />
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

export default BlackListButton;
