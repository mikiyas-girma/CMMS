import React from "react";
import PathConstants from "./pathConstants";
import { element } from "prop-types";
import ProtectedRoute from "../utils/ProtectedRoute";

const Home = React.lazy(() => import("../pages/Home"));
const Materials = React.lazy(() => import("../pages/Materials"));
const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const Employees = React.lazy(() => import("../pages/Employees"));
const Profile = React.lazy(() => import("../pages/Profile"));
const Notification = React.lazy(() => import("../pages/Notifications"));

const routes = [
  { path: PathConstants.HOME, element: <Home /> },
  {
    path: PathConstants.DASHBOARD,
    element: (
      <ProtectedRoute requiredRole="admin">
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  { path: PathConstants.EMPLOYEES, element: <Employees /> },
  { path: PathConstants.Materials, element: <Materials /> },
  { path: PathConstants.PROFILE, element: <Profile /> },
  { path: PathConstants.Notification, element: <Notification /> },
];

export default routes;
