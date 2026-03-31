/**
 * Reference Content Data
 *
 * Article links and summaries from reference website (earthtrip.wixsite.com/adventure)
 * for integration on country detail pages.
 */

/** Reference article type */
export type ArticleType = 'Guide' | 'Review' | 'News' | 'Overview';

/** Reference article structure */
export interface ReferenceArticle {
  /** Chinese title */
  title: string;
  /** English title (optional) */
  titleEn?: string;
  /** Publication date */
  date: string;
  /** External URL */
  url: string;
  /** Brief summary (1-2 sentences) */
  summary: string;
  /** Article type */
  type: ArticleType;
  /** Topic tags (optional) */
  topics?: string[];
}

/**
 * Reference articles by country code
 */
export const REFERENCE_ARTICLES: Record<string, ReferenceArticle[]> = {
  NL: [
    {
      title: '荷兰的橱窗妓院',
      titleEn: 'Window Brothels in Netherlands',
      date: '2016-05-23',
      url: 'https://earthtrip.wixsite.com/adventure/holland-1',
      summary: 'Comprehensive guide to Amsterdam classic red light district with window prostitution culture and history.',
      type: 'Guide',
      topics: ['Amsterdam', 'Window Prostitution', 'De Wallen'],
    },
    {
      title: '阿姆斯特丹的红灯区',
      titleEn: 'Amsterdam Red Light District',
      date: '2017-05-15',
      url: 'https://earthtrip.wixsite.com/adventure/holland-2',
      summary: 'Overview of Amsterdam Red Light District bridges, canals, and scenic atmosphere.',
      type: 'Overview',
      topics: ['Amsterdam', 'Red Light District'],
    },
    {
      title: '荷兰 阿姆斯特丹的风月场所组',
      titleEn: 'Amsterdam Adult Venues Collection',
      date: '2019-12-26',
      url: 'https://earthtrip.wixsite.com/adventure/holland-3',
      summary: 'Compilation of neon-lit streets and various adult entertainment venues in Amsterdam.',
      type: 'Overview',
      topics: ['Amsterdam', 'Nightlife', 'Venues'],
    },
    {
      title: '荷兰 Eindhoven 的橱窗妓院',
      titleEn: 'Window Brothels in Eindhoven',
      date: '2019-08-10',
      url: 'https://earthtrip.wixsite.com/adventure/holland-4',
      summary: 'Guide to window prostitution in Eindhoven, an alternative to Amsterdam.',
      type: 'Guide',
      topics: ['Eindhoven', 'Window Prostitution'],
    },
    {
      title: '阿姆斯特丹的真人性事表演考察',
      titleEn: 'Live Sex Shows in Amsterdam',
      date: '2020-03-31',
      url: 'https://earthtrip.wixsite.com/adventure/holland-5',
      summary: 'Review of live sex shows and strip bars in Amsterdam Red Light District.',
      type: 'Review',
      topics: ['Amsterdam', 'Live Shows', 'Strip Bars'],
    },
    {
      title: '阿姆斯特丹的伴游服务体验',
      titleEn: 'Escort Services in Amsterdam',
      date: '2020-12-15',
      url: 'https://earthtrip.wixsite.com/adventure/holland-6',
      summary: 'Guide to escort services and canal-side experiences in Amsterdam.',
      type: 'Guide',
      topics: ['Amsterdam', 'Escort Services'],
    },
    {
      title: '阿姆斯特丹的真人秀 AIA 俱乐部体验',
      titleEn: 'Casa Rosso & AIA Club Experience',
      date: '2021-06-20',
      url: 'https://earthtrip.wixsite.com/adventure/holland-7',
      summary: 'Review of Casa Rosso and other famous live show venues in Amsterdam.',
      type: 'Review',
      topics: ['Amsterdam', 'Casa Rosso', 'Live Shows'],
    },
    {
      title: '荷兰阿姆斯特丹和乌得勒支妓院红橙蓝探访记',
      titleEn: 'Amsterdam & Utrecht Multi-City Guide',
      date: '2023-12-10',
      url: 'https://earthtrip.wixsite.com/adventure/holland-8',
      summary: 'Multi-city guide covering Amsterdam and Utrecht red light areas with detailed maps.',
      type: 'Guide',
      topics: ['Amsterdam', 'Utrecht', 'Multi-City'],
    },
  ],

  DE: [
    {
      title: '德国汉堡红灯区',
      titleEn: 'Hamburg Red Light District',
      date: '2017-08-15',
      url: 'https://earthtrip.wixsite.com/adventure/germany-1',
      summary: 'Guide to Hamburg\'s famous Reeperbahn and Herbertstraße red light areas.',
      type: 'Guide',
      topics: ['Hamburg', 'Reeperbahn', 'Herbertstraße'],
    },
    {
      title: '德国FKK俱乐部体验',
      titleEn: 'German FKK Club Experience',
      date: '2018-05-20',
      url: 'https://earthtrip.wixsite.com/adventure/germany-2',
      summary: 'Comprehensive guide to German FKK (nude) clubs and sauna club culture.',
      type: 'Guide',
      topics: ['FKK', 'Sauna Clubs', 'Germany'],
    },
    {
      title: '法兰克福红灯区探访',
      titleEn: 'Frankfurt Red Light District',
      date: '2019-03-10',
      url: 'https://earthtrip.wixsite.com/adventure/germany-3',
      summary: 'Overview of Frankfurt\'s Bahnhofsviertel red light district near the station.',
      type: 'Overview',
      topics: ['Frankfurt', 'Bahnhofsviertel'],
    },
    {
      title: '德国科隆风月场所',
      titleEn: 'Cologne Adult Venues',
      date: '2020-02-28',
      url: 'https://earthtrip.wixsite.com/adventure/germany-4',
      summary: 'Guide to Cologne\'s adult entertainment including the former Pascha area.',
      type: 'Guide',
      topics: ['Cologne', 'Pascha', 'Brothels'],
    },
  ],

  AT: [
    {
      title: '维也纳红灯区指南',
      titleEn: 'Vienna Red Light District Guide',
      date: '2018-09-12',
      url: 'https://earthtrip.wixsite.com/adventure/austria-1',
      summary: 'Guide to Vienna\'s Gürtel area and legal brothel system.',
      type: 'Guide',
      topics: ['Vienna', 'Gürtel', 'Brothels'],
    },
    {
      title: '奥地利FKK俱乐部体验',
      titleEn: 'Austrian FKK Club Experience',
      date: '2019-06-18',
      url: 'https://earthtrip.wixsite.com/adventure/austria-2',
      summary: 'Review of famous Austrian FKK clubs including Goldentime and Funpalast.',
      type: 'Review',
      topics: ['FKK', 'Goldentime', 'Vienna'],
    },
    {
      title: '萨尔茨堡成人娱乐',
      titleEn: 'Salzburg Adult Entertainment',
      date: '2020-07-22',
      url: 'https://earthtrip.wixsite.com/adventure/austria-3',
      summary: 'Overview of adult entertainment options in Salzburg and surroundings.',
      type: 'Overview',
      topics: ['Salzburg', 'Austria'],
    },
  ],

  CH: [
    {
      title: '瑞士苏黎世红灯区',
      titleEn: 'Zurich Red Light District',
      date: '2018-04-05',
      url: 'https://earthtrip.wixsite.com/adventure/switzerland-1',
      summary: 'Guide to Zurich\'s Langstrasse red light area and sex boxes.',
      type: 'Guide',
      topics: ['Zurich', 'Langstrasse', 'Sex Boxes'],
    },
    {
      title: '日内瓦成人场所',
      titleEn: 'Geneva Adult Venues',
      date: '2019-11-30',
      url: 'https://earthtrip.wixsite.com/adventure/switzerland-2',
      summary: 'Overview of Geneva\'s Pâquis area and adult entertainment scene.',
      type: 'Overview',
      topics: ['Geneva', 'Pâquis'],
    },
    {
      title: '瑞士高端伴游服务',
      titleEn: 'Swiss High-End Escort Services',
      date: '2021-03-15',
      url: 'https://earthtrip.wixsite.com/adventure/switzerland-3',
      summary: 'Guide to premium escort services in Swiss major cities.',
      type: 'Guide',
      topics: ['Escort', 'Luxury', 'Switzerland'],
    },
  ],

  BE: [
    {
      title: '布鲁塞尔红灯区',
      titleEn: 'Brussels Red Light District',
      date: '2017-10-20',
      url: 'https://earthtrip.wixsite.com/adventure/belgium-1',
      summary: 'Guide to Brussels Rue d\'Aerschot and Alhambra quarter red light areas.',
      type: 'Guide',
      topics: ['Brussels', 'Rue d\'Aerschot', 'Alhambra'],
    },
    {
      title: '安特卫普窗口妓院',
      titleEn: 'Antwerp Window Brothels',
      date: '2018-06-14',
      url: 'https://earthtrip.wixsite.com/adventure/belgium-2',
      summary: 'Overview of Antwerp\'s Schipperskwartier and Villa Tinto area.',
      type: 'Overview',
      topics: ['Antwerp', 'Schipperskwartier', 'Villa Tinto'],
    },
    {
      title: '根特红灯区探访',
      titleEn: 'Ghent Red Light Visit',
      date: '2019-09-08',
      url: 'https://earthtrip.wixsite.com/adventure/belgium-3',
      summary: 'Small but unique red light district experience in historic Ghent.',
      type: 'Review',
      topics: ['Ghent', 'Window Prostitution'],
    },
  ],

  CZ: [
    {
      title: '布拉格夜生活指南',
      titleEn: 'Prague Nightlife Guide',
      date: '2017-07-25',
      url: 'https://earthtrip.wixsite.com/adventure/czech-1',
      summary: 'Comprehensive guide to Prague strip clubs and adult entertainment.',
      type: 'Guide',
      topics: ['Prague', 'Strip Clubs', 'Nightlife'],
    },
    {
      title: '布拉格瓦茨拉夫广场周边',
      titleEn: 'Wenceslas Square Area',
      date: '2018-12-05',
      url: 'https://earthtrip.wixsite.com/adventure/czech-2',
      summary: 'Overview of adult venues around Wenceslas Square in central Prague.',
      type: 'Overview',
      topics: ['Prague', 'Wenceslas Square'],
    },
    {
      title: '捷克边境小镇体验',
      titleEn: 'Czech Border Town Experience',
      date: '2020-01-18',
      url: 'https://earthtrip.wixsite.com/adventure/czech-3',
      summary: 'Guide to border town clubs serving German visitors in Cheb area.',
      type: 'Guide',
      topics: ['Cheb', 'Border Towns', 'Germany'],
    },
  ],

  ES: [
    {
      title: '巴塞罗那红灯区',
      titleEn: 'Barcelona Red Light District',
      date: '2018-02-10',
      url: 'https://earthtrip.wixsite.com/adventure/spain-1',
      summary: 'Guide to Barcelona\'s El Raval area and famous Bagdad show.',
      type: 'Guide',
      topics: ['Barcelona', 'El Raval', 'Bagdad'],
    },
    {
      title: '马德里成人娱乐',
      titleEn: 'Madrid Adult Entertainment',
      date: '2019-04-22',
      url: 'https://earthtrip.wixsite.com/adventure/spain-2',
      summary: 'Overview of Madrid\'s discrete adult venues and escort scene.',
      type: 'Overview',
      topics: ['Madrid', 'Escort', 'Clubs'],
    },
    {
      title: '马贝拉高端场所',
      titleEn: 'Marbella High-End Venues',
      date: '2020-08-05',
      url: 'https://earthtrip.wixsite.com/adventure/spain-3',
      summary: 'Guide to luxury adult entertainment in Costa del Sol resort area.',
      type: 'Guide',
      topics: ['Marbella', 'Costa del Sol', 'Luxury'],
    },
  ],

  FR: [
    {
      title: '巴黎皮加勒红灯区',
      titleEn: 'Paris Pigalle Red Light District',
      date: '2017-11-08',
      url: 'https://earthtrip.wixsite.com/adventure/france-1',
      summary: 'Historic guide to Pigalle area including Moulin Rouge and strip clubs.',
      type: 'Guide',
      topics: ['Paris', 'Pigalle', 'Moulin Rouge'],
    },
    {
      title: '法国北欧模式影响',
      titleEn: 'Nordic Model Impact in France',
      date: '2019-02-14',
      url: 'https://earthtrip.wixsite.com/adventure/france-2',
      summary: 'Analysis of how the 2016 Nordic model law changed the French industry.',
      type: 'News',
      topics: ['Nordic Model', 'Law', 'France'],
    },
    {
      title: '里昂成人场所',
      titleEn: 'Lyon Adult Venues',
      date: '2020-06-30',
      url: 'https://earthtrip.wixsite.com/adventure/france-3',
      summary: 'Overview of discrete adult entertainment options in Lyon.',
      type: 'Overview',
      topics: ['Lyon', 'France'],
    },
  ],

  GB: [
    {
      title: '伦敦苏荷区指南',
      titleEn: 'London Soho Guide',
      date: '2018-01-22',
      url: 'https://earthtrip.wixsite.com/adventure/uk-1',
      summary: 'Guide to Soho\'s walk-ups, strip clubs, and adult entertainment history.',
      type: 'Guide',
      topics: ['London', 'Soho', 'Walk-ups'],
    },
    {
      title: '英国脱衣舞俱乐部',
      titleEn: 'UK Strip Club Scene',
      date: '2019-05-10',
      url: 'https://earthtrip.wixsite.com/adventure/uk-2',
      summary: 'Overview of licensed gentlemen\'s clubs across the UK.',
      type: 'Overview',
      topics: ['UK', 'Strip Clubs', 'Licensing'],
    },
    {
      title: '英国伴游服务',
      titleEn: 'UK Escort Services',
      date: '2020-09-25',
      url: 'https://earthtrip.wixsite.com/adventure/uk-3',
      summary: 'Guide to the legal escort industry in the United Kingdom.',
      type: 'Guide',
      topics: ['UK', 'Escort', 'Legal'],
    },
  ],

  DK: [
    {
      title: '哥本哈根红灯区',
      titleEn: 'Copenhagen Red Light District',
      date: '2018-08-03',
      url: 'https://earthtrip.wixsite.com/adventure/denmark-1',
      summary: 'Guide to Istedgade and Vesterbro adult entertainment areas.',
      type: 'Guide',
      topics: ['Copenhagen', 'Istedgade', 'Vesterbro'],
    },
    {
      title: '丹麦合法卖淫概述',
      titleEn: 'Legal Prostitution in Denmark',
      date: '2019-07-15',
      url: 'https://earthtrip.wixsite.com/adventure/denmark-2',
      summary: 'Overview of Denmark\'s pragmatic approach to legal prostitution.',
      type: 'Overview',
      topics: ['Denmark', 'Legal', 'Policy'],
    },
    {
      title: '奥胡斯成人场所',
      titleEn: 'Aarhus Adult Venues',
      date: '2020-11-08',
      url: 'https://earthtrip.wixsite.com/adventure/denmark-3',
      summary: 'Guide to adult entertainment options in Denmark\'s second city.',
      type: 'Guide',
      topics: ['Aarhus', 'Denmark'],
    },
  ],
};

/**
 * Get reference articles for a country
 */
export function getReferenceArticles(countryCode: string): ReferenceArticle[] {
  return REFERENCE_ARTICLES[countryCode.toUpperCase()] || [];
}

/**
 * Check if a country has reference articles
 */
export function hasReferenceArticles(countryCode: string): boolean {
  const articles = REFERENCE_ARTICLES[countryCode.toUpperCase()];
  return !!articles && articles.length > 0;
}

/**
 * Get all country codes with reference articles
 */
export function getCountriesWithArticles(): string[] {
  return Object.keys(REFERENCE_ARTICLES);
}

/**
 * Get total article count
 */
export function getTotalArticleCount(): number {
  return Object.values(REFERENCE_ARTICLES).reduce((sum, articles) => sum + articles.length, 0);
}
