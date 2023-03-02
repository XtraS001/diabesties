import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import React, { useState } from "react";
// import SignIn from "../SignIn";
import LanguageTab from "../LanguageTab";

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function FirstPage({ navigation }) {
  const [activeTab, setActiveTab] = useState("EN");

  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/bloodDrop.png")}
          style={{ width: 35.55, height: 40.55 }}
        />
        <Text style={{ fontSize: 38, fontWeight: "bold", color: "#66CCFF" }}>
          DiaBESTies
        </Text>
      </View>
      <Image
        source={require("../assets/robotHuman.png")}
        style={{ width: 200, height: 250 }}
      />
      <Text style={styles.textStyles1}> Intelligent virtual health </Text>
      <Text style={styles.textStyles1}> coach for diabetes</Text>
      <Text style={styles.textStyles1}> management and intervention </Text>
      <LanguageTab activeTab={activeTab} setActiveTab={setActiveTab} />

      <TouchableOpacity
        style={styles.button}
        // onPress={() => console.log("Sign In")}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View
        style={{
          // backgroundColor: "white",
          width: "100%",
          height: 60,
          alighSelf: "flex-start",
          // position: "absolute",
          top: componentHeight * 0.1,
        }}
      ></View>

      <TouchableOpacity
        style={styles.button2}
        // onPress={() => console.log("Create Account")}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={styles.buttonText2}>Create Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    //   flexDirection:
  },

  textStyles1: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#6699CC",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    height: 50,
    width: 334,
    position: "absolute",
    left: 40,
    top: componentHeight * 0.7,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    // fontFamily: "Merriweather_400Regular"
  },

  button2: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    height: 50,
    width: 334,
    position: "absolute",
    left: 40,
    top: componentHeight * 0.77,
    borderRadius: 10,
    borderColor: "#6699CC",
    borderWidth: 2,
  },
  buttonText2: {
    color: "#6699CC",
    fontSize: 16,
    textAlign: "center",
    // fontFamily: "Merriweather_400Regular"
  },
});

const textStyles1 = StyleSheet.create({
  container: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
    //   flexDirection:
  },
});

const signInStyle = StyleSheet.create({
  container: {
    color: "#6699CC",
    textAlign: "center",

    textColor: "blue",
    borderColor: "#6699CC",
    //   flexDirection:
  },
});
