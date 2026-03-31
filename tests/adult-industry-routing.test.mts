/**
 * Tests for FR #77: URL routing for country focus
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Routing Functions', () => {
  it('exports parseRoute function', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.ok(typeof mod.parseRoute === 'function');
  });

  it('exports shouldShowLanding function', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.ok(typeof mod.shouldShowLanding === 'function');
  });

  it('exports shouldShowMap function', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.ok(typeof mod.shouldShowMap === 'function');
  });

  it('exports getCountryToFocus function', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.ok(typeof mod.getCountryToFocus === 'function');
  });

  it('exports navigation functions', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.ok(typeof mod.goToCountry === 'function');
    assert.ok(typeof mod.goToMap === 'function');
    assert.ok(typeof mod.goToLanding === 'function');
  });

  it('functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.parseRoute === 'function');
    assert.ok(typeof mod.shouldShowLanding === 'function');
  });
});

describe('parseRoute', () => {
  it('returns null for both params when no search string', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.parseRoute('');

    assert.strictEqual(result.view, null);
    assert.strictEqual(result.country, null);
  });

  it('parses view param', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.parseRoute('?view=map');

    assert.strictEqual(result.view, 'map');
    assert.strictEqual(result.country, null);
  });

  it('parses country param', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.parseRoute('?country=germany');

    assert.strictEqual(result.view, null);
    assert.strictEqual(result.country, 'germany');
  });

  it('normalizes country to lowercase', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.parseRoute('?country=GERMANY');

    assert.strictEqual(result.country, 'germany');
  });

  it('parses both params', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.parseRoute('?view=map&country=netherlands');

    assert.strictEqual(result.view, 'map');
    assert.strictEqual(result.country, 'netherlands');
  });
});

describe('shouldShowLanding', () => {
  it('returns true when no params', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowLanding(''), true);
  });

  it('returns false when view=map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowLanding('?view=map'), false);
  });

  it('returns false when country is set', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowLanding('?country=germany'), false);
  });
});

describe('shouldShowMap', () => {
  it('returns false when no params', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap(''), false);
  });

  it('returns true when view=map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?view=map'), true);
  });

  it('returns true when country is set', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?country=germany'), true);
  });
});

describe('getCountryToFocus', () => {
  it('returns null when no country param', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.getCountryToFocus(''), null);
    assert.strictEqual(mod.getCountryToFocus('?view=map'), null);
  });

  it('returns lowercase country code', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.getCountryToFocus('?country=Germany'), 'germany');
  });
});

describe('URL builders', () => {
  it('buildCountryUrl creates correct URL', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.buildCountryUrl('Germany'), '/?country=germany');
  });

  it('buildMapUrl creates correct URL', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.buildMapUrl(), '/?view=map');
  });

  it('buildLandingUrl creates correct URL', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.buildLandingUrl(), '/');
  });
});
