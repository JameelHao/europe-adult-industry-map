/**
 * Country Detail Data for Adult Industry Variant
 *
 * Provides detailed country information for the country detail page.
 */

import { COUNTRY_REGULATIONS } from './data/regulations';
import { CITIES } from './data/cities';
import { RED_LIGHT_DISTRICTS } from './data/red-light-districts';
import { FKK_CLUBS } from './data/fkk-clubs';
import { FLAG_EMOJIS, SCORE_LABELS } from './landing';
import { normalizeCountryCode } from './country-bounds';

/** City information for detail page */
export interface CityInfo {
  name: string;
  hasRedLightDistrict: boolean;
  rldCount: number;
  fkkCount: number;
  population?: number;
}

/** Legal status information */
export interface LegalStatusInfo {
  prostitutionLegal: boolean;
  brothelsLegal: boolean;
  streetWorkLegal: boolean;
  buyingLegal: boolean;
  advertisingLegal: boolean;
  notes?: string;
}

/** Country detail data structure */
export interface CountryDetailData {
  /** ISO country code (lowercase) */
  countryCode: string;
  /** Country name */
  countryName: string;
  /** Flag emoji */
  flagEmoji: string;
  /** Permissiveness score (1-5) */
  score: number;
  /** Score label */
  scoreLabel: string;
  /** Summary description */
  summary: string;
  /** Has red light districts */
  hasRedLightDistricts: boolean;
  /** Has FKK clubs */
  hasFKKClubs: boolean;
  /** Total RLD count */
  rldCount: number;
  /** Total FKK count */
  fkkCount: number;
  /** City list */
  cities: CityInfo[];
  /** Legal status */
  legalStatus: LegalStatusInfo;
}

/**
 * Default country summaries by country code
 */
const COUNTRY_SUMMARIES: Record<string, string> = {
  germany: 'Prostitution is fully legal and regulated. Germany has a large and well-organized adult industry with famous FKK clubs and regulated venues.',
  netherlands: 'Prostitution is fully legal since 2000. Home to the world-famous Amsterdam Red Light District (De Wallen).',
  austria: 'Prostitution is legal and regulated. Each province has its own specific rules and licensing requirements.',
  switzerland: 'Prostitution is legal with cantonal regulations. Major cities have designated areas for adult services.',
  belgium: 'Prostitution is legal but brothels operate in a legal grey area. Brussels has several well-known red light areas.',
  czechrepublic: 'Prostitution exists in a legal grey zone. Prague is known for its adult entertainment industry.',
  spain: 'Prostitution is not explicitly regulated. Major cities have known red light areas despite legal ambiguity.',
  france: 'Buying sex is illegal since 2016, but selling is legal. This Nordic model approach changed the industry significantly.',
  italy: 'Street prostitution is legal but organized activities are prohibited. Major cities have discrete adult venues.',
  unitedkingdom: 'Complex legal status varies by region. Individual sex work is legal but brothels and soliciting are not.',
  poland: 'Prostitution is legal but organizing it is not. The industry operates in a grey area.',
  hungary: 'Prostitution is legal in designated tolerance zones with registration requirements.',
  romania: 'Prostitution is illegal but enforcement varies. Underground industry exists in major cities.',
  bulgaria: 'Prostitution is neither legal nor illegal. The industry operates without clear regulation.',
  greece: 'Prostitution is legal with registration, but most operate outside the system.',
  portugal: 'Prostitution is legal but organizing it is not. Lisbon has discrete adult venues.',
  denmark: 'Prostitution is legal. Copenhagen has visible red light areas near the central station.',
  sweden: 'Nordic model: buying sex is illegal, selling is legal. Industry has moved largely underground.',
  norway: 'Nordic model applies. Buying sex is illegal but selling is not criminalized.',
  finland: 'Buying sex from trafficked persons is illegal. Individual sex work is tolerated.',
};

/**
 * Get summary for a country
 */
export function getCountrySummary(countryCode: string): string {
  const normalized = normalizeCountryCode(countryCode);
  return COUNTRY_SUMMARIES[normalized] || 'Information about adult industry regulations in this country is limited. Please refer to local sources for current laws and policies.';
}

/**
 * Get cities for a country with venue counts
 */
export function getCountryCities(countryName: string): CityInfo[] {
  const citiesInCountry = CITIES.filter(c => c.country === countryName);

  return citiesInCountry.map(city => {
    const rlds = RED_LIGHT_DISTRICTS.filter(r => r.city === city.name);
    const fkks = FKK_CLUBS.filter(f => f.city === city.name);

    return {
      name: city.name,
      hasRedLightDistrict: rlds.length > 0,
      rldCount: rlds.length,
      fkkCount: fkks.length,
      population: city.population,
    };
  }).sort((a, b) => (b.rldCount + b.fkkCount) - (a.rldCount + a.fkkCount));
}

/**
 * Get legal status for a country
 */
export function getCountryLegalStatus(countryCode: string, regulation: (typeof COUNTRY_REGULATIONS)[0]): LegalStatusInfo {
  // Derive legal status from overall score and known characteristics
  const normalized = normalizeCountryCode(countryCode);
  const score = regulation.overallScore;

  // Higher score = more permissive
  return {
    prostitutionLegal: score >= 3,
    brothelsLegal: score >= 4,
    streetWorkLegal: score >= 4,
    buyingLegal: score >= 3 && !['sweden', 'norway', 'france', 'ireland', 'iceland'].includes(normalized),
    advertisingLegal: score >= 4,
    notes: score <= 2 ? 'Highly restricted or prohibited' : undefined,
  };
}

/**
 * Get detailed country data by country code
 */
export function getCountryDetailData(countryCode: string): CountryDetailData | null {
  const normalized = normalizeCountryCode(countryCode);

  // Find regulation data
  const regulation = COUNTRY_REGULATIONS.find(r =>
    r.countryCode.toLowerCase() === normalized ||
    r.countryName.toLowerCase().replace(/\s+/g, '') === normalized
  );

  if (!regulation) return null;

  const cities = getCountryCities(regulation.countryName);
  const rldCount = RED_LIGHT_DISTRICTS.filter(r => {
    const city = CITIES.find(c => c.name === r.city);
    return city?.country === regulation.countryName;
  }).length;
  const fkkCount = FKK_CLUBS.filter(f => {
    const city = CITIES.find(c => c.name === f.city);
    return city?.country === regulation.countryName;
  }).length;

  return {
    countryCode: regulation.countryCode.toLowerCase(),
    countryName: regulation.countryName,
    flagEmoji: FLAG_EMOJIS[regulation.countryCode] || '🏳️',
    score: regulation.overallScore,
    scoreLabel: SCORE_LABELS[regulation.overallScore] || 'Unknown',
    summary: getCountrySummary(normalized),
    hasRedLightDistricts: regulation.hasRedLightDistricts,
    hasFKKClubs: regulation.hasFKKClubs,
    rldCount,
    fkkCount,
    cities,
    legalStatus: getCountryLegalStatus(normalized, regulation),
  };
}

/**
 * Check if country detail data exists
 */
export function hasCountryDetail(countryCode: string): boolean {
  return getCountryDetailData(countryCode) !== null;
}
