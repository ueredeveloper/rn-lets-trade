
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { ListCoins, SettingsView } from '../components';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function HomeScreen({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'ListCoins') {
                        iconName = focused ? 'home-outline' : 'home';
                    } else if (route.name === 'SettingsView') {
                        iconName = focused ? 'settings-outline' : 'settings';
                    }

                    // You can return any component that you like here!
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                headerShown: false,
            })}>
            <Tab.Screen name="ListCoins" component={ListCoins} />
            <Tab.Screen name="SettingsView" component={SettingsView} />
        </Tab.Navigator>
    );
}


export default HomeScreen;


