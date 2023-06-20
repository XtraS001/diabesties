import React, { useState, useCallback, useEffect, useRef } from "react";
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
import useData2 from "../hooks/useData2";
import TestTime from "../component/TestTime"; // Testing data updating
import { writeFile, readFile } from "../functions/csvFile";
import fitApi from "../api/fitApi";
import { API } from "aws-amplify";
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
        // onPress={() => navigation.navigate("SignIn")}
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

export default function Monitor({ navigation }) {
  // console.log("useData", useData());
  console.log("open monitor");
  // let [authUrl, isAuth, steps, latestHR, totalCal] = useData()._3;
  let [steps, latestHR, totalCal] = useData2(refreshToken)._3;
  // console.log("in monitor", isAuth);
  // const [steps2, setSteps] = useState(steps);
  // const [latestHR2, setLatestHR] = useState(latestHR);
  const [steps2, setSteps] = useState();
  const [latestHR2, setLatestHR] = useState();

  // let[TestTime] = useData()._4;
  // console.log('Testtime,', TestTime);
  const [activeTab, setActiveTab] = useState("Monitor");
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [isRT, setIsRT] = useState(false);
  // const [isInCloud, setisInCloud] = useState(false);
  const [refreshToken, setRefreshToken] = useState('');
  // var refreshToken = '';
  var isInCloud = false;
  let authUrl; // authUrl 2.0
  // console.log("authurl=", authUrl);
  // // const [renderData, setRenderData] = useState(false);

  // Get RT from FitApi and upload to dynamodb
  const getRTFromFitApi = async () => {
    let rt = await fitApi.getRT();
    console.log("rt in monitor", rt);
    if (rt === "") {
      console.log('rt = "" ');
    } else {
      await API.put("tokensApi", "/tokens", {
        body: { refreshToken: rt },
      })
        .then(() => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("Done put data");
          // setisInCloud(true);
          isInCloud = true;
          console.log("isInCloud", isInCloud);
          fitApi.removeRT();
        })
        .catch((e) => {
          console.log("err in put", e);
        });
      console.log("uploading refresh token");
    }

    return rt;
  };

  // Check whether refreshToken exist in dynamodb
  const checkRT = async () => {
    try {
      let tokensData;
      await API.get("tokensApi", "/tokens/object/userId", {})
        .then((tokenRes) => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("tokenRes", tokenRes);
          tokensData = tokenRes;
          // console.log("tokensData", tokensData);
          // if tokensData has no refreshtoken, then get new token
          if (tokensData.refreshToken === undefined) {
            console.log("no refreshtoken");
            isInCloud = false;
            return false;
          } else {
            console.log("has refreshtoken");
            isInCloud = true;
            console.log('Refresh token from cloud:', tokensData.refreshToken);
            // refreshToken = tokensData.refreshToken;
            setRefreshToken(tokensData.refreshToken);
            console.log('refreshtoken = ', refreshToken);
            console.log("isInCloud", isInCloud);
            return true;
          }
        })
        .catch((e) => {
          console.log("err in query", e);
          const err = { Error: "Request failed with status code 404" };
          console.log("type", typeof e);
          if (e === err) {
            console.log("e == err");
          }
        });
      console.log("getting tokensdata");
      console.log("tokensData", tokensData);
    } catch (err) {
      console.log("err in checkRT", err);
    }
  };
  // Retrieve auth url through fetch
  useEffect(() => {
    fetch("https://mydiabesties.pagekite.me/api/getAuthUrl")
      .then((response) => response.json())
      .then((data) => {
        authUrl = data.url;
        console.log("AuthUrl:", authUrl);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  // // New ultimate useeffect
  useEffect(() => {
    const handleAppStateChange = async (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        console.log("App has come to the foreground!");
        await getRTFromFitApi(); // Wait for getRT() to complete before proceeding
        // function1(); // Call function1 after getRT() finishes
      }
  
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log("AppState", appState.current);
    };
  
    const subscription = AppState.addEventListener("change", handleAppStateChange);
  //   // function1();
    const rtExist = async () => {
      if (isInCloud === false) {
        let rt = await checkRT();
        return rt;
      }
    };

    const promptToUrl = async () => {
      await rtExist();
      try {
        console.log("isInCloud", isInCloud);
        if (isInCloud === false) {
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
                  // setisInCloud(true);
                  isInCloud = true;
                  // isAuth = false;
                },
              },
            ],
            { cancelable: true }
          );
        }
      } catch (err) {
        console.log("err in useEffect", err);
      }
    };

    promptToUrl();
    return () => {
      subscription.remove();
      console.log('subscription.remove()');
    };
  });

  // Detect app state changes
  // useEffect(() => {
  //   const subscription = AppState.addEventListener("change", (nextAppState) => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === "active"
  //     ) {
  //       console.log("App has come to the foreground!");
  //       getRT();
  //       // setRenderData(true);
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
  // useEffect(() => {
  //   // console.log("rtExist in useEffect", rtExist);
  //   try {
  //     if (!isInCloud) {
  //       console.log("monitor useeefect authurl:", authUrl);
  //       Alert.alert(
  //         "Google Fit Data Access Permission",
  //         "To continue, you need to allow access to your Google Fit data.",
  //         [
  //           {
  //             text: "OK",
  //             onPress: () => {
  //               console.log("OK Pressed");
  //               // openAuthUrl(authUrl2);
  //               openAuthUrl(authUrl);
  //               // isAuth = true;
  //             },
  //           },
  //           {
  //             text: "No",
  //             onPress: () => {
  //               console.log("No Pressed");
  //               setisInCloud(true);
  //               // isAuth = false;
  //             },
  //           },
  //         ],
  //         { cancelable: true }
  //       );
  //     }
  //   } catch (err) {
  //     console.log("err in useEffect", err);
  //   }

  //   // setRenderData(false);
  // }, [isInCloud]);

  // Alert user to allow access to Google Fit data
  // useEffect(() => {
  //   console.log("isAuth in useEffect", isAuth);
  //   try {
  //     if (isAuth !== undefined && typeof authUrl !== 'object') {
  //       if (!isAuth  ) {
  //         console.log("monitor useeefect authurl:", authUrl);
  //         Alert.alert(
  //           "Google Fit Data Access Permission",
  //           "To continue, you need to allow access to your Google Fit data.",
  //           [
  //             {
  //               text: "OK",
  //               onPress: () => {
  //                 console.log("OK Pressed");
  //                 // openAuthUrl(authUrl2);
  //                 openAuthUrl(authUrl);
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
  //   } catch (err) {
  //     console.log("err in useEffect", err);
  //   }

  //   // setRenderData(false);
  // }, [isAuth, authUrl]);
   // Retrieve data from csv file
  // useEffect(() => {
  //   async function fetchData() {
  //     console.log("Start Readfile in monitor:");
  //     let arr = await readFile();
  //     console.log("Finish Readfile in monitor:", arr);

  //     setSteps(arr[0]);
  //     //steps3 = arr[0];
  //     console.log("Steps:", steps2, arr[0]);
  //     setLatestHR(arr[1]);
  //     //latestHR3 = arr[1];
  //     // console.log("start set var1", var1);
  //   }
  //    fetchData();
  // }, [steps, latestHR]);
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
      {/* <ConditionsBar /> */}
      {/* <Text>{dataValue}</Text>
      <Text>{steps}</Text> */}
      <DataCard dataType={"Steps"} dataValue={steps} />
      {/* <DataCard dataType={"Steps"} dataValue={steps2} /> */}
      <DataCard dataType={"Calorie"} dataValue={totalCal} />
      <DataCard dataType={"Heart Rate"} dataValue={latestHR} />
      {/* <DataCard dataType={"Heart Rate"} dataValue={latestHR2} /> */}

      {/* <DataCard dataType={"SpO2"} dataValue={"0 "} /> */}
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

// const [renderData, setRenderData] = useState(false);

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
