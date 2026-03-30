/**
 * Adult Industry Map Legend Tests
 *
 * Validates that adult-industry variant has correct map legend
 * with industry-relevant categories instead of World Monitor categories.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const deckGLMapPath = resolve(__dirname, '../src/components/DeckGLMap.ts');

describe('adult-industry map legend', () => {
  const deckGLMapSrc = readFileSync(deckGLMapPath, 'utf-8');

  it('DeckGLMap.ts imports isAdultIndustryVariant', () => {
    assert.ok(
      deckGLMapSrc.includes('isAdultIndustryVariant'),
      'Should import isAdultIndustryVariant'
    );
  });

  it('Legend has adult-industry specific items', () => {
    // Check for adult-industry legend items
    assert.ok(
      deckGLMapSrc.includes("isAdultIndustryVariant()"),
      'Should check isAdultIndustryVariant() for legend'
    );
    assert.ok(
      deckGLMapSrc.includes("'🏷️ Brands'") || deckGLMapSrc.includes("Brands"),
      'Should have Brands legend item'
    );
    assert.ok(
      deckGLMapSrc.includes("'🛒 Retailers'") || deckGLMapSrc.includes("Retailers"),
      'Should have Retailers legend item'
    );
    assert.ok(
      deckGLMapSrc.includes("'📅 Events'") || deckGLMapSrc.includes("Events"),
      'Should have Events legend item'
    );
    assert.ok(
      deckGLMapSrc.includes("'🏭 Factories'") || deckGLMapSrc.includes("Factories"),
      'Should have Factories legend item'
    );
  });

  it('Legend has regulation score indicators', () => {
    assert.ok(
      deckGLMapSrc.includes("Liberal") || deckGLMapSrc.includes("liberal"),
      'Should have Liberal regulation indicator'
    );
    assert.ok(
      deckGLMapSrc.includes("Moderate") || deckGLMapSrc.includes("moderate"),
      'Should have Moderate regulation indicator'
    );
    assert.ok(
      deckGLMapSrc.includes("Strict") || deckGLMapSrc.includes("strict"),
      'Should have Strict regulation indicator'
    );
  });

  it('Legend does NOT have World Monitor categories for adult-industry', () => {
    // Find the adult-industry legend section
    const adultLegendMatch = deckGLMapSrc.match(/isAdultIndustryVariant\(\)\s*\?\s*\[([\s\S]*?)\]/);
    if (adultLegendMatch) {
      const adultLegendSection = adultLegendMatch[1];
      // These should NOT be in adult-industry legend
      assert.ok(
        !adultLegendSection.includes('highAlert'),
        'Adult legend should NOT have highAlert'
      );
      assert.ok(
        !adultLegendSection.includes('nuclear'),
        'Adult legend should NOT have nuclear'
      );
      assert.ok(
        !adultLegendSection.includes('base'),
        'Adult legend should NOT have military base'
      );
    }
  });
});
