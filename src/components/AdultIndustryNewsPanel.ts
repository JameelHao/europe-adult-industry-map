/**
 * Adult Industry News Panel
 *
 * Displays industry news from RSS feeds or static sample data.
 * Used by adult-industry variant instead of the default news panel.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  RSS_FEEDS,
  SAMPLE_NEWS,
  NEWS_CATEGORY_COLORS,
  NEWS_CATEGORY_LABELS,
  type NewsItem,
  type RssFeedConfig,
} from '@/config/variants/adult-industry/data/news';

export class AdultIndustryNewsPanel extends Panel {
  private news: NewsItem[] = [];
  private loading = true;
  private useStaticData = false;

  constructor(id: string) {
    super({ id, title: 'Industry News', showCount: true });
    this.element.classList.add('panel-tall');
    void this.loadNews();
  }

  private async loadNews(): Promise<void> {
    this.loading = true;
    this.render();

    try {
      // Try to fetch from RSS feeds
      const rssNews = await this.fetchRssFeeds();
      if (rssNews.length > 0) {
        this.news = rssNews;
        this.useStaticData = false;
      } else {
        // Fallback to static data
        this.news = SAMPLE_NEWS;
        this.useStaticData = true;
      }
    } catch (err) {
      console.warn('[AdultIndustryNewsPanel] RSS fetch failed, using static data:', err);
      this.news = SAMPLE_NEWS;
      this.useStaticData = true;
    }

    this.setCount(this.news.length);
    this.loading = false;
    this.render();
  }

  private async fetchRssFeeds(): Promise<NewsItem[]> {
    const allItems: NewsItem[] = [];

    for (const feed of RSS_FEEDS) {
      try {
        const items = await this.fetchSingleFeed(feed);
        allItems.push(...items);
      } catch (err) {
        console.warn(`[AdultIndustryNewsPanel] Failed to fetch ${feed.name}:`, err);
      }
    }

    // Sort by date (newest first)
    allItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return allItems.slice(0, 20);
  }

  private async fetchSingleFeed(feed: RssFeedConfig): Promise<NewsItem[]> {
    const response = await fetch(feed.url, {
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const text = await response.text();
    return this.parseRssFeed(text, feed.name);
  }

  private parseRssFeed(xml: string, sourceName: string): NewsItem[] {
    const parser = new DOMParser();
    const doc = parser.parseFromString(xml, 'text/xml');
    const items: NewsItem[] = [];

    const itemElements = doc.querySelectorAll('item');
    itemElements.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent?.trim();
      const link = item.querySelector('link')?.textContent?.trim();
      const pubDate = item.querySelector('pubDate')?.textContent?.trim();
      const description = item.querySelector('description')?.textContent?.trim();

      if (title && link) {
        items.push({
          id: `rss-${sourceName}-${index}`,
          title,
          source: sourceName,
          date: pubDate ? new Date(pubDate).toISOString() : new Date().toISOString(),
          url: link,
          summary: description?.substring(0, 150),
          category: 'general',
        });
      }
    });

    return items;
  }

  private render(): void {
    const content = this.element.querySelector('.panel-content');
    if (!content) return;

    if (this.loading) {
      replaceChildren(content, h('div', { className: 'panel-loading' }, 'Loading news...'));
      return;
    }

    if (this.news.length === 0) {
      replaceChildren(content, h('div', { className: 'panel-empty' }, 'No news available'));
      return;
    }

    const container = h('div', { className: 'adult-news-panel' });

    // Data source indicator
    if (this.useStaticData) {
      const notice = h('div', { className: 'news-source-notice' });
      notice.textContent = '📋 Sample news (RSS unavailable)';
      container.appendChild(notice);
    }

    // News list
    const list = h('div', { className: 'news-list' });
    for (const item of this.news.slice(0, 15)) {
      list.appendChild(this.renderNewsItem(item));
    }
    container.appendChild(list);

    replaceChildren(content, container);
  }

  private renderNewsItem(item: NewsItem): HTMLElement {
    const categoryColor = NEWS_CATEGORY_COLORS[item.category || 'general'] || '#888';
    const categoryLabel = NEWS_CATEGORY_LABELS[item.category || 'general'] || 'News';

    const dateStr = new Date(item.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
    });

    const card = h('div', { className: 'news-item' });
    card.innerHTML = `
      <div class="news-header">
        <span class="news-category" style="color: ${categoryColor}">${categoryLabel}</span>
        <span class="news-date">${dateStr}</span>
      </div>
      <div class="news-title">${item.title}</div>
      <div class="news-source">📰 ${item.source}</div>
    `;

    if (item.url && item.url !== '#') {
      card.style.cursor = 'pointer';
      card.onclick = () => window.open(item.url, '_blank', 'noopener');
    }

    return card;
  }

  async refresh(): Promise<void> {
    await this.loadNews();
  }
}
