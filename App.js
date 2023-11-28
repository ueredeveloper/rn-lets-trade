import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, ScrollView, Button, Alert } from "react-native";
import Binance from 'binance-api-react-native';
import {BINANCE_API_KEY, BINANCE_SECRECT_KEY} from "@env";

let i = 0;

export default function App() {

  // Authenticated client, can make signed calls
 const client = Binance({
    apiKey: BINANCE_API_KEY,
    apiSecret: BINANCE_SECRECT_KEY,
  });

  //client.time().then(time => console.warn(time));

  const loadCandle = async ()=>{
    console.log(await client.candles({ symbol: 'BTCUSDT', interval: '1d', limit: 2 }))
  }

  loadCandle();

 
  return (
    <View style={styles.container}>
     <Text>Hello world With GitHub Space</Text>
     <Button
        title="Press me"
        onPress={() => Alert.alert('Simple Button pressed: '+ i++)}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});