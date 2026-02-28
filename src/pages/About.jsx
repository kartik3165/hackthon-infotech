import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';

gsap.registerPlugin(ScrollTrigger);

const timeline = [
    { year: '1998', title: 'Founded', desc: 'Skyline Infra Pvt. Ltd. was established with a vision to redefine urban living in India.' },
    { year: '2005', title: 'First Landmark', desc: 'Delivered Skyline Tower in Parel — our first 20-storey high-rise, sold out in 90 days.' },
    { year: '2012', title: 'National Expansion', desc: 'Expanded operations to Pune, Hyderabad, and Bengaluru with 5 concurrent projects.' },
    { year: '2018', title: 'CREDAI Excellence Award', desc: 'Recognized as Developer of the Year by CREDAI Maharashtra for consistent quality delivery.' },
    { year: '2024', title: '150+ Projects', desc: 'Crossed the milestone of 150 successfully delivered projects and 25M+ sq. ft. developed.' },
];

const leadership = [
    {
        name: 'Rajiv Mehta',
        role: 'Chairman & Founder',
        image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400',
        bio: 'A civil engineer turned visionary, Rajiv founded Skyline with a singular focus: buildings that last centuries.',
    },
    {
        name: 'Priya Mehta',
        role: 'Managing Director',
        image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
        bio: 'Harvard-educated architect with 20+ years in luxury real estate design across India and the UAE.',
    },
    {
        name: 'Arjun Kapoor',
        role: 'Director, Commercial',
        image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400',
        bio: "Former investment banker driving Skyline's commercial portfolio with over ₹5000 Cr in assets under management.",
    },
];

export default function About() {
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
                label="Our Story"
                title="Building India's Most Iconic Skylines"
                subtitle="Two and a half decades of architectural excellence, community impact, and uncompromising quality."
                bg="https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Mission */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="reveal-up">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Who We Are</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-8 leading-tight">Skyline Infra Pvt. Ltd.</h2>
                        <div className="space-y-5 text-charcoal/70 leading-relaxed text-lg">
                            <p>Skyline Infra Developers is India's premium real estate developer, renowned for creating architectural landmarks that redefine skylines across the country's most dynamic cities.</p>
                            <p>Founded in 1998, we operate at the intersection of vision and craft — where timeless design meets future-ready technology. Our portfolio spans luxury residences, Grade-A commercial buildings, and integrated lifestyle communities.</p>
                            <p>We don't measure our success in square feet; we measure it in the lives transformed, the legacies built, and the cities we have helped shape.</p>
                        </div>
                    </div>
                    <div className="relative reveal-up">
                        <img
                            src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=900"
                            alt="Skyline HQ"
                            className="w-full h-[500px] object-cover"
                        />
                        <div className="absolute -bottom-8 -left-8 bg-gold p-8 max-w-[200px]">
                            <p className="font-serif text-4xl text-charcoal font-bold">26</p>
                            <p className="text-charcoal text-xs uppercase tracking-widest mt-1">Years of Excellence</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-16 bg-charcoal">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {[
                        { num: '150+', label: 'Projects Delivered' },
                        { num: '25M+', label: 'Sq. Ft. Developed' },
                        { num: '18,000+', label: 'Happy Families' },
                        { num: '12', label: 'Cities Presence' },
                    ].map(stat => (
                        <div key={stat.label} className="reveal-up">
                            <span className="font-serif text-5xl text-gold block mb-2">{stat.num}</span>
                            <span className="text-white/50 text-xs uppercase tracking-widest">{stat.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Timeline */}
            <section className="py-24 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 reveal-up">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Our Journey</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Milestones That Define Us</h2>
                    </div>
                    <div className="relative">
                        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gold/20 hidden md:block" />
                        <div className="space-y-12">
                            {timeline.map((item, i) => (
                                <div key={item.year} className={`flex flex-col md:flex-row items-center gap-8 reveal-up ${i % 2 === 0 ? '' : 'md:flex-row-reverse'}`}>
                                    <div className={`w-full md:w-5/12 ${i % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                                        <span className="font-serif text-5xl text-gold">{item.year}</span>
                                    </div>
                                    <div className="hidden md:flex w-2/12 justify-center">
                                        <div className="w-4 h-4 rounded-full bg-gold border-4 border-white ring-2 ring-gold/30" />
                                    </div>
                                    <div className="w-full md:w-5/12 bg-white p-6 border-l-2 border-gold">
                                        <h4 className="font-serif text-xl mb-2">{item.title}</h4>
                                        <p className="text-charcoal/60 text-sm">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="text-center mb-16 reveal-up">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">The Team</p>
                        <h2 className="font-serif text-4xl md:text-5xl text-charcoal">Leadership That Leads</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {leadership.map(person => (
                            <div key={person.name} className="group reveal-up">
                                <div className="overflow-hidden h-80 mb-6">
                                    <img src={person.image} alt={person.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                                </div>
                                <h4 className="font-serif text-xl">{person.name}</h4>
                                <p className="text-gold text-xs uppercase tracking-widest mb-3">{person.role}</p>
                                <p className="text-charcoal/60 text-sm leading-relaxed">{person.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Awards */}
            <section className="py-16 bg-charcoal">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold text-center mb-10">Recognition</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {['CREDAI Developer of Year', 'CNBC Awaaz Real Estate Award', 'Times Realty Icons', 'ET Now Real Estate Excellence'].map(award => (
                            <div key={award} className="border border-white/10 p-6 text-center reveal-up">
                                <div className="w-10 h-10 border border-gold/50 mx-auto mb-4 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gold" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                </div>
                                <p className="text-white/70 text-xs uppercase tracking-widest">{award}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
