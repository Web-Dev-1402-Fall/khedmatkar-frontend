import AuthLayout from "../layouts/AuthLayout";
import Home from "./Home";
import Login from "./Login";
import DefaultLayout from "../layouts/DefaultLayout";
import PanelLayout from "../layouts/PanelLayout";
import Signup from "./Signup";
import TicketPage from "./Panel/Tickets/Page";

// Route Views
const routes = [
  {
    path: "/login",
    exact: true,
    layout: AuthLayout,
    component: Login,
  },  {
    path: "/signup",
    exact: true,
    layout: AuthLayout,
    component: Signup,
  },
  {
    path: "/index.html",
    exact: true,
    layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/panel",
    exact: true,
    layout: PanelLayout,
    component: Home,
  },  {
    path: "/panel/ticket",
    exact: true,
    layout: PanelLayout,
    component: TicketPage,
  },
  {
    path: "*",
    layout: DefaultLayout,
    component: Home,
  },
];
export default routes;
