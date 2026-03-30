/**
 * Adult Industry News Panel Tests
 *
 * Validates that adult-industry variant has proper news panel
 * with RSS feeds and static fallback data.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('adult-industry news panel', () => {
  it('AdultIndustryNewsPanel.ts exists', () => {
    const path = resolve(__dirname, '../src/components/AdultIndustryNewsPanel.ts');
    assert.ok(existsSync(path), 'AdultIndustryNewsPanel.ts should exist');
  });

  it('news.ts data file exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/news.ts');
    assert.ok(existsSync(path), 'news.ts data file should exist');
  });

  it('news.ts exports RSS_FEEDS', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/news.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export const RSS_FEEDS'), 'Should export RSS_FEEDS');
    assert.ok(src.includes('XBIZ'), 'Should include XBIZ feed');
    assert.ok(src.includes('EAN'), 'Should include EAN feed');
  });

  it('news.ts exports SAMPLE_NEWS for fallback', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/news.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export const SAMPLE_NEWS'), 'Should export SAMPLE_NEWS');
  });

  it('AdultIndustryNewsPanel imports from static data', () => {
    const path = resolve(__dirname, '../src/components/AdultIndustryNewsPanel.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(
      src.includes('@/config/variants/adult-industry/data/news'),
      'Should import from news data'
    );
  });

  it('AdultIndustryNewsPanel has RSS fetch with fallback', () => {
    const path = resolve(__dirname, '../src/components/AdultIndustryNewsPanel.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('fetchRssFeeds'), 'Should have RSS fetch method');
    assert.ok(src.includes('SAMPLE_NEWS'), 'Should use SAMPLE_NEWS as fallback');
    assert.ok(src.includes('useStaticData'), 'Should track static data usage');
  });

  it('panel-layout.ts creates AdultIndustryNewsPanel for adult-industry variant', () => {
    const path = resolve(__dirname, '../src/app/panel-layout.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(
      src.includes('AdultIndustryNewsPanel'),
      'Should import AdultIndustryNewsPanel'
    );
    assert.ok(
      src.includes("new AdultIndustryNewsPanel('industry-news')"),
      'Should create AdultIndustryNewsPanel for adult-industry variant'
    );
  });

  it('components/index.ts exports AdultIndustryNewsPanel', () => {
    const path = resolve(__dirname, '../src/components/index.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(
      src.includes('AdultIndustryNewsPanel'),
      'Should export AdultIndustryNewsPanel'
    );
  });
});
