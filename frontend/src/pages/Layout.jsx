import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";


export default function Layout() {
    return (
        <>
            <Header />

            <main>
                <Suspense fallback={<div>loading ...</div>}>
                    <Outlet />
                </Suspense>
            </main>
            
            <Footer />
        </>
    )
}
