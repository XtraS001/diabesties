import { StatusBar } from "expo-status-bar";
import AccountCreated from "./pages/AccountCreated";
import Home from "./pages/Home";
import Monitor from "./pages/Monitor";
import TestTime from "./component/TestTime";
import TestPage from "./pages/TestPage";

import TestPage3 from "./pages/TestPage3";
import Navigation from "./Navigation";
import React from 'react';
import { StyleSheet, Text, View, Platform, Dimensions } from "react-native";

import { Amplify, Notifications } from "aws-amplify";
import awsconfig from "./src/aws-exports";
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";

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
  header: "My Customized Sign Up",
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

const App = () => {
  // return <Navigation />;
  return (
    // <React.StrictMode>
      // <Navigation />
      <TestPage3/>
     
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
