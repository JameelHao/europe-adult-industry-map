/**
 * Adult Industry News Data
 *
 * RSS feed configurations and static sample news for fallback.
 */

/** RSS feed configuration */
export interface RssFeedConfig {
  /** Feed name */
  name: string;
  /** RSS feed URL (via proxy) */
  url: string;
  /** Feed icon */
  icon?: string;
}

/** News item */
export interface NewsItem {
  /** Unique identifier */
  id: string;
  /** Article title */
  title: string;
  /** Source name */
  source: string;
  /** Publication date ISO string */
  date: string;
  /** Article URL */
  url: string;
  /** Short summary */
  summary?: string;
  /** Category */
  category?: 'industry' | 'market' | 'regulation' | 'event' | 'general';
}

/**
 * RSS feeds for adult industry news
 * Uses rss-proxy to avoid CORS issues
 */
export const RSS_FEEDS: RssFeedConfig[] = [
  {
    name: 'Euro Sex Scene',
    url: '/api/rss-proxy?url=https://eurosexscene.com/feed/',
    icon: '🇪🇺',
  },
  {
    name: 'XBIZ',
    url: '/api/rss-proxy?url=https://www.xbiz.com/rss',
    icon: '📰',
  },
  {
    name: 'EAN',
    url: '/api/rss-proxy?url=https://ean-online.com/feed/',
    icon: '🗞️',
  },
];

/**
 * Static sample news for fallback when RSS is unavailable
 * These are realistic sample headlines for demonstration
 */
export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: 'sample-1',
    title: 'European Adult Industry Sees 8.3% Growth in 2025',
    source: 'Industry Report',
    date: '2026-03-28',
    url: '#',
    summary: 'The European adult entertainment market continues to expand with digital sales leading growth.',
    category: 'market',
  },
  {
    id: 'sample-2',
    title: 'Germany Updates Age Verification Requirements for Online Retailers',
    source: 'Regulatory News',
    date: '2026-03-27',
    url: '#',
    summary: 'New regulations require enhanced ID verification for all online adult product sales.',
    category: 'regulation',
  },
  {
    id: 'sample-3',
    title: 'Venus Berlin 2026 Announces Record Exhibitor Numbers',
    source: 'Event News',
    date: '2026-03-26',
    url: '#',
    summary: 'Europe\'s largest adult trade show expects over 300 exhibitors this October.',
    category: 'event',
  },
  {
    id: 'sample-4',
    title: 'Spanish Market Emerges as Key Growth Region',
    source: 'Market Analysis',
    date: '2026-03-25',
    url: '#',
    summary: 'Spain sees 12% year-over-year growth in adult retail sector.',
    category: 'market',
  },
  {
    id: 'sample-5',
    title: 'EU Proposes Harmonized Labeling Standards for Adult Products',
    source: 'Policy Update',
    date: '2026-03-24',
    url: '#',
    summary: 'Draft regulation aims to standardize product labeling across member states.',
    category: 'regulation',
  },
  {
    id: 'sample-6',
    title: 'EAN Awards 2026 Nominations Open',
    source: 'EAN',
    date: '2026-03-23',
    url: '#',
    summary: 'Industry awards ceremony accepting nominations through May 15.',
    category: 'event',
  },
  {
    id: 'sample-7',
    title: 'Netherlands Retail Chain Expands to Belgium',
    source: 'Business News',
    date: '2026-03-22',
    url: '#',
    summary: 'Major Dutch retailer opens first Belgian locations in Brussels and Antwerp.',
    category: 'industry',
  },
  {
    id: 'sample-8',
    title: 'Sustainability Focus: Industry Moves Toward Eco-Friendly Materials',
    source: 'Industry Trends',
    date: '2026-03-21',
    url: '#',
    summary: 'Major manufacturers commit to recyclable packaging by 2027.',
    category: 'industry',
  },
];

/** Category colors */
export const NEWS_CATEGORY_COLORS: Record<string, string> = {
  industry: '#4A90D9',
  market: '#50C878',
  regulation: '#FF6B35',
  event: '#9B59B6',
  general: '#888888',
};

/** Category labels */
export const NEWS_CATEGORY_LABELS: Record<string, string> = {
  industry: 'Industry',
  market: 'Market',
  regulation: 'Regulation',
  event: 'Event',
  general: 'General',
};

/**
 * Get sample news items
 * @param limit Maximum number of items to return
 */
export function getSampleNews(limit = 10): NewsItem[] {
  return SAMPLE_NEWS.slice(0, limit);
}

/**
 * Get news by category
 */
export function getNewsByCategory(category: NewsItem['category']): NewsItem[] {
  return SAMPLE_NEWS.filter(n => n.category === category);
}
