export default function PageHero({ label, title, subtitle, bg }) {
    return (
        <section className="relative h-[50vh] min-h-[380px] flex items-end bg-charcoal overflow-hidden">
            {bg && (
                <div
                    className="hero-bg absolute inset-0 w-full h-full"
                    style={{ backgroundImage: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/60 to-charcoal/20 pointer-events-none" />
            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 pb-16 w-full">
                {label && (
                    <p className="hero-label text-gold uppercase tracking-[0.4em] text-xs font-bold mb-3 opacity-0">{label}</p>
                )}
                <h1 className="hero-title font-serif text-5xl md:text-7xl text-white leading-tight opacity-0">{title}</h1>
                {subtitle && (
                    <p className="hero-subtitle text-white/60 mt-4 text-lg max-w-xl opacity-0">{subtitle}</p>
                )}
            </div>
        </section>
    );
}
