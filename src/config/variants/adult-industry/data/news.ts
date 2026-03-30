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
 * These are realistic headlines with real URLs from eurosexscene.com
 */
export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: 'sample-1',
    title: 'Germany Maintains Position as Europe\'s Largest Adult Market',
    source: 'Euro Sex Scene',
    date: '2026-03-28',
    url: 'https://eurosexscene.com/sex-in-germany/',
    summary: 'With fully legal prostitution since 2002, Germany leads the European adult industry.',
    category: 'market',
  },
  {
    id: 'sample-2',
    title: 'Belgium\'s Sex Work Revolution: A Legal Template for Europe?',
    source: 'Euro Sex Scene',
    date: '2026-03-27',
    url: 'https://eurosexscene.com/belgiums-sex-worker-revolution/',
    summary: 'Belgium\'s progressive approach to sex work regulation gains attention across Europe.',
    category: 'regulation',
  },
  {
    id: 'sample-3',
    title: 'Amsterdam Red Light District: Is De Wallen Moving?',
    source: 'Euro Sex Scene',
    date: '2026-03-26',
    url: 'https://eurosexscene.com/amsterdams-sex-district-relocation/',
    summary: 'Proposed changes to Amsterdam\'s iconic De Wallen district spark international debate.',
    category: 'industry',
  },
  {
    id: 'sample-4',
    title: 'FKK Germany: What to Expect at a Sauna Club',
    source: 'Euro Sex Scene',
    date: '2026-03-25',
    url: 'https://eurosexscene.com/fkk-germany-what-to-expect-at-a-sauna-club/',
    summary: 'A comprehensive guide to Germany\'s unique FKK sauna club culture.',
    category: 'industry',
  },
  {
    id: 'sample-5',
    title: 'Prague Nightlife Guide: Best Clubs and Entertainment',
    source: 'Euro Sex Scene',
    date: '2026-03-24',
    url: 'https://eurosexscene.com/sex-in-czech-republic/prague-escorts-sex-guide/',
    summary: 'Exploring Prague\'s vibrant nightlife scene and entertainment options.',
    category: 'event',
  },
  {
    id: 'sample-6',
    title: 'Vienna\'s FKK Goldentime: Europe\'s Premier Sauna Club',
    source: 'Euro Sex Scene',
    date: '2026-03-23',
    url: 'https://eurosexscene.com/sex-in-austria/',
    summary: 'Vienna\'s legendary FKK Goldentime continues to attract visitors from across Europe.',
    category: 'industry',
  },
  {
    id: 'sample-7',
    title: 'Understanding European Sex Work Regulations by Country',
    source: 'Euro Sex Scene',
    date: '2026-03-22',
    url: 'https://eurosexscene.com/country-guides/',
    summary: 'A comprehensive overview of sex work laws and regulations across European nations.',
    category: 'regulation',
  },
  {
    id: 'sample-8',
    title: 'Top Red Light Districts in Europe: Complete Guide',
    source: 'Euro Sex Scene',
    date: '2026-03-21',
    url: 'https://eurosexscene.com/red-light-districts/',
    summary: 'Exploring Europe\'s most famous red light districts from Amsterdam to Hamburg.',
    category: 'industry',
  },
  {
    id: 'sample-9',
    title: 'Hamburg Reeperbahn: Germany\'s Most Famous Sin Mile',
    source: 'Euro Sex Scene',
    date: '2026-03-20',
    url: 'https://eurosexscene.com/sex-in-germany/hamburg-escorts-sex-guide/',
    summary: 'The legendary Reeperbahn remains Hamburg\'s premier entertainment destination.',
    category: 'event',
  },
  {
    id: 'sample-10',
    title: 'Best Brothels in Munich: Complete 2026 Guide',
    source: 'Euro Sex Scene',
    date: '2026-03-19',
    url: 'https://eurosexscene.com/sex-in-germany/munich-escorts-sex-guide/',
    summary: 'Munich offers some of Germany\'s most upscale adult entertainment venues.',
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
