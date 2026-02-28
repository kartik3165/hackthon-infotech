import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonialsData = [
    {
        quote: "Skyline didn't just sell me an apartment; they sold me a lifestyle I never thought was possible in this city.",
        name: "Jonathan Vance",
        role: "Sovereign Heights Resident"
    },
    {
        quote: "The attention to detail in the lobby alone is breathtaking. It's rare to find developers who care this much.",
        name: "Elena Rodriguez",
        role: "Azure Waterfront Resident"
    },
    {
        quote: "Skyline Plaza One has completely transformed our corporate identity. The architecture is a statement piece.",
        name: "David Markham",
        role: "CEO, Markham Global"
    }
];

export default function Testimonials() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const reveals = gsap.utils.toArray('.reveal-item');

            ScrollTrigger.batch(reveals, {
                start: "top 85%",
                onEnter: batch => gsap.fromTo(batch,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1.2, stagger: 0.15, ease: "power3.out" }
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
        <section ref={container} className="py-24 bg-charcoal relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Client Feedback</h2>
                    <h3 className="font-serif text-4xl text-white">Words from our Residents</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonialsData.map((item, index) => (
                        <div key={index} className="bg-white/5 border border-white/10 p-12 hover:bg-white/10 transition-all reveal-item opacity-0">
                            <div className="flex text-gold mb-6 space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-4 h-4 fill-current" />
                                ))}
                            </div>
                            <p className="font-serif text-xl italic text-white/90 mb-8 leading-relaxed">"{item.quote}"</p>
                            <div>
                                <span className="block text-gold uppercase tracking-widest text-xs font-bold">{item.name}</span>
                                <span className="block text-white/40 text-[10px] mt-1">{item.role}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
