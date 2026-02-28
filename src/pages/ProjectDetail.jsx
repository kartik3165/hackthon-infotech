import { useRef, useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
    Waves, Dumbbell, ConciergeBell, Car, Wifi, Flower2, ShieldCheck, Coffee,
    Clapperboard, Utensils, Trees, BadgeCheck, Users, BriefcaseBusiness, Plane,
    ParkingCircle, Zap, Accessibility, Camera, Leaf, TreePine, PersonStanding,
    Footprints, PlayCircle, Banknote, Sun, Droplets, Train, ShoppingBag,
    Building2, Globe,
} from 'lucide-react';
import { projects } from '../data/projects';
import InquiryForm from '../components/InquiryForm';
import DownloadBrochureButton from '../components/DownloadBrochureButton';

gsap.registerPlugin(ScrollTrigger);

// Map string icon names (from data) to actual lucide-react components
const ICON_MAP = {
    Waves, Dumbbell, ConciergeBell, Car, Wifi, Flower2, ShieldCheck, Coffee,
    Clapperboard, Utensils, Trees, BadgeCheck, Users, BriefcaseBusiness, Plane,
    ParkingCircle, Zap, Accessibility, Camera, Leaf, TreePine, PersonStanding,
    Footprints, PlayCircle, Banknote, Sun, Droplets, Train, ShoppingBag,
    Building2, Globe,
};

// Category color map
const CATEGORY_COLORS = {
    Wellness: 'bg-emerald-50 text-emerald-700',
    Leisure: 'bg-amber-50 text-amber-700',
    Safety: 'bg-blue-50 text-blue-700',
    Service: 'bg-purple-50 text-purple-700',
    Technology: 'bg-cyan-50 text-cyan-700',
    Mobility: 'bg-orange-50 text-orange-700',
    Business: 'bg-indigo-50 text-indigo-700',
};

