const calculateRecentCandles = (bollingerBandsLen, fetchedCandles)=>{
       // Busca dos últimos componentes da array `fetchedCandles` para mostrar com os resultados calculados bollinger bands no chart
       let candles = fetchedCandles.slice(-bollingerBandsLen);

       return candles;
}

export {calculateRecentCandles}