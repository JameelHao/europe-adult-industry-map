/**
 * FKK Clubs Data
 *
 * German-style nude sauna clubs (Freikörperkultur) primarily in
 * Germany, Austria, and Switzerland.
 * Data source: https://eurosexscene.com/fkk-germany-what-to-expect-at-a-sauna-club/
 */

export interface FKKClub {
  id: string;
  name: string;
  city: string;
  country: string;
  coordinates: [number, number]; // [longitude, latitude]
  website?: string;
  priceRange: '€' | '€€' | '€€€';
  features: string[];
  rating?: number; // 1-5
  description?: string;
  openHours?: string;
}

/**
 * FKK Clubs across Germany, Austria, and Switzerland
 */
export const FKK_CLUBS: FKKClub[] = [
  // Germany - Frankfurt Area
  {
    id: 'fkk-oase',
    name: 'FKK Oase',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: [8.6821, 50.1109],
    website: 'https://www.fkk-oase.de',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'garden'],
    rating: 4.5,
    description: 'One of the most famous FKK clubs in Germany with luxurious facilities.',
    openHours: '11:00 - 04:00',
  },
  {
    id: 'mainhattan',
    name: 'Mainhattan',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: [8.6756, 50.1047],
    website: 'https://www.mainhattan.de',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'wellness'],
    rating: 4.3,
    description: 'Premium FKK club with excellent spa facilities.',
    openHours: '12:00 - 05:00',
  },
  {
    id: 'fkk-sharks',
    name: 'FKK Sharks',
    city: 'Darmstadt',
    country: 'Germany',
    coordinates: [8.6512, 49.8728],
    website: 'https://www.fkk-sharks.de',
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'garden'],
    rating: 4.0,
    description: 'Popular FKK club near Frankfurt with good value.',
    openHours: '11:00 - 03:00',
  },
  {
    id: 'fkk-palace',
    name: 'FKK Palace',
    city: 'Frankfurt',
    country: 'Germany',
    coordinates: [8.7012, 50.0923],
    priceRange: '€€',
    features: ['sauna', 'bar', 'rooms'],
    rating: 3.8,
    description: 'Smaller but well-maintained FKK establishment.',
    openHours: '12:00 - 04:00',
  },

  // Germany - Munich Area
  {
    id: 'fkk-world',
    name: 'FKK World',
    city: 'Munich',
    country: 'Germany',
    coordinates: [11.5820, 48.1351],
    website: 'https://www.fkk-world.de',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'garden', 'wellness'],
    rating: 4.6,
    description: 'Large and popular FKK club in Munich area.',
    openHours: '11:00 - 04:00',
  },
  {
    id: 'fkk-roma',
    name: 'FKK Roma',
    city: 'Munich',
    country: 'Germany',
    coordinates: [11.5456, 48.1123],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms'],
    rating: 4.0,
    description: 'Well-established FKK club with Italian theme.',
    openHours: '12:00 - 03:00',
  },

  // Germany - Cologne/Düsseldorf Area
  {
    id: 'fkk-babylon',
    name: 'FKK Babylon',
    city: 'Elsdorf',
    country: 'Germany',
    coordinates: [6.5678, 50.9367],
    website: 'https://www.fkk-babylon.de',
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'garden'],
    rating: 4.2,
    description: 'Large FKK club between Cologne and Aachen.',
    openHours: '11:00 - 04:00',
  },
  {
    id: 'fkk-artemis',
    name: 'FKK Artemis',
    city: 'Berlin',
    country: 'Germany',
    coordinates: [13.3245, 52.4892],
    website: 'https://www.artemis.de',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'cinema', 'gym'],
    rating: 4.4,
    description: 'One of the largest FKK clubs in Europe, located in Berlin.',
    openHours: '24/7',
  },
  {
    id: 'fkk-villa',
    name: 'FKK Villa',
    city: 'Aachen',
    country: 'Germany',
    coordinates: [6.0839, 50.7753],
    priceRange: '€€',
    features: ['sauna', 'bar', 'rooms', 'garden'],
    rating: 3.9,
    description: 'Cozy FKK club near the Belgian border.',
    openHours: '12:00 - 03:00',
  },

  // Germany - Stuttgart Area
  {
    id: 'fkk-samya',
    name: 'FKK Samya',
    city: 'Stuttgart',
    country: 'Germany',
    coordinates: [9.1829, 48.7758],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms'],
    rating: 4.1,
    description: 'Popular FKK club in the Stuttgart region.',
    openHours: '11:00 - 03:00',
  },
  {
    id: 'fkk-planet-eden',
    name: 'Planet Eden',
    city: 'Stuttgart',
    country: 'Germany',
    coordinates: [9.2103, 48.7412],
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'wellness'],
    rating: 4.3,
    description: 'Upscale FKK club with modern facilities.',
    openHours: '12:00 - 04:00',
  },

  // Germany - Hamburg Area
  {
    id: 'fkk-mystic',
    name: 'FKK Mystic',
    city: 'Hamburg',
    country: 'Germany',
    coordinates: [9.9937, 53.5511],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms'],
    rating: 4.0,
    description: 'FKK club in Hamburg with good atmosphere.',
    openHours: '12:00 - 04:00',
  },
  {
    id: 'fkk-extra',
    name: 'FKK Extra',
    city: 'Hamburg',
    country: 'Germany',
    coordinates: [10.0234, 53.5678],
    priceRange: '€€',
    features: ['sauna', 'bar', 'rooms'],
    rating: 3.7,
    description: 'Smaller FKK establishment in Hamburg area.',
    openHours: '14:00 - 02:00',
  },

  // Germany - Ruhr Area
  {
    id: 'fkk-sunshine',
    name: 'FKK Sunshine',
    city: 'Gelsenkirchen',
    country: 'Germany',
    coordinates: [7.0859, 51.5177],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms'],
    rating: 3.9,
    description: 'Well-known FKK club in the Ruhr area.',
    openHours: '11:00 - 03:00',
  },
  {
    id: 'fkk-cascadas',
    name: 'FKK Cascadas',
    city: 'Hagen',
    country: 'Germany',
    coordinates: [7.4749, 51.3671],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'garden'],
    rating: 4.1,
    description: 'Spanish-themed FKK club with waterfall features.',
    openHours: '11:00 - 04:00',
  },

  // Germany - Other cities
  {
    id: 'fkk-passion',
    name: 'FKK Passion',
    city: 'Nuremberg',
    country: 'Germany',
    coordinates: [11.0767, 49.4521],
    priceRange: '€€',
    features: ['sauna', 'pool', 'bar', 'rooms'],
    rating: 4.0,
    description: 'Popular FKK club in Nuremberg.',
    openHours: '12:00 - 03:00',
  },
  {
    id: 'fkk-europa',
    name: 'FKK Europa',
    city: 'Hanover',
    country: 'Germany',
    coordinates: [9.7320, 52.3759],
    priceRange: '€€',
    features: ['sauna', 'bar', 'rooms'],
    rating: 3.8,
    description: 'FKK club in the Hanover area.',
    openHours: '12:00 - 02:00',
  },

  // Austria
  {
    id: 'fkk-goldentime',
    name: 'FKK Goldentime',
    city: 'Vienna',
    country: 'Austria',
    coordinates: [16.3738, 48.2082],
    website: 'https://www.goldentime.at',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'wellness', 'cinema'],
    rating: 4.7,
    description: 'The most famous FKK club in Austria with premium facilities.',
    openHours: '24/7',
  },
  {
    id: 'fkk-funpalast',
    name: 'FKK Funpalast',
    city: 'Vienna',
    country: 'Austria',
    coordinates: [16.4012, 48.1923],
    website: 'https://www.funpalast.at',
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'garden'],
    rating: 4.5,
    description: 'Large and well-equipped FKK club in Vienna.',
    openHours: '12:00 - 05:00',
  },
  {
    id: 'fkk-saphir',
    name: 'FKK Saphir',
    city: 'Linz',
    country: 'Austria',
    coordinates: [14.2858, 48.3069],
    priceRange: '€€',
    features: ['sauna', 'bar', 'rooms'],
    rating: 4.0,
    description: 'FKK club in Linz with good reputation.',
    openHours: '12:00 - 03:00',
  },

  // Switzerland
  {
    id: 'fkk-flamingo',
    name: 'FKK Flamingo',
    city: 'Zurich',
    country: 'Switzerland',
    coordinates: [8.5417, 47.3769],
    priceRange: '€€€',
    features: ['sauna', 'bar', 'rooms', 'wellness'],
    rating: 4.2,
    description: 'Upscale FKK establishment in Zurich.',
    openHours: '12:00 - 04:00',
  },
  {
    id: 'fkk-wellness',
    name: 'FKK Wellness Club',
    city: 'Basel',
    country: 'Switzerland',
    coordinates: [7.5886, 47.5596],
    priceRange: '€€€',
    features: ['sauna', 'pool', 'bar', 'rooms', 'wellness'],
    rating: 4.1,
    description: 'Swiss FKK club with excellent wellness facilities.',
    openHours: '14:00 - 02:00',
  },
];

