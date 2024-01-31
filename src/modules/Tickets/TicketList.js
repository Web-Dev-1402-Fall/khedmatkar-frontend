import React, { useState, useEffect } from "react";
import { fetchTicketsReq } from "../../api/ticketService";

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
  return <div></div>;
};

export default TicketList;
