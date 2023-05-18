import apiClient from "./client";
import axios from "axios";

const getAuthUrl = async () => {
  try {
    console.log("Try axios get url");
    // const response = await apiClient.get("/getAuthUrl");
    const response = await axios.get(
      "https://mydiabesties.pagekite.me/api/getAuthUrl"
    );

    // console.log("axios response:", response.data);   // For index.js
    // console.log("axios response:", response.data.authUrl);  // For test.js
    if (response.data.success) {
      console.log("axios response:", response.data.url); // For test.js
      return response.data.url;
    } else {
      console.log("response.data:", response.data);
    }
  } catch (error) {
    console.log("error getting authurl", error.message);
  }
};

const checkAuth = async () => {
  try {
    console.log("checkAuth in fitApi");
    const response = await axios.get(
      "https://mydiabesties.pagekite.me/api/isAuth"
    );

    // console.log("auth in fitapi:", response.data);
    // console.log("auth in fitapi:", response); // Done checking error
    if (response.data.success) {
      return true;
    } else {
      console.log(response.data.message);
      return false;
    }
  } catch (error) {
    // console.log("error checking auth", error.message);
    console.log("error checking auth", error);
  }
};

const getNumOfSteps = async () => {
  try {
    console.log("getsteps in app");
    const response = await axios.get(
      "https://mydiabesties.pagekite.me/api/getSteps"
    );

    console.log("steps in fitapi:", response.data.steps);
    if (response.data.success) {
      return response.data.steps;
    }
  } catch (error) {
    console.log("error getting steps", error.message);
  }
};

// Get Latest Heart Rate
const getLHeartRate = async () => {
  try {
    console.log("getsteps in app");
    const response = await axios.get(
      "https://mydiabesties.pagekite.me/api/getLHeartRate"
    );

    console.log("Heart rate in fitapi:", response.data.heartrate);
    if (response.data.success) {
      return response.data.heartrate;
    }
  } catch (error) {
    console.log("error getting latest heart rate", error.message);
  }
};

// const getAll = async () => {
//   try {
//     const response = await apiClient.get("/news");

//     if (response.data.success) {
//       return response.data.news;
//     }
//   } catch (error) {
//     console.log("Error while getting all news.", error.message);
//     return [];
//   }
// };

// const getSingle = async (id) => {
//   try {
//     const response = await apiClient.get(`/news/single/${id}`);

//     if (response.data.success) {
//       return response.data.news;
//     }
//   } catch (error) {
//     console.log("error while getting single news", error);
//   }
// };

// const getByCategory = async (category, qty) => {
//   const endpoint = qty ? `/news/${category}/${qty}` : `/news/${category}`;

//   try {
//     const response = await apiClient.get(endpoint);

//     if (response.data.success) {
//       return response.data.news;
//     }
//   } catch (error) {
//     console.log("Error while getting categories news.", error.message);
//     return [];
//   }
// };

// const searchPost = async (query) => {
//   if (!query) return {};
//   try {
//     const response = await apiClient.post(`/news/search/${query}`);
//     return response.data;
//   } catch (error) {
//     console.log("Error while searching - searchPost newsAPi", error);
//   }
// };

export default {
  // getAll,
  // getByCategory,
  // getSingle,
  // searchPost,
  getAuthUrl,
  getNumOfSteps,
  checkAuth,
  getLHeartRate,
};
