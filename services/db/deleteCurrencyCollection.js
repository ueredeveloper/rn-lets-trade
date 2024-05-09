import { NHOST_ADMIN_SECRET } from "@env";

const deleteCurrencyCollection = async (id) => {

  console.log('currency colllection id ', id)
  try {
    let response = await fetch(
      `https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency_collection/${id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': NHOST_ADMIN_SECRET
        }
      }
    );

    if (!response.ok) {
      let errorResponse = {
        status: response.status,
        error: await response.json()
      };

      return errorResponse
    }

    let data = await response.json();
    return {
      status: response.status,
      data: data
    };
  } catch (error) {
    return { error };
  }
};

export default deleteCurrencyCollection;


