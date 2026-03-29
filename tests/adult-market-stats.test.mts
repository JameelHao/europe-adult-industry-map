/**
 * Adult Industry Market Statistics Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  MARKET_STATS,
  getMarketStats,
  getEUMarketSize,
  getGlobalMarketSize,
  getEUGlobalShare,
  getTopCountries,
  getCountryMarketData,
  getSegment,
  getFastestGrowingSegment,
  getHistoricalGrowth,
  getProjectedMarketSize,
  getHistoricalCAGR,
  getProjectedCAGR,
  formatMarketSize,
  formatPercent,
  getDataFreshness,
  getMarketSummary,
  type MarketStats,
} from '../src/config/variants/adult-industry/data/market-stats.js';

describe('Market Stats Data', () => {
  it('should have valid global market size', () => {
    assert.ok(MARKET_STATS.globalMarketSizeB > 0, 'Should have positive global market size');
    assert.ok(MARKET_STATS.globalMarketSizeB > 20, 'Should be > €20B');
    assert.ok(MARKET_STATS.globalMarketSizeB < 100, 'Should be < €100B');
  });

  it('should have valid EU market size', () => {
    assert.ok(MARKET_STATS.euMarketSizeB > 0, 'Should have positive EU market size');
    assert.ok(MARKET_STATS.euMarketSizeB < MARKET_STATS.globalMarketSizeB, 'EU < Global');
  });

  it('should have valid growth rate', () => {
    assert.ok(typeof MARKET_STATS.yoyGrowthPercent === 'number');
    assert.ok(MARKET_STATS.yoyGrowthPercent > -20 && MARKET_STATS.yoyGrowthPercent < 50);
  });

  it('should have valid ecommerce share', () => {
    assert.ok(MARKET_STATS.ecommerceSharePercent > 0);
    assert.ok(MARKET_STATS.ecommerceSharePercent <= 100);
  });

  it('should have top countries data', () => {
    assert.ok(MARKET_STATS.topCountries.length >= 5, 'Should have at least 5 countries');
    const totalShare = MARKET_STATS.topCountries.reduce((sum, c) => sum + c.sharePercent, 0);
    assert.ok(totalShare >= 95 && totalShare <= 105, 'Total share should be ~100%');
  });

  it('should have segments data', () => {
    assert.ok(MARKET_STATS.segments.length >= 3, 'Should have at least 3 segments');
    const totalSegments = MARKET_STATS.segments.reduce((sum, s) => sum + s.sharePercent, 0);
    assert.ok(totalSegments >= 95 && totalSegments <= 105, 'Total segments should be ~100%');
  });

  it('should have historical data', () => {
    assert.ok(MARKET_STATS.historical.length >= 3, 'Should have at least 3 years');
    // Should be chronologically sorted
    for (let i = 1; i < MARKET_STATS.historical.length; i++) {
      const prev = MARKET_STATS.historical[i - 1];
      const curr = MARKET_STATS.historical[i];
      assert.ok(prev && curr && curr.year > prev.year, 'Should be sorted by year');
    }
  });

  it('should have projections', () => {
    assert.ok(MARKET_STATS.projections.length >= 3, 'Should have at least 3 projection years');
  });

  it('should have data sources', () => {
    assert.ok(MARKET_STATS.sources.length >= 1, 'Should have at least 1 source');
    for (const source of MARKET_STATS.sources) {
      assert.ok(source.name, 'Source should have name');
      assert.ok(source.year > 2020, 'Source year should be recent');
    }
  });

  it('should have last updated date', () => {
    assert.ok(MARKET_STATS.lastUpdated, 'Should have lastUpdated');
    const date = new Date(MARKET_STATS.lastUpdated);
    assert.ok(!Number.isNaN(date.getTime()), 'Should be valid date');
  });
});

describe('getMarketStats', () => {
  it('should return market stats', () => {
    const stats = getMarketStats();
    assert.deepEqual(stats, MARKET_STATS);
  });
});

describe('getEUMarketSize', () => {
  it('should return EU market size', () => {
    const size = getEUMarketSize();
    assert.equal(size, MARKET_STATS.euMarketSizeB);
  });
});

describe('getGlobalMarketSize', () => {
  it('should return global market size', () => {
    const size = getGlobalMarketSize();
    assert.equal(size, MARKET_STATS.globalMarketSizeB);
  });
});

describe('getEUGlobalShare', () => {
  it('should calculate EU share of global market', () => {
    const share = getEUGlobalShare();
    assert.ok(share > 0 && share < 100);
    const expected = (MARKET_STATS.euMarketSizeB / MARKET_STATS.globalMarketSizeB) * 100;
    assert.ok(Math.abs(share - expected) < 0.01);
  });
});

describe('getTopCountries', () => {
  it('should return top 5 countries by default', () => {
    const top = getTopCountries();
    assert.equal(top.length, 5);
    // Should not include "Other EU"
    assert.ok(top.every(c => c.countryCode !== 'EU'));
  });

  it('should return specified number of countries', () => {
    const top3 = getTopCountries(3);
    assert.equal(top3.length, 3);
  });

  it('should be sorted by rank', () => {
    const top = getTopCountries();
    assert.equal(top[0]?.rank, 1);
  });
});

describe('getCountryMarketData', () => {
  it('should find Germany by code', () => {
    const germany = getCountryMarketData('DE');
    assert.ok(germany, 'Should find Germany');
    assert.equal(germany?.country, 'Germany');
  });

  it('should be case insensitive', () => {
    const lower = getCountryMarketData('de');
    const upper = getCountryMarketData('DE');
    assert.deepEqual(lower, upper);
  });

  it('should return undefined for non-existent country', () => {
    const result = getCountryMarketData('XX');
    assert.equal(result, undefined);
  });
});

describe('getSegment', () => {
  it('should find segment by name', () => {
    const segment = getSegment('Vibrators');
    assert.ok(segment, 'Should find vibrators segment');
    assert.ok(segment?.name.includes('Vibrators'));
  });

  it('should be case insensitive', () => {
    const segment = getSegment('lingerie');
    assert.ok(segment, 'Should find lingerie segment');
  });
});

describe('getFastestGrowingSegment', () => {
  it('should return segment with highest growth', () => {
    const fastest = getFastestGrowingSegment();
    assert.ok(fastest.growthPercent, 'Should have growth rate');
    
    for (const segment of MARKET_STATS.segments) {
      assert.ok((fastest.growthPercent ?? 0) >= (segment.growthPercent ?? 0));
    }
  });
});

describe('getHistoricalGrowth', () => {
  it('should return growth for valid year', () => {
    const growth = getHistoricalGrowth(2024);
    assert.ok(typeof growth === 'number');
  });

  it('should return undefined for invalid year', () => {
    const growth = getHistoricalGrowth(1990);
    assert.equal(growth, undefined);
  });
});

describe('getProjectedMarketSize', () => {
  it('should return size for valid projection year', () => {
    const size = getProjectedMarketSize(2030);
    assert.ok(typeof size === 'number');
    assert.ok((size ?? 0) > MARKET_STATS.globalMarketSizeB);
  });

  it('should return undefined for invalid year', () => {
    const size = getProjectedMarketSize(2050);
    assert.equal(size, undefined);
  });
});

describe('getHistoricalCAGR', () => {
  it('should calculate positive CAGR', () => {
    const cagr = getHistoricalCAGR();
    assert.ok(cagr > 0, 'CAGR should be positive for growing market');
    assert.ok(cagr < 50, 'CAGR should be reasonable');
  });
});

describe('getProjectedCAGR', () => {
  it('should calculate positive projected CAGR', () => {
    const cagr = getProjectedCAGR();
    assert.ok(cagr > 0, 'Projected CAGR should be positive');
    assert.ok(cagr < 50, 'Projected CAGR should be reasonable');
  });
});

describe('formatMarketSize', () => {
  it('should format billions correctly', () => {
    assert.equal(formatMarketSize(32.7), '€32.7B');
    assert.equal(formatMarketSize(8.2), '€8.2B');
    assert.equal(formatMarketSize(1.0), '€1.0B');
  });

  it('should format millions correctly', () => {
    assert.equal(formatMarketSize(0.5), '€500M');
    assert.equal(formatMarketSize(0.82), '€820M');
  });
});

describe('formatPercent', () => {
  it('should format positive percentages with +', () => {
    assert.equal(formatPercent(8.3), '+8.3%');
  });

  it('should format negative percentages correctly', () => {
    assert.equal(formatPercent(-2.5), '-2.5%');
  });

  it('should format zero correctly', () => {
    assert.equal(formatPercent(0), '+0.0%');
  });
});

describe('getDataFreshness', () => {
  it('should return valid freshness status', () => {
    const freshness = getDataFreshness();
    assert.ok(['current', 'recent', 'outdated'].includes(freshness));
  });
});

describe('getMarketSummary', () => {
  it('should return complete summary', () => {
    const summary = getMarketSummary();
    assert.ok(summary.globalSize, 'Should have global size');
    assert.ok(summary.euSize, 'Should have EU size');
    assert.ok(summary.growth, 'Should have growth');
    assert.ok(summary.ecommerce, 'Should have ecommerce');
    assert.ok(summary.topCountry, 'Should have top country');
    assert.ok(summary.dataYear, 'Should have data year');
    assert.ok(summary.freshness, 'Should have freshness');
  });

  it('should have formatted values', () => {
    const summary = getMarketSummary();
    assert.ok(summary.globalSize.startsWith('€'), 'Global size should have € symbol');
    assert.ok(summary.growth.includes('%'), 'Growth should have %');
    assert.ok(summary.ecommerce.includes('%'), 'Ecommerce should have %');
  });
});
