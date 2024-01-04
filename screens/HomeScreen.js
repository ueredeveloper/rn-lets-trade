

import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import ListCurrencies from '../components/ListCurrencies';
import { Currencies } from '../components';
import SettingsScreen from './SettingsScreen';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab1 = createBottomTabNavigator();

const Tab2 = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {

    //App -> HomeScreen

    const { quotationCurrencies, collections, setCollections } = useContext(OptionsCurrenciesContext);

    useEffect(() => {

        // Filtar por tipo de coleção (favorites, blacklisted, ...)
        setCollections((prevState) => {
            let _prevState = prevState.map((prev) => {
                return {
                    ...prev,
                    list: quotationCurrencies.filter((item) => {
                        if (
                            item.currency_collections.some(
                                (collection) => collection.collection_id === prev.id
                            )
                        ) {
                            return item;
                        }
                    }),
                };
            });

            return _prevState;
        });


    }, [quotationCurrencies])

    return (
        <Tab1.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Moedas') {
                        iconName = focused ? 'home-outline' : 'home';
                    } else if (route.name === 'Preferências') {
                        iconName = focused ? 'settings-outline' : 'settings';
                    }
                    else if (route.name === 'Coleções') {
                        iconName = focused ? 'bookmarks-outline' : 'bookmarks';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
                 {console.log('home screen render')}
            <Tab1.Screen name="Moedas"
                children={() => (
                    <Currencies navigation={navigation} />
                )} />
            <Tab1.Screen name="Coleções" children={() => (
                <View style={{ flex: 1, }}>
                    <Tab2.Navigator
                    >
                        {
                            collections.map((collection, i) =>
                                <Tab2.Screen
                                    options={{
                                        tabBarShowLabel: false,
                                        tabBarLabelPosition: 'bellow-icon',
                                        tabBarIcon: () => (
                                            <MaterialCommunityIcons name={collection.icons[0]} color={'black'} size={24} />
                                        ),
                                    }}
                                    key={`_tab_screen_${i}`}
                                    name={collection.name}
                                    children={() => (
                                        <ListCurrencies currencies={collection.list} navigation={navigation} />
                                    )}
                                />)
                        }

                    </Tab2.Navigator>
                </View>

            )} />

            <Tab1.Screen name="Preferências" component={SettingsScreen} />

        </Tab1.Navigator>
    );
}

export default HomeScreen;


