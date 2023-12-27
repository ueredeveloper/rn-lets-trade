import { useState, useContext, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { OptionsCurrenciesContext } from '../../context/OptionsCurrencyContext';
import { editCurrency, insertCurrency } from '../../services/db';

const FavoritesButton = ({ pair }) => {

  const { dataBaseCurrencies, setDataBaseCurrencies, filteredCurrencies,  setFilteredCurrencies } = useContext(OptionsCurrenciesContext);


  const [currency, setCurrency] = useState({
    object: {
      id: null,
      symbol: null,
      is_favorite: false
    }
  });

  useEffect(() => {

    const foundCurrency = dataBaseCurrencies.find(c => pair === c.symbol);

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

    let _isFavorite = !currency.object.is_favorite;

    let _currency = {
      object: {
        id: currency.object.id,
        is_favorite: _isFavorite
      }
    }
    setCurrency(_currency);

    if (_currency.object.id !== null) {
      editCurrency(_currency).then(response=>{
        if (response.status===200){
          //ex: {"data": {"update_currency_by_pk": {"family_id": null, "id": 279, "is_blacklisted": false, "is_favorite": true, "symbol": "ETHUSDT"}}, "status": 200}
       
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
       
        }
      });
    } else {
      insertCurrency({ object: { symbol: pair, is_favorite: _isFavorite } }).then(
        response => {
          //{"insert_currency_one": {"family_id": null, "id": 73, "is_blacklisted": true, "is_favorite": null, "symbol": "CITYUSDT"}}, "status": 200}
          if (response.status === 200) {
            let obj = response.data.insert_currency_one;
            setDataBaseCurrencies(prevState => {
              return [...prevState, obj]
            });
           // let isWhiteListed = filteredCurrencies.list.filter(c => c.pair !== obj.symbol);

           // setFilteredCurrencies(isWhiteListed)
          }

        });
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
