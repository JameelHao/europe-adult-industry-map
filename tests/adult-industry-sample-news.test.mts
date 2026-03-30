/**
 * Tests for FR #61: Sample news fallback for Industry News panel
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('SAMPLE_NEWS data', () => {
  it('SAMPLE_NEWS has at least 10 items', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    assert.ok(
      mod.SAMPLE_NEWS.length >= 10,
      `Should have at least 10 sample news items, got ${mod.SAMPLE_NEWS.length}`
    );
  });

  it('SAMPLE_NEWS items have real URLs (not #)', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const item of mod.SAMPLE_NEWS) {
      assert.ok(
        item.url.startsWith('https://'),
        `Item ${item.id} should have a real URL, got: ${item.url}`
      );
    }
  });

  it('SAMPLE_NEWS items have eurosexscene.com URLs', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    for (const item of mod.SAMPLE_NEWS) {
      assert.ok(
        item.url.includes('eurosexscene.com'),
        `Item ${item.id} should have eurosexscene.com URL, got: ${item.url}`
      );
    }
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

  it('SAMPLE_NEWS items have Euro Sex Scene as source', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/news.ts');
    const euroSexSceneCount = mod.SAMPLE_NEWS.filter(
      (item: { source: string }) => item.source === 'Euro Sex Scene'
    ).length;
    assert.ok(
      euroSexSceneCount >= 8,
      `Should have at least 8 items from Euro Sex Scene, got ${euroSexSceneCount}`
    );
  });
});

describe('AdultIndustryNewsPanel fallback', () => {
  it('AdultIndustryNewsPanel.ts imports SAMPLE_NEWS', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('SAMPLE_NEWS'),
      'Should import SAMPLE_NEWS'
    );
  });

  it('AdultIndustryNewsPanel.ts uses SAMPLE_NEWS as fallback', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryNewsPanel.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('this.news = SAMPLE_NEWS'),
      'Should use SAMPLE_NEWS as fallback'
    );
  });
});
