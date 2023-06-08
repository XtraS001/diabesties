import { useEffect, useState } from "react";
import fitApi from "../api/fitApi";
import { writeFile, readFile } from "../functions/csvFile";

const useData = async () => {
  const [authUrl, setAuthUrl] = useState({});
  const [isAuth, setIsAuth] = useState();
  const [steps, setSteps] = useState(0);
  const [latestHR, setLatestHR] = useState(0); // Latest Heart Rate
  // const [dataValue, setDataValue] = useState();
  console.log("usedata is called in usedata");
  // setDataValue(40);
  const getAuthUrl = async () => {
    const url = await fitApi.getAuthUrl();
    console.log("url:", url);
    console.log("authUrl:", authUrl);
    setAuthUrl(url);
  };

  const checkAuth = async () => {
    let isAuthenticated = await fitApi.checkAuth();
    // console.log("checkAuth is call in usedata", isAuthenticated);
    setIsAuth(isAuthenticated);
    console.log("isAuth in usedata:", isAuth);
  };

  const getSteps = async () => {
    console.log("start getSteps in usedata");
    let steps = await fitApi.getNumOfSteps();

    setSteps(steps);
    // console.log("Received Steps", steps);
    return steps;
  };

  // Get Latest Heart Rate
  const getLatestHR = async () => {
    console.log("start getLatestHR in usedata");
    let heartRate = await fitApi.getLHeartRate();

    setLatestHR(heartRate);
    // console.log("Received Heart Rate", heartRate);
    return heartRate;
  };

  useEffect(() => {
    console.log("line 45");
    getAuthUrl();
    checkAuth();
    // checkDataValue();
  }, [isAuth]);

  useEffect(() => {
    const interval = setInterval(() => {
      checkAuth();
      clearInterval
    }, 10000);
    // console.log("Changes in isAuth:", isAuth);
  });

  useEffect(() => {
    async function fetchData() {
      console.log("Start Readfile in monitor:");
      let arr = await readFile();
      console.log("Finish Readfile in monitor:", arr);

      setSteps(arr[0]);
      console.log("Steps:", steps, arr[0]);
      setLatestHR(arr[1]);
      // console.log("start set var1", var1);
    }
    const time = 10000;
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

    setInterval(async () => {
      if (isAuth) {
        //If authenticated, get data
        console.log("Authenticated");
        let steps = await getSteps();
        let heartRate = await getLatestHR();
        console.log("steps", steps, "latestHR", heartRate);
        writeFile(steps, heartRate);
        // writeFile(500, 104);
      }
    }, time);
  }, [isAuth]);
  // console.log('authurl in :', authUrl);
  return [
    authUrl,
    isAuth,
    steps,
    latestHR,
    // dataValue
  ];
};

export default useData;
