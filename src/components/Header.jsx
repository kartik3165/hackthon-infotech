import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Heritage', href: '/about' },
    { label: 'Projects', href: '/ongoing-projects' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
];

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header
            className={cn(
                'fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 sm:px-12 flex justify-between items-center text-white',
                isScrolled && 'bg-charcoal/95 backdrop-blur-[10px] py-4 border-b border-gold/30'
            )}
        >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 border-2 border-gold flex items-center justify-center">
                    <span className="font-serif text-xl font-bold tracking-tighter">S</span>
                </div>
                <span className="font-serif text-xl tracking-widest uppercase hidden lg:block">Skyline</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex space-x-8 uppercase text-xs tracking-[0.2em] font-bold">
                {navLinks.map(link => (
                    <NavLink
                        key={link.href}
                        to={link.href}
                        className={({ isActive }) =>
                            cn('hover:text-gold transition-colors', isActive && 'text-gold')
                        }
                    >
                        {link.label}
                    </NavLink>
                ))}
            </nav>

            {/* CTA */}
            <div className="flex items-center gap-3">
                <Link
                    to="/contact"
                    className="hidden lg:block bg-gold hover:bg-white hover:text-charcoal text-white px-6 py-3 text-xs uppercase tracking-widest font-bold transition-all duration-300"
                >
                    Schedule Site Visit
                </Link>
                {/* Mobile hamburger */}
                <button
                    className="lg:hidden flex flex-col gap-[5px] p-2"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && 'rotate-45 translate-y-1.5')} />
                    <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && 'opacity-0')} />
                    <span className={cn('block w-6 h-0.5 bg-white transition-all', menuOpen && '-rotate-45 -translate-y-1.5')} />
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="absolute top-full left-0 w-full bg-charcoal/98 backdrop-blur-md py-8 px-6 flex flex-col gap-6 lg:hidden border-t border-gold/20">
                    {navLinks.map(link => (
                        <NavLink
                            key={link.href}
                            to={link.href}
                            onClick={() => setMenuOpen(false)}
                            className={({ isActive }) =>
                                cn('text-sm uppercase tracking-widest font-bold hover:text-gold transition-colors', isActive ? 'text-gold' : 'text-white')
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                    <Link
                        to="/contact"
                        onClick={() => setMenuOpen(false)}
                        className="mt-2 bg-gold text-white px-6 py-3 text-xs uppercase tracking-widest font-bold text-center"
                    >
                        Schedule Site Visit
                    </Link>
                </div>
            )}
        </header>
    );
}
