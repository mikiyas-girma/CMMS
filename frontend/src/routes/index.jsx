import React from 'react'
import PathConstants from './pathConstants'


const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import('../pages/About'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About />},
    { path: PathConstants.DASHBOARD, element: <Dashboard />}
]


export default routes
