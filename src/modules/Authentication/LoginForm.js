import { Controller, useForm } from "react-hook-form";
import TextInput from "../../components/TextInput";
import Button from "../../components/Button";
import { useToast } from "../../providers/toastProvider";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../../api/authService";

const fields = [
  {
    name: "username",
    label: "نام‌کاربری",
    rules: {
      required: "این فیلد اجباری است",
    },
  },
  {
    name: "password",
    label: "گذرواژه",
    rules: {
      required: "این فیلد اجباری است",
      minLength: {
        value: 6,
        message: "حداقل طول رمز عبور ۶ کاراکتر است",
      },
    },
  },
];
const LoginForm = () => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm({ mode: "onChange" });

  const submit = (data) => {
    loginRequest(data.username, data.password).then((response) => {
      if (response.isSuccess) {
        navigate("/panel");
        window.location.reload()
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
      <Button
        className="my-4 w-full"
        disabled={!isValid || isSubmitting}
        onClick={handleSubmit(submit)}
      >
        ورود
      </Button>
    </div>
  );
};



export default LoginForm;
