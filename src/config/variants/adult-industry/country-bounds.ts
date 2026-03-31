/**
 * Country Geographic Bounds for Map Focus
 *
 * Contains bounding boxes for European countries.
 * Used to zoom the map to a specific country.
 * Format: [[minLng, minLat], [maxLng, maxLat]]
 */

/** Bounding box type: [[west, south], [east, north]] */
export type BoundingBox = [[number, number], [number, number]];

/** Default Europe bounds */
export const EUROPE_BOUNDS: BoundingBox = [
  [-25, 34], // Southwest (includes Atlantic islands)
  [45, 71], // Northeast (includes Scandinavia)
];

/**
 * Country bounds by lowercase country code
 * Data sourced from natural earth and OpenStreetMap
 */
export const COUNTRY_BOUNDS: Record<string, BoundingBox> = {
  // Western Europe
  germany: [
    [5.8664, 47.2701],
    [15.0419, 55.0583],
  ],
  netherlands: [
    [3.3137, 50.7504],
    [7.2275, 53.5548],
  ],
  belgium: [
    [2.5136, 49.497],
    [6.4083, 51.505],
  ],
  france: [
    [-5.1428, 41.3333],
    [9.5596, 51.0891],
  ],
  luxembourg: [
    [5.7343, 49.4478],
    [6.5309, 50.1829],
  ],

  // Central Europe
  austria: [
    [9.5307, 46.3723],
    [17.1608, 49.0205],
  ],
  switzerland: [
    [5.9564, 45.818],
    [10.4921, 47.8085],
  ],
  czechrepublic: [
    [12.0905, 48.5524],
    [18.8593, 51.0556],
  ],
  poland: [
    [14.1229, 49.002],
    [24.1458, 54.8358],
  ],
  hungary: [
    [16.1138, 45.7375],
    [22.8968, 48.5857],
  ],
  slovakia: [
    [16.8335, 47.7314],
    [22.5657, 49.6138],
  ],
  slovenia: [
    [13.3753, 45.4216],
    [16.5648, 46.8766],
  ],

  // Northern Europe
  sweden: [
    [11.1078, 55.3371],
    [24.1669, 69.0599],
  ],
  denmark: [
    [8.0756, 54.5592],
    [15.1588, 57.7519],
  ],
  norway: [
    [4.6502, 57.9599],
    [31.0781, 71.1854],
  ],
  finland: [
    [20.5488, 59.8069],
    [31.5898, 70.0923],
  ],
  estonia: [
    [21.8287, 57.5092],
    [28.2099, 59.6764],
  ],
  latvia: [
    [20.9673, 55.6747],
    [28.2414, 58.0855],
  ],
  lithuania: [
    [20.9316, 53.8868],
    [26.8356, 56.4503],
  ],

  // Southern Europe
  spain: [
    [-9.3015, 35.9466],
    [4.3279, 43.7484],
  ],
  portugal: [
    [-9.5261, 36.9603],
    [-6.1893, 42.1543],
  ],
  italy: [
    [6.6149, 35.4897],
    [18.5203, 47.0852],
  ],
  greece: [
    [19.3735, 34.8021],
    [29.6455, 41.7488],
  ],
  croatia: [
    [13.4896, 42.3927],
    [19.4271, 46.554],
  ],
  malta: [
    [14.1833, 35.8064],
    [14.5764, 36.0822],
  ],
  cyprus: [
    [32.2712, 34.5636],
    [34.5977, 35.7017],
  ],

  // Eastern Europe
  romania: [
    [20.2619, 43.6187],
    [29.7149, 48.2654],
  ],
  bulgaria: [
    [22.3572, 41.2344],
    [28.6121, 44.2282],
  ],
  ukraine: [
    [22.1288, 44.3864],
    [40.2286, 52.3791],
  ],
  russia: [
    [27.3218, 41.1857], // European Russia only (western part)
    [60.0, 70.0],
  ],
  serbia: [
    [18.8297, 42.2321],
    [23.0064, 46.1901],
  ],

  // British Isles
  unitedkingdom: [
    [-8.6493, 49.8647],
    [1.7628, 60.8607],
  ],
  ireland: [
    [-10.4785, 51.3934],
    [-5.9929, 55.4316],
  ],
};

/**
 * Country code aliases (handle different naming conventions)
 */
export const COUNTRY_CODE_ALIASES: Record<string, string> = {
  uk: 'unitedkingdom',
  gb: 'unitedkingdom',
  cz: 'czechrepublic',
  czech: 'czechrepublic',
  de: 'germany',
  nl: 'netherlands',
  be: 'belgium',
  fr: 'france',
  at: 'austria',
  ch: 'switzerland',
  pl: 'poland',
  hu: 'hungary',
  se: 'sweden',
  dk: 'denmark',
  no: 'norway',
  fi: 'finland',
  es: 'spain',
  pt: 'portugal',
  it: 'italy',
  gr: 'greece',
  hr: 'croatia',
  ro: 'romania',
  bg: 'bulgaria',
  ua: 'ukraine',
  ru: 'russia',
  rs: 'serbia',
  ie: 'ireland',
  sk: 'slovakia',
  si: 'slovenia',
  ee: 'estonia',
  lv: 'latvia',
  lt: 'lithuania',
  lu: 'luxembourg',
  mt: 'malta',
  cy: 'cyprus',
};

/**
 * Normalize country code to canonical form
 */
export function normalizeCountryCode(code: string): string {
  const normalized = code.toLowerCase().replace(/[^a-z]/g, '');
  return COUNTRY_CODE_ALIASES[normalized] || normalized;
}

/**
 * Get bounding box for a country by code
 * Returns null if country not found
 */
export function getCountryBoundsByCode(code: string): BoundingBox | null {
  const normalized = normalizeCountryCode(code);
  return COUNTRY_BOUNDS[normalized] || null;
}

/**
 * Get center point of a country's bounding box
 */
export function getCountryCenterFromBounds(code: string): [number, number] | null {
  const bounds = getCountryBoundsByCode(code);
  if (!bounds) return null;

  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  return [(minLng + maxLng) / 2, (minLat + maxLat) / 2];
}

/**
 * Get zoom level appropriate for country size
 * Smaller countries get higher zoom
 */
export function getCountryZoom(code: string): number {
  const bounds = getCountryBoundsByCode(code);
  if (!bounds) return 4; // Default Europe zoom

  const [[minLng, minLat], [maxLng, maxLat]] = bounds;
  const width = maxLng - minLng;
  const height = maxLat - minLat;
  const area = width * height;

  // Approximate zoom based on area
  if (area < 2) return 8; // Very small (Luxembourg, Malta)
  if (area < 10) return 7; // Small (Belgium, Netherlands)
  if (area < 50) return 6; // Medium (Germany, Poland)
  if (area < 200) return 5; // Large (France, Spain)
  return 4; // Very large (Russia, Ukraine)
}

/**
 * Check if a country code is valid
 */
export function isValidCountryCode(code: string): boolean {
  return getCountryBoundsByCode(code) !== null;
}

/**
 * Get all valid country codes
 */
export function getValidCountryCodes(): string[] {
  return Object.keys(COUNTRY_BOUNDS);
}
