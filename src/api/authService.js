import urls from "./urls.js";
import { METHOD_GET, METHOD_POST, METHOD_PUT, sendRequest } from "./axiosRequest";

export async function loginRequest(username, password) {
  return await sendRequest(urls.auth.login(), METHOD_POST, {
    username: username,
    password: password
  });
}

export async function signupRequest(data) {
  return await sendRequest(urls.auth.register(), METHOD_POST, data);
}

export async function logoutRequest() {
  return await sendRequest(urls.auth.register(), METHOD_GET);
}

export async function increaseFundReq(balance) {
  return await sendRequest(urls.payment.increaseFund(), METHOD_PUT, {
    balance: balance
  });
}