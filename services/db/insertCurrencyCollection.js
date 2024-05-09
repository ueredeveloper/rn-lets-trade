import { NHOST_ADMIN_SECRET } from "@env";

const insertCurrencyCollection = async (currency_collection) => {
  console.log('services insert cur coll ', currency_collection)

  try {
    let response = await fetch(
      'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency_collection',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': NHOST_ADMIN_SECRET
        },
        body: JSON.stringify(currency_collection)
      }
    );

    if (!response.ok) {

      throw new Error('Network response was not ok.');
    }

    let data = await response.json();
    return {
      status: response.status,
      data: data
    };
  } catch (error) {
    return {
      error: error.message
    };
  }
};

export default insertCurrencyCollection;