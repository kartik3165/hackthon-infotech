import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Hero from '../components/Hero';
import Projects from '../components/Projects';
import About from '../components/About';
import WhyChoose from '../components/WhyChoose';
import Testimonials from '../components/Testimonials';
import CTA from '../components/CTA';
import { completedProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

const highlights = [
    { num: '150+', label: 'Projects Delivered' },
    { num: '25M+', label: 'Sq. Ft. Developed' },
    { num: '100%', label: 'On-Time Delivery' },
    { num: '18,000+', label: 'Happy Families' },
];

// Show 3 completed projects as a teaser
const featuredCompleted = completedProjects.slice(0, 3);

export default function Home() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // Highlights strip counters
            gsap.utils.toArray('.highlight-item').forEach(el => {
                gsap.from(el, {
                    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
                    y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
                    stagger: 0.1,
                });
            });

            // Completed projects cards
            ScrollTrigger.batch('.completed-card', {
                start: 'top 85%',
                onEnter: batch => gsap.fromTo(batch,
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out' }
                ),
                once: true,
            });

            // CTA section
            gsap.fromTo('.home-cta-section',
                { opacity: 0 },
                {
                    opacity: 1, duration: 1, ease: 'power2.out',
                    scrollTrigger: { trigger: '.home-cta-section', start: 'top 85%', once: true },
                }
            );
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set('.highlight-item, .completed-card, .home-cta-section', { opacity: 1, y: 0 });
        });

        return () => mm.revert();
    }, { scope: container });

    return (
        <div ref={container}>
            {/* 1. Hero Banner */}
            <Hero />

            {/* 2. Quick Highlights Strip */}
            <section className="bg-charcoal border-t border-white/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 divide-x divide-white/5">
                    {highlights.map(h => (
                        <div key={h.label} className="highlight-item py-8 px-6 text-center group hover:bg-gold/10 transition-colors duration-300">
                            <span className="block font-serif text-3xl md:text-4xl text-gold mb-1">{h.num}</span>
                            <span className="text-[10px] uppercase tracking-widest text-white/40">{h.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* 3. Featured Ongoing Projects */}
            <Projects />

            {/* 3b. CTA to see all ongoing projects */}
            <section className="py-6 bg-offwhite border-t border-charcoal/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-charcoal/60 text-sm">Explore our full portfolio of active developments.</p>
                    <Link
                        to="/ongoing-projects"
                        className="bg-charcoal text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors duration-300"
                    >
                        All Ongoing Projects
                    </Link>
                </div>
            </section>

            {/* 4. Featured Completed Projects Snippet */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-3">Legacy of Delivery</p>
                            <h2 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight">Completed Projects</h2>
                        </div>
                        <Link
                            to="/completed-projects"
                            className="hidden md:block text-xs uppercase tracking-widest font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors"
                        >
                            View All Completed
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {featuredCompleted.map(project => (
                            <div key={project.slug} className="group completed-card opacity-0">
                                <div className="overflow-hidden h-64 mb-4">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                    />
                                </div>
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] uppercase tracking-widest text-charcoal/40">{project.category} · {project.year}</span>
                                    <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5">Delivered</span>
                                </div>
                                <h3 className="font-serif text-xl text-charcoal mb-1">{project.title}</h3>
                                <p className="text-charcoal/50 text-sm mb-3">{project.location}</p>
                                {project.amenities && (
                                    <div className="flex flex-wrap gap-1.5">
                                        {project.amenities.slice(0, 3).map(a => (
                                            <span key={a} className="text-[9px] uppercase tracking-wider border border-charcoal/10 px-2 py-0.5 text-charcoal/50">
                                                {a}
                                            </span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="mt-10 text-center md:hidden">
                        <Link
                            to="/completed-projects"
                            className="inline-block text-xs uppercase tracking-widest font-bold border-b-2 border-gold pb-1 hover:text-gold transition-colors"
                        >
                            View All Completed
                        </Link>
                    </div>
                </div>
            </section>

            {/* 5. Dual CTA Banner */}
            <section className="home-cta-section opacity-0 py-16 bg-offwhite border-t border-charcoal/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* EMI CTA */}
                    <div className="bg-charcoal p-10 flex flex-col justify-between gap-6">
                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-3">Finance Smart</p>
                            <h3 className="font-serif text-3xl text-white mb-3">Calculate Your EMI</h3>
                            <p className="text-white/50 text-sm leading-relaxed">Estimate your monthly outflow with our instant EMI calculator — enter loan amount, rate, and tenure.</p>
                        </div>
                        <Link
                            to="/emi-calculator"
                            className="self-start bg-gold text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-all duration-300"
                        >
                            Open Calculator
                        </Link>
                    </div>
                    {/* Brochure CTA */}
                    <div className="bg-gold p-10 flex flex-col justify-between gap-6">
                        <div>
                            <p className="text-charcoal/60 uppercase tracking-[0.4em] text-xs font-bold mb-3">Free Download</p>
                            <h3 className="font-serif text-3xl text-charcoal mb-3">Get Project Brochure</h3>
                            <p className="text-charcoal/70 text-sm leading-relaxed">Download detailed floor plans, pricing, and project specifications — straight to your inbox.</p>
                        </div>
                        <Link
                            to="/brochure"
                            className="self-start bg-charcoal text-white px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-charcoal transition-all duration-300"
                        >
                            Download Brochure
                        </Link>
                    </div>
                </div>
            </section>

            {/* 6. About */}
            <About />

            {/* 7. Why Choose */}
            <WhyChoose />

            {/* 8. Testimonials */}
            <Testimonials />

            {/* 9. Final CTA */}
            <CTA />
        </div>
    );
}
