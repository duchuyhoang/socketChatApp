import axios from "axios";
import { SOCKET_CHAT_HOST } from "../common/constant";
import {getCookie, setCookie} from "../common/functions";
const axiosApi = axios.create({
  baseURL: SOCKET_CHAT_HOST,
  // withCredentials: true,
  responseType: "json",
  timeout: 10000,
});
axiosApi.interceptors.request.use((request) => {
  const accessToken = getCookie("cn11_access_token") || null;
  const accessHeader = "Bearer " + accessToken;

  request.headers["Authorization"] = accessHeader;

  return request;
});

axiosApi.interceptors.response.use(
  (response) => {
    const isLoginUrl = ["authen/login", "authen/re_login"];
    // console.log("response", response)
    if (response.config.url === "authen/login") {
      setNewHeader(response.data);
      // axiosApi.defaults.headers["Authorization"]="Bearer "+response.data.accessToken;
    }

    if (response.config.url === "authen/signup") {
      axiosApi.defaults.headers["Authorization"] =
        "Bearer " + response.data.accessToken;
      setCookie("cn11_refresh_token", response.data.accessToken, 100);
      setCookie("cn11_access_token", response.data.refreshToken, 100);
    }

    return response;
  },
  async (err) => {
    const originalRequest = err.config;
    const errorResponse = err.response;
    originalRequest.retries_times = (err.config.retries_times || 0) + 1;
    // For token if the token is expire
    // && originalRequest.url === "/re_login"
    if (
      errorResponse &&
      errorResponse.status === 401 &&
      originalRequest.url !== "authen/refresh_token"
    ) {
      if (originalRequest.retries_times <= 2) {
        try {
          const responseRefresh = await axiosApi.post("authen/refresh_token", {
            refresh_token: getCookie("cn11_refresh_token"),
          });
          setNewHeader(responseRefresh.data);

          if (originalRequest.url === "authen/re_login") {
            return responseRefresh;
          } else {
            const responseData = await axiosApi(originalRequest);

            return responseData;
          }
        } catch (e) {
          //   console.clear()
          // console.log("rejected");
          setCookie("cn11_refresh_token", null, 0);
          setCookie("cn11_access_token", null, 0);

          return Promise.reject(err);
        }
      }
    }

    return Promise.reject(err);
  }
);

const setNewHeader = (responseData) => {
    console.log(responseData);
  axiosApi.defaults.headers["Authorization"] =
    "Bearer " + responseData.accessToken;
  setCookie(
    "cn11_refresh_token",
    responseData.refreshToken || getCookie("cn11_refresh_token"),
    100
  );
//   setCookie("cn11_access_token", responseData.accessToken, 100);
  setCookie("cn11_access_token", responseData.accessToken, 100);

};

const mergeConfigHeader = async (config = null) => {
  const defaultHeaders = axiosApi.defaults.headers;
  let headers = {};
  if (config) {
    headers = { ...defaultHeaders, ...config };
  }

  return { ...defaultHeaders, headers };
};

export async function get(url, data = {}, config = {}) {
  const headers = mergeConfigHeader(config);
  return axiosApi.get(url,  data, {headers} );
}

export async function post(url, data = {}, config = {}) {
  const headers = mergeConfigHeader(config);
  return axiosApi.post(url, data, {headers});
}

export async function postMultipart(url, data = {}, config = {}) {
  const headers = mergeConfigHeader({
    ...config,
    "Content-Type": "application/x-www-form-urlencoded",
  });

  return axiosApi.post(url, { data, headers });
}
