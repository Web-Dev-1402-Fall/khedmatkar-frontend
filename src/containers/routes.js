// Layout Types
// import { DefaultLayout } from "../layouts";
import Home from "./Home";

// Route Views



const routes = [
  {
    path: "/",
    exact: true,
    // layout: DefaultLayout,
    component: Home,
  },
  {
    path: "/index.html",
    exact: true,
    // layout: DefaultLayout,
    component: Home,
  },
  {
    path: "*",
    // layout: DefaultLayout,
    component: Home,
  },
];
export default routes;
