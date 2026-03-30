/**
 * Tests for FR #49: City service type filters
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('city filter data', () => {
  it('cities.ts exports CityService type', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/cities.ts');
    assert.ok(mod.SERVICE_LABELS, 'Should export SERVICE_LABELS');
    assert.ok(mod.SERVICE_ICONS, 'Should export SERVICE_ICONS');
    assert.ok(mod.SERVICE_COLORS, 'Should export SERVICE_COLORS');
  });

  it('all cities have services array', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/cities.ts');
    for (const city of mod.CITIES) {
      assert.ok(Array.isArray(city.services), `City ${city.id} should have services array`);
    }
  });

  it('cities have valid service types', async () => {
    const mod = await import('../src/config/variants/adult-industry/data/cities.ts');
    const validServices = Object.keys(mod.SERVICE_LABELS);
    for (const city of mod.CITIES) {
      for (const service of city.services) {
        assert.ok(
          validServices.includes(service),
          `City ${city.id} has invalid service: ${service}`
        );
      }
    }
  });
});

describe('AdultIndustryFiltersPanel', () => {
  it('AdultIndustryFiltersPanel.ts exists', () => {
    const filePath = path.join(ROOT, 'src/components/AdultIndustryFiltersPanel.ts');
    assert.ok(fs.existsSync(filePath), 'AdultIndustryFiltersPanel.ts should exist');
  });

  it('exports AdultIndustryFiltersPanel class', async () => {
    const mod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    assert.ok(typeof mod.AdultIndustryFiltersPanel === 'function');
  });

  it('exports filterCitiesByServices function', async () => {
    const mod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    assert.ok(typeof mod.filterCitiesByServices === 'function');
  });
});

describe('filterCitiesByServices', () => {
  it('returns all cities when no filters', async () => {
    const filterMod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    const citiesMod = await import('../src/config/variants/adult-industry/data/cities.ts');
    
    const result = filterMod.filterCitiesByServices(citiesMod.CITIES, []);
    assert.strictEqual(result.length, citiesMod.CITIES.length);
  });

  it('filters cities by single service', async () => {
    const filterMod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    const citiesMod = await import('../src/config/variants/adult-industry/data/cities.ts');
    
    const result = filterMod.filterCitiesByServices(citiesMod.CITIES, ['redLightDistrict']);
    assert.ok(result.length > 0, 'Should find cities with red light districts');
    assert.ok(result.length < citiesMod.CITIES.length, 'Should filter some cities');
    
    // All results should have redLightDistrict
    for (const city of result) {
      assert.ok(
        city.services.includes('redLightDistrict'),
        `City ${city.id} should have redLightDistrict`
      );
    }
  });

  it('filters cities by multiple services (OR logic)', async () => {
    const filterMod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    const citiesMod = await import('../src/config/variants/adult-industry/data/cities.ts');
    
    const result = filterMod.filterCitiesByServices(citiesMod.CITIES, [
      'redLightDistrict',
      'swingerClubs',
    ]);
    
    // All results should have at least one of the services
    for (const city of result) {
      const hasService =
        city.services.includes('redLightDistrict') ||
        city.services.includes('swingerClubs');
      assert.ok(hasService, `City ${city.id} should have at least one filtered service`);
    }
  });

  it('Amsterdam passes redLightDistrict filter', async () => {
    const filterMod = await import('../src/components/AdultIndustryFiltersPanel.ts');
    const citiesMod = await import('../src/config/variants/adult-industry/data/cities.ts');
    
    const result = filterMod.filterCitiesByServices(citiesMod.CITIES, ['redLightDistrict']);
    const amsterdam = result.find((c: { id: string }) => c.id === 'amsterdam');
    assert.ok(amsterdam, 'Amsterdam should be in results');
  });
});

describe('cities-layer with filter data', () => {
  it('createCitiesLayer accepts data parameter', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    
    // Test that the function signature accepts data
    const fn = mod.createCitiesLayer;
    assert.ok(typeof fn === 'function');
    
    // Check that it can be called with empty data
    const layer = fn({ data: [] });
    assert.ok(layer, 'Should create layer with custom data');
  });
});

describe('component export', () => {
  it('AdultIndustryFiltersPanel is exported from components/index.ts', () => {
    const filePath = path.join(ROOT, 'src/components/index.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('AdultIndustryFiltersPanel'),
      'Should export AdultIndustryFiltersPanel'
    );
  });
});
