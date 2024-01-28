import { Link } from "react-router-dom";
import SignupForm from "../modules/SignupForm";

export default function Signup() {
  return <div className="flex flex-col w-full max-w-96 py-10">
    <h1 className="text-2xl font-bold mb-6">ثبت‌نام</h1>
    <span className="text-sm mb-1">سلام!</span>
    <span className="text-sm mb-4">لطفا اطلاعات خود را وارد کنید</span>
    <SignupForm />
    <div className="flex items-center justify-between w-full">
      <span className="text-sm">قبلا ثبت نام کردید؟</span>
      <Link to={"/login"} className="text-sm text-brand-dark hover:text-brand">ورود</Link>
    </div>
  </div>;
}