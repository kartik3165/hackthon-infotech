import { Link } from 'react-router-dom';
import { Instagram, Linkedin, Facebook, Youtube } from 'lucide-react';

const navGroups = [
    {
        label: 'Projects',
        links: [
            { label: 'Ongoing Projects', href: '/ongoing-projects' },
            { label: 'Completed Projects', href: '/completed-projects' },
            { label: 'Skyline Heights', href: '/projects/skyline-heights' },
            { label: 'Skyline Business Hub', href: '/projects/skyline-business-hub' },
            { label: 'Skyline Greens', href: '/projects/skyline-greens' },
            { label: 'Skyline Metro Plaza', href: '/projects/skyline-metro-plaza' },
        ],
    },
    {
        label: 'Resources',
        links: [
            { label: 'About Us', href: '/about' },
            { label: 'Gallery', href: '/gallery' },
            { label: 'Location', href: '/location' },
            { label: 'EMI Calculator', href: '/emi-calculator' },
            { label: 'Brochure Download', href: '/brochure' },
        ],
    },
    {
        label: 'Company',
        links: [
            { label: 'Contact Us', href: '/contact' },
            { label: 'Terms & Conditions', href: '/terms' },
            { label: 'Privacy Policy', href: '/privacy' },
        ],
    },
];

export default function Footer() {
    return (
        <footer className="bg-charcoal text-white pt-20 pb-10 px-6 sm:px-12 border-t border-white/5">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
                    {/* Brand */}
                    <div className="sm:col-span-2 lg:col-span-2">
                        <Link to="/" className="flex items-center space-x-2 mb-6">
                            <div className="w-10 h-10 border-2 border-gold flex items-center justify-center">
                                <span className="font-serif text-xl font-bold tracking-tighter">S</span>
                            </div>
                            <span className="font-serif text-2xl tracking-widest uppercase">Skyline</span>
                        </Link>
                        <p className="text-white/40 max-w-xs leading-relaxed mb-8 text-sm">
                            The gold standard in luxury infrastructure development. Based in Mumbai, shaping the skylines of India.
                        </p>
                        <div className="flex space-x-4 mb-8">
                            {[Instagram, Linkedin, Facebook, Youtube].map((Icon, i) => (
                                <a key={i} href="#" className="w-9 h-9 border border-white/10 hover:border-gold flex items-center justify-center text-white/40 hover:text-gold transition-all">
                                    <Icon size={14} />
                                </a>
                            ))}
                        </div>
                        <div className="space-y-2 text-sm text-white/40">
                            <p>📞 <a href="tel:18001234567" className="hover:text-gold transition-colors">1800-SKYLINE (Toll Free)</a></p>
                            <p>✉️ <a href="mailto:info@skylineinfra.in" className="hover:text-gold transition-colors">info@skylineinfra.in</a></p>
                        </div>
                    </div>

                    {/* Nav Groups */}
                    {navGroups.map(group => (
                        <div key={group.label}>
                            <h6 className="text-gold uppercase tracking-widest text-xs font-bold mb-6">{group.label}</h6>
                            <ul className="space-y-3">
                                {group.links.map(link => (
                                    <li key={link.href}>
                                        <Link to={link.href} className="text-sm text-white/50 hover:text-gold transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* RERA / Legal */}
                <div className="border-t border-white/5 pt-8 space-y-4">
                    <p className="text-[10px] text-white/20 leading-relaxed max-w-4xl">
                        MahaRERA Registration Nos: Skyline Heights — P51800045123 | Skyline Business Hub — P51800045124 | Skyline Greens — P51800045125 | Skyline Metro Plaza — P51800045126. Available at <span className="underline">maharera.mahaonline.gov.in</span>. All images, renders, and CGIs shown are indicative and subject to change without notice.
                    </p>
                    <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                        <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] text-center lg:text-left text-balance">© {new Date().getFullYear()} Skyline Infra Developers Pvt. Ltd. All Rights Reserved.</p>
                        <div className="flex gap-6 text-[10px] text-white/30 uppercase tracking-[0.2em]">
                            <Link to="/terms" className="hover:text-gold transition-colors">Terms</Link>
                            <Link to="/privacy" className="hover:text-gold transition-colors">Privacy</Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
