import { NHOST_ADMIN_SECRET } from "@env";

const fetchDbCurrencies = async () => {

    let response = await fetch(
        'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency',
        {
          method: 'GET',
          headers: {
            
            'Content-Type': 'application/JSON',
            'x-hasura-admin-secret': NHOST_ADMIN_SECRET
          },
        }
      );
      console.log(response.json())
    
      let i = {
        status: await response.status,
        posts: await response.json(),
      };
      return i;
};

export { fetchDbCurrencies }