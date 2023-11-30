import * as React from 'react';
import { Button, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserScreen, HomeScreen } from './screens';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Browser" component={BrowserScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  // Authenticated client, can make signed calls
 const client = Binance({
    apiKey: BINANCE_API_KEY,
    apiSecret: BINANCE_SECRECT_KEY,
  });

  //client.time().then(time => console.warn(time));

  /*const loadCandle = async ()=>{
    console.log(await client.candles({ symbol: 'BTCUSDT', interval: '1d', limit: 2 }))
  }

  loadCandle();*/
  const getAllPrices = async ()=> {
    console.log(await client.prices())
  }


  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
