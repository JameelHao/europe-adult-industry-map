/**
 * Adult Industry Market Statistics Data
 * 
 * Market size, growth rates, and regional breakdown data
 * for the global and European adult products industry.
 */

/** Data source citation */
export interface DataSource {
  /** Source name */
  name: string;
  /** Source URL (if available) */
  url?: string;
  /** Publication year */
  year: number;
  /** Access type */
  accessType: 'public' | 'paid' | 'estimate';
}

/** Country market share */
export interface CountryMarketShare {
  /** Country name */
  country: string;
  /** ISO country code */
  countryCode: string;
  /** Market share percentage */
  sharePercent: number;
  /** Estimated market value in billions EUR */
  estimatedValueB?: number;
  /** Rank */
  rank: number;
}

/** Market segment data */
export interface MarketSegment {
  /** Segment name */
  name: string;
  /** Share percentage */
  sharePercent: number;
  /** Growth rate */
  growthPercent?: number;
}

/** Historical data point */
export interface HistoricalDataPoint {
  /** Year */
  year: number;
  /** Market size in billions EUR */
  marketSizeB: number;
  /** Growth rate from previous year */
  growthPercent?: number;
}

/** Complete market statistics */
export interface MarketStats {
  /** Global market size in billions EUR */
  globalMarketSizeB: number;
  /** EU market size in billions EUR */
  euMarketSizeB: number;
  /** Year-over-year growth percentage */
  yoyGrowthPercent: number;
  /** E-commerce share of total sales */
  ecommerceSharePercent: number;
  /** Reference year for data */
  dataYear: number;
  /** Top countries by market share */
  topCountries: CountryMarketShare[];
  /** Market segments */
  segments: MarketSegment[];
  /** Historical data */
  historical: HistoricalDataPoint[];
  /** Projections */
  projections: {
    year: number;
    marketSizeB: number;
  }[];
  /** Last updated date (ISO string) */
  lastUpdated: string;
  /** Data sources */
  sources: DataSource[];
}

/**
 * Current market statistics data
 * 
 * Note: These are estimates based on publicly available data.
 * Actual figures may vary. Data should be updated annually.
 */
export const MARKET_STATS: MarketStats = {
  globalMarketSizeB: 32.7,
  euMarketSizeB: 8.2,
  yoyGrowthPercent: 8.3,
  ecommerceSharePercent: 67,
  dataYear: 2025,
  
  topCountries: [
    {
      country: 'Germany',
      countryCode: 'DE',
      sharePercent: 28,
      estimatedValueB: 2.3,
      rank: 1,
    },
    {
      country: 'United Kingdom',
      countryCode: 'GB',
      sharePercent: 22,
      estimatedValueB: 1.8,
      rank: 2,
    },
    {
      country: 'France',
      countryCode: 'FR',
      sharePercent: 15,
      estimatedValueB: 1.2,
      rank: 3,
    },
    {
      country: 'Spain',
      countryCode: 'ES',
      sharePercent: 10,
      estimatedValueB: 0.82,
      rank: 4,
    },
    {
      country: 'Italy',
      countryCode: 'IT',
      sharePercent: 8,
      estimatedValueB: 0.66,
      rank: 5,
    },
    {
      country: 'Netherlands',
      countryCode: 'NL',
      sharePercent: 6,
      estimatedValueB: 0.49,
      rank: 6,
    },
    {
      country: 'Poland',
      countryCode: 'PL',
      sharePercent: 4,
      estimatedValueB: 0.33,
      rank: 7,
    },
    {
      country: 'Other EU',
      countryCode: 'EU',
      sharePercent: 7,
      estimatedValueB: 0.57,
      rank: 8,
    },
  ],
  
  segments: [
    {
      name: 'Vibrators & Toys',
      sharePercent: 35,
      growthPercent: 12,
    },
    {
      name: 'Lingerie & Apparel',
      sharePercent: 25,
      growthPercent: 6,
    },
    {
      name: 'Lubricants & Wellness',
      sharePercent: 18,
      growthPercent: 9,
    },
    {
      name: 'BDSM & Fetish',
      sharePercent: 12,
      growthPercent: 8,
    },
    {
      name: 'Other Products',
      sharePercent: 10,
      growthPercent: 5,
    },
  ],
  
  historical: [
    { year: 2020, marketSizeB: 24.5, growthPercent: 15 },
    { year: 2021, marketSizeB: 26.8, growthPercent: 9.4 },
    { year: 2022, marketSizeB: 28.5, growthPercent: 6.3 },
    { year: 2023, marketSizeB: 30.1, growthPercent: 5.6 },
    { year: 2024, marketSizeB: 31.5, growthPercent: 4.7 },
    { year: 2025, marketSizeB: 32.7, growthPercent: 3.8 },
  ],
  
  projections: [
    { year: 2026, marketSizeB: 35.5 },
    { year: 2027, marketSizeB: 38.5 },
    { year: 2028, marketSizeB: 41.8 },
    { year: 2029, marketSizeB: 45.2 },
    { year: 2030, marketSizeB: 49.0 },
  ],
  
  lastUpdated: '2025-12-01',
  
  sources: [
    {
      name: 'Statista',
      url: 'https://www.statista.com',
      year: 2025,
      accessType: 'public',
    },
    {
      name: 'Grand View Research',
      url: 'https://www.grandviewresearch.com',
      year: 2024,
      accessType: 'paid',
    },
    {
      name: 'Allied Market Research',
      url: 'https://www.alliedmarketresearch.com',
      year: 2024,
      accessType: 'paid',
    },
    {
      name: 'Industry Estimates',
      year: 2025,
      accessType: 'estimate',
    },
  ],
};

