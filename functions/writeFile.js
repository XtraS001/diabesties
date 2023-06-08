import { useEffect, useState } from "react";
import fitApi from "../api/fitApi";
import RNFS, { read } from "react-native-fs";
// import readFile2 from "./csvFile";
import {getData} from '../functions/csvFile';
import { readFile3 } from "./csvFile";
const checkVariable = (myVariable) => {
  try {
    if (myVariable === undefined) {
      setTimeout(checkVariable(myVariable), 5000); // Wait for 100 milliseconds and check again
    } else {
      // console.log("myVariable is defined:", myVariable);
      setTimeout(console.log("myVariable is defined:", myVariable), 1000); // Wait for 100 milliseconds and check again
      // return false;
      // Perform further operations with the defined variable
    }
  } catch (error) {
    console.log("checkvariable err", error);
  }
};

// const generateCSVContent = (variable1, variable2, hour, minute) => {
//   // let [var10, var7, var8, var9] = readFile3()._3;
//   try {
//     // getData();
//     let readArray = [...readFile3()._3];
//     // let varX = await readFile3();
//     console.log('ReadArray', readArray);
//     const inputArray = [variable1, variable2, hour, minute];
//     console.log("24", readArray[3]);
//     // checkVariable(readArray[3]);
//     console.log("26");
//     const inputData = [];
//     // for loop:
//     for (let i = 0; i < readArray.length; i++) {
//       console.log('readarray', readArray[i]);
//       let X = inputArray[i];
//       // if (X === undefined) {
//       if (X === null) {
//         // if (typeof inputData[i].toString() === 'undefined') {
//         console.log("myinput is undefined", readArray[i]);
//         inputData[i] = readArray[i];
//       } else {
//         console.log("myinput is defined", inputArray[i]);
//         inputData[i] = inputArray[i];
//       }
//     }
//     const headers = "Variable 1, Variable 2, hours, minutes\n";
//     const row = `${inputData[0]}, ${inputData[1]}, ${inputData[2]}, ${inputData[3]},\n`;

//     return headers + row;
//   } catch (error) {
//     console.log("generateCSVContent error", error);
//   }
// };

//waixuan code
const generateCSVContent = async (variable1, variable2, hour, minute) => {
  // let [var10, var7, var8, var9] = readFile3()._3;

  try {
    // getData();
    console.log('Start generate CSV content');
    let arr = await readFile3();
    console.log('arr', arr);
    let readArray = [...arr]
    console.log('readArray', readArray);
    //let readArray = [...readFile2()._3];
    const inputArray = [variable1, variable2, hour, minute];
    console.log('inputArray', inputArray);
    console.log("24", readArray[3]);
    // checkVariable(readArray[3]);
    console.log("26");
    const inputData = [];
    // for loop:
    for (let i = 0; i < readArray.length; i++) {
      let X = inputArray[i];
      if (X === undefined) {
        // if (typeof inputData[i].toString() === 'undefined') {
        console.log("myinput is undefined", readArray[i]);
        inputData[i] = readArray[i];
      } else {
        console.log("myinput is defined");
        inputData[i] = inputArray[i];
      }
    }
    const headers = "Variable 1, Variable 2, hours, minutes\n";
    const row = `${inputData[0]}, ${inputData[1]}, ${inputData[2]}, ${inputData[3]},\n`;
    console.log('Generate csv content success');
    return headers + row;
  } catch (error) {
    console.log("generateCSVContent error", error);
  }
};


// const writeFile2 = async (var1, var2) => {
export const writeFile2 = async (var1, var2) => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  //Create Content
  const csvContent = await generateCSVContent(var1, var2, hours, minutes);
  const filePath = RNFS.DocumentDirectoryPath + "/data.csv";
  try {
    await RNFS.writeFile(filePath, csvContent, "utf8");
    console.log("CSV file saved successfully in 2:", filePath);
    
  } catch (error) {
    console.log("error in writeFile2", error);
  }
  
};

// export default writeFile2;
