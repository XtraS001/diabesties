import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LanguageTab(props) {
  return (
    <View style={Styles.container}>
      <HeaderButton
        text="EN"
        btnColor="#6699CC"
        textColor="white"
        borderColor= "#6699CC"
        borderLeftColor= "green"       
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
      <HeaderButton
        text="BM"
        btnColor="#FFFFFF"
        textColor="#6699CC"
        borderColor= "#6699CC"
       
        borderLeftColor= "gold"
        activeTab={props.activeTab}
        setActiveTab={props.setActiveTab}
      />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row", alignSelf: "center", borderRadius: 30, borderColor: "#6699CC", 
  }
});


const HeaderButton = (props) => (
    <TouchableOpacity
      style={{
        backgroundColor: props.activeTab === props.text ? "#6699CC" : "#FFFFFF",
        paddingVertical: 13,
        paddingHorizontal: 25,
        borderRadius: 30,
        borderColor: "#6699CC",
        
        borderWidth: 2,
        marginTop: 5,
      }}
      onPress={() => props.setActiveTab(props.text)}
    >
      <Text
        style={{
          color: props.activeTab === props.text ? "#FFFFFF" : "#6699CC",
          fontSize: 16,
          fontStyle: "bold",
          // fontFamily: "Merriweather_400Regular"
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
  );