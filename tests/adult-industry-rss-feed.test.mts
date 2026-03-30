/**
 * Tests for FR #48: RSS feed configuration for adult industry news
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('adult-industry RSS feed configuration', () => {
  it('news.ts exports RSS_FEEDS array', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    assert.ok(Array.isArray(mod.RSS_FEEDS), 'Should export RSS_FEEDS array');
    assert.ok(mod.RSS_FEEDS.length >= 1, 'Should have at least 1 feed');
  });

  it('eurosexscene feed is configured first', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    const euroFeed = mod.RSS_FEEDS.find(
      (f: { url: string }) => f.url.includes('eurosexscene.com')
    );
    assert.ok(euroFeed, 'Should have eurosexscene feed');
    assert.strictEqual(euroFeed.name, 'Euro Sex Scene');
    assert.strictEqual(euroFeed.icon, '🇪🇺');
    // Should be first feed
    assert.ok(
      mod.RSS_FEEDS[0].url.includes('eurosexscene.com'),
      'eurosexscene should be the first feed'
    );
  });

  it('RSS feeds use proxy URL format', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const feed of mod.RSS_FEEDS) {
      assert.ok(
        feed.url.startsWith('/api/rss-proxy?url='),
        `Feed ${feed.name} should use proxy URL format`
      );
    }
  });

  it('RSS feeds have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const feed of mod.RSS_FEEDS) {
      assert.ok(feed.name, 'Feed should have name');
      assert.ok(feed.url, 'Feed should have url');
    }
  });
});

describe('RSS proxy allowed domains', () => {
  it('eurosexscene.com is in allowed domains', () => {
    const filePath = path.join(ROOT, 'api/_rss-allowed-domains.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('eurosexscene.com'),
      'eurosexscene.com should be in allowed domains'
    );
  });

  it('xbiz.com is in allowed domains', () => {
    const filePath = path.join(ROOT, 'api/_rss-allowed-domains.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('www.xbiz.com'),
      'www.xbiz.com should be in allowed domains'
    );
  });

  it('ean-online.com is in allowed domains', () => {
    const filePath = path.join(ROOT, 'api/_rss-allowed-domains.js');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('ean-online.com'),
      'ean-online.com should be in allowed domains'
    );
  });
});

describe('adult-industry news panel', () => {
  it('AdultIndustryNewsPanel.ts exists', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    assert.ok(fs.existsSync(filePath), 'AdultIndustryNewsPanel.ts should exist');
  });

  it('AdultIndustryNewsPanel imports RSS_FEEDS', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.includes('RSS_FEEDS'), 'Should import RSS_FEEDS');
  });

  it('AdultIndustryNewsPanel has fetchRssFeeds method', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('fetchRssFeeds'),
      'Should have fetchRssFeeds method'
    );
  });

  it('AdultIndustryNewsPanel has parseRssFeed method', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('parseRssFeed'),
      'Should have parseRssFeed method'
    );
  });
});

describe('SAMPLE_NEWS fallback', () => {
  it('SAMPLE_NEWS is exported', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    assert.ok(Array.isArray(mod.SAMPLE_NEWS), 'Should export SAMPLE_NEWS array');
    assert.ok(mod.SAMPLE_NEWS.length >= 5, 'Should have at least 5 sample news items');
  });

  it('SAMPLE_NEWS items have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const item of mod.SAMPLE_NEWS) {
      assert.ok(item.id, 'Item should have id');
      assert.ok(item.title, 'Item should have title');
      assert.ok(item.source, 'Item should have source');
      assert.ok(item.date, 'Item should have date');
    }
  });
});
