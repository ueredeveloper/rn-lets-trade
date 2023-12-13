const sortByBollingersLowerAndCandlesClose = (coins) => {

    /* function compare(a, b) {
         if (a > b) {
             return -(a - b) / a * 100;
         }
         return (a - b) / a * 100;
 
     }*/

    coins.sort((x, y) => {
        let lenX = x.candles.length
        let lenY = y.candles.length

        return ((Number(x.candles[lenX - 1].close) - x.bollingerBands.lower[lenX - 1]) / x.candles[lenX - 1].close) -
            ((Number(y.candles[lenY - 1].close) - y.bollingerBands.lower[lenY - 1]) / y.candles[lenY - 1].close)
    });

    return coins;

}

export { sortByBollingersLowerAndCandlesClose }