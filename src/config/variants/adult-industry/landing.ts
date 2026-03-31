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
