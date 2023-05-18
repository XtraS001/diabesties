import React from "react";
import { View, Text } from "react-native";
import TestTime, { secondsValue } from "../component/TestTime";
import { useEffect, useState } from "react";
import RNFS from "react-native-fs";

const generateCSVContent = (variable1, variable2) => {
  const headers = "Variable 1,Variable 2\n";
  const row = `${variable1},${variable2}\n`;

  return headers + row;
};

const saveCSVFile = async (variable1, variable2) => {
  const csvContent = generateCSVContent(variable1, variable2);
  const filePath = RNFS.DocumentDirectoryPath + "/data.csv";
  console.log(RNFS.DocumentDirectoryPath);
  // const filePath = ".." + "/data.csv";

  try {
    // await RNFS.writeFile(filePath, csvContent, "utf8");
    // console.log("CSV file saved successfully:", filePath);

    // Example: Read the contents of the file
    RNFS.readFile(filePath, "utf8")
      .then((contents) => {
        console.log("File contents:", contents);
      })
      .catch((error) => {
        console.log("Error reading file:", error);
      });
  } catch (error) {
    console.log("Error saving CSV file:", error);
  }
};

const TestPage = () => {
  const [seconds, setSeconds] = useState(0);
  const [v1, setV1] = useState(2);
  const [v2, setV2] = useState("Hello");
  useEffect(() => {
    try {
      saveCSVFile(v1, v2);
      console.log("DOne save file");
    } catch (error) {
      console.log(error);
    }
  });
  return (
    <View>
      <TestTime />
      <Text>Hello WOrld</Text>
    </View>
  );
};

export default TestPage;
