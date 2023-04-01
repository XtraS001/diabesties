import React from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import IonIcon from "react-native-vector-icons/Ionicons";
const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function BottomTabs({ navigation }) {
  return (
    <View
      style={{
        // margin: 10,
        // marginHorizontal: 0,
        // flex: 1,
        //width: componentWidth,
        backgroundColor: "lightblue",
        justifyContent: "center", //x-axis
        position: "absolute",
        top: componentHeight * 0.8,
        shadowColor: "#000",
        // shadowOffset: { width: 0, height: -2000 },
        // shadowOpacity: 0.9,
        // shadowRadius: 200,
        
        elevation: 2222,
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

          backgroundColor: "lightblue",
          // justifyContent: "center", //x-axis
        }}
      >
        <Icon
          icon="home-outline"
          text="Home"
          navigation={navigation}
          navigateTo="Home"
        />
        <Icon
          icon="bar-chart-outline"
          text="Monitor"
          navigation={navigation}
          navigateTo="Monitor"
        />
        <Icon icon="newspaper-outline" text="Plan" />
        <Icon icon="people-outline" text="Contact" />
        <Icon icon="watch-outline" text="Devices" />
      </View>
    </View>
  );
}

const Icon = (props) => (
  <TouchableOpacity onPress={() => props.navigation.navigate(props.navigateTo)}>
    <View style={{ backgroundColor: "lightblue", width: componentWidth * 0.2 }}>
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
