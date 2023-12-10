import React, { createContext, useState } from "react";

const OptionsCurrenciesContext = createContext();

const OptionsCurrenciesProvider = ({ children }) => {
  
    const [intervals, setIntervals] = useState([
        { name: '1m', checked: false },
        { name: '5m', checked: false },
        { name: '15m', checked: false },
        { name: '30m', checked: false },
        { name: '1h', checked: true },
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
      { name: 'USDT', checked: false },
      { name: 'BTC', checked: false },
      { name: 'BNB', checked: true },
      { name: 'ETH', checked: true },
      { name: 'BRL', checked: true },
  ]);
  
  return (
    <OptionsCurrenciesContext.Provider value={{ quoteCurrencies, setQuoteCurrencies, intervals, setIntervals }}>
      {children}
    </OptionsCurrenciesContext.Provider>
  );
};

export { OptionsCurrenciesContext, OptionsCurrenciesProvider}