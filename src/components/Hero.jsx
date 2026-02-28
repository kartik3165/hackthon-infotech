import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroGif from '../Aerial_city_image_animated_delpmaspu_-ezgif.com-video-to-gif-converter.gif';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
    const containerRef = useRef(null);

    // Use the provided animated GIF
    const heroBg = heroGif;

    useGSAP(() => {
        // Simple fade in for the text on load
        gsap.to('.hero-text-content', {
            opacity: 1,
            filter: 'blur(0px)',
            duration: 1.5,
            delay: 0.2,
            ease: "power2.out"
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative h-screen w-full bg-black overflow-hidden flex items-center justify-center">
            {/* Static Background Image */}
            <div className="absolute inset-0 z-0">
                {heroBg && (
                    <img
                        src={heroBg}
                        alt="Skyline Luxury Real Estate"
                        className="w-full h-full object-cover"
                    />
                )}
                {/* Gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-transparent to-black/60 z-10"></div>
            </div>

            {/* Text Content */}
            <div className="hero-text-content relative z-20 text-center px-4 max-w-5xl opacity-0 blur-[10px]" style={{ filter: 'blur(10px)' }}>
                <p className="text-gold uppercase tracking-[0.4em] mb-4 text-xs sm:text-sm font-bold">
                    The Pinnacle of Urban Living
                </p>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-white mb-8 leading-tight drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)]">
                    Redefining the <br /><span className="italic text-gold">Skyline</span> of Luxury
                </h1>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
                    <span className="text-white/50 text-[10px] tracking-[0.3em] uppercase">Scroll to explore</span>
                    <div className="w-[1px] h-12 bg-gold overflow-hidden">
                        <div className="w-full h-full bg-white/50 animate-bounce"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}
