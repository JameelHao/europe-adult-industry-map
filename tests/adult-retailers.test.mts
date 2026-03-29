/**
 * Adult Industry Retailers Data Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  ADULT_RETAILERS,
  RETAILER_TYPE_CONFIG,
  getRetailersByType,
  getRetailersByCountry,
  getRetailerCountries,
  getTotalStoreCount,
  type RetailerType,
} from '../src/config/variants/adult-industry/data/retailers.js';
import {
  createRetailersLayer,
  formatRetailerInfo,
  getRetailerById,
  RETAILERS_LAYER_ID,
} from '../src/config/variants/adult-industry/layers/retailers-layer.js';

describe('Adult Retailers Data', () => {
  it('should have at least 30 retailers', () => {
    assert.ok(ADULT_RETAILERS.length >= 30, `Expected >= 30 retailers, got ${ADULT_RETAILERS.length}`);
  });

  it('should have all required fields for each retailer', () => {
    for (const retailer of ADULT_RETAILERS) {
      assert.ok(retailer.id, 'Retailer should have id');
      assert.ok(retailer.name, 'Retailer should have name');
      assert.ok(retailer.country, 'Retailer should have country');
      assert.ok(retailer.city, 'Retailer should have city');
      assert.equal(retailer.coordinates.length, 2, 'Coordinates should have 2 elements');
      assert.equal(typeof retailer.coordinates[0], 'number', 'Longitude should be number');
      assert.equal(typeof retailer.coordinates[1], 'number', 'Latitude should be number');
      assert.ok(['chain', 'independent', 'online-only'].includes(retailer.type));
    }
  });

  it('should have valid coordinates (Europe region)', () => {
    for (const retailer of ADULT_RETAILERS) {
      const [lng, lat] = retailer.coordinates;
      assert.ok(lng >= -30 && lng <= 50, `${retailer.name} lng ${lng} out of range`);
      assert.ok(lat >= 30 && lat <= 75, `${retailer.name} lat ${lat} out of range`);
    }
  });

  it('should have unique retailer IDs', () => {
    const ids = ADULT_RETAILERS.map(r => r.id);
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, ids.length, 'All IDs should be unique');
  });

  it('should cover all retailer types', () => {
    const types = new Set(ADULT_RETAILERS.map(r => r.type));
    assert.ok(types.has('chain'), 'Should have chain type');
    assert.ok(types.has('independent'), 'Should have independent type');
    assert.ok(types.has('online-only'), 'Should have online-only type');
  });

  it('should have storeCount for chain retailers', () => {
    const chains = ADULT_RETAILERS.filter(r => r.type === 'chain');
    const chainsWithCount = chains.filter(r => r.storeCount !== undefined);
    assert.ok(chainsWithCount.length > 0, 'Some chains should have store counts');
  });
});

describe('getRetailersByType', () => {
  it('should filter retailers by chain type', () => {
    const chains = getRetailersByType('chain');
    assert.ok(chains.length > 0, 'Should have chain retailers');
    assert.ok(chains.every(r => r.type === 'chain'), 'All should be chains');
  });

  it('should filter retailers by online-only type', () => {
    const onlineOnly = getRetailersByType('online-only');
    assert.ok(onlineOnly.length > 0, 'Should have online-only retailers');
    assert.ok(onlineOnly.every(r => r.type === 'online-only'), 'All should be online-only');
  });
});

describe('getRetailersByCountry', () => {
  it('should filter retailers by Germany', () => {
    const germanRetailers = getRetailersByCountry('Germany');
    assert.ok(germanRetailers.length > 0, 'Should have German retailers');
    assert.ok(germanRetailers.every(r => r.country === 'Germany'), 'All should be from Germany');
  });

  it('should filter retailers by United Kingdom', () => {
    const ukRetailers = getRetailersByCountry('United Kingdom');
    assert.ok(ukRetailers.length > 0, 'Should have UK retailers');
    assert.ok(ukRetailers.every(r => r.country === 'United Kingdom'), 'All should be from UK');
  });

  it('should return empty array for non-existent country', () => {
    const retailers = getRetailersByCountry('Atlantis');
    assert.equal(retailers.length, 0, 'Should have no retailers from Atlantis');
  });
});

describe('getRetailerCountries', () => {
  it('should return sorted unique countries', () => {
    const countries = getRetailerCountries();
    assert.ok(countries.length > 0, 'Should have countries');
    const sorted = [...countries].sort();
    assert.deepEqual(countries, sorted, 'Should be sorted');
    assert.equal(new Set(countries).size, countries.length, 'Should be unique');
  });

  it('should include major European countries', () => {
    const countries = getRetailerCountries();
    assert.ok(countries.includes('Germany'), 'Should include Germany');
    assert.ok(countries.includes('United Kingdom'), 'Should include UK');
    assert.ok(countries.includes('France'), 'Should include France');
  });
});

describe('getTotalStoreCount', () => {
  it('should return a positive total store count', () => {
    const total = getTotalStoreCount();
    assert.ok(total > 0, 'Total store count should be positive');
    assert.ok(total > 100, 'Should have significant number of stores');
  });
});

describe('RETAILER_TYPE_CONFIG', () => {
  it('should have config for all types', () => {
    const types: RetailerType[] = ['chain', 'independent', 'online-only'];
    for (const type of types) {
      const config = RETAILER_TYPE_CONFIG[type];
      assert.ok(config.label, `${type} should have label`);
      assert.match(config.color, /^#[0-9A-Fa-f]{6}$/, `${type} should have valid color`);
      assert.ok(config.icon, `${type} should have icon`);
    }
  });
});

describe('createRetailersLayer', () => {
  it('should create a layer with correct ID', () => {
    const layer = createRetailersLayer();
    assert.equal(layer.id, RETAILERS_LAYER_ID);
  });

  it('should create a pickable layer', () => {
    const layer = createRetailersLayer();
    assert.equal(layer.props.pickable, true);
  });

  it('should filter by types', () => {
    const layer = createRetailersLayer({ types: ['chain'] });
    const data = layer.props.data as unknown[];
    assert.ok(data.length > 0, 'Should have data');
    assert.ok(data.length < ADULT_RETAILERS.length, 'Should be filtered');
  });

  it('should filter by countries', () => {
    const layer = createRetailersLayer({ countries: ['Germany'] });
    const data = layer.props.data as unknown[];
    assert.ok(data.length > 0, 'Should have data');
    assert.ok(data.length < ADULT_RETAILERS.length, 'Should be filtered');
  });

  it('should respect visibility option', () => {
    const visibleLayer = createRetailersLayer({ visible: true });
    const hiddenLayer = createRetailersLayer({ visible: false });
    assert.equal(visibleLayer.props.visible, true);
    assert.equal(hiddenLayer.props.visible, false);
  });
});

describe('formatRetailerInfo', () => {
  it('should format retailer info with all fields', () => {
    const retailer = ADULT_RETAILERS.find(r => r.id === 'ann-summers');
    assert.ok(retailer, 'Ann Summers should exist');
    const info = formatRetailerInfo(retailer);
    assert.ok(info.includes('Ann Summers'), 'Should include name');
    assert.ok(info.includes('140 stores'), 'Should include store count');
    assert.ok(info.includes('1970'), 'Should include founded year');
  });
});

describe('getRetailerById', () => {
  it('should find retailer by ID', () => {
    const retailer = getRetailerById('ann-summers');
    assert.ok(retailer, 'Should find Ann Summers');
    assert.equal(retailer?.name, 'Ann Summers');
  });

  it('should return undefined for non-existent ID', () => {
    const retailer = getRetailerById('non-existent-retailer');
    assert.equal(retailer, undefined);
  });
});
