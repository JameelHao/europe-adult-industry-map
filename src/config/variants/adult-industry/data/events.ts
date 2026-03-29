/**
 * Adult Industry Events Data
 * 
 * Trade shows, conferences, awards ceremonies, and expos
 * across Europe for the adult industry.
 */

/** Event type categories */
export type EventType = 'trade-show' | 'conference' | 'awards' | 'expo';

/** Industry event definition */
export interface IndustryEvent {
  /** Unique identifier */
  id: string;
  /** Event name */
  name: string;
  /** Event type */
  type: EventType;
  /** Location details */
  location: {
    /** Venue name */
    venue: string;
    /** City */
    city: string;
    /** Country */
    country: string;
    /** Coordinates [longitude, latitude] */
    coordinates: [number, number];
  };
  /** Event dates */
  dates: {
    /** Start date ISO string */
    start: string;
    /** End date ISO string */
    end: string;
  };
  /** Event website URL */
  website?: string;
  /** Event description */
  description?: string;
  /** Expected attendance */
  attendance?: number;
  /** Whether event is B2B only (trade professionals) */
  b2bOnly: boolean;
}

/** Color mapping for event types */
export const EVENT_TYPE_COLORS: Record<EventType, string> = {
  'trade-show': '#FF6B35',  // Orange
  'conference': '#4ECDC4',  // Teal
  'awards': '#FFD700',      // Gold
  'expo': '#9B59B6',        // Purple
};

/** Icon mapping for event types */
export const EVENT_TYPE_ICONS: Record<EventType, string> = {
  'trade-show': '🏪',
  'conference': '🎤',
  'awards': '🏆',
  'expo': '🎪',
};

/** Label mapping for event types */
export const EVENT_TYPE_LABELS: Record<EventType, string> = {
  'trade-show': 'Trade Show',
  'conference': 'Conference',
  'awards': 'Awards',
  'expo': 'Expo',
};

/**
 * Industry events dataset
 * 
 * Note: Dates are approximate and should be verified
 * with official event websites before publication.
 */
export const INDUSTRY_EVENTS: IndustryEvent[] = [
  // Major Trade Shows
  {
    id: 'erofame-2026',
    name: 'eroFame',
    type: 'trade-show',
    location: {
      venue: 'Messe Hannover',
      city: 'Hannover',
      country: 'Germany',
      coordinates: [9.7320, 52.3759],
    },
    dates: {
      start: '2026-10-07',
      end: '2026-10-09',
    },
    website: 'https://www.erofame.eu',
    description: "Europe's largest B2B erotic trade fair",
    attendance: 3500,
    b2bOnly: true,
  },
  {
    id: 'venus-berlin-2026',
    name: 'Venus Berlin',
    type: 'expo',
    location: {
      venue: 'Messe Berlin',
      city: 'Berlin',
      country: 'Germany',
      coordinates: [13.2700, 52.5000],
    },
    dates: {
      start: '2026-10-22',
      end: '2026-10-25',
    },
    website: 'https://venus-berlin.com',
    description: 'International erotic trade fair and expo',
    attendance: 30000,
    b2bOnly: false,
  },
  {
    id: 'ean-erofame-2026',
    name: 'EAN eroFame Party',
    type: 'conference',
    location: {
      venue: 'Messe Hannover',
      city: 'Hannover',
      country: 'Germany',
      coordinates: [9.7320, 52.3759],
    },
    dates: {
      start: '2026-10-08',
      end: '2026-10-08',
    },
    website: 'https://www.ean-online.com',
    description: 'EAN networking event at eroFame',
    b2bOnly: true,
  },
  
  // Awards Shows
  {
    id: 'xbiz-europe-2026',
    name: 'XBIZ Europe Awards',
    type: 'awards',
    location: {
      venue: 'Hotel Adlon Kempinski',
      city: 'Berlin',
      country: 'Germany',
      coordinates: [13.3795, 52.5163],
    },
    dates: {
      start: '2026-09-15',
      end: '2026-09-15',
    },
    website: 'https://www.xbizeurope.com',
    description: 'Annual awards ceremony for European adult industry',
    attendance: 500,
    b2bOnly: true,
  },
  {
    id: 'ean-awards-2026',
    name: 'EAN Erotix Awards',
    type: 'awards',
    location: {
      venue: 'Messe Hannover',
      city: 'Hannover',
      country: 'Germany',
      coordinates: [9.7320, 52.3759],
    },
    dates: {
      start: '2026-10-07',
      end: '2026-10-07',
    },
    website: 'https://www.ean-online.com',
    description: 'European adult industry awards by EAN magazine',
    b2bOnly: true,
  },

  // Regional Shows
  {
    id: 'expoerotic-madrid-2026',
    name: 'ExpoErotic Madrid',
    type: 'expo',
    location: {
      venue: 'IFEMA Madrid',
      city: 'Madrid',
      country: 'Spain',
      coordinates: [-3.6167, 40.4667],
    },
    dates: {
      start: '2026-05-15',
      end: '2026-05-17',
    },
    website: 'https://www.expoeroticmadrid.com',
    description: 'Spanish adult entertainment expo',
    attendance: 15000,
    b2bOnly: false,
  },
  {
    id: 'salon-erotico-barcelona-2026',
    name: 'Salón Erótico de Barcelona',
    type: 'expo',
    location: {
      venue: 'Fira Barcelona',
      city: 'Barcelona',
      country: 'Spain',
      coordinates: [2.1734, 41.3851],
    },
    dates: {
      start: '2026-09-26',
      end: '2026-09-29',
    },
    website: 'https://www.saloneroticodebarcelona.com',
    description: "Spain's largest erotic festival",
    attendance: 25000,
    b2bOnly: false,
  },
  {
    id: 'eroexpo-moscow-2026',
    name: 'EroExpo',
    type: 'trade-show',
    location: {
      venue: 'Crocus Expo',
      city: 'Moscow',
      country: 'Russia',
      coordinates: [37.3954, 55.8224],
    },
    dates: {
      start: '2026-11-13',
      end: '2026-11-15',
    },
    website: 'https://www.eroexpo.ru',
    description: 'Russian adult industry trade show',
    attendance: 10000,
    b2bOnly: false,
  },

  // UK Events
  {
    id: 'etoshow-2026',
    name: 'ETO Show',
    type: 'trade-show',
    location: {
      venue: 'NEC Birmingham',
      city: 'Birmingham',
      country: 'United Kingdom',
      coordinates: [-1.7254, 52.4524],
    },
    dates: {
      start: '2026-06-28',
      end: '2026-06-29',
    },
    website: 'https://www.etoshow.com',
    description: 'UK adult retail trade show',
    attendance: 2000,
    b2bOnly: true,
  },
  
  // Netherlands
  {
    id: 'erotica-fair-amsterdam-2026',
    name: 'Erotica Fair Amsterdam',
    type: 'expo',
    location: {
      venue: 'RAI Amsterdam',
      city: 'Amsterdam',
      country: 'Netherlands',
      coordinates: [4.8910, 52.3400],
    },
    dates: {
      start: '2026-04-18',
      end: '2026-04-20',
    },
    description: 'Amsterdam adult lifestyle expo',
    attendance: 8000,
    b2bOnly: false,
  },

  // Industry Conferences
  {
    id: 'european-summit-2026',
    name: 'European Summit',
    type: 'conference',
    location: {
      venue: 'W Barcelona',
      city: 'Barcelona',
      country: 'Spain',
      coordinates: [2.1894, 41.3679],
    },
    dates: {
      start: '2026-03-02',
      end: '2026-03-05',
    },
    website: 'https://www.theeuropeansummit.com',
    description: 'Digital media and affiliate conference',
    attendance: 4000,
    b2bOnly: true,
  },
  {
    id: 'webmaster-access-amsterdam-2026',
    name: 'Webmaster Access Amsterdam',
    type: 'conference',
    location: {
      venue: 'Beurs van Berlage',
      city: 'Amsterdam',
      country: 'Netherlands',
      coordinates: [4.8952, 52.3747],
    },
    dates: {
      start: '2026-09-05',
      end: '2026-09-08',
    },
    website: 'https://www.webmasteraccess.com',
    description: 'Digital adult industry networking conference',
    attendance: 1500,
    b2bOnly: true,
  },
];

