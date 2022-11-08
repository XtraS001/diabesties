import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Button, TextInput, Dimensions } from "react-native";

const width = Dimensions.get("screen").width;
const componentWidth = width * 0.8;

export default function FirstPage() {
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
          paddingBottom: 70,
        }}
      >
        <Image
          source={require("./assets/backArrow.png")}
          style={{ width: 16.67, height: 27 }}
        />
      </View>
      <View style={{
        width: 300,
        height: 100,
      }}>
        <Text style={styles.welcomeText}> Welcome </Text>
      </View>
      {/* <View style={{justifyContent: "flex-start",}} > */}
      <Text style={signInText.container}>Sign in to continue</Text>
      {/* </View> */}
      
      <View style={{paddingTop: 100,}}></View>
      <Text style={styles.emailText} >Email</Text>
      <TextInput
        style={styles.textInput}
        placeholder="test@gmail.com"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
      <Text style={styles.emailText} >Password</Text>
      <TextInput
        style={styles.textInput}
        placeholder="**********"
        // onChangeText={newText => setText(newText)}
        // defaultValue={text}
      />
      <Text>Forgot Password?</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    paddingLeft: '10%',
    paddingRight: '10%',
    // flex: 1,
    // flexDirection: "column",
    backgroundColor: "#ffffff",
    // alignItems: "flex-start",          //y-axis
    alignItems: "flex-start",          //y-axis
    justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },

  welcomeText: {
    // flex: 0.1,
    fontSize: 38,
    color: "#2E2E2E",
    textAlign: "left",
    // flexDirection: "row",
    justifyContent: "flex-start",
    //   flexDirection:
  },

  signInText: {
    paddingTop: 100,
    fontSize: 20,
    color: "#999999",
    textAlign: "left",
    justifyContent: "flex-start",
    // paddingBottom: 1000,
  },

  emailText: {
    paddingTop:30,
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
    flexShrink: 1
  },

  forgotPassword: {
    
  }

});

const welcomeText = StyleSheet.create({
  container: {
    fontSize: 38,
    color: "#2E2E2E",
    textAlign: "left",
    //   flexDirection:
  },

  signInText:{
    fontSize: 20,
    color: "#999999",
    textAlign: "left",
  }
});

const signInText = StyleSheet.create({
  container: {
    fontSize: 16,
    color: "#999999",
    textAlign: "left",
    //   flexDirection:
  },

  
});
