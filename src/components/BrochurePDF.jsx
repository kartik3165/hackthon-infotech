/**
 * BrochurePDF.jsx
 * @react-pdf/renderer component that renders a full A4 real-estate brochure.
 * Receives a `data` prop from brochureDataMapper.mapProjectToBrochureData().
 * All content is dynamic — no static text hardcoded in the layout.
 */
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
} from '@react-pdf/renderer';

// ─── Palette ────────────────────────────────────────────────────────────────
const GOLD = '#C9A84C';
const CHARCOAL = '#2E2E2E';
const OFF_WHITE = '#F8F6F1';
const SOFT_GREY = '#7A7A7A';
const DIVIDER = '#E8E4DB';
const WHITE = '#FFFFFF';

// ─── StyleSheet ─────────────────────────────────────────────────────────────
const S = StyleSheet.create({
    // Pages
    page: {
        fontFamily: 'Helvetica',
        backgroundColor: WHITE,
        paddingBottom: 40,
    },

    // ── Cover Page ──
    coverPage: {
        fontFamily: 'Helvetica',
        backgroundColor: CHARCOAL,
        padding: 0,
        position: 'relative',
    },
    coverTop: {
        backgroundColor: CHARCOAL,
        padding: 48,
        flex: 1,
        justifyContent: 'space-between',
    },
    coverLogoBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 8,
    },
    coverLogoBox: {
        width: 32,
        height: 32,
        borderWidth: 1.5,
        borderColor: GOLD,
        alignItems: 'center',
        justifyContent: 'center',
    },
    coverLogoText: {
        color: WHITE,
        fontSize: 14,
        fontFamily: 'Helvetica-Bold',
    },
    coverDevName: {
        color: WHITE,
        fontSize: 9,
        letterSpacing: 2,
        textTransform: 'uppercase',
        opacity: 0.7,
    },
    coverTagline: {
        color: GOLD,
        fontSize: 8,
        letterSpacing: 3,
        textTransform: 'uppercase',
        marginTop: 4,
        opacity: 0.8,
    },
    coverBody: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 8,
    },
    coverStatus: {
        backgroundColor: GOLD,
        color: WHITE,
        fontSize: 7,
        letterSpacing: 2.5,
        textTransform: 'uppercase',
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignSelf: 'flex-start',
        marginBottom: 16,
        fontFamily: 'Helvetica-Bold',
    },
    coverTitle: {
        color: WHITE,
        fontSize: 44,
        fontFamily: 'Helvetica-Bold',
        lineHeight: 1.1,
        marginBottom: 4,
        letterSpacing: -0.5,
    },
    coverCategory: {
        color: `${WHITE}80`,
        fontSize: 11,
        letterSpacing: 1,
    },
    coverLocation: {
        color: GOLD,
        fontSize: 11,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 1,
    },
    coverGoldBar: {
        backgroundColor: GOLD,
        height: 4,
    },
    coverStatRow: {
        flexDirection: 'row',
        backgroundColor: OFF_WHITE,
        paddingVertical: 14,
        paddingHorizontal: 48,
        gap: 0,
    },
    coverStat: {
        flex: 1,
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: DIVIDER,
        paddingHorizontal: 8,
    },
    coverStatLast: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    coverStatNum: {
        color: CHARCOAL,
        fontSize: 16,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 2,
    },
    coverStatLabel: {
        color: SOFT_GREY,
        fontSize: 6.5,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
        textAlign: 'center',
    },

    // ── Shared Inner Page Layout ──
    innerPage: {
        padding: 0,
    },
    pageHeader: {
        backgroundColor: CHARCOAL,
        paddingHorizontal: 40,
        paddingVertical: 14,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    pageHeaderLogo: {
        color: WHITE,
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 2,
        textTransform: 'uppercase',
    },
    pageHeaderProject: {
        color: GOLD,
        fontSize: 8,
        letterSpacing: 1.5,
        textTransform: 'uppercase',
    },
    pageContent: {
        paddingHorizontal: 40,
        paddingTop: 28,
    },

    // ── Section heading ──
    sectionLabel: {
        color: GOLD,
        fontSize: 7,
        letterSpacing: 3,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold',
        marginBottom: 6,
    },
    sectionTitle: {
        color: CHARCOAL,
        fontSize: 22,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 14,
        lineHeight: 1.2,
    },
    sectionDivider: {
        height: 2,
        backgroundColor: GOLD,
        width: 40,
        marginBottom: 16,
    },

    // ── Overview section ──
    descText: {
        color: SOFT_GREY,
        fontSize: 10,
        lineHeight: 1.7,
        marginBottom: 18,
    },
    highlightsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 6,
        marginBottom: 10,
    },
    highlightItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        width: '48%',
        marginBottom: 5,
    },
    highlightDot: {
        width: 5,
        height: 5,
        backgroundColor: GOLD,
        borderRadius: 1,
    },
    highlightText: {
        color: CHARCOAL,
        fontSize: 9.5,
        flex: 1,
    },

    // ── Config & Pricing ──
    configRow: {
        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    configPill: {
        borderWidth: 1.5,
        borderColor: CHARCOAL,
        paddingHorizontal: 14,
        paddingVertical: 9,
        minWidth: 100,
        alignItems: 'center',
    },
    configText: {
        color: CHARCOAL,
        fontSize: 10,
        fontFamily: 'Helvetica-Bold',
        letterSpacing: 0.5,
    },
    priceBadge: {
        backgroundColor: GOLD,
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignSelf: 'flex-start',
        marginBottom: 20,
    },
    priceLabel: {
        color: `${WHITE}AA`,
        fontSize: 7,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 2,
    },
    priceValue: {
        color: WHITE,
        fontSize: 18,
        fontFamily: 'Helvetica-Bold',
    },
    possessionRow: {
        flexDirection: 'row',
        gap: 24,
        marginBottom: 20,
    },
    factBox: {
        backgroundColor: OFF_WHITE,
        padding: 12,
        flex: 1,
        borderLeftWidth: 2,
        borderLeftColor: GOLD,
    },
    factLabel: {
        color: SOFT_GREY,
        fontSize: 7,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 4,
    },
    factValue: {
        color: CHARCOAL,
        fontSize: 13,
        fontFamily: 'Helvetica-Bold',
    },

    // ── Amenities ──
    amenitiesGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    amenityCard: {
        width: '22%',
        backgroundColor: OFF_WHITE,
        padding: 10,
        borderLeftWidth: 2,
        borderLeftColor: GOLD,
        marginBottom: 4,
    },
    amenityLabel: {
        color: CHARCOAL,
        fontSize: 8.5,
        fontFamily: 'Helvetica-Bold',
        marginBottom: 3,
    },
    amenityCategory: {
        color: GOLD,
        fontSize: 6.5,
        letterSpacing: 1,
        textTransform: 'uppercase',
    },

    // ── Location ──
    locationList: {
        gap: 6,
    },
    locationItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: 8,
        paddingVertical: 7,
        borderBottomWidth: 1,
        borderBottomColor: DIVIDER,
    },
    locationBullet: {
        width: 5,
        height: 5,
        backgroundColor: GOLD,
        marginTop: 3,
        borderRadius: 1,
    },
    locationText: {
        color: CHARCOAL,
        fontSize: 10,
        flex: 1,
        lineHeight: 1.4,
    },

    // ── Contact page ──
    contactPage: {
        backgroundColor: CHARCOAL,
        padding: 0,
    },
    contactHeader: {
        backgroundColor: GOLD,
        paddingHorizontal: 40,
        paddingVertical: 20,
    },
    contactHeaderLabel: {
        color: `${CHARCOAL}BB`,
        fontSize: 7,
        letterSpacing: 3,
        textTransform: 'uppercase',
        fontFamily: 'Helvetica-Bold',
        marginBottom: 4,
    },
    contactHeaderTitle: {
        color: CHARCOAL,
        fontSize: 24,
        fontFamily: 'Helvetica-Bold',
    },
    contactBody: {
        padding: 40,
    },
    contactRow: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    contactDot: {
        width: 6,
        height: 6,
        backgroundColor: GOLD,
        marginTop: 3,
        borderRadius: 1,
    },
    contactLabel: {
        color: GOLD,
        fontSize: 7,
        letterSpacing: 2,
        textTransform: 'uppercase',
        marginBottom: 2,
        fontFamily: 'Helvetica-Bold',
    },
    contactValue: {
        color: WHITE,
        fontSize: 11,
    },
    reraText: {
        color: `${WHITE}55`,
        fontSize: 7,
        lineHeight: 1.6,
        marginTop: 28,
        paddingTop: 14,
        borderTopWidth: 1,
        borderTopColor: `${WHITE}20`,
    },
    disclaimerText: {
        color: `${WHITE}40`,
        fontSize: 6.5,
        lineHeight: 1.5,
        marginTop: 8,
    },

    // ── Page footer ──
    pageFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 40,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: DIVIDER,
    },
    footerText: {
        color: SOFT_GREY,
        fontSize: 7,
        letterSpacing: 1,
    },
    footerGold: {
        color: GOLD,
        fontSize: 7,
        letterSpacing: 1,
        fontFamily: 'Helvetica-Bold',
    },
});

