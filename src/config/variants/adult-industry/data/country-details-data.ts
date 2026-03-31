/**
 * Extended Country Detail Data for Top 10 Countries
 *
 * Comprehensive data for: DE, NL, AT, CH, BE, CZ, ES, FR, GB, DK
 * Data sources: eurosexscene.com, WikiSexGuide, industry news
 */

/** District detail with location and status */
export interface DistrictDetail {
  name: string;
  description: string;
  status: 'Active' | 'Closed' | 'Restricted';
  type: string;
  coordinates?: [number, number];
}

/** Venue detail with rating and price */
export interface VenueDetail {
  name: string;
  type: string;
  location: string;
  rating?: number;
  priceLevel?: '€' | '€€' | '€€€' | '€€€€';
  status: 'Active' | 'Closed' | 'Restricted';
  websiteUrl?: string;
  coordinates?: [number, number];
  note?: string;
}

/** Extended city info with districts */
export interface ExtendedCityInfo {
  cityName: string;
  districtCount: number;
  districts: DistrictDetail[];
}

/** Legal framework details */
export interface LegalFramework {
  prostitution: string;
  brothels: string;
  escorts: string;
  stripClubs: string;
  streetProstitution: string;
  workingAge: number;
  notes: string[];
}

/** News/update item */
export interface NewsItem {
  title: string;
  date: string;
}

/** Extended country detail data */
export interface ExtendedCountryDetailData {
  countryCode: string;
  countryName: string;
  flag: string;
  overallScore: 1 | 2 | 3 | 4 | 5;
  scoreLabel: string;
  description: string;
  hasRedLightDistricts: boolean;
  hasFKKClubs: boolean;
  cities: ExtendedCityInfo[];
  venues: VenueDetail[];
  legalStatus: LegalFramework;
  sourceUrl: string;
  recentUpdates?: NewsItem[];
}

/**
 * Extended detail data for top 10 countries
 */
