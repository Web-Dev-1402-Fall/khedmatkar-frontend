import React, { useState } from "react";
import { useAuth } from "../../providers/authProvider";
import { toPersianDigit } from "../../utils/toPersianDigit";
import TextInput from "../../components/TextInput";
import { Controller, useForm } from "react-hook-form";
import { increaseFundReq } from "../../api/authService";
import { useToast } from "../../providers/toastProvider";
import Button from "../../components/Button";

const fields = [
  {
    name: "increase_amount",
    label: "میزان افزایش‌ موجودی",
    rules: {
      required: "این فیلد اجباری است"
    }
  }
];

function WalletInfo() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: "onChange" });

  const submit = (data) => {
    increaseFundReq(data.increase_amount).then((response) => {
      if (response.isSuccess) {
        window.location.reload();
      } else {
        showToast(response.message, "red");
      }
    });
  };
  return (
    <div className="stats bg-brand-dark text-primary-content w-[%50] my-4 rounded-md">

      <div className="stat">
        <div className="stat-title">موجودی حساب</div>
        <div className="stat-value">{toPersianDigit(user.data?.balance)} تومان</div>
        <div className="stat-actions inline-flex">
          {fields.map((field) => <Controller
            control={control}
            render={({ field: { value, onChange, onBlur, name } }) => (
              <TextInput
                className="self-center mx-1 text-brand-dark"
                type={field.name === "password" ? "password" : "text"}
                fullWidth
                label={field.label}
                id={field.name}
                error={`${errors[field.name]?.message || ""}`}
                isOptional={!field.rules?.required}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                name={name}
              />
            )} name={field.name} />)}
          <Button
            className="my-4 bg-[#cd9c6a]"
            disabled={!isValid || isSubmitting}
            onClick={handleSubmit(submit)}>
            افزایش موجودی
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WalletInfo;