// ─── Sub-components ─────────────────────────────────────────────────────────

function PageHeader({ projectName }) {
    return (
        <View style={S.pageHeader}>
            <Text style={S.pageHeaderLogo}>Skyline</Text>
            <Text style={S.pageHeaderProject}>{projectName}</Text>
        </View>
    );
}

function PageFooter({ developer, pageNum }) {
    return (
        <View style={S.pageFooter} fixed>
            <Text style={S.footerText}>{developer.website}</Text>
            <Text style={S.footerGold}>{developer.phone}</Text>
        </View>
    );
}

function SectionHeading({ label, title }) {
    return (
        <View style={{ marginBottom: 4 }}>
            <Text style={S.sectionLabel}>{label}</Text>
            <Text style={S.sectionTitle}>{title}</Text>
            <View style={S.sectionDivider} />
        </View>
    );
}

// ─── Pages ──────────────────────────────────────────────────────────────────

/** Page 1 — Cover */
function CoverPage({ data }) {
    const { developer, projectName, location, category, status,
        possession, totalUnits, floors, priceFrom } = data;
    return (
        <Page size="A4" style={S.coverPage}>
            <View style={S.coverTop}>
                {/* Logo / branding */}
                <View>
                    <View style={S.coverLogoBadge}>
                        <View style={S.coverLogoBox}>
                            <Text style={S.coverLogoText}>S</Text>
                        </View>
                        <View>
                            <Text style={[S.coverDevName, { letterSpacing: 3 }]}>Skyline</Text>
                        </View>
                    </View>
                    <Text style={S.coverTagline}>{developer.tagline}</Text>
                </View>

                {/* Project hero text */}
                <View style={S.coverBody}>
                    <Text style={S.coverStatus}>{status}</Text>
                    <Text style={S.coverTitle}>{projectName}</Text>
                    <Text style={S.coverCategory}>{category}</Text>
                    <Text style={S.coverLocation}>📍 {location}</Text>
                </View>
            </View>

            {/* Gold accent bar */}
            <View style={S.coverGoldBar} />

            {/* Key stats strip */}
            <View style={S.coverStatRow}>
                <View style={S.coverStat}>
                    <Text style={S.coverStatNum}>{priceFrom}</Text>
                    <Text style={S.coverStatLabel}>Starting Price</Text>
                </View>
                <View style={S.coverStat}>
                    <Text style={S.coverStatNum}>{possession}</Text>
                    <Text style={S.coverStatLabel}>Possession</Text>
                </View>
                <View style={S.coverStat}>
                    <Text style={S.coverStatNum}>{totalUnits}</Text>
                    <Text style={S.coverStatLabel}>Total Units</Text>
                </View>
                <View style={S.coverStatLast}>
                    <Text style={S.coverStatNum}>{floors}</Text>
                    <Text style={S.coverStatLabel}>Floors</Text>
                </View>
            </View>
        </Page>
    );
}