export const COUNTRY_DETAILS_DATA: Record<string, ExtendedCountryDetailData> = {
  DE: {
    countryCode: 'DE',
    countryName: 'Germany',
    flag: '🇩🇪',
    overallScore: 5,
    scoreLabel: 'Very Permissive',
    description: 'Prostitution is fully legal and regulated since 2002. Germany has Europe\'s largest and most organized adult industry with famous FKK clubs, legal brothels, and regulated venues throughout the country.',
    hasRedLightDistricts: true,
    hasFKKClubs: true,
    cities: [
      {
        cityName: 'Hamburg',
        districtCount: 2,
        districts: [
          {
            name: 'Reeperbahn',
            description: 'Germany\'s most famous red light district with strip clubs, sex shops, and the historic Herbertstraße',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [9.9626, 53.5497],
          },
          {
            name: 'Herbertstraße',
            description: 'Historic window prostitution street, women only entrance',
            status: 'Active',
            type: 'Window Prostitution',
            coordinates: [9.9632, 53.5492],
          },
        ],
      },
      {
        cityName: 'Frankfurt',
        districtCount: 1,
        districts: [
          {
            name: 'Bahnhofsviertel',
            description: 'Station district with legal brothels and eros centers',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [8.6654, 50.1072],
          },
        ],
      },
      {
        cityName: 'Cologne',
        districtCount: 1,
        districts: [
          {
            name: 'Pascha Area',
            description: 'Home to Europe\'s largest brothel (closed 2020, area still active)',
            status: 'Active',
            type: 'Brothel District',
            coordinates: [6.9571, 50.9531],
          },
        ],
      },
      {
        cityName: 'Berlin',
        districtCount: 1,
        districts: [
          {
            name: 'Kurfürstenstraße',
            description: 'Street prostitution area near Tiergarten',
            status: 'Active',
            type: 'Street Prostitution',
            coordinates: [13.3548, 52.5028],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'FKK World',
        type: 'FKK Club',
        location: 'Pohlheim, near Frankfurt',
        rating: 5,
        priceLevel: '€€€',
        status: 'Active',
        websiteUrl: 'https://www.fkk-world.de',
      },
      {
        name: 'FKK Sharks',
        type: 'FKK Club',
        location: 'Darmstadt',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Paradise Stuttgart',
        type: 'FKK Club',
        location: 'Leinfelden-Echterdingen',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Babylon',
        type: 'Eros Center',
        location: 'Hamburg Reeperbahn',
        rating: 3,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Pascha',
        type: 'Mega Brothel',
        location: 'Cologne',
        status: 'Closed',
        note: 'Europe\'s largest brothel, closed in 2020 due to COVID',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Legal',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Legal in designated areas',
      workingAge: 18,
      notes: [
        'Prostitution Protection Act (ProstSchG) since 2017',
        'Mandatory registration and health checks',
        'Sex workers must pay taxes',
        'Some cities have restricted zones',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-germany/',
    recentUpdates: [
      { title: 'New registration requirements enforced', date: 'January 2026' },
    ],
  },

  NL: {
    countryCode: 'NL',
    countryName: 'Netherlands',
    flag: '🇳🇱',
    overallScore: 5,
    scoreLabel: 'Very Permissive',
    description: 'Prostitution is fully legal and regulated since 2000. Home to the world-famous Amsterdam Red Light District (De Wallen), the Netherlands has a well-organized system with licensed window brothels.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Amsterdam',
        districtCount: 3,
        districts: [
          {
            name: 'De Wallen',
            description: 'World-famous red light district with window prostitution, the largest and oldest in the city',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.8979, 52.3731],
          },
          {
            name: 'Singel Area',
            description: 'Upscale escort services and massage parlors',
            status: 'Active',
            type: 'Escort Services',
            coordinates: [4.8912, 52.3729],
          },
          {
            name: 'Ruysdaelkade',
            description: 'Smaller red light area in De Pijp neighborhood',
            status: 'Restricted',
            type: 'Red Light District',
            coordinates: [4.8946, 52.3558],
          },
        ],
      },
      {
        cityName: 'Rotterdam',
        districtCount: 1,
        districts: [
          {
            name: 'Keileweg',
            description: 'Street-level window prostitution area',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.4531, 51.9173],
          },
        ],
      },
      {
        cityName: 'The Hague',
        districtCount: 1,
        districts: [
          {
            name: 'Doubletstraat',
            description: 'Red light windows near central station',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.3238, 52.0800],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Casa Rosso',
        type: 'Live Sex Show Theater',
        location: 'Oudezijds Achterburgwal 106-108, Amsterdam',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
        websiteUrl: 'https://www.casarosso.com',
        coordinates: [4.8992, 52.3731],
      },
      {
        name: 'Moulin Rouge Amsterdam',
        type: 'Strip Club & Theater',
        location: 'Oudezijds Achterburgwal 5-7, Amsterdam',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
        coordinates: [4.8985, 52.3728],
      },
      {
        name: 'Bananenbar',
        type: 'Sex Show',
        location: 'Oudezijds Achterburgwal, Amsterdam',
        rating: 3,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Club LV',
        type: 'Swingers Club',
        location: 'Amsterdam',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Legal',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Restricted to designated zones',
      workingAge: 21,
      notes: [
        'Mandatory health checks',
        'Tax registration required',
        'Amsterdam planning to reduce Red Light District windows',
        'Minimum age raised to 21 in 2023',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-the-netherlands/',
    recentUpdates: [
      { title: 'Amsterdam considers relocating red light district', date: 'March 2026' },
      { title: 'New sex work legislation proposed', date: 'February 2026' },
    ],
  },

  AT: {
    countryCode: 'AT',
    countryName: 'Austria',
    flag: '🇦🇹',
    overallScore: 5,
    scoreLabel: 'Very Permissive',
    description: 'Prostitution is legal and regulated with each province having its own rules. Austria is known for its high-quality FKK clubs and legal brothels, particularly in Vienna and Salzburg.',
    hasRedLightDistricts: true,
    hasFKKClubs: true,
    cities: [
      {
        cityName: 'Vienna',
        districtCount: 2,
        districts: [
          {
            name: 'Gürtel Area',
            description: 'Licensed brothels along the Gürtel ring road',
            status: 'Active',
            type: 'Brothel District',
            coordinates: [16.3563, 48.2008],
          },
          {
            name: 'Prater Area',
            description: 'Adult entertainment near Prater park',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [16.4014, 48.2184],
          },
        ],
      },
      {
        cityName: 'Salzburg',
        districtCount: 1,
        districts: [
          {
            name: 'Maxglan',
            description: 'Discrete brothel area',
            status: 'Active',
            type: 'Brothel District',
            coordinates: [13.0201, 47.8011],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'FKK Goldentime',
        type: 'FKK Club',
        location: 'Vienna',
        rating: 5,
        priceLevel: '€€€',
        status: 'Active',
        websiteUrl: 'https://www.goldentime.at',
      },
      {
        name: 'FKK Funpalast',
        type: 'FKK Club',
        location: 'Vienna',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Maxim Wien',
        type: 'Brothel',
        location: 'Vienna Gürtel',
        rating: 4,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Babylon',
        type: 'Strip Club',
        location: 'Vienna',
        rating: 3,
        priceLevel: '€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Legal',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Restricted to certain areas in Vienna',
      workingAge: 18,
      notes: [
        'Mandatory registration with authorities',
        'Regular health checks required',
        'Each province has own regulations',
        'Vienna has designated street prostitution zones',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-austria/',
  },

  CH: {
    countryCode: 'CH',
    countryName: 'Switzerland',
    flag: '🇨🇭',
    overallScore: 5,
    scoreLabel: 'Very Permissive',
    description: 'Prostitution is legal with cantonal regulations. Switzerland has a pragmatic approach with licensed brothels, FKK clubs, and even drive-in "sex boxes" in Zurich. High prices reflect the country\'s cost of living.',
    hasRedLightDistricts: true,
    hasFKKClubs: true,
    cities: [
      {
        cityName: 'Zurich',
        districtCount: 2,
        districts: [
          {
            name: 'Langstrasse',
            description: 'Main red light district with clubs and brothels',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [8.5289, 47.3783],
          },
          {
            name: 'Strichplatz (Sex Boxes)',
            description: 'City-operated drive-in prostitution facility',
            status: 'Active',
            type: 'Regulated Zone',
            coordinates: [8.4848, 47.4088],
          },
        ],
      },
      {
        cityName: 'Geneva',
        districtCount: 1,
        districts: [
          {
            name: 'Pâquis',
            description: 'Traditional red light area near the station',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [6.1424, 46.2098],
          },
        ],
      },
      {
        cityName: 'Basel',
        districtCount: 1,
        districts: [
          {
            name: 'Kleinbasel',
            description: 'Clubs and studios near the Rhine',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [7.6016, 47.5637],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'FKK Babylon',
        type: 'FKK Club',
        location: 'Elsau, near Winterthur',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Active',
      },
      {
        name: 'Club Roses',
        type: 'Club/Brothel',
        location: 'Zurich Langstrasse',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Le Parfum',
        type: 'Studio',
        location: 'Geneva',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Legal',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Legal in designated areas',
      workingAge: 18,
      notes: [
        'Canton-specific regulations',
        'Zurich has official sex boxes since 2013',
        'High prices (CHF currency)',
        'Strict hygiene standards',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-switzerland/',
  },

  BE: {
    countryCode: 'BE',
    countryName: 'Belgium',
    flag: '🇧🇪',
    overallScore: 4,
    scoreLabel: 'Permissive',
    description: 'Prostitution is legal but brothels operate in a grey area. Belgium has visible red light districts in Brussels, Antwerp, and Ghent with window prostitution similar to the Netherlands.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Brussels',
        districtCount: 2,
        districts: [
          {
            name: 'Rue d\'Aerschot',
            description: 'Main red light street near Gare du Nord',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.3598, 50.8603],
          },
          {
            name: 'Alhambra Quarter',
            description: 'Secondary red light area',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.3511, 50.8521],
          },
        ],
      },
      {
        cityName: 'Antwerp',
        districtCount: 1,
        districts: [
          {
            name: 'Schipperskwartier',
            description: 'Historic red light quarter with villa prostitution',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [4.4018, 51.2258],
          },
        ],
      },
      {
        cityName: 'Ghent',
        districtCount: 1,
        districts: [
          {
            name: 'Prostitutiebuurt',
            description: 'Small window district',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [3.7242, 51.0573],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Villa Tinto',
        type: 'Villa/Brothel',
        location: 'Antwerp Schipperskwartier',
        rating: 4,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Le You',
        type: 'Strip Club',
        location: 'Brussels',
        rating: 3,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Acropolis',
        type: 'Sauna Club',
        location: 'Brussels area',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Grey area',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Restricted',
      workingAge: 18,
      notes: [
        'Individual prostitution is legal',
        'Brothels technically illegal but tolerated',
        'Recent push for full decriminalization',
        'Window prostitution common in major cities',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-belgium/',
  },

  CZ: {
    countryCode: 'CZ',
    countryName: 'Czech Republic',
    flag: '🇨🇿',
    overallScore: 4,
    scoreLabel: 'Permissive',
    description: 'Prostitution exists in a legal grey zone - neither explicitly legal nor illegal. Prague is known as the "Amsterdam of the East" with a thriving adult entertainment industry catering to tourists.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Prague',
        districtCount: 2,
        districts: [
          {
            name: 'Wenceslas Square Area',
            description: 'Strip clubs and nightclubs in central Prague',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [14.4262, 50.0814],
          },
          {
            name: 'Holešovice',
            description: 'Industrial area with clubs and studios',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [14.4444, 50.1067],
          },
        ],
      },
      {
        cityName: 'Cheb',
        districtCount: 1,
        districts: [
          {
            name: 'Border Area',
            description: 'Border town with clubs serving German visitors',
            status: 'Active',
            type: 'Border Trade',
            coordinates: [12.3742, 50.0796],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Darling Cabaret',
        type: 'Strip Club',
        location: 'Prague, Wenceslas Square',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Goldfingers',
        type: 'Strip Club',
        location: 'Prague',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Hot Peppers',
        type: 'Strip Club',
        location: 'Prague',
        rating: 3,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'K5 Relax Club',
        type: 'Wellness/Adult Club',
        location: 'Prague',
        rating: 4,
        priceLevel: '€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Grey area',
      brothels: 'Illegal but tolerated',
      escorts: 'Tolerated',
      stripClubs: 'Legal',
      streetProstitution: 'Tolerated in some areas',
      workingAge: 18,
      notes: [
        'No specific law regulating prostitution',
        'Organizing prostitution is illegal',
        'Popular destination for sex tourism',
        'Border towns have extensive trade with Germany',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-czech-republic/',
  },

  ES: {
    countryCode: 'ES',
    countryName: 'Spain',
    flag: '🇪🇸',
    overallScore: 4,
    scoreLabel: 'Permissive',
    description: 'Prostitution is not explicitly regulated - it\'s neither legal nor illegal. Spain has a significant adult industry with clubs (puticlubs) throughout the country, particularly near highways and in resort areas.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Barcelona',
        districtCount: 2,
        districts: [
          {
            name: 'El Raval',
            description: 'Historic red light area near Las Ramblas',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [2.1698, 41.3797],
          },
          {
            name: 'Diagonal Mar',
            description: 'Modern area with escort services',
            status: 'Active',
            type: 'Escort Services',
            coordinates: [2.2164, 41.4101],
          },
        ],
      },
      {
        cityName: 'Madrid',
        districtCount: 1,
        districts: [
          {
            name: 'Calle Montera',
            description: 'Street near Gran Vía known for street workers',
            status: 'Restricted',
            type: 'Street Prostitution',
            coordinates: [-3.7011, 40.4189],
          },
        ],
      },
      {
        cityName: 'Marbella',
        districtCount: 1,
        districts: [
          {
            name: 'Puerto Banús Area',
            description: 'Luxury escort services and clubs',
            status: 'Active',
            type: 'Escort Services',
            coordinates: [-4.9495, 36.4866],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Bagdad',
        type: 'Live Sex Show',
        location: 'Barcelona, Las Ramblas',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
        websiteUrl: 'https://www.salagaddad.com',
      },
      {
        name: 'Club Privee',
        type: 'Puticlub',
        location: 'Barcelona outskirts',
        rating: 3,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Olivia Valere',
        type: 'Upscale Club',
        location: 'Marbella',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Active',
        note: 'High-end nightclub with escort presence',
      },
    ],
    legalStatus: {
      prostitution: 'Not regulated',
      brothels: 'Grey area (puticlubs operate openly)',
      escorts: 'Tolerated',
      stripClubs: 'Legal',
      streetProstitution: 'Restricted in many cities',
      workingAge: 18,
      notes: [
        'No law explicitly legalizing or banning',
        'Puticlubs (highway clubs) common',
        'Some cities have anti-prostitution ordinances',
        'Catalonia attempted regulation',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-spain/',
  },

  FR: {
    countryCode: 'FR',
    countryName: 'France',
    flag: '🇫🇷',
    overallScore: 2,
    scoreLabel: 'Restrictive',
    description: 'France adopted the Nordic model in 2016 - selling sex is legal but buying is criminalized. This has pushed the industry underground but historic areas like Pigalle in Paris remain known for adult entertainment.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Paris',
        districtCount: 2,
        districts: [
          {
            name: 'Pigalle',
            description: 'Historic red light area with strip clubs and cabarets',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [2.3373, 48.8822],
          },
          {
            name: 'Bois de Boulogne',
            description: 'Known for transgender street workers (declining)',
            status: 'Restricted',
            type: 'Street Prostitution',
            coordinates: [2.2489, 48.8625],
          },
        ],
      },
      {
        cityName: 'Lyon',
        districtCount: 1,
        districts: [
          {
            name: 'Perrache Area',
            description: 'Adult venues near station',
            status: 'Restricted',
            type: 'Adult Entertainment',
            coordinates: [4.8261, 45.7486],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Moulin Rouge',
        type: 'Cabaret',
        location: 'Paris, Pigalle',
        rating: 5,
        priceLevel: '€€€€',
        status: 'Active',
        websiteUrl: 'https://www.moulinrouge.fr',
        note: 'Famous cabaret, tourism-focused, no prostitution',
      },
      {
        name: 'Crazy Horse',
        type: 'Cabaret',
        location: 'Paris',
        rating: 5,
        priceLevel: '€€€€',
        status: 'Active',
      },
      {
        name: 'Pink Paradise',
        type: 'Strip Club',
        location: 'Paris, Champs-Élysées area',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal to sell',
      brothels: 'Illegal',
      escorts: 'Legal to provide, illegal to purchase',
      stripClubs: 'Legal',
      streetProstitution: 'Legal to offer, illegal to buy',
      workingAge: 18,
      notes: [
        'Nordic model since April 2016',
        'Buying sex is criminal offense (€1,500 fine)',
        'Sellers not criminalized',
        'Industry has gone underground',
        'Sex worker advocacy groups oppose the law',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-france/',
    recentUpdates: [
      { title: 'Debate continues over Nordic model effectiveness', date: 'January 2026' },
    ],
  },

  GB: {
    countryCode: 'GB',
    countryName: 'United Kingdom',
    flag: '🇬🇧',
    overallScore: 3,
    scoreLabel: 'Moderate',
    description: 'Complex legal status varies by region. Individual sex work is legal but brothels, soliciting, and kerb-crawling are not. Escort services operate legally through careful wording, and strip clubs are regulated.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'London',
        districtCount: 2,
        districts: [
          {
            name: 'Soho',
            description: 'Historic area with walk-ups and strip clubs',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [-0.1337, 51.5137],
          },
          {
            name: 'Shoreditch',
            description: 'Modern area with lap dancing clubs',
            status: 'Active',
            type: 'Strip Clubs',
            coordinates: [-0.0777, 51.5256],
          },
        ],
      },
      {
        cityName: 'Manchester',
        districtCount: 1,
        districts: [
          {
            name: 'Northern Quarter',
            description: 'Adult entertainment venues',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [-2.2364, 53.4846],
          },
        ],
      },
      {
        cityName: 'Birmingham',
        districtCount: 1,
        districts: [
          {
            name: 'Broad Street',
            description: 'Nightlife area with strip clubs',
            status: 'Active',
            type: 'Strip Clubs',
            coordinates: [-1.9136, 52.4764],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Spearmint Rhino',
        type: 'Strip Club Chain',
        location: 'Multiple UK locations',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Stringfellows',
        type: 'Gentlemen\'s Club',
        location: 'London',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Closed',
        note: 'Iconic club, closed in 2021',
      },
      {
        name: 'Sunset Strip',
        type: 'Walk-up',
        location: 'London Soho',
        rating: 3,
        priceLevel: '€€€',
        status: 'Active',
      },
    ],
    legalStatus: {
      prostitution: 'Legal (individual)',
      brothels: 'Illegal',
      escorts: 'Legal (careful wording)',
      stripClubs: 'Legal (licensed)',
      streetProstitution: 'Illegal (soliciting)',
      workingAge: 18,
      notes: [
        'Two or more workers = illegal brothel',
        'Advertising services with explicit terms is illegal',
        'Kerb-crawling is an offense',
        'Scotland has slightly different laws',
        'Debate on decriminalization ongoing',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-uk/',
  },

  DK: {
    countryCode: 'DK',
    countryName: 'Denmark',
    flag: '🇩🇰',
    overallScore: 5,
    scoreLabel: 'Very Permissive',
    description: 'Prostitution is legal and has been since 1999. Denmark has a pragmatic approach with visible red light areas in Copenhagen. The industry is relatively open and accepted.',
    hasRedLightDistricts: true,
    hasFKKClubs: false,
    cities: [
      {
        cityName: 'Copenhagen',
        districtCount: 2,
        districts: [
          {
            name: 'Istedgade',
            description: 'Main red light street near Central Station',
            status: 'Active',
            type: 'Red Light District',
            coordinates: [12.5568, 55.6695],
          },
          {
            name: 'Vesterbro',
            description: 'Gentrifying area with remaining adult venues',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [12.5523, 55.6689],
          },
        ],
      },
      {
        cityName: 'Aarhus',
        districtCount: 1,
        districts: [
          {
            name: 'Nørregade Area',
            description: 'Small adult entertainment area',
            status: 'Active',
            type: 'Adult Entertainment',
            coordinates: [10.2107, 56.1572],
          },
        ],
      },
    ],
    venues: [
      {
        name: 'Club Privé',
        type: 'Strip Club',
        location: 'Copenhagen',
        rating: 4,
        priceLevel: '€€€',
        status: 'Active',
      },
      {
        name: 'Body Bio',
        type: 'Massage/Adult',
        location: 'Copenhagen Vesterbro',
        rating: 3,
        priceLevel: '€€',
        status: 'Active',
      },
      {
        name: 'Wallmans',
        type: 'Dinner Show',
        location: 'Copenhagen',
        rating: 4,
        priceLevel: '€€€€',
        status: 'Active',
        note: 'Upscale dinner show, not explicit',
      },
    ],
    legalStatus: {
      prostitution: 'Legal',
      brothels: 'Illegal (grey area)',
      escorts: 'Legal',
      stripClubs: 'Legal',
      streetProstitution: 'Legal',
      workingAge: 18,
      notes: [
        'Legal since 1999',
        'Main income must not be from prostitution (rarely enforced)',
        'Organizing prostitution technically illegal',
        'Industry relatively open and accepted',
        'Health insurance covers sex workers',
      ],
    },
    sourceUrl: 'https://eurosexscene.com/sex-in-denmark/',
  },
};

/**
 * Get extended country detail data by country code
 */
export function getExtendedCountryDetailData(countryCode: string): ExtendedCountryDetailData | null {
  const code = countryCode.toUpperCase();
  return COUNTRY_DETAILS_DATA[code] || null;
}

/**
 * Get all extended country codes
 */
export function getExtendedCountryCodes(): string[] {
  return Object.keys(COUNTRY_DETAILS_DATA);
}

/**
 * Check if extended data exists for a country
 */
export function hasExtendedCountryData(countryCode: string): boolean {
  return countryCode.toUpperCase() in COUNTRY_DETAILS_DATA;
}
