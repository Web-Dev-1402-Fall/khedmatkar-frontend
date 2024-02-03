import React, { useState } from "react";
import { useAuth } from "../../providers/authProvider";
import { toPersianDigit } from "../../utils/toPersianDigit";
import TextInput from "../../components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { increaseFundReq } from "../../api/authService";
import { useToast } from "../../providers/toastProvider";
import Button from "../../components/Button";
import { acceptRequestBySpecialistReq, updateCustomerAddressReq } from "../../api/serviceService";

const UpdateAddress = ({ id }) => {

  const [value, setValue] = useState("");
  const { showToast } = useToast();
  const updateAddress = () => {
    console.log(id, value);
    updateCustomerAddressReq(id, value).then((res) => {
        if (res.isSuccess) {
          showToast("قیمت گذاری با موفقیت انجام شد.");
          window.location.reload();
        }
      }
    );
  };
  return <dialog id="UpdateAddressModal" className="modal">
    <div className="modal-box flex flex-col w-11/12 max-w-5xl">
      <form method="dialog">
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 className="font-bold text-lg">آدرس جدید</h3>
      <div className="inline-flex p-5">
        <div className="w-[80%] mx-2"><TextInput fullWidth className="mx-2" value={value}
                                                 onChange={(val, e) => setValue(val)} /></div>
        <Button
          className="w-[15%] mx-2"
          onClick={updateAddress}>ثبت آدرس</Button></div>
    </div>
  </dialog>;
};

export default UpdateAddress;
