import { METHOD_GET, METHOD_PATCH, METHOD_POST, sendRequest } from "./axiosRequest";
import urls from "./urls";

export async function createServiceReq(address, description, reception_date) {
  return await sendRequest(urls.service.create(), METHOD_POST, {
    description: description,
    address: address,
    reception_date: reception_date
  });
}

export async function fetchActiveRequestListReq() {
  return await sendRequest(urls.service.getServiceRequestList(), METHOD_GET);
}

export async function acceptRequestByCustomerReq(id) {
  return await sendRequest(urls.service.acceptByCustomer(id), METHOD_PATCH, {
    decision: "accept"
  });
}

export async function acceptRequestBySpecialistReq(id, price) {
  console.log(id,price,urls.service.acceptBySpecialist(id))
  return await sendRequest(urls.service.acceptBySpecialist(id), METHOD_PATCH, {
    status: "SPECIALIST_ACCEPTED",
    price: price
  });
}

export async function updateCustomerAddressReq(id, address) {
  return await sendRequest(urls.service.updateAddress(id), METHOD_PATCH, {
    address: address
  });
}

export async function completeRequestByCustomerReq(id) {
  return await sendRequest(urls.service.completeByCustomer(id), METHOD_PATCH);
}