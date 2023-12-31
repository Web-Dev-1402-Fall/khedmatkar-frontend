import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../providers/authProvider";
import Sidebar from "../modules/Sidebar";

export default function PanelLayout({ children }) {
  const { user } = useAuth();
  const { pathname } = useLocation();
  if (!user.isAuthenticated) return <Navigate to="/login" replace />;
  return <div className="flex min-h-[100dvh] w-full rtl">
     <Sidebar />
    <div className="flex flex-col w-full p-16">
      {children}
    </div>
  </div>;
}