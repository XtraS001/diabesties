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
import BottomTabs from "../component/BottomTab";

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>Hello</Text>
      <BottomTabs />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    paddingLeft: "10%",
    paddingRight: "10%",
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "#ffffff",
    // alignItems: "flex-start",          //y-axis
    alignItems: "flex-start", //y-axis
    justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },
});
