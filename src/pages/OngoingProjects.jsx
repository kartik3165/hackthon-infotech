import { useRef, useState, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { projects } from '../data/projects';
import * as LucideIcons from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IconRenderer = ({ name }) => {
    const Icon = LucideIcons[name] || LucideIcons.Check;
    return <Icon size={24} className="text-gold mb-3" strokeWidth={1.5} />;
};

export default function OngoingProjects() {
    const container = useRef(null);
    const [activeFilter, setActiveFilter] = useState('All');

    // Derived state for the cards to display
    const filteredProjects = projects.filter(
        p => activeFilter === 'All' || p.category === activeFilter
    );

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // 1️⃣ Hero Section Animations
            const heroTl = gsap.timeline({ defaults: { ease: "power2.out" } });

            heroTl.fromTo('.hero-bg',
                { scale: 1 },
                { scale: 1.05, duration: 2, ease: "none" }
            )
                .fromTo('.hero-label',
                    { opacity: 0 },
                    { opacity: 1, duration: 0.8 },
                    "-=1.5"
                )
                .fromTo('.hero-title',
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1 },
                    "-=0.6"
                )
                .fromTo('.hero-subtitle',
                    { opacity: 0 },
                    { opacity: 1, duration: 1 },
                    "-=0.4"
                );

            // 2️⃣ Filter Tabs initial animation
            gsap.fromTo('.filter-btn',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.5 }
            );

            // 3️⃣ Project Sections scroll stagger
            gsap.utils.toArray('.reveal-project').forEach(section => {
                gsap.fromTo(section,
                    { opacity: 0, y: 30 },
                    {
                        opacity: 1, y: 0,
                        duration: 1, ease: "power3.out",
                        scrollTrigger: {
                            trigger: section,
                            start: "top 85%",
                        }
                    }
                );
            });

            // 4️⃣ Final CTA Section Animation
            const ctaTl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.cta-section',
                    start: "top 80%",
                    once: true
                }
            });

            ctaTl.fromTo('.cta-bg',
                { backgroundColor: "rgba(46, 46, 46, 0)" },
                { backgroundColor: "#2E2E2E", duration: 1, ease: "power2.out" }
            )
                .fromTo('.cta-text',
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" },
                    "-=0.5"
                )
                .fromTo('.cta-btn',
                    { opacity: 0, scale: 0.95 },
                    { opacity: 1, scale: 1, duration: 0.6, ease: "power3.out" },
                    "-=0.3"
                );
        });

        // Accessibility fallback
        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set('.hero-bg', { scale: 1 });
            gsap.set('.hero-label, .hero-title, .hero-subtitle, .filter-btn', { opacity: 1, y: 0 });
            gsap.set('.reveal-project', { opacity: 1, y: 0 });
            gsap.set('.cta-bg', { backgroundColor: "#2E2E2E" });
            gsap.set('.cta-text, .cta-btn', { opacity: 1, y: 0, scale: 1 });
        });

        return () => mm.revert();
    }, { scope: container });

    // Handle smooth category filtering
    const handleFilterChange = (newFilter) => {
        if (newFilter === activeFilter) return;

        const context = gsap.context(() => {
            gsap.to('.reveal-project', {
                opacity: 0,
                y: -10,
                duration: 0.3,
                ease: "power2.inOut",
                onComplete: () => {
                    setActiveFilter(newFilter);
                    requestAnimationFrame(() => {
                        gsap.fromTo('.reveal-project',
                            { opacity: 0, y: 15 },
                            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                        );
                    });
                }
            });
        }, container);

        return () => context.revert();
    };

    return (
        <div ref={container}>
            <PageHero
                label="Ongoing Projects"
                title="Current Developments"
                subtitle="Discover our portfolio of active projects, each crafted to the highest standard of luxury and design."
                bg="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Filters */}
            <section className="py-8 bg-white border-b border-charcoal/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-wrap gap-4 items-center">
                    <span className="text-xs uppercase tracking-widest text-charcoal/40">Filter by:</span>
                    {['All', 'Residential', 'Commercial', 'Mixed Use'].map(f => (
                        <button
                            key={f}
                            onClick={() => handleFilterChange(f)}
                            className={`filter-btn opacity-0 px-5 py-2 text-xs uppercase tracking-widest font-bold border transition-all ${activeFilter === f
                                ? 'bg-gold text-white border-gold'
                                : 'border-charcoal/10 text-charcoal hover:bg-gold hover:text-white hover:border-gold'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </section>

            {/* Detailed Projects List */}
            <section className="py-20 bg-offwhite min-h-[600px]">
                <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24">
                    {filteredProjects.map((project, index) => (
                        <div key={project.slug} className={`reveal-project opacity-0 bg-white border border-charcoal/10 overflow-hidden flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>

                            {/* Project Images Segment */}
                            <div className="w-full lg:w-1/2 h-[400px] lg:h-auto overflow-hidden relative">
                                <img src={project.heroImage} alt={project.title} className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" />
                                <div className="absolute top-6 left-6 flex gap-2">
                                    <span className="bg-charcoal text-white text-[10px] uppercase tracking-widest font-bold px-3 py-1">
                                        {project.status}
                                    </span>
                                </div>
                            </div>

                            {/* Project Information Segment */}
                            <div className="w-full lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                <div className="mb-6">
                                    <p className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-2">{project.category}</p>
                                    <h2 className="font-serif text-3xl md:text-4xl text-charcoal mb-2">{project.title}</h2>
                                    <div className="flex items-center gap-2 text-charcoal/60 text-sm">
                                        <LucideIcons.MapPin size={14} className="text-gold" />
                                        <span>{project.location}</span>
                                    </div>
                                </div>

                                <p className="text-charcoal/70 leading-relaxed mb-8">
                                    {project.description}
                                </p>

                                {/* Amenities Mini-Grid */}
                                {project.amenities && (
                                    <div className="mb-8">
                                        <h4 className="text-[10px] uppercase tracking-widest font-bold text-charcoal/50 border-b border-charcoal/10 pb-2 mb-4">Key Amenities</h4>
                                        <div className="grid grid-cols-3 sm:grid-cols-3 gap-6">
                                            {project.amenities.map((amenity, i) => (
                                                <div key={i} className="flex flex-col items-center sm:items-start group">
                                                    <div className="w-12 h-12 rounded-full border border-charcoal/10 flex items-center justify-center bg-offwhite mb-3 group-hover:border-gold group-hover:bg-gold/5 transition-colors">
                                                        <IconRenderer name={amenity.icon} />
                                                    </div>
                                                    <span className="text-xs text-charcoal/80 text-center sm:text-left font-medium leading-tight">
                                                        {amenity.label}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Spec Bar */}
                                <div className="flex flex-wrap items-center gap-8 py-4 border-y border-charcoal/10 mb-8">
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-1">Configuration</p>
                                        <p className="font-bold text-sm">{project.configs.join(', ')}</p>
                                    </div>
                                    <div>
                                        <p className="text-[10px] uppercase tracking-widest text-charcoal/40 mb-1">Starting Price</p>
                                        <p className="font-bold text-lg text-gold">{project.price}</p>
                                    </div>
                                </div>

                                {/* Call to Actions */}
                                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                                    <Link to={`/projects/${project.slug}`} className="text-center bg-charcoal text-white px-6 py-4 text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors block w-full">
                                        View Details
                                    </Link>
                                    <Link to="/brochure" className="text-center border border-charcoal text-charcoal px-6 py-4 text-xs uppercase tracking-widest font-bold hover:bg-charcoal/5 transition-colors block w-full">
                                        Download Brochure
                                    </Link>
                                    <Link to="/contact" className="text-center bg-gold text-white px-6 py-4 text-xs uppercase tracking-widest font-bold hover:shadow-lg transition-all block w-full">
                                        Enquire Now
                                    </Link>
                                </div>
                            </div>

                        </div>
                    ))}

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-20 text-charcoal/50">
                            No projects found in this category.
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="cta-section cta-bg py-20 bg-transparent text-center relative">
                <div className="max-w-2xl mx-auto px-6 relative z-10">
                    <h3 className="cta-text font-serif text-4xl text-white mb-6 opacity-0">Not Found What You're Looking For?</h3>
                    <p className="cta-text text-white/60 mb-8 opacity-0">Our team can help you find the perfect property that fits your lifestyle and budget.</p>
                    <a href="/contact" className="cta-btn opacity-0 inline-block bg-gold hover:bg-white hover:text-charcoal text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300">
                        Talk to an Expert
                    </a>
                </div>
            </section>
        </div>
    );
}
