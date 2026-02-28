import PageHero from '../components/PageHero';

const sections = [
    {
        title: '1. Information We Collect',
        content: [
            'Personal identification information: Name, phone number, email address, and other contact details submitted through inquiry forms, brochure download requests, or site visit scheduling.',
            'Usage data: Information about how you access and use our website, including IP address, browser type, pages visited, and visit duration.',
            'Communication records: Any correspondence you have with us through the website, email, or phone.',
        ],
    },
    {
        title: '2. How We Use Your Information',
        content: [
            'To respond to your inquiries and provide the information or services you request.',
            'To send you project updates, new launch announcements, and relevant marketing communications (with your consent).',
            'To schedule site visits, send brochures, and connect you with our sales advisors.',
            'To improve our website experience, analyze traffic patterns, and optimize marketing campaigns.',
            'To comply with applicable legal obligations.',
        ],
    },
    {
        title: '3. Data Sharing and Disclosure',
        content: [
            'We do not sell, trade, or rent your personal information to third parties.',
            'We may share your information with trusted service providers (e.g., CRM platforms, marketing agencies) who assist in operating our website and conducting business, subject to strict confidentiality agreements.',
            'We may disclose information when required by law or in response to valid legal process.',
        ],
    },
    {
        title: '4. Data Security',
        content: [
            'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
            'However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.',
        ],
    },
    {
        title: '5. Cookies',
        content: [
            'Our website uses cookies to enhance your browsing experience and analyze site usage.',
            'You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some portions of our website may not function properly.',
        ],
    },
    {
        title: '6. Your Rights',
        content: [
            'You have the right to access the personal information we hold about you.',
            'You may request correction of inaccurate or incomplete information.',
            'You may opt out of marketing communications at any time by clicking the "unsubscribe" link in any email or by contacting us directly.',
            'You may request deletion of your data, subject to our legal retention obligations.',
        ],
    },
    {
        title: '7. Third-Party Links',
        content: [
            'Our website may contain links to third-party websites. We are not responsible for the privacy practices of these websites and encourage you to review their policies independently.',
        ],
    },
    {
        title: '8. Policy Updates',
        content: [
            'We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with an updated revision date.',
            'Continued use of our website after any changes constitutes your acceptance of the revised policy.',
        ],
    },
    {
        title: '9. Contact Us',
        content: [
            'For privacy-related queries or to exercise your rights, please contact our Data Privacy Officer:',
            'privacy@skylineinfra.in | Skyline House, BKC, Mumbai – 400098 | +91 22 6123 4569',
        ],
    },
];

export default function Privacy() {
    return (
        <div>
            <PageHero
                label="Legal"
                title="Privacy Policy"
                subtitle="Last updated: February 2025"
                bg="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="mb-10 p-6 bg-gold/5 border-l-4 border-gold">
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                            Skyline Infra Developers Pvt. Ltd. ("we", "our", or "us") is committed to protecting your personal information and your right to privacy. This Privacy Policy explains what information we collect, how we use it, and what rights you have in relation to it.
                        </p>
                    </div>
                    <div className="space-y-10">
                        {sections.map(s => (
                            <div key={s.title}>
                                <h3 className="font-serif text-2xl text-charcoal mb-4">{s.title}</h3>
                                <ul className="space-y-3">
                                    {s.content.map((c, i) => (
                                        <li key={i} className="flex gap-3 text-charcoal/70 text-sm leading-relaxed">
                                            <span className="text-gold mt-1 shrink-0">›</span>
                                            <span>{c}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
