import React from "react";
import { View, Text } from "react-native";

import { useEffect, useState } from "react";
import RNFS from "react-native-fs";
import { writeFile, readFile } from "../functions/csvFile";

// import { readFile3 } from "../functions/csvFile";
// import writeFile2 from "../functions/csvFile";
// import { writeFile2 } from "../functions/writeFile";

const generateCSVContent = async () => {
  try {
    await readFile();
    console.log("14");
  } catch (e) {
    console.log("err", e);
  }
};
export default function TestPage2() {
  const [v1, setV1] = useState("hel");
  const [v2, setV2] = useState("cutie");
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  console.log('run testpage2');
  //   let [var3, var4, var5, var6] = readFile();
  //   console.log("readFile()", readFile());
  try {
    
    // generateCSVContent();
    // useEffect(async () => {
    useEffect(() => {
      // async function fetchData() {
        // await writeFile(v1, v2);
        // let arr = await readFile();
        // console.log('arr', arr);
        // setVar1(arr[0]);
        // console.log('start set var1', var1);
        // setVar2(arr[1]);
      // }
      // fetchData();
      //   setVar3(arr[2]);
      // await setVar1(await readFile3()).then(setVar2(var1._3[0]));
      //   setVar1(readFile()[0]);
      //   setVar2(readFile()[1]);
    });
  } catch (e) {
    console.log("err in Testpage2", e);
  }

  //   let var2 = var1._3[0];
  console.log("var1", var1);
  //   writeFile2(v1, v2);
  return (
    <View>
      <Text>Hello</Text>
      <Text>{var1}</Text>
      <Text>{var2}</Text>
    </View>
  );
}
