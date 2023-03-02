import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

export default function PickGender(props) {
  return (
    <View style={Styles.container}>
      <HeaderButton
        text="Male"
        btnColor="#6699CC"
        textColor="white"
        borderColor="#6699CC"
        borderLeftColor="green"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton2
        text="Female"
        btnColor="#FFFFFF"
        textColor="#6699CC"
        borderColor="#6699CC"
        borderLeftColor="gold"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 30,
    borderColor: "#6699CC",
    paddingBottom: 10,
  },
});

const HeaderButton = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "#6699CC" : "#FFFFFF",
      paddingVertical: 0,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: "#6699CC",
      height: 52,
      width: "50%",
      borderWidth: 2,
      marginTop: 5,
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <IonIcon
        name={props.activeTab === props.text ? "man" : "man-outline"}
        size={25}
        color={props.activeTab === props.text ? "white" : "#6699CC"}
        onPress={() => console.log("Choose Birthdate")}
      ></IonIcon>
      <Text
        style={{
          paddingLeft: 20,
          color: props.activeTab === props.text ? "#FFFFFF" : "#6699CC",
          fontSize: 16,
          fontStyle: "bold",
          // fontFamily: "Merriweather_400Regular"
        }}
      >
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);

const HeaderButton2 = (props) => (
  <TouchableOpacity
    style={{
      backgroundColor: props.activeTab === props.text ? "#6699CC" : "#FFFFFF",
      paddingVertical: 0,
      paddingHorizontal: 10,
      borderRadius: 10,
      borderColor: "#6699CC",
      height: 52,
      width: "50%",
      borderWidth: 2,
      marginTop: 5,
      flexDirection: "row",
      alignSelf: "center",
      alignItems: "center",
    }}
    onPress={() => props.setActiveTab(props.text)}
  >
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
      }}
    >
      <IonIcon
        name={props.activeTab === props.text ? "woman" : "woman-outline"}
        size={25}
        color={props.activeTab === props.text ? "white" : "#6699CC"}
        onPress={() => console.log("Choose Birthdate")}
      ></IonIcon>
      <Text
        style={{
          paddingLeft: 20,
          color: props.activeTab === props.text ? "#FFFFFF" : "#6699CC",
          fontSize: 16,
          fontStyle: "bold",
          // fontFamily: "Merriweather_400Regular"
        }}
      >
        {props.text}
      </Text>
    </View>
  </TouchableOpacity>
);
