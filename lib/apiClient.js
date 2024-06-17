import axios from "axios";

import config from "../config";

const apiClient = axios.create({
  baseURL: config.apiUrl,
});

const localStorageVarName = "authTokenNextApp";

// apiClient.interceptors.request.use(function (config) {
//   const authToken = localStorage.getItem(localStorageVarName);
//   config.headers.authorization = authToken ? `Bearer ${authToken}` : "";
//   return config;
// });

apiClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    // if (error.response && error.response.status === 401) {
    //   store.dispatch(logout());
    // }
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    error.message = message;
    return Promise.reject(error);
  }
);

export default apiClient;
