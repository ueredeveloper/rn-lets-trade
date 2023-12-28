import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BrowserScreen, HomeScreen } from './screens';
import { OptionsCurrenciesProvider } from './context/OptionsCurrencyContext';

const Stack = createStackNavigator();

function MyStack() {

  return (

    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"

        children={props => (
          <OptionsCurrenciesProvider>
            <HomeScreen {...props} />
          </OptionsCurrenciesProvider>
        )}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="BrowserScreen"
        component={BrowserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>

  );
}
function App() {

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <MyStack />
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App;