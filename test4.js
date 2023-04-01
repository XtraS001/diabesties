function waitForPromise(promise) {
  return new Promise((resolve, reject) => {
    const checkPromiseState = () => {
      if (promise.readyState !== "pending") {
        if (promise.readyState === "fulfilled") {
          resolve(promise.result);
        } else {
          reject(promise.reason);
        }
      } else {
        setTimeout(checkPromiseState, 10); // wait for 10 milliseconds before checking again
      }
    };
    checkPromiseState();
  });
}

const myPromise = new Promise((resolve, reject) => {
  // some asynchronous operation
//   setTimeout(3000);
});

waitForPromise(myPromise)
  .then((result) => console.log(result))
  .catch((error) => console.error(error));
