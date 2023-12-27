import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserScreen, HomeScreen } from './screens';
import { OptionsCurrenciesProvider } from './context/OptionsCurrencyContext';

const Stack = createStackNavigator();

function MyStack() {

  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen"
        children={props => (
          <OptionsCurrenciesProvider>
            <HomeScreen {...props} />
          </OptionsCurrenciesProvider>
        )} />
      <Stack.Screen name="BrowserScreen" component={BrowserScreen} />
    </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
