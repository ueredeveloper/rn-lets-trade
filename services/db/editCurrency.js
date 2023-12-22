import { NHOST_ADMIN_SECRET } from "@env";

const editCurrency = async (currency) => {

    let id = currency.object.id;
    console.log('edit coin ', id, currency.object.is_blacklisted)

    try {
        let response = await fetch(
            'https://rndhdcgyemijvebfqipo.hasura.sa-east-1.nhost.run/api/rest/currency/' + id,
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

export { editCurrency }