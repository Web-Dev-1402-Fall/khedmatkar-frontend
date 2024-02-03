import { Controller, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { loginRequest, signupRequest } from "../../api/authService";
import { useToast } from "../../providers/toastProvider";
import { useNavigate } from "react-router-dom";

const fields = [
  {
    name: "first_name",
    label: "نام",
    rules: {
      required: "این فیلد اجباری است"
    }
  },
  {
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
  },
  {
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
  const { showToast } = useToast();
  const navigate = useNavigate();
  const submit = (data) => {
    signupRequest(data).then((response) => {
      if (response.isSuccess) {
        loginRequest(data.username, data.password).then((res) => {
          if (res.isSuccess) {
            navigate("/panel");
            window.location.reload();
          }
        });
        navigate("/login");
      } else {
        showToast(response.message, "red");
      }
    });

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
      <Controller
        name="type"
        control={control}
        defaultValue="customer" // Set the default value if needed
        rules={{ required: "نوع حساب خود را مشخص کنید." }}
        render={({ field: { value, onChange, onBlur, name } }) => (
          <div className="inline-flex justify-between">
            <input
              type="radio"
              id="customer"
              value="customer"
              defaultChecked={true}
              checked={value === "customer"}
              onClick={() => onChange("customer")}
              className="ml-4 mr-2"
            />
            <label className="text-sm">مشتری</label>

            <input
              type="radio"
              id="specialist"
              value="specialist"
              className="ml-4 mr-2"
              checked={value === "specialist"}
              onClick={() => onChange("specialist")}
            />
            <label className="text-sm">متخصص</label>
          </div>
        )}
      />
      <Button
        className="my-4 w-full"
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit(submit)}
      >
        ثبت‌نام
      </Button>
    </div>
  );
};

export default SignupForm;
