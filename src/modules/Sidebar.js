import Logo from "../components/Logo";
import { Link, useLocation } from "react-router-dom";
import classJoin from "../utils/classJoin";
import { useAuth } from "../providers/authProvider";
import { MdCreateNewFolder, MdLogout } from "react-icons/md";
import { IoListCircleSharp, IoTicketSharp } from "react-icons/io5";

export default function Sidebar() {
  const { logout, user } = useAuth();
  const { pathname } = useLocation();
  const sidebarItems = user?.data.is_customer
    ? customerItems
    : user?.data.is_specialist
      ? specialistItems
      : adminItems;
  return (
    <div className="flex min-h-[100dvh] w-full max-w-[300px] flex-col border-l border-gray-border bg-white-background p-10">
      <div className="flex flex-1 flex-col">
        <div className="self-center">
          <Logo />
        </div>
        <div className="flex flex-1 flex-col pt-10">
          {sidebarItems.map((item) => (
            <Link
              to={item.link}
              key={item.name}
              className={classJoin([
                "flex items-center px-1 py-4",
                pathname === item.link && "rounded-md bg-brand",
              ])}
            >
              <div className="px-2">
                <item.icon size={20} />
              </div>
              <span className="text-gray-dark mr-2 text-[15px]">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
        <button
          onClick={logout}
          className="flex items-center rounded-md border-2 border-red py-4"
        >
          <div className="px-2">
            <MdLogout color={"red"} />
          </div>
          <span className="text-gray-dark mr-2 text-[15px]">خروج</span>
        </button>
      </div>
    </div>
  );
}

const customerItems = [
  {
    name: "پنل کاربری",
    icon: IoListCircleSharp,
    link: "/panel",
  },
  {
    name: "ثبت درخواست خدمت",
    icon: MdCreateNewFolder,
    link: "/panel/makereq",
  },
  {
    name: "ثبت تیکت",
    icon: IoTicketSharp,
    link: "/panel/ticket",
  },
];
const specialistItems = [
  {
    name: "پنل کاربری",
    icon: IoListCircleSharp,
    link: "/panel",
  },
  {
    name: "فهرست درخواست خدمت",
    icon: MdCreateNewFolder,
    link: "/panel/makereq",
  },
  {
    name: "ثبت تیکت",
    icon: IoTicketSharp,
    link: "/panel/ticket",
  },
];
const adminItems = [
  {
    name: "پنل کاربری",
    icon: IoListCircleSharp,
    link: "/panel",
  },
  {
    name: "فهرست تیکت",
    icon: IoTicketSharp,
    link: "/panel/ticket",
  },
];
