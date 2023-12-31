import { Link } from "react-router-dom";
import LoginForm from "../modules/LoginForm";

export default function Login() {
  return (
    <div className="flex w-full max-w-[350px] flex-col">
      <h1 className="mb-6 text-3xl font-bold">ورود</h1>
      <span className="mb-1 text-sm">سلام!</span>
      <span className="mb-4 text-sm">لطفا اطلاعات خود را وارد کنید</span>
      <LoginForm />
      <div className="flex w-full items-center justify-between">
        <span className="text-sm">اگر تاکنون ثبت‌نام نکرده‌اید</span>
        <Link to={'/signup'} className="text-sm text-brand-dark hover:text-brand">ثبت‌نام</Link>
      </div>
    </div>
  );
}