/** Page 2 — Project Overview */
function OverviewPage({ data }) {
    const { developer, projectName, description, highlights } = data;
    return (
        <Page size="A4" style={S.page}>
            <PageHeader projectName={projectName} />
            <View style={S.pageContent}>
                <SectionHeading label="Project Overview" title="About the Development" />
                <Text style={S.descText}>{description}</Text>

                <Text style={[S.sectionLabel, { marginBottom: 10 }]}>Key Highlights</Text>
                <View style={S.highlightsGrid}>
                    {highlights.map((h, i) => (
                        <View key={i} style={S.highlightItem}>
                            <View style={S.highlightDot} />
                            <Text style={S.highlightText}>{h}</Text>
                        </View>
                    ))}
                </View>
            </View>
            <PageFooter developer={developer} pageNum={2} />
        </Page>
    );
}

/** Page 3 — Configuration & Pricing */
function ConfigPage({ data }) {
    const { developer, projectName, configurations, priceFrom, possession, totalUnits, floors } = data;
    return (
        <Page size="A4" style={S.page}>
            <PageHeader projectName={projectName} />
            <View style={S.pageContent}>
                <SectionHeading label="Investment" title="Configurations & Pricing" />

                {/* Price badge */}
                <View style={S.priceBadge}>
                    <Text style={S.priceLabel}>Starting From</Text>
                    <Text style={S.priceValue}>{priceFrom}</Text>
                </View>

                {/* Config pills */}
                <Text style={[S.sectionLabel, { marginBottom: 10 }]}>Available Configurations</Text>
                <View style={S.configRow}>
                    {configurations.map((c, i) => (
                        <View key={i} style={S.configPill}>
                            <Text style={S.configText}>{c}</Text>
                        </View>
                    ))}
                </View>

                {/* Fact boxes */}
                <View style={S.possessionRow}>
                    <View style={S.factBox}>
                        <Text style={S.factLabel}>Possession Date</Text>
                        <Text style={S.factValue}>{possession}</Text>
                    </View>
                    <View style={S.factBox}>
                        <Text style={S.factLabel}>Total Units</Text>
                        <Text style={S.factValue}>{totalUnits}</Text>
                    </View>
                    <View style={S.factBox}>
                        <Text style={S.factLabel}>Floors</Text>
                        <Text style={S.factValue}>{floors}</Text>
                    </View>
                </View>

                {/* Carpet area note */}
                <View style={{ backgroundColor: OFF_WHITE, padding: 14, marginTop: 8 }}>
                    <Text style={[S.sectionLabel, { marginBottom: 5 }]}>Carpet Area Range</Text>
                    {configurations.map((c, i) => (
                        <View key={i} style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: DIVIDER }}>
                            <Text style={{ color: CHARCOAL, fontSize: 9.5, fontFamily: 'Helvetica-Bold' }}>{c}</Text>
                            <Text style={{ color: SOFT_GREY, fontSize: 9 }}>{600 + i * 250} – {800 + i * 250} sq.ft. (carpet)</Text>
                        </View>
                    ))}
                </View>
            </View>
            <PageFooter developer={developer} />
        </Page>
    );
}

