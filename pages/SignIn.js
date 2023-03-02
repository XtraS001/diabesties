import { StatusBar } from "expo-status-bar";
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

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

export default function SignIn({navigation}) {
  return (
    <View style={styles.container}>
      <View
        style={{
          // flex: 0.2,
          // flexDirection: "row",
          // justifyContent: "flex-start",
          // height: 30,
          // width: 300,
          // top: 10,
          right: 20,
          paddingBottom: 20,
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

      <Text style={styles.welcomeText}>Welcome</Text>

      <Text style={styles.signInText}>Sign in to continue</Text>

      <View style={{ paddingTop: 120 }}></View>
      <Text style={styles.emailText}>Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="test@gmail.com"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
      <Text style={styles.emailText}>Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="**********"
        secureTextEntry={true}
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />

      <View
        style={{
          backgroundColor: "white",
          width: "100%",
          height: 60,
          alighSelf: "flex-start",
        }}
      >
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>

      <View style={{ paddingTop: 50 }}></View>
      <TouchableOpacity
        style={styles.button}
        // onPress={console.log("Pressed signin")}
        onPress={console.log(componentHeight)}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View
        style={{
          // backgroundColor: "white",
          width: "100%",
          height: 60,
          alighSelf: "flex-start",
          // position: "absolute",
          top: componentHeight *0.1,
          // justifyContent: "center",
        }}
      >
        <Text style={styles.newToDiaBESTies} onPress={() => navigation.navigate("SignUp")}>
          New To DiaBESTies?<Text style={styles.forgotPassword
          }>Sign up</Text>{" "}now
        </Text>
      </View>
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
    // paddingTop: 100,
    // fontSize: 20,
    // color: "#999999",
    // textAlign: "left",
    // justifyContent: "flex-start",
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

  newToDiaBESTies: {
    fontSize: 14,
    color: "#999999",
    textAlign: "center",
  },
});
