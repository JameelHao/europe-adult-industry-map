/**
 * Tests for FR #65: Search functionality for cities and venues
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Search Functions', () => {
  it('exports searchAdultIndustryItems function', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    assert.ok(typeof mod.searchAdultIndustryItems === 'function');
  });

  it('exports getSearchableItems function', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    assert.ok(typeof mod.getSearchableItems === 'function');
  });

  it('exports formatSearchItem function', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    assert.ok(typeof mod.formatSearchItem === 'function');
  });

  it('search functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.searchAdultIndustryItems === 'function');
    assert.ok(typeof mod.getSearchableItems === 'function');
  });
});

describe('getSearchableItems', () => {
  it('returns array of search items', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const items = mod.getSearchableItems();
    
    assert.ok(Array.isArray(items), 'Should return array');
    assert.ok(items.length > 0, 'Should have items');
  });

  it('includes cities', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const items = mod.getSearchableItems();
    
    const cities = items.filter((i: { type: string }) => i.type === 'city');
    assert.ok(cities.length > 0, 'Should include cities');
  });

  it('includes red light districts', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const items = mod.getSearchableItems();
    
    const rlds = items.filter((i: { type: string }) => i.type === 'rld');
    assert.ok(rlds.length > 0, 'Should include red light districts');
  });

  it('includes FKK clubs', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const items = mod.getSearchableItems();
    
    const fkks = items.filter((i: { type: string }) => i.type === 'fkk');
    assert.ok(fkks.length > 0, 'Should include FKK clubs');
  });

  it('items have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const items = mod.getSearchableItems();
    
    for (const item of items.slice(0, 10)) {
      assert.ok(item.type, 'Should have type');
      assert.ok(item.id, 'Should have id');
      assert.ok(item.name, 'Should have name');
      assert.ok(item.country, 'Should have country');
      assert.ok(Array.isArray(item.coordinates), 'Should have coordinates');
      assert.strictEqual(item.coordinates.length, 2, 'Coordinates should have 2 elements');
    }
  });
});

describe('searchAdultIndustryItems', () => {
  it('returns empty array for empty query', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    
    assert.deepStrictEqual(mod.searchAdultIndustryItems(''), []);
    assert.deepStrictEqual(mod.searchAdultIndustryItems('  '), []);
  });

  it('finds Amsterdam city', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const results = mod.searchAdultIndustryItems('Amsterdam');
    
    assert.ok(results.length > 0, 'Should find results');
    const amsterdam = results.find(
      (r: { name: string; type: string }) => r.name === 'Amsterdam' && r.type === 'city'
    );
    assert.ok(amsterdam, 'Should find Amsterdam city');
  });

  it('finds De Wallen red light district', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const results = mod.searchAdultIndustryItems('De Wallen');
    
    assert.ok(results.length > 0, 'Should find results');
    const deWallen = results.find(
      (r: { name: string; type: string }) => r.name === 'De Wallen' && r.type === 'rld'
    );
    assert.ok(deWallen, 'Should find De Wallen');
  });

  it('finds FKK clubs', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const results = mod.searchAdultIndustryItems('FKK');
    
    assert.ok(results.length > 0, 'Should find FKK clubs');
    const fkkClub = results.find((r: { type: string }) => r.type === 'fkk');
    assert.ok(fkkClub, 'Should find at least one FKK club');
  });

  it('is case insensitive', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    
    const lower = mod.searchAdultIndustryItems('amsterdam');
    const upper = mod.searchAdultIndustryItems('AMSTERDAM');
    const mixed = mod.searchAdultIndustryItems('AmStErDaM');
    
    assert.ok(lower.length > 0, 'Should find with lowercase');
    assert.ok(upper.length > 0, 'Should find with uppercase');
    assert.ok(mixed.length > 0, 'Should find with mixed case');
  });

  it('supports partial matching', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const results = mod.searchAdultIndustryItems('Amster');
    
    assert.ok(results.length > 0, 'Should find with partial query');
    const amsterdam = results.find(
      (r: { name: string }) => r.name.toLowerCase().includes('amsterdam')
    );
    assert.ok(amsterdam, 'Should find Amsterdam with partial match');
  });

  it('respects limit parameter', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    
    const results5 = mod.searchAdultIndustryItems('a', 5);
    const results3 = mod.searchAdultIndustryItems('a', 3);
    
    assert.ok(results5.length <= 5, 'Should respect limit of 5');
    assert.ok(results3.length <= 3, 'Should respect limit of 3');
  });

  it('searches by country', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const results = mod.searchAdultIndustryItems('Germany');
    
    assert.ok(results.length > 0, 'Should find results for Germany');
    const germanItem = results.find(
      (r: { country: string }) => r.country === 'Germany'
    );
    assert.ok(germanItem, 'Should find item from Germany');
  });
});

describe('formatSearchItem', () => {
  it('formats city item correctly', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const item: typeof mod.SearchItem = {
      type: 'city',
      id: 'test',
      name: 'Berlin',
      country: 'Germany',
      coordinates: [13.4, 52.5],
    };
    
    const formatted = mod.formatSearchItem(item);
    assert.ok(formatted.includes('🏙️'), 'Should have city icon');
    assert.ok(formatted.includes('Berlin'), 'Should include name');
  });

  it('formats RLD item with city', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const item: typeof mod.SearchItem = {
      type: 'rld',
      id: 'test',
      name: 'De Wallen',
      city: 'Amsterdam',
      country: 'Netherlands',
      coordinates: [4.9, 52.4],
    };
    
    const formatted = mod.formatSearchItem(item);
    assert.ok(formatted.includes('🔴'), 'Should have RLD icon');
    assert.ok(formatted.includes('De Wallen'), 'Should include name');
    assert.ok(formatted.includes('Amsterdam'), 'Should include city');
  });

  it('formats FKK item with city', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    const item: typeof mod.SearchItem = {
      type: 'fkk',
      id: 'test',
      name: 'FKK World',
      city: 'Frankfurt',
      country: 'Germany',
      coordinates: [8.7, 50.1],
    };
    
    const formatted = mod.formatSearchItem(item);
    assert.ok(formatted.includes('🧖'), 'Should have FKK icon');
    assert.ok(formatted.includes('FKK World'), 'Should include name');
    assert.ok(formatted.includes('Frankfurt'), 'Should include city');
  });
});

describe('SEARCH_TYPE_ICONS', () => {
  it('has icons for all types', async () => {
    const mod = await import('../src/config/variants/adult-industry/search.ts');
    
    assert.ok(mod.SEARCH_TYPE_ICONS.city, 'Should have city icon');
    assert.ok(mod.SEARCH_TYPE_ICONS.rld, 'Should have RLD icon');
    assert.ok(mod.SEARCH_TYPE_ICONS.fkk, 'Should have FKK icon');
  });
});
