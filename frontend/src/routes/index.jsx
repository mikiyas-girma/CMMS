import React from 'react'
import PathConstants from './pathConstants'


const Home = React.lazy(() => import("../pages/Home"));
const About = React.lazy(() => import('../pages/About'));


const routes = [
    { path: PathConstants.HOME, element: <Home /> },
    { path: PathConstants.ABOUT, element: <About />},
]


export default routes
