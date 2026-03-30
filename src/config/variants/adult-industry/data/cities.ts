/**
 * European Cities Data for Adult Industry Map
 *
 * 64 cities from eurosexscene.com city guides.
 * Each city includes location, services available, and guide URL.
 */

/** Service types available in a city */
export type CityService =
  | 'redLightDistrict'
  | 'escorts'
  | 'sexShops'
  | 'stripClubs'
  | 'swingerClubs'
  | 'massageParlors'
  | 'adultCinemas'
  | 'lgbtVenues';

/** City data structure */
export interface City {
  /** Unique identifier */
  id: string;
  /** City name */
  name: string;
  /** Country name */
  country: string;
  /** ISO 3166-1 alpha-2 country code */
  countryCode: string;
  /** Coordinates [longitude, latitude] */
  coordinates: [number, number];
  /** Available services */
  services: CityService[];
  /** Has official red light district */
  hasRedLightDistrict: boolean;
  /** Guide URL */
  guideUrl: string;
  /** Population (approximate) */
  population?: number;
}

/** Service colors for visualization */
export const SERVICE_COLORS: Record<CityService, string> = {
  redLightDistrict: '#E74C3C',
  escorts: '#9B59B6',
  sexShops: '#3498DB',
  stripClubs: '#E91E63',
  swingerClubs: '#FF5722',
  massageParlors: '#00BCD4',
  adultCinemas: '#795548',
  lgbtVenues: '#FF9800',
};

/** Service labels */
export const SERVICE_LABELS: Record<CityService, string> = {
  redLightDistrict: 'Red Light District',
  escorts: 'Escorts',
  sexShops: 'Sex Shops',
  stripClubs: 'Strip Clubs',
  swingerClubs: 'Swinger Clubs',
  massageParlors: 'Massage Parlors',
  adultCinemas: 'Adult Cinemas',
  lgbtVenues: 'LGBT Venues',
};

/** Service icons */
export const SERVICE_ICONS: Record<CityService, string> = {
  redLightDistrict: '🔴',
  escorts: '👠',
  sexShops: '🏪',
  stripClubs: '💃',
  swingerClubs: '🔥',
  massageParlors: '💆',
  adultCinemas: '🎬',
  lgbtVenues: '🏳️‍🌈',
};

/**
 * 64 European cities data
 * Source: https://eurosexscene.com/city-guides/
 */
