import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHero from '../components/PageHero';

gsap.registerPlugin(ScrollTrigger);

const galleryImages = [
    {
        src: "https://source.unsplash.com/1200x800/?modern-building,city",
        label: "Skyline Heights — Exterior",
        category: "Exterior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?luxury-living-room,interior",
        label: "Skyline Greens — Living Room",
        category: "Interior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?office-building,architecture",
        label: "Business Hub — Facade",
        category: "Exterior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?swimming-pool,rooftop",
        label: "Skyline Heights — Pool Deck",
        category: "Amenities",
    },
    {
        src: "https://source.unsplash.com/1200x800/?skyscraper,tower",
        label: "Metro Plaza — Tower View",
        category: "Exterior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?office-lobby,interior",
        label: "Business Hub — Lobby",
        category: "Interior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?garden,landscape,real-estate",
        label: "Skyline Villas — Garden",
        category: "Amenities",
    },
    {
        src: "https://source.unsplash.com/1200x800/?penthouse,interior",
        label: "Skyline One — Penthouse",
        category: "Interior",
    },
    {
        src: "https://source.unsplash.com/1200x800/?conference-room,office",
        label: "Skyline Icon — Boardroom",
        category: "Interior",
    },
];

const filters = ['All', 'Exterior', 'Interior', 'Amenities'];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [lightboxImg, setLightboxImg] = useState(null);
    const [sliderIndex, setSliderIndex] = useState(0);
    const container = useRef(null);

    const filtered = activeFilter === 'All' ? galleryImages : galleryImages.filter(g => g.category === activeFilter);

    useGSAP(() => {
        gsap.utils.toArray('.reveal-up').forEach(el => {
            gsap.from(el, {
                scrollTrigger: { trigger: el, start: 'top 85%' },
                y: 50, opacity: 0, duration: 1, ease: 'power3.out',
            });
        });
    }, { scope: container });

    const prev = () => setSliderIndex(i => (i - 1 + galleryImages.length) % galleryImages.length);
    const next = () => setSliderIndex(i => (i + 1) % galleryImages.length);

    return (
        <div ref={container}>
            <PageHero
                label="Gallery"
                title="Every Frame, a Statement"
                subtitle="A curated visual journey through Skyline's world of architecture, interiors, and lifestyle."
                bg={galleryImages[0].src}
            />

            {/* Featured Slider */}
            <section className="py-16 bg-charcoal">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-8 text-center">Featured Highlights</p>
                    <div className="relative overflow-hidden">
                        <div
                            className="flex transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)]"
                            style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                        >
                            {galleryImages.map((img, i) => (
                                <div key={i} className="min-w-full">
                                    <div className="relative h-[60vh]">
                                        <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent" />
                                        <div className="absolute bottom-8 left-8">
                                            <span className="text-gold text-xs uppercase tracking-widest">{img.category}</span>
                                            <p className="font-serif text-2xl text-white mt-1">{img.label}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={prev} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal/70 hover:bg-gold text-white flex items-center justify-center transition-colors">
                            ←
                        </button>
                        <button onClick={next} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-charcoal/70 hover:bg-gold text-white flex items-center justify-center transition-colors">
                            →
                        </button>
                        <div className="flex justify-center gap-2 mt-6">
                            {galleryImages.map((_, i) => (
                                <button key={i} onClick={() => setSliderIndex(i)} className={`w-2 h-2 rounded-full transition-colors ${i === sliderIndex ? 'bg-gold' : 'bg-white/30'}`} />
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Filterable Masonry Grid */}
            <section className="py-16 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 sm:px-12">
                    <div className="flex flex-wrap gap-3 mb-10 justify-center">
                        {filters.map(f => (
                            <button
                                key={f}
                                onClick={() => setActiveFilter(f)}
                                className={`px-6 py-2 text-xs uppercase tracking-widest font-bold transition-all ${activeFilter === f ? 'bg-gold text-white' : 'border border-charcoal/20 text-charcoal hover:border-gold hover:text-gold'}`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
                        {filtered.map((img, i) => (
                            <div
                                key={i}
                                className="break-inside-avoid overflow-hidden cursor-pointer reveal-up group"
                                onClick={() => setLightboxImg(img)}
                            >
                                <div className="relative overflow-hidden">
                                    <img src={img.src} alt={img.label} className="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                                    <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300 flex items-center justify-center">
                                        <span className="text-white opacity-0 group-hover:opacity-100 text-xs uppercase tracking-widest transition-opacity">View</span>
                                    </div>
                                </div>
                                <p className="text-xs text-charcoal/50 uppercase tracking-widest py-2">{img.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Lightbox */}
            {lightboxImg && (
                <div className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
                    <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                        <img src={lightboxImg.src} alt={lightboxImg.label} className="w-full object-contain max-h-[80vh]" />
                        <div className="flex justify-between items-center mt-4">
                            <p className="text-white/70 text-sm">{lightboxImg.label}</p>
                            <button className="text-gold text-xs uppercase tracking-widest" onClick={() => setLightboxImg(null)}>Close ✕</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
