import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/common/Header";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ThemeToggle from "../components/common/ThemeToggle";
import PulseCards from "../components/common/PulseCards";


export default function Layout() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

    return (
        <>
            <ThemeToggle />
            {!isLandingPage && <Header />}
            <Navbar></Navbar>
            <main>
                <Suspense fallback={
                    <PulseCards />
                }>
                    <Outlet />
                </Suspense>
            </main>
            
            <Footer  style={{ position: "fixed", bottom: 0 }} />
        </>
    )
}
