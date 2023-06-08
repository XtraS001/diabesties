import React from "react";
import { View, Text } from "react-native";

import { useEffect, useState } from "react";


export default function TestPage2() {
  const [v1, setV1] = useState("hel");
  const [v2, setV2] = useState("cutie");
  const [var1, setVar1] = useState(0);
  const [var2, setVar2] = useState(0);
  console.log('run testpage2');

  try {
    
   
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
