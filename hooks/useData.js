import { useEffect, useState } from "react";
import fitApi from "../api/fitApi";

const useData = async () => {
  const [authUrl, setAuthUrl] = useState({});
  const [isAuth, setIsAuth] = useState();
  const [steps, setSteps] = useState(0);
  const [dataValue, setDataValue] = useState();
  console.log("usedata is called in usedata");
  // setDataValue(40);
  const getAuthUrl = async () => {
    const url = await fitApi.getAuthUrl();
    console.log("url:", url);
    // console.log('authUrl:', authUrl);
    setAuthUrl(url);
  };

  const checkAuth = async () => {
    let isAuth = await fitApi.checkAuth();
    console.log("checkAuth is call in usedata");
    setIsAuth(isAuth);
    console.log('isAuth in usedata:', isAuth);
  };

  const getSteps = async () => {
    let steps = await fitApi.getNumOfSteps();

    setSteps(steps);
  };

  // const checkDataValue = async () => {
  //   // console.log("checkeddatavalue is called");
  //   // Sleep for 2 seconds for 2 times
  //   for (let i = 0; i < 10; i++) {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     console.log("sleep for 2 seconds");
  //     setDataValue(i);
  //   }
  // };

  // useeffect to test changes in datValue
  // useEffect(() => {
  //   console.log("Datavalue in usedata:", dataValue);
  // }, [dataValue]);

  useEffect(() => {
    console.log("line 45");
    getAuthUrl();
    checkAuth();
    // checkDataValue();
  }, [isAuth]);

  useEffect(() => {
    if (isAuth) {
      getSteps();
    }
    console.log("line 55");
  }, [isAuth]);
  // console.log('authurl in usedata:', authUrl);
  return [authUrl, isAuth, steps, dataValue];
};

export default useData;
