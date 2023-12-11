const sortByBollingersLowerAndCandlesClose = (coins) => {

    function compare(a, b) {
        if (a > b) {
            return -(a - b) / a * 100;
        }
        return (a - b) / a * 100;

    }

    coins.sort((a, b) => {
        let lenA = a.bollingerBands.lower.length;
        let lenB = b.bollingerBands.lower.length;
        let diffA = compare(a.bollingerBands.lower[lenA - 1], a.candles[lenA - 1].close);
        let diffB = compare(b.bollingerBands.lower[lenB - 1], b.candles[lenB - 1].close);
        return diffA - diffB;
    });

    return coins;

}

export { sortByBollingersLowerAndCandlesClose }