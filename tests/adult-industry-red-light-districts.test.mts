/**
 * Tests for FR #47: Red Light Districts layer
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('adult-industry red light districts data', () => {
  it('red-light-districts.ts data file exists', () => {
    const filePath = path.join(
      ROOT,
      'src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    assert.ok(fs.existsSync(filePath), 'red-light-districts.ts should exist');
  });

  it('red-light-districts.ts exports RED_LIGHT_DISTRICTS array with 15+ districts', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    assert.ok(Array.isArray(mod.RED_LIGHT_DISTRICTS), 'Should export RED_LIGHT_DISTRICTS array');
    assert.ok(
      mod.RED_LIGHT_DISTRICTS.length >= 15,
      `Should have at least 15 districts, got ${mod.RED_LIGHT_DISTRICTS.length}`
    );
  });

  it('red-light-districts.ts exports helper functions', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    assert.ok(typeof mod.getRedLightDistrictById === 'function');
    assert.ok(typeof mod.getRedLightDistrictsByCountry === 'function');
    assert.ok(typeof mod.getRedLightDistrictsByCity === 'function');
    assert.ok(typeof mod.getRedLightDistrictsByType === 'function');
    assert.ok(typeof mod.getRedLightDistrictStats === 'function');
  });

  it('red light districts have required fields', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    for (const district of mod.RED_LIGHT_DISTRICTS) {
      assert.ok(district.id, 'District should have id');
      assert.ok(district.name, 'District should have name');
      assert.ok(district.city, 'District should have city');
      assert.ok(district.country, 'District should have country');
      assert.ok(Array.isArray(district.coordinates), 'District should have coordinates array');
      assert.strictEqual(district.coordinates.length, 2, 'Coordinates should have 2 elements');
      assert.ok(district.type, 'District should have type');
      assert.ok(district.description, 'District should have description');
      assert.ok(district.legalStatus, 'District should have legalStatus');
    }
  });

  it('red light districts have valid types', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const validTypes = ['windows', 'street', 'clubs', 'mixed'];
    for (const district of mod.RED_LIGHT_DISTRICTS) {
      assert.ok(
        validTypes.includes(district.type),
        `District ${district.id} has invalid type: ${district.type}`
      );
    }
  });

  it('red light districts have valid legal status', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const validStatuses = ['fully-legal', 'tolerated', 'grey-area'];
    for (const district of mod.RED_LIGHT_DISTRICTS) {
      assert.ok(
        validStatuses.includes(district.legalStatus),
        `District ${district.id} has invalid legalStatus: ${district.legalStatus}`
      );
    }
  });

  it('getRedLightDistrictById returns correct district', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const deWallen = mod.getRedLightDistrictById('de-wallen');
    assert.ok(deWallen, 'Should find De Wallen');
    assert.strictEqual(deWallen?.city, 'Amsterdam');
    assert.strictEqual(deWallen?.country, 'Netherlands');
  });

  it('getRedLightDistrictsByCountry returns correct districts', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const german = mod.getRedLightDistrictsByCountry('Germany');
    assert.ok(german.length >= 3, 'Should have at least 3 German districts');
    for (const d of german) {
      assert.strictEqual(d.country, 'Germany');
    }
  });

  it('getRedLightDistrictStats returns valid stats', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const stats = mod.getRedLightDistrictStats();
    assert.ok(stats.total >= 15, 'Should have at least 15 total districts');
    assert.ok(Object.keys(stats.byCountry).length >= 8, 'Should cover at least 8 countries');
    assert.ok(Object.keys(stats.byType).length >= 3, 'Should have at least 3 types');
  });
});

describe('adult-industry red light districts layer', () => {
  it('red-light-districts-layer.ts exists', () => {
    const filePath = path.join(
      ROOT,
      'src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    assert.ok(fs.existsSync(filePath), 'red-light-districts-layer.ts should exist');
  });

  it('red-light-districts-layer.ts exports createRedLightDistrictsLayer', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    assert.ok(typeof mod.createRedLightDistrictsLayer === 'function');
  });

  it('red-light-districts-layer.ts exports formatRedLightDistrictPopup', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    assert.ok(typeof mod.formatRedLightDistrictPopup === 'function');
  });
});

describe('adult-industry red light districts layer registration', () => {
  it('adultRedLightDistricts is defined in map-layer-definitions.ts', () => {
    const filePath = path.join(ROOT, 'src/config/map-layer-definitions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('adultRedLightDistricts'),
      'map-layer-definitions.ts should contain adultRedLightDistricts'
    );
    assert.ok(
      content.includes("'Red Light Districts'"),
      'Should have Red Light Districts label'
    );
  });

  it('adultRedLightDistricts is in VARIANT_LAYER_ORDER for adult-industry', () => {
    const filePath = path.join(ROOT, 'src/config/map-layer-definitions.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    // Check if adultRedLightDistricts appears in the adult-industry array
    assert.ok(
      content.includes("'adultRedLightDistricts'"),
      'Should include adultRedLightDistricts in variant order'
    );
  });
});

describe('adult-industry variant config', () => {
  it('adultRedLightDistricts is enabled in adult-industry variant', () => {
    const filePath = path.join(ROOT, 'src/config/variants/adult-industry.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('adultRedLightDistricts: true'),
      'adultRedLightDistricts should be true in adult-industry variant'
    );
  });
});

describe('formatRedLightDistrictPopup', () => {
  it('formats popup with all fields', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );
    const deWallen = dataMod.getRedLightDistrictById('de-wallen');
    assert.ok(deWallen, 'Should find De Wallen');

    const popup = mod.formatRedLightDistrictPopup(deWallen);
    assert.ok(popup.includes('De Wallen'), 'Popup should include name');
    assert.ok(popup.includes('Amsterdam'), 'Popup should include city');
    assert.ok(popup.includes('Netherlands'), 'Popup should include country');
    assert.ok(popup.includes('Window Prostitution'), 'Popup should include type');
    assert.ok(popup.includes('Fully Legal'), 'Popup should include legal status');
  });
});
