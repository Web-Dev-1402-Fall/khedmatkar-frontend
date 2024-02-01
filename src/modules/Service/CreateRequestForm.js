import { FC } from "react";
import { Controller, RegisterOptions, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import classJoin from "../../utils/classJoin";
import { InputDatePicker } from "jalaali-react-date-picker";
import { createTicketsReq } from "../../api/ticketService";
import { useToast } from "../../providers/toastProvider";
import { useNavigate, useParams } from "react-router-dom";

const fields = [{
  name: "address", label: "آدرس", rules: {
    required: "این فیلد اجباری است"
  }
}, {
  name: "description", label: "توضیحات", rules: {
    required: "این فیلد اجباری است"
  }
}];

const CreatRequestForm = () => {
  const {
    control, handleSubmit, formState: { errors, isSubmitting, isValid }
  } = useForm();

  const { showToast } = useToast();
  const submit = async (data) => {
    const res = await createTicketsReq(data.topic, data.content);
    console.log(res);
    if (res.isSuccess) {
      showToast("تیکت باموفقیت ساخته شد.", "green");
    }
  };

  const navigate = useNavigate();
  const { project_uuid } = useParams();

  const onDeadlineChange = (onChange, value) => {
    onChange(value);
  };

  const validateDeadline = (value) => {
    const selectedDate = new Date(value);
    const today = new Date();
    if (selectedDate <= today) {
      return "مهلت باید بیشتر از امروز باشد";
    }
    return true;
  };


  return (<div className="p-12 border border-gray-border rounded-xl">
    <h2 className="mb-6 font-bold text-xl">ساخت درخواست خدمت جدید</h2>
    <div className="flex items-stretch justify-between">
      <Controller
        key={fields[0].name}
        control={control}
        name={fields[0].name}
        rules={fields[0].rules}
        defaultValue=""
        render={({ field: { value, onChange, onBlur, name } }) => (<TextInput
          className="mb-4 ml-6 flex-1"
          type="text"
          fullWidth
          label={fields[0].label}
          id={fields[0].name}
          error={`${errors[fields[0].name]?.message || ""}`}
          isOptional={!fields[0].rules?.required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          autoComplete="off"
        />)}
      />
      <Controller
        control={control}
        name="reception_date"
        rules={{
          required: "این فیلد اجباری است", validate: validateDeadline
        }}
        defaultValue=""
        render={({ field: { value, onChange } }) => (<div className="flex flex-col flex-1">
          <InputDatePicker
            wrapperClassName="!h-[56px] !rounded-xl !border-gray-border"
            placeholder="تاریخ"
            value={value}
            onChange={(value) => onDeadlineChange(onChange, value)}
          />
          <span className="text-xs text-red mt-0.5">
              {typeof errors.deadline?.message === "string" ? errors.deadline?.message : ""}
            </span>
        </div>)}
      />
    </div>
    <div className="mt-2">
      <Controller
        key={fields[1].name}
        control={control}
        name={fields[1].name}
        rules={fields[1].rules}
        defaultValue=""
        render={({ field: { value, onChange, onBlur, name } }) => (<TextInput
          className="mt-2"
          type="text"
          element="textarea"
          elementClassName="h-60"
          fullWidth
          label={fields[1].label}
          id={fields[1].name}
          error={`${errors[fields[1].name]?.message || ""}`}
          isOptional={!fields[1].rules?.required}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          name={name}
          autoComplete="off"
        />)}
      />
    </div>
    <div className="text-left">
      <Button
        className="mt-6"
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit(submit)}>
        ساخت درخواست
      </Button>
    </div>
  </div>);
};

export default CreatRequestForm;