/**
 * Get FKK club by ID
 */
export function getFKKClubById(id: string): FKKClub | undefined {
  return FKK_CLUBS.find((c) => c.id === id);
}

/**
 * Get FKK clubs by country
 */
export function getFKKClubsByCountry(country: string): FKKClub[] {
  return FKK_CLUBS.filter(
    (c) => c.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Get FKK clubs by city
 */
export function getFKKClubsByCity(city: string): FKKClub[] {
  return FKK_CLUBS.filter((c) => c.city.toLowerCase() === city.toLowerCase());
}

/**
 * Get statistics about FKK clubs
 */
export function getFKKClubStats(): {
  total: number;
  byCountry: Record<string, number>;
  byPriceRange: Record<string, number>;
  averageRating: number;
} {
  const byCountry: Record<string, number> = {};
  const byPriceRange: Record<string, number> = {};
  let totalRating = 0;
  let ratedCount = 0;

  for (const club of FKK_CLUBS) {
    byCountry[club.country] = (byCountry[club.country] || 0) + 1;
    byPriceRange[club.priceRange] = (byPriceRange[club.priceRange] || 0) + 1;
    if (club.rating) {
      totalRating += club.rating;
      ratedCount++;
    }
  }

  return {
    total: FKK_CLUBS.length,
    byCountry,
    byPriceRange,
    averageRating: ratedCount > 0 ? totalRating / ratedCount : 0,
  };
}
