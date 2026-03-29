/**
 * Adult Industry Manufacturing & Distribution Facilities Data
 * 
 * European manufacturing plants, assembly centers, and distribution hubs
 * for the adult products industry.
 */

/** Facility type categories */
export type FacilityType = 'manufacturing' | 'assembly' | 'distribution';

/** Factory/Facility definition */
export interface Factory {
  /** Unique identifier */
  id: string;
  /** Facility name */
  name: string;
  /** Owner brand (if applicable) */
  owner?: string;
  /** Country */
  country: string;
  /** City */
  city: string;
  /** Coordinates [longitude, latitude] */
  coordinates: [number, number];
  /** Facility type */
  type: FacilityType;
  /** Products manufactured/handled */
  products?: string[];
  /** Estimated employee count */
  employees?: number;
  /** Year established */
  established?: number;
  /** Website */
  website?: string;
  /** Notes */
  notes?: string;
}

/** Color mapping for facility types */
export const FACILITY_TYPE_COLORS: Record<FacilityType, string> = {
  'manufacturing': '#8B5CF6',  // Purple
  'assembly': '#F59E0B',       // Amber
  'distribution': '#10B981',   // Emerald
};

/** Icon mapping for facility types */
export const FACILITY_TYPE_ICONS: Record<FacilityType, string> = {
  'manufacturing': '🏭',
  'assembly': '🔧',
  'distribution': '📦',
};

/** Label mapping for facility types */
export const FACILITY_TYPE_LABELS: Record<FacilityType, string> = {
  'manufacturing': 'Manufacturing',
  'assembly': 'Assembly',
  'distribution': 'Distribution',
};

/**
 * European adult industry facilities dataset
 * 
 * Focus areas:
 * - German manufacturing (premium silicone products)
 * - EU distribution centers
 * - Quality control facilities
 */
