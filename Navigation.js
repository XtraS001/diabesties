import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
// import { createStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";

// import AppLoading from "expo-app-loading";
import FirstPage from "./pages/FirstPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import SignUpDetail from "./pages/SignUpDetail";
import AccountCreated from "./pages/AccountCreated";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";


// const Stack = createStackNavigator();

export default function Navigation() {
  const Stack = createStackNavigator();

  const screenOptions = {
    headerShown: false,
  };

  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="FirstPage" screenOptions={screenOptions}> */}
      <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="SignUpDetail" component={SignUpDetail} />
        <Stack.Screen name="AccountCreated" component={AccountCreated} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Monitor" component={Monitor} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
