import { useEffect, useState } from "react";
import fitApi from "../api/fitApi";

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
    // console.log('authUrl:', authUrl);
    setAuthUrl(url);
  };

  const checkAuth = async () => {
    let isAuthenticated = await fitApi.checkAuth();
    console.log("checkAuth is call in usedata", isAuthenticated);
    setIsAuth(isAuthenticated);
    console.log("isAuth in usedata:", isAuth);
  };

  const getSteps = async () => {
    let steps = await fitApi.getNumOfSteps();

    setSteps(steps);
    console.log('Received Steps', steps);
  };

  // Get Latest Heart Rate
  const getLatestHR = async () => {
    let heartRate = await fitApi.getLHeartRate();

    setLatestHR(heartRate);
    console.log('Received Heart Rate', heartRate);
  };

  useEffect(() => {
    console.log("line 45");
    getAuthUrl();
    checkAuth();
    // checkDataValue();
  }, [isAuth]);

  // useEffect(() => {
  //   if (isAuth) {
  //     getSteps();
  //     getLatestHR();
  //   }
  //   else{}
  // }, [isAuth]);

  useEffect(() => {
    setInterval(() => {
      if (isAuth) {
        getSteps();
        getLatestHR();
      }
      else{}
    }, 3000);
    
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
