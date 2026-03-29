/**
 * Adult Industry Factories Data Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  FACTORIES,
  FACILITY_TYPE_COLORS,
  FACILITY_TYPE_LABELS,
  FACILITY_TYPE_ICONS,
  getFactoriesSortedByCountry,
  getFactoriesByType,
  getFactoriesByCountry,
  getFactoriesByOwner,
  getFactoryById,
  getFactoryCountries,
  getFactoryOwners,
  getTotalEmployeeEstimate,
  type FacilityType,
} from '../src/config/variants/adult-industry/data/factories.js';
import {
  formatFactoryInfo,
  getFactoriesLegend,
  getFactoriesStats,
  FACTORIES_LAYER_ID,
} from '../src/config/variants/adult-industry/layers/factories-layer.js';

describe('Factories Data', () => {
  it('should have at least 20 facilities', () => {
    assert.ok(FACTORIES.length >= 20, `Expected >= 20 facilities, got ${FACTORIES.length}`);
  });

  it('should have all required fields for each factory', () => {
    for (const factory of FACTORIES) {
      assert.ok(factory.id, 'Should have id');
      assert.ok(factory.name, 'Should have name');
      assert.ok(factory.country, 'Should have country');
      assert.ok(factory.city, 'Should have city');
      assert.ok(['manufacturing', 'assembly', 'distribution'].includes(factory.type), 'Should have valid type');
      assert.equal(factory.coordinates.length, 2, 'Should have coordinates [lng, lat]');
    }
  });

  it('should have unique factory IDs', () => {
    const ids = FACTORIES.map(f => f.id);
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, ids.length, 'All factory IDs should be unique');
  });

  it('should have valid coordinates', () => {
    for (const factory of FACTORIES) {
      const [lng, lat] = factory.coordinates;
      assert.ok(lng >= -180 && lng <= 180, `${factory.name}: Longitude should be -180 to 180`);
      assert.ok(lat >= -90 && lat <= 90, `${factory.name}: Latitude should be -90 to 90`);
    }
  });

  it('should cover multiple facility types', () => {
    const types = new Set(FACTORIES.map(f => f.type));
    assert.ok(types.has('manufacturing'), 'Should have manufacturing facilities');
    assert.ok(types.has('distribution'), 'Should have distribution facilities');
  });

  it('should include German facilities', () => {
    const germanFactories = FACTORIES.filter(f => f.country === 'Germany');
    assert.ok(germanFactories.length >= 5, 'Should have at least 5 German facilities');
  });

  it('should include known brands', () => {
    const owners = FACTORIES.map(f => f.owner?.toLowerCase() ?? '').filter(Boolean);
    assert.ok(owners.some(o => o.includes('fun factory')), 'Should include Fun Factory');
    assert.ok(owners.some(o => o.includes('satisfyer')), 'Should include Satisfyer');
  });
});

describe('FACILITY_TYPE constants', () => {
  it('should have colors for all types', () => {
    const types: FacilityType[] = ['manufacturing', 'assembly', 'distribution'];
    for (const type of types) {
      assert.ok(FACILITY_TYPE_COLORS[type], `Should have color for ${type}`);
      assert.match(FACILITY_TYPE_COLORS[type], /^#[0-9A-Fa-f]{6}$/, 'Should be valid hex color');
    }
  });

  it('should have labels for all types', () => {
    const types: FacilityType[] = ['manufacturing', 'assembly', 'distribution'];
    for (const type of types) {
      assert.ok(FACILITY_TYPE_LABELS[type], `Should have label for ${type}`);
    }
  });

  it('should have icons for all types', () => {
    const types: FacilityType[] = ['manufacturing', 'assembly', 'distribution'];
    for (const type of types) {
      assert.ok(FACILITY_TYPE_ICONS[type], `Should have icon for ${type}`);
    }
  });
});

describe('getFactoriesSortedByCountry', () => {
  it('should return factories sorted by country', () => {
    const sorted = getFactoriesSortedByCountry();
    for (let i = 1; i < sorted.length; i++) {
      const prev = sorted[i - 1].country;
      const curr = sorted[i].country;
      assert.ok(curr.localeCompare(prev) >= 0, 'Factories should be sorted by country');
    }
  });
});

describe('getFactoriesByType', () => {
  it('should filter manufacturing facilities', () => {
    const mfg = getFactoriesByType('manufacturing');
    assert.ok(mfg.length > 0, 'Should have manufacturing facilities');
    assert.ok(mfg.every(f => f.type === 'manufacturing'));
  });

  it('should filter distribution facilities', () => {
    const dist = getFactoriesByType('distribution');
    assert.ok(dist.length > 0, 'Should have distribution facilities');
    assert.ok(dist.every(f => f.type === 'distribution'));
  });
});

describe('getFactoriesByCountry', () => {
  it('should filter by Germany', () => {
    const german = getFactoriesByCountry('Germany');
    assert.ok(german.length > 0, 'Should have German facilities');
    assert.ok(german.every(f => f.country === 'Germany'));
  });

  it('should be case insensitive', () => {
    const lower = getFactoriesByCountry('germany');
    const upper = getFactoriesByCountry('GERMANY');
    assert.equal(lower.length, upper.length);
  });
});

describe('getFactoriesByOwner', () => {
  it('should find Fun Factory facilities', () => {
    const funFactory = getFactoriesByOwner('Fun Factory');
    assert.ok(funFactory.length > 0, 'Should find Fun Factory');
    assert.ok(funFactory.every(f => f.owner?.toLowerCase().includes('fun factory')));
  });

  it('should handle partial matches', () => {
    const satisfyer = getFactoriesByOwner('satisf');
    assert.ok(satisfyer.length > 0, 'Should find Satisfyer with partial match');
  });
});

describe('getFactoryById', () => {
  it('should find factory by ID', () => {
    const factory = getFactoryById('fun-factory-bremen');
    assert.ok(factory, 'Should find Fun Factory Bremen');
    assert.equal(factory?.name, 'Fun Factory Production');
  });

  it('should return undefined for non-existent ID', () => {
    const factory = getFactoryById('non-existent');
    assert.equal(factory, undefined);
  });
});

describe('getFactoryCountries', () => {
  it('should return unique sorted countries', () => {
    const countries = getFactoryCountries();
    assert.ok(countries.length >= 5, 'Should have at least 5 countries');
    // Check sorted
    const sorted = [...countries].sort();
    assert.deepEqual(countries, sorted, 'Should be sorted');
    // Check unique
    assert.equal(new Set(countries).size, countries.length, 'Should be unique');
  });

  it('should include Germany', () => {
    const countries = getFactoryCountries();
    assert.ok(countries.includes('Germany'));
  });

  it('should include Netherlands', () => {
    const countries = getFactoryCountries();
    assert.ok(countries.includes('Netherlands'));
  });
});

describe('getFactoryOwners', () => {
  it('should return unique sorted owners', () => {
    const owners = getFactoryOwners();
    assert.ok(owners.length >= 10, 'Should have at least 10 owner brands');
    // Check sorted
    const sorted = [...owners].sort();
    assert.deepEqual(owners, sorted, 'Should be sorted');
  });
});

describe('getTotalEmployeeEstimate', () => {
  it('should return positive total', () => {
    const total = getTotalEmployeeEstimate();
    assert.ok(total > 0, 'Should have positive employee count');
    assert.ok(total > 1000, 'Should have at least 1000 employees total');
  });
});

describe('formatFactoryInfo', () => {
  it('should format factory info correctly', () => {
    const factory = getFactoryById('fun-factory-bremen');
    assert.ok(factory);
    const info = formatFactoryInfo(factory);
    assert.ok(info.includes('Fun Factory Production'), 'Should include name');
    assert.ok(info.includes('Bremen'), 'Should include city');
    assert.ok(info.includes('Germany'), 'Should include country');
    assert.ok(info.includes('Manufacturing'), 'Should include type');
    assert.ok(info.includes('Fun Factory'), 'Should include owner');
  });
});

describe('getFactoriesLegend', () => {
  it('should return legend for all facility types', () => {
    const legend = getFactoriesLegend();
    assert.equal(legend.length, 3, 'Should have 3 facility types');
    const types = legend.map(l => l.type);
    assert.ok(types.includes('manufacturing'));
    assert.ok(types.includes('assembly'));
    assert.ok(types.includes('distribution'));
  });
});

describe('getFactoriesStats', () => {
  it('should return correct total', () => {
    const stats = getFactoriesStats();
    assert.equal(stats.total, FACTORIES.length);
  });

  it('should have byType counts', () => {
    const stats = getFactoriesStats();
    let total = 0;
    for (const count of Object.values(stats.byType)) {
      total += count;
    }
    assert.equal(total, stats.total);
  });

  it('should have totalEmployees', () => {
    const stats = getFactoriesStats();
    assert.ok(stats.totalEmployees > 0);
  });
});

describe('FACTORIES_LAYER_ID', () => {
  it('should have correct layer ID', () => {
    assert.equal(FACTORIES_LAYER_ID, 'adult-industry-factories');
  });
});
