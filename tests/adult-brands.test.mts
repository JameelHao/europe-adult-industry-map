/**
 * Adult Industry Brands Data Tests
 */
import { describe, it, expect } from 'vitest';
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
    expect(ADULT_BRANDS.length).toBeGreaterThanOrEqual(50);
  });

  it('should have all required fields for each brand', () => {
    for (const brand of ADULT_BRANDS) {
      expect(brand.id).toBeTruthy();
      expect(brand.name).toBeTruthy();
      expect(brand.country).toBeTruthy();
      expect(brand.city).toBeTruthy();
      expect(brand.coordinates).toHaveLength(2);
      expect(typeof brand.coordinates[0]).toBe('number'); // longitude
      expect(typeof brand.coordinates[1]).toBe('number'); // latitude
      expect(['toys', 'lingerie', 'wellness', 'media', 'retail']).toContain(brand.category);
    }
  });

  it('should have valid coordinates (Europe region)', () => {
    for (const brand of ADULT_BRANDS) {
      const [lng, lat] = brand.coordinates;
      // Europe roughly: -25 to 45 longitude, 34 to 72 latitude
      expect(lng).toBeGreaterThanOrEqual(-30);
      expect(lng).toBeLessThanOrEqual(50);
      expect(lat).toBeGreaterThanOrEqual(30);
      expect(lat).toBeLessThanOrEqual(75);
    }
  });

  it('should have unique brand IDs', () => {
    const ids = ADULT_BRANDS.map(b => b.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('should cover all categories', () => {
    const categories = new Set(ADULT_BRANDS.map(b => b.category));
    expect(categories.has('toys')).toBe(true);
    expect(categories.has('lingerie')).toBe(true);
    expect(categories.has('wellness')).toBe(true);
    expect(categories.has('media')).toBe(true);
    expect(categories.has('retail')).toBe(true);
  });
});

describe('getBrandsByCategory', () => {
  it('should filter brands by toys category', () => {
    const toysBrands = getBrandsByCategory('toys');
    expect(toysBrands.length).toBeGreaterThan(0);
    expect(toysBrands.every(b => b.category === 'toys')).toBe(true);
  });

  it('should filter brands by lingerie category', () => {
    const lingerieBrands = getBrandsByCategory('lingerie');
    expect(lingerieBrands.length).toBeGreaterThan(0);
    expect(lingerieBrands.every(b => b.category === 'lingerie')).toBe(true);
  });
});

describe('getBrandsByCountry', () => {
  it('should filter brands by Germany', () => {
    const germanBrands = getBrandsByCountry('Germany');
    expect(germanBrands.length).toBeGreaterThan(0);
    expect(germanBrands.every(b => b.country === 'Germany')).toBe(true);
  });

  it('should filter brands by United Kingdom', () => {
    const ukBrands = getBrandsByCountry('United Kingdom');
    expect(ukBrands.length).toBeGreaterThan(0);
    expect(ukBrands.every(b => b.country === 'United Kingdom')).toBe(true);
  });

  it('should return empty array for non-existent country', () => {
    const brands = getBrandsByCountry('Atlantis');
    expect(brands).toHaveLength(0);
  });
});

describe('getBrandCountries', () => {
  it('should return sorted unique countries', () => {
    const countries = getBrandCountries();
    expect(countries.length).toBeGreaterThan(0);
    // Check sorted
    const sorted = [...countries].sort();
    expect(countries).toEqual(sorted);
    // Check unique
    expect(new Set(countries).size).toBe(countries.length);
  });

  it('should include major European countries', () => {
    const countries = getBrandCountries();
    expect(countries).toContain('Germany');
    expect(countries).toContain('United Kingdom');
    expect(countries).toContain('France');
  });
});

describe('BRAND_CATEGORY_CONFIG', () => {
  it('should have config for all categories', () => {
    const categories: BrandCategory[] = ['toys', 'lingerie', 'wellness', 'media', 'retail'];
    for (const cat of categories) {
      const config = BRAND_CATEGORY_CONFIG[cat];
      expect(config.label).toBeTruthy();
      expect(config.color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      expect(config.icon).toBeTruthy();
    }
  });
});

describe('createBrandsLayer', () => {
  it('should create a layer with correct ID', () => {
    const layer = createBrandsLayer();
    expect(layer.id).toBe(BRANDS_LAYER_ID);
  });

  it('should create a pickable layer', () => {
    const layer = createBrandsLayer();
    expect(layer.props.pickable).toBe(true);
  });

  it('should filter by categories', () => {
    const layer = createBrandsLayer({ categories: ['toys'] });
    const data = layer.props.data as unknown[];
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBeLessThan(ADULT_BRANDS.length);
  });

  it('should filter by countries', () => {
    const layer = createBrandsLayer({ countries: ['Germany'] });
    const data = layer.props.data as unknown[];
    expect(data.length).toBeGreaterThan(0);
    expect(data.length).toBeLessThan(ADULT_BRANDS.length);
  });

  it('should respect visibility option', () => {
    const visibleLayer = createBrandsLayer({ visible: true });
    const hiddenLayer = createBrandsLayer({ visible: false });
    expect(visibleLayer.props.visible).toBe(true);
    expect(hiddenLayer.props.visible).toBe(false);
  });
});

describe('formatBrandInfo', () => {
  it('should format brand info with all fields', () => {
    const brand = ADULT_BRANDS.find(b => b.id === 'lelo');
    expect(brand).toBeDefined();
    if (brand) {
      const info = formatBrandInfo(brand);
      expect(info).toContain('LELO');
      expect(info).toContain('Stockholm');
      expect(info).toContain('Sweden');
      expect(info).toContain('2003');
    }
  });

  it('should handle brands without optional fields', () => {
    const minimalBrand = ADULT_BRANDS.find(b => !b.website && !b.description);
    if (minimalBrand) {
      const info = formatBrandInfo(minimalBrand);
      expect(info).toContain(minimalBrand.name);
      expect(info).toContain(minimalBrand.city);
    }
  });
});

describe('getBrandById', () => {
  it('should find brand by ID', () => {
    const brand = getBrandById('lelo');
    expect(brand).toBeDefined();
    expect(brand?.name).toBe('LELO');
  });

  it('should return undefined for non-existent ID', () => {
    const brand = getBrandById('non-existent-brand');
    expect(brand).toBeUndefined();
  });
});
