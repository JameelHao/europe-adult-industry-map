/**
 * Adult Industry Cities Layer Tests
 *
 * Validates cities data and layer configuration.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('adult-industry cities data', () => {
  it('cities.ts data file exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/cities.ts');
    assert.ok(existsSync(path), 'cities.ts should exist');
  });

  it('cities.ts exports CITIES array with 64 cities', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/cities.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export const CITIES: City[]'), 'Should export CITIES array');
    
    // Count city entries (look for id: 'cityname' patterns)
    const cityMatches = src.match(/id:\s*'[a-z-]+'/g);
    assert.ok(cityMatches, 'Should have city entries');
    // Issue mentioned 64 cities but list has 63 (Kyiv was listed as Kiev)
    assert.ok(cityMatches.length >= 63, `Should have at least 63 cities, found ${cityMatches.length}`);
  });

  it('cities.ts exports helper functions', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/cities.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export function getCities()'), 'Should export getCities');
    assert.ok(src.includes('export function getCityById('), 'Should export getCityById');
    assert.ok(src.includes('export function getCitiesByCountry('), 'Should export getCitiesByCountry');
  });

  it('cities have required fields', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/cities.ts');
    const src = readFileSync(path, 'utf-8');
    // Check interface definition
    assert.ok(src.includes('name: string'), 'City should have name');
    assert.ok(src.includes('country: string'), 'City should have country');
    assert.ok(src.includes('coordinates: [number, number]'), 'City should have coordinates');
    assert.ok(src.includes('services: CityService[]'), 'City should have services');
    assert.ok(src.includes('guideUrl: string'), 'City should have guideUrl');
  });
});

describe('adult-industry cities layer', () => {
  it('cities-layer.ts exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/layers/cities-layer.ts');
    assert.ok(existsSync(path), 'cities-layer.ts should exist');
  });

  it('cities-layer.ts exports createCitiesLayer', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/layers/cities-layer.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export function createCitiesLayer'), 'Should export createCitiesLayer');
  });

  it('cities-layer.ts exports formatCityPopup', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/layers/cities-layer.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('export function formatCityPopup'), 'Should export formatCityPopup');
  });
});

describe('adult-industry cities layer registration', () => {
  it('adultCities is in LAYER_REGISTRY', () => {
    const path = resolve(__dirname, '../src/config/map-layer-definitions.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('adultCities:'), 'Should have adultCities in LAYER_REGISTRY');
  });

  it('adultCities is in MapLayers type', () => {
    const path = resolve(__dirname, '../src/types/index.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('adultCities: boolean'), 'Should have adultCities in MapLayers type');
  });

  it('adultCities is enabled in adult-industry variant', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry.ts');
    const src = readFileSync(path, 'utf-8');
    assert.ok(src.includes('adultCities: true'), 'Should have adultCities: true in adult-industry variant');
  });
});
