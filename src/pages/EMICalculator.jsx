import { useState } from 'react';
import PageHero from '../components/PageHero';

function formatINR(val) {
    if (!val || isNaN(val)) return '—';
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
}

export default function EMICalculator() {
    const [price, setPrice] = useState(8000000);
    const [down, setDown] = useState(2000000);
    const [rate, setRate] = useState(8.5);
    const [tenure, setTenure] = useState(20);

    const principal = Math.max(price - down, 0);
    const monthlyRate = rate / 100 / 12;
    const n = tenure * 12;
    const emi = monthlyRate > 0 && n > 0
        ? (principal * monthlyRate * Math.pow(1 + monthlyRate, n)) / (Math.pow(1 + monthlyRate, n) - 1)
        : 0;
    const totalPayable = emi * n;
    const totalInterest = totalPayable - principal;

    const sliders = [
        { label: 'Property Price', value: price, min: 2000000, max: 50000000, step: 100000, set: setPrice, display: formatINR(price) },
        { label: 'Down Payment', value: down, min: 0, max: price * 0.9, step: 100000, set: setDown, display: formatINR(down) },
        { label: 'Interest Rate (p.a.)', value: rate, min: 5, max: 20, step: 0.1, set: setRate, display: `${rate}%` },
        { label: 'Loan Tenure', value: tenure, min: 1, max: 30, step: 1, set: setTenure, display: `${tenure} Yrs` },
    ];

    return (
        <div>
            <PageHero
                label="Financial Planning"
                title="EMI Calculator"
                subtitle="Plan your investment with clarity. Estimate your monthly payments in seconds."
                bg="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=2000"
            />

            <section className="py-24 bg-offwhite">
                <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-5 gap-12 items-start">
                    {/* Inputs */}
                    <div className="lg:col-span-3 bg-white p-8 md:p-10">
                        <h2 className="font-serif text-3xl text-charcoal mb-10">Calculate Your EMI</h2>
                        <div className="space-y-10">
                            {sliders.map(s => (
                                <div key={s.label}>
                                    <div className="flex justify-between mb-3">
                                        <label className="text-xs uppercase tracking-widest text-charcoal/60">{s.label}</label>
                                        <span className="font-bold text-gold text-lg">{s.display}</span>
                                    </div>
                                    <input
                                        type="range"
                                        min={s.min}
                                        max={s.max}
                                        step={s.step}
                                        value={s.value}
                                        onChange={e => s.set(Number(e.target.value))}
                                        className="w-full h-1 bg-charcoal/10 appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-gold [&::-webkit-slider-thumb]:cursor-pointer accent-gold"
                                        style={{ background: `linear-gradient(to right, #C9A227 0%, #C9A227 ${((s.value - s.min) / (s.max - s.min)) * 100}%, #e5e7eb ${((s.value - s.min) / (s.max - s.min)) * 100}%, #e5e7eb 100%)` }}
                                    />
                                    <div className="flex justify-between text-[10px] text-charcoal/30 mt-1 uppercase tracking-widest">
                                        <span>{formatINR(s.min)}{s.label.includes('Rate') ? '%' : ''}{s.label.includes('Tenure') ? ' Yr' : ''}</span>
                                        <span>{formatINR(s.max)}{s.label.includes('Rate') ? '%' : ''}{s.label.includes('Tenure') ? ' Yrs' : ''}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2 space-y-4 sticky top-28">
                        <div className="bg-charcoal p-8 text-center">
                            <p className="text-white/50 text-xs uppercase tracking-widest mb-3">Monthly EMI</p>
                            <p className="font-serif text-5xl text-gold mb-1">{formatINR(emi)}</p>
                            <p className="text-white/30 text-xs">per month for {tenure} years</p>
                        </div>
                        <div className="bg-white p-6 space-y-4">
                            {[
                                { label: 'Loan Amount', value: formatINR(principal) },
                                { label: 'Total Interest', value: formatINR(totalInterest) },
                                { label: 'Total Payable', value: formatINR(totalPayable) },
                            ].map(item => (
                                <div key={item.label} className="flex justify-between items-center border-b border-charcoal/5 pb-4">
                                    <span className="text-xs uppercase tracking-widest text-charcoal/50">{item.label}</span>
                                    <span className="font-bold text-charcoal">{item.value}</span>
                                </div>
                            ))}
                        </div>
                        {/* Pie visualization */}
                        <div className="bg-white p-6">
                            <p className="text-xs uppercase tracking-widest text-charcoal/40 mb-4">Breakup</p>
                            <div className="relative h-4 bg-charcoal/5 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-gold transition-all duration-500"
                                    style={{ width: `${totalPayable ? (principal / totalPayable) * 100 : 0}%` }}
                                />
                            </div>
                            <div className="flex justify-between text-xs mt-2 text-charcoal/40">
                                <span>Principal {totalPayable ? ((principal / totalPayable) * 100).toFixed(0) : 0}%</span>
                                <span>Interest {totalPayable ? ((totalInterest / totalPayable) * 100).toFixed(0) : 0}%</span>
                            </div>
                        </div>
                        <a href="/contact" className="block bg-gold hover:bg-charcoal text-white text-center py-4 text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300">
                            Talk to a Loan Expert
                        </a>
                    </div>
                </div>
            </section>

            {/* Disclaimer */}
            <section className="py-6 bg-charcoal/5">
                <p className="max-w-7xl mx-auto px-6 md:px-12 text-xs text-charcoal/30 leading-relaxed">
                    * This EMI calculator provides indicative figures only. Actual EMI may vary based on the bank's processing fees, credit score, and prevailing interest rates at the time of loan sanction. Skyline Infra Developers does not provide financial or lending services.
                </p>
            </section>
        </div>
    );
}
