import { useEffect, useState } from "react";
import { fetchUserReq } from "../../api/authService";
import ProfileImage from "../../components/ProfileImage";
import { useAuth } from "../../providers/authProvider";
import { toPersianDigit } from "../../utils/toPersianDigit";

const UserInfoBox = () => {
  const { user } = useAuth();

  return (
    <>
      <h2 className="text-[19px] font-bold mb-4">اطلاعات کاربری</h2>
      <div className="flex items-center bg-gray-card_border rounded-md p-2">
        <div className="flex items-center flex-1">
          <ProfileImage name={user.data?.username} className={"ml-2"} />
          <span className={"mt-2"}>{user.data?.first_name + " " + user.data?.last_name}</span>
        </div>
        <div className="flex items-center flex-1">
          <span className="ml-2">ایمیل:</span>
          <span>{user.data?.email}</span>
        </div>
        <div className="flex items-center flex-1">
          <span className="ml-2">نوع حساب:</span>
          <span>{user.data?.is_admin ? "مدیر" : user.data?.is_specialist ? "متخصص" : "مشتری"}</span>
        </div>
      </div>
    </>
  );
};

export default UserInfoBox;