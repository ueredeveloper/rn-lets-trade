
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useContext } from 'react';
import { Currencies, SettingsView } from '../components';
import { Ionicons } from '@expo/vector-icons';
import { OptionsCurrenciesContext } from '../context/OptionsCurrencyContext';
import { View } from 'react-native';
import FlatListCoins from '../components/FlatListCoins';


const Tab1 = createBottomTabNavigator();

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab2 = createMaterialTopTabNavigator();

function HomeScreen({ navigation }) {

    const { filteredByFavorites, filteredByBlackListeds } = useContext(OptionsCurrenciesContext);

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
                    else if (route.name === 'Favoritos e Lista Negra') {
                        iconName = focused ? 'bookmark-outline' : 'bookmark';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
            <Tab1.Screen name="Moedas"
                children={() => (
                    <Currencies navigation={navigation} />
                )} />
            <Tab1.Screen name="Favoritos e Lista Negra" children={() => (
                <View style={{ flex: 1, }}>
                    <Tab2.Navigator>
                        <Tab2.Screen
                            name="Favoritos"
                            children={() => (
                                <FlatListCoins listCoins={filteredByFavorites} navigation={navigation} />)}
                        />
                        <Tab2.Screen
                            name="Lista Negra"
                            children={() => (
                                <FlatListCoins listCoins={filteredByBlackListeds} navigation={navigation} />
                            )}
                        />
                    </Tab2.Navigator>
                </View>

            )} />

            <Tab1.Screen name="Preferências" component={SettingsView} />

        </Tab1.Navigator>
    );
}

export default HomeScreen;