export const FACTORIES: Factory[] = [
  // ============ GERMANY - Manufacturing Hub ============
  {
    id: 'fun-factory-bremen',
    name: 'Fun Factory Production',
    owner: 'Fun Factory',
    country: 'Germany',
    city: 'Bremen',
    coordinates: [8.8017, 53.0793],
    type: 'manufacturing',
    products: ['Silicone vibrators', 'Premium toys'],
    employees: 200,
    established: 1996,
    website: 'https://www.funfactory.com',
    notes: 'Made in Germany, premium silicone manufacturing',
  },
  {
    id: 'satisfyer-bielefeld',
    name: 'Satisfyer HQ & Production',
    owner: 'Satisfyer',
    country: 'Germany',
    city: 'Bielefeld',
    coordinates: [8.5333, 52.0333],
    type: 'manufacturing',
    products: ['Air pulse toys', 'Vibrators'],
    employees: 300,
    established: 2016,
    website: 'https://www.satisfyer.com',
    notes: 'Global headquarters and R&D center',
  },
  {
    id: 'womanizer-berlin',
    name: 'Womanizer Development Center',
    owner: 'Womanizer / WOW Tech',
    country: 'Germany',
    city: 'Berlin',
    coordinates: [13.405, 52.52],
    type: 'manufacturing',
    products: ['Pleasure Air technology'],
    employees: 150,
    established: 2014,
    website: 'https://www.womanizer.com',
    notes: 'Inventor of Pleasure Air technology',
  },
  {
    id: 'orion-flensburg',
    name: 'ORION Versand',
    owner: 'ORION',
    country: 'Germany',
    city: 'Flensburg',
    coordinates: [9.4367, 54.7833],
    type: 'distribution',
    products: ['Full product range'],
    employees: 500,
    established: 1981,
    website: 'https://www.orion.de',
    notes: 'One of Europe largest adult product distributors',
  },
  {
    id: 'eis-de-distribution',
    name: 'EIS GmbH Distribution',
    owner: 'EIS',
    country: 'Germany',
    city: 'Potsdam',
    coordinates: [13.0667, 52.4],
    type: 'distribution',
    products: ['E-commerce fulfillment'],
    employees: 200,
    established: 2006,
    website: 'https://www.eis.de',
  },
  {
    id: 'beate-uhse-distribution',
    name: 'Beate Uhse Logistics',
    owner: 'Beate Uhse',
    country: 'Germany',
    city: 'Flensburg',
    coordinates: [9.4200, 54.7900],
    type: 'distribution',
    products: ['Retail and wholesale'],
    employees: 150,
    established: 1962,
    notes: 'Pioneer of European adult retail',
  },
  {
    id: 'joydivision-hannover',
    name: 'JoyDivision Production',
    owner: 'JoyDivision',
    country: 'Germany',
    city: 'Hannover',
    coordinates: [9.7320, 52.3759],
    type: 'manufacturing',
    products: ['Lubricants', 'Cosmetics', 'Toys'],
    employees: 100,
    established: 1994,
    website: 'https://www.joydivision.de',
    notes: 'German quality lubricants and cosmetics',
  },
  {
    id: 'pjur-wasserbillig',
    name: 'pjur Production',
    owner: 'pjur group',
    country: 'Luxembourg',
    city: 'Wasserbillig',
    coordinates: [6.5014, 49.7156],
    type: 'manufacturing',
    products: ['Silicone lubricants', 'Personal care'],
    employees: 80,
    established: 1995,
    website: 'https://www.pjur.com',
    notes: 'Premium lubricant manufacturer',
  },

  // ============ NETHERLANDS ============
  {
    id: 'eropartner-veendam',
    name: 'Eropartner Distribution',
    owner: 'Eropartner',
    country: 'Netherlands',
    city: 'Veendam',
    coordinates: [6.8789, 53.1078],
    type: 'distribution',
    products: ['B2B wholesale distribution'],
    employees: 100,
    established: 1992,
    website: 'https://www.eropartner.com',
    notes: 'Major European B2B distributor',
  },
  {
    id: 'shots-media-veendam',
    name: 'Shots Media',
    owner: 'Shots',
    country: 'Netherlands',
    city: 'Veendam',
    coordinates: [6.8700, 53.1100],
    type: 'distribution',
    products: ['Licensed brands', 'Own brands'],
    employees: 150,
    established: 1993,
    website: 'https://www.shots.nl',
    notes: 'Major wholesaler and brand owner',
  },
  {
    id: 'edc-veenendaal',
    name: 'EDC Wholesale',
    owner: 'EDC',
    country: 'Netherlands',
    city: 'Veenendaal',
    coordinates: [5.5500, 52.0167],
    type: 'distribution',
    products: ['Wholesale distribution'],
    employees: 200,
    established: 1979,
    website: 'https://www.edcwholesale.com',
    notes: 'One of Europe oldest distributors',
  },
  {
    id: 'scala-almere',
    name: 'Scala Playhouse',
    owner: 'Scala',
    country: 'Netherlands',
    city: 'Almere',
    coordinates: [5.2647, 52.3508],
    type: 'distribution',
    products: ['B2B wholesale'],
    employees: 80,
    established: 1972,
    website: 'https://www.scalaplayhouse.com',
  },

  // ============ UK ============
  {
    id: 'lovehoney-bath',
    name: 'Lovehoney HQ & Warehouse',
    owner: 'Lovehoney',
    country: 'United Kingdom',
    city: 'Bath',
    coordinates: [-2.3599, 51.3811],
    type: 'distribution',
    products: ['E-commerce fulfillment', 'Own brands'],
    employees: 400,
    established: 2002,
    website: 'https://www.lovehoney.com',
    notes: 'UK largest online adult retailer',
  },
  {
    id: 'ann-summers-distribution',
    name: 'Ann Summers Distribution',
    owner: 'Ann Summers',
    country: 'United Kingdom',
    city: 'Whyteleafe',
    coordinates: [-0.0789, 51.3100],
    type: 'distribution',
    products: ['Lingerie', 'Toys', 'Accessories'],
    employees: 300,
    established: 1970,
    website: 'https://www.annsummers.com',
  },
  {
    id: 'net-1on1-distribution',
    name: 'Net 1on1 Distribution',
    owner: 'Net 1on1',
    country: 'United Kingdom',
    city: 'Tamworth',
    coordinates: [-1.6942, 52.6333],
    type: 'distribution',
    products: ['B2B wholesale'],
    employees: 50,
    established: 2002,
    website: 'https://www.net1on1.com',
  },

  // ============ SPAIN ============
  {
    id: 'fleshlight-madrid',
    name: 'Fleshlight Europe',
    owner: 'Fleshlight',
    country: 'Spain',
    city: 'Madrid',
    coordinates: [-3.7038, 40.4168],
    type: 'distribution',
    products: ['Male masturbators'],
    employees: 50,
    website: 'https://www.fleshlight.eu',
    notes: 'European distribution hub',
  },
  {
    id: 'diverty-sex-barcelona',
    name: 'Diverty Sex Distribution',
    owner: 'Diverty Sex',
    country: 'Spain',
    city: 'Barcelona',
    coordinates: [2.1734, 41.3851],
    type: 'distribution',
    products: ['B2B wholesale Spain'],
    employees: 40,
    established: 1998,
  },

  // ============ FRANCE ============
  {
    id: 'concorde-distribution',
    name: 'Concorde Distribution',
    owner: 'Concorde',
    country: 'France',
    city: 'Paris',
    coordinates: [2.3522, 48.8566],
    type: 'distribution',
    products: ['French market distribution'],
    employees: 60,
    established: 1986,
  },

  // ============ POLAND ============
  {
    id: 'ami-distribution-poland',
    name: 'AMI Distribution',
    owner: 'AMI',
    country: 'Poland',
    city: 'Warsaw',
    coordinates: [21.0122, 52.2297],
    type: 'distribution',
    products: ['Eastern Europe distribution'],
    employees: 40,
    established: 2003,
  },

  // ============ AUSTRIA ============
  {
    id: 'hot-production-austria',
    name: 'HOT Production',
    owner: 'HOT',
    country: 'Austria',
    city: 'Graz',
    coordinates: [15.4395, 47.0707],
    type: 'manufacturing',
    products: ['Lubricants', 'Cosmetics'],
    employees: 50,
    established: 1988,
    website: 'https://www.hot-dl.com',
    notes: 'Austrian lubricant manufacturer',
  },

  // ============ SWEDEN ============
  {
    id: 'lelo-stockholm',
    name: 'LELO Design Center',
    owner: 'LELO',
    country: 'Sweden',
    city: 'Stockholm',
    coordinates: [18.0686, 59.3293],
    type: 'assembly',
    products: ['Luxury vibrators', 'Premium toys'],
    employees: 100,
    established: 2003,
    website: 'https://www.lelo.com',
    notes: 'Swedish design, luxury segment',
  },

  // ============ SWITZERLAND ============
  {
    id: 'we-vibe-ottawa-eu',
    name: 'We-Vibe EU Distribution',
    owner: 'We-Vibe / WOW Tech',
    country: 'Switzerland',
    city: 'Zurich',
    coordinates: [8.5417, 47.3769],
    type: 'distribution',
    products: ['Couples toys', 'App-controlled devices'],
    employees: 30,
    website: 'https://www.we-vibe.com',
  },
];

