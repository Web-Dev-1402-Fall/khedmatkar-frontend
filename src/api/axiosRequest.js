import axios from "axios";

export const METHOD_POST = "POST";
export const METHOD_GET = "GET";
export const METHOD_PUT = "PUT";
export const METHOD_PATCH = "PATCH";
export async function sendRequest(url, method, requestData) {
  return axios
    .request({
      method,
      url,
      data: requestData,
    })
    .then((response) => {
      return {
        isSuccess: true,
        data: response.data,
        status: response.status,
      };
    })
    .catch((error) => {
      const response = error?.response?.data || {};
      return {
        isSuccess: false,
        ...response,
        message: "خطایی رخ داده است.",
      };
    });
}
