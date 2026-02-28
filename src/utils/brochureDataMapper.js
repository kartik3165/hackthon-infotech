/**
 * brochureDataMapper.js
 * Transforms a project data object from data/projects.js into a
 * clean, PDF-ready shape consumed by BrochurePDF.jsx.
 */

const DEVELOPER = {
    name: 'Skyline Infra Developers Pvt. Ltd.',
    tagline: 'Redefining the Skyline of Luxury',
    address: 'Skyline House, BKC, Mumbai 400098',
    phone: '1800-SKYLINE (Toll Free)',
    email: 'projects@skylineinfra.in',
    website: 'www.skylineinfra.in',
    rera: 'MahaRERA No.',
};

// Map slug → RERA number
const RERA_MAP = {
    'skyline-heights': 'P51800045123',
    'skyline-business-hub': 'P51800045124',
    'skyline-greens': 'P51800045125',
    'skyline-metro-plaza': 'P51800045126',
};

// Location advantages per project
const LOCATION_ADVANTAGES = {
    'skyline-heights': [
        'Chhatrapati Shivaji International Airport — 20 mins',
        'Andheri Metro Station — 5 mins walk',
        'BKC Financial District — 15 mins',
        'Top-tier Schools & Hospitals within 2 km',
        'Western Express Highway — Direct access',
    ],
    'skyline-business-hub': [
        'BKC Metro Station — 3 mins walk',
        'MMRDA Convention Centre — 5 mins',
        'Top Banks & Embassies in immediate vicinity',
        'International Airport — 25 mins',
        'National Stock Exchange — 10 mins',
    ],
    'skyline-greens': [
        'Thane Railway Station — 10 mins',
        'Eastern Express Highway — 5 mins',
        'Hiranandani Hospital — 2 km',
        'Upvan Lake — 1 km',
        'Leading Schools & Colleges — 2–5 km radius',
    ],
    'skyline-metro-plaza': [
        'Ghatkopar Metro & Local Station — Walkable',
        'Eastern Express Highway — 2 mins',
        'LBS Marg — Direct Frontage',
        'Vikhroli IT Park — 10 mins',
        'Airport — 30 mins via Eastern Express',
    ],
};

/**
 * Maps a raw project object to a PDF-safe brochure data object.
 * @param {Object} project - Raw project from data/projects.js
 * @param {Object} lead - { name, phone, email } captured from lead form
 * @returns {Object} PDF-ready brochure data
 */
export function mapProjectToBrochureData(project, lead = {}) {
    return {
        // Developer meta
        developer: DEVELOPER,

        // Project core
        projectName: project.title,
        projectSlug: project.slug,
        location: project.location,
        category: project.category,
        status: project.status,
        possession: project.possession ?? 'On Request',
        totalUnits: project.totalUnits ?? 'N/A',
        floors: project.floors ? `G + ${project.floors}` : 'N/A',

        // Description
        description: project.description,

        // Pricing & configuration
        priceFrom: project.price,
        configurations: project.configs ?? [],

        // Amenities - project-specific, never global
        amenities: (project.amenities ?? []).map(a => ({
            label: a.label,
            category: a.category,
        })),

        // Highlights (bullet list for overview section)
        highlights: project.highlights ?? [],

        // Location advantages
        locationAdvantages: LOCATION_ADVANTAGES[project.slug] ?? [
            'Airport — 20 mins',
            'Metro Station — 5 mins walk',
            'Schools & Hospitals — 2 km',
            'Business District — 10 mins',
        ],

        // Legal
        rera: `${DEVELOPER.rera}: ${RERA_MAP[project.slug] ?? 'On Request'}`,
        disclaimer: 'All images, renders, and CGIs shown are indicative and subject to change without notice. This brochure is for information purposes only and does not constitute an offer to sell.',

        // Lead info (optional)
        lead: {
            name: lead.name ?? '',
            phone: lead.phone ?? '',
            email: lead.email ?? '',
        },

        // Output filename
        filename: `${project.title.replace(/\s+/g, '_')}_Brochure.pdf`,
    };
}
