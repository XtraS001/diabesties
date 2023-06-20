import { StatusBar } from "expo-status-bar";
import AccountCreated from "./pages/AccountCreated";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";
import TestTime from "./component/TestTime";
import TestPage from "./pages/TestPage";

import TestPage3 from "./pages/TestPage3";
import Navigation from "./Navigation";
import React, { useEffect } from "react";
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";

import { Amplify, API } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";
import PushNotification from "react-native-push-notification";
async function signUp() {
  try {
    const { user } = await Auth.signUp({
      username,
      password,
      attributes: {
        email, // optional
        phone_number, // optional - E.164 number convention
        // other custom attributes
      },
      autoSignIn: {
        // optional - enables auto sign in after user is confirmed
        enabled: true,
      },
    });
    console.log(user);
  } catch (error) {
    console.log("error signing up:", error);
  }
}

// Amplify.configure(awsconfig);

Amplify.configure({
  ...awsconfig,
  Analytics: {
    disabled: true,
  },
});

const signUpConfig = {
  header: "New Account Sign Up",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Full name",
      key: "name",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Email",
      key: "email",
      required: true,
      displayOrder: 2,
      type: "string",
    },
    {
      label: "Username",
      key: "preferred_username",
      required: true,
      displayOrder: 3,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 4,
      type: "password",
    },
    // {
    //   label: "Gender",
    //   key: "birthdate",
    //   required: true,
    //   displayOrder: 5,
    //   type: "date",
    // },
  ],
};

const customTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: "#6699CC",
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: "#6699CC",
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: "#6699CC",
  },
  sectionFooterLinkDisabled: {
    ...AmplifyTheme.sectionFooterLinkDisabled,
    color: "#6699CC",
  },
};

const createChannels = () => {
  PushNotification.createChannel({
    channelId: "test-channel",
    channelName: "Test Channel",
  });
};

const putUserId = async () => {
  let isInCloud = false;
  try {
    let tokensData;
    await API.get("tokensApi", "/tokens/object/userId", {})
      .then((tokenRes) => {
        // Handle the response or perform additional actions after inserting multiple objects
        console.log("tokenRes", tokenRes);
        tokensData = tokenRes;
        // console.log("tokensData", tokensData);
        // if tokensData has no refreshtoken, then get new token
        if (tokensData.userId === undefined) {
          console.log("no userId");
          // handlePutToken();
          // setIsRT(false);
          // setisInCloud(false);
          // isInCloud = false;
          // return false;
          console.log("try put userId");
          API.put("tokensApi", "/tokens", {
            body: {},
          })
            .then(() => {
              // Handle the response or perform additional actions after inserting multiple objects
              console.log("Done put data");
            })
            .catch((e) => {
              console.log("err in put", e);
            });
        } else {
          console.log("has userId");
          // setIsRT(true);
          // setisInCloud(true);
          
        }
      })
      .catch((e) => {
        console.log("err in query", e);
        // const err = { Error: "Request failed with status code 404" };
        // console.log("type", typeof e);
        // if (e === err) {
        //   console.log("e == err");
        // }
      });

    // console.log("try put");
    // await API.put("tokensApi", "/tokens", {
    //   body: {},
    // })
    //   .then(() => {
    //     // Handle the response or perform additional actions after inserting multiple objects
    //     console.log("Done put data");
    //   })
    //   .catch((e) => {
    //     console.log("err in put", e);
    //   });
    // console.log("posting");
  } catch (e) {
    console.log("err posting data", e);
  }
};
const App = () => {
  // return <Navigation />;
  // Create a useeffect to run createchannels

  useEffect(() => {
    createChannels();
    console.log("App Launched");
    putUserId();
  }, []);
  return (
    // <React.StrictMode>
    <Navigation />
    // <TestPage3 />

    // </React.StrictMode>
  );
  // return<Monitor/>;
};

export default withAuthenticator(App, { signUpConfig, theme: customTheme });
// export default App;

// export default function App() {

//   // return <Testwebview/>;
//   return <Navigation/>;

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: "10%",
    backgroundColor: "#fff",
    // alignItems: 'center',
    justifyContent: "flex-start",
  },
});

// AWS
