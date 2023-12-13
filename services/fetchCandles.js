import { fetchClient } from "./fetchClient";

const fetchCandles = async (symbol, limit, interval) => {

    try {
        const client = await fetchClient();
        const candles = await client.candles({ symbol: symbol, limit: limit, interval: interval })
        return candles;

    } catch (error) {
        console.error('Error fetching candles: ', error);
    }
};

export { fetchCandles }