const listCurrenciesByIndicator = async ({indicatorsCurrencies, setListFilteredCurrencies, setListFilteredByIndicator}) => {

    // Encontra a moeda indicadora selecionada
    let indicatorCurrency = indicatorsCurrencies.find(ic => ic.checked === true);
    // Verifica se o indicador selecionado é 'BolllingerBands'
    if (indicatorCurrency.name === 'BolllingerBands') {

    try {
        // Moedas a serem buscadas
        const coinsToFetch = filteredCoins;
        //ex: [{"pair": "BTCUSDT", "price": "43663.64000000"},]
        const fetchedCoins = [];

        // Itera sobre as moedas para buscar informações
        for (let i = 0; i < coinsToFetch.length; i += 50) {
            const chunk = coinsToFetch.slice(i, i + 50);
            // Busca as velas (candles) para cada moeda
            const updatedCoins = await Promise.all(
                chunk.map(async coin => {
                    //ex: coin => {"pair": "CELOUSDT", "price": "0.69000000"}


                    // ex: fetchCandles ('ETHDOWNUSDT', 46, '1d')
                    const fetchedCandles = await fetchCandles(coin.pair, 46, interval);
                    // return fetchedCandles -> [{"baseAssetVolume": ".0", "close": "0.", "quoteVolume": "0", "trades": 0, "volume": ""}, {"baseAssetVolume": ...]
                    const bollingerBands = calculateBollingerBands(20, fetchedCandles);
                    // return -> bollingerBands -> {"lower": [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0,...}

                    // ex calculateRecentCandles( 27 [{"baseAssetVolume": "8881899022.0", "close": "0.0", "closeTime": 0, "high": "0.0",
                    const candles = calculateRecentCandles(bollingerBands.upper.length, fetchedCandles);
                    //ex: candles -> [{"baseAssetVolume": "4022022447.0", "close": "0.0", "closeTime": 0, "high": 

                    // return ->  {"pair": "BTTUSDT", "price": "0.00277700"} {"lower": 
                    return { ...coin, bollingerBands, candles };
                })
            );

            fetchedCoins.push(...updatedCoins);
            let sortedCoins = sortByBollingersLowerAndCandlesClose(fetchedCoins)

            setListFilteredCurrencies(sortedCoins)
            // Adiciona as moedas atualizadas ao estado utilizando push
            setListFilteredByIndicator(sortedCoins);

            // console.log(fetchedCoins.length)

            if (i + 50 < coinsToFetch.length) {
                // Aguarda 2 segundos antes de fazer a próxima requisição
                await new Promise(resolve => setTimeout(resolve, 2000));
            }
        }

    } catch (error) {
        console.error('Error fetching candles:', error);
    }

}

}


export {listCurrenciesByIndicator}