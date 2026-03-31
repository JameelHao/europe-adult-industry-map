/**
 * Tests for FR #77: Country bounds for map focus
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Country Bounds Exports', () => {
  it('exports COUNTRY_BOUNDS', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.ok(mod.COUNTRY_BOUNDS);
    assert.ok(typeof mod.COUNTRY_BOUNDS === 'object');
  });

  it('exports EUROPE_BOUNDS', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.ok(mod.EUROPE_BOUNDS);
  });

  it('exports getCountryBoundsByCode function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.ok(typeof mod.getCountryBoundsByCode === 'function');
  });

  it('exports functions from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.getCountryBoundsByCode === 'function');
    assert.ok(mod.COUNTRY_BOUNDS);
  });
});

describe('COUNTRY_BOUNDS', () => {
  it('has bounds for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.ok(mod.COUNTRY_BOUNDS['germany']);
  });

  it('has bounds for Netherlands', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.ok(mod.COUNTRY_BOUNDS['netherlands']);
  });

  it('bounds are valid format [[lng, lat], [lng, lat]]', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    for (const [country, bounds] of Object.entries(mod.COUNTRY_BOUNDS)) {
      assert.ok(Array.isArray(bounds), `${country} bounds should be array`);
      assert.strictEqual(bounds.length, 2, `${country} should have 2 points`);
      assert.ok(Array.isArray(bounds[0]), `${country} min should be array`);
      assert.ok(Array.isArray(bounds[1]), `${country} max should be array`);
      assert.strictEqual(bounds[0].length, 2, `${country} min should have 2 coords`);
      assert.strictEqual(bounds[1].length, 2, `${country} max should have 2 coords`);
    }
  });

  it('min is less than max for all bounds', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    for (const [country, bounds] of Object.entries(mod.COUNTRY_BOUNDS)) {
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      assert.ok(minLng < maxLng, `${country} minLng < maxLng`);
      assert.ok(minLat < maxLat, `${country} minLat < maxLat`);
    }
  });
});

describe('getCountryBoundsByCode', () => {
  it('returns bounds for valid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const bounds = mod.getCountryBoundsByCode('germany');

    assert.ok(bounds);
    assert.ok(Array.isArray(bounds));
  });

  it('returns null for invalid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const bounds = mod.getCountryBoundsByCode('atlantis');

    assert.strictEqual(bounds, null);
  });

  it('handles ISO code aliases', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    assert.ok(mod.getCountryBoundsByCode('de'), 'DE should work');
    assert.ok(mod.getCountryBoundsByCode('nl'), 'NL should work');
    assert.ok(mod.getCountryBoundsByCode('uk'), 'UK should work');
    assert.ok(mod.getCountryBoundsByCode('gb'), 'GB should work');
  });

  it('is case insensitive', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    const lower = mod.getCountryBoundsByCode('germany');
    const upper = mod.getCountryBoundsByCode('GERMANY');
    const mixed = mod.getCountryBoundsByCode('GeRmAnY');

    assert.deepStrictEqual(lower, upper);
    assert.deepStrictEqual(lower, mixed);
  });
});

describe('normalizeCountryCode', () => {
  it('converts to lowercase', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.strictEqual(mod.normalizeCountryCode('GERMANY'), 'germany');
  });

  it('resolves ISO codes', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.strictEqual(mod.normalizeCountryCode('de'), 'germany');
    assert.strictEqual(mod.normalizeCountryCode('nl'), 'netherlands');
  });

  it('removes non-alpha characters', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    assert.strictEqual(mod.normalizeCountryCode('ger-many'), 'germany');
  });
});

describe('getCountryCenterFromBounds', () => {
  it('returns center for valid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const center = mod.getCountryCenterFromBounds('germany');

    assert.ok(center);
    assert.ok(Array.isArray(center));
    assert.strictEqual(center.length, 2);
  });

  it('returns null for invalid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const center = mod.getCountryCenterFromBounds('atlantis');

    assert.strictEqual(center, null);
  });

  it('center is within bounds', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const bounds = mod.getCountryBoundsByCode('germany');
    const center = mod.getCountryCenterFromBounds('germany');

    assert.ok(bounds && center);
    const [[minLng, minLat], [maxLng, maxLat]] = bounds;
    assert.ok(center[0] >= minLng && center[0] <= maxLng);
    assert.ok(center[1] >= minLat && center[1] <= maxLat);
  });
});

describe('getCountryZoom', () => {
  it('returns zoom level for valid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const zoom = mod.getCountryZoom('germany');

    assert.ok(typeof zoom === 'number');
    assert.ok(zoom >= 4 && zoom <= 10);
  });

  it('returns default zoom for invalid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const zoom = mod.getCountryZoom('atlantis');

    assert.strictEqual(zoom, 4);
  });

  it('small countries get higher zoom', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    const luxembourgZoom = mod.getCountryZoom('luxembourg');
    const germanyZoom = mod.getCountryZoom('germany');

    assert.ok(luxembourgZoom > germanyZoom, 'Luxembourg should have higher zoom than Germany');
  });
});

describe('isValidCountryCode', () => {
  it('returns true for valid codes', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    assert.strictEqual(mod.isValidCountryCode('germany'), true);
    assert.strictEqual(mod.isValidCountryCode('de'), true);
    assert.strictEqual(mod.isValidCountryCode('netherlands'), true);
  });

  it('returns false for invalid codes', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');

    assert.strictEqual(mod.isValidCountryCode('atlantis'), false);
    assert.strictEqual(mod.isValidCountryCode('xyz'), false);
  });
});

describe('getValidCountryCodes', () => {
  it('returns array of country codes', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const codes = mod.getValidCountryCodes();

    assert.ok(Array.isArray(codes));
    assert.ok(codes.length > 20, 'Should have many countries');
    assert.ok(codes.includes('germany'));
    assert.ok(codes.includes('netherlands'));
  });
});
