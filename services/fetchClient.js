
import Binance from 'binance-api-react-native';
import { BINANCE_API_KEY, BINANCE_SECRECT_KEY } from "@env";

const fetchClient = () => {
    const client = Binance({
        apiKey: BINANCE_API_KEY,
        apiSecret: BINANCE_SECRECT_KEY,
    });
    return client;
}

export { fetchClient }