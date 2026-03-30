/**
 * Adult Industry Regulatory Landscape Data
 * 
 * Contains regulatory environment data for European countries regarding
 * adult industry products and services. Scores range from 1 (restrictive)
 * to 5 (permissive).
 * 
 * Enhanced with detailed service legality information from eurosexscene.com
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

/** Service legality status */
export type ServiceLegality = 'legal' | 'tolerated' | 'illegal';

/** Service legality details for a country */
export interface ServiceLegalityInfo {
  /** Brothels / Legal venues */
  brothels: ServiceLegality;
  /** Escort services */
  escorts: ServiceLegality;
  /** Strip clubs / Gentlemen's clubs */
  stripClubs: ServiceLegality;
  /** Swinger clubs */
  swingerClubs: ServiceLegality;
  /** Street prostitution */
  streetProstitution: ServiceLegality;
  /** Erotic massage parlors */
  eroticMassage: ServiceLegality;
}

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
  /** Service legality details */
  services: ServiceLegalityInfo;
  /** Has official red light districts */
  hasRedLightDistricts: boolean;
  /** Has FKK clubs (German-style sauna clubs) */
  hasFKKClubs: boolean;
  /** Summary description */
  summary: string;
  /** Warning messages */
  warnings?: string[];
  /** Additional notes */
  notes?: string;
  /** Source URL */
  sourceUrl: string;
  /** Last updated date (ISO format) */
  lastUpdated: string;
  /** Source references */
  sources?: string[];
}

/** Service legality colors */
export const SERVICE_LEGALITY_COLORS: Record<ServiceLegality, string> = {
  legal: '#27ae60',
  tolerated: '#f39c12',
  illegal: '#e74c3c',
};

/** Service legality labels */
export const SERVICE_LEGALITY_LABELS: Record<ServiceLegality, string> = {
  legal: 'Legal',
  tolerated: 'Tolerated',
  illegal: 'Illegal',
};

/** Service legality icons */
export const SERVICE_LEGALITY_ICONS: Record<ServiceLegality, string> = {
  legal: '✅',
  tolerated: '⚠️',
  illegal: '❌',
};

/** Service type labels */
export const SERVICE_TYPE_LABELS: Record<keyof ServiceLegalityInfo, string> = {
  brothels: 'Brothels',
  escorts: 'Escorts',
  stripClubs: 'Strip Clubs',
  swingerClubs: 'Swinger Clubs',
  streetProstitution: 'Street',
  eroticMassage: 'Massage',
};

