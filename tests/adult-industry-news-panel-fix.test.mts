/**
 * Tests for FR #57: Fix Industry News panel
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('AdultIndustryNewsPanel fix', () => {
  it('AdultIndustryNewsPanel.ts exists', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    assert.ok(fs.existsSync(filePath), 'AdultIndustryNewsPanel.ts should exist');
  });

  it('AdultIndustryNewsPanel uses this.content directly', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    // Should use this.content instead of querySelector
    assert.ok(
      content.includes('const contentEl = this.content'),
      'Should use this.content from Panel base class'
    );
  });

  it('AdultIndustryNewsPanel calls loadNews in constructor', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('void this.loadNews()'),
      'Constructor should call loadNews()'
    );
  });

  it('AdultIndustryNewsPanel has fallback to SAMPLE_NEWS', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('this.news = SAMPLE_NEWS'),
      'Should fallback to SAMPLE_NEWS when RSS fails'
    );
  });
});

describe('SAMPLE_NEWS data', () => {
  it('SAMPLE_NEWS has at least 5 items', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    assert.ok(
      mod.SAMPLE_NEWS.length >= 5,
      `Should have at least 5 sample news items, got ${mod.SAMPLE_NEWS.length}`
    );
  });

  it('SAMPLE_NEWS items have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const item of mod.SAMPLE_NEWS) {
      assert.ok(item.id, 'Item should have id');
      assert.ok(item.title, 'Item should have title');
      assert.ok(item.source, 'Item should have source');
      assert.ok(item.date, 'Item should have date');
      assert.ok(item.url, 'Item should have url');
    }
  });

  it('SAMPLE_NEWS items have valid categories', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    const validCategories = ['industry', 'market', 'regulation', 'event', 'general'];
    for (const item of mod.SAMPLE_NEWS) {
      if (item.category) {
        assert.ok(
          validCategories.includes(item.category),
          `Item ${item.id} has invalid category: ${item.category}`
        );
      }
    }
  });
});

describe('panel-layout integration', () => {
  it('panel-layout.ts creates AdultIndustryNewsPanel for adult-industry variant', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes("new AdultIndustryNewsPanel('industry-news')"),
      'Should create AdultIndustryNewsPanel for adult-industry variant'
    );
  });

  it('panel-layout.ts imports AdultIndustryNewsPanel', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('AdultIndustryNewsPanel'),
      'Should import AdultIndustryNewsPanel'
    );
  });
});
