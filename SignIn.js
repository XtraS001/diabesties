import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput } from "react-native";

export default function FirstPage() {
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          alignItems: "flex-start",
          justifyContent: "flex-start",
        }}
      >
        <Image
          source={require("./assets/backArrow.png")}
          style={{ width: 16.67, height: 27 }}
        />
      </View>
      <Text style={welcomeText.container}> Welcome </Text>
      <Text style={signInText.container}> Sign in to continue </Text>

      <Text>Email</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="test@gmail.com"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
      <Text>Password</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="**********"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "5%",
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    //   flexDirection:
  },
});

const welcomeText = StyleSheet.create({
  container: {
    fontSize: 38,
    color: "#2E2E2E",
    textAlign: "left",
    //   flexDirection:
  },
});

const signInText = StyleSheet.create({
  container: {
    fontSize: 16,
    color: "#999999",
    textAlign: "left",
    //   flexDirection:
  },
});
