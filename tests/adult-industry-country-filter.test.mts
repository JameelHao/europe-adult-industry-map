/**
 * Tests for FR #66: Country filter for map
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Country Filter Functions', () => {
  it('exports getAvailableCountries function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    assert.ok(typeof mod.getAvailableCountries === 'function');
  });

  it('exports filterCitiesByCountry function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    assert.ok(typeof mod.filterCitiesByCountry === 'function');
  });

  it('exports filterRedLightDistrictsByCountry function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    assert.ok(typeof mod.filterRedLightDistrictsByCountry === 'function');
  });

  it('exports filterFKKClubsByCountry function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    assert.ok(typeof mod.filterFKKClubsByCountry === 'function');
  });

  it('exports getCountryBounds function', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    assert.ok(typeof mod.getCountryBounds === 'function');
  });

  it('functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.getAvailableCountries === 'function');
    assert.ok(typeof mod.filterCitiesByCountry === 'function');
    assert.ok(typeof mod.getCountryBounds === 'function');
  });
});

describe('getAvailableCountries', () => {
  it('returns array of country names', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const countries = mod.getAvailableCountries();

    assert.ok(Array.isArray(countries), 'Should return array');
    assert.ok(countries.length > 0, 'Should have countries');
  });

  it('returns sorted list', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const countries = mod.getAvailableCountries();

    const sorted = [...countries].sort();
    assert.deepStrictEqual(countries, sorted, 'Countries should be sorted');
  });

  it('includes major European countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const countries = mod.getAvailableCountries();

    assert.ok(countries.includes('Germany'), 'Should include Germany');
    assert.ok(countries.includes('Netherlands'), 'Should include Netherlands');
  });

  it('contains no duplicates', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const countries = mod.getAvailableCountries();

    const unique = new Set(countries);
    assert.strictEqual(countries.length, unique.size, 'Should have no duplicates');
  });
});

describe('filterCitiesByCountry', () => {
  it('returns all cities when country is null', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const dataMod = await import('../src/config/variants/adult-industry/data/cities.ts');

    const filtered = mod.filterCitiesByCountry(null);
    assert.strictEqual(filtered.length, dataMod.CITIES.length, 'Should return all cities');
  });

  it('filters cities by country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const filtered = mod.filterCitiesByCountry('Germany');

    assert.ok(filtered.length > 0, 'Should have German cities');
    for (const city of filtered) {
      assert.strictEqual(city.country, 'Germany', 'All cities should be from Germany');
    }
  });

  it('returns empty array for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const filtered = mod.filterCitiesByCountry('Atlantis');

    assert.strictEqual(filtered.length, 0, 'Should return empty array');
  });
});

describe('filterRedLightDistrictsByCountry', () => {
  it('returns all RLDs when country is null', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const filtered = mod.filterRedLightDistrictsByCountry(null);
    assert.strictEqual(
      filtered.length,
      dataMod.RED_LIGHT_DISTRICTS.length,
      'Should return all RLDs'
    );
  });

  it('filters RLDs by country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const filtered = mod.filterRedLightDistrictsByCountry('Netherlands');

    assert.ok(filtered.length > 0, 'Should have Dutch RLDs');
    for (const rld of filtered) {
      assert.strictEqual(rld.country, 'Netherlands', 'All RLDs should be from Netherlands');
    }
  });
});

describe('filterFKKClubsByCountry', () => {
  it('returns all FKK clubs when country is null', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const filtered = mod.filterFKKClubsByCountry(null);
    assert.strictEqual(filtered.length, dataMod.FKK_CLUBS.length, 'Should return all FKK clubs');
  });

  it('filters FKK clubs by country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const filtered = mod.filterFKKClubsByCountry('Germany');

    assert.ok(filtered.length > 0, 'Should have German FKK clubs');
    for (const fkk of filtered) {
      assert.strictEqual(fkk.country, 'Germany', 'All FKK clubs should be from Germany');
    }
  });
});

describe('getCountryBounds', () => {
  it('returns bounds for valid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const bounds = mod.getCountryBounds('Germany');

    assert.ok(bounds, 'Should return bounds');
    assert.ok(typeof bounds.minLng === 'number', 'Should have minLng');
    assert.ok(typeof bounds.maxLng === 'number', 'Should have maxLng');
    assert.ok(typeof bounds.minLat === 'number', 'Should have minLat');
    assert.ok(typeof bounds.maxLat === 'number', 'Should have maxLat');
  });

  it('returns null for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const bounds = mod.getCountryBounds('Atlantis');

    assert.strictEqual(bounds, null, 'Should return null');
  });

  it('bounds have correct relationship', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const bounds = mod.getCountryBounds('Germany');

    assert.ok(bounds, 'Should have bounds');
    assert.ok(bounds.minLng < bounds.maxLng, 'minLng should be less than maxLng');
    assert.ok(bounds.minLat < bounds.maxLat, 'minLat should be less than maxLat');
  });

  it('bounds include padding', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const bounds = mod.getCountryBounds('Netherlands');

    assert.ok(bounds, 'Should have bounds');
    // Netherlands coordinates are roughly 3-7 lng, 51-53 lat
    // With padding, should extend beyond actual data points
    assert.ok(bounds.minLng < 4, 'Should have west padding');
    assert.ok(bounds.maxLng > 5, 'Should have east padding');
  });
});

describe('getCountryCenter', () => {
  it('returns center for valid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const center = mod.getCountryCenter('Germany');

    assert.ok(center, 'Should return center');
    assert.ok(Array.isArray(center), 'Should be array');
    assert.strictEqual(center.length, 2, 'Should have 2 elements');
  });

  it('returns null for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const center = mod.getCountryCenter('Atlantis');

    assert.strictEqual(center, null, 'Should return null');
  });

  it('center is within bounds', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const bounds = mod.getCountryBounds('Germany');
    const center = mod.getCountryCenter('Germany');

    assert.ok(bounds && center, 'Should have both');
    assert.ok(center[0] >= bounds.minLng && center[0] <= bounds.maxLng, 'Lng in bounds');
    assert.ok(center[1] >= bounds.minLat && center[1] <= bounds.maxLat, 'Lat in bounds');
  });
});

describe('getCountryDataCounts', () => {
  it('returns counts for all countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const counts = mod.getCountryDataCounts();

    assert.ok(typeof counts === 'object', 'Should return object');
    assert.ok(counts['Germany'] > 0, 'Germany should have data');
    assert.ok(counts['Netherlands'] > 0, 'Netherlands should have data');
  });
});

describe('getCountriesByDataCount', () => {
  it('returns countries sorted by data count', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-filter.ts');
    const countries = mod.getCountriesByDataCount();
    const counts = mod.getCountryDataCounts();

    assert.ok(Array.isArray(countries), 'Should return array');
    // Verify descending order
    for (let i = 1; i < countries.length; i++) {
      assert.ok(
        counts[countries[i - 1]] >= counts[countries[i]],
        'Should be in descending order'
      );
    }
  });
});
