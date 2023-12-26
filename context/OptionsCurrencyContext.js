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
        // filtra moedas na lista negra escolhidas pelo usário e salvas no banco de dados.
        let isBlackListed = results[0].filter(item => item.is_blacklisted).map(item => item.symbol);
        // filtra as possíveis de negócio
        let isWhiteListed = results[1].filter(c => !isBlackListed.includes(c.pair));
        // seta as moedas binance filtradas, sem blacklist.
        setBinanceCurrencies(isWhiteListed);
        // Seta moedas puxadas do banco de dados
        setDataBaseCurrencies(results[0])

        let quote = 'USDT';
        let filtered = isWhiteListed.filter(currency => {
          return currency.pair.endsWith(quote)
        });

        setFilteredByQuotation({
          quote: quote,
          list: filtered
        }
        )

        setFilteredCurrencies(filtered)
      })
      .catch(error => {
        console.error('Error occurred:', error);
      });

  }, []);

  return (
    <OptionsCurrenciesContext.Provider value={{
      intervals, setIntervals,
      binanceCurrencies, setBinanceCurrencies,
      filteredByQuotation, setFilteredByQuotation,
      filteredByIndicator, setFilteredByIndicator,
      dataBaseCurrencies, setDataBaseCurrencies,
      filteredCurrencies, setFilteredCurrencies
    }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider }