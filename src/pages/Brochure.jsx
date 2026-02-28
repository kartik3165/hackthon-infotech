import { useState } from 'react';
import PageHero from '../components/PageHero';
import DownloadBrochureButton from '../components/DownloadBrochureButton';
import { projects } from '../data/projects';

// Enrich with display-friendly subtitle
const brochures = projects.map(p => ({
    ...p,
    subtitle: `${p.category} ${p.status === 'New Launch' ? '· New Launch' : '· Development'} Brochure`,
    pages: 6,
}));

export default function Brochure() {
    return (
        <div>
            <PageHero
                label="Downloads"
                title="Project Brochures"
                subtitle="Download our premium project brochures for detailed plans, specifications, amenities, and pricing — generated live."
                bg="https://images.unsplash.com/photo-1554224154-26032ffc0d07?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="py-24 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    {/* How it works */}
                    <div className="mb-14 max-w-2xl">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-3">How It Works</p>
                        <h2 className="font-serif text-3xl text-charcoal mb-4">Personalised PDF, Generated Instantly</h2>
                        <div className="flex flex-wrap gap-6 mt-6">
                            {[
                                { step: '01', text: 'Choose a project brochure below' },
                                { step: '02', text: 'Enter your name, phone & email' },
                                { step: '03', text: 'PDF generates client-side with live data' },
                                { step: '04', text: 'Download starts automatically' },
                            ].map(s => (
                                <div key={s.step} className="flex items-start gap-3">
                                    <span className="font-serif text-gold text-lg font-bold shrink-0">{s.step}</span>
                                    <span className="text-charcoal/60 text-sm">{s.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        {brochures.map((project) => (
                            <div key={project.slug} className="group bg-white overflow-hidden flex flex-col sm:flex-row hover:shadow-lg transition-shadow duration-500">
                                <div className="w-full h-48 sm:w-44 sm:h-auto shrink-0 overflow-hidden">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                </div>
                                <div className="p-6 flex flex-col justify-between flex-1">
                                    <div>
                                        <span className="text-[10px] text-gold uppercase tracking-widest font-bold">{project.subtitle}</span>
                                        <h3 className="font-serif text-2xl text-charcoal mt-1 mb-2">{project.title}</h3>
                                        <p className="text-charcoal/50 text-xs mb-3">{project.location}</p>
                                        <div className="flex gap-5 text-[10px] text-charcoal/40 uppercase tracking-widest mb-1">
                                            <span>{project.pages} Pages</span>
                                            <span>{project.configs?.length} Configurations</span>
                                            <span>{project.amenities?.length} Amenities</span>
                                        </div>
                                    </div>
                                    <div className="mt-4">
                                        <DownloadBrochureButton
                                            project={project}
                                            variant="gold"
                                            label="Download Brochure"
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Legal note */}
                    <p className="mt-12 text-[10px] text-charcoal/30 leading-relaxed max-w-3xl mx-auto text-center">
                        All brochures are generated in real-time using live project data and are compliant with MahaRERA regulations.
                        Content is indicative and subject to change without notice.
                    </p>
                </div>
            </section>
        </div>
    );
}
