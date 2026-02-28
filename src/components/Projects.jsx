import { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

// Show first 3 ongoing projects as featured
const featuredProjects = projects.slice(0, 3);

export default function Projects() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const reveals = gsap.utils.toArray('.reveal-item');

            ScrollTrigger.batch(reveals, {
                start: "top 85%",
                onEnter: batch => gsap.fromTo(batch,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power3.out" }
                ),
                once: true
            });

            const textReveals = gsap.utils.toArray('.reveal-text');
            textReveals.forEach(el => {
                gsap.fromTo(el,
                    { opacity: 0, y: 20 },
                    {
                        scrollTrigger: {
                            trigger: el,
                            start: "top 85%",
                            once: true
                        },
                        opacity: 1,
                        y: 0,
                        duration: 1,
                        ease: "power2.out"
                    }
                );
            });
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set('.reveal-item, .reveal-text', { opacity: 1, y: 0 });
        });

        return () => mm.revert();

    }, { scope: container });

    return (
        <section id="projects" ref={container} className="py-24 px-6 sm:px-12 bg-offwhite">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-16 gap-8">
                    <div className="max-w-2xl">
                        <h2 className="font-serif text-gold text-sm uppercase tracking-[0.3em] mb-4 reveal-text">Our Collection</h2>
                        <h3 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-charcoal leading-tight reveal-text">Iconic Residences &amp; Commercial Landmarks</h3>
                    </div>
                    <div className="hidden sm:block">
                        <Link
                            to="/ongoing-projects"
                            className="border-b-2 border-gold pb-2 text-xs uppercase tracking-widest font-bold hover:text-gold transition-colors"
                        >
                            View All Projects
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredProjects.map((project, index) => (
                        <Link
                            key={project.slug}
                            to={`/projects/${project.slug}`}
                            className={`group relative h-[450px] sm:h-[500px] overflow-hidden cursor-pointer reveal-item opacity-0 block ${index === 1 ? 'mt-0 lg:mt-12' : ''}`}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-[800ms] ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-charcoal/80 flex flex-col justify-end p-8 opacity-0 translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                                <span className="text-gold text-xs uppercase tracking-widest mb-2">{project.category} · {project.location}</span>
                                <h4 className="font-serif text-2xl text-white mb-4">{project.title}</h4>
                                <p className="text-white/70 text-sm mb-6 leading-relaxed line-clamp-2">{project.description}</p>
                                <span className="w-fit border border-gold text-gold px-6 py-2 text-[10px] uppercase tracking-widest group-hover:bg-gold group-hover:text-white transition-all">
                                    View Project
                                </span>
                            </div>
                            <div className="absolute bottom-6 left-6 text-white group-hover:opacity-0 transition-opacity">
                                <span className="text-gold text-[10px] uppercase tracking-widest block mb-1">{project.status}</span>
                                <h4 className="font-serif text-2xl">{project.title}</h4>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Mobile CTA */}
                <div className="mt-10 text-center sm:hidden">
                    <Link
                        to="/ongoing-projects"
                        className="inline-block border-b-2 border-gold pb-2 text-xs uppercase tracking-widest font-bold hover:text-gold transition-colors"
                    >
                        View All Projects
                    </Link>
                </div>
            </div>
        </section>
    );
}
