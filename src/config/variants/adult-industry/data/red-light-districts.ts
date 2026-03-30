/**
 * Red Light Districts Data
 *
 * Famous red light districts across Europe with detailed information.
 * Data source: https://eurosexscene.com/red-light-districts/
 */

export interface RedLightDistrict {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  type: 'windows' | 'street' | 'clubs' | 'mixed';
  description: string;
  legalStatus: 'fully-legal' | 'tolerated' | 'grey-area';
  tips?: string[];
  famousFor?: string;
  openHours?: string;
  sourceUrl?: string;
}

/**
 * Red Light Districts across Europe
 */
export const RED_LIGHT_DISTRICTS: RedLightDistrict[] = [
  // Netherlands
  {
    id: 'de-wallen',
    name: 'De Wallen',
    city: 'Amsterdam',
    country: 'Netherlands',
    coordinates: [4.8996, 52.3738],
    type: 'windows',
    description:
      "Amsterdam's famous red light district, the largest and most well-known in the world. Features window prostitution in historic canal houses.",
    legalStatus: 'fully-legal',
    famousFor: 'Window prostitution, coffee shops, live shows',
    openHours: '11:00 - 03:00',
    tips: [
      'Do not photograph the windows',
      'Respect the workers',
      'Watch out for pickpockets',
    ],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/amsterdam/',
  },
  {
    id: 'wallen-singel',
    name: 'Singelgebied',
    city: 'Amsterdam',
    country: 'Netherlands',
    coordinates: [4.8912, 52.3751],
    type: 'windows',
    description:
      'Secondary red light area in Amsterdam along the Singel canal with window prostitution.',
    legalStatus: 'fully-legal',
    famousFor: 'Window prostitution, quieter than De Wallen',
    openHours: '12:00 - 02:00',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/amsterdam/',
  },
  {
    id: 'rotterdam-katendrecht',
    name: 'Katendrecht',
    city: 'Rotterdam',
    country: 'Netherlands',
    coordinates: [4.4867, 51.9025],
    type: 'mixed',
    description:
      "Rotterdam's historic red light district on the Katendrecht peninsula, now largely gentrified.",
    legalStatus: 'fully-legal',
    famousFor: 'Historic sailor district, now hip neighborhood',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/rotterdam/',
  },

  // Germany
  {
    id: 'reeperbahn',
    name: 'Reeperbahn',
    city: 'Hamburg',
    country: 'Germany',
    coordinates: [9.9626, 53.5496],
    type: 'mixed',
    description:
      "Hamburg's famous sin mile, known as 'the most sinful mile' in the world. Features clubs, bars, and the Herbertstraße.",
    legalStatus: 'fully-legal',
    famousFor: 'Herbertstraße, strip clubs, nightlife',
    openHours: '24/7',
    tips: [
      'Herbertstraße has restricted entry',
      'Many tourist-friendly venues',
      'Safe area with police presence',
    ],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/hamburg/',
  },
  {
    id: 'herbertstrasse',
    name: 'Herbertstraße',
    city: 'Hamburg',
    country: 'Germany',
    coordinates: [9.9618, 53.5498],
    type: 'windows',
    description:
      'Famous window prostitution street in Hamburg, accessible only to men over 18. Part of the Reeperbahn area.',
    legalStatus: 'fully-legal',
    famousFor: 'Window prostitution, metal barriers at entrances',
    openHours: '12:00 - 06:00',
    tips: ['No women or minors allowed', 'No photography'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/hamburg/',
  },
  {
    id: 'bahnhofsviertel',
    name: 'Bahnhofsviertel',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: [8.6659, 50.1072],
    type: 'mixed',
    description:
      "Frankfurt's red light district near the main train station. Mix of traditional red light establishments and modern gentrification.",
    legalStatus: 'fully-legal',
    famousFor: 'Street prostitution, eros centers, diverse nightlife',
    openHours: '24/7',
    tips: ['Exercise caution at night', 'Drug scene present'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/frankfurt/',
  },
  {
    id: 'koenigsallee-duesseldorf',
    name: 'Altstadt',
    city: 'Düsseldorf',
    country: 'Germany',
    coordinates: [6.7735, 51.2277],
    type: 'clubs',
    description:
      "Düsseldorf's old town area with numerous clubs and bars, known as 'the longest bar in the world'.",
    legalStatus: 'fully-legal',
    famousFor: '300+ bars and clubs, active nightlife',
    openHours: '18:00 - 05:00',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/dusseldorf/',
  },
  {
    id: 'karolinenviertel',
    name: 'Karolinenviertel',
    city: 'Hamburg',
    country: 'Germany',
    coordinates: [9.9667, 53.5583],
    type: 'mixed',
    description:
      'Alternative neighborhood in Hamburg with mix of adult venues and trendy bars.',
    legalStatus: 'fully-legal',
    famousFor: 'Alternative scene, sex shops, bars',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/hamburg/',
  },

  // Belgium
  {
    id: 'schipperskwartier',
    name: 'Schipperskwartier',
    city: 'Antwerp',
    country: 'Belgium',
    coordinates: [4.4049, 51.2277],
    type: 'windows',
    description:
      "Antwerp's official red light district near the port. Well-organized window prostitution area.",
    legalStatus: 'tolerated',
    famousFor: 'Window prostitution, clean and organized',
    openHours: '10:00 - 04:00',
    tips: ['Well-lit and safe', 'Photography prohibited'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/antwerp/',
  },
  {
    id: 'rue-daerschot',
    name: "Rue d'Aerschot",
    city: 'Brussels',
    country: 'Belgium',
    coordinates: [4.3598, 50.8604],
    type: 'windows',
    description:
      "Brussels' main red light street near Gare du Nord. Window prostitution in a concentrated area.",
    legalStatus: 'tolerated',
    famousFor: 'Window prostitution near train station',
    openHours: '11:00 - 03:00',
    tips: ['Near North Station', 'Busy tourist area'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/brussels/',
  },

  // France
  {
    id: 'pigalle',
    name: 'Pigalle',
    city: 'Paris',
    country: 'France',
    coordinates: [2.3376, 48.8822],
    type: 'clubs',
    description:
      "Paris's famous adult entertainment district at the foot of Montmartre. Home to the Moulin Rouge.",
    legalStatus: 'grey-area',
    famousFor: 'Moulin Rouge, cabarets, strip clubs',
    openHours: '20:00 - 06:00',
    tips: ['Tourist prices can be high', 'Beware of scams', 'Moulin Rouge requires booking'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/paris/',
  },
  {
    id: 'rue-saint-denis',
    name: 'Rue Saint-Denis',
    city: 'Paris',
    country: 'France',
    coordinates: [2.3492, 48.8641],
    type: 'street',
    description:
      'Historic street prostitution area in central Paris, one of the oldest in Europe.',
    legalStatus: 'grey-area',
    famousFor: 'Street prostitution, sex shops, peep shows',
    openHours: '22:00 - 04:00',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/paris/',
  },

  // UK
  {
    id: 'soho',
    name: 'Soho',
    city: 'London',
    country: 'United Kingdom',
    coordinates: [-0.1337, 51.5138],
    type: 'clubs',
    description:
      "London's historic entertainment district. Much cleaned up but still has adult venues and clubs.",
    legalStatus: 'grey-area',
    famousFor: 'Strip clubs, LGBTQ+ scene, nightlife',
    openHours: '18:00 - 03:00',
    tips: ['Mostly legal clubs', 'Very touristy', 'Expensive'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/london/',
  },

  // Spain
  {
    id: 'barrio-chino',
    name: 'El Raval (Barrio Chino)',
    city: 'Barcelona',
    country: 'Spain',
    coordinates: [2.1699, 41.3797],
    type: 'mixed',
    description:
      "Barcelona's historic red light district, now largely gentrified but still has adult venues.",
    legalStatus: 'grey-area',
    famousFor: 'Historic district, bars, clubs',
    openHours: '22:00 - 06:00',
    tips: ['Much safer than before', 'Watch belongings', 'La Rambla nearby'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/barcelona/',
  },
  {
    id: 'casa-de-campo',
    name: 'Casa de Campo',
    city: 'Madrid',
    country: 'Spain',
    coordinates: [-3.7493, 40.4168],
    type: 'street',
    description: "Madrid's main street prostitution area in the large Casa de Campo park.",
    legalStatus: 'grey-area',
    famousFor: 'Street prostitution in park area',
    openHours: '22:00 - 06:00',
    tips: ['Not a tourist area', 'Exercise caution'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/madrid/',
  },

  // Czech Republic
  {
    id: 'wenceslas-square',
    name: 'Wenceslas Square Area',
    city: 'Prague',
    country: 'Czech Republic',
    coordinates: [14.4267, 50.0814],
    type: 'clubs',
    description:
      "Prague's main nightlife and adult entertainment area around Wenceslas Square.",
    legalStatus: 'tolerated',
    famousFor: 'Strip clubs, nightclubs, massage parlors',
    openHours: '20:00 - 06:00',
    tips: ['Watch for tourist traps', 'Agree prices beforehand', 'Popular stag destination'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/prague/',
  },

  // Switzerland
  {
    id: 'langstrasse',
    name: 'Langstrasse',
    city: 'Zurich',
    country: 'Switzerland',
    coordinates: [8.5273, 47.3774],
    type: 'mixed',
    description:
      "Zurich's red light and nightlife district. Mix of clubs, bars, and adult venues.",
    legalStatus: 'fully-legal',
    famousFor: 'Nightlife, clubs, legal prostitution',
    openHours: '20:00 - 05:00',
    tips: ['Very expensive', 'Safe area', 'Clean and regulated'],
    sourceUrl: 'https://eurosexscene.com/red-light-districts/zurich/',
  },

  // Austria
  {
    id: 'gurtel',
    name: 'Gürtel',
    city: 'Vienna',
    country: 'Austria',
    coordinates: [16.3523, 48.2088],
    type: 'mixed',
    description:
      "Vienna's main red light area along the Gürtel ring road. Legal and regulated.",
    legalStatus: 'fully-legal',
    famousFor: 'Legal brothels, bars, clubs',
    openHours: '18:00 - 06:00',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/vienna/',
  },

  // Greece
  {
    id: 'metaxourgeio',
    name: 'Metaxourgeio',
    city: 'Athens',
    country: 'Greece',
    coordinates: [23.7203, 37.9876],
    type: 'mixed',
    description:
      "Athens' red light district, mix of legal brothels and street activity.",
    legalStatus: 'tolerated',
    famousFor: 'Legal brothels, street scene',
    openHours: '20:00 - 04:00',
    sourceUrl: 'https://eurosexscene.com/red-light-districts/athens/',
  },
];

/**
 * Get red light district by ID
 */
export function getRedLightDistrictById(id: string): RedLightDistrict | undefined {
  return RED_LIGHT_DISTRICTS.find((d) => d.id === id);
}

/**
 * Get red light districts by country
 */
export function getRedLightDistrictsByCountry(country: string): RedLightDistrict[] {
  return RED_LIGHT_DISTRICTS.filter(
    (d) => d.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Get red light districts by city
 */
export function getRedLightDistrictsByCity(city: string): RedLightDistrict[] {
  return RED_LIGHT_DISTRICTS.filter(
    (d) => d.city.toLowerCase() === city.toLowerCase()
  );
}

/**
 * Get red light districts by type
 */
export function getRedLightDistrictsByType(
  type: RedLightDistrict['type']
): RedLightDistrict[] {
  return RED_LIGHT_DISTRICTS.filter((d) => d.type === type);
}

/**
 * Get statistics about red light districts
 */
export function getRedLightDistrictStats(): {
  total: number;
  byCountry: Record<string, number>;
  byType: Record<string, number>;
  byLegalStatus: Record<string, number>;
} {
  const byCountry: Record<string, number> = {};
  const byType: Record<string, number> = {};
  const byLegalStatus: Record<string, number> = {};

  for (const district of RED_LIGHT_DISTRICTS) {
    byCountry[district.country] = (byCountry[district.country] || 0) + 1;
    byType[district.type] = (byType[district.type] || 0) + 1;
    byLegalStatus[district.legalStatus] =
      (byLegalStatus[district.legalStatus] || 0) + 1;
  }

  return {
    total: RED_LIGHT_DISTRICTS.length,
    byCountry,
    byType,
    byLegalStatus,
  };
}
