import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Icon } from "@rneui/themed";
import PickGender from "../component/PickGender";
import HeaderTab from "../component/HeaderTab";
import BottomTabs from "../component/BottomTab";

import { Auth } from "aws-amplify";

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

async function signOut() {
  try {
    await Auth.signOut();
  } catch (error) {
    console.log("error signing out: ", error);
  }
}

export default function Home({ navigation }) {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <View style={styles.container}>
      <HeaderTab navigation={navigation} />
      <Button onPress={signOut} title="Sign Out" />
      <Text>Hello Home</Text>
      <BottomTabs
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // paddingTop: "8%",
    // paddingLeft: "10%",
    // paddingRight: "10%",
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "#ffffff",
    // alignItems: "flex-start",          //y-axis
    alignItems: "flex-start", //y-axis
    // justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },
});
