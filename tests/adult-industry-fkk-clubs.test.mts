/**
 * Tests for FR #50: FKK Clubs specialty layer
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('adult-industry FKK clubs data', () => {
  it('fkk-clubs.ts data file exists', () => {
    const filePath = path.join(
      ROOT,
      'src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    assert.ok(fs.existsSync(filePath), 'fkk-clubs.ts should exist');
  });

  it('fkk-clubs.ts exports FKK_CLUBS array with 20+ clubs', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    assert.ok(Array.isArray(mod.FKK_CLUBS), 'Should export FKK_CLUBS array');
    assert.ok(
      mod.FKK_CLUBS.length >= 20,
      `Should have at least 20 clubs, got ${mod.FKK_CLUBS.length}`
    );
  });

  it('fkk-clubs.ts exports helper functions', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    assert.ok(typeof mod.getFKKClubById === 'function');
    assert.ok(typeof mod.getFKKClubsByCountry === 'function');
    assert.ok(typeof mod.getFKKClubsByCity === 'function');
    assert.ok(typeof mod.getFKKClubStats === 'function');
  });

  it('FKK clubs have required fields', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    for (const club of mod.FKK_CLUBS) {
      assert.ok(club.id, 'Club should have id');
      assert.ok(club.name, 'Club should have name');
      assert.ok(club.city, 'Club should have city');
      assert.ok(club.country, 'Club should have country');
      assert.ok(Array.isArray(club.coordinates), 'Club should have coordinates array');
      assert.strictEqual(club.coordinates.length, 2, 'Coordinates should have 2 elements');
      assert.ok(club.priceRange, 'Club should have priceRange');
      assert.ok(Array.isArray(club.features), 'Club should have features array');
    }
  });

  it('FKK clubs are only in German-speaking countries', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const validCountries = ['Germany', 'Austria', 'Switzerland'];
    for (const club of mod.FKK_CLUBS) {
      assert.ok(
        validCountries.includes(club.country),
        `Club ${club.id} in invalid country: ${club.country}`
      );
    }
  });

  it('FKK clubs have valid price range', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const validPrices = ['€', '€€', '€€€'];
    for (const club of mod.FKK_CLUBS) {
      assert.ok(
        validPrices.includes(club.priceRange),
        `Club ${club.id} has invalid priceRange: ${club.priceRange}`
      );
    }
  });

  it('getFKKClubById returns correct club', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const oase = mod.getFKKClubById('fkk-oase');
    assert.ok(oase, 'Should find FKK Oase');
    assert.strictEqual(oase?.city, 'Frankfurt');
    assert.strictEqual(oase?.country, 'Germany');
  });

  it('getFKKClubsByCountry returns correct clubs', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const german = mod.getFKKClubsByCountry('Germany');
    assert.ok(german.length >= 15, 'Should have at least 15 German clubs');
    for (const club of german) {
      assert.strictEqual(club.country, 'Germany');
    }
  });

  it('getFKKClubStats returns valid stats', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const stats = mod.getFKKClubStats();
    assert.ok(stats.total >= 20, 'Should have at least 20 total clubs');
    assert.ok(Object.keys(stats.byCountry).length >= 2, 'Should cover at least 2 countries');
    assert.ok(Object.keys(stats.byPriceRange).length >= 2, 'Should have at least 2 price ranges');
    assert.ok(stats.averageRating > 0, 'Should have positive average rating');
  });
});

describe('adult-industry FKK clubs layer', () => {
  it('fkk-clubs-layer.ts exists', () => {
    const filePath = path.join(
      ROOT,
      'src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    assert.ok(fs.existsSync(filePath), 'fkk-clubs-layer.ts should exist');
  });

  it('fkk-clubs-layer.ts exports createFKKClubsLayer', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    assert.ok(typeof mod.createFKKClubsLayer === 'function');
  });

  it('fkk-clubs-layer.ts exports formatFKKClubPopup', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    assert.ok(typeof mod.formatFKKClubPopup === 'function');
  });
});

describe('adult-industry FKK clubs layer registration', () => {
  it('adultFKKClubs is defined in map-layer-definitions.ts', () => {
    const filePath = path.join(ROOT, 'src/config/map-layer-definitions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('adultFKKClubs'),
      'map-layer-definitions.ts should contain adultFKKClubs'
    );
    assert.ok(
      content.includes("'FKK Clubs'"),
      'Should have FKK Clubs label'
    );
  });

  it('adultFKKClubs is in VARIANT_LAYER_ORDER for adult-industry', () => {
    const filePath = path.join(ROOT, 'src/config/map-layer-definitions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes("'adultFKKClubs'"),
      'Should include adultFKKClubs in variant order'
    );
  });
});

describe('adult-industry variant config', () => {
  it('adultFKKClubs is enabled in adult-industry variant', () => {
    const filePath = path.join(ROOT, 'src/config/variants/adult-industry.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('adultFKKClubs: true'),
      'adultFKKClubs should be true in adult-industry variant'
    );
  });
});

describe('formatFKKClubPopup', () => {
  it('formats popup with all fields', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/fkk-clubs.ts'
    );
    const oase = dataMod.getFKKClubById('fkk-oase');
    assert.ok(oase, 'Should find FKK Oase');

    const popup = mod.formatFKKClubPopup(oase);
    assert.ok(popup.includes('FKK Oase'), 'Popup should include name');
    assert.ok(popup.includes('Frankfurt'), 'Popup should include city');
    assert.ok(popup.includes('Germany'), 'Popup should include country');
    assert.ok(popup.includes('€€€'), 'Popup should include price');
  });
});
