import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Hero() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            const heroTl = gsap.timeline();

            heroTl.to('#hero-bg', { scale: 1.05, duration: 2, ease: "none" })
                .to('#hero-sub', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=1.5")
                .to('#hero-title', { opacity: 1, y: 0, duration: 1, ease: "power2.out" }, "-=0.7")
                .fromTo('#hero-cta', { scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power2.out" }, "-=0.5");
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set(['#hero-sub', '#hero-title', '#hero-cta'], { opacity: 1, y: 0 });
            gsap.set('#hero-cta', { scale: 1 });
            gsap.set('#hero-bg', { scale: 1 });
        });

        return () => mm.revert(); // Cleanup

    }, { scope: container });

    return (
        <section ref={container} className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-charcoal">
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Flagship Project"
                    className="w-full h-full object-cover opacity-60 scale-110"
                    id="hero-bg"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/60 via-transparent to-charcoal/80"></div>
            </div>

            <div className="relative z-10 text-center px-4 max-w-5xl">
                <p
                    className="text-gold uppercase tracking-[0.4em] mb-4 text-sm font-bold opacity-0 translate-y-4"
                    id="hero-sub"
                >
                    The Pinnacle of Urban Living
                </p>
                <h1
                    className="font-serif text-5xl md:text-8xl text-white mb-8 leading-tight opacity-0 translate-y-8"
                    id="hero-title"
                >
                    Redefining the <br /><span className="italic text-gold">Skyline</span> of Luxury
                </h1>
                <div
                    className="flex flex-col md:flex-row items-center justify-center gap-6 opacity-0 translate-y-4"
                    id="hero-cta"
                >
                    <a href="#projects" className="group flex items-center space-x-4 text-white uppercase tracking-widest text-xs font-bold">
                        <span>Explore Projects</span>
                        <span className="w-12 h-[1px] bg-gold group-hover:w-20 transition-all duration-300"></span>
                    </a>
                </div>
            </div>

            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50 text-[10px] tracking-[0.3em] uppercase">
                <span>Scroll</span>
                <div className="w-[1px] h-12 bg-gold/50 mt-4 overflow-hidden">
                    <div className="w-full h-full bg-gold animate-bounce"></div>
                </div>
            </div>
        </section>
    );
}
