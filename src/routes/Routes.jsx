import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import PrivateRoute from "./PrivateRoute";
import DashboardLayout from "../layouts/DashboardLayout";
import UserRoute from "./userRoute";
import AllEvents from "../pages/Dashboard/AllEvents/AllEvents";
import CreateEvents from "../pages/Dashboard/CreateEvent/CreateEvents";
import DashboardHome from "../pages/Dashboard/DashboardHome/DashboardHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <UserRoute>
            <DashboardHome></DashboardHome>
          </UserRoute>
        ),
      },
      {
        path: "all-events",
        element: (
          <UserRoute>
            <AllEvents></AllEvents>
          </UserRoute>
        ),
      },
      {
        path: "create-events",
        element: (
          <UserRoute>
            <CreateEvents></CreateEvents>
          </UserRoute>
        ),
      },
    ],
  },
]);
