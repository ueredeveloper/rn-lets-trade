import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { insertCurrency, insertCurrencyCollection, deleteCurrencyCollection, searchCurrencyBySymbol, searchCurrencyCollection } from '../services/db';


function Collection({ selectedCurrency, setSelectedCurrency, collection }) {

  // CurrencyCollection -> Collection

  const [isCurrencyCollection, setIsCurrencyCollection] = useState(
    // Verifica se está salvo como uma coleção ou não e retorna true ou false
    selectedCurrency.object.currency_collections.some(
      (cc) => cc.collection_id === collection.id
    )
  );

  const verifyAndInsertCurrency = async () => {
    let currency;

    let searchCurrencyResponse = await searchCurrencyBySymbol(selectedCurrency.object.symbol)
    //se existir no banco -> {"status":200,"data":{"currency":[{"id":483,"symbol":"BTCUSDT","currency_collections":[{"id":299,"collection_id":2},...]}]}}
    //se não existir -> {"status":200,"data":{"currency":[]}}
    if (searchCurrencyResponse.status === 200) {
      // se existir
      if (searchCurrencyResponse.data.currency.length > 0) {
  
        currency = searchCurrencyResponse.data.currency[0];
        // Atualizar hooks de acordo com o banco de dados
        setSelectedCurrency({ object: currency });
        // se não existir no banco, inserir.
      } else {

        let insertCurrencyResponse = await insertCurrency({
          object: {
            symbol: selectedCurrency.object.symbol
          }

        });
        //{"insert_currency_one": { "id": 451,"symbol": "BTRR6RUSDT","currency_collections": []}
        if (insertCurrencyResponse.status === 200) {
          currency = insertCurrencyResponse.data.insert_currency_one;
          // Atualizar hooks de acordo com o banco de dados
          setSelectedCurrency({ object: currency });
        }

      }
      return currency;
      // else -> search currency status != 200
    } else {
      console.log('verify and insert currency, error: ', insertCurrencyResponse.error)
    }
  }

  const verifyAndInsertCurrencyCollection = async (collection, currency) => {

    let searchCurrencCollectionResponse = await searchCurrencyCollection(collection, currency)
    // se não existe no banco -> {"data": {"currency_collection": []}, "status": 200}
    // se existe -> {"status":200,"data":{"currency_collection":[{"collection_id":2,"currency_id":483,"id":299}]}}

    if (searchCurrencCollectionResponse.data.currency_collection.length === 0) {

      let currencyId = currency.id;

      let inserCurrencyCollectionResponse = await insertCurrencyCollection({
        object: {
          currency_id: currencyId,
          collection_id: collection.id // Assuming 1 is the ID for 'favorites'
        }
      });
      //{"status": 200, "data": {"insert_currency_collection_one": {"collection_id": 1,"currency_id": 4, "id": 5 } } }
      if (inserCurrencyCollectionResponse.status === 200) {
        let currencyCollection = inserCurrencyCollectionResponse.data.insert_currency_collection_one;
        // Atualizar hooks de acordo com o banco de dados
        setSelectedCurrency(prev => {
          return {
            ...prev,
            object: {
              ...prev.object,
              currency_collections: [...prev.object.currency_collections, currencyCollection]
            }
          }

        })
      } else {
        console.log('error ', inserCurrencyCollectionResponse.status, inserCurrencyCollectionResponse.error);
      }

    }

  }

  const verifyAndDeleteCurrencyCollection = async (collection, currency) => {

    let searchCurrencCollectionResponse = await searchCurrencyCollection(collection, currency)
    // se não existe no banco -> {"data": {"currency_collection": []}, "status": 200}
    // se existe -> {"status":200,"data":{"currency_collection":[{"collection_id":2,"currency_id":483,"id":299}]}}

    // se existir
    if (searchCurrencCollectionResponse.data.currency_collection.length > 0) {

      let currencyCollectionId = searchCurrencCollectionResponse.data.currency_collection[0].id;

      let deleteCurrencyCollectionResponse = await deleteCurrencyCollection(currencyCollectionId);
      //{"data": {"delete_currency_collection_by_pk": {"collection": [Object], "currency": [Object], "id": 299}}, "status": 200}


      //{"delete_currency_collection_by_pk": {"currency": {"id": 5,"symbol": "LDOUSDT"},
      // "collection": {"id": 1,"name": "favorites"}, "id": 6 }}

      if (deleteCurrencyCollectionResponse.status === 200) {

        //Atualizar hooks de acordo com banco de dados
        setSelectedCurrency(prev => {
          return {
            ...prev,
            object: {
              ...prev.object,
              currency_collections: [...prev.object.currency_collections.filter(cc => cc.collection_id !== collection.id)]
            }
          }

        })

        console.log('Currency removed from collection!');
      } else {
        console.log("Error removing currency from favorites.");
      }

    }

  }

  const handeClick = async () => {

    let _isCurrencyCollection = !isCurrencyCollection;
    setIsCurrencyCollection(_isCurrencyCollection);

    let currency;

    if (_isCurrencyCollection) {

      // Verifica se existe a moeda no banco de dados e insere
      if (selectedCurrency.object.id === null) {

        currency = await verifyAndInsertCurrency();
        await verifyAndInsertCurrencyCollection(collection, currency)

        // se selectedCurrency.object.id não é nulo
      } else {
        currency = selectedCurrency.object;
        await verifyAndInsertCurrencyCollection(collection, currency)

      }

      // se _isCurrencyCollection falso
    } else {
      // Verifica se existe a moeda no banco de dados e insere
      if (selectedCurrency.object.id === null) {

        currency = await verifyAndInsertCurrency();
        await verifyAndDeleteCurrencyCollection(collection, currency)

        // se selectedCurrency.object.id não é nulo
      } else {
        currency = selectedCurrency.object;
        await verifyAndDeleteCurrencyCollection(collection, currency)
      }

    }
  }

  return (

    <TouchableOpacity onPress={() => { handeClick() }}>
       {/*console.log('collection render', selectedCurrency.object.id, collection.id)*/}
      <View style={styles.buttonContent}>
        <MaterialCommunityIcons
          name={isCurrencyCollection ? `${collection.icons[0]}` : `${collection.icons[1]}`}
          //currency.object.is_blacklisted ? "currency-usd-off" : "currency-usd"}
          size={20}
          color="black"
        />
        <Text style={styles.text}>{collection.name}</Text>
      </View>
    </TouchableOpacity>

  );
}
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

export default Collection;
