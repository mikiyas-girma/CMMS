import React from 'react'
import PathConstants from './pathConstants'
import { element } from 'prop-types';


const Home = React.lazy(() => import("../pages/Home"));
const Materials = React.lazy(() => import('../pages/Materials'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const Employees = React.lazy(() => import('../pages/Employees'));
const Profile = React.lazy(() => import('../pages/Profile'));


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.DASHBOARD, element: <Dashboard />},
    { path: PathConstants.EMPLOYEES, element: <Employees />},
    {path: PathConstants.Materials, element: <Materials />},
    {path: PathConstants.PROFILE, element: <Profile />}
]


export default routes
