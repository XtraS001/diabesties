import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

const Condition = (props) => {
  return (
    <View
      style={{
        backgroundColor: props.color,
        width: componentWidth * 0.25,
        height: componentHeight * 0.05,
        borderRadius: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <Text style={styles.titleText}>Monitoring</Text> */}
      <Text style={Styles.textStyles}>{props.severeness}</Text>
    </View>
  );
};

export default function ConditionsBar(props) {
  return (
    <View style={Styles.container}>
      {/* <Text>Hello conditionbar here</Text> */}
      <Condition severeness={"Normal"} color={"#6699CC"} />
      <Condition severeness={"Moderate"} color={"#F0AD4E"} />
      <Condition severeness={"Severe"} color={"#DB3E4D"} />
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    borderRadius: 30,
    width: componentWidth * 0.8,
    justifyContent: "space-between",
    // backgroundColor: 'green',
  },
  textStyles: {
    fontSize: 16,
    color: "white",
  },
});
