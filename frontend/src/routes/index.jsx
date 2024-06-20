import React from "react";
import PathConstants from "./pathConstants";
import { element } from "prop-types";
import { ProtectedRoute, AuthRoute } from "../utils/ProtectedRoute";
import PageNotFound from "../utils/PageNotFound";

const Home = React.lazy(() => import("../pages/Home"));
const Materials = React.lazy(() => import("../pages/Materials"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Employees = React.lazy(() => import("../pages/Employees"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Notification = React.lazy(() => import("../pages/Notifications"));
const Reports = React.lazy(() => import("../pages/Reports"));
const Settings = React.lazy(() =>
  import("../components/settings/UpdatePassword")
);
const About = React.lazy(() => import("../pages/About"));
const UpdatePassword = React.lazy(() =>
  import("../components/settings/UpdatePassword")
);
const ForgotPassword = React.lazy(() => import("../pages/ForgotPassword"));
const ResetPassword = React.lazy(() => import("../pages/ResetPassword"));
PageNotFound;

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  { path: PathConstants.ForgotPassword, element: <ForgotPassword /> },
  { path: PathConstants.ResetPassword, element: <ResetPassword /> },

  {
    path: PathConstants.DASHBOARD,
    element: (
      <AuthRoute>
        <Dashboard />
      </AuthRoute>
    ),
  },
  {
    path: PathConstants.EMPLOYEES,
    element: (
      <ProtectedRoute requiredRoles={["admin", "storeOwner"]}>
        <Employees />
      </ProtectedRoute>
    ),
  },
  {
    path: PathConstants.MATERIALS,
    element: (
      <AuthRoute>
        <Materials />
      </AuthRoute>
    ),
  },
  {
    path: PathConstants.PROFILE,
    element: (
      <AuthRoute>
        <Profile />
      </AuthRoute>
    ),
  },
  {
    path: PathConstants.REPORTS,
    element: (
      <AuthRoute>
        <Reports />
      </AuthRoute>
    ),
  },
  {
    path: PathConstants.NOTIFICATION,
    element: (
      <AuthRoute>
        <Notification />
      </AuthRoute>
    ),
  },

  {
    path: PathConstants.ABOUT,
    element: (
      <AuthRoute>
        <About />
      </AuthRoute>
    ),
  },
  {
    path: PathConstants.UPDATEPASSWORD,
    element: (
      <AuthRoute>
        <UpdatePassword />
      </AuthRoute>
    ),
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
];
// { path: PathConstants.EMPLOYEES, element: <Employees /> },
// { path: PathConstants.Materials, element: <Materials /> },
// { path: PathConstants.PROFILE, element: <Profile /> },
// { path: PathConstants.NOTIFICATION, element: <Notification /> },
export default routes;
