import { StatusBar } from "expo-status-bar";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import SignUpDetail from "./pages/SignUpDetail";
import FirstPage from "./pages/FirstPage";
import AccountCreated from "./pages/AccountCreated";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";

import Navigation from "./Navigation";
import IonIcon from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";

export default function App() {
  return <Navigation/>;
  // return <SignUp/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "10%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
  },
});

// Deeplink
