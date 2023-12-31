import { Controller, useForm } from "react-hook-form";
import TextInput from "../components/TextInput";
import Button from "../components/Button";
import { METHOD_POST, sendRequest } from "../common/axiosRequest";
import urls from "../common/urls";

const fields = [
  {
    name: "first_name",
    label: "نام",
    rules: {
      required: "این فیلد اجباری است"
    }
  }, {
    name: "last_name",
    label: "نام خانوادگی",
    rules: {
      required: "این فیلد اجباری است"
    }
  },
  {
    name: "email",
    label: "ایمیل",
    rules: {
      required: "این فیلد اجباری است",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "مقدار ورودی معتبر نیست"
      }
    }
  }, {
    name: "username",
    label: "نام‌کاربری",
    rules: {
      required: "این فیلد اجباری است"
    }
  },
  {
    name: "password",
    label: "گذرواژه",
    rules: {
      required: "این فیلد اجباری است",
      minLength: {
        value: 6,
        message: "حداقل طول رمز عبور ۶ کاراکتر است"
      }
    }
  }
];

const SignupForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid }
  } = useForm({ mode: "onChange" });

  const submit = (data) => {
    sendRequest(urls.auth.register(), METHOD_POST, data);
  };

  return (
    <div>
      {fields.map((field, idx) => (
        <Controller
          key={field.name}
          control={control}
          name={field.name}
          rules={field.rules}
          defaultValue=""
          render={({ field: { value, onChange, onBlur, name } }) => (
            <TextInput
              className="mb-4"
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
          )}
        />
      ))}
      <Button
        className="my-4 w-full"
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit(submit)}>
        ثبت‌نام
      </Button>
    </div>
  );
};

export default SignupForm;