/**
 * Get market stats
 */
export function getMarketStats(): MarketStats {
  return MARKET_STATS;
}

/**
 * Get EU market size in billions
 */
export function getEUMarketSize(): number {
  return MARKET_STATS.euMarketSizeB;
}

/**
 * Get global market size in billions
 */
export function getGlobalMarketSize(): number {
  return MARKET_STATS.globalMarketSizeB;
}

/**
 * Get EU's share of global market
 */
export function getEUGlobalShare(): number {
  return (MARKET_STATS.euMarketSizeB / MARKET_STATS.globalMarketSizeB) * 100;
}

/**
 * Get top N countries by market share
 */
export function getTopCountries(n = 5): CountryMarketShare[] {
  return MARKET_STATS.topCountries
    .filter(c => c.countryCode !== 'EU') // Exclude "Other EU"
    .slice(0, n);
}

/**
 * Get country market data by code
 */
export function getCountryMarketData(countryCode: string): CountryMarketShare | undefined {
  return MARKET_STATS.topCountries.find(
    c => c.countryCode.toUpperCase() === countryCode.toUpperCase()
  );
}

/**
 * Get segment by name
 */
export function getSegment(name: string): MarketSegment | undefined {
  return MARKET_STATS.segments.find(
    s => s.name.toLowerCase().includes(name.toLowerCase())
  );
}

/**
 * Get fastest growing segment
 */
export function getFastestGrowingSegment(): MarketSegment {
  return MARKET_STATS.segments.reduce((fastest, current) => 
    (current.growthPercent ?? 0) > (fastest.growthPercent ?? 0) ? current : fastest
  );
}

/**
 * Get historical growth rate for a year
 */
export function getHistoricalGrowth(year: number): number | undefined {
  return MARKET_STATS.historical.find(h => h.year === year)?.growthPercent;
}

/**
 * Get projected market size for a year
 */
export function getProjectedMarketSize(year: number): number | undefined {
  return MARKET_STATS.projections.find(p => p.year === year)?.marketSizeB;
}

/**
 * Get CAGR (Compound Annual Growth Rate) from historical data
 */
export function getHistoricalCAGR(): number {
  const historical = MARKET_STATS.historical;
  if (historical.length < 2) return 0;
  
  const startYear = historical[0];
  const endYear = historical[historical.length - 1];
  
  if (!startYear || !endYear) return 0;
  
  const years = endYear.year - startYear.year;
  if (years <= 0) return 0;
  
  return ((endYear.marketSizeB / startYear.marketSizeB) ** (1 / years) - 1) * 100;
}

/**
 * Get projected CAGR
 */
export function getProjectedCAGR(): number {
  const projections = MARKET_STATS.projections;
  if (projections.length < 1) return 0;
  
  const currentSize = MARKET_STATS.globalMarketSizeB;
  const endProjection = projections[projections.length - 1];
  
  if (!endProjection) return 0;
  
  const years = endProjection.year - MARKET_STATS.dataYear;
  if (years <= 0) return 0;
  
  return ((endProjection.marketSizeB / currentSize) ** (1 / years) - 1) * 100;
}

/**
 * Format market size for display
 */
export function formatMarketSize(sizeB: number): string {
  if (sizeB >= 1) {
    return `€${sizeB.toFixed(1)}B`;
  }
  return `€${(sizeB * 1000).toFixed(0)}M`;
}

/**
 * Format percentage for display
 */
export function formatPercent(value: number): string {
  return `${value >= 0 ? '+' : ''}${value.toFixed(1)}%`;
}

/**
 * Get data freshness status
 */
export function getDataFreshness(): 'current' | 'recent' | 'outdated' {
  const lastUpdated = new Date(MARKET_STATS.lastUpdated);
  const now = new Date();
  const monthsOld = (now.getFullYear() - lastUpdated.getFullYear()) * 12 + 
                    (now.getMonth() - lastUpdated.getMonth());
  
  if (monthsOld <= 6) return 'current';
  if (monthsOld <= 12) return 'recent';
  return 'outdated';
}

/**
 * Get summary stats for display
 */
export function getMarketSummary(): {
  globalSize: string;
  euSize: string;
  growth: string;
  ecommerce: string;
  topCountry: string;
  dataYear: number;
  freshness: 'current' | 'recent' | 'outdated';
} {
  const stats = MARKET_STATS;
  const topCountry = stats.topCountries[0];
  return {
    globalSize: formatMarketSize(stats.globalMarketSizeB),
    euSize: formatMarketSize(stats.euMarketSizeB),
    growth: formatPercent(stats.yoyGrowthPercent),
    ecommerce: `${stats.ecommerceSharePercent}%`,
    topCountry: topCountry?.country ?? 'Unknown',
    dataYear: stats.dataYear,
    freshness: getDataFreshness(),
  };
}
