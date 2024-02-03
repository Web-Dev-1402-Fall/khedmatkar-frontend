import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import classJoin from "../../utils/classJoin";
import RequestItem from "./RequestItem";
import Button from "../../components/Button";
import { fetchActiveRequestListReq } from "../../api/serviceService";
import { useAuth } from "../../providers/authProvider";

const RequestList = () => {
  const [serviceReqs, setServiceReqs] = useState([]);
  const { user } = useAuth();
  useEffect(() => {
    const fetchServiceRequests = async () => {
      const res = await fetchActiveRequestListReq();
      if (res.isSuccess) {
        setServiceReqs(res.data);
      }
    };

    fetchServiceRequests();
  }, []);


  const [filter, setFilter] = useState("All");

  const filterServiceReqs = (filter) => {
    switch (filter) {
      case "completed":
        return serviceReqs.filter(req => req.status === "completed");
      case "SPECIALIST_ACCEPTED":
        return serviceReqs.filter(req => req.status === "SPECIALIST_ACCEPTED");
      case "FINDING_SPECIALIST":
        return serviceReqs.filter(req => req.status === "FINDING_SPECIALIST");
      case "accepted":
        return serviceReqs.filter(req => req.status === "accepted");
      case "Overdue":
        return serviceReqs.filter(req => new Date(req.reception_date) < new Date());
      default:
        return serviceReqs;
    }
  };

  const setFilterHandler = (filter) => {
    setFilter(filter);
  };

  const filterValues = [
    { value: "All", label: "همه" },
    { value: "FINDING_SPECIALIST", label: "منتظر‌پاسخ متخصص" },
    { value: "SPECIALIST_ACCEPTED", label: "منتظر تاییدمشتری" },
    { value: "accepted", label: "پرداخت‌شده" },
    { value: "completed", label: "تمام‌شده" },
    { value: "Overdue", label: "منقضی شده" }
  ];

  return <div>
    <div className="flex items-center justify-between w-full">
      <h2 className="text-[19px] font-bold">لیست درخواست خدمت</h2>
      {/*<Link to={TICKETS + "/" + project_uuid + "/create"}>*/}
      {/*  <Button variant="primary" className="py-2.5">+ تیکت جدید</Button>*/}
      {/*</Link>*/}
    </div>
    <p className="text-[14px] mt-4">در این صفحه، لیست درخواست‌خدمت‌ها و درخواست‌هایی که در
      سازمان ثبت شده‌اند نمایش داده‌شده اند.
    </p>
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <span className="text-[14px] text-gray-dark mr-2">فیلتر بر اساس:</span>
        {filterValues.map((option) => (
          <span
            key={option.value}
            className={classJoin([
              "text-sm py-0.5 px-4 bg-gray-card_border text-gray-primary rounded-xl mr-4 cursor-pointer",
              filter === option.value ? "bg-gray-primary text-white" : ""
            ])}
            onClick={() => setFilterHandler(option.value)}
          >
            {option.label}
          </span>
        ))}
      </div>
    </div>
    <div
      className="flex items-center justify-between bg-gray-primary text-white rounded-md p-2 my-4">
      <span className="text-[15px] text-gray-dark mr-2 flex-1"></span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1">آخرین وضعیت</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">آدرس</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">موضوع</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">قیمت پیشنهادی</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-center">ددلاین</span>
      <span className="text-[15px] text-gray-dark mr-2 flex-1 text-end">عملیات</span>
    </div>
    {filterServiceReqs(filter).length > 0 ? filterServiceReqs(filter).map((req, index) => (
      <RequestItem status={req.status} description={req.description} address={req.address}
                   reception_date={req.reception_date} id={req.id} price={req.price}
                   userId={user.data?.is_customer ? req.accepted_specialist : req.customer}
                   role={user.data?.is_customer ? "Customer" : "Specialist"} className="my-1.5" />
    )) : <div className="text-center mt-4">هیچ درخواستی یافت نشد.</div>}
  </div>;
};
export default RequestList;
