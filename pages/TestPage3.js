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

  // const arrayOfObjects = [
  //   // { v1: 23, v2: 56 },
  //   // { v1: 25, v2: 56 },
  //   { steps: 34, timeStampNanos: "1686330840000000000" },
  //   { steps: 55, timeStampNanos: "1686330900000000000" },
  // ];

  // const newArray = arrayOfObjects.map((obj) => {
  //   const timeStamp = parseInt(obj.timeStampNanos.substring(0, 10));
  //   console.log("timeStamp", timeStamp);
  //   const { timeStampNanos, ...rest } = obj;
  //   // const { steps, ...rest } = obj;
  //   rest["timeStamp"] = timeStamp;
  //   return rest;
  // });
  // var allSteps = [];
  // console.log("new steps:", newArray);
  var allSteps = [
    { steps: 31, timeStampNanos: "1686883980000000000" },
    { steps: 32, timeStampNanos: "1686884040000000000" },
    { steps: 43, timeStampNanos: "1686884220000000000" },
    { steps: 69, timeStampNanos: "1686884280000000000" },
    { steps: 77, timeStampNanos: "1686884520000000000" },
    { steps: 75, timeStampNanos: "1686884580000000000" },
    { steps: 63, timeStampNanos: "1686884640000000000" },
    { steps: 64, timeStampNanos: "1686889140000000000" },
    { steps: 30, timeStampNanos: "1686889260000000000" },
    { steps: 19, timeStampNanos: "1686889320000000000" },
    { steps: 33, timeStampNanos: "1686889380000000000" },
    { steps: 65, timeStampNanos: "1686889680000000000" },
    { steps: 73, timeStampNanos: "1686889740000000000" },
    { steps: 112, timeStampNanos: "1686889800000000000" },
    { steps: 18, timeStampNanos: "1686889920000000000" },
    { steps: 88, timeStampNanos: "1686891180000000000" },
    { steps: 72, timeStampNanos: "1686891240000000000" },
    { steps: 22, timeStampNanos: "1686891300000000000" },
    { steps: 21, timeStampNanos: "1686891480000000000" },
    { steps: 26, timeStampNanos: "1686892560000000000" },
    { steps: 66, timeStampNanos: "1686892620000000000" },
    { steps: 59, timeStampNanos: "1686893460000000000" },
    { steps: 54, timeStampNanos: "1686893520000000000" },
    { steps: 32, timeStampNanos: "1686893580000000000" },
    { steps: 37, timeStampNanos: "1686893760000000000" },
    { steps: 55, timeStampNanos: "1686893820000000000" },
    { steps: 70, timeStampNanos: "1686893940000000000" },
    { steps: 18, timeStampNanos: "1686894000000000000" },
    { steps: 17, timeStampNanos: "1686894180000000000" },
    { steps: 103, timeStampNanos: "1686895020000000000" },
    { steps: 26, timeStampNanos: "1686895080000000000" },
    { steps: 17, timeStampNanos: "1686902940000000000" },
  ];

  const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // for (let i = 0; i < items.length; i += 2) {
  // for (let i = 0; i < allSteps.length; i += 25) {
  //   // console.log(items[i], items[i + 1]);
  //   var steps25 = allSteps.slice(i, i + 25);
  //   console.log('steps25:', steps25);
  // }

  // const firstHalf = items.slice(0, 5);
  // const secondHalf = items.slice(5, 10);

  // console.log("First Half:", firstHalf);
  // console.log("Second Half:", secondHalf);
  // const steps2 = [
  //   { steps: 34, timeStampNanos: "1686330840000000000" },
  //   { steps: 55, timeStampNanos: "1686330900000000000" },
  //   { steps: 34, timeStampNanos: "1686331080000000000" },
  //   { steps: 21, timeStampNanos: "1686331140000000000" },
  // ];

  // console.log("allsteps", allSteps);
  useEffect(() => {
    const refreshToken =
      "1//0gTqmDX1YkUbaCgYIARAAGBASNwF-L9Ir8_9w-uqqfnCdRmHnrsYF6qLa2r_t3rh9rH_yDphzNwy-YXxIct1qAQdRITy7NJ5LSD4";
    var steps;
    async function fetchData() {
      try {
        console.log('try get steps')
        steps = await fitApi.getNumOfSteps(refreshToken);
        console.log("steps:", steps);
        // setAllSteps(steps);
        // console.log("allsteps:", steps);
        // setAllSteps(steps);
        // allSteps = steps;
        console.log("All steps:", allSteps);
        // console.log("all steps item", allSteps[0].timeStampNanos);
      } catch (e) {
        console.log('err get steps', e);
      }
    }
    fetchData();
  });

  console.log("run testpage3");

  const handleButtonPress = async () => {
    // Your logic or actions when the button is pressed
    try {
      console.log("try post");
      await API.post("datasApi", "/datas", {
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
      await API.put("datasApi", "/datas", {
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
      await API.get("datasApi", "/datas/userId", {})
        .then((stepsres) => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("datares", stepsres);
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

  const handleGetToken = async () => {
    // Your logic or actions when the button is pressed
    try {
      console.log("try get query");
      let tokensData;
      await API.get("tokensApi", "/tokens/object/userId", {})
        .then((stepsres) => {
          // Handle the response or perform additional actions after inserting multiple objects
          console.log("datares", stepsres);
          tokensData = stepsres;
          console.log("tokensData", tokensData);
          // if tokensData has no refreshtoken, then get new token
          if (tokensData.refreshToken === undefined) {
            console.log("no refreshtoken");
            // handlePutToken();
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
      console.log("getting");
      console.log("tokensData", tokensData);
    } catch (e) {
      console.log("err getting query data", e);
    }

    console.log("Button3 Pressed!");
  };

  const handlePutToken = async () => {
    // Your logic or actions when the button is pressed
    // Your logic or actions when the button is pressed
    try {
      console.log("try put");
      await API.put("tokensApi", "/tokens", {
        body: {},
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

    console.log("Put TOken Pressed!");
  };

  const handleNotification = async () => {
    // Your logic or actions when the button is pressed
    try {
      PushNotification.localNotification({
        channelId: "test-channel",
        title: "You clicked on",
        message: "Success!!",
        id: 1, //if not defined then new notification is created on each click else it append new notification in previous one
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
      <Button title="Get Token" onPress={handleGetToken} />
      <Button title="Put Token" onPress={handlePutToken} />
      <Button title="Get Notification" onPress={handleNotification} />
      {/* </form> */}
      <Text>Hello</Text>
      {/* <Text>{allSteps}</Text> */}
      <Text>{var2}</Text>
    </View>
    // </SafeAreaView>
  );
}
