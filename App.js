import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserScreen, HomeScreen } from './screens';
import { fetchDbCurrencies } from './services/db/fetchDbCurrencies';


const Stack = createStackNavigator();


function MyStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="BrowserScreen" component={BrowserScreen} />
    </Stack.Navigator>

  );
}



export default function App() {

/*
  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchDbCurrencies();
      if (result.error) {
        // Handle error here
        console.error('Error fetching data:', result.error);
      } else {
        // Handle data here
        console.log('Fetched data:', result.data);
      }
    };

    fetchData();
  }, []);*/



  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
