import { useState } from 'react';

export default function InquiryForm({ projectOptions = [], compact = false }) {
    const [form, setForm] = useState({
        name: '', phone: '', email: '', project: '', budget: '', message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = e => {
        e.preventDefault();
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="text-center py-12">
                <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h4 className="font-serif text-2xl text-charcoal mb-2">Thank You!</h4>
                <p className="text-charcoal/60">Our team will get in touch with you within 24 hours.</p>
            </div>
        );
    }

    const inputClass = "w-full border border-charcoal/20 bg-white px-4 py-3 text-sm text-charcoal placeholder-charcoal/30 focus:outline-none focus:border-gold transition-colors";
    const budgets = ['₹25L – ₹50L', '₹50L – ₹1Cr', '₹1Cr – ₹2Cr', '₹2Cr+'];

    return (
        <form onSubmit={handleSubmit} className={`space-y-4 ${compact ? '' : 'max-w-2xl'}`}>
            <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
                <input name="name" value={form.name} onChange={handleChange} placeholder="Full Name *" required className={inputClass} />
                <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number *" required type="tel" className={inputClass} />
            </div>
            <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address" type="email" className={inputClass} />
            <div className={`grid ${compact ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'} gap-4`}>
                <select name="project" value={form.project} onChange={handleChange} className={inputClass}>
                    <option value="">Project Interest</option>
                    {(projectOptions.length ? projectOptions : ['Skyline Heights', 'Skyline Business Hub', 'Skyline Greens', 'Skyline Metro Plaza']).map(p => (
                        <option key={p}>{p}</option>
                    ))}
                </select>
                <select name="budget" value={form.budget} onChange={handleChange} className={inputClass}>
                    <option value="">Budget Range</option>
                    {budgets.map(b => <option key={b}>{b}</option>)}
                </select>
            </div>
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Your Message" rows={compact ? 3 : 4} className={inputClass} />
            <button type="submit" className="bg-gold hover:bg-charcoal text-white px-10 py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 w-full sm:w-auto">
                Submit Inquiry
            </button>
        </form>
    );
}
