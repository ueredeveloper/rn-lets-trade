import React, { createContext, useState, useEffect } from "react";
import { listCurrencies } from "../services/db";


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
    { name: 'BolllingerBands', checked: false, },
    { name: 'RSI', checked: true, },
    { name: 'EFI', checked: false, },
    { name: 'Candles', checked: false, },
    { name: 'MacD', checked: false, },
  ])

  const [listCoins, setListCoins] = useState({
    list: [],
    listByQuotation: {
      date: new Date(),
      list: []
    },
    listByBBIndicator: {
      date: new Date(),
      list: [],
      bollingerBands: []
    }
  });

  const [currencies, setCurrencies] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const result = await listCurrencies();
      if (result.error) {
        // Handle error here
        console.error('Error fetching data:', result.error);
      } else {
        // Handle data here
        setCurrencies(result.data.currency)
      }
    };

    fetchData();

  }, []);

  return (
    <OptionsCurrenciesContext.Provider value={{
      quoteCurrencies, setQuoteCurrencies,
      intervals, setIntervals,
      searchCurrencies, setSearchCurrencies,
      indicatorsCurrencies, setIndicatorsCurrencies,
      listCoins, setListCoins,
      currencies, setCurrencies
    }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider }