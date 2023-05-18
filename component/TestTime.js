import React, { useState } from "react";
import { useEffect } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import IonIcon from "react-native-vector-icons/Ionicons";

// export default function TestTime() {
// const TestTime = async () => {
//   const [seconds, setSeconds] = useState(0);
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setSeconds((prevSeconds) => prevSeconds + 1);
      
//     }, 1000); // Update the timer every 1 second
//     console.log(seconds);
//     return () => clearInterval(interval);
//   }, []);

//   return [seconds];
// }

// export default TestTime;

export let secondsValue = 0; // Exported variable to store the seconds value

const TestTime= () => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        secondsValue = prevSeconds + 1; // Update the exported value
        return prevSeconds + 1;
      });
    }, 1000); // Update the timer every 1 second

    return () => clearInterval(interval);
  }, []);

  return null; // Since the Timer component is not rendering anything, return null
};

export default TestTime;