import { fetchClient } from "./fetchClient";

const fetchAllCoins = async () => {

  try {
    const client = await fetchClient();
    const coins = await client.prices();
    // Convert object to array of objects
    const listCoins = Object.entries(coins).map(([symbol, price]) => ({
      id: null,
      symbol: symbol,
      price: price,
      currency_collections: [[]]
    }));

    
    return listCoins;
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

export { fetchAllCoins }