/**
 * Get all events sorted by start date
 */
export function getEventsSortedByDate(): IndustryEvent[] {
  return [...INDUSTRY_EVENTS].sort((a, b) => 
    new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime()
  );
}

/**
 * Get events by type
 */
export function getEventsByType(type: EventType): IndustryEvent[] {
  return INDUSTRY_EVENTS.filter(e => e.type === type);
}

/**
 * Get upcoming events (from a reference date)
 */
export function getUpcomingEvents(fromDate: Date = new Date()): IndustryEvent[] {
  const fromTime = fromDate.getTime();
  return INDUSTRY_EVENTS
    .filter(e => new Date(e.dates.start).getTime() >= fromTime)
    .sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime());
}

/**
 * Get events happening within N days
 */
export function getEventsWithinDays(days: number, fromDate: Date = new Date()): IndustryEvent[] {
  const fromTime = fromDate.getTime();
  const untilTime = fromTime + days * 24 * 60 * 60 * 1000;
  return INDUSTRY_EVENTS
    .filter(e => {
      const startTime = new Date(e.dates.start).getTime();
      return startTime >= fromTime && startTime <= untilTime;
    })
    .sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime());
}

/**
 * Get B2B only events
 */
export function getB2BEvents(): IndustryEvent[] {
  return INDUSTRY_EVENTS.filter(e => e.b2bOnly);
}

/**
 * Get public (non-B2B) events
 */
export function getPublicEvents(): IndustryEvent[] {
  return INDUSTRY_EVENTS.filter(e => !e.b2bOnly);
}

/**
 * Get days until event
 */
export function getDaysUntilEvent(event: IndustryEvent, fromDate: Date = new Date()): number {
  const startTime = new Date(event.dates.start).getTime();
  const fromTime = fromDate.getTime();
  return Math.ceil((startTime - fromTime) / (24 * 60 * 60 * 1000));
}

/**
 * Check if event is happening now
 */
export function isEventOngoing(event: IndustryEvent, checkDate: Date = new Date()): boolean {
  const checkTime = checkDate.getTime();
  const startTime = new Date(event.dates.start).getTime();
  const endTime = new Date(event.dates.end).getTime() + 24 * 60 * 60 * 1000; // Include end day
  return checkTime >= startTime && checkTime <= endTime;
}

/**
 * Get event by ID
 */
export function getEventById(id: string): IndustryEvent | undefined {
  return INDUSTRY_EVENTS.find(e => e.id === id);
}

/**
 * Get events by country
 */
export function getEventsByCountry(country: string): IndustryEvent[] {
  return INDUSTRY_EVENTS.filter(e => 
    e.location.country.toLowerCase() === country.toLowerCase()
  );
}

/**
 * Get unique countries with events
 */
export function getEventCountries(): string[] {
  return [...new Set(INDUSTRY_EVENTS.map(e => e.location.country))].sort();
}
