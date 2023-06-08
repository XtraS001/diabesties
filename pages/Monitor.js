import React, { useState, useCallback, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import IonIcon from "react-native-vector-icons/Ionicons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Linking,
  AppState,
  Alert,
} from "react-native";

import HeaderTab from "../component/HeaderTab";
import BottomTabs from "../component/BottomTab";
import ConditionsBar from "../component/ConditionsBar";
import useData from "../hooks/useData";
import TestTime from "../component/TestTime"; // Testing data updating
import { writeFile, readFile } from "../functions/csvFile";

// import { Alert } from "react-native";

const width = Dimensions.get("screen").width;
const componentWidth = width;
const height = Dimensions.get("screen").height;
const componentHeight = height;

const OpenURLButton = ({ url, children }) => {
  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  return <Button title={children} onPress={handlePress} />;
};

async function openAuthUrl(url) {
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    try {
      await Linking.openURL(url);
      // console.log('steps in monitor', steps);
    } catch (err) {
      console.log("err open url", err);
    }
  } else {
    Alert.alert(`Don't know how to open this URL: ${url}`);
  }
}

const DataCard = ({ dataType, dataValue }) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.dataCard}
        // onPress={() => console.log("Sign In")}
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {" "}
          {dataType}{" "}
        </Text>
        <Text
          style={{
            fontSize: 32,
            fontWeight: "bold",
          }}
        >
          {dataValue}{" "}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
function isBool(variable) {
  return typeof variable === "boolean";
}
export default function Monitor({ navigation }) {
  // console.log("useData", useData());
  console.log("open monitor");
  let [authUrl, isAuth, steps, latestHR] = useData()._3;
  const [authUrl2, setAuthUrl] = useState(authUrl);
  const [isAuth2, setIsAuth] = useState(isAuth);
  console.log("in monitor", isAuth);
  // const [steps2, setSteps] = useState(steps);
  // const [latestHR2, setLatestHR] = useState(latestHR);
  const [steps2, setSteps] = useState();
  const [latestHR2, setLatestHR] = useState();

  // let[TestTime] = useData()._4;
  // console.log('Testtime,', TestTime);
  const [activeTab, setActiveTab] = useState("Monitor");
  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // const [renderData, setRenderData] = useState(false);

  // Retrieve data from csv file
  useEffect(() => {
    async function fetchData() {
      console.log("Start Readfile in monitor:");
      let arr = await readFile();
      console.log("Finish Readfile in monitor:", arr);

      setSteps(arr[0]);
      //steps3 = arr[0];
      console.log("Steps:", steps2, arr[0]);
      setLatestHR(arr[1]);
      //latestHR3 = arr[1];
      // console.log("start set var1", var1);
    }
    fetchData();
  }, [steps, latestHR]);

  // Detect app state changes
  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       console.log("App has come to the foreground!");
  //       setRenderData(true);
  //       // [authUrl, isAuth, steps, dataValue] = useData()._3;
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log("AppState", appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // Alert user to allow access to Google Fit data
  useEffect(() => {
    console.log("isAuth in useEffect", isAuth);
    try {
      if (isAuth !== undefined && typeof authUrl !== 'object') {
        if (!isAuth  ) {
          console.log("monitor useeefect authurl:", authUrl);
          Alert.alert(
            "Google Fit Data Access Permission",
            "To continue, you need to allow access to your Google Fit data.",
            [
              {
                text: "OK",
                onPress: () => {
                  console.log("OK Pressed");
                  // openAuthUrl(authUrl2);
                  openAuthUrl(authUrl);
                  // isAuth = true;
                },
              },
              {
                text: "No",
                onPress: () => {
                  console.log("No Pressed");
                  // isAuth = false;
                },
              },
            ],
            { cancelable: true }
          );
        }
      }
    } catch (err) {
      console.log("err in useEffect", err);
    }

    // setRenderData(false);
  }, [isAuth, authUrl]);

  return (
    <View style={styles.container}>
      <HeaderTab />
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "flex-start",
          width: componentWidth * 0.8,
          height: componentHeight * 0.07,
          // backgroundColor: "yellow",
        }}
      >
        <Text style={styles.titleText}>Monitoring Dashboard</Text>
      </View>
      <ConditionsBar />
      {/* <Text>{dataValue}</Text>
      <Text>{steps}</Text> */}
      <DataCard dataType={"Steps"} dataValue={steps} />
      <DataCard dataType={"Steps"} dataValue={steps2} />
      <DataCard dataType={"Calorie"} dataValue={latestHR} />
      <DataCard dataType={"Heart Rate"} dataValue={latestHR2} />
      
      <DataCard dataType={"SpO2"} dataValue={"98% "} />
      {/* <OpenURLButton url={authUrl}>Authored</OpenURLButton>
      <DataCard dataType={'Steps'} dataValue={'value'}/>  */}
      <BottomTabs
        navigation={navigation}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </View>
  );
}
// export default function Monitor({ navigation }) {
//   // console.log("useData", useData());
//   console.log("open monitor");

