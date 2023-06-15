import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import fitApi from "../api/fitApi";
import { useEffect, useState } from "react";
import { Amplify, API } from "aws-amplify";
import PushNotification from "react-native-push-notification";
// import config from "./aws-exports";

export default function TestPage3() {
  const [v1, setV1] = useState("hel");
  const [v2, setV2] = useState("cutie");
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  // const [allSteps, setAllSteps] = useState();
  var allSteps = [];
  const steps2 = [
    { steps: 34, timeStampNanos: "1686330840000000000" },
    { steps: 55, timeStampNanos: "1686330900000000000" },
    { steps: 34, timeStampNanos: "1686331080000000000" },
    { steps: 21, timeStampNanos: "1686331140000000000" },
  ];
  const steps3 = [
    { timeStampNanos: 1686330840, steps: 34 },
    { timeStampNanos: 1686330900, steps: 55 },
  ];

  var arr1 = [
    { steps: 99, timeStampNanos: "1686330840000000000" },
    { steps: 99, timeStampNanos: "1686330900000000000" },
  ];

  var arr2 = arr1.map((item) => {
    return {
      timeStampNanos: parseInt(item.timeStampNanos.substring(0, 10)),
      steps: item.steps,
    };
  });
  var arr3 = arr2.map((item) => {
    return {
      PutRequest: {
        Item: item,
      },
    };
  });

  var obj1 = {
    // steps: 99,
    timeStampNanos: 1686339946,
  };

  console.log("arr2:", arr2);
  console.log("arr3:", arr3);
  console.log("arr3:", arr3[0].PutRequest);
  console.log("steps3:", steps3);
  useEffect(() => {
    var steps;
    async function fetchData() {
      steps = await fitApi.getAllSteps();
      // setAllSteps(steps);
      console.log("allsteps:", steps);
      // setAllSteps(steps);
      allSteps = steps;
      console.log("All steps:", allSteps);
      console.log("all steps item", allSteps[0].timeStampNanos);
    }
    // fetchData();
  });

  console.log("run testpage3");

  const handleButtonPress = async () => {
    // Your logic or actions when the button is pressed
    try {
      console.log("try post");
      await API.post("stepsApi", "/steps", {
        body: allSteps,
      })
        .then(() => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("Done post data");
        })
        .catch((e) => {
          console.log("err in post", e);
        });
      console.log("posting");
    } catch (e) {
      console.log("err posting data", e);
    }

    console.log("Button1 Pressed!");
  };

  const handleButtonPress2 = async () => {
    // Your logic or actions when the button is pressed
    try {
      console.log("try put");
      await API.put("stepsApi", "/steps", {
        body: obj1,
        // body: {
        //   timeStampNanos: 1686330999,
        //   steps: 24,
        // },
      })
        .then(() => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("Done put data");
        })
        .catch((e) => {
          console.log("err in put", e);
        });
      console.log("posting");
    } catch (e) {
      console.log("err posting data", e);
    }

    console.log("Button Pressed!");
  };

  const handleButtonPress3 = async () => {
    // Your logic or actions when the button is pressed
    try {
      console.log("try get query");
      await API.get("stepsApi", "/steps/userId", {
      })
        .then((stepsres) => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log('stepsres', stepsres);
          console.log("Done get query data");
        })
        .catch((e) => {
          console.log("err in get query", e);
        });
      console.log("getting");
    } catch (e) {
      console.log("err getting query data", e);
    }

    console.log("Button3 Pressed!");
  };
  const handleNotification = async () => {
    // Your logic or actions when the button is pressed
    try {
      PushNotification.localNotification({
        channelId:"test-channel",
        title:"You clicked on" ,
        message:'Success!!',
        id:1//if not defined then new notification is created on each click else it append new notification in previous one
      });
  
    } catch (e) {
      console.log("err getting query data", e);
    }

    console.log("Button4 Pressed!");
  };
  //   let var2 = var1._3[0];
  // console.log("var1", var1);
  //   writeFile2(v1, v2);
  return (
    // <SafeAreaView>
    <View>
      {/* <form onSubmit={handleSubmit}> */}

      <Button title="Press Meee 2 Post" onPress={handleButtonPress} />
      <Button title="Press Meee 2 Put" onPress={handleButtonPress2} />
      <Button title="Press Meee to get query" onPress={handleButtonPress3} />
      <Button title="Get Notificationssss" onPress={handleNotification} />
      {/* </form> */}
      <Text>Hello</Text>
      <Text>{allSteps}</Text>
      <Text>{var2}</Text>
    </View>
    // </SafeAreaView>
  );
}
