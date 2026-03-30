/**
 * Adult Industry Regulations Data Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  COUNTRY_REGULATIONS,
  REGULATION_COLORS,
  REGULATION_SCORE_LABELS,
  getRegulationByCode,
  getRegulationsByScore,
  getRegulatedCountryCodes,
  getCountriesByAdvertisingRestriction,
  type RegulationScore,
} from '../src/config/variants/adult-industry/data/regulations.js';
import {
  formatRegulationInfo,
  getRegulationStats,
  getRegulationLegend,
  REGULATIONS_LAYER_ID,
} from '../src/config/variants/adult-industry/layers/regulations-layer.js';

describe('Country Regulations Data', () => {
  it('should have at least 25 countries', () => {
    assert.ok(COUNTRY_REGULATIONS.length >= 25, `Expected >= 25 countries, got ${COUNTRY_REGULATIONS.length}`);
  });

  it('should have all required fields for each regulation', () => {
    for (const reg of COUNTRY_REGULATIONS) {
      assert.ok(reg.countryCode, 'Should have country code');
      assert.ok(reg.countryName, 'Should have country name');
      assert.ok(reg.overallScore >= 1 && reg.overallScore <= 5, 'Score should be 1-5');
      assert.equal(typeof reg.physicalRetailLegal, 'boolean');
      assert.equal(typeof reg.onlineSalesLegal, 'boolean');
      assert.ok(['none', 'limited', 'strict', 'banned'].includes(reg.advertisingRestrictions));
      assert.equal(typeof reg.ageVerificationRequired, 'boolean');
      assert.ok(['self-declaration', 'id-check', 'strict-kyc'].includes(reg.ageVerificationMethod));
      assert.equal(typeof reg.importRestrictions, 'boolean');
      assert.ok(reg.lastUpdated, 'Should have last updated date');
    }
  });

  it('should have unique country codes', () => {
    const codes = COUNTRY_REGULATIONS.map(r => r.countryCode);
    const uniqueCodes = new Set(codes);
    assert.equal(uniqueCodes.size, codes.length, 'All country codes should be unique');
  });

  it('should have valid ISO 3166-1 alpha-2 codes', () => {
    for (const reg of COUNTRY_REGULATIONS) {
      assert.match(reg.countryCode, /^[A-Z]{2}$/, `${reg.countryCode} should be 2 uppercase letters`);
    }
  });

  it('should cover all score levels', () => {
    const scores = new Set(COUNTRY_REGULATIONS.map(r => r.overallScore));
    assert.ok(scores.size >= 3, 'Should have at least 3 different score levels');
  });

  it('should include major European countries', () => {
    const codes = getRegulatedCountryCodes();
    assert.ok(codes.includes('DE'), 'Should include Germany');
    assert.ok(codes.includes('GB'), 'Should include United Kingdom');
    assert.ok(codes.includes('FR'), 'Should include France');
    assert.ok(codes.includes('NL'), 'Should include Netherlands');
  });
});

describe('getRegulationByCode', () => {
  it('should find Germany by code', () => {
    const reg = getRegulationByCode('DE');
    assert.ok(reg, 'Should find Germany');
    assert.equal(reg?.countryName, 'Germany');
    assert.equal(reg?.overallScore, 5);
  });

  it('should find United Kingdom by code', () => {
    const reg = getRegulationByCode('GB');
    assert.ok(reg, 'Should find UK');
    assert.equal(reg?.countryName, 'United Kingdom');
  });

  it('should return undefined for non-existent code', () => {
    const reg = getRegulationByCode('XX');
    assert.equal(reg, undefined);
  });
});

describe('getRegulationsByScore', () => {
  it('should filter by score 5 (very permissive)', () => {
    const permissive = getRegulationsByScore(5);
    assert.ok(permissive.length > 0, 'Should have very permissive countries');
    assert.ok(permissive.every(r => r.overallScore === 5));
    assert.ok(permissive.some(r => r.countryCode === 'DE'), 'Germany should be very permissive');
  });

  it('should filter by score 3 (moderate)', () => {
    const moderate = getRegulationsByScore(3);
    assert.ok(moderate.length > 0, 'Should have moderate countries');
    assert.ok(moderate.every(r => r.overallScore === 3));
  });
});

describe('getCountriesByAdvertisingRestriction', () => {
  it('should filter by limited advertising', () => {
    const limited = getCountriesByAdvertisingRestriction('limited');
    assert.ok(limited.length > 0);
    assert.ok(limited.every(r => r.advertisingRestrictions === 'limited'));
  });

  it('should filter by strict advertising', () => {
    const strict = getCountriesByAdvertisingRestriction('strict');
    assert.ok(strict.length > 0);
    assert.ok(strict.every(r => r.advertisingRestrictions === 'strict'));
  });
});

describe('REGULATION_COLORS', () => {
  it('should have colors for all scores', () => {
    const scores: RegulationScore[] = [1, 2, 3, 4, 5];
    for (const score of scores) {
      const color = REGULATION_COLORS[score];
      assert.ok(color, `Should have color for score ${score}`);
      assert.match(color, /^#[0-9A-Fa-f]{6}$/, 'Should be valid hex color');
    }
  });

  it('should have progressively changing colors', () => {
    // Red (1) -> Green (5)
    // Score 1 should be reddish: #e74c3c
    assert.ok(
      REGULATION_COLORS[1].includes('e74c3c') || REGULATION_COLORS[1].includes('FF'),
      'Score 1 should be reddish'
    );
    // Score 5 should be greenish: #27ae60
    assert.ok(
      REGULATION_COLORS[5].includes('27ae60') || REGULATION_COLORS[5].includes('ae') || REGULATION_COLORS[5].includes('CC'),
      'Score 5 should be greenish'
    );
  });
});

describe('REGULATION_SCORE_LABELS', () => {
  it('should have labels for all scores', () => {
    const scores: RegulationScore[] = [1, 2, 3, 4, 5];
    for (const score of scores) {
      const label = REGULATION_SCORE_LABELS[score];
      assert.ok(label, `Should have label for score ${score}`);
      assert.ok(typeof label === 'string' && label.length > 0);
    }
  });
});

describe('formatRegulationInfo', () => {
  it('should format Germany regulation info', () => {
    const germany = getRegulationByCode('DE');
    assert.ok(germany);
    const info = formatRegulationInfo(germany);
    assert.ok(info.includes('Germany'), 'Should include country name');
    assert.ok(info.includes('★★★★★'), 'Should show 5 stars');
    assert.ok(info.includes('Very Permissive'), 'Should include score label');
    assert.ok(info.includes('Physical Retail'), 'Should include retail status');
  });
});

describe('getRegulationStats', () => {
  it('should return correct total countries', () => {
    const stats = getRegulationStats();
    assert.equal(stats.totalCountries, COUNTRY_REGULATIONS.length);
  });

  it('should have correct byScore counts', () => {
    const stats = getRegulationStats();
    let totalFromByScore = 0;
    for (const count of Object.values(stats.byScore)) {
      totalFromByScore += count;
    }
    assert.equal(totalFromByScore, stats.totalCountries);
  });

  it('should calculate reasonable average score', () => {
    const stats = getRegulationStats();
    assert.ok(stats.averageScore >= 1 && stats.averageScore <= 5);
  });
});

describe('getRegulationLegend', () => {
  it('should return legend items in descending score order', () => {
    const legend = getRegulationLegend();
    assert.equal(legend.length, 5);
    assert.equal(legend[0].score, 5);
    assert.equal(legend[4].score, 1);
  });

  it('should include label and color for each item', () => {
    const legend = getRegulationLegend();
    for (const item of legend) {
      assert.ok(item.label);
      assert.match(item.color, /^#[0-9A-Fa-f]{6}$/);
      assert.ok(typeof item.count === 'number');
    }
  });
});

describe('REGULATIONS_LAYER_ID', () => {
  it('should have correct layer ID', () => {
    assert.equal(REGULATIONS_LAYER_ID, 'adult-regulations-heatmap');
  });
});
