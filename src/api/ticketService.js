import urls from "./urls.js";
import { METHOD_GET, METHOD_POST, sendRequest } from "./axiosRequest";

export async function fetchTicketsReq() {
  return await sendRequest(urls.ticket.list(), METHOD_GET);
}
export async function fetchTicketDetailReq(uuid) {
  return await sendRequest(urls.ticket.details(uuid), METHOD_GET);
}
export async function createTicketsReq(topic, content) {
  return await sendRequest(urls.ticket.create(), METHOD_POST, {
    topic: topic,
    content: content,
  });
}
