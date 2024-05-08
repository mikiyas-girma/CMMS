import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";


export default function Layout() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

    return (
        <>
            {!isLandingPage && <Header />}
            <Navbar></Navbar>
            <main>
                <Suspense fallback={<div>loading ...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            
            <Footer  style={{ position: "sticky", bottom: 0 }} />
        </>
    )
}