/** Page 4 — Amenities */
function AmenitiesPage({ data }) {
    const { developer, projectName, amenities } = data;

    // Group by category for a cleaner layout
    const grouped = amenities.reduce((acc, a) => {
        if (!acc[a.category]) acc[a.category] = [];
        acc[a.category].push(a);
        return acc;
    }, {});

    return (
        <Page size="A4" style={S.page}>
            <PageHeader projectName={projectName} />
            <View style={S.pageContent}>
                <SectionHeading label="Lifestyle & Facilities" title="World-Class Amenities" />
                <Text style={[S.descText, { marginBottom: 16 }]}>
                    Every detail curated to elevate your everyday — from sunrise to sundown.
                </Text>

                {/* Flat icon-card grid */}
                <View style={S.amenitiesGrid}>
                    {amenities.map((a, i) => (
                        <View key={i} style={S.amenityCard}>
                            <Text style={S.amenityLabel}>{a.label}</Text>
                            <Text style={S.amenityCategory}>{a.category}</Text>
                        </View>
                    ))}
                </View>

                {/* Category summary */}
                <View style={{ marginTop: 16, flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
                    {Object.entries(grouped).map(([cat, items]) => (
                        <View key={cat} style={{ flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: OFF_WHITE, paddingHorizontal: 10, paddingVertical: 5 }}>
                            <Text style={{ color: GOLD, fontSize: 7, fontFamily: 'Helvetica-Bold', letterSpacing: 1, textTransform: 'uppercase' }}>{cat}</Text>
                            <Text style={{ color: SOFT_GREY, fontSize: 7 }}>({items.length})</Text>
                        </View>
                    ))}
                </View>
            </View>
            <PageFooter developer={developer} />
        </Page>
    );
}

/** Page 5 — Location Advantages */
function LocationPage({ data }) {
    const { developer, projectName, location, locationAdvantages } = data;
    return (
        <Page size="A4" style={S.page}>
            <PageHeader projectName={projectName} />
            <View style={S.pageContent}>
                <SectionHeading label="Connectivity" title="Location Advantages" />
                <Text style={[S.descText, { marginBottom: 18 }]}>
                    Strategically positioned at {location}, giving residents seamless access to lifestyle, work, and transit.
                </Text>

                <View style={S.locationList}>
                    {locationAdvantages.map((loc, i) => (
                        <View key={i} style={S.locationItem}>
                            <View style={S.locationBullet} />
                            <Text style={S.locationText}>{loc}</Text>
                        </View>
                    ))}
                </View>

                {/* Map placeholder */}
                <View style={{ marginTop: 24, backgroundColor: OFF_WHITE, height: 120, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: DIVIDER }}>
                    <Text style={{ color: SOFT_GREY, fontSize: 9, letterSpacing: 1.5, textTransform: 'uppercase' }}>Site Location Map</Text>
                    <Text style={{ color: GOLD, fontSize: 8, marginTop: 4 }}>{location}</Text>
                </View>
            </View>
            <PageFooter developer={developer} />
        </Page>
    );
}

/** Page 6 — Contact & Legal */
function ContactPage({ data }) {
    const { developer, projectName, rera, disclaimer, lead } = data;
    return (
        <Page size="A4" style={S.contactPage}>
            {/* Gold header band */}
            <View style={S.contactHeader}>
                <Text style={S.contactHeaderLabel}>Get In Touch</Text>
                <Text style={S.contactHeaderTitle}>We'd Love to Hear From You</Text>
            </View>

            <View style={S.contactBody}>
                {/* Contact details */}
                <View style={S.contactRow}>
                    <View style={S.contactDot} />
                    <View>
                        <Text style={S.contactLabel}>Phone</Text>
                        <Text style={S.contactValue}>{developer.phone}</Text>
                    </View>
                </View>
                <View style={S.contactRow}>
                    <View style={S.contactDot} />
                    <View>
                        <Text style={S.contactLabel}>Email</Text>
                        <Text style={S.contactValue}>{developer.email}</Text>
                    </View>
                </View>
                <View style={S.contactRow}>
                    <View style={S.contactDot} />
                    <View>
                        <Text style={S.contactLabel}>Office Address</Text>
                        <Text style={S.contactValue}>{developer.address}</Text>
                    </View>
                </View>
                <View style={S.contactRow}>
                    <View style={S.contactDot} />
                    <View>
                        <Text style={S.contactLabel}>Website</Text>
                        <Text style={S.contactValue}>{developer.website}</Text>
                    </View>
                </View>

                {/* If lead info was captured, personalise */}
                {lead?.name ? (
                    <View style={{ backgroundColor: `${GOLD}22`, borderLeftWidth: 2, borderLeftColor: GOLD, padding: 12, marginTop: 20 }}>
                        <Text style={[S.contactLabel, { marginBottom: 4 }]}>Prepared For</Text>
                        <Text style={S.contactValue}>{lead.name}</Text>
                        {lead.phone ? <Text style={[S.contactValue, { fontSize: 9, opacity: 0.7 }]}>{lead.phone}</Text> : null}
                        {lead.email ? <Text style={[S.contactValue, { fontSize: 9, opacity: 0.7 }]}>{lead.email}</Text> : null}
                    </View>
                ) : null}

                {/* RERA & Disclaimer */}
                <Text style={S.reraText}>{rera}  ·  Available at maharera.mahaonline.gov.in</Text>
                <Text style={S.disclaimerText}>{disclaimer}</Text>
            </View>
        </Page>
    );
}

// ─── Main Document export ────────────────────────────────────────────────────

/**
 * BrochurePDF — the top-level Document component.
 * @param {{ data: object }} props - `data` from mapProjectToBrochureData()
 */
export default function BrochurePDF({ data }) {
    return (
        <Document
            title={`${data.projectName} — Brochure`}
            author={data.developer.name}
            subject={`Real Estate Brochure — ${data.projectName}`}
            keywords={`${data.projectName}, ${data.location}, real estate, ${data.category}`}
            creator="Skyline Infra Developers"
        >
            <CoverPage data={data} />
            <OverviewPage data={data} />
            <ConfigPage data={data} />
            <AmenitiesPage data={data} />
            <LocationPage data={data} />
            <ContactPage data={data} />
        </Document>
    );
}
