
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Currencies, SettingsView } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FavoriteScreen from './FavoritesScreen';
import { OptionsCurrenciesProvider } from '../context/OptionsCurrencyContext';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'List Coins') {
                        iconName = focused ? 'home-outline' : 'home';
                    } else if (route.name === 'Settings View') {
                        iconName = focused ? 'settings-outline' : 'settings';
                    }
                    else if (route.name === 'Favorites') {
                        iconName = focused ? 'bookmark-outline' : 'bookmark';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
            <Tab.Screen name="Favorites" component={FavoriteScreen} />
            <Tab.Screen name="List Coins" children={() => (
                <OptionsCurrenciesProvider><Currencies navigation={navigation} /></OptionsCurrenciesProvider>
            )} />
            <Tab.Screen name="Settings View" component={SettingsView} />
        </Tab.Navigator>
    );
}

export default HomeScreen;