export const CITIES: City[] = [
  {
    id: 'aarhus',
    name: 'Aarhus',
    country: 'Denmark',
    countryCode: 'DK',
    coordinates: [10.2039, 56.1629],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-denmark/aarhus-escorts-sex-guide/',
  },
  {
    id: 'amsterdam',
    name: 'Amsterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: [4.9041, 52.3676],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-the-netherlands/amsterdam-escorts-sex-guide/',
    population: 872680,
  },
  {
    id: 'antwerp',
    name: 'Antwerp',
    country: 'Belgium',
    countryCode: 'BE',
    coordinates: [4.4025, 51.2194],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-belgium/antwerp-escorts-sex-guide/',
  },
  {
    id: 'athens',
    name: 'Athens',
    country: 'Greece',
    countryCode: 'GR',
    coordinates: [23.7275, 37.9838],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-greece/athens-escorts-sex-guide/',
    population: 664046,
  },
  {
    id: 'barcelona',
    name: 'Barcelona',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: [2.1734, 41.3851],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-spain/barcelona-escorts-sex-guide/',
    population: 1620343,
  },
  {
    id: 'basel',
    name: 'Basel',
    country: 'Switzerland',
    countryCode: 'CH',
    coordinates: [7.5886, 47.5596],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-switzerland/basel-escorts-sex-guide/',
  },
  {
    id: 'bergen',
    name: 'Bergen',
    country: 'Norway',
    countryCode: 'NO',
    coordinates: [5.3221, 60.3913],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-norway/bergen-escorts-sex-guide/',
  },
  {
    id: 'berlin',
    name: 'Berlin',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: [13.4050, 52.5200],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues', 'adultCinemas'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-germany/berlin-escorts-sex-guide/',
    population: 3644826,
  },
  {
    id: 'birmingham',
    name: 'Birmingham',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: [-1.8904, 52.4862],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-the-uk/birmingham-escorts-sex-guide/',
    population: 1141816,
  },
  {
    id: 'bratislava',
    name: 'Bratislava',
    country: 'Slovakia',
    countryCode: 'SK',
    coordinates: [17.1077, 48.1486],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-slovakia/bratislava-escorts-sex-guide/',
  },
  {
    id: 'brussels',
    name: 'Brussels',
    country: 'Belgium',
    countryCode: 'BE',
    coordinates: [4.3517, 50.8503],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs', 'lgbtVenues'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-belgium/brussels-escorts-sex-guide/',
    population: 185103,
  },
  {
    id: 'bucharest',
    name: 'Bucharest',
    country: 'Romania',
    countryCode: 'RO',
    coordinates: [26.1025, 44.4268],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-romania/bucharest-escorts-sex-guide/',
    population: 1883425,
  },
  {
    id: 'budapest',
    name: 'Budapest',
    country: 'Hungary',
    countryCode: 'HU',
    coordinates: [19.0402, 47.4979],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-hungary/budapest-escorts-sex-guide/',
    population: 1752286,
  },
  {
    id: 'cologne',
    name: 'Cologne',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: [6.9603, 50.9375],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-germany/cologne-escorts-sex-guide/',
    population: 1085664,
  },
  {
    id: 'copenhagen',
    name: 'Copenhagen',
    country: 'Denmark',
    countryCode: 'DK',
    coordinates: [12.5683, 55.6761],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-denmark/copenhagen-escorts-sex-guide/',
    population: 644431,
  },
  {
    id: 'cork',
    name: 'Cork',
    country: 'Ireland',
    countryCode: 'IE',
    coordinates: [-8.4863, 51.8985],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ireland/cork-escorts-sex-guide/',
  },
  {
    id: 'dublin',
    name: 'Dublin',
    country: 'Ireland',
    countryCode: 'IE',
    coordinates: [-6.2603, 53.3498],
    services: ['escorts', 'sexShops', 'stripClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ireland/dublin-escorts-sex-guide/',
    population: 544107,
  },
  {
    id: 'espoo',
    name: 'Espoo',
    country: 'Finland',
    countryCode: 'FI',
    coordinates: [24.6559, 60.2055],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-finland/espoo-escorts-sex-guide/',
  },
  {
    id: 'galway',
    name: 'Galway',
    country: 'Ireland',
    countryCode: 'IE',
    coordinates: [-9.0568, 53.2707],
    services: ['escorts'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ireland/galway-escorts-sex-guide/',
  },
  {
    id: 'geneva',
    name: 'Geneva',
    country: 'Switzerland',
    countryCode: 'CH',
    coordinates: [6.1432, 46.2044],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-switzerland/geneva-escorts-sex-guide/',
    population: 203856,
  },
  {
    id: 'glasgow',
    name: 'Glasgow',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: [-4.2518, 55.8642],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-the-uk/glasgow-escorts-sex-guide/',
    population: 633120,
  },
  {
    id: 'gothenburg',
    name: 'Gothenburg',
    country: 'Sweden',
    countryCode: 'SE',
    coordinates: [11.9746, 57.7089],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-sweden/gothenburg-escorts-sex-guide/',
    population: 583056,
  },
  {
    id: 'graz',
    name: 'Graz',
    country: 'Austria',
    countryCode: 'AT',
    coordinates: [15.4395, 47.0707],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-austria/graz-escorts-sex-guide/',
  },
  {
    id: 'hamburg',
    name: 'Hamburg',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: [9.9937, 53.5511],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-germany/hamburg-escorts-sex-guide/',
    population: 1852478,
  },
  {
    id: 'helsinki',
    name: 'Helsinki',
    country: 'Finland',
    countryCode: 'FI',
    coordinates: [24.9384, 60.1699],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-finland/helsinki-escorts-sex-guide/',
    population: 658457,
  },
  {
    id: 'istanbul',
    name: 'Istanbul',
    country: 'Turkey',
    countryCode: 'TR',
    coordinates: [28.9784, 41.0082],
    services: ['escorts', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-turkey/istanbul-escorts-sex-guide/',
    population: 15462452,
  },
  {
    id: 'kharkiv',
    name: 'Kharkiv',
    country: 'Ukraine',
    countryCode: 'UA',
    coordinates: [36.2304, 49.9935],
    services: ['escorts', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ukraine/kharkiv-escorts-sex-guide/',
  },
  {
    id: 'kyiv',
    name: 'Kyiv',
    country: 'Ukraine',
    countryCode: 'UA',
    coordinates: [30.5234, 50.4501],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ukraine/kiev-escorts-sex-guide/',
    population: 2962180,
  },
  {
    id: 'krakow',
    name: 'Krakow',
    country: 'Poland',
    countryCode: 'PL',
    coordinates: [19.9450, 50.0647],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-poland/krakow-escorts-sex-guide/',
    population: 779115,
  },
  {
    id: 'limerick',
    name: 'Limerick',
    country: 'Ireland',
    countryCode: 'IE',
    coordinates: [-8.6305, 52.6638],
    services: ['escorts'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ireland/limerick-escorts-sex-guide/',
  },
  {
    id: 'linz',
    name: 'Linz',
    country: 'Austria',
    countryCode: 'AT',
    coordinates: [14.2858, 48.3069],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-austria/linz-escorts-sex-guide/',
  },
  {
    id: 'lisbon',
    name: 'Lisbon',
    country: 'Portugal',
    countryCode: 'PT',
    coordinates: [-9.1393, 38.7223],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-portugal/lisbon-escorts-sex-guide/',
    population: 544851,
  },
  {
    id: 'london',
    name: 'London',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: [-0.1276, 51.5074],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-the-uk/london-escorts-sex-guide/',
    population: 8982000,
  },
  {
    id: 'lyon',
    name: 'Lyon',
    country: 'France',
    countryCode: 'FR',
    coordinates: [4.8357, 45.7640],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-france/lyon-escorts-sex-guide/',
    population: 522969,
  },
  {
    id: 'madrid',
    name: 'Madrid',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: [-3.7038, 40.4168],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-spain/madrid-escorts-sex-guide/',
    population: 3223334,
  },
  {
    id: 'malmo',
    name: 'Malmö',
    country: 'Sweden',
    countryCode: 'SE',
    coordinates: [13.0038, 55.6050],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-sweden/malmo-escorts-sex-guide/',
    population: 347949,
  },
  {
    id: 'manchester',
    name: 'Manchester',
    country: 'United Kingdom',
    countryCode: 'GB',
    coordinates: [-2.2426, 53.4808],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-the-uk/manchester-escorts-sex-guide/',
    population: 547627,
  },
  {
    id: 'marseille',
    name: 'Marseille',
    country: 'France',
    countryCode: 'FR',
    coordinates: [5.3698, 43.2965],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-france/marseille-escorts-sex-guide/',
    population: 870731,
  },
  {
    id: 'milan',
    name: 'Milan',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: [9.1900, 45.4642],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-italy/milan-escorts-sex-guide/',
    population: 1396059,
  },
  {
    id: 'moscow',
    name: 'Moscow',
    country: 'Russia',
    countryCode: 'RU',
    coordinates: [37.6173, 55.7558],
    services: ['escorts', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-russia/moscow-escorts-sex-guide/',
    population: 12506468,
  },
  {
    id: 'munich',
    name: 'Munich',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: [11.5820, 48.1351],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-germany/munich-escorts-sex-guide/',
    population: 1488202,
  },
  {
    id: 'naples',
    name: 'Naples',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: [14.2681, 40.8518],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-italy/naples-escorts-sex-guide/',
    population: 959574,
  },
  {
    id: 'odense',
    name: 'Odense',
    country: 'Denmark',
    countryCode: 'DK',
    coordinates: [10.4034, 55.4038],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-denmark/odense-escorts-sex-guide/',
  },
  {
    id: 'odessa',
    name: 'Odessa',
    country: 'Ukraine',
    countryCode: 'UA',
    coordinates: [30.7233, 46.4825],
    services: ['escorts', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-ukraine/odessa-escorts-sex-guide/',
  },
  {
    id: 'oslo',
    name: 'Oslo',
    country: 'Norway',
    countryCode: 'NO',
    coordinates: [10.7522, 59.9139],
    services: ['escorts', 'sexShops', 'stripClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-norway/oslo-escorts-sex-guide/',
    population: 697549,
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'France',
    countryCode: 'FR',
    coordinates: [2.3522, 48.8566],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-france/paris-escorts-sex-guide/',
    population: 2161000,
  },
  {
    id: 'porto',
    name: 'Porto',
    country: 'Portugal',
    countryCode: 'PT',
    coordinates: [-8.6291, 41.1579],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-portugal/porto-escorts-sex-guide/',
    population: 237591,
  },
  {
    id: 'prague',
    name: 'Prague',
    country: 'Czech Republic',
    countryCode: 'CZ',
    coordinates: [14.4378, 50.0755],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-the-czech-republic/prague-escorts-sex-guide/',
    population: 1335084,
  },
  {
    id: 'riga',
    name: 'Riga',
    country: 'Latvia',
    countryCode: 'LV',
    coordinates: [24.1052, 56.9496],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-latvia/riga-escorts-sex-guide/',
    population: 632614,
  },
  {
    id: 'rome',
    name: 'Rome',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: [12.4964, 41.9028],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-italy/rome-escorts-sex-guide/',
    population: 2860009,
  },
  {
    id: 'rotterdam',
    name: 'Rotterdam',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: [4.4777, 51.9244],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-the-netherlands/rotterdam-escorts-sex-guide/',
    population: 651446,
  },
  {
    id: 'saint-petersburg',
    name: 'Saint Petersburg',
    country: 'Russia',
    countryCode: 'RU',
    coordinates: [30.3351, 59.9343],
    services: ['escorts', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-russia/saint-petersburg-escorts-sex-guide/',
    population: 5384342,
  },
  {
    id: 'sofia',
    name: 'Sofia',
    country: 'Bulgaria',
    countryCode: 'BG',
    coordinates: [23.3219, 42.6977],
    services: ['escorts', 'sexShops', 'stripClubs', 'massageParlors'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-bulgaria/sofia-escorts-sex-guide/',
    population: 1307439,
  },
  {
    id: 'stockholm',
    name: 'Stockholm',
    country: 'Sweden',
    countryCode: 'SE',
    coordinates: [18.0686, 59.3293],
    services: ['escorts', 'sexShops', 'stripClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-sweden/stockholm-escorts-sex-guide/',
    population: 978770,
  },
  {
    id: 'stuttgart',
    name: 'Stuttgart',
    country: 'Germany',
    countryCode: 'DE',
    coordinates: [9.1829, 48.7758],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-germany/stuttgart-escorts-sex-guide/',
    population: 635911,
  },
  {
    id: 'tampere',
    name: 'Tampere',
    country: 'Finland',
    countryCode: 'FI',
    coordinates: [23.7871, 61.4978],
    services: ['escorts', 'sexShops'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-finland/tampere-escorts-sex-guide/',
  },
  {
    id: 'the-hague',
    name: 'The Hague',
    country: 'Netherlands',
    countryCode: 'NL',
    coordinates: [4.3007, 52.0705],
    services: ['redLightDistrict', 'escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: true,
    guideUrl: 'https://eurosexscene.com/sex-in-the-netherlands/the-hague-escorts-sex-guide/',
    population: 548320,
  },
  {
    id: 'trondheim',
    name: 'Trondheim',
    country: 'Norway',
    countryCode: 'NO',
    coordinates: [10.3951, 63.4305],
    services: ['escorts'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-norway/trondheim-escorts-sex-guide/',
  },
  {
    id: 'turin',
    name: 'Turin',
    country: 'Italy',
    countryCode: 'IT',
    coordinates: [7.6869, 45.0703],
    services: ['escorts', 'sexShops', 'stripClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-italy/turin-escorts-sex-guide/',
    population: 870952,
  },
  {
    id: 'valencia',
    name: 'Valencia',
    country: 'Spain',
    countryCode: 'ES',
    coordinates: [-0.3763, 39.4699],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-spain/valencia-escorts-sex-guide/',
    population: 794288,
  },
  {
    id: 'vienna',
    name: 'Vienna',
    country: 'Austria',
    countryCode: 'AT',
    coordinates: [16.3738, 48.2082],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs', 'lgbtVenues'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-austria/vienna-escorts-sex-guide/',
    population: 1911191,
  },
  {
    id: 'warsaw',
    name: 'Warsaw',
    country: 'Poland',
    countryCode: 'PL',
    coordinates: [21.0122, 52.2297],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-poland/warsaw-escorts-sex-guide/',
    population: 1790658,
  },
  {
    id: 'zurich',
    name: 'Zurich',
    country: 'Switzerland',
    countryCode: 'CH',
    coordinates: [8.5417, 47.3769],
    services: ['escorts', 'sexShops', 'stripClubs', 'swingerClubs'],
    hasRedLightDistrict: false,
    guideUrl: 'https://eurosexscene.com/sex-in-switzerland/zurich-escorts-sex-guide/',
    population: 421878,
  },
];

/**
 * Get all cities
 */
export function getCities(): City[] {
  return CITIES;
}

/**
 * Get city by ID
 */
export function getCityById(id: string): City | undefined {
  return CITIES.find(city => city.id === id);
}

/**
 * Get cities by country
 */
export function getCitiesByCountry(countryCode: string): City[] {
  return CITIES.filter(city => city.countryCode === countryCode);
}

/**
 * Get cities with red light district
 */
export function getCitiesWithRedLightDistrict(): City[] {
  return CITIES.filter(city => city.hasRedLightDistrict);
}

/**
 * Get cities by service
 */
export function getCitiesByService(service: CityService): City[] {
  return CITIES.filter(city => city.services.includes(service));
}

/**
 * Get unique countries
 */
export function getCountries(): string[] {
  return [...new Set(CITIES.map(city => city.country))].sort();
}

/**
 * Get city count
 */
export function getCityCount(): number {
  return CITIES.length;
}
