import classJoin from "../../utils/classJoin";
import { toPersianDigit } from "../../utils/toPersianDigit";
import { useEffect, useState } from "react";
import { fetchActiveRequestListReq } from "../../api/serviceService";
import { fetchTicketDetailReq } from "../../api/ticketService";
import Button from "../../components/Button";
import { FaL } from "react-icons/fa6";

const TicketItem = (props) => {
  const { uuid, topic, className } = props;
  const [details, setDetails] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  useEffect(() => {
    const fetchServiceRequests = async () => {
      const res = await fetchTicketDetailReq(uuid);
      if (res.isSuccess) {
        setDetails(res.data);
      }
    };

    fetchServiceRequests();
  }, []);
  return <div>
    <div
      className={classJoin(["flex items-center justify-around bg-white-background hover:bg-gray-card_border rounded-md p-2", className])}>
      <div className="flex items-center flex-1">{"#".concat(uuid?.substring(0, 6))}</div>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">{topic}</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">
      <Button className="bg-[#cd9c6a]" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? "بستن پاسخ" : "مشاهده‌پاسخ"}
      </Button></span>
    </div>
    {showDetails && <div className="flex flex-col  border-b-2 border-primary p-2">
      <div className="inline-flex"><span className="font-bold px-2">محتوای تیکت:</span> <span
        className="px-2">{details?.content}</span></div>
      {details?.comments.length === 0 ? <span className="italic py-2 px-2">شما هنوز پاسخی دریافت نکردید.</span> : <span className="px-3.5">{details.comments[0]}</span>}
    </div>}
  </div>;
};

export default TicketItem;