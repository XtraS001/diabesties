import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function DiabestiesLogo({ navigation }) {
  const text = "DiaBESTies";
  return (
    <View
      style={{
        flexDirection: "row",
        alignContent: "center",
        // backgroundColor: "gold",
        height: 65,
        width: 300,
      }}
    >
      <View
        style={{
          //   backgroundColor: "pink",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../assets/bloodDrop.png")}
          style={{ width: 35.55, height: 40.55 }}
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingLeft: 10,
        }}
      >
        <Text>
          {text.split("").map((char, index) => (
            // index <= 2 or index >=7
            <Text
              key={index}
              style={
                index <= 2 || index >= 7
                  ? styles.textLightBlue
                  : styles.textDarkBlue
              }
            >
              {char}
            </Text>
          ))}
        </Text>
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
