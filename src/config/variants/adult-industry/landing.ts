/**
 * Landing Page Configuration
 *
 * Hero section and landing page content configuration
 * for the adult-industry variant.
 */

import { CITIES } from './data/cities';
import { COUNTRY_REGULATIONS } from './data/regulations';
import { RED_LIGHT_DISTRICTS } from './data/red-light-districts';
import { FKK_CLUBS } from './data/fkk-clubs';

/** CTA button configuration */
export interface CTAButton {
  /** Button text */
  text: string;
  /** Emoji icon */
  icon: string;
  /** URL to navigate to (optional) */
  href?: string;
  /** Anchor ID to scroll to (optional) */
  scrollTo?: string;
  /** Primary or secondary style */
  variant: 'primary' | 'secondary';
}

/** Hero section configuration */
export interface HeroConfig {
  /** Main title */
  title: string;
  /** Subtitle text */
  subtitle: string;
  /** Primary CTA button */
  primaryCTA: CTAButton;
  /** Secondary CTA button (optional) */
  secondaryCTA?: CTAButton;
  /** Background gradient colors */
  backgroundGradient: [string, string];
}

/** Statistics item for landing page */
export interface LandingStatistic {
  /** Display value */
  value: string;
  /** Label */
  label: string;
  /** Emoji icon */
  icon: string;
}

/** Region summary for landing page */
export interface RegionSummary {
  /** Region name */
  name: string;
  /** Country count */
  countries: number;
  /** City count */
  cities: number;
  /** Brief description */
  description: string;
}

/**
 * Get Hero section configuration
 */
export function getHeroConfig(): HeroConfig {
  return {
    title: 'EUROPE ADULT INDUSTRY MAP',
    subtitle: `Explore the legal adult entertainment scene across ${countCountries()} European countries`,
    primaryCTA: {
      text: 'Explore Interactive Map',
      icon: '🗺️',
      href: '/?view=map',
      variant: 'primary',
    },
    secondaryCTA: {
      text: 'View by Region',
      icon: '📊',
      scrollTo: 'regions',
      variant: 'secondary',
    },
    backgroundGradient: ['#1a1a2e', '#16213e'],
  };
}

/**
 * Get landing page statistics
 */
export function getLandingStatistics(): LandingStatistic[] {
  return [
    {
      value: String(countCountries()),
      label: 'Countries',
      icon: '🌍',
    },
    {
      value: String(CITIES.length),
      label: 'Cities',
      icon: '🏙️',
    },
    {
      value: String(RED_LIGHT_DISTRICTS.length),
      label: 'Red Light Districts',
      icon: '🔴',
    },
    {
      value: String(FKK_CLUBS.length),
      label: 'FKK Clubs',
      icon: '🧖',
    },
  ];
}

/**
 * Get count of unique countries (internal helper)
 */
function countCountries(): number {
  return COUNTRY_REGULATIONS.length;
}

/**
 * Get region summaries for landing page
 */
export function getRegionSummaries(): RegionSummary[] {
  // Define European regions
  const regions: Record<string, string[]> = {
    'Western Europe': ['Germany', 'Netherlands', 'Belgium', 'France', 'Luxembourg'],
    'Central Europe': ['Austria', 'Switzerland', 'Czech Republic', 'Poland', 'Hungary'],
    'Northern Europe': ['Sweden', 'Denmark', 'Norway', 'Finland'],
    'Southern Europe': ['Spain', 'Italy', 'Portugal', 'Greece'],
    'Eastern Europe': ['Romania', 'Bulgaria', 'Ukraine', 'Russia'],
  };

  const summaries: RegionSummary[] = [];

  for (const [regionName, countries] of Object.entries(regions)) {
    const regionCountries = COUNTRY_REGULATIONS.filter((r) =>
      countries.includes(r.countryName)
    );
    const regionCities = CITIES.filter((c) => countries.includes(c.country));

    if (regionCountries.length > 0) {
      summaries.push({
        name: regionName,
        countries: regionCountries.length,
        cities: regionCities.length,
        description: getRegionDescription(regionName),
      });
    }
  }

  return summaries;
}

/**
 * Get region description
 */
