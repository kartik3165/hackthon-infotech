import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';
import { completedProjects } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export default function CompletedProjects() {
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
                label="Completed Projects"
                title="A Legacy of Delivery"
                subtitle="Every completed project is a testament to our commitment — delivered on time, within promise."
                bg="https://images.unsplash.com/photo-1460574283810-2aab119d8511?auto=format&fit=crop&q=80&w=2000"
            />

            {/* Stats Bar */}
            <section className="py-10 bg-gold">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-3 gap-6 text-center">
                    {[
                        { num: '150+', label: 'Completed Projects' },
                        { num: '100%', label: 'On-Time Delivery' },
                        { num: '18,000+', label: 'Families Housed' },
                    ].map(s => (
                        <div key={s.label}>
                            <span className="font-serif text-3xl text-charcoal block">{s.num}</span>
                            <span className="text-charcoal/60 text-xs uppercase tracking-widest">{s.label}</span>
                        </div>
                    ))}
                </div>
            </section>

            {/* Grid */}
            <section className="py-20 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {completedProjects.map(project => (
                            <div key={project.slug} className="group bg-white overflow-hidden reveal-up">
                                <div className="overflow-hidden h-56">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[10px] uppercase tracking-widest text-charcoal/40">{project.category} · {project.year}</span>
                                        <span className="text-[10px] uppercase tracking-widest text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5">Delivered</span>
                                    </div>
                                    <h3 className="font-serif text-xl text-charcoal mb-1">{project.title}</h3>
                                    <p className="text-charcoal/50 text-sm mb-3">{project.location}</p>
                                    {project.amenities && project.amenities.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.amenities.slice(0, 4).map(a => (
                                                <span key={a} className="text-[9px] uppercase tracking-wider border border-charcoal/10 px-2 py-0.5 text-charcoal/40 bg-offwhite">
                                                    {a}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-charcoal text-center">
                <div className="max-w-2xl mx-auto px-6">
                    <h3 className="font-serif text-4xl text-white mb-6">See Our Ongoing Projects</h3>
                    <p className="text-white/60 mb-8">Explore what's currently under development — and secure your unit before it's gone.</p>
                    <a href="/ongoing-projects" className="inline-block bg-gold hover:bg-white hover:text-charcoal text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300">
                        View Ongoing Projects
                    </a>
                </div>
            </section>
        </div>
    );
}