//   const [authUrl2, setAuthUrl] = useState("");
//   const [isAuth2, setIsAuth] = useState(false);
//   // const [steps2, setSteps] = useState(steps);
//   // const [latestHR2, setLatestHR] = useState(latestHR);
//   const [steps2, setSteps] = useState(0);
//   const [latestHR2, setLatestHR] = useState(0);
//   // let[TestTime] = useData()._4;
//   // console.log('Testtime,', TestTime);
//   const [activeTab, setActiveTab] = useState("Monitor");
//   // const appState = useRef(AppState.currentState);
//   // const [appStateVisible, setAppStateVisible] = useState(appState.current);

//   // const [renderData, setRenderData] = useState(false);

//   useEffect(() => {
//     (async function getAuth() {
//       let [authUrl, isAuth] = await useData();
//       setAuthUrl(authUrl);
//       setIsAuth(isAuth);
//     })();
//   }, []);

//   // Retrieve data from csv file
//   useEffect(() => {
//     async function fetchData() {

//       console.log("Start Readfile in monitor:");
//       let arr = await readFile();
//       console.log("Finish Readfile in monitor:", arr);

//       setSteps(arr[0]);
//       //steps3 = arr[0];
//       console.log("Steps:", steps2, arr[0]);
//       setLatestHR(arr[1]);
//       //latestHR3 = arr[1];
//       // console.log("start set var1", var1);
//     }
//     fetchData();
//   }, [steps2, latestHR2]);

//   // Detect app state changes
//   // useEffect(() => {
//   //   const subscription = AppState.addEventListener("change", (nextAppState) => {
//   //     if (
//   //       appState.current.match(/inactive|background/) &&
//   //       nextAppState === "active"
//   //     ) {
//   //       console.log("App has come to the foreground!");
//   //       setRenderData(true);
//   //       // [authUrl, isAuth, steps, dataValue] = useData()._3;
//   //     }

//   //     appState.current = nextAppState;
//   //     setAppStateVisible(appState.current);
//   //     console.log("AppState", appState.current);
//   //   });

//   //   return () => {
//   //     subscription.remove();
//   //   };
//   // }, []);

//   // Alert user to allow access to Google Fit data
//   useEffect(() => {
//     console.log("isAuth in useEffect", isAuth2);

//     if (isBool(isAuth2)) {
//       if (isAuth2 === false) {
//         Alert.alert(
//           "Google Fit Data Access Permission",
//           "To continue, you need to allow access to your Google Fit data.",
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 console.log("OK Pressed");
//                 openAuthUrl(authUrl2);
//                 // isAuth = true;
//               },
//             },
//             {
//               text: "No",
//               onPress: () => {
//                 console.log("No Pressed");
//                 // isAuth = false;
//               },
//             },
//           ],
//           { cancelable: true }
//         );
//       }
//     }
//     // setRenderData(false);
//   }, [isAuth2]);

//   return (
//     <View style={styles.container}>
//       <HeaderTab />
//       <View
//         style={{
//           justifyContent: "flex-start",
//           alignItems: "flex-start",
//           width: componentWidth * 0.8,
//           height: componentHeight * 0.07,
//           // backgroundColor: "yellow",
//         }}
//       >
//         <Text style={styles.titleText}>Monitoring Dashboard</Text>
//       </View>
//       <ConditionsBar />
//       {/* <Text>{dataValue}</Text>
//       <Text>{steps}</Text> */}
//       <DataCard dataType={"Steps"} dataValue={steps2} />
//       <DataCard dataType={"Steps"} dataValue={steps2} />
//       <DataCard dataType={"Calorie"} dataValue={latestHR2} />
//       <DataCard dataType={"Heart Rate"} dataValue={latestHR2} />
//       <DataCard dataType={"Heart Rate"} dataValue={latestHR2} />
//       <DataCard dataType={"SpO2"} dataValue={"98% "} />
//       {/* <OpenURLButton url={authUrl}>Authored</OpenURLButton>
//       <DataCard dataType={'Steps'} dataValue={'value'}/>  */}
//       <BottomTabs
//         navigation={navigation}
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//       />
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    // paddingTop: "8%",
    // paddingLeft: "20%",
    //paddingRight: "20%",
    // top: 60,
    flex: 1,
    // flexDirection: "column",
    backgroundColor: "#ffffff",
    // alignItems: "flex-start",          //y-axis
    alignItems: "center", //y-axis
    //  justifyContent: "center", //x-axis
    // width : componentWidth,
    //   flexDirection:
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  dataCard: {
    // flex:1,
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#6699CC",
    borderRadius: 20,
    padding: 10,
    paddingLeft: 30,
    marginVertical: 10,
    // height: 50,
    // width: 334,
    // width: '100%',
    width: componentWidth * 0.8,
    height: componentHeight * 0.12,
    // position: "absolute",
    // left: 40,
    // top: componentHeight * 0.7,
    // elevation: 22,
  },
  // dataCardContainer:{
  //   alignItems: "flex-start", //y-axis
  // }
});
