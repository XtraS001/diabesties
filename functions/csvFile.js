// File: CsvFile.js
import RNFS from "react-native-fs";
import { useEffect, useState } from "react";

// // const generateCSVContent = (variable1, variable2, hour, minute) => {
// const generateCSVContent = (variable1, variable2, hour, minute) => {
//   const headers = "Variable 1, Variable 2, hours, minutes\n";
//   const row = `${variable1}, ${variable2}, ${hour}, ${minute},\n`;

//   return headers + row;
// };

// const isEmpty = (variable) => {
//   if (typeof variable === "undefined" || variable === null) {
//     console.log("isEmpty: variable is undefined or null");
//     return true;
//   }

//   if (typeof variable === "string" && variable.trim() === "") {
//     console.log("isEmpty: variable is undefined or null");
//     return true;
//   }

//   if (Array.isArray(variable) && variable.length === 0) {
//     console.log("isEmpty: variable is undefined or null");
//     return true;
//   }

//   if (typeof variable === "object" && Object.keys(variable).length === 0) {
//     console.log("isEmpty: variable is undefined or null");
//     return true;
//   }

//   return false;
// };

// WF 1.0
// export const writeFile = async (variable1, variable2) => {
//   // Get time
//   const currentTime = new Date();
//   const hours = currentTime.getHours();
//   const minutes = currentTime.getMinutes();
//   //   const [v1, setV1] = useState();
//   //   const [v2, setV2] = useState();
//   //   //   const [v1, setV1] = useState();
//   //   //   const [v1, setV1] = useState();

//   // Create content
//   const csvContent = generateCSVContent(variable1, variable2, hours, minutes);

//   const filePath = RNFS.DocumentDirectoryPath + "/data.csv";

//   // Save file
//   try {
//     // await RNFS.writeFile(filePath, csvContent, "utf8");
//     await RNFS.writeFile(filePath, csvContent, "utf8");
//     console.log("CSV file saved successfully:", filePath);
//   } catch (error) {
//     console.log("Error saving CSV file:", error);
//   }
// };

// WF2 1.0
// const writeFile2 = async () => {
//   const [var1, setVar1] = useState("hello");
//   const [isAuth, setIsAuth] = useState(0);
//   const [steps, setSteps] = useState(0);
//   const [latestHR, setLatestHR] = useState(0); // Latest Heart Rate
//   const filePath = RNFS.DocumentDirectoryPath + "/data.csv";

//   var csvContent = "";
//   try {
//     console.log("71a");
//     await RNFS.readFile(filePath, "utf8").then((contents) => {
//       console.log("WF2 File contents:", contents);
//       setVar1(contents);
//     });
//     console.log("76");
//   } catch (error) {
//     console.log("Error reading file:", error);
//   }
//   console.log("83", var1);

//   // useEffect(() => {
//   //   setInterval(() => {
//   //     console.log('var1', var1);
//   //     // else{}
//   //   }, 3000);

//   // }, [var1]);

//   return [
//     var1,
//     isAuth,
//     steps,
//     latestHR,
//     // dataValue
//   ];
// };

// // export const readFile = () => {
// export const readFile = () => {
//   const filePath = RNFS.DocumentDirectoryPath + "/data.csv";
//   var csvContent = "";
//   try {
//     console.log("83");
//     RNFS.readFile(filePath, "utf8").then((contents) => {
//       console.log("RF File contents:", contents);
//       console.log("86");
//     });
//   } catch (error) {
//     console.log("Error reading file:", error);
//   }
// };

// const readFile2 = async () => {
//   // const readFile2 = () => {
//   const [varX, setVarX] = useState();
//   const [var1, setVar1] = useState(0);
//   const [var2, setVar2] = useState(0);
//   const [var3, setvar3] = useState(0);
//   const [var4, setvar4] = useState(0); // Latest Heart Rate
//   // const [dataValue, setDataValue] = useState();
//   console.log("readfile2 is called in csvFileee");
//   const filePath = RNFS.DocumentDirectoryPath + "/data.csv";

//   useEffect(() => {
//     // Always write it this way when deal with useeffect+Async
//     async function fetchData() {
//       await RNFS.readFile(filePath, "utf8").then((contents) => {
//         console.log("RF2 File contents:", contents);
//         setVar1(contents);

