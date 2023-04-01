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

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function AccountCreated({ navigation }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          right: 20,
          // paddingBottom: 20,
          paddingBottom: componentHeight * 0.023,
        }}
      >
        <Icon
          color="#2E2E2E"
          name="chevron-left"
          onLongPress={() => console.log("onLongPress()")}
          onPress={() => console.log("onPress()")}
          size={50}
          type="material"
        />
        <Icon />
      </View>

      <View
        style={{
          height: 80,
          width: "100%",
          backgroundColor: "white",
          top: 40,
          alignItems: "center",
        }}
      >
        <Text style={styles.welcomeText}>Success!</Text>
        <View style={{ paddingTop: 70 }}></View>
        <IonIcon name="person-circle-sharp" size={80} color="#6699CC"></IonIcon>
        <Icon />
        <Text style={styles.accountCreatedText}>Account Created</Text>
        <View
          style={{
            backgroundColor: "#BBEAFE", //Checked
            height: componentHeight * 0.047,
            width: "80%",
            alignItems: "center", //x-axis
            justifyContent: "center", //y-axis
          }}
        >
          <Text
            style={{
              alignItems: "flex-start",
              justifyContent: "center",
              fontSize: 20,
              color: "#6699CC",
            }}
          >
            *************
          </Text>
        </View>
        <View style={{ paddingTop: 40 }}></View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.textStyle}>
            You can now login with test@gmail.com
          </Text>
          <Text style={styles.textStyle}>using password entered into</Text>
          <Text style={styles.textStyle}>DiaBESTies!</Text>
        </View>
      </View>

      <View style={{ paddingTop: 50 }}></View>
      <TouchableOpacity
        style={styles.button}
        // onPress={console.log("Pressed signin")}
        // onPress={() => console.log("Create account")}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Get Started Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    paddingLeft: "10%",
    paddingRight: "10%",
    // backgroundColor: "#ffffff",
    backgroundColor:"white",
    // alignItems: "flex-start",          //y-axis
    alignItems: "flex-start", //y-axis
    justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },

  welcomeText: {
    fontSize: 38,
    color: "#2E2E2E", //Check
    textAlign: "center",
    // flexDirection: "row",
    justifyContent: "flex-start",
    //   flexDirection:
    fontWeight: "bold",
  },

  accountCreatedText: {
    fontSize: 22,
    color: "#6699CC",
    textAlign: "center",
    fontWeight: "bold",
    bottom: 20,
  },

  textStyle: {
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
});