function getRegionDescription(region: string): string {
  const descriptions: Record<string, string> = {
    'Western Europe': 'Home to the most liberal regulations and famous red light districts',
    'Central Europe': 'Mix of FKK culture and regulated venues',
    'Northern Europe': 'Progressive social policies with regulated services',
    'Southern Europe': 'Varied regulations from tolerant to restrictive',
    'Eastern Europe': 'Emerging markets with evolving regulations',
  };
  return descriptions[region] || '';
}

/**
 * Get featured countries for landing page
 */
export function getFeaturedCountries(): string[] {
  // Return countries with highest permissiveness scores
  const sorted = [...COUNTRY_REGULATIONS].sort((a, b) => b.overallScore - a.overallScore);
  return sorted.slice(0, 6).map((r) => r.countryName);
}

// ============================================================================
// Country Card Data (FR #76)
// ============================================================================

/** Score labels for permissiveness rating */
export const SCORE_LABELS: Record<number, string> = {
  5: 'Very Permissive',
  4: 'Permissive',
  3: 'Moderate',
  2: 'Restrictive',
  1: 'Very Restrictive',
};

/** Country flag emojis by country code */
export const FLAG_EMOJIS: Record<string, string> = {
  AT: '🇦🇹',
  BE: '🇧🇪',
  BG: '🇧🇬',
  CH: '🇨🇭',
  CY: '🇨🇾',
  CZ: '🇨🇿',
  DE: '🇩🇪',
  DK: '🇩🇰',
  EE: '🇪🇪',
  ES: '🇪🇸',
  FI: '🇫🇮',
  FR: '🇫🇷',
  GB: '🇬🇧',
  GR: '🇬🇷',
  HR: '🇭🇷',
  HU: '🇭🇺',
  IE: '🇮🇪',
  IT: '🇮🇹',
  LT: '🇱🇹',
  LU: '🇱🇺',
  LV: '🇱🇻',
  MT: '🇲🇹',
  NL: '🇳🇱',
  NO: '🇳🇴',
  PL: '🇵🇱',
  PT: '🇵🇹',
  RO: '🇷🇴',
  RS: '🇷🇸',
  RU: '🇷🇺',
  SE: '🇸🇪',
  SI: '🇸🇮',
  SK: '🇸🇰',
  UA: '🇺🇦',
};

/** Country card data structure */
export interface CountryCardData {
  /** ISO country code */
  countryCode: string;
  /** Country name */
  countryName: string;
  /** Permissiveness score (1-5) */
  score: 1 | 2 | 3 | 4 | 5;
  /** Score label */
  scoreLabel: string;
  /** Has red light districts */
  hasRedLightDistricts: boolean;
  /** Has FKK clubs */
  hasFKKClubs: boolean;
  /** Number of cities in dataset */
  cityCount: number;
  /** Flag emoji */
  flagEmoji: string;
}

/**
 * Get all country cards data
 */
export function getCountryCards(): CountryCardData[] {
  return COUNTRY_REGULATIONS.map((reg) => {
    const cityCount = CITIES.filter((c) => c.country === reg.countryName).length;

    return {
      countryCode: reg.countryCode,
      countryName: reg.countryName,
      score: reg.overallScore,
      scoreLabel: SCORE_LABELS[reg.overallScore] || 'Unknown',
      hasRedLightDistricts: reg.hasRedLightDistricts,
      hasFKKClubs: reg.hasFKKClubs,
      cityCount,
      flagEmoji: FLAG_EMOJIS[reg.countryCode] || '🏳️',
    };
  });
}

/**
 * Get country cards sorted by score (highest first)
 */
export function getCountryCardsSortedByScore(): CountryCardData[] {
  return getCountryCards().sort((a, b) => b.score - a.score);
}

/**
 * Get country cards sorted by name
 */
export function getCountryCardsSortedByName(): CountryCardData[] {
  return getCountryCards().sort((a, b) => a.countryName.localeCompare(b.countryName));
}

/**
 * Get country cards filtered by features
 */
export function getCountryCardsWithFeatures(options: {
  hasRedLightDistricts?: boolean;
  hasFKKClubs?: boolean;
}): CountryCardData[] {
  return getCountryCards().filter((card) => {
    if (options.hasRedLightDistricts !== undefined && card.hasRedLightDistricts !== options.hasRedLightDistricts) {
      return false;
    }
    if (options.hasFKKClubs !== undefined && card.hasFKKClubs !== options.hasFKKClubs) {
      return false;
    }
    return true;
  });
}

