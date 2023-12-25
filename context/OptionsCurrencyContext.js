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
  const [quoteCurrencies, setQuoteCurrencies] = useState([
    { name: 'USDT', checked: true },
    { name: 'BTC', checked: false },
    { name: 'BNB', checked: false },
    { name: 'ETH', checked: false },
    { name: 'BRL', checked: false },
  ]);
  const [searchCurrencies, setSearchCurrencies] = useState('');

  const [indicatorsCurrencies, setIndicatorsCurrencies] = useState([
    { name: 'Bolllinger Bands', checked: false, },
    { name: 'RSI', checked: true, },
    { name: 'EFI', checked: false, },
    { name: 'Candlesticks', checked: false, },
    { name: 'MacD', checked: false, },
  ])

  const [listAllCurrencies, setListAllCurrencies] = useState([]);
  const [listFilteredByQuotation, setListFilteredByQuotation] = useState([]);
  const [listFilteredByIndicator, setListFilteredByIndicator] = useState([])

  const [dbCurrencies, setDbCurrencies] = useState([]);

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
  const _fetchDbCurrencies = async () => {
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
    return Promise.all([_fetchDbCurrencies(), _fetchBinanceCurrencies()]);
  }

  useEffect(() => {
    executeAsyncFunctionsTogether()
      .then(results => {
        // filtra moedas na lista negra escolhidas pelo usário e salvas no banco de dados.
        let isBlackListed = results[0].filter(item => item.is_blacklisted).map(item => item.symbol);
        // filtra as possíveis de negócio
        let isWhiteListed = results[1].filter(c => !isBlackListed.includes(c.pair));
        // seta as moedas filtradas.
        setListAllCurrencies(isWhiteListed);
        setDbCurrencies(results[0])
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

  }, []);

  useEffect(() => {

    let isBlackListed = dbCurrencies.filter(item => item.is_blacklisted).map(item => item.symbol);

    let isWhiteListed = listAllCurrencies.filter(c => !isBlackListed.includes(c.pair)
    );

    setListAllCurrencies(isWhiteListed);

  }, [dbCurrencies]);

  useEffect(() => {

    let filteredByQuotation = listAllCurrencies.filter(coin => {
      const checked = quoteCurrencies.filter(qc => qc.checked);
      return checked.some(crypto => coin.pair.endsWith(crypto.name));
    });

    setListFilteredByQuotation(filteredByQuotation);

  }, [listAllCurrencies, quoteCurrencies]);


  return (
    <OptionsCurrenciesContext.Provider value={{
      quoteCurrencies, setQuoteCurrencies,
      intervals, setIntervals,
      searchCurrencies, setSearchCurrencies,
      indicatorsCurrencies, setIndicatorsCurrencies,
      listAllCurrencies, setListAllCurrencies,
      listFilteredByQuotation, setListFilteredByQuotation,
      listFilteredByIndicator, setListFilteredByIndicator,
      dbCurrencies, setDbCurrencies
    }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider }