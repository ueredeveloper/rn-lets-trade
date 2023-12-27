import React, { createContext, useState, useEffect } from "react";
import { listCurrencies } from "../services/db";
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
    { name: '8h', checked: false },
    { name: '12h', checked: false },
    { name: '1d', checked: true },
    { name: '3d', checked: false },
    { name: '1w', checked: false },
    { name: '1M', checked: false },
  ]);

  const [binanceCurrencies, setBinanceCurrencies] = useState([]);
  const [filteredByQuotation, setFilteredByQuotation] = useState({
    quote: '',
    list: []
  });
  const [filteredByIndicator, setFilteredByIndicator] = useState({
    indicator: '',
    list: []
  });

  const [filteredCurrencies, setFilteredCurrencies] = useState([]);
  const [filteredByFavorites, setFilteredByFavorites] = useState([]);
  const [filteredByBlackListeds, setfilteredByBlackListeds] = useState([])
  const [dataBaseCurrencies, setDataBaseCurrencies] = useState([]);

  
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
    return Promise.all([_fetchDataBaseCurrencies(), _fetchBinanceCurrencies()]);
  }

  useEffect(() => {
    executeAsyncFunctionsTogether()
      .then(results => {
        // Filtra moedas na lista negra escolhidas pelo usário e salvas no banco de dados.
        let _isBlackListeds = results[0].filter(item => item.is_blacklisted).map(item => item.symbol);
        let _isFavorites = results[0].filter(item => item.is_favorite).map(item => item.symbol);

        console.log('op c s ', _isFavorites)
        // Seta moedas puxadas do banco de dados
        setDataBaseCurrencies(results[0])
        // seta as moedas binance.
        setBinanceCurrencies(results[1]);

        // Filtra por cotação, por padrão USDT.
        let _filteredByQuotation = results[1].filter(currency => {
          return currency.pair.endsWith('USDT')
        });

        setFilteredByQuotation({
          quote: 'USDT',
          list: _filteredByQuotation
        });
        // Filtra por quotação (USDT, BRL, ...) e remove lista negra de moedas.
        let _filtereByQuotatoinAndWhiteList = _filteredByQuotation.filter(c => !_isBlackListeds.includes(c.pair));

        setFilteredCurrencies(_filtereByQuotatoinAndWhiteList);

        let _filteredByQuotationAndFavorites = _filteredByQuotation.filter(c => _isFavorites.includes(c.pair));

        setFilteredByFavorites(_filteredByQuotationAndFavorites);

        let _filteredByQuotationAndBlackListed = _filteredByQuotation.filter(c => _isBlackListeds.includes(c.pair));

        setfilteredByBlackListeds(_filteredByQuotationAndBlackListed);

      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

  }, []);

  useEffect(() => {

    let dbFavorites = dataBaseCurrencies.filter(item => item.is_favorite).map(item => item.symbol);
    let filteredByFavoritesAndQuotation = filteredByQuotation.list.filter(c => dbFavorites.includes(c.pair));
    setFilteredByFavorites(filteredByFavoritesAndQuotation);

    let dbBlacklisteds = dataBaseCurrencies.filter(item => item.is_blacklisted).map(item => item.symbol);
    let filteredByBlackListedsAndQuotation = filteredByQuotation.list.filter(c => dbBlacklisteds.includes(c.pair));

    setfilteredByBlackListeds(filteredByBlackListedsAndQuotation);

  }, [filteredByQuotation, dataBaseCurrencies]);

  return (
    <OptionsCurrenciesContext.Provider value={{
      intervals, setIntervals,
      binanceCurrencies, setBinanceCurrencies,
      filteredByQuotation, setFilteredByQuotation,
      filteredByIndicator, setFilteredByIndicator,
      dataBaseCurrencies, setDataBaseCurrencies,
      filteredByFavorites, setFilteredByFavorites,
      filteredByBlackListeds, setfilteredByBlackListeds,
      filteredCurrencies, setFilteredCurrencies
    }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider }