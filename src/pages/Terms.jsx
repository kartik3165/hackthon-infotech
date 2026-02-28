import PageHero from '../components/PageHero';

const sections = [
    {
        title: '1. Definitions',
        content: [
            '"Company" refers to Skyline Infra Developers Pvt. Ltd., registered under the Companies Act, 2013.',
            '"Website" refers to the official Skyline Infra Developers website and all associated sub-domains.',
            '"User" refers to any individual accessing or using the Website for any purpose.',
            '"Content" refers to all text, images, data, information, and materials available on the Website.',
        ],
    },
    {
        title: '2. Acceptance of Terms',
        content: [
            'By accessing or using this Website, you confirm that you have read, understood, and agreed to be bound by these Terms and Conditions.',
            'If you do not agree to these terms, please discontinue the use of this Website immediately.',
            'Skyline Infra Developers reserves the right to modify these terms at any time without prior notice.',
        ],
    },
    {
        title: '3. Use of Website',
        content: [
            'This Website is intended solely for informational and marketing purposes regarding our real estate projects and services.',
            'You may not use this Website for any unlawful purpose or in any manner that disrupts the Website\'s operation.',
            'Unauthorized reproduction, distribution, or modification of any content on this Website is strictly prohibited.',
            'The information on this Website is subject to change without notice and does not constitute a binding offer or contract.',
        ],
    },
    {
        title: '4. Disclaimer of Warranties',
        content: [
            'All project-related information, including images, floor plans, and specifications, are representative and subject to change at the developer\'s discretion.',
            'Skyline Infra Developers makes no warranties regarding the accuracy, completeness, or reliability of the information on this Website.',
            'Computer-generated images (CGIs), renders, and virtual tours are for illustrative purposes only and may not represent the final delivered product.',
        ],
    },
    {
        title: '5. Limitation of Liability',
        content: [
            'To the fullest extent permitted by law, Skyline Infra Developers shall not be liable for any direct, indirect, incidental, or consequential damages arising from the use of this Website.',
            'We are not responsible for any investment decisions made solely on the basis of information available on this Website.',
        ],
    },
    {
        title: '6. Intellectual Property',
        content: [
            'All content on this Website — including the Skyline logo, brand identity, project names, and visual assets — is the exclusive intellectual property of Skyline Infra Developers Pvt. Ltd.',
            'No content may be used, reproduced, or distributed without prior written consent from the Company.',
        ],
    },
    {
        title: '7. Governing Law',
        content: [
            'These Terms and Conditions shall be governed by and construed in accordance with the laws of India.',
            'Any disputes arising from the use of this Website shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.',
        ],
    },
    {
        title: '8. Contact for Legal Queries',
        content: [
            'For any questions or concerns regarding these Terms and Conditions, please contact our Legal Department:',
            'legal@skylineinfra.in | Skyline House, BKC, Mumbai – 400098',
        ],
    },
];

export default function Terms() {
    return (
        <div>
            <PageHero
                label="Legal"
                title="Terms & Conditions"
                subtitle={`Last updated: February 2025`}
                bg="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="py-24 bg-white">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    <div className="mb-10 p-6 bg-gold/5 border-l-4 border-gold">
                        <p className="text-sm text-charcoal/70 leading-relaxed">
                            Please read these Terms and Conditions carefully before using the Skyline Infra Developers website. By accessing this site, you agree to be bound by all the terms stated herein. These terms apply to all visitors, potential buyers, investors, and other users of the site.
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
