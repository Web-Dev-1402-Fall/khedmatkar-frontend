import { FC } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import classJoin from "../../utils/classJoin";
import { createTicketsReq } from "../../api/ticketService";
import { useToast } from "../../providers/toastProvider";

const fields = [
  {
    name: "topic",
    label: "موضوع",
    rules: {
      required: "این فیلد اجباری است",
    },
  },
  {
    name: "content",
    label: "توضیحات",
    rules: {
      required: "این فیلد اجباری است",
    },
  },
];

const CreateTicket = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm();

  const {showToast} =useToast()
  const submit = async (data) => {
    const res = await createTicketsReq(data.topic,data.content)
    console.log(res)
    if (res.isSuccess){
      showToast("تیکت باموفقیت ساخته شد.","green")
    }
  };

  return (
    <div className="rounded-xl border border-gray-border p-12">
      <h2 className="mb-6 text-xl font-bold">ساخت تیکت جدید</h2>
      <div className="m-2">
        {fields
          .filter((field) => field.name !== "content")
          .map((field) => (
            <Controller
              key={field.name}
              control={control}
              name={field.name}
              rules={field.rules}
              defaultValue=""
              render={({ field: { value, onChange, onBlur, name } }) => (
                <TextInput
                  className={classJoin([
                    "mb-4",
                    field.name === "topic" ? "ml-6" : "",
                  ])}
                  type="text"
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
              )}
            />
          ))}
      </div>
      <div className="mt-2">
        {fields
          .filter((field) => field.name === "content")
          .map((field) => (
            <Controller
              key={field.name}
              control={control}
              name={field.name}
              rules={field.rules}
              defaultValue=""
              render={({ field: { value, onChange, onBlur, name } }) => (
                <TextInput
                  type="text"
                  element="textarea"
                  elementClassName="h-40"
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
              )}
            />
          ))}
      </div>
      <div className="text-left">
        <Button
          className="my-4 bg-[#cd9c6a]"
          disabled={!isValid || isSubmitting}
          onClick={handleSubmit(submit)}
        >
          ارسال تیکت
        </Button>
      </div>
    </div>
  );
};

export default CreateTicket;
