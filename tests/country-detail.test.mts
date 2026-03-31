/**
 * Tests for FR #93: Country Detail Page
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Country Detail Routing', () => {
  it('shouldShowCountryDetail returns true for /?country=germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowCountryDetail('?country=germany'), true);
  });

  it('shouldShowCountryDetail returns false for /?country=germany&map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowCountryDetail('?country=germany&map'), false);
  });

  it('shouldShowCountryDetail returns false for empty query', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowCountryDetail(''), false);
  });

  it('shouldFocusCountryOnMap returns true for /?country=germany&map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldFocusCountryOnMap('?country=germany&map'), true);
  });

  it('shouldFocusCountryOnMap returns false for /?country=germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldFocusCountryOnMap('?country=germany'), false);
  });

  it('shouldShowMap returns true for /?view=map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?view=map'), true);
  });

  it('shouldShowMap returns true for /?country=germany&map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?country=germany&map'), true);
  });

  it('shouldShowMap returns false for /?country=germany (detail page)', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?country=germany'), false);
  });
});

describe('Country Detail URL Builders', () => {
  it('buildCountryUrl creates detail page URL', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.buildCountryUrl('Germany'), '/?country=germany');
  });

  it('buildCountryMapUrl creates map URL with &map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.buildCountryMapUrl('Germany'), '/?country=germany&map');
  });
});

describe('Country Detail Data', () => {
  it('exports getCountryDetailData', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.ok(typeof mod.getCountryDetailData === 'function');
  });

  it('exports getCountrySummary', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.ok(typeof mod.getCountrySummary === 'function');
  });

  it('exports hasCountryDetail', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.ok(typeof mod.hasCountryDetail === 'function');
  });

  it('getCountryDetailData returns data for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('germany');

    assert.ok(data, 'Should return data');
    assert.strictEqual(data.countryName, 'Germany');
    assert.ok(data.flagEmoji, 'Should have flag');
    assert.ok(data.score >= 1 && data.score <= 5, 'Score should be 1-5');
    assert.ok(data.summary, 'Should have summary');
  });

  it('getCountryDetailData returns null for invalid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('atlantis');

    assert.strictEqual(data, null);
  });

  it('getCountrySummary returns string for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const summary = mod.getCountrySummary('germany');

    assert.ok(typeof summary === 'string');
    assert.ok(summary.length > 20, 'Should have meaningful content');
  });

  it('getCountrySummary returns fallback for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const summary = mod.getCountrySummary('atlantis');

    assert.ok(typeof summary === 'string');
    assert.ok(summary.includes('limited'), 'Should be fallback text');
  });

  it('hasCountryDetail returns true for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.strictEqual(mod.hasCountryDetail('germany'), true);
  });

  it('hasCountryDetail returns false for invalid country', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    assert.strictEqual(mod.hasCountryDetail('atlantis'), false);
  });
});

describe('Country Detail Data Structure', () => {
  it('data includes cities array', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('germany');

    assert.ok(data);
    assert.ok(Array.isArray(data.cities));
  });

  it('data includes legalStatus', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('germany');

    assert.ok(data);
    assert.ok(data.legalStatus);
    assert.ok(typeof data.legalStatus.prostitutionLegal === 'boolean');
    assert.ok(typeof data.legalStatus.brothelsLegal === 'boolean');
  });

  it('data includes venue counts', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-details.ts');
    const data = mod.getCountryDetailData('germany');

    assert.ok(data);
    assert.ok(typeof data.rldCount === 'number');
    assert.ok(typeof data.fkkCount === 'number');
  });
});

describe('CountryDetailPage Component', () => {
  it('exports renderCountryDetailPage', async () => {
    const mod = await import('../src/components/CountryDetailPage/index.ts');
    assert.ok(typeof mod.renderCountryDetailPage === 'function');
  });

  it('exports destroyCountryDetailPage', async () => {
    const mod = await import('../src/components/CountryDetailPage/index.ts');
    assert.ok(typeof mod.destroyCountryDetailPage === 'function');
  });
});
