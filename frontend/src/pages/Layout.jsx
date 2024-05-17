import { Outlet, useLocation } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import ThemeToggle from "../components/common/ThemeToggle";


export default function Layout() {
  const location = useLocation();

  const isLandingPage = location.pathname === '/';

    return (
        <>
            <ThemeToggle />
            {!isLandingPage && <Header />}

            <main>
                <Suspense fallback={<div>loading ...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            
            <Footer  style={{ position: "fixed", bottom: 0 }} />
        </>
    )
}
