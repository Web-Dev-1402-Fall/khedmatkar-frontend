import Button from "../../components/Button";
import classJoin from "../../utils/classJoin";
import { toPersianDigit } from "../../utils/toPersianDigit";
import {
  acceptRequestByCustomerReq,
  acceptRequestBySpecialistReq,
  completeRequestByCustomerReq
} from "../../api/serviceService";
import TextInput from "../../components/TextInput";
import { useState } from "react";
import { useToast } from "../../providers/toastProvider";
import UpdateAddress from "./UpdateAddress";
import ProfileImage from "../../components/ProfileImage";

const RequestItem = (props) => {
  const { status, description, reception_date, price, address, id, className, role, userId } = props;

  // status badge
  const serviceStatus = {
    "completed": <span
      className="text-[15px] text-white py-0.5 flex-1 text-center rounded-full bg-gray-tertiary">تمام‌شده</span>,
    "accepted": <span
      className="text-[15px] text-white py-0.5 flex-1 text-center rounded-full bg-green">پرداخت‌شده</span>,
    "SPECIALIST_ACCEPTED": <span
      className="text-[15px] text-gray-primary py-0.5 flex-1 text-center rounded-full bg-yellow">منتظر تایید مشتری</span>,
    "FINDING_SPECIALIST": <span
      className="text-[15px] text-gray-primary py-0.5 flex-1 text-center rounded-full bg-yellow">منتظرپاسخ متخصص</span>
  };

  return (
    <div
      className={classJoin(["flex items-center justify-between bg-white-background hover:bg-gray-card_border rounded-md p-2", className])}>
      <div className="flex items-center flex-1">{userId && <ProfileImage name={userId} className={"ml-2"} />}</div>
      <div className="flex items-center flex-1">{serviceStatus[status]}</div>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">{address}</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center truncate">{description}</span>
      <span
        className="text-[15px] text-gray-dark mr-2 flex-1 text-center ltr uppercase">{toPersianDigit(parseInt(price))}</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">{reception_date}</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-end">
      <ServiceOperations status={status} role={role} id={id} />
      </span>
    </div>
  );
};

const ServiceOperations = ({ status, role, id }) => {
  const { showToast } = useToast();

  const acceptSpecialist = () => {
    acceptRequestByCustomerReq(id).then((res) => {
        if (res.isSuccess) {
          showToast("متخصص با موفقیت تایید شد.");
        }
      }
    );
  };

  const completeRequest = () => {
    completeRequestByCustomerReq(id).then((res) => {
        if (res.isSuccess) {
          showToast("درخواست با موفقیت خاتمه یافت.");
          window.location.reload();
        }
      }
    );
  };
  if (status === "SPECIALIST_ACCEPTED" && role === "Customer") {
    return <div className="inline-flex">
      <Button variant="primary" className="py-2.5 mx-1" onClick={acceptSpecialist}>تایید‌انجام‌کار</Button>
    </div>;
  } else if (status === "FINDING_SPECIALIST" && role === "Specialist") {
    return <div className="inline-flex">
      <Button variant="primary" className="py-2.5 mx-1"
              onClick={() => document.getElementById("AcceptModal").showModal()}> قبول درخواست</Button>
      <AcceptRequestModal id={id} />
    </div>;
  } else if (status === "FINDING_SPECIALIST" && role === "Customer") {
    return <div className="inline-flex">
      <Button variant="primary" className="py-2.5 mx-1"
              onClick={() => document.getElementById("UpdateAddressModal").showModal()}> تغییر آدرس</Button>
      <UpdateAddress id={id} />
    </div>;
  } else if (status === "accepted" && role === "Customer") {
    return <div className="inline-flex">
      <Button variant="primary" className="py-2.5 mx-1"
              onClick={() => completeRequest()}>اتمام درخواست</Button>
      <UpdateAddress id={id} />
    </div>;
  }
  return <div className="inline-flex"></div>;
};
const AcceptRequestModal = ({ id }) => {

  const [value, setValue] = useState(0);
  const { showToast } = useToast();
  const acceptRequest = () => {
    console.log(id, value);
    acceptRequestBySpecialistReq(id, value).then((res) => {
        if (res.isSuccess) {
          showToast("قیمت گذاری با موفقیت انجام شد.");
        }
      }
    );
  };
  return <dialog id="AcceptModal" className="modal">
    <div className="modal-box flex flex-col">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg">تعیین قیمت پیشنهادی</h3>
      <div className="inline-flex p-5">
        <TextInput className="mx-2" value={value} onChange={(val, e) => setValue(parseInt(val))} /> <Button
        onClick={acceptRequest}>تایید</Button></div>
    </div>
  </dialog>;
};
export default RequestItem;