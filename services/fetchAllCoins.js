import { fetchClient } from "./fetchClient";

const fetchAllCoins = async () => {

  try {
    const client = await fetchClient();
    const coins = await client.prices();
    // Convert object to array of objects
    const listCoins = Object.entries(coins).map(([pair, price]) => ({
      pair: pair,
      price: price,
    }));
    return listCoins;
  } catch (error) {
    console.error('Error fetching prices:', error);
  }
};

export { fetchAllCoins }