/**
 * European country regulations data
 * 38 countries with detailed service legality information
 * Source: https://eurosexscene.com/country-guides/
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
    services: {
      brothels: 'legal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'legal',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: true,
    summary: 'Germany has fully legalized and regulated prostitution since 2002. Major cities have famous red-light districts.',
    sourceUrl: 'https://eurosexscene.com/sex-in-germany/',
    lastUpdated: '2026-03-30',
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
    services: {
      brothels: 'legal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'legal',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    summary: 'The Netherlands legalized brothels in 2000. Amsterdam\'s Red Light District is world-famous.',
    sourceUrl: 'https://eurosexscene.com/sex-in-the-netherlands/',
    lastUpdated: '2026-03-30',
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
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal in Denmark, but brothel-keeping and pimping are illegal.',
    sourceUrl: 'https://eurosexscene.com/sex-in-denmark/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'SE',
    countryName: 'Sweden',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Sweden pioneered the Nordic model - selling sex is legal but buying is illegal.',
    warnings: ['Buying sex is illegal (fines/imprisonment)'],
    sourceUrl: 'https://eurosexscene.com/sex-in-sweden/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'AT',
    countryName: 'Austria',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'legal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'legal',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: true,
    summary: 'Prostitution is legal and regulated in Austria. FKK/Sauna clubs are popular.',
    sourceUrl: 'https://eurosexscene.com/sex-in-austria/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'CH',
    countryName: 'Switzerland',
    overallScore: 5,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'legal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'legal',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: true,
    summary: 'Prostitution is legal and regulated in Switzerland. Zurich has official sex boxes.',
    sourceUrl: 'https://eurosexscene.com/sex-in-switzerland/',
    lastUpdated: '2026-03-30',
  },
  // ============ PERMISSIVE (Score 4) ============
  {
    countryCode: 'BE',
    countryName: 'Belgium',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but largely unregulated. Brussels and Antwerp have red-light districts.',
    sourceUrl: 'https://eurosexscene.com/sex-in-belgium/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution exists in a legal grey area. Prague has a thriving nightlife scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-the-czech-republic/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'HU',
    countryName: 'Hungary',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but street solicitation is regulated. Budapest has many erotic venues.',
    sourceUrl: 'https://eurosexscene.com/sex-in-hungary/',
    lastUpdated: '2026-03-30',
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
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution exists in a legal grey area. Barcelona and Madrid have active scenes.',
    sourceUrl: 'https://eurosexscene.com/sex-in-spain/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'GR',
    countryName: 'Greece',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'legal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal in licensed brothels. Athens has many erotic massage parlors.',
    sourceUrl: 'https://eurosexscene.com/sex-in-greece/',
    lastUpdated: '2026-03-30',
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
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but brothels are not. Lisbon has an active nightlife scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-portugal/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'LV',
    countryName: 'Latvia',
    overallScore: 4,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but brothels and pimping are illegal. Riga has an active scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-latvia/',
    lastUpdated: '2026-03-30',
  },
  // ============ MODERATE (Score 3) ============
  {
    countryCode: 'IT',
    countryName: 'Italy',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but brothels are banned. Escort services operate openly.',
    sourceUrl: 'https://eurosexscene.com/sex-in-italy/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'FR',
    countryName: 'France',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    summary: 'France adopted the Nordic model in 2016 - selling is legal but buying is illegal.',
    warnings: ['Buying sex is illegal (fines)'],
    sourceUrl: 'https://eurosexscene.com/sex-in-france/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but brothels and street solicitation are not. Escort agencies operate.',
    sourceUrl: 'https://eurosexscene.com/sex-in-the-uk/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'PL',
    countryName: 'Poland',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is technically illegal but enforcement is rare. Grey area.',
    sourceUrl: 'https://eurosexscene.com/sex-in-poland/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'RO',
    countryName: 'Romania',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: true,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Romania. Enforcement varies.',
    warnings: ['Prostitution is illegal'],
    sourceUrl: 'https://eurosexscene.com/sex-in-romania/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'BG',
    countryName: 'Bulgaria',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution exists in a legal grey area. Sofia has many erotic massage venues.',
    sourceUrl: 'https://eurosexscene.com/sex-in-bulgaria/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'HR',
    countryName: 'Croatia',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Croatia. Limited scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-croatia/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'SI',
    countryName: 'Slovenia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution exists in a legal grey area. Ljubljana has some venues.',
    sourceUrl: 'https://eurosexscene.com/sex-in-slovenia/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'SK',
    countryName: 'Slovakia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but brothels are not. Bratislava has some venues.',
    sourceUrl: 'https://eurosexscene.com/sex-in-slovakia/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'EE',
    countryName: 'Estonia',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but organizing is not. Tallinn has an active scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-estonia/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'LT',
    countryName: 'Lithuania',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Lithuania. Limited nightlife scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-lithuania/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'FI',
    countryName: 'Finland',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but buying from trafficked persons is illegal.',
    sourceUrl: 'https://eurosexscene.com/sex-in-finland/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'NO',
    countryName: 'Norway',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Norway adopted the Nordic model - selling is legal but buying is illegal.',
    warnings: ['Buying sex is illegal'],
    sourceUrl: 'https://eurosexscene.com/sex-in-norway/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'IS',
    countryName: 'Iceland',
    overallScore: 1,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'illegal',
      stripClubs: 'illegal',
      swingerClubs: 'illegal',
      streetProstitution: 'illegal',
      eroticMassage: 'illegal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Iceland has very strict laws. Strip clubs banned in 2010.',
    warnings: ['Buying sex is illegal', 'Strip clubs banned'],
    sourceUrl: 'https://eurosexscene.com/sex-in-iceland/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'IE',
    countryName: 'Ireland',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Ireland adopted the Nordic model in 2017. Selling is legal but buying is illegal.',
    warnings: ['Buying sex is illegal'],
    sourceUrl: 'https://eurosexscene.com/sex-in-ireland/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'LU',
    countryName: 'Luxembourg',
    overallScore: 3,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'limited',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'tolerated',
      escorts: 'legal',
      stripClubs: 'legal',
      swingerClubs: 'legal',
      streetProstitution: 'tolerated',
      eroticMassage: 'legal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is legal but organizing is not. Small scene.',
    sourceUrl: 'https://eurosexscene.com/sex-in-luxembourg/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'MC',
    countryName: 'Monaco',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Monaco. Escort services operate discreetly.',
    sourceUrl: 'https://eurosexscene.com/sex-in-monaco/',
    lastUpdated: '2026-03-30',
  },
  // ============ RESTRICTIVE (Score 2) ============
  {
    countryCode: 'RU',
    countryName: 'Russia',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'banned',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: true,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Russia but enforcement varies.',
    warnings: ['Anti-LGBT laws'],
    sourceUrl: 'https://eurosexscene.com/sex-in-russia/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'UA',
    countryName: 'Ukraine',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Ukraine. Ongoing conflict affects industry.',
    warnings: ['War zone - travel advisory'],
    sourceUrl: 'https://eurosexscene.com/sex-in-ukraine/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'BY',
    countryName: 'Belarus',
    overallScore: 1,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'banned',
    ageVerificationRequired: true,
    ageVerificationMethod: 'id-check',
    importRestrictions: true,
    services: {
      brothels: 'illegal',
      escorts: 'illegal',
      stripClubs: 'tolerated',
      swingerClubs: 'illegal',
      streetProstitution: 'illegal',
      eroticMassage: 'illegal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Very restrictive. Prostitution is illegal with severe penalties.',
    warnings: ['Strict enforcement'],
    sourceUrl: 'https://eurosexscene.com/sex-in-belarus/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'MD',
    countryName: 'Moldova',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Moldova.',
    sourceUrl: 'https://eurosexscene.com/sex-in-moldova/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'TR',
    countryName: 'Turkey',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'banned',
    ageVerificationRequired: true,
    ageVerificationMethod: 'strict-kyc',
    importRestrictions: true,
    services: {
      brothels: 'legal',
      escorts: 'tolerated',
      stripClubs: 'tolerated',
      swingerClubs: 'illegal',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    summary: 'Prostitution is legal only in licensed state brothels (genelev). Very regulated.',
    warnings: ['Strict Islamic cultural context'],
    sourceUrl: 'https://eurosexscene.com/sex-in-turkey/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'AL',
    countryName: 'Albania',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Albania.',
    sourceUrl: 'https://eurosexscene.com/sex-in-albania/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'XK',
    countryName: 'Kosovo',
    overallScore: 1,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'illegal',
      stripClubs: 'tolerated',
      swingerClubs: 'illegal',
      streetProstitution: 'illegal',
      eroticMassage: 'illegal',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Kosovo.',
    sourceUrl: 'https://eurosexscene.com/sex-in-kosovo/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'ME',
    countryName: 'Montenegro',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Montenegro.',
    sourceUrl: 'https://eurosexscene.com/sex-in-montenegro/',
    lastUpdated: '2026-03-30',
  },
  {
    countryCode: 'RS',
    countryName: 'Serbia',
    overallScore: 2,
    physicalRetailLegal: true,
    onlineSalesLegal: true,
    advertisingRestrictions: 'strict',
    ageVerificationRequired: true,
    ageVerificationMethod: 'self-declaration',
    importRestrictions: false,
    services: {
      brothels: 'illegal',
      escorts: 'tolerated',
      stripClubs: 'legal',
      swingerClubs: 'tolerated',
      streetProstitution: 'illegal',
      eroticMassage: 'tolerated',
    },
    hasRedLightDistricts: false,
    hasFKKClubs: false,
    summary: 'Prostitution is illegal in Serbia. Belgrade has some nightlife.',
    sourceUrl: 'https://eurosexscene.com/sex-in-serbia/',
    lastUpdated: '2026-03-30',
  },
];

/**
 * Regulation score colors
 */
