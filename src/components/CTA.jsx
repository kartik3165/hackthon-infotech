import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 80%",
                    once: true
                }
            });

            tl.fromTo(container.current, { backgroundColor: "rgba(201, 162, 39, 0)" }, { backgroundColor: "#C9A227", duration: 1, ease: "power2.out" })
                .fromTo('.reveal-text', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power2.out" }, "-=0.5")
                .fromTo('.reveal-btn', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, "-=0.2");
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(container.current, { backgroundColor: "#C9A227" });
            gsap.set('.reveal-text, .reveal-btn', { opacity: 1, y: 0, scale: 1 });
        });

        return () => mm.revert();

    }, { scope: container });

    return (
        <section ref={container} className="py-32 bg-gold text-charcoal text-center relative overflow-hidden">
            <div className="max-w-4xl mx-auto px-6 relative z-10 reveal-item">
                <h2 className="font-serif text-5xl md:text-7xl mb-8 reveal-text opacity-0">Ready to Elevate Your Life?</h2>
                <p className="text-xl mb-12 max-w-2xl mx-auto reveal-text opacity-0">Private tours of our flagship properties are available by appointment only. Secure your place in the skyline today.</p>
                <button className="bg-charcoal text-white px-12 py-5 text-sm uppercase tracking-[0.3em] font-bold hover:bg-white hover:text-charcoal transition-all duration-300 reveal-btn opacity-0">
                    Schedule Site Visit
                </button>
            </div>
        </section>
    );
}
