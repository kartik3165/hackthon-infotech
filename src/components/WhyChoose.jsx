import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function WhyChoose() {
    const container = useRef(null);

    useGSAP(() => {
        gsap.from('.reveal-left', {
            scrollTrigger: {
                trigger: '.reveal-left',
                start: "top 80%"
            },
            x: -100,
            opacity: 0,
            duration: 1.5,
            ease: "power3.out"
        });

        const reveals = gsap.utils.toArray('.reveal-item');
        reveals.forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 60,
                opacity: 0,
                duration: 1.2,
                ease: "power4.out"
            });
        });
    }, { scope: container });

    return (
        <section ref={container} className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row gap-16">
                <div className="w-full md:w-1/3 reveal-left">
                    <h3 className="font-serif text-5xl text-charcoal mb-6">The Skyline Advantage</h3>
                    <p className="text-charcoal/60 mb-8">What differentiates us is our obsession with the intersection of aesthetics and functionality.</p>
                    <div className="w-24 h-1 bg-gold"></div>
                </div>
                <div className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="reveal-item">
                        <h6 className="font-serif text-2xl mb-4">Prime Locations</h6>
                        <p className="text-sm text-charcoal/60 leading-relaxed">We secure the most coveted addresses in the city, ensuring your investment grows as fast as the skyline itself.</p>
                    </div>
                    <div className="reveal-item">
                        <h6 className="font-serif text-2xl mb-4">Timely Delivery</h6>
                        <p className="text-sm text-charcoal/60 leading-relaxed">A reputation built on reliability. We have a 100% track record of delivering projects on or before schedule.</p>
                    </div>
                    <div className="reveal-item">
                        <h6 className="font-serif text-2xl mb-4">Sustainable Innovation</h6>
                        <p className="text-sm text-charcoal/60 leading-relaxed">LEED certified designs that minimize environmental impact while maximizing resident comfort.</p>
                    </div>
                    <div className="reveal-item">
                        <h6 className="font-serif text-2xl mb-4">Asset Management</h6>
                        <p className="text-sm text-charcoal/60 leading-relaxed">Post-purchase care including dedicated property management services to keep your asset pristine.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
