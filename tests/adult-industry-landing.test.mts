/**
 * Tests for FR #75: Landing Page hero section configuration
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Landing Page Functions', () => {
  it('exports getHeroConfig function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getHeroConfig === 'function');
  });

  it('exports getLandingStatistics function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getLandingStatistics === 'function');
  });

  it('exports getRegionSummaries function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getRegionSummaries === 'function');
  });

  it('exports getFeaturedCountries function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getFeaturedCountries === 'function');
  });

  it('functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.getHeroConfig === 'function');
    assert.ok(typeof mod.getLandingStatistics === 'function');
  });
});

describe('getHeroConfig', () => {
  it('returns hero configuration', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config, 'Should return config');
    assert.ok(typeof config === 'object', 'Should be object');
  });

  it('has title', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.title, 'Should have title');
    assert.ok(config.title.includes('ADULT INDUSTRY'), 'Title should mention adult industry');
  });

  it('has subtitle with country count', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.subtitle, 'Should have subtitle');
    assert.ok(config.subtitle.includes('European'), 'Subtitle should mention European');
  });

  it('has primary CTA', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.primaryCTA, 'Should have primary CTA');
    assert.ok(config.primaryCTA.text, 'CTA should have text');
    assert.ok(config.primaryCTA.icon, 'CTA should have icon');
    assert.strictEqual(config.primaryCTA.variant, 'primary', 'Should be primary variant');
  });

  it('has secondary CTA', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.secondaryCTA, 'Should have secondary CTA');
    assert.strictEqual(config.secondaryCTA.variant, 'secondary', 'Should be secondary variant');
  });

  it('has background gradient', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.backgroundGradient, 'Should have gradient');
    assert.ok(Array.isArray(config.backgroundGradient), 'Should be array');
    assert.strictEqual(config.backgroundGradient.length, 2, 'Should have 2 colors');
  });
});

describe('getLandingStatistics', () => {
  it('returns array of statistics', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    assert.ok(Array.isArray(stats), 'Should return array');
    assert.ok(stats.length > 0, 'Should have statistics');
  });

  it('statistics have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    for (const stat of stats) {
      assert.ok(stat.value, 'Should have value');
      assert.ok(stat.label, 'Should have label');
      assert.ok(stat.icon, 'Should have icon');
    }
  });

  it('includes countries statistic', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    const countryStat = stats.find((s: { label: string }) => s.label === 'Countries');
    assert.ok(countryStat, 'Should have countries statistic');
    assert.ok(parseInt(countryStat.value) > 0, 'Should have positive count');
  });

  it('includes cities statistic', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    const cityStat = stats.find((s: { label: string }) => s.label === 'Cities');
    assert.ok(cityStat, 'Should have cities statistic');
  });
});

describe('getRegionSummaries', () => {
  it('returns array of region summaries', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    assert.ok(Array.isArray(regions), 'Should return array');
    assert.ok(regions.length > 0, 'Should have regions');
  });

  it('summaries have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    for (const region of regions) {
      assert.ok(region.name, 'Should have name');
      assert.ok(typeof region.countries === 'number', 'Should have country count');
      assert.ok(typeof region.cities === 'number', 'Should have city count');
      assert.ok(region.description, 'Should have description');
    }
  });

  it('includes Western Europe', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    const western = regions.find((r: { name: string }) => r.name === 'Western Europe');
    assert.ok(western, 'Should have Western Europe');
    assert.ok(western.countries > 0, 'Should have countries');
  });
});

describe('getFeaturedCountries', () => {
  it('returns array of country names', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    assert.ok(Array.isArray(countries), 'Should return array');
    assert.ok(countries.length > 0, 'Should have countries');
  });

  it('returns up to 6 countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    assert.ok(countries.length <= 6, 'Should return at most 6 countries');
  });

  it('returns strings', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    for (const country of countries) {
      assert.ok(typeof country === 'string', 'Should be string');
      assert.ok(country.length > 0, 'Should not be empty');
    }
  });
});

// ============================================================================
// Country Card Tests (FR #76)
// ============================================================================

describe('SCORE_LABELS', () => {
  it('has labels for all scores 1-5', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');

    assert.ok(mod.SCORE_LABELS[1], 'Should have label for 1');
    assert.ok(mod.SCORE_LABELS[2], 'Should have label for 2');
    assert.ok(mod.SCORE_LABELS[3], 'Should have label for 3');
    assert.ok(mod.SCORE_LABELS[4], 'Should have label for 4');
    assert.ok(mod.SCORE_LABELS[5], 'Should have label for 5');
  });

  it('score 5 is Very Permissive', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.SCORE_LABELS[5], 'Very Permissive');
  });

  it('score 1 is Very Restrictive', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.SCORE_LABELS[1], 'Very Restrictive');
  });
});

describe('FLAG_EMOJIS', () => {
  it('has flag for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_EMOJIS['DE'], '🇩🇪');
  });

  it('has flag for Netherlands', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_EMOJIS['NL'], '🇳🇱');
  });

  it('has multiple flags', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(Object.keys(mod.FLAG_EMOJIS).length >= 20, 'Should have many flags');
  });
});

describe('getCountryCards', () => {
  it('returns array of country cards', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    assert.ok(Array.isArray(cards), 'Should return array');
    assert.ok(cards.length > 0, 'Should have cards');
  });

  it('cards have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    for (const card of cards.slice(0, 5)) {
      assert.ok(card.countryCode, 'Should have countryCode');
      assert.ok(card.countryName, 'Should have countryName');
      assert.ok(card.score >= 1 && card.score <= 5, 'Score should be 1-5');
      assert.ok(card.scoreLabel, 'Should have scoreLabel');
      assert.ok(typeof card.hasRedLightDistricts === 'boolean', 'Should have hasRedLightDistricts');
      assert.ok(typeof card.hasFKKClubs === 'boolean', 'Should have hasFKKClubs');
      assert.ok(typeof card.cityCount === 'number', 'Should have cityCount');
      assert.ok(card.flagEmoji, 'Should have flagEmoji');
    }
  });

  it('scoreLabel matches score', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    for (const card of cards) {
      assert.strictEqual(
        card.scoreLabel,
        mod.SCORE_LABELS[card.score],
        `${card.countryName} scoreLabel should match`
      );
    }
  });
});

describe('getCountryCardsSortedByScore', () => {
  it('returns cards sorted by score descending', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsSortedByScore();

    for (let i = 1; i < cards.length; i++) {
      assert.ok(
        cards[i - 1].score >= cards[i].score,
        'Should be in descending order'
      );
    }
  });
});

describe('getCountryCardsSortedByName', () => {
  it('returns cards sorted by name', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsSortedByName();

    for (let i = 1; i < cards.length; i++) {
      assert.ok(
        cards[i - 1].countryName.localeCompare(cards[i].countryName) <= 0,
        'Should be in alphabetical order'
      );
    }
  });
});

describe('getCountryCardsWithFeatures', () => {
  it('filters by hasRedLightDistricts', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsWithFeatures({ hasRedLightDistricts: true });

    for (const card of cards) {
      assert.strictEqual(card.hasRedLightDistricts, true, 'Should have RLD');
    }
  });

  it('filters by hasFKKClubs', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsWithFeatures({ hasFKKClubs: true });

    for (const card of cards) {
      assert.strictEqual(card.hasFKKClubs, true, 'Should have FKK');
    }
  });

  it('returns all when no filter', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const all = mod.getCountryCards();
    const filtered = mod.getCountryCardsWithFeatures({});

    assert.strictEqual(filtered.length, all.length, 'Should return all');
  });
});
