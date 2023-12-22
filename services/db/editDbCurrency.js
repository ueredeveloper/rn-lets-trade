import { NHOST_ADMIN_SECRET } from "@env";

const editDbCurrency = async ({ currency }) => {

    console.log(currency)
    try {
        let response = await fetch(
            'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency/' + currency.id,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-hasura-admin-secret': NHOST_ADMIN_SECRET
                },
                body: JSON.stringify(currency)
            }
        );

        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }

        let data = await response.json();

        console.log('edit========== ', data)
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

export { editDbCurrency }