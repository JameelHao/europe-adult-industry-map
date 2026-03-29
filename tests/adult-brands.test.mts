/**
 * Adult Industry Brands Data Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ADULT_BRANDS,
  BRAND_CATEGORY_CONFIG,
  getBrandsByCategory,
  getBrandsByCountry,
  getBrandCountries,
  type BrandCategory,
} from '../src/config/variants/adult-industry/data/brands.js';
import {
  createBrandsLayer,
  formatBrandInfo,
  getBrandById,
  BRANDS_LAYER_ID,
} from '../src/config/variants/adult-industry/layers/brands-layer.js';

describe('Adult Brands Data', () => {
  it('should have at least 50 brands', () => {
    assert.ok(ADULT_BRANDS.length >= 50, `Expected >= 50 brands, got ${ADULT_BRANDS.length}`);
  });

  it('should have all required fields for each brand', () => {
    for (const brand of ADULT_BRANDS) {
      assert.ok(brand.id, 'Brand should have id');
      assert.ok(brand.name, 'Brand should have name');
      assert.ok(brand.country, 'Brand should have country');
      assert.ok(brand.city, 'Brand should have city');
      assert.equal(brand.coordinates.length, 2, 'Coordinates should have 2 elements');
      assert.equal(typeof brand.coordinates[0], 'number', 'Longitude should be number');
      assert.equal(typeof brand.coordinates[1], 'number', 'Latitude should be number');
      assert.ok(['toys', 'lingerie', 'wellness', 'media', 'retail'].includes(brand.category));
    }
  });

  it('should have valid coordinates (Europe region)', () => {
    for (const brand of ADULT_BRANDS) {
      const [lng, lat] = brand.coordinates;
      // Europe roughly: -25 to 45 longitude, 34 to 72 latitude
      assert.ok(lng >= -30 && lng <= 50, `${brand.name} lng ${lng} out of range`);
      assert.ok(lat >= 30 && lat <= 75, `${brand.name} lat ${lat} out of range`);
    }
  });

  it('should have unique brand IDs', () => {
    const ids = ADULT_BRANDS.map(b => b.id);
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, ids.length, 'All IDs should be unique');
  });

  it('should cover all categories', () => {
    const categories = new Set(ADULT_BRANDS.map(b => b.category));
    assert.ok(categories.has('toys'), 'Should have toys category');
    assert.ok(categories.has('lingerie'), 'Should have lingerie category');
    assert.ok(categories.has('wellness'), 'Should have wellness category');
    assert.ok(categories.has('media'), 'Should have media category');
    assert.ok(categories.has('retail'), 'Should have retail category');
  });
});

describe('getBrandsByCategory', () => {
  it('should filter brands by toys category', () => {
    const toysBrands = getBrandsByCategory('toys');
    assert.ok(toysBrands.length > 0, 'Should have toys brands');
    assert.ok(toysBrands.every(b => b.category === 'toys'), 'All should be toys');
  });

  it('should filter brands by lingerie category', () => {
    const lingerieBrands = getBrandsByCategory('lingerie');
    assert.ok(lingerieBrands.length > 0, 'Should have lingerie brands');
    assert.ok(lingerieBrands.every(b => b.category === 'lingerie'), 'All should be lingerie');
  });
});

describe('getBrandsByCountry', () => {
  it('should filter brands by Germany', () => {
    const germanBrands = getBrandsByCountry('Germany');
    assert.ok(germanBrands.length > 0, 'Should have German brands');
    assert.ok(germanBrands.every(b => b.country === 'Germany'), 'All should be from Germany');
  });

  it('should filter brands by United Kingdom', () => {
    const ukBrands = getBrandsByCountry('United Kingdom');
    assert.ok(ukBrands.length > 0, 'Should have UK brands');
    assert.ok(ukBrands.every(b => b.country === 'United Kingdom'), 'All should be from UK');
  });

  it('should return empty array for non-existent country', () => {
    const brands = getBrandsByCountry('Atlantis');
    assert.equal(brands.length, 0, 'Should have no brands from Atlantis');
  });
});

describe('getBrandCountries', () => {
  it('should return sorted unique countries', () => {
    const countries = getBrandCountries();
    assert.ok(countries.length > 0, 'Should have countries');
    // Check sorted
    const sorted = [...countries].sort();
    assert.deepEqual(countries, sorted, 'Should be sorted');
    // Check unique
    assert.equal(new Set(countries).size, countries.length, 'Should be unique');
  });

  it('should include major European countries', () => {
    const countries = getBrandCountries();
    assert.ok(countries.includes('Germany'), 'Should include Germany');
    assert.ok(countries.includes('United Kingdom'), 'Should include UK');
    assert.ok(countries.includes('France'), 'Should include France');
  });
});

describe('BRAND_CATEGORY_CONFIG', () => {
  it('should have config for all categories', () => {
    const categories: BrandCategory[] = ['toys', 'lingerie', 'wellness', 'media', 'retail'];
    for (const cat of categories) {
      const config = BRAND_CATEGORY_CONFIG[cat];
      assert.ok(config.label, `${cat} should have label`);
      assert.match(config.color, /^#[0-9A-Fa-f]{6}$/, `${cat} should have valid color`);
      assert.ok(config.icon, `${cat} should have icon`);
    }
  });
});

describe('createBrandsLayer', () => {
  it('should create a layer with correct ID', () => {
    const layer = createBrandsLayer();
    assert.equal(layer.id, BRANDS_LAYER_ID);
  });

  it('should create a pickable layer', () => {
    const layer = createBrandsLayer();
    assert.equal(layer.props.pickable, true);
  });

  it('should filter by categories', () => {
    const layer = createBrandsLayer({ categories: ['toys'] });
    const data = layer.props.data as unknown[];
    assert.ok(data.length > 0, 'Should have data');
    assert.ok(data.length < ADULT_BRANDS.length, 'Should be filtered');
  });

  it('should filter by countries', () => {
    const layer = createBrandsLayer({ countries: ['Germany'] });
    const data = layer.props.data as unknown[];
    assert.ok(data.length > 0, 'Should have data');
    assert.ok(data.length < ADULT_BRANDS.length, 'Should be filtered');
  });

  it('should respect visibility option', () => {
    const visibleLayer = createBrandsLayer({ visible: true });
    const hiddenLayer = createBrandsLayer({ visible: false });
    assert.equal(visibleLayer.props.visible, true);
    assert.equal(hiddenLayer.props.visible, false);
  });
});

describe('formatBrandInfo', () => {
  it('should format brand info with all fields', () => {
    const brand = ADULT_BRANDS.find(b => b.id === 'lelo');
    assert.ok(brand, 'LELO should exist');
    const info = formatBrandInfo(brand);
    assert.ok(info.includes('LELO'), 'Should include name');
    assert.ok(info.includes('Stockholm'), 'Should include city');
    assert.ok(info.includes('Sweden'), 'Should include country');
    assert.ok(info.includes('2003'), 'Should include founded year');
  });
});

describe('getBrandById', () => {
  it('should find brand by ID', () => {
    const brand = getBrandById('lelo');
    assert.ok(brand, 'Should find LELO');
    assert.equal(brand?.name, 'LELO');
  });

  it('should return undefined for non-existent ID', () => {
    const brand = getBrandById('non-existent-brand');
    assert.equal(brand, undefined);
  });
});
