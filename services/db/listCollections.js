import { NHOST_ADMIN_SECRET } from "@env";

const listCollections = async () => {

  try {
    let response = await fetch(
      'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/collection',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'x-hasura-admin-secret': NHOST_ADMIN_SECRET
        },
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

export default listCollections;