/**
 * Get all factories sorted by country
 */
export function getFactoriesSortedByCountry(): Factory[] {
  return [...FACTORIES].sort((a, b) => a.country.localeCompare(b.country));
}

/**
 * Get factories by type
 */
export function getFactoriesByType(type: FacilityType): Factory[] {
  return FACTORIES.filter(f => f.type === type);
}

/**
 * Get factories by country
 */
export function getFactoriesByCountry(country: string): Factory[] {
  return FACTORIES.filter(f => 
    f.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Get factories by owner brand
 */
export function getFactoriesByOwner(owner: string): Factory[] {
  return FACTORIES.filter(f => 
    f.owner?.toLowerCase().includes(owner.toLowerCase())
  );
}

/**
 * Get factory by ID
 */
export function getFactoryById(id: string): Factory | undefined {
  return FACTORIES.find(f => f.id === id);
}

/**
 * Get unique countries with facilities
 */
export function getFactoryCountries(): string[] {
  return [...new Set(FACTORIES.map(f => f.country))].sort();
}

/**
 * Get unique owner brands
 */
export function getFactoryOwners(): string[] {
  return [...new Set(FACTORIES.filter(f => f.owner).map(f => f.owner as string))].sort();
}

/**
 * Get total employee count estimate
 */
export function getTotalEmployeeEstimate(): number {
  return FACTORIES.reduce((sum, f) => sum + (f.employees ?? 0), 0);
}
