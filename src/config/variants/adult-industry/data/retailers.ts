/**
 * Adult Industry Retailer Locations Data
 * 
 * Contains 30+ major adult product retailers across Europe with their
 * headquarters locations, store types, and metadata.
 */

/** Retailer type categories */
export type RetailerType = 'chain' | 'independent' | 'online-only';

/** Adult industry retailer data structure */
export interface AdultRetailer {
  /** Unique identifier */
  id: string;
  /** Retailer name */
  name: string;
  /** Country of headquarters */
  country: string;
  /** City of headquarters */
  city: string;
  /** Coordinates [longitude, latitude] */
  coordinates: [number, number];
  /** Retailer type */
  type: RetailerType;
  /** Number of physical stores (for chains) */
  storeCount?: number;
  /** Year founded (optional) */
  founded?: number;
  /** Official website (optional) */
  website?: string;
  /** Brief description (optional) */
  description?: string;
}

/**
 * Major adult product retailers with European presence
 * Organized by country for easier maintenance
 */
export const ADULT_RETAILERS: AdultRetailer[] = [
  // ============ GERMANY ============
  {
    id: 'beate-uhse',
    name: 'Beate Uhse',
    country: 'Germany',
    city: 'Flensburg',
    coordinates: [9.4333, 54.7833],
    type: 'chain',
    storeCount: 50,
    founded: 1946,
    website: 'https://www.beate-uhse.com',
    description: 'Pioneer of European erotic retail',
  },
  {
    id: 'orion-retail',
    name: 'ORION',
    country: 'Germany',
    city: 'Flensburg',
    coordinates: [9.4469, 54.7937],
    type: 'chain',
    storeCount: 150,
    founded: 1981,
    website: 'https://www.orion.de',
    description: 'Major European distributor and retailer',
  },
  {
    id: 'amorelie',
    name: 'Amorelie',
    country: 'Germany',
    city: 'Berlin',
    coordinates: [13.405, 52.52],
    type: 'online-only',
    founded: 2013,
    website: 'https://www.amorelie.de',
    description: 'Premium online love shop',
  },
  {
    id: 'eis-de',
    name: 'EIS.de',
    country: 'Germany',
    city: 'Nuremberg',
    coordinates: [11.0767, 49.4521],
    type: 'online-only',
    founded: 2006,
    website: 'https://www.eis.de',
    description: 'Major German online retailer',
  },
  {
    id: 'fun-factory-store',
    name: 'Fun Factory Store',
    country: 'Germany',
    city: 'Bremen',
    coordinates: [8.8017, 53.0793],
    type: 'independent',
    founded: 1996,
    website: 'https://www.funfactory.com',
    description: 'Brand flagship store',
  },
  {
    id: 'pabo-de',
    name: 'Pabo Germany',
    country: 'Germany',
    city: 'Munich',
    coordinates: [11.5820, 48.1351],
    type: 'online-only',
    founded: 1995,
    website: 'https://www.pabo.de',
    description: 'Online adult retailer',
  },
  {
    id: 'venus-berlin-store',
    name: 'Venus Store Berlin',
    country: 'Germany',
    city: 'Berlin',
    coordinates: [13.38, 52.51],
    type: 'independent',
    founded: 2010,
    description: 'Associated with Venus trade fair',
  },

  // ============ UNITED KINGDOM ============
  {
    id: 'ann-summers',
    name: 'Ann Summers',
    country: 'United Kingdom',
    city: 'Whyteleafe',
    coordinates: [-0.0776, 51.3074],
    type: 'chain',
    storeCount: 140,
    founded: 1970,
    website: 'https://www.annsummers.com',
    description: 'UK lingerie and toy retailer',
  },
  {
    id: 'lovehoney-uk',
    name: 'Lovehoney',
    country: 'United Kingdom',
    city: 'Bath',
    coordinates: [-2.3590, 51.3811],
    type: 'online-only',
    founded: 2002,
    website: 'https://www.lovehoney.co.uk',
    description: 'Leading online sexual wellness retailer',
  },
  {
    id: 'bondara',
    name: 'Bondara',
    country: 'United Kingdom',
    city: 'Nottingham',
    coordinates: [-1.1581, 52.9548],
    type: 'online-only',
    founded: 2005,
    website: 'https://www.bondara.co.uk',
    description: 'Online adult retailer',
  },
  {
    id: 'simply-pleasure',
    name: 'Simply Pleasure',
    country: 'United Kingdom',
    city: 'Birmingham',
    coordinates: [-1.8904, 52.4862],
    type: 'chain',
    storeCount: 15,
    founded: 1984,
    website: 'https://www.simplypleasure.com',
    description: 'Adult retail chain',
  },
  {
    id: 'nice-n-naughty',
    name: 'Nice \'n\' Naughty',
    country: 'United Kingdom',
    city: 'Manchester',
    coordinates: [-2.2426, 53.4808],
    type: 'chain',
    storeCount: 8,
    founded: 1990,
    website: 'https://www.nicennaughty.co.uk',
    description: 'Northern England retail chain',
  },
  {
    id: 'sh-womens',
    name: 'Sh! Women\'s Store',
    country: 'United Kingdom',
    city: 'London',
    coordinates: [-0.0894, 51.5245],
    type: 'independent',
    founded: 1992,
    website: 'https://www.sh-womenstore.com',
    description: 'Women-focused erotic boutique',
  },
  {
    id: 'coco-de-mer-store',
    name: 'Coco de Mer',
    country: 'United Kingdom',
    city: 'London',
    coordinates: [-0.1369, 51.5118],
    type: 'independent',
    founded: 2001,
    website: 'https://www.coco-de-mer.com',
    description: 'Luxury erotic emporium',
  },

  // ============ FRANCE ============
  {
    id: 'passage-du-desir',
    name: 'Passage du Désir',
    country: 'France',
    city: 'Paris',
    coordinates: [2.3775, 48.8802],
    type: 'chain',
    storeCount: 8,
    founded: 2006,
    website: 'https://www.passagedudesir.fr',
    description: 'French erotic boutique chain',
  },
  {
    id: 'dorcel-store',
    name: 'Dorcel Store',
    country: 'France',
    city: 'Paris',
    coordinates: [2.2945, 48.8738],
    type: 'independent',
    founded: 2010,
    website: 'https://www.dorcelstore.com',
    description: 'Marc Dorcel brand store',
  },
  {
    id: 'sexy-avenue',
    name: 'Sexy Avenue',
    country: 'France',
    city: 'Paris',
    coordinates: [2.35, 48.87],
    type: 'online-only',
    founded: 2005,
    website: 'https://www.sexy-avenue.com',
    description: 'French online retailer',
  },
  {
    id: 'oh-my-god',
    name: 'Oh My God\'Z',
    country: 'France',
    city: 'Lyon',
    coordinates: [4.8357, 45.7640],
    type: 'chain',
    storeCount: 3,
    founded: 2012,
    description: 'French boutique chain',
  },

  // ============ NETHERLANDS ============
  {
    id: 'christine-le-duc',
    name: 'Christine le Duc',
    country: 'Netherlands',
    city: 'Rotterdam',
    coordinates: [4.4777, 51.9244],
    type: 'chain',
    storeCount: 12,
    founded: 1982,
    website: 'https://www.christineleduc.nl',
    description: 'Dutch erotic retail chain',
  },
  {
    id: 'pabo-nl',
    name: 'Pabo',
    country: 'Netherlands',
    city: 'Almere',
    coordinates: [5.2647, 52.3508],
    type: 'online-only',
    founded: 1989,
    website: 'https://www.pabo.nl',
    description: 'Leading Dutch online retailer',
  },
  {
    id: 'edc-retail',
    name: 'EDC Retail',
    country: 'Netherlands',
    city: 'Veenendaal',
    coordinates: [5.5549, 52.0268],
    type: 'online-only',
    founded: 2002,
    website: 'https://www.edcinternet.com',
    description: 'Major online retailer and wholesaler',
  },
  {
    id: 'mail-and-female',
    name: 'Mail & Female',
    country: 'Netherlands',
    city: 'Amsterdam',
    coordinates: [4.8936, 52.3680],
    type: 'independent',
    founded: 1985,
    website: 'https://www.mailandfemale.com',
    description: 'Women-focused boutique',
  },

  // ============ SPAIN ============
  {
    id: 'platanomelon',
    name: 'Platanomelon',
    country: 'Spain',
    city: 'Barcelona',
    coordinates: [2.1734, 41.3851],
    type: 'online-only',
    founded: 2014,
    website: 'https://www.platanomelon.com',
    description: 'Spanish online sexual wellness',
  },
  {
    id: 'diversual',
    name: 'Diversual',
    country: 'Spain',
    city: 'Madrid',
    coordinates: [-3.7038, 40.4168],
    type: 'online-only',
    founded: 2006,
    website: 'https://www.diversual.com',
    description: 'Spanish online retailer',
  },
  {
    id: 'erotic-feel',
    name: 'Erotic Feel',
    country: 'Spain',
    city: 'Valencia',
    coordinates: [-0.3763, 39.4699],
    type: 'chain',
    storeCount: 5,
    founded: 2008,
    description: 'Spanish retail chain',
  },

  // ============ ITALY ============
  {
    id: 'mysecretcase',
    name: 'MySecretCase',
    country: 'Italy',
    city: 'Milan',
    coordinates: [9.1900, 45.4642],
    type: 'online-only',
    founded: 2014,
    website: 'https://www.mysecretcase.com',
    description: 'Italian sexual wellness platform',
  },
  {
    id: 'vibrolandia',
    name: 'Vibrolandia',
    country: 'Italy',
    city: 'Rome',
    coordinates: [12.4964, 41.9028],
    type: 'online-only',
    founded: 2010,
    website: 'https://www.vibrolandia.it',
    description: 'Italian online retailer',
  },

  // ============ DENMARK ============
  {
    id: 'sinful-dk',
    name: 'Sinful',
    country: 'Denmark',
    city: 'Copenhagen',
    coordinates: [12.5683, 55.6761],
    type: 'online-only',
    founded: 2008,
    website: 'https://www.sinful.dk',
    description: 'Scandinavian online retailer',
  },
  {
    id: 'lust',
    name: 'Lust',
    country: 'Denmark',
    city: 'Copenhagen',
    coordinates: [12.57, 55.68],
    type: 'independent',
    founded: 2006,
    website: 'https://www.lust.dk',
    description: 'Copenhagen erotic boutique',
  },

  // ============ SWEDEN ============
  {
    id: 'kinkly-shop',
    name: 'Kinkly Shop',
    country: 'Sweden',
    city: 'Stockholm',
    coordinates: [18.0686, 59.3293],
    type: 'online-only',
    founded: 2015,
    description: 'Swedish online retailer',
  },
  {
    id: 'lelo-store-stockholm',
    name: 'LELO Store Stockholm',
    country: 'Sweden',
    city: 'Stockholm',
    coordinates: [18.07, 59.33],
    type: 'independent',
    founded: 2010,
    website: 'https://www.lelo.com',
    description: 'LELO brand flagship store',
  },

  // ============ POLAND ============
  {
    id: 'sexshop365',
    name: 'Sexshop 365',
    country: 'Poland',
    city: 'Warsaw',
    coordinates: [21.0122, 52.2297],
    type: 'online-only',
    founded: 2008,
    description: 'Polish online retailer',
  },
  {
    id: 'erotica-24',
    name: 'Erotica24',
    country: 'Poland',
    city: 'Krakow',
    coordinates: [19.9450, 50.0647],
    type: 'online-only',
    founded: 2010,
    description: 'Polish online shop',
  },

  // ============ AUSTRIA ============
  {
    id: 'joyclub-shop',
    name: 'JoyClub Shop',
    country: 'Austria',
    city: 'Vienna',
    coordinates: [16.3738, 48.2082],
    type: 'online-only',
    founded: 2012,
    description: 'Austrian online retailer',
  },

  // ============ SWITZERLAND ============
  {
    id: 'magic-x',
    name: 'Magic X',
    country: 'Switzerland',
    city: 'Zurich',
    coordinates: [8.5417, 47.3769],
    type: 'chain',
    storeCount: 6,
    founded: 1992,
    website: 'https://www.magicx.ch',
    description: 'Swiss erotic retail chain',
  },

  // ============ BELGIUM ============
  {
    id: 'xshop',
    name: 'Xshop Belgium',
    country: 'Belgium',
    city: 'Brussels',
    coordinates: [4.3517, 50.8503],
    type: 'chain',
    storeCount: 4,
    founded: 2000,
    description: 'Belgian adult retail chain',
  },
];

/** Get retailers filtered by type */
export function getRetailersByType(type: RetailerType): AdultRetailer[] {
  return ADULT_RETAILERS.filter(retailer => retailer.type === type);
}

/** Get retailers filtered by country */
export function getRetailersByCountry(country: string): AdultRetailer[] {
  return ADULT_RETAILERS.filter(retailer => retailer.country === country);
}

/** Get all unique countries with retailers */
export function getRetailerCountries(): string[] {
  return [...new Set(ADULT_RETAILERS.map(retailer => retailer.country))].sort();
}

/** Get total store count for all chains */
export function getTotalStoreCount(): number {
  return ADULT_RETAILERS
    .filter(r => r.type === 'chain' && r.storeCount)
    .reduce((sum, r) => sum + (r.storeCount ?? 0), 0);
}

/** Retailer type display config */
export const RETAILER_TYPE_CONFIG: Record<RetailerType, { label: string; color: string; icon: string }> = {
  chain: { label: 'Retail Chain', color: '#3498DB', icon: '🏬' },
  independent: { label: 'Independent Store', color: '#9B59B6', icon: '🏪' },
  'online-only': { label: 'Online Only', color: '#2ECC71', icon: '🌐' },
};