//         const rows = contents.split("\n");
//         const secondRow = rows[1]; // Index 0 represents the first row

//         const [varA, varB, varC, varD] = secondRow.split(", ");
//         setVar1(varA);
//         setVar2(varB);
//         setvar3(varC);
//         setvar4(varD);
//       });
//     }
//     fetchData();
//   }, []); // Or [] if effect doesn't need props or state
//   // }, [var1, var2, var3, var4]); // Or [] if effect doesn't need props or state

//   console.log("return :", var1);
//   return [
//     var1,
//     var2,
//     var3,
//     var4,
//     // dataValue
//   ];
// };

// export default readFile2;

// RF3 1.0 + RF 2.0
export const readFile = async () => {
  let var1 = "";
  let var2 = "";
  let var3 = "";
  let var4 = "";

  const filePath = RNFS.DocumentDirectoryPath + "/data.csv";
  try {
    console.log("Start readfile");

    await RNFS.readFile(filePath, "utf8").then((contents) => {
      console.log("RF3 File contents:", contents, ",", typeof contents);

      if (contents === undefined) {
        console.log("contents is undefined");
        return [var1, var2, var3, var4];
      } else {
        console.log("contents is not undefined");
        const rows = contents.split("\n");
        const secondRow = rows[1];

        const [varA, varB, varC, varD] = secondRow.split(", ");

        var1 = varA;
        var2 = varB;
        var3 = varC;
        var4 = varD;
      }
    });
    console.log("finish reafile3");
    return [var1, var2, var3, var4];
  } catch (err) {
    console.log("readFile error", err);
  }
  return [var1, var2, var3, var4];
};

//waixuan code + GCSV 2.0
const generateCSVContent = async (variable1, variable2, hour, minute) => {
  // let [var10, var7, var8, var9] = readFile3()._3;
  const filePath = RNFS.DocumentDirectoryPath + "/data.csv";
  try {
    // getData();
    console.log("Start generate CSV content");
    let fileExist = await RNFS.exists(filePath);
    if (fileExist) {
      console.log("File exist");
      let arr = await readFile();
      console.log("arr", arr);
      let readArray = [...arr];
      console.log("readArray", readArray);
      //let readArray = [...readFile2()._3];
      const inputArray = [variable1, variable2, hour, minute];
      console.log("inputArray", inputArray);
      console.log("24", readArray[3]);
      // checkVariable(readArray[3]);
      console.log("26");
      const inputData = [];
      // for loop:
      for (let i = 0; i < readArray.length; i++) {
        let X = inputArray[i];
        if (X === undefined) {
          // if (typeof inputData[i].toString() === 'undefined') {
          // console.log("myinput is undefined", readArray[i]);
          inputData[i] = readArray[i];
        } else {
          // console.log("myinput is defined");
          inputData[i] = inputArray[i];
        }
      }
      const headers = "Steps, Latest Heart Rate, hours, minutes\n";
      const row = `${inputData[0]}, ${inputData[1]}, ${inputData[2]}, ${inputData[3]},\n`;
      console.log("Generate csv content success");
      return headers + row;
    } else {
      const headers = "Steps, Latest Heart Rate, hours, minutes\n";
      const row = `${variable1}, ${variable2}, ${hour}, ${minute},\n`;
      console.log("File not exist");
      console.log("Generate csv content success");
      return headers + row;
    }

    // return headers + row;
  } catch (error) {
    console.log("generateCSVContent error", error);
  }
};

//WF2 2.0 + WF 2.0
// const writeFile2 = async (var1, var2) => {
export const writeFile = async (var1, var2) => {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  console.log("Start writefile in csvfile.js");
  

  try {
    //Create Content
    const csvContent = await generateCSVContent(var1, var2, hours, minutes);
    console.log("csvContent", csvContent);
    const filePath = RNFS.DocumentDirectoryPath + "/data.csv";

    await RNFS.writeFile(filePath, csvContent, "utf8");
    console.log("CSV file saved successfully in 2:", filePath);
  } catch (error) {
    console.log("error in writeFile", error);
  }
};

// How to use readfile to retrieve data:
// useEffect(() => {
//   async function fetchData() {
//     let arr = await readFile();
//     console.log('arr', arr);
//     setVar1(arr[0]); // Set your variable
//     console.log('start set var1', var1);
//     setVar2(arr[1]);
//   }
//   fetchData();

// });
