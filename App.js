import { StatusBar } from "expo-status-bar";
import AccountCreated from "./pages/AccountCreated";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";

import Navigation from "./Navigation";
import DeepLink from "./DeepLink";
import IonIcon from "react-native-vector-icons/Ionicons";
import Testwebview from "./Testwebview";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import AppStateExample from "./pages/MyComponent";
import ConditionsBar from "./component/ConditionsBar";
import BottomTabs from "./component/BottomTab";
import MyComponent from "./pages/MyComponent";
import HeaderTab from "./component/HeaderTab";
export default function App() {
  // return <DeepLink/>;
  // return <FirstPage/>;
  // return <Testwebview/>;
  return <Navigation/>;
  // return <HeaderTab/>;
  // return <ConditionsBar/>;
  // return <BottomTabs/>;
  // return <SignUp/>;
  // return <AppStateExample/>;
  // return <MyComponent/>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: "10%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
  },
});

// Deeplink
