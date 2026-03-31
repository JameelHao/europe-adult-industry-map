/**
 * Tests for FR #96: Reference Content Integration
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

const TARGET_COUNTRIES = ['NL', 'DE', 'AT', 'CH', 'BE', 'CZ', 'ES', 'FR', 'GB', 'DK'];

describe('Reference Content exports', () => {
  it('exports REFERENCE_ARTICLES', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.ok(mod.REFERENCE_ARTICLES);
    assert.ok(typeof mod.REFERENCE_ARTICLES === 'object');
  });

  it('exports getReferenceArticles', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.ok(typeof mod.getReferenceArticles === 'function');
  });

  it('exports hasReferenceArticles', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.ok(typeof mod.hasReferenceArticles === 'function');
  });

  it('exports getCountriesWithArticles', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.ok(typeof mod.getCountriesWithArticles === 'function');
  });

  it('exports getTotalArticleCount', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.ok(typeof mod.getTotalArticleCount === 'function');
  });
});

describe('Reference Articles Data', () => {
  it('has articles for all 10 target countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    for (const code of TARGET_COUNTRIES) {
      assert.ok(mod.REFERENCE_ARTICLES[code], `Missing articles for ${code}`);
      assert.ok(mod.REFERENCE_ARTICLES[code].length > 0, `No articles for ${code}`);
    }
  });

  it('getCountriesWithArticles returns all 10', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    const countries = mod.getCountriesWithArticles();
    assert.strictEqual(countries.length, 10);
    for (const code of TARGET_COUNTRIES) {
      assert.ok(countries.includes(code), `Missing ${code}`);
    }
  });

  it('getTotalArticleCount returns reasonable count', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    const count = mod.getTotalArticleCount();
    // Should have at least 3 articles per country = 30+
    assert.ok(count >= 30, `Expected at least 30 articles, got ${count}`);
  });
});

describe('getReferenceArticles', () => {
  it('returns articles for NL', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    const articles = mod.getReferenceArticles('NL');
    assert.ok(articles.length > 0);
  });

  it('handles lowercase country code', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    const articles = mod.getReferenceArticles('nl');
    assert.ok(articles.length > 0);
  });

  it('returns empty array for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    const articles = mod.getReferenceArticles('XX');
    assert.ok(Array.isArray(articles));
    assert.strictEqual(articles.length, 0);
  });
});

describe('hasReferenceArticles', () => {
  it('returns true for target countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    for (const code of TARGET_COUNTRIES) {
      assert.strictEqual(mod.hasReferenceArticles(code), true, `Should have articles for ${code}`);
    }
  });

  it('returns false for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
    assert.strictEqual(mod.hasReferenceArticles('XX'), false);
    assert.strictEqual(mod.hasReferenceArticles('PL'), false);
  });
});

describe('Article Structure Validation', () => {
  for (const code of TARGET_COUNTRIES) {
    describe(`${code} articles`, () => {
      it('have required fields', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
        const articles = mod.REFERENCE_ARTICLES[code];

        for (const article of articles) {
          assert.ok(article.title, 'title');
          assert.ok(article.date, 'date');
          assert.ok(article.url, 'url');
          assert.ok(article.summary, 'summary');
          assert.ok(article.type, 'type');
        }
      });

      it('have valid type', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
        const articles = mod.REFERENCE_ARTICLES[code];
        const validTypes = ['Guide', 'Review', 'News', 'Overview'];

        for (const article of articles) {
          assert.ok(validTypes.includes(article.type), `Invalid type: ${article.type}`);
        }
      });

      it('have valid URLs', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
        const articles = mod.REFERENCE_ARTICLES[code];

        for (const article of articles) {
          assert.ok(article.url.startsWith('https://'), `URL should be https: ${article.url}`);
        }
      });

      it('have at least 3 articles', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/reference-content.ts');
        const articles = mod.REFERENCE_ARTICLES[code];
        assert.ok(articles.length >= 3, `${code} should have at least 3 articles, has ${articles.length}`);
      });
    });
  }
});

describe('CSS file exists', () => {
  it('reference-articles.css exists', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/reference-articles.css');
    assert.ok(fs.existsSync(cssPath), 'reference-articles.css should exist');
  });

  it('contains article-card class', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/reference-articles.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.article-card'), 'Should have .article-card class');
  });

  it('contains article-type classes', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/reference-articles.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.article-type.guide'), 'Should have .article-type.guide');
    assert.ok(content.includes('.article-type.review'), 'Should have .article-type.review');
    assert.ok(content.includes('.article-type.news'), 'Should have .article-type.news');
    assert.ok(content.includes('.article-type.overview'), 'Should have .article-type.overview');
  });

  it('contains article-grid class', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/reference-articles.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.article-grid'), 'Should have .article-grid class');
  });
});

describe('main.ts imports', () => {
  it('includes reference-articles.css import', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const mainPath = path.resolve('./src/main.ts');
    const content = fs.readFileSync(mainPath, 'utf-8');
    assert.ok(content.includes('reference-articles.css'), 'main.ts should import reference-articles.css');
  });
});