// ============================================================================
// Region Sections (FR #78)
// ============================================================================

/** Region key type */
export type RegionKey = 'north' | 'west' | 'south' | 'east';

/** Region definition */
export interface RegionDefinition {
  /** Region key */
  key: RegionKey;
  /** Display title */
  title: string;
  /** Subtitle description */
  subtitle: string;
  /** Country names in this region */
  countries: string[];
}

/** Region data with country cards */
export interface RegionData {
  /** Region key */
  key: RegionKey;
  /** Display title */
  title: string;
  /** Subtitle description */
  subtitle: string;
  /** Number of countries */
  countryCount: number;
  /** Country card data for this region */
  cards: CountryCardData[];
}

/**
 * Region definitions with country groupings
 * Based on FR #78 requirements
 */
export const REGION_DEFINITIONS: RegionDefinition[] = [
  {
    key: 'north',
    title: 'North Europe',
    subtitle: 'Nordic countries with progressive regulations',
    countries: ['Denmark', 'Finland', 'Norway', 'Sweden', 'United Kingdom'],
  },
  {
    key: 'west',
    title: 'West Europe',
    subtitle: 'Home to the most permissive adult industries',
    countries: ['Austria', 'Belgium', 'France', 'Germany', 'Netherlands', 'Switzerland'],
  },
  {
    key: 'south',
    title: 'South Europe',
    subtitle: 'Mediterranean nightlife and culture',
    countries: ['Albania', 'Croatia', 'Greece', 'Italy', 'Portugal', 'Serbia', 'Slovenia', 'Spain'],
  },
  {
    key: 'east',
    title: 'East Europe',
    subtitle: 'Diverse regulations across former Eastern Bloc',
    countries: [
      'Belarus',
      'Bulgaria',
      'Czech Republic',
      'Estonia',
      'Hungary',
      'Iceland',
      'Ireland',
      'Kosovo',
      'Latvia',
      'Lithuania',
      'Luxembourg',
      'Moldova',
      'Monaco',
      'Montenegro',
      'Poland',
      'Romania',
      'Russia',
      'Slovakia',
      'Turkey',
      'Ukraine',
    ],
  },
];

/**
 * Get countries by region key
 */
export function getCountriesByRegion(key: RegionKey): string[] {
  const region = REGION_DEFINITIONS.find((r) => r.key === key);
  return region ? region.countries : [];
}

/**
 * Get all region data with country cards
 */
export function getRegionData(): RegionData[] {
  const allCards = getCountryCards();

  return REGION_DEFINITIONS.map((def) => {
    const cards = allCards.filter((card) => def.countries.includes(card.countryName));

    return {
      key: def.key,
      title: def.title,
      subtitle: def.subtitle,
      countryCount: def.countries.length,
      cards: cards.sort((a, b) => b.score - a.score), // Sort by score within region
    };
  });
}

/**
 * Get region data by key
 */
export function getRegionByKey(key: RegionKey): RegionData | null {
  const data = getRegionData();
  return data.find((r) => r.key === key) || null;
}

/**
 * Get all region keys
 */
export function getRegionKeys(): RegionKey[] {
  return REGION_DEFINITIONS.map((r) => r.key);
}

// ============================================================================
// Flag Images (FR #79)
// ============================================================================

/** Flag image configuration */
export const FLAG_IMAGE_CONFIG = {
  /** Base path for flag images */
  basePath: '/flags',
  /** Image width */
  width: 800,
  /** Image height */
  height: 600,
  /** Supported formats */
  formats: ['webp', 'jpg'] as const,
} as const;

/**
 * Country name to filename mapping
 * Handles special characters and spaces
 */
