import PageHero from '../components/PageHero';
import InquiryForm from '../components/InquiryForm';

const offices = [
    { city: 'Mumbai HQ', address: 'Skyline House, Plot C-66, G-Block, Bandra Kurla Complex, Mumbai – 400098', phone: '+91 22 6123 4567', email: 'hq@skylineinfra.in' },
    { city: 'Thane Office', address: '401, Skyline Business Center, Eastern Express Highway, Thane West – 400601', phone: '+91 22 6123 4568', email: 'thane@skylineinfra.in' },
];

export default function Contact() {
    return (
        <div>
            <PageHero
                label="Get in Touch"
                title="We'd Love to Hear from You"
                subtitle="Whether you're buying, investing, or simply exploring — our team is ready to help."
                bg="https://images.unsplash.com/photo-1497366754035-f200586c4e79?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-24">
                    {/* Form */}
                    <div className="lg:col-span-3">
                        <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Send Us a Message</p>
                        <h2 className="font-serif text-4xl sm:text-5xl text-charcoal mb-8">Inquiry Form</h2>
                        <InquiryForm />
                    </div>

                    {/* Contact Details */}
                    <div className="lg:col-span-2 space-y-10 border-t lg:border-t-0 lg:border-l border-charcoal/10 pt-10 lg:pt-0 lg:pl-10">
                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-6">Toll-Free Helpline</p>
                            <a href="tel:18001234567" className="font-serif text-4xl text-charcoal hover:text-gold transition-colors">
                                1800-SKYLINE
                            </a>
                            <p className="text-charcoal/40 text-sm mt-1">Mon – Sat, 9 AM to 7 PM</p>
                        </div>

                        {offices.map(o => (
                            <div key={o.city} className="border-l-2 border-gold pl-6">
                                <h4 className="font-serif text-xl text-charcoal mb-2">{o.city}</h4>
                                <p className="text-charcoal/60 text-sm leading-relaxed mb-3">{o.address}</p>
                                <a href={`tel:${o.phone}`} className="block text-sm text-gold hover:underline">{o.phone}</a>
                                <a href={`mailto:${o.email}`} className="block text-sm text-charcoal/50 hover:text-gold">{o.email}</a>
                            </div>
                        ))}

                        <div>
                            <p className="text-gold uppercase tracking-[0.4em] text-xs font-bold mb-4">Follow Us</p>
                            <div className="flex flex-wrap gap-4">
                                {['Instagram', 'LinkedIn', 'Facebook', 'YouTube'].map(s => (
                                    <a key={s} href="#" className="text-xs text-charcoal/50 hover:text-gold uppercase tracking-widest transition-colors border-b border-transparent hover:border-gold">
                                        {s}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map placeholder */}
            <div className="h-72 bg-charcoal/5 flex items-center justify-center">
                <div className="text-center text-charcoal/30">
                    <svg className="w-10 h-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-xs uppercase tracking-widest">Bandra Kurla Complex, Mumbai</p>
                </div>
            </div>
        </div>
    );
}
