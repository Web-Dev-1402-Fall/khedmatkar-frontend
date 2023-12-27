import Logo from "../components/Logo";
import { Link, useLocation, useNavigate } from "react-router-dom";
import classJoin from "../utils/classJoin";
import { useAuth } from "../providers/authProvider";
import { MdCreateNewFolder, MdLogout } from "react-icons/md";
import { IoListCircleSharp } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai";

export default function Sidebar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const sidebarItems = [{
    name: "پنل کاربری", icon: IoListCircleSharp, link: "/panel", isActive: useLocation().pathname === "/panel"
  }, {
    name: "ثبت درخواست خدمت",
    icon: MdCreateNewFolder,
    link: "/panel/makereq",
    isActive: useLocation().pathname === "/panel/makereq"
  }];


  return <div
    className="flex flex-col min-h-[100dvh] w-full max-w-[300px] p-10 border-l border-gray-border bg-white-background">
    <div className="flex flex-col flex-1">
      <div className="self-center">
        <Logo />
      </div>
      <div className="flex flex-col flex-1 pt-10">
        {sidebarItems.map((item) => (<Link to={item.link} key={item.name}
                                           className={classJoin(["flex items-center py-4 px-1", item.isActive && "bg-brand rounded-md"])}>
          <div className="px-2">
            <item.icon size={20} />
          </div>
          <span className="text-[15px] text-gray-dark mr-2">{item.name}</span>
        </Link>))}
      </div>
      <button onClick={logout} className="flex items-center py-4 rounded-md border-red border-2">
        <div className="px-2">
          <MdLogout color={'red'} />
        </div>
        <span className="text-[15px] text-gray-dark mr-2">خروج</span>
      </button>

    </div>
  </div>;
}