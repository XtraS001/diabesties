import { useEffect, useState } from "react";
import fitApi from "../api/fitApi";
import { writeFile, readFile } from "../functions/csvFile";
import { API } from "aws-amplify";
const useData2 = async (refreshToken) => {
  //   const [authUrl, setAuthUrl] = useState({});
  //   const [isAuth, setIsAuth] = useState();
  // const [steps, setSteps] = useState(0);
  // const [latestHR, setLatestHR] = useState(0); // Latest Heart Rate
  // const [totalCal, setTotalCal] = useState(0); // Total Calories burned

  var steps = 0;
  var latestHR = 0;
  var totalCal = 0;
  var refresh_Token = '';
 
  // const [dataValue, setDataValue] = useState();
  console.log("usedata is called in usedata");
  // setDataValue(40);

  const getSteps = async (refresh_Token) => {
    console.log("start getSteps in usedata");
    let steps2 = await fitApi.getNumOfSteps(refresh_Token);
    console.log("steps in usedata:", refresh_Token);
    // If steps is a number, setsteps:
    if (typeof steps === "number") {
      // setSteps(steps);
      steps = steps2;
      // console.log("Received Steps", steps);
      return steps;
    }
  };

  // Get Latest Heart Rate
  const getLatestHR = async (refresh_Token) => {
    console.log("start getLatestHR in usedata");
    let heartRate = await fitApi.getLHeartRate(refresh_Token);

    // If heartRate is a number, setLatestHR:
    if (typeof heartRate === "number") {
      // setLatestHR(heartRate);
      latestHR = heartRate;
      // console.log("Received Heart Rate", heartRate);
      return heartRate;
    }
  };

  // Get Latest Heart Rate
  const getTotalCal = async (refresh_Token) => {
    console.log("start getTotalCal in usedata");
    let totalCal2 = await fitApi.getTotalCal(refresh_Token);

    if (typeof totalCal === "number") {
      // setTotalCal(totalCal);
      totalCal = totalCal2;
      // console.log("Received Heart Rate", heartRate);
      return totalCal;
    }
  };

  //   useEffect(() => {
  //     console.log("line 45");
  //     getAuthUrl();
  //     checkAuth();
  //     // checkDataValue();
  //   }, [isAuth]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       checkAuth();
  //       clearInterval;
  //     }, 10000);
  //     // console.log("Changes in isAuth:", isAuth);
  //   });
  async function updateData(refresh_Token) {
    console.log('Refresh token in usedata:', refreshToken);
    // let refresh_Token = await refreshToken;
    await getSteps(refresh_Token);
    await getLatestHR(refresh_Token);
    await getTotalCal(refresh_Token);
  }
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Call your async function here
        // Replace the following line with your async function call
        // const data = await fetch("https://example.com/api/data");

        // if refresh_Token not equal to string with length > 5
        

        if (refresh_Token === '' || refresh_Token === undefined) {
          var tokens = await API.get("tokensApi", "/tokens/object/userId", {});
          refresh_Token = tokens.refreshToken;
        } else {
          await updateData(refresh_Token).then(() => {
            console.log("Steps:", steps, "latestHR:", latestHR);
            console.log('writeFile in usedata');
            writeFile(steps, latestHR, totalCal);
          });
        }
       
        
        // console.log("Data:", data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const interval = setInterval(fetchData, 8000); // Call fetchData every 10 seconds

    return () => {
      clearInterval(interval); // Clean up the interval when the component unmounts
    };
  }, []); // Empty depende

  useEffect(() => {
    // async function fetchData() {
    //   console.log("Start Readfile in monitor:");
    //   let arr = await readFile();
    //   console.log("Finish Readfile in monitor:", arr);
    //   setSteps(arr[0]);
    //   console.log("Steps:", steps, arr[0]);
    //   setLatestHR(arr[1]);
    //   // console.log("start set var1", var1);
    // }
    // const time = 10000;
    // setInterval(() => {
    // setInterval(async () => {
    //   console.log("time", time);
    //   if (isAuth) {
    //     //If authenticated, get data
    //     console.log("Authenticated");
    //     await getSteps();
    //     await getLatestHR();
    //     console.log("steps", steps, "latestHR", latestHR);
    //     await writeFile(steps, latestHR);
    //     // writeFile(500, 104);
    //   } else {
    //     console.log("not authenticated");
    //     fetchData();
    //   }
    // }, time);
    // setInterval(async () => {
    //   if (isAuth) {
    //     //If authenticated, get data
    //     console.log("Authenticated");
    //     let steps = await getSteps();
    //     let heartRate = await getLatestHR();
    //     let totalCal = await getTotalCal();
    //     console.log(
    //       "steps",
    //       steps,
    //       "latestHR",
    //       heartRate,
    //       "totalCal",
    //       totalCal
    //     );
    //     writeFile(steps, heartRate);
    //     // writeFile(500, 104);
    //   }
    // }, time);
  }, []);
  // console.log('authurl in :', authUrl);
  return [
    // authUrl,
    // isAuth,
    steps,
    latestHR,
    totalCal,
    // dataValue
  ];
};

export default useData2;

// Ori
// Get Latest Heart Rate
// const getTotalCal = async () => {
//   console.log("start getTotalCal in usedata");
//   let totalCal = await fitApi.getTotalCal(refreshToken);

//   setTotalCal(totalCal);
//   // console.log("Received Heart Rate", heartRate);
//   return totalCal;
// };
