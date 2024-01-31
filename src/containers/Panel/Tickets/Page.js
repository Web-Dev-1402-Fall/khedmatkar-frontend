import React from "react";
import CreateTicket from "../../../modules/Tickets/CreateTicket";
import TicketList from "../../../modules/Tickets/TicketList";

const TicketPage = () => {
  return (
    <div>
      <CreateTicket />
      <TicketList />
    </div>
  );
};

export default TicketPage;
