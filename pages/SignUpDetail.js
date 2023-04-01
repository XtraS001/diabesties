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

export default function SignUpDetail({navigation}) {
  const [activeTab, setActiveTab] = useState("Male");
  
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
        {/* <IonIcon name="man-outline" size={16} color="black"></IonIcon> */}
      </View>

      <Text style={styles.welcomeText} >Create Account</Text>

      <Text style={styles.signInText}>Step2: Tell Us About Yourself</Text>

      <View style={{ paddingTop: 80 }}></View>

      <Text style={styles.emailText}>Gender</Text>
      <PickGender activeTab={activeTab} setActiveTab={setActiveTab} />
      <Text style={styles.emailText}>Birthdate</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.textInput2}
          placeholder="Click to select"
          
          // onChangeText={newText => setText(newText)}
          // defaultValue={text}
        />
        <View style={{ paddingLeft: 10 }}>
          <IonIcon
            name={"calendar-outline"}
            size={20}
            color="black"
            onPress={() => console.log("Choose Birthdate")}
          ></IonIcon>
        </View>
      </View>

      <Text style={styles.emailText}>Diabetes Types</Text>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignSelf: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          style={styles.textInput2}
          placeholder="Click to select"
          
          // onChangeText={newText => setText(newText)}
          // defaultValue={text}
        />
        <View style={{ paddingLeft: 10 }}>
          <IonIcon
            name={"chevron-down-outline"}
            size={20}
            color="black"
            onPress={() => console.log("Select type")}
          ></IonIcon>
        </View>
      </View>
      <View style={{ paddingTop: 50 }}></View>
      <TouchableOpacity
        style={styles.button}
        // onPress={console.log("Pressed signin")}
        // onPress={() => console.log("Create account")}
        onPress={() => navigation.navigate("AccountCreated")}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <View
        style={{
          // backgroundColor: "white",
          width: "100%",
          height: 60,
          alighSelf: "flex-start",
          // position: "absolute",
          top: componentHeight * 0.1,

          // justifyContent: "center",
        }}
      ></View>

      <TouchableOpacity
        style={styles.button2}
        // onPress={() => console.log("Cancel")}
        onPress={() => navigation.navigate("FirstPage")}
        // onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText2}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    paddingLeft: "10%",
    paddingRight: "10%",
    // flex: 1,
    // flexDirection: "column",
    backgroundColor: "#ffffff",
    // alignItems: "flex-start",          //y-axis
    alignItems: "flex-start", //y-axis
    justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },

  welcomeText: {
    // flex: 0.1,
    fontSize: 38,
    // right: 10,
    color: "#2E2E2E",
    textAlign: "left",
    // flexDirection: "row",
    justifyContent: "flex-start",
    //   flexDirection:
    fontWeight: "bold",
  },

  signInText: {
    fontSize: 20,
    color: "#999999",
    textAlign: "left",
    // paddingBottom: 1000,
  },

  emailText: {
    fontSize: 14,
    color: "#999999",
    textAlign: "left",
  },

  textInput: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: 10,
    marginVertical: 7,
    width: "100%",
    height: 50,
    color: "#000",
    fontSize: 16,
    // fontFamily: "MerriweatherSans_400Regular",
    flexShrink: 1,
  },

  textInput2: {
    backgroundColor: "#f6f6f6",
    borderRadius: 5,
    padding: 10,
    marginVertical: 7,
    width: "90%",
    height: 50,
    color: "#000",
    fontSize: 16,
    // fontFamily: "MerriweatherSans_400Regular",
    flexShrink: 1,
  },

  forgotPassword: {
    textAlign: "right",
    color: "#6699CC",
    // fontWeight: "underline",
    textDecorationLine: "underline",
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

  newToDiaBESTies: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
});
