import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
import Navigation from "../Navigation";
const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function BottomTabs({ navigation }) {
  return (
    <View
      style={{
        flexDirection: "row",
        // margin: 10,
        // marginHorizontal: 0,
        width: "100%",
        justifyContent: "space-between",
      }}
    >
     
     
      <Icon
        icon="home-outline"
        text="Home"
        navigation={navigation}
        navigateTo="Home"
      />
      <Icon icon="bar-chart-outline" text="Monitor" navigation={navigation}
        navigateTo="Monitor" />
      <Icon icon="newspaper-outline" text="Plan" />
      <Icon icon="people-outline" text="Contact" />
      <Icon icon="watch-outline" text="Devices" />
    </View>
  );
}

const Icon = (props) => (

  <TouchableOpacity onPress={() => props.navigation.navigate(props.navigateTo)}>
    <View style={{ backgroundColor: "lightblue", width: 60 }}>
      {/* <FontAwesome5
        name={props.icon}
        size={25}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      /> */}
      <IonIcon
        name={props.icon}
        size={29}
        style={{
          marginBottom: 3,
          alignSelf: "center",
        }}
      ></IonIcon>
      <Text style={{ textAlign: "center" }}>{props.text}</Text>
    </View>
  </TouchableOpacity>
);
