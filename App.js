import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import WalletScreen from "./screens/WalletScreen";
import TotalScreen from "./screens/TotalScreen";
import MenuScreen from "./screens/MenuScreen";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import BottomTap from "./screens/BottomTap";
import tey from "./screens/tey";
import DetailScreen from "./screens/DetailScreen";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

/*
*/
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{headerShown:false}} name="Login" component={LoginScreen} />
      <Stack.Screen options={{headerShown:false }} name="bottomTap" component={BottomTap}/>
      <Stack.Screen name="Menu" component={MenuScreen}/>
      <Stack.Screen name="Detail" options={{headerTitle:"Rewrite Detail"}} component={DetailScreen}/>
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack/>
    </NavigationContainer>
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
