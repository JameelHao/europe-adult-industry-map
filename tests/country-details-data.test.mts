/**
 * Tests for FR #94: Country Detail Data for Top 10 Countries
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

const TARGET_COUNTRIES = ['DE', 'NL', 'AT', 'CH', 'BE', 'CZ', 'ES', 'FR', 'GB', 'DK'];

describe('Extended Country Detail Data', () => {
  it('exports COUNTRY_DETAILS_DATA', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    assert.ok(mod.COUNTRY_DETAILS_DATA);
    assert.ok(typeof mod.COUNTRY_DETAILS_DATA === 'object');
  });

  it('has data for all 10 target countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    for (const code of TARGET_COUNTRIES) {
      assert.ok(mod.COUNTRY_DETAILS_DATA[code], `Missing data for ${code}`);
    }
  });

  it('getExtendedCountryDetailData returns data', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    const data = mod.getExtendedCountryDetailData('DE');
    assert.ok(data);
    assert.strictEqual(data.countryCode, 'DE');
  });

  it('getExtendedCountryDetailData returns null for unknown', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    const data = mod.getExtendedCountryDetailData('XX');
    assert.strictEqual(data, null);
  });

  it('hasExtendedCountryData returns true for target countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    for (const code of TARGET_COUNTRIES) {
      assert.strictEqual(mod.hasExtendedCountryData(code), true, `Should have data for ${code}`);
    }
  });

  it('hasExtendedCountryData returns false for non-target', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    assert.strictEqual(mod.hasExtendedCountryData('PL'), false);
    assert.strictEqual(mod.hasExtendedCountryData('XX'), false);
  });

  it('getExtendedCountryCodes returns all 10', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
    const codes = mod.getExtendedCountryCodes();
    assert.strictEqual(codes.length, 10);
    for (const code of TARGET_COUNTRIES) {
      assert.ok(codes.includes(code), `Missing ${code} in codes list`);
    }
  });
});

describe('Data Structure Validation', () => {
  for (const code of TARGET_COUNTRIES) {
    describe(`${code} data structure`, () => {
      it('has required fields', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];

        assert.ok(data.countryCode, 'countryCode');
        assert.ok(data.countryName, 'countryName');
        assert.ok(data.flag, 'flag');
        assert.ok(data.overallScore >= 1 && data.overallScore <= 5, 'overallScore 1-5');
        assert.ok(data.scoreLabel, 'scoreLabel');
        assert.ok(data.description, 'description');
        assert.ok(typeof data.hasRedLightDistricts === 'boolean', 'hasRedLightDistricts');
        assert.ok(typeof data.hasFKKClubs === 'boolean', 'hasFKKClubs');
        assert.ok(Array.isArray(data.cities), 'cities array');
        assert.ok(Array.isArray(data.venues), 'venues array');
        assert.ok(data.legalStatus, 'legalStatus');
        assert.ok(data.sourceUrl, 'sourceUrl');
      });

      it('has at least 2 cities', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];
        assert.ok(data.cities.length >= 2, `${code} should have at least 2 cities, has ${data.cities.length}`);
      });

      it('has at least 3 venues', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];
        assert.ok(data.venues.length >= 3, `${code} should have at least 3 venues, has ${data.venues.length}`);
      });

      it('cities have valid structure', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];

        for (const city of data.cities) {
          assert.ok(city.cityName, 'cityName');
          assert.ok(typeof city.districtCount === 'number', 'districtCount');
          assert.ok(Array.isArray(city.districts), 'districts');

          for (const district of city.districts) {
            assert.ok(district.name, 'district name');
            assert.ok(district.description, 'district description');
            assert.ok(['Active', 'Closed', 'Restricted'].includes(district.status), 'district status');
            assert.ok(district.type, 'district type');
          }
        }
      });

      it('venues have valid structure', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];

        for (const venue of data.venues) {
          assert.ok(venue.name, 'venue name');
          assert.ok(venue.type, 'venue type');
          assert.ok(venue.location, 'venue location');
          assert.ok(['Active', 'Closed', 'Restricted'].includes(venue.status), 'venue status');
        }
      });

      it('legalStatus has required fields', async () => {
        const mod = await import('../src/config/variants/adult-industry/data/country-details-data.ts');
        const data = mod.COUNTRY_DETAILS_DATA[code];
        const ls = data.legalStatus;

        assert.ok(ls.prostitution, 'prostitution');
        assert.ok(ls.brothels, 'brothels');
        assert.ok(ls.escorts, 'escorts');
        assert.ok(ls.stripClubs, 'stripClubs');
        assert.ok(ls.streetProstitution, 'streetProstitution');
        assert.ok(typeof ls.workingAge === 'number', 'workingAge');
        assert.ok(Array.isArray(ls.notes), 'notes array');
      });
    });
  }
});

describe('Integration with country-details.ts', () => {
  it('getCountryDetailData includes extended data for DE', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('de');

    assert.ok(data);
    assert.ok(data.extended, 'should have extended data');
    assert.strictEqual(data.extended?.countryCode, 'DE');
  });

  it('getCountryDetailData includes extended data for NL', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('nl');

    assert.ok(data);
    assert.ok(data.extended, 'should have extended data');
    assert.ok(data.extended?.cities.length > 0);
    assert.ok(data.extended?.venues.length > 0);
  });

  it('summary uses extended description when available', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('de');

    assert.ok(data);
    // Extended description should be used
    assert.ok(data.summary.includes('2002') || data.summary.includes('FKK'));
  });

  it('re-exports extended types', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.ok(typeof mod.getExtendedCountryDetailData === 'function');
    assert.ok(typeof mod.hasExtendedCountryData === 'function');
  });
});
