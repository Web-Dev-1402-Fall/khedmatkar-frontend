import { useEffect, useState } from "react";
import classJoin from "../../utils/classJoin";
import RequestItem from "./RequestItem";
import { fetchActiveRequestListReq } from "../../api/serviceService";
import { useAuth } from "../../providers/authProvider";
import { MY_REQUEST_REFRESH, REFRESH_SUCCESS, useServiceReducer } from "../../providers/serviceProvider";

const RequestList = () => {
  const { state, dispatch } = useServiceReducer();
  const { user } = useAuth();
  useEffect(() => {
    const fetchServiceRequests = async () => {
      dispatch({ type: MY_REQUEST_REFRESH });
      const res = await fetchActiveRequestListReq();
      if (res.isSuccess) {
        dispatch({ type: REFRESH_SUCCESS, payload: res.data });
      }
    };

    fetchServiceRequests();
  }, []);


  const [filter, setFilter] = useState("All");

  const filterServiceReqs = (filter) => {
    switch (filter) {
      case "completed":
        return state.requests.filter(req => req.status === "completed");
      case "SPECIALIST_ACCEPTED":
        return state.requests.filter(req => req.status === "SPECIALIST_ACCEPTED");
      case "FINDING_SPECIALIST":
        return state.requests.filter(req => req.status === "FINDING_SPECIALIST");
      case "accepted":
        return state.requests.filter(req => req.status === "accepted");
      case "Overdue":
        return state.requests.filter(req => new Date(req.reception_date) < new Date());
      default:
        return state.requests;
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
