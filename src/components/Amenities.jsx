import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Waves, Dumbbell, ConciergeBell, Clapperboard, Flower2, ShieldCheck, Coffee, Leaf } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const amenitiesData = [
    { icon: Waves, title: "Infinity Pool", desc: "Rooftop Oasis" },
    { icon: Dumbbell, title: "Sky Gym", desc: "High-Tech Fitness" },
    { icon: ConciergeBell, title: "24/7 Valet", desc: "Seamless Service" },
    { icon: Clapperboard, title: "Private Cinema", desc: "Exclusive Screenings" },
    { icon: Flower2, title: "Zen Gardens", desc: "Botanical Escapes" },
    { icon: ShieldCheck, title: "Smart Security", desc: "Biometric Access" },
    { icon: Coffee, title: "Executive Lounge", desc: "Business Suite" },
    { icon: Leaf, title: "Luxury Spa", desc: "Holistic Wellness" }
];

export default function Amenities() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const reveals = gsap.utils.toArray('.reveal-item');

            ScrollTrigger.batch(reveals, {
                start: "top 85%",
                onEnter: batch => gsap.fromTo(batch,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: "power2.out" }
                ),
                once: true
            });
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set('.reveal-item', { opacity: 1, y: 0 });
        });

        return () => mm.revert();

    }, { scope: container });

    return (
        <section id="amenities" ref={container} className="py-24 bg-offwhite">
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                <div className="text-center mb-20 reveal-item">
                    <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">The Skyline Lifestyle</h2>
                    <h3 className="font-serif text-4xl md:text-6xl text-charcoal">Curated Amenities</h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gold/20">
                    {amenitiesData.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                            <div key={index} className="group bg-white p-10 flex flex-col items-center text-center hover:bg-gold hover:text-white transition-all duration-500 hover:-translate-y-1 hover:shadow-xl reveal-item opacity-0">
                                <Icon className="w-10 h-10 mb-6 stroke-1 transition-transform duration-500 group-hover:-translate-y-1" />
                                <h5 className="font-serif text-xl mb-2">{amenity.title}</h5>
                                <p className="text-[10px] uppercase tracking-widest opacity-60">{amenity.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
