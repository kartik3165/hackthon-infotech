/**
 * DownloadBrochureButton.jsx
 *
 * Reusable button that:
 *  1. Opens a lead-capture modal (Name, Email, Phone)
 *  2. On submit — generates the PDF client-side via @react-pdf/renderer
 *  3. Auto-downloads as `ProjectName_Brochure.pdf`
 *
 * Props:
 *  - project {object}  — full project object from data/projects.js (required)
 *  - variant  "gold" | "outline" | "dark"  (default: "gold")
 *  - label    string  (default: "Download Brochure")
 *  - className string — extra Tailwind classes for the trigger button
 */
import { useState } from 'react';
import { pdf } from '@react-pdf/renderer';
import BrochurePDF from './BrochurePDF';
import { mapProjectToBrochureData } from '../utils/brochureDataMapper';

const STEP = { CLOSED: 'closed', FORM: 'form', GENERATING: 'generating', DONE: 'done' };

const EMPTY_LEAD = { name: '', email: '', phone: '' };

export default function DownloadBrochureButton({
    project,
    variant = 'gold',
    label = 'Download Brochure',
    className = '',
}) {
    const [step, setStep] = useState(STEP.CLOSED);
    const [lead, setLead] = useState(EMPTY_LEAD);
    const [errors, setErrors] = useState({});

    // ── Styles for the trigger button ──────────────────────────────────────
    const variantClass = {
        gold: 'bg-gold hover:bg-charcoal text-white',
        outline: 'border border-gold text-gold hover:bg-gold hover:text-white',
        dark: 'bg-charcoal hover:bg-gold text-white',
    }[variant] ?? 'bg-gold text-white';

    // ── Validation ─────────────────────────────────────────────────────────
    const validate = () => {
        const e = {};
        if (!lead.name.trim()) e.name = 'Required';
        if (!lead.phone.trim() || !/^\+?[\d\s\-()]{7,}$/.test(lead.phone))
            e.phone = 'Valid phone required';
        if (!lead.email.trim() || !/\S+@\S+\.\S+/.test(lead.email))
            e.email = 'Valid email required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    // ── PDF generation ─────────────────────────────────────────────────────
    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setStep(STEP.GENERATING);

        try {
            // Map live project data → PDF-safe shape
            const brochureData = mapProjectToBrochureData(project, lead);

            // Generate the PDF blob client-side
            const blob = await pdf(<BrochurePDF data={brochureData} />).toBlob();

            // Trigger browser download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = brochureData.filename;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            setStep(STEP.DONE);
        } catch (err) {
            console.error('[BrochurePDF] Generation failed:', err);
            setStep(STEP.FORM); // Return to form on error
            alert('PDF generation failed. Please try again.');
        }
    };

    // ── Reset & close ──────────────────────────────────────────────────────
    const handleClose = () => {
        setStep(STEP.CLOSED);
        setLead(EMPTY_LEAD);
        setErrors({});
    };

    const inputBase = 'w-full border px-4 py-3 text-sm text-charcoal bg-white focus:outline-none transition-colors placeholder-charcoal/30';

    return (
        <>
            {/* ── Trigger Button ─────────────────────────────────────── */}
            <button
                onClick={() => setStep(STEP.FORM)}
                className={`${variantClass} px-6 py-3 text-[10px] uppercase tracking-widest font-bold transition-all duration-300 ${className}`}
            >
                {label}
            </button>

            {/* ── Modal Overlay ──────────────────────────────────────── */}
            {step !== STEP.CLOSED && (
                <div
                    className="fixed inset-0 z-[200] bg-charcoal/80 flex items-center justify-center p-4 backdrop-blur-sm"
                    onClick={step === STEP.GENERATING ? undefined : handleClose}
                >
                    <div
                        className="bg-white max-w-md w-full shadow-2xl"
                        onClick={e => e.stopPropagation()}
                    >
                        {/* Modal Header */}
                        <div className="bg-charcoal px-8 pt-8 pb-6">
                            <p className="text-gold uppercase tracking-[0.3em] text-[10px] font-bold mb-2">
                                Free Download
                            </p>
                            <h3 className="font-serif text-2xl text-white">
                                {step === STEP.DONE ? 'Your Brochure is Ready!' : 'Download Brochure'}
                            </h3>
                            <p className="text-white/50 text-xs mt-2">
                                {project.title} — {project.category}
                            </p>
                        </div>

                        <div className="p-8">
                            {/* ── Step: FORM ─────────────────────────────── */}
                            {step === STEP.FORM && (
                                <form onSubmit={handleGenerate} noValidate className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <input
                                            type="text"
                                            placeholder="Full Name *"
                                            value={lead.name}
                                            onChange={e => setLead({ ...lead, name: e.target.value })}
                                            className={`${inputBase} ${errors.name ? 'border-red-400 focus:border-red-400' : 'border-charcoal/20 focus:border-gold'}`}
                                        />
                                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <input
                                            type="tel"
                                            placeholder="Phone Number *"
                                            value={lead.phone}
                                            onChange={e => setLead({ ...lead, phone: e.target.value })}
                                            className={`${inputBase} ${errors.phone ? 'border-red-400 focus:border-red-400' : 'border-charcoal/20 focus:border-gold'}`}
                                        />
                                        {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <input
                                            type="email"
                                            placeholder="Email Address *"
                                            value={lead.email}
                                            onChange={e => setLead({ ...lead, email: e.target.value })}
                                            className={`${inputBase} ${errors.email ? 'border-red-400 focus:border-red-400' : 'border-charcoal/20 focus:border-gold'}`}
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    <p className="text-[10px] text-charcoal/40 leading-relaxed">
                                        Your information helps us personalise the brochure. We respect your privacy.
                                    </p>

                                    <div className="flex gap-3 pt-2">
                                        <button
                                            type="submit"
                                            className="flex-1 bg-gold hover:bg-charcoal text-white py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300"
                                        >
                                            Generate PDF
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleClose}
                                            className="px-5 py-4 border border-charcoal/20 text-charcoal/50 text-xs uppercase tracking-widest hover:border-charcoal transition-colors"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </form>
                            )}

                            {/* ── Step: GENERATING ───────────────────────── */}
                            {step === STEP.GENERATING && (
                                <div className="text-center py-8">
                                    {/* Spinner */}
                                    <div className="relative w-16 h-16 mx-auto mb-6">
                                        <div className="absolute inset-0 border-2 border-gold/20 rounded-full" />
                                        <div className="absolute inset-0 border-2 border-t-gold border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin" />
                                    </div>
                                    <h4 className="font-serif text-xl text-charcoal mb-2">Generating Brochure…</h4>
                                    <p className="text-charcoal/50 text-sm">
                                        Building your personalised PDF for <strong>{project.title}</strong>
                                    </p>
                                    <p className="text-charcoal/30 text-xs mt-2">This usually takes 2–4 seconds</p>
                                </div>
                            )}

                            {/* ── Step: DONE ─────────────────────────────── */}
                            {step === STEP.DONE && (
                                <div className="text-center py-4">
                                    {/* Success checkmark */}
                                    <div className="w-16 h-16 bg-gold/10 flex items-center justify-center mx-auto mb-5">
                                        <svg className="w-8 h-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </div>
                                    <h4 className="font-serif text-2xl text-charcoal mb-2">Download Started!</h4>
                                    <p className="text-charcoal/60 text-sm mb-1">
                                        <strong>{project.title}_Brochure.pdf</strong>
                                    </p>
                                    <p className="text-charcoal/40 text-xs mb-6">
                                        Check your Downloads folder. The PDF has been generated with live project data.
                                    </p>
                                    <div className="flex gap-3 justify-center">
                                        <button
                                            onClick={() => { setStep(STEP.FORM); setLead(EMPTY_LEAD); }}
                                            className="border border-charcoal/20 text-charcoal/60 px-6 py-2 text-xs uppercase tracking-widest hover:border-charcoal transition-colors"
                                        >
                                            Download Again
                                        </button>
                                        <button
                                            onClick={handleClose}
                                            className="bg-charcoal hover:bg-gold text-white px-8 py-2 text-xs uppercase tracking-widest font-bold transition-all duration-300"
                                        >
                                            Close
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
