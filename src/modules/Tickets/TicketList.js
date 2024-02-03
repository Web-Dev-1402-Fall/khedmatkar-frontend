import React, { useState, useEffect } from "react";
import { fetchTicketsReq } from "../../api/ticketService";
import TicketItem from "./TicketItem";

const TicketList = () => {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchTickets = async () => {
      const res = await fetchTicketsReq();
      console.log(res);
      if (res.isSuccess) {
        setTickets(res.data);
      }
    };

    fetchTickets();
  }, []);
  return <div>
    <div
      className="flex items-center justify-around bg-brand-dark text-white rounded-md p-2 my-4">
      <span className="text-[15px] text-gray-dark mr-2 flex-1"> شناسه تیکت</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">عملیات</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">موضوع</span>
    </div>
    {tickets.map((ticket, index) => <TicketItem uuid={ticket.uuid} topic={ticket.topic} />)}
  </div>;
};

export default TicketList;
