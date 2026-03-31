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
