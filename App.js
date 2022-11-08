import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import FirstPage from "./pages/FirstPage";
import SignIn from "./SignIn";
import LanguageTab from "./LanguageTab";
import HeaderTabs from "./HeaderTab";
import React, { useState } from "react";

export default function App() {
  // const [activeTab, setActiveTab] = useState("EN");
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start fire on your app!</Text>
    //   <StatusBar style="auto" />

    <SignIn />
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
