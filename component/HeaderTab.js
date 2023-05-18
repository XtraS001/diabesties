import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";

import DiabestiesLogo from "./DiabestiesLogo";
const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function HeaderTab({ navigation }) {
  return (
    <View
      style={{
        padding: 10,
        paddingLeft: 30,
        // margin: 10,
        // marginHorizontal: 0,
        // flex: 1,
        //width: componentWidth,
        backgroundColor: "#F2F2F2",
        justifyContent: "center", //x-axis
        alignItems: "center", //y-axis
        // position: "absolute",
        // bottom: componentHeight * 0.8,
        shadowColor: "#000",
        // shadowOffset: { width: 0, height: -2000 },
        // shadowOpacity: 0.9,
        // shadowRadius: 200,

        elevation: 222,
      }}
    >
      <View
        style={{
          // flex: 1,
          //width: componentWidth * 0.9,
          flexDirection: "row",
          justifyContent: "space-between",
          // position: "absolute",
          // left:40,

          //   backgroundColor: "lightblue",
          // justifyContent: "center", //x-axis
        }}
      >
        <DiabestiesLogo />
        <IonIcon name="person-circle-sharp" size={60} color="#707070"></IonIcon>
        {/* <Text>hello</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textDarkBlue: {
    color: "#6699CC",
    fontSize: 42,
    fontWeight: "bold",
  },
  textLightBlue: {
    color: "#66CCFF",
    fontSize: 42,
    fontWeight: "bold",
  },
});
