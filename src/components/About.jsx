import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
    const container = useRef(null);

    useGSAP(() => {
        let mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
            // 1️⃣ Section Entry (ScrollTrigger at top 75%)
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container.current,
                    start: "top 75%",
                    once: true
                }
            });

            // 2️⃣ Text Content Animation
            // Section label: Fade in + move up (y: 15 -> 0)
            tl.fromTo('.about-label',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            )
                // Main heading: Fade in + move up (y: 25 -> 0)
                .fromTo('.about-heading',
                    { opacity: 0, y: 25 },
                    { opacity: 1, y: 0, duration: 1.0, ease: "power3.out" },
                    "-=0.5" // Slight delay after label
                )
                // Paragraph text: Fade in only, longer duration
                .fromTo('.about-text',
                    { opacity: 0 },
                    { opacity: 1, duration: 1.2, ease: "power2.out" },
                    "-=0.4"
                )
                // 3️⃣ Quote Highlight Box: Fade in + scale (0.97 -> 1) anchored at bottom
                .fromTo('.about-quote',
                    { opacity: 0, scale: 0.97 },
                    { opacity: 1, scale: 1, duration: 1.2, ease: "power3.out" },
                    "-=0.2" // Delay until main text finishes
                );

            // Subtle fade-in for image elements to accompany the section sequence gracefully
            gsap.fromTo('.about-image',
                { opacity: 0 },
                { opacity: 1, duration: 1.5, ease: "power2.out", scrollTrigger: { trigger: container.current, start: 'top 75%', once: true } }
            );

            // 4️⃣ Stats / Numbers: Stagger layout and counter sequence 
            ScrollTrigger.batch('.about-stat', {
                start: "top 85%",
                once: true,
                onEnter: batch => {
                    // Stagger entry (Fade in + move up)
                    gsap.fromTo(batch,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: "power2.out" }
                    );

                    // Number Count up animation
                    batch.forEach((stat, index) => {
                        const numEl = stat.querySelector('.stat-number');
                        if (numEl) {
                            const targetValue = parseInt(numEl.textContent.replace(/\D/g, ''));
                            const suffix = numEl.textContent.replace(/[0-9]/g, '');

                            gsap.fromTo(numEl,
                                { innerText: 0 },
                                {
                                    innerText: targetValue,
                                    duration: 1.2,
                                    ease: "power2.out",
                                    snap: { innerText: 1 },
                                    delay: index * 0.15, // matches stagger timeline
                                    onUpdate: function () {
                                        numEl.innerText = Math.round(this.targets()[0].innerText) + suffix;
                                    }
                                }
                            );
                        }
                    });
                }
            });
        });

        mm.add("(prefers-reduced-motion: reduce)", () => {
            gsap.set('.about-label, .about-heading, .about-text, .about-quote, .about-stat, .about-image', { opacity: 1, y: 0, scale: 1 });
        });

        return () => mm.revert();
    }, { scope: container });

    return (
        <section id="about" ref={container} className="py-24 bg-charcoal text-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
                <div className="relative">
                    <div className="about-image absolute -top-10 -left-10 w-40 h-40 border-l border-t border-gold opacity-30"></div>
                    <img
                        src="https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1000"
                        alt="Founder/Legacy"
                        className="about-image w-full h-[600px] object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                    />
                    <div className="about-quote absolute bottom-8 right-8 bg-gold p-8 max-w-xs transform origin-bottom-right">
                        <p className="font-serif text-3xl text-charcoal italic">"We don't build structures; we curate legacies."</p>
                    </div>
                </div>
                <div>
                    <h2 className="about-label text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">Our Heritage</h2>
                    <h3 className="about-heading font-serif text-4xl md:text-6xl mb-8 leading-tight">Crafting Excellence Since 1998</h3>
                    <div className="about-text space-y-6 text-white/70 leading-relaxed text-lg font-light">
                        <p>Skyline Infra Developers emerged from a vision to challenge the mundane. For over two decades, we have been at the forefront of architectural innovation, blending timeless design with future-ready technology.</p>
                        <p>Every Skyline project is a testament to our commitment to uncompromising quality. We believe that true luxury lies in the details—the whisper-quiet elevators, the hand-selected marble, and the perfectly oriented light.</p>
                    </div>
                    <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-12">
                        <div className="about-stat">
                            <span className="stat-number text-gold font-serif text-4xl block mb-2 origin-left">150+</span>
                            <span className="uppercase tracking-widest text-[10px] text-white/50">Projects Delivered</span>
                        </div>
                        <div className="about-stat">
                            <span className="stat-number text-gold font-serif text-4xl block mb-2 origin-left">25M+</span>
                            <span className="uppercase tracking-widest text-[10px] text-white/50">Sq. Ft. Developed</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
