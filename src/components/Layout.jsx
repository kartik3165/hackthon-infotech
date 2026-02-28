import { Outlet, Link, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useEffect } from 'react';

export default function Layout() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <div className="font-sans antialiased bg-white text-charcoal">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