export const COUNTRY_TO_FILENAME: Record<string, string> = {
  Albania: 'albania',
  Austria: 'austria',
  Belarus: 'belarus',
  Belgium: 'belgium',
  Bulgaria: 'bulgaria',
  Croatia: 'croatia',
  'Czech Republic': 'czech-republic',
  Denmark: 'denmark',
  Estonia: 'estonia',
  Finland: 'finland',
  France: 'france',
  Germany: 'germany',
  Greece: 'greece',
  Hungary: 'hungary',
  Iceland: 'iceland',
  Ireland: 'ireland',
  Italy: 'italy',
  Kosovo: 'kosovo',
  Latvia: 'latvia',
  Lithuania: 'lithuania',
  Luxembourg: 'luxembourg',
  Moldova: 'moldova',
  Monaco: 'monaco',
  Montenegro: 'montenegro',
  Netherlands: 'netherlands',
  Norway: 'norway',
  Poland: 'poland',
  Portugal: 'portugal',
  Romania: 'romania',
  Russia: 'russia',
  Serbia: 'serbia',
  Slovakia: 'slovakia',
  Slovenia: 'slovenia',
  Spain: 'spain',
  Sweden: 'sweden',
  Switzerland: 'switzerland',
  Turkey: 'turkey',
  Ukraine: 'ukraine',
  'United Kingdom': 'united-kingdom',
};

/** Flag image source set */
export interface FlagImageSrcSet {
  /** WebP image path */
  webp: string;
  /** JPG image path (fallback) */
  jpg: string;
  /** Alt text */
  alt: string;
  /** Image width */
  width: number;
  /** Image height */
  height: number;
}

/**
 * Convert country name to filename
 */
export function countryToFilename(countryName: string): string {
  // Check mapping first
  if (COUNTRY_TO_FILENAME[countryName]) {
    return COUNTRY_TO_FILENAME[countryName];
  }
  // Fallback: lowercase and replace spaces with hyphens
  return countryName.toLowerCase().replace(/\s+/g, '-');
}

/**
 * Get flag image path for a country
 */
export function getFlagImagePath(countryName: string, format: 'webp' | 'jpg' = 'webp'): string {
  const filename = countryToFilename(countryName);
  return `${FLAG_IMAGE_CONFIG.basePath}/${filename}.${format}`;
}

/**
 * Get flag image srcset for a country
 */
export function getFlagImageSrcSet(countryName: string): FlagImageSrcSet {
  const filename = countryToFilename(countryName);
  const { basePath, width, height } = FLAG_IMAGE_CONFIG;

  return {
    webp: `${basePath}/${filename}.webp`,
    jpg: `${basePath}/${filename}.jpg`,
    alt: `${countryName} flag`,
    width,
    height,
  };
}

/**
 * Get all flag images for all countries in dataset
 */
export function getAllFlagImages(): FlagImageSrcSet[] {
  return Object.keys(COUNTRY_TO_FILENAME).map((country) => getFlagImageSrcSet(country));
}

/**
 * Check if a country has a flag mapping
 */
export function hasCountryFlag(countryName: string): boolean {
  return countryName in COUNTRY_TO_FILENAME;
}

// ============================================================================
// Header Navigation (FR #85)
// ============================================================================

/** Navigation button configuration */
export interface NavButtonConfig {
  /** Button text */
  text: string;
  /** Button icon (emoji) */
  icon: string;
  /** Target URL */
  href: string;
  /** Button title (tooltip) */
  title: string;
  /** Show icon only on mobile */
  iconOnlyOnMobile: boolean;
}

/** Header navigation configuration */
export interface HeaderNavConfig {
  /** Country Guide button (map → landing) */
  countryGuide: NavButtonConfig;
  /** View Map button (landing → map) */
  viewMap: NavButtonConfig;
}

/**
 * Get Country Guide button configuration
 * Used in map header to navigate to Landing Page
 */
export function getCountryGuideButton(): NavButtonConfig {
  return {
    text: 'Country Guide',
    icon: '🌍',
    href: '/?view=landing',
    title: 'Browse countries by region',
    iconOnlyOnMobile: true,
  };
}

/**
 * Get View Map button configuration
 * Used in Landing Page to navigate back to map
 */
export function getViewMapButton(): NavButtonConfig {
  return {
    text: 'View Interactive Map',
    icon: '🗺️',
    href: '/?view=map',
    title: 'Open the interactive map',
    iconOnlyOnMobile: true,
  };
}

/**
 * Get header navigation configuration
 */
export function getHeaderNavConfig(): HeaderNavConfig {
  return {
    countryGuide: getCountryGuideButton(),
    viewMap: getViewMapButton(),
  };
}
