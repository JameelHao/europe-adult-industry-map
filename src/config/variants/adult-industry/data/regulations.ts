/**
 * Adult Industry Regulatory Landscape Data
 * 
 * Contains regulatory environment data for European countries regarding
 * adult industry products and services. Scores range from 1 (restrictive)
 * to 5 (permissive).
 * 
 * DISCLAIMER: This data is for informational purposes only and should not
 * be considered legal advice. Regulations change frequently.
 */

/** Advertising restriction levels */
export type AdvertisingRestriction = 'none' | 'limited' | 'strict' | 'banned';

/** Age verification methods */
export type AgeVerificationMethod = 'self-declaration' | 'id-check' | 'strict-kyc';

/** Overall permissiveness score (1=restrictive, 5=permissive) */
export type RegulationScore = 1 | 2 | 3 | 4 | 5;

/** Country regulation data structure */
export interface CountryRegulation {
  /** ISO 3166-1 alpha-2 country code */
  countryCode: string;
  /** Full country name */
  countryName: string;
  /** Overall permissiveness score (1-5) */
  overallScore: RegulationScore;
  /** Physical retail stores legal */
  physicalRetailLegal: boolean;
  /** Online sales legal */
  onlineSalesLegal: boolean;
  /** Advertising restrictions level */
  advertisingRestrictions: AdvertisingRestriction;
  /** Age verification required for purchase */
  ageVerificationRequired: boolean;
  /** Age verification method */
  ageVerificationMethod: AgeVerificationMethod;
  /** Import restrictions exist */
  importRestrictions: boolean;
  /** Additional notes */
  notes?: string;
  /** Last updated date (ISO format) */
  lastUpdated: string;
  /** Source references */
  sources?: string[];
}

/**
 * European country regulations data
 * Covers EU27 + UK + Norway + Switzerland + other European countries
 */
export const COUNTRY_REGULATIONS: CountryRegulation[] = [
  // ============ VERY PERMISSIVE (Score 5) ============
  {
    countryCode: 'DE',
    countryName: 'Germany',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Very permissive. Home to major brands like Satisfyer, Womanizer, Fun Factory.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'NL',
    countryName: 'Netherlands',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    notes: 'Liberal regulations. Major distribution hub.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'DK',
    countryName: 'Denmark',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    notes: 'Progressive regulations.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'SE',
    countryName: 'Sweden',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    notes: 'Home to LELO. Progressive approach.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'BE',
    countryName: 'Belgium',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    notes: 'Home to pjur lubricants.',
    lastUpdated: '2026-03-01',
  },

  // ============ PERMISSIVE (Score 4) ============
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Major market. Strict advertising rules but retail is well-established.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'FR',
    countryName: 'France',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Traditional lingerie market. Regulated but accessible.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'ES',
    countryName: 'Spain',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    notes: 'Growing market with modern approach.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'PT',
    countryName: 'Portugal',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'IT',
    countryName: 'Italy',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Strong lingerie tradition. Some regional variations.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'AT',
    countryName: 'Austria',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'CH',
    countryName: 'Switzerland',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Not EU but similar regulations.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'NO',
    countryName: 'Norway',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'EEA member. Strict advertising but legal retail.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'FI',
    countryName: 'Finland',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },

  // ============ MODERATE (Score 3) ============
  {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'PL',
    countryName: 'Poland',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    notes: 'Conservative socially but legal market exists.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'HU',
    countryName: 'Hungary',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'SK',
    countryName: 'Slovakia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'SI',
    countryName: 'Slovenia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'HR',
    countryName: 'Croatia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'EE',
    countryName: 'Estonia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'LV',
    countryName: 'Latvia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'LT',
    countryName: 'Lithuania',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'GR',
    countryName: 'Greece',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'BG',
    countryName: 'Bulgaria',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'RO',
    countryName: 'Romania',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'CY',
    countryName: 'Cyprus',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    lastUpdated: '2026-03-01',
  },

  // ============ RESTRICTIVE (Score 2) ============
  {
    countryCode: 'IE',
    countryName: 'Ireland',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'strict-kyc',
    importRestrictions: false,
    notes: 'Conservative regulations. Limited physical retail.',
    lastUpdated: '2026-03-01',
  },
  {
    countryCode: 'MT',
    countryName: 'Malta',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'strict-kyc',
    importRestrictions: true,
    notes: 'Small market with conservative approach.',
    lastUpdated: '2026-03-01',
  },
];

/** Color scale for regulation scores */
export const REGULATION_COLORS: Record<RegulationScore, string> = {
  1: '#FF0000', // Very restrictive - Red
  2: '#FF6600', // Restrictive - Orange
  3: '#FFCC00', // Moderate - Yellow
  4: '#99CC00', // Permissive - Light green
  5: '#00CC00', // Very permissive - Green
};

/** Score labels */
export const REGULATION_SCORE_LABELS: Record<RegulationScore, string> = {
  1: 'Very Restrictive',
  2: 'Restrictive',
  3: 'Moderate',
  4: 'Permissive',
  5: 'Very Permissive',
};

/** Get regulation by country code */
export function getRegulationByCode(countryCode: string): CountryRegulation | undefined {
  return COUNTRY_REGULATIONS.find(r => r.countryCode === countryCode);
}

/** Get regulations by score */
export function getRegulationsByScore(score: RegulationScore): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.overallScore === score);
}

/** Get all country codes */
export function getRegulatedCountryCodes(): string[] {
  return COUNTRY_REGULATIONS.map(r => r.countryCode);
}

/** Get countries by advertising restriction level */
export function getCountriesByAdvertisingRestriction(level: AdvertisingRestriction): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.advertisingRestrictions === level);
}
