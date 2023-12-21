import { NHOST_ADMIN_SECRET } from "@env";

const saveDbCurrency = async ({currency}) => {

    let response = await fetch(
        'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency',
        {
          method: 'POST',
          headers: {
            
            'Content-Type': 'application/JSON',
            'x-hasura-admin-secret': NHOST_ADMIN_SECRET
          },
          body: JSON.stringify(currency)
        }
      );
      
    
      let i = {
        status: await response.status,
        posts: await response.json(),
      };
      return i;
};

export { saveDbCurrency }