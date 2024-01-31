import urls  from "./urls.js";
import { METHOD_GET, METHOD_POST, sendRequest } from "./axiosRequest";

export async function fetchTicketsReq() {
  return await sendRequest(urls.ticket.list(),METHOD_GET)
}