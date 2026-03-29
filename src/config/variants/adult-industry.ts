/**
 * Adult Industry variant - Europe Adult Industry Map
 * 
 * Displays adult industry brands, retailers, factories, events, and regulations
 * across Europe.
 */
import type { PanelConfig, MapLayers, Feed } from '@/types';
import type { VariantConfig } from './base';
import { rssProxyUrl } from '@/utils';

// Re-export base config
export * from './base';

const rss = rssProxyUrl;

// Europe geographic bounds
export const EUROPE_BOUNDS = {
  sw: { lng: -25, lat: 34 },
  ne: { lng: 45, lat: 72 },
} as const;

// Center of Europe (roughly Germany)
export const EUROPE_CENTER = {
  lat: 50,
  lng: 10,
} as const;

// Default zoom for Europe view
export const EUROPE_DEFAULT_ZOOM = 4;
export const EUROPE_MIN_ZOOM = 3;

// Adult industry RSS feeds
export const FEEDS: Record<string, Feed[]> = {
  // Industry News - Core sources for adult industry
  industryNews: [
    { name: 'XBIZ', url: rss('https://www.xbiz.com/rss') },
    { name: 'XBIZ Europe', url: rss('https://www.xbiz.com/europe/rss') },
    { name: 'EAN Online', url: rss('https://www.ean-online.com/feed/') },
    { name: 'AVN', url: rss('https://avn.com/feed') },
  ],

  // Trade Shows & Events
  events: [
    { name: 'Venus Berlin', url: rss('https://news.google.com/rss/search?q=Venus+Berlin+fair+when:30d&hl=en&gl=US&ceid=US:en') },
    { name: 'eroFame', url: rss('https://news.google.com/rss/search?q=eroFame+Hannover+when:30d&hl=en&gl=US&ceid=US:en') },
    { name: 'Erofest', url: rss('https://news.google.com/rss/search?q=Erofest+trade+show+when:30d&hl=en&gl=US&ceid=US:en') },
  ],

  // Market & Business
  market: [
    { name: 'EU Retail News', url: rss('https://news.google.com/rss/search?q=adult+retail+Europe+business+when:7d&hl=en&gl=US&ceid=US:en') },
    { name: 'Industry Analysis', url: rss('https://news.google.com/rss/search?q=adult+industry+market+Europe+when:14d&hl=en&gl=US&ceid=US:en') },
  ],

  // Regulations & Legal
  regulations: [
    { name: 'EU Regulations', url: rss('https://news.google.com/rss/search?q=adult+content+regulation+Europe+EU+when:14d&hl=en&gl=US&ceid=US:en') },
    { name: 'Age Verification', url: rss('https://news.google.com/rss/search?q=age+verification+law+Europe+when:14d&hl=en&gl=US&ceid=US:en') },
  ],
};

// Panel configuration (using correct PanelConfig type)
export const DEFAULT_PANELS: Record<string, PanelConfig> = {
  map: { name: 'Europe Map', enabled: true, priority: 1 },
  'live-news': { name: 'Industry Headlines', enabled: true, priority: 1 },
  events: { name: 'Events & Trade Shows', enabled: true, priority: 1 },
  industryNews: { name: 'Industry News', enabled: true, priority: 1 },
  market: { name: 'Market Data', enabled: true, priority: 2 },
  regulations: { name: 'Regulations', enabled: true, priority: 2 },
  monitors: { name: 'My Monitors', enabled: true, priority: 2 },
};

// Map layers (minimal - to be expanded by future FRs)
export const DEFAULT_MAP_LAYERS: MapLayers = {
  gpsJamming: false,
  satellites: false,
  conflicts: false,
  bases: false,
  cables: false,
  pipelines: false,
  hotspots: false,
  ais: false,
  nuclear: false,
  irradiators: false,
  sanctions: false,
  weather: true,
  economic: true,
  waterways: false,
  outages: false,
  cyberThreats: false,
  datacenters: false,
  protests: false,
  flights: false,
  military: false,
  natural: false,
  spaceports: false,
  minerals: false,
  fires: false,
  ucdpEvents: false,
  displacement: false,
  climate: false,
  startupHubs: false,
  cloudRegions: false,
  accelerators: false,
  techHQs: false,
  techEvents: false,
  semiconductorHubs: false,
  irelandDataCenters: false,
  irelandTechHQs: false,
  irishUnicorns: false,
  irelandAICompanies: false,
  irelandUniversities: false,
  submarineCables: false,
  stockExchanges: false,
  financialCenters: false,
  centralBanks: false,
  commodityHubs: false,
  gulfInvestments: false,
  positiveEvents: false,
  kindness: false,
  happiness: false,
  speciesRecovery: false,
  renewableInstallations: false,
  tradeRoutes: false,
  iranAttacks: false,
  ciiChoropleth: false,
  dayNight: false,
  miningSites: false,
  processingPlants: false,
  commodityPorts: false,
  webcams: false,
};

// Mobile map layers (same as desktop for now)
export const MOBILE_DEFAULT_MAP_LAYERS: MapLayers = {
  ...DEFAULT_MAP_LAYERS,
};

// Variant configuration export
export const VARIANT_CONFIG: VariantConfig = {
  name: 'adult-industry',
  description: 'Europe Adult Industry Map - Brands, retailers, events, and regulations',
  panels: DEFAULT_PANELS,
  mapLayers: DEFAULT_MAP_LAYERS,
  mobileMapLayers: MOBILE_DEFAULT_MAP_LAYERS,

  brand: {
    displayName: 'Europe Adult Industry Map',
    logoText: 'ADULT',
    headerText: 'EUROPE ADULT INDUSTRY MAP',
  },

  map: {
    center: EUROPE_CENTER,
    defaultZoom: EUROPE_DEFAULT_ZOOM,
    minZoom: EUROPE_MIN_ZOOM,
    bounds: EUROPE_BOUNDS,
  },

  features: {
    irelandRelevanceFilter: false,
    disableCountryOverlay: false,
    expandedAttribution: false,
  },
};
