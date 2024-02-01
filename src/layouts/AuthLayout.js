import Logo from "../components/Logo";
import { useAuth } from "../providers/authProvider";
import { Navigate } from "react-router-dom";
import Toast from "../components/Toast";

export default function AuthLayout({ children }) {
  const { user } = useAuth();
  if (user.isAuthenticated) return <Navigate to="/panel" replace />;
  return (
    <div className={"rtl flex min-h-[100dvh] w-full bg-[#cdcdcd]"}>
      <div className="flex w-full flex-col p-16">
        <Logo />
        <div className="h-[80%] w-[50%] mt-20  bg-white drop-shadow-lg rounded-lg self-center">
          <div className="flex h-full w-full items-center justify-center self-center">
            {children}
          </div>
        </div>
      </div>
      <Toast />
    </div>
  );
}
