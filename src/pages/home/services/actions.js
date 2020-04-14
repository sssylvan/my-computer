import { FETCH_STARTED, FETCH_SUCCESS, FETCH_FAILURE } from "./action-types.js";

import userAppList from "../../../mock/user-apps";

let nextSeqId = 0;

export const fetchUserAppsStarted = () => ({
  type: FETCH_STARTED,
});

export const fetchUserAppsSuccess = (result) => ({
  type: FETCH_SUCCESS,
  result,
});

export const fetchUserAppsFailure = (error) => ({
  type: FETCH_FAILURE,
  error,
});

export const fetchUserApps = (newData) => {
  return (dispatch) => {
    // const apiUrl = `/data/cityinfo/${cityCode}.html`;
    const seqId = ++nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    };
    console.log(newData);
    // dispatchIfValid(fetchUserAppsStarted());
    if (!newData) {
      dispatchIfValid(fetchUserAppsSuccess(userAppList));
    } else {
      dispatchIfValid(fetchUserAppsSuccess({ data: newData }));
      let myHeaders = new Headers();
      myHeaders.append("Access-Control-Allow-Origin", "*");
      fetch("/api/hello", {
        method: "post",
        body: JSON.stringify(newData),
        headers: myHeaders,
      });
    }

    // fetch(apiUrl)
    //   .then((response) => {
    //     if (response.status !== 200) {
    //       throw new Error(
    //         "Fail to get response with status " + response.status
    //       );
    //     }

    //     response
    //       .json()
    //       .then((responseJson) => {
    //         dispatchIfValid(fetchUserAppsSuccess(responseJson.weatherinfo));
    //       })
    //       .catch((error) => {
    //         dispatchIfValid(fetchWeatherFailure(error));
    //       });
    //   })
    //   .catch((error) => {
    //     dispatchIfValid(fetchWeatherFailure(error));
    //   });
  };
};
