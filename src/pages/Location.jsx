import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { name: 'Skyline Heights', location: 'Andheri West, Mumbai', nearby: ['Infiniti Mall – 400m', 'Metro Station – 600m', 'International Airport – 8 km', 'Schools – 1.2 km'] },
    { name: 'Skyline Business Hub', location: 'BKC, Mumbai', nearby: ['BKC Metro – 200m', 'Banking Zone – Walkable', 'Domestic Airport – 10 km', 'Restaurants – On-site'] },
    { name: 'Skyline Greens', location: 'Thane West, MMR', nearby: ['Viviana Mall – 2 km', 'Thane Railway – 3 km', 'Hospitals – 1.5 km', 'IT Park – 5 km'] },
    { name: 'Skyline Metro Plaza', location: 'Ghatkopar East', nearby: ['Ghatkopar Metro – 50m', 'Eastern Expressway – 5 min', 'Hospitals – 2 km', 'Schools – 1 km'] },
];

const cityAdvantages = [
    { city: 'Mumbai', tag: 'Financial Capital', desc: 'Maximum ROI, highest appreciation rates, and strongest rental yield in the country.', img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600' },
    { city: 'Thane', tag: 'Growth Corridor', desc: 'MMR\'s fastest growing node with metro expansion, IT parks, and superior infrastructure.', img: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=600' },
];

export default function Location() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.utils.toArray('.reveal-up').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            });
        });
    }, { scope: container });

    return (
        <div ref={container}>
            <PageHero
                label="Location Advantage"
                title="Positioned Where Mumbai Thrives"
                subtitle="Every Skyline project is chosen for its strategic connectivity, growth potential, and lifestyle access."
                bg="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Map Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 reveal-up">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Our Footprint</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Projects Across Mumbai & MMR</h2>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        {/* Map Placeholder */}
                        <div className="reveal-up bg-offwhite h-[500px] flex items-center justify-center border border-charcoal/5 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 bg-[url('https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=600')] bg-cover" />
                            <div className="text-center z-10">
                                <svg className="w-16 h-16 text-gold mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                </svg>
                                <p className="font-serif text-2xl text-charcoal mb-2">Mumbai & MMR</p>
                                <p className="text-charcoal/40 text-xs uppercase tracking-widest">Interactive map integration available on request</p>
                                <div className="mt-6 grid grid-cols-2 gap-3">
                                    {projects.map(p => (
                                        <div key={p.name} className="bg-white p-3 border-l-2 border-gold">
                                            <p className="font-bold text-xs text-charcoal">{p.name}</p>
                                            <p className="text-charcoal/40 text-[10px]">{p.location}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Location Cards */}
                        <div className="space-y-6 reveal-up">
                            {projects.map(p => (
                                <div key={p.name} className="bg-offwhite p-6 border-l-4 border-gold">
                                    <h4 className="font-serif text-xl text-charcoal mb-1">{p.name}</h4>
                                    <p className="text-gold text-xs uppercase tracking-widest mb-4">{p.location}</p>
                                    <div className="grid grid-cols-2 gap-2">
                                        {p.nearby.map(item => (
                                            <div key={item} className="flex items-center gap-2 text-sm text-charcoal/60">
                                                <div className="w-1 h-1 rounded-full bg-gold shrink-0" />
                                                {item}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* City Advantage */}
            <section className="py-24 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 reveal-up">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Why These Cities</p>
                        <h2 className="font-serif text-4xl text-charcoal">Built in India's Growth Engines</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {cityAdvantages.map(city => (
                            <div key={city.city} className="group overflow-hidden reveal-up">
                                <div className="overflow-hidden h-64">
                                    <img src={city.img} alt={city.city} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                                <div className="bg-white p-8 border-b-2 border-gold">
                                    <span className="text-[10px] text-gold uppercase tracking-widest">{city.tag}</span>
                                    <h3 className="font-serif text-3xl text-charcoal mt-1 mb-3">{city.city}</h3>
                                    <p className="text-charcoal/60 leading-relaxed">{city.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