export default function ProjectDetail() {
    const { slug } = useParams();
    const project = projects.find(p => p.slug === slug);
    const container = useRef(null);

    useLayoutEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        const ctx = gsap.context(() => {
            // 1️⃣ Hero Section
            const tlHero = gsap.timeline();
            tlHero.fromTo('.hero-status',
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: 'power2.out' }
            )
                .fromTo('.hero-title',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
                    "-=0.4"
                )
                .fromTo('.hero-location',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8, ease: 'power2.out' },
                    "-=0.6"
                );

            gsap.fromTo('.hero-bg',
                { scale: 1 },
                { scale: 1.05, duration: 1.2, ease: 'power2.out' }
            );

            // 2️⃣ Key Facts Bar
            const tlFacts = gsap.timeline({
                scrollTrigger: {
                    trigger: '.facts-section',
                    start: 'top 85%',
                }
            });

            tlFacts.fromTo('.fact-item',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }
            )
                .fromTo('.fact-number',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6, stagger: 0.1, ease: 'power2.out' },
                    "-=0.4"
                );

            // 3️⃣ Overview / Description Section
            const tlOverview = gsap.timeline({
                scrollTrigger: {
                    trigger: '.overview-section',
                    start: 'top 80%',
                }
            });

            tlOverview.fromTo('.overview-heading',
                { opacity: 0, x: -15 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo('.overview-text',
                    { opacity: 0 },
                    { opacity: 1, duration: 1, ease: 'power2.out' },
                    "-=0.4"
                );

            // 4️⃣ Configuration Pills
            gsap.fromTo('.config-pill',
                { opacity: 0, y: 15 },
                {
                    opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
                    scrollTrigger: {
                        trigger: '.config-pills-container',
                        start: 'top 85%'
                    }
                }
            );

            let activePill = document.querySelector('.config-pill');
            if (activePill) {
                gsap.set(activePill, { scale: 1.03 });
                gsap.set(activePill.querySelector('.underline-anim'), { scaleX: 1 });
            }

            gsap.utils.toArray('.config-pill').forEach(pill => {
                pill.addEventListener('click', () => {
                    if (activePill === pill) return;

                    if (activePill) {
                        gsap.to(activePill, { scale: 1, duration: 0.4, ease: 'power2.out' });
                        gsap.to(activePill.querySelector('.underline-anim'), { scaleX: 0, duration: 0.4, ease: 'power2.out' });
                    }

                    gsap.to(pill, { scale: 1.03, duration: 0.4, ease: 'power2.out' });
                    gsap.to(pill.querySelector('.underline-anim'), { scaleX: 1, duration: 0.4, ease: 'power2.out' });
                    activePill = pill;
                });
            });

            // 5️⃣ Key Highlights (overview section)
            gsap.fromTo('.amenity-item',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.amenities-container',
                        start: 'top 85%'
                    }
                }
            );

            // 5b️⃣ Amenities Section (icon grid)
            gsap.fromTo('.project-amenity-card',
                { opacity: 0, y: 20 },
                {
                    opacity: 1, y: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.project-amenities-section',
                        start: 'top 80%',
                    }
                }
            );

            // 6️⃣ Floor Plan Cards
            gsap.fromTo('.floor-plan-card',
                { opacity: 0, y: 15 },
                {
                    opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.floor-plans-section',
                        start: 'top 80%'
                    }
                }
            );

            gsap.utils.toArray('.floor-plan-card').forEach(card => {
                const imgContainer = card.querySelector('.floor-plan-img');

                card.addEventListener('mouseenter', () => {
                    gsap.to(card, { y: -6, boxShadow: '0 10px 30px -10px rgba(0,0,0,0.1)', duration: 0.4, ease: 'power2.out' });
                    if (imgContainer) gsap.to(imgContainer, { scale: 1.05, duration: 0.6, ease: 'power2.out' });
                });

                card.addEventListener('mouseleave', () => {
                    gsap.to(card, { y: 0, boxShadow: 'none', duration: 0.4, ease: 'power2.out' });
                    if (imgContainer) gsap.to(imgContainer, { scale: 1, duration: 0.6, ease: 'power2.out' });
                });
            });

            // 7️⃣ Location Section
            const tlLocation = gsap.timeline({
                scrollTrigger: {
                    trigger: '.location-section',
                    start: 'top 80%'
                }
            });

            tlLocation.fromTo('.location-text',
                { opacity: 0, x: -15 },
                { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }
            )
                .fromTo('.location-map',
                    { opacity: 0, x: 15 },
                    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
                    "-=0.6"
                );

            // 8️⃣ Inquiry Form
            const tlInquiry = gsap.timeline({
                scrollTrigger: {
                    trigger: '.inquiry-section',
                    start: 'top 80%'
                }
            });

            tlInquiry.fromTo('.inquiry-text',
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: 'power2.out' }
            )
                .fromTo('.inquiry-form-block',
                    { opacity: 0, x: 15 },
                    { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' },
                    "-=0.4"
                )
                .fromTo('.inquiry-form-block button[type="submit"]',
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: 'power2.out' },
                    "-=0.2"
                );

        }, container);

        return () => ctx.revert();
    }, []);

    if (!project) {
        return (
            <div className="min-h-screen flex items-center justify-center text-charcoal">
                <div className="text-center">
                    <h2 className="font-serif text-4xl mb-4">Project Not Found</h2>
                    <Link to="/ongoing-projects" className="text-gold underline">View All Projects</Link>
                </div>
            </div>
        );
    }

    return (
        <div ref={container}>
            {/* Hero */}
            <section className="relative h-[70vh] bg-charcoal overflow-hidden">
                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover opacity-60 hero-bg origin-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-0 flex items-end">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full">
                        <span className="inline-block bg-gold text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1 mb-4 hero-status opacity-0">{project.status}</span>
                        <h1 className="font-serif text-5xl md:text-7xl text-white mb-3 hero-title opacity-0">{project.title}</h1>
                        <p className="text-white/60 text-lg hero-location opacity-0">{project.location} | {project.category}</p>
                    </div>
                </div>
            </section>

            {/* Overview Bar */}
            <section className="bg-gold facts-section">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-charcoal/10">
                    {[
                        { label: 'Starting Price', value: project.price },
                        { label: 'Possession', value: project.possession },
                        { label: 'Total Units', value: project.totalUnits },
                        { label: 'Floors', value: `G + ${project.floors}` },
                    ].map(item => (
                        <div key={item.label} className="py-6 px-6 text-center fact-item opacity-0">
                            <span className="block text-[10px] uppercase tracking-widest text-charcoal/60 mb-1">{item.label}</span>
                            <span className="font-bold text-charcoal text-xl fact-number opacity-0">{item.value}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Overview + Highlights */}
            <section className="py-24 bg-white overview-section overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                    <div>
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Project Overview</p>
                        <h2 className="font-serif text-4xl text-charcoal mb-6 overview-heading opacity-0">{project.title}</h2>
                        <p className="text-charcoal/70 leading-relaxed text-lg mb-10 overview-text opacity-0">{project.description}</p>
                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">Configuration</p>
                            <div className="flex flex-wrap gap-3 config-pills-container">
                                {project.configs.map(c => (
                                    <span key={c} className="border border-charcoal/20 px-4 py-2 text-sm font-bold text-charcoal config-pill relative cursor-pointer opacity-0 origin-center select-none overflow-hidden text-center">
                                        <span className="relative z-10">{c}</span>
                                        <div className="absolute bottom-0 left-0 h-[2px] bg-gold w-full origin-left scale-x-0 underline-anim" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="amenities-container">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">Key Highlights</p>
                        <div className="grid grid-cols-1 gap-3">
                            {project.highlights.map((h, i) => (
                                <div key={i} className="flex items-center gap-4 py-3 border-b border-charcoal/5 amenity-item opacity-0">
                                    <div className="w-6 h-6 bg-gold/10 flex items-center justify-center shrink-0">
                                        <svg className="w-3 h-3 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-charcoal/80">{h}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Floor Plans */}
            <section className="py-24 bg-offwhite floor-plans-section overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="mb-12">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Floor Plans</p>
                        <h2 className="font-serif text-4xl text-charcoal">Thoughtfully Designed Layouts</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {project.configs.map((config, i) => (
                            <div key={config} className="bg-white p-8 border border-charcoal/5 floor-plan-card opacity-0 relative transition-none cursor-pointer">
                                <div className="flex justify-between items-center mb-6">
                                    <h4 className="font-serif text-2xl">{config}</h4>
                                    <span className="text-gold text-xs uppercase tracking-widest font-bold">Floor Plan {i + 1}</span>
                                </div>
                                <div className="bg-offwhite h-56 flex items-center justify-center border border-charcoal/5 overflow-hidden">
                                    <div className="text-center text-charcoal/30 floor-plan-img origin-center transition-none w-full h-full flex flex-col items-center justify-center">
                                        <svg className="w-16 h-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M3 3h18v18H3zM3 9h18M9 3v18" />
                                        </svg>
                                        <p className="text-xs uppercase tracking-widest">{config} Layout Mock</p>
                                    </div>
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-xs text-charcoal/40 uppercase tracking-widest">Carpet Area</span>
                                    <span className="text-xs font-bold">{600 + i * 250} – {800 + i * 250} sq.ft.</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Amenities */}
            {project.amenities && project.amenities.length > 0 && (
                <section className="py-24 bg-charcoal project-amenities-section overflow-hidden">
                    <div className="max-w-7xl mx-auto px-6 md:px-12">
                        <div className="mb-12">
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Lifestyle & Facilities</p>
                            <h2 className="font-serif text-4xl text-white">World-Class Amenities</h2>
                            <p className="text-white/50 mt-3 text-sm max-w-xl">Every detail curated to elevate your everyday — from sunrise to sundown.</p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {project.amenities.map((amenity, i) => {
                                const Icon = ICON_MAP[amenity.icon] || ShieldCheck;
                                const catColor = CATEGORY_COLORS[amenity.category] || 'bg-white/10 text-white/60';
                                return (
                                    <div
                                        key={i}
                                        className="project-amenity-card opacity-0 bg-white/5 border border-white/10 p-6 flex flex-col items-start gap-3 hover:bg-gold/10 hover:border-gold/30 transition-all duration-300 group"
                                    >
                                        <div className="w-10 h-10 bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                                            <Icon className="w-5 h-5 text-gold" strokeWidth={1.5} />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium text-sm mb-1.5">{amenity.label}</p>
                                            <span className={`text-[9px] uppercase tracking-wider px-2 py-0.5 font-bold ${catColor}`}>
                                                {amenity.category}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* Location */}
            <section className="py-24 bg-white location-section overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div className="location-text opacity-0">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Location</p>
                        <h2 className="font-serif text-4xl text-charcoal mb-6">{project.location}</h2>
                        <p className="text-charcoal/60 mb-8">Strategically positioned at one of the most sought-after addresses in the city, {project.title} gives residents seamless access to lifestyle, work, and transit.</p>
                        <div className="space-y-3">
                            {['Airport – 20 mins', 'Metro Station – 5 mins walk', 'Schools & Hospitals – 2 km', 'Business District – 10 mins'].map(loc => (
                                <div key={loc} className="flex items-center gap-3 text-sm">
                                    <div className="w-1.5 h-1.5 rounded-full bg-gold" />
                                    <span className="text-charcoal/70">{loc}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="bg-offwhite h-80 flex items-center justify-center border border-charcoal/5 location-map opacity-0">
                        <div className="text-center text-charcoal/30">
                            <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <p className="text-xs uppercase tracking-widest">Interactive Map</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Inquiry */}
            <section className="py-24 bg-charcoal inquiry-section overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div className="text-white inquiry-text opacity-0">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Get in Touch</p>
                        <h2 className="font-serif text-4xl mb-6">Interested in {project.title}?</h2>
                        <p className="text-white/60 leading-relaxed mb-8">Fill in your details and our dedicated property advisor will get back to you within 2 business hours with a personalized offer.</p>
                        <div className="space-y-4 text-sm text-white/60">
                            <div className="flex items-center gap-3"><span className="text-gold">📞</span> 1800-SKYLINE (Toll Free)</div>
                            <div className="flex items-center gap-3"><span className="text-gold">✉️</span> projects@skylineinfra.in</div>
                            <div className="flex items-center gap-3"><span className="text-gold">📍</span> Skyline House, BKC, Mumbai 400098</div>
                        </div>
                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-white/40 text-xs uppercase tracking-widest mb-4">Or get the full brochure</p>
                            <DownloadBrochureButton
                                project={project}
                                variant="outline"
                                label="Download PDF Brochure"
                            />
                        </div>
                    </div>
                    <div className="bg-white p-8 md:p-10 inquiry-form-block opacity-0 flex flex-col justify-center">
                        <h3 className="font-serif text-2xl text-charcoal mb-6">Request a Callback</h3>
                        <InquiryForm projectOptions={[project.title]} compact />
                    </div>
                </div>
            </section>
        </div>
    );
}
