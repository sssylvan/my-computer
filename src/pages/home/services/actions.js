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

export const fetchUserApps = (cityCode) => {
  return (dispatch) => {
    // const apiUrl = `/data/cityinfo/${cityCode}.html`;
    const seqId = ++nextSeqId;

    const dispatchIfValid = (action) => {
      if (seqId === nextSeqId) {
        return dispatch(action);
      }
    };

    dispatchIfValid(fetchUserAppsStarted());
    dispatchIfValid(fetchUserAppsSuccess(userAppList));
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
