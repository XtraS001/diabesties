import React from "react";
import { View, Text } from "react-native";
import TestTime, { secondsValue } from "../component/TestTime";
import { useEffect, useState } from "react";
import RNFS from "react-native-fs";
import { writeFile, readFile } from "../functions/csvFile";
import readFile2 from "../functions/csvFile";
import readFile3 from "../functions/csvFile";
// import writeFile2 from "../functions/csvFile";
import writeFile2 from "../functions/writeFile";
import useData from "../hooks/useData";
// import { writeFile } from "../functions/csvFile";

// const generateCSVContent = (variable1, variable2) => {
//   const headers = "Variable 1,Variable 2\n";
//   const row = `${variable1},${variable2}\n`;

//   return headers + row;
// };

const variable1 = async () => {
  let variable1 = await readFile3();
  return variable1;
}

export default function TestPage() {
  const [seconds, setSeconds] = useState();
  const [v1, setV1] = useState(80);
  const [v2, setV2] = useState("hello");

  const [count, setCount] = useState(0);
  // let variable2 = writeFile2();

  // let var1 = 'hi';
  writeFile2(v1, v2);
  // writeFile(v1, v2);

  // let [var10, var7, var8, var9] = readFile2()._3;
  // let [var10, var7, var8, var9] = readFile3()._3;
  // let var5 = useData();
  // let var6 = readFile3();
  // console.log('var5', var5);
  // console.log('var1', var1);
  // console.log("var6", var6);
  // writeFile(v1, v2r);

  return (
    <View>
      {/* <TestTime /> */}
      <Text>Hello</Text>
      {/* <Text>{var1}</Text> */}
      {/* <Text>{var10}</Text> */}
      {/* <Text>{var7}</Text> */}
    </View>
  );
}

// export default TestPage;
