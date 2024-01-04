import React, { createContext, useState, useEffect } from "react";
import { listCollections, listCurrencies } from "../services/db";
import { fetchAllCoins } from "../services/fetchAllCoins";


const OptionsCurrenciesContext = createContext();

const OptionsCurrenciesProvider = ({ children }) => {

  const [intervals, setIntervals] = useState([
    { name: '1m', checked: false },
    { name: '5m', checked: false },
    { name: '15m', checked: false },
    { name: '30m', checked: false },
    { name: '1h', checked: false },
    { name: '2h', checked: false },
    { name: '4h', checked: false },
    { name: '6h', checked: false },
    { name: '8h', checked: true }, // padrão 8 horas
    { name: '12h', checked: false },
    { name: '1d', checked: false },
    { name: '3d', checked: false },
    { name: '1w', checked: false },
    { name: '1M', checked: false },
  ]);

  const [allCurrencies, setAllCurrencies] = useState([])
  const [quotationCurrencies, setQuotationCurrencies] = useState([]);
  const [indicatorCurrencies, setIndicatorCurrencies] = useState([]);
  const [whiteListCurrencies, setWhiteListCurrencies] = useState([]);

  const [collections, setCollections] = useState([
    {
      id: null,
      name: '',
      icons: [],
      list: []
    }
  ]);

  useEffect(() => {
    (async () => {
      let response = await listCollections();
      //response => {"collection": [{"id": 2,"name": "blacklisted"},{"id": 1,"name": "favorites"}, ...]}
      if (response.status === 200) {

        let icons = [
          ["currency-usd-off", "currency-usd"],
          ["bookmark", "bookmark-outline"],
          ["store-clock", "store-clock-outline"],
          ["calendar-blank", "calendar-blank-outline"],
          ["calendar-month", "calendar-month-outline"],
          ["clock", "clock-outline"],
          ["square", "square-outline"],
          ["square", "square-outline"],
          ["square", "square-outline"],
        ];
        // adicionar os nomes dos ícones à cada coleção
        let _collections = icons.map((icon, i) => {
          return { ...response.data.collection[i], icons: icon };
        });
        setCollections(_collections);
      } else {
        console.log("Error getting collections: ", response.error);
      }
    })()
  }, []);


  /**
   * 
   * @returns Busca moedas na plataforma Binance.
   */
  const _fetchBinanceCurrencies = async () => {
    try {
      const result = await fetchAllCoins();
      return result;
    } catch (error) {
      console.error('Error fetching coins:', error);
    }
  }

  /**
   * Busca moedas no banco de dados (Favoritos, Blacklist, ...)
   * 
   */
  const _fetchDataBaseCurrencies = async () => {
    let result = await listCurrencies();

    if (result.error) {
      // Handle error here
      console.error('Error fetching data:', result.error);
    } else {
      return result.data.currency;
    }

  }

  /**
   * Reune as duas requisições, Binance e Bando NHost.
   * @returns 
   */
  function executeAsyncFunctionsTogether() {
    return Promise.all([_fetchBinanceCurrencies(), _fetchDataBaseCurrencies()]);
  }

  useEffect(() => {
    executeAsyncFunctionsTogether()
      .then(results => {
        // Filtra moedas na lista negra escolhidas pelo usário e salvas no banco de dados.
        let _allCurrencies = results[0].map(b => {
          const match = results[1].find(db => db.symbol === b.symbol);
          if (match) {
            return { ...b, id: match.id, currency_collections: match.currency_collections };
          }
          return b;
        });

        setAllCurrencies(_allCurrencies);
        //let _isBlackListeds = results[0].filter(item => item.is_blacklisted).map(item => item.symbol);
        //let _isFavorites = results[0].filter(item => item.is_favorite).map(item => item.symbol);

        // Seta moedas puxadas do banco de dados
        //setDataBaseCurrencies(results[0])
        // seta as moedas binance.
        //setBinanceCurrencies(results[1]);

        // Filtra por cotação, por padrão USDT.
        let _quotationCurrencies = _allCurrencies.filter(result => {
          return result.symbol.endsWith('USDT')
        });

        //console.log(JSON.stringify(joinResults.slice(0,200)))

        /*
        let _isFavorites = _quotationCurrencies.filter(item => {
          if (item.currency_collections.some(collection => collection.collection_id === 1)) {
            return item.symbol
          }
        })*/

        // Tudo que não for is_blacklisted na tabela collections (collection_id = 1 -> is_blacklisted).
       


        setQuotationCurrencies(_quotationCurrencies);

        let _isWhiteListedQuotation = _quotationCurrencies.filter(item => {
          if (item.currency_collections.some(collection => collection.collection_id !== 2)) {
            return item.symbol
          }
        });
        /*// Filtra por quotação (USDT, BRL, ...) e remove lista negra de moedas.
        let _filtereByQuotatoinAndWhiteList = _quotationCurrencies.filter(c => !_isBlackListeds.includes(c.symbol));
*/
        setWhiteListCurrencies(_isWhiteListedQuotation);

        /*

        let _quotationCurrenciesAndFavorites = _quotationCurrencies.filter(c => _isFavorites.includes(c.symbol));

        setFilteredByFavorites(_quotationCurrenciesAndFavorites);

        let _quotationCurrenciesAndBlackListed = _quotationCurrencies.filter(c => _isBlackListeds.includes(c.symbol));

        setfilteredByBlackListeds(_quotationCurrenciesAndBlackListed);*/

      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

  }, []);

 /*useEffect(() => {

     let dbFavorites = dataBaseCurrencies.filter(item => item.is_favorite).map(item => item.symbol);
     let filteredByFavoritesAndQuotation = quotationCurrencies.list.filter(c => dbFavorites.includes(c.symbol));
     setFilteredByFavorites(filteredByFavoritesAndQuotation);
 
     let dbBlacklisteds = dataBaseCurrencies.filter(item => item.is_blacklisted).map(item => item.symbol);
     let filteredByBlackListedsAndQuotation = quotationCurrencies.list.filter(c => dbBlacklisteds.includes(c.symbol));
 
     setfilteredByBlackListeds(filteredByBlackListedsAndQuotation);

  }, [quotationCurrencies, dataBaseCurrencies]);*/

  return (
    <OptionsCurrenciesContext.Provider value={{
      intervals, setIntervals,
      allCurrencies, setAllCurrencies,
      quotationCurrencies, setQuotationCurrencies,
      indicatorCurrencies, setIndicatorCurrencies,
      whiteListCurrencies, setWhiteListCurrencies,
      collections, setCollections
    }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider }