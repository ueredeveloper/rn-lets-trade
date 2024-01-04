import { useState } from 'react';
import { ScrollView } from 'react-native';
import Collection from './Collection';

function CurrencyCollection({ currency, collections }) {

    // InfoCurrency -> CurrencyCollection

    const [selectedCurrency, setSelectedCurrency] = useState({
        object: {
            id: currency.id,
            symbol: currency.symbol,
            currency_collections: currency.currency_collections,
        }
    });

    return (
        <ScrollView horizontal={true} style={{ paddingTop: 15, paddingBottom: 15 }}>
            {collections.map((collection, i) => (
                <Collection key={`collection_${i}`} selectedCurrency={selectedCurrency} setSelectedCurrency={setSelectedCurrency} collection={collection} />
            ))}
        </ScrollView>

    );
}


export default CurrencyCollection;