export const REGULATION_COLORS: Record<RegulationScore, string> = {
  1: '#e74c3c', // Very Restrictive - Red
  2: '#e67e22', // Restrictive - Orange
  3: '#f1c40f', // Moderate - Yellow
  4: '#2ecc71', // Permissive - Light Green
  5: '#27ae60', // Very Permissive - Green
};

/**
 * Regulation score labels
 */
export const REGULATION_SCORE_LABELS: Record<RegulationScore, string> = {
  1: 'Very Restrictive',
  2: 'Restrictive',
  3: 'Moderate',
  4: 'Permissive',
  5: 'Very Permissive',
};

/**
 * Get regulation by country code
 */
export function getRegulationByCode(countryCode: string): CountryRegulation | undefined {
  return COUNTRY_REGULATIONS.find(r => r.countryCode === countryCode);
}

/**
 * Get regulations by score
 */
export function getRegulationsByScore(score: RegulationScore): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.overallScore === score);
}

/**
 * Get all regulated country codes
 */
export function getRegulatedCountryCodes(): string[] {
  return COUNTRY_REGULATIONS.map(r => r.countryCode);
}

/**
 * Get countries by advertising restriction level
 */
export function getCountriesByAdvertisingRestriction(level: AdvertisingRestriction): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.advertisingRestrictions === level);
}

/**
 * Get countries with red light districts
 */
export function getCountriesWithRedLightDistricts(): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.hasRedLightDistricts);
}

/**
 * Get countries with FKK clubs
 */
export function getCountriesWithFKKClubs(): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.hasFKKClubs);
}

/**
 * Get countries where a service is legal
 */
export function getCountriesWhereServiceIsLegal(service: keyof ServiceLegalityInfo): CountryRegulation[] {
  return COUNTRY_REGULATIONS.filter(r => r.services[service] === 'legal');
}

/**
 * Get country count
 */
export function getCountryCount(): number {
  return COUNTRY_REGULATIONS.length;
}
