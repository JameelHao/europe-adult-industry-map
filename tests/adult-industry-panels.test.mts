/**
 * Adult Industry Variant Panel Configuration Tests
 * 
 * Validates that adult-industry variant:
 * 1. Has correct panels configured
 * 2. Does NOT include World Monitor panels (webcams, iran-attacks, etc.)
 * 3. Has correct map layers enabled
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const adultIndustrySrc = readFileSync(resolve(__dirname, '../src/config/variants/adult-industry.ts'), 'utf-8');
const panelsSrc = readFileSync(resolve(__dirname, '../src/config/panels.ts'), 'utf-8');

describe('adult-industry variant panel configuration', () => {
  it('adult-industry variant DEFAULT_PANELS includes required panels', () => {
    // Look for DEFAULT_PANELS content directly
    // Must have these panels
    assert.ok(
      adultIndustrySrc.includes("map: { name: 'Europe Map'"),
      'must have map panel'
    );
    assert.ok(
      adultIndustrySrc.includes("'live-news': { name: 'Industry Headlines'") || 
      adultIndustrySrc.includes("industryNews: { name: 'Industry News'"),
      'must have news panel'
    );
    assert.ok(
      adultIndustrySrc.includes("events: { name: 'Events"),
      'must have events panel'
    );
  });

  it('adult-industry variant does NOT include World Monitor panels', () => {
    // Parse DEFAULT_PANELS from adult-industry.ts
    const panelMatch = adultIndustrySrc.match(/export const DEFAULT_PANELS[^{]*{([^}]+)}/s);
    assert.ok(panelMatch, 'DEFAULT_PANELS should be defined');
    
    const panelBlock = panelMatch[1];
    
    // These World Monitor panels must NOT be present
    const forbiddenPanels = [
      'live-webcams',
      'iran-attacks',
      'intelligence',
      'strategic-posture',
      'cii',
    ];
    
    for (const panel of forbiddenPanels) {
      assert.ok(
        !panelBlock.includes(`'${panel}':`),
        `World Monitor panel "${panel}" should not be in adult-industry variant`
      );
    }
  });

  it('adult-industry map layers enable adult-industry layers by default', () => {
    // Check DEFAULT_MAP_LAYERS in adult-industry.ts
    const layersMatch = adultIndustrySrc.match(/adultBrands:\s*(true|false)/);
    assert.ok(layersMatch, 'adultBrands should be defined in DEFAULT_MAP_LAYERS');
    assert.strictEqual(layersMatch[1], 'true', 'adultBrands should be true');
    
    assert.ok(adultIndustrySrc.includes('adultRetailers: true'), 'adultRetailers should be true');
    assert.ok(adultIndustrySrc.includes('adultEvents: true'), 'adultEvents should be true');
    assert.ok(adultIndustrySrc.includes('adultFactories: true'), 'adultFactories should be true');
    assert.ok(adultIndustrySrc.includes('adultRegulations: true'), 'adultRegulations should be true');
  });

  it('adult-industry map layers disable World Monitor layers', () => {
    // Check that World Monitor layers are disabled
    assert.ok(adultIndustrySrc.includes('iranAttacks: false'), 'iranAttacks should be false');
    assert.ok(adultIndustrySrc.includes('conflicts: false'), 'conflicts should be false');
    assert.ok(adultIndustrySrc.includes('bases: false'), 'bases should be false');
    assert.ok(adultIndustrySrc.includes('nuclear: false'), 'nuclear should be false');
    assert.ok(adultIndustrySrc.includes('military: false'), 'military should be false');
  });

  it('panels.ts includes adult-industry variant in DEFAULT_PANELS selection', () => {
    // Check that panels.ts handles adult-industry variant
    assert.ok(
      panelsSrc.includes("SITE_VARIANT === 'adult-industry'"),
      'panels.ts should check for adult-industry variant'
    );
    assert.ok(
      panelsSrc.includes('ADULT_INDUSTRY_VARIANT_CONFIG'),
      'panels.ts should use ADULT_INDUSTRY_VARIANT_CONFIG'
    );
  });

  it('VARIANT_CONFIG exports all required fields', () => {
    // Check VARIANT_CONFIG structure
    assert.ok(adultIndustrySrc.includes('export const VARIANT_CONFIG'), 'VARIANT_CONFIG should be exported');
    assert.ok(adultIndustrySrc.includes('panels: DEFAULT_PANELS'), 'VARIANT_CONFIG should include panels');
    assert.ok(adultIndustrySrc.includes('mapLayers: DEFAULT_MAP_LAYERS'), 'VARIANT_CONFIG should include mapLayers');
    assert.ok(adultIndustrySrc.includes('mobileMapLayers:'), 'VARIANT_CONFIG should include mobileMapLayers');
  });
});

describe('adult-industry variant market ticker', () => {
  const appSrc = readFileSync(resolve(__dirname, '../src/App.ts'), 'utf-8');
  const panelLayoutSrc = readFileSync(resolve(__dirname, '../src/app/panel-layout.ts'), 'utf-8');

  it('App.ts skips market ticker for adult-industry variant', () => {
    // Should check isAdultIndustryVariant() before creating ticker
    assert.ok(
      appSrc.includes('!isAdultIndustryVariant()'),
      'App.ts should check isAdultIndustryVariant() before creating market ticker'
    );
  });

  it('panel-layout.ts hides market ticker container for adult-industry variant', () => {
    // Should not render market ticker container for adult-industry
    assert.ok(
      panelLayoutSrc.includes('!isAdultIndustryVariant()'),
      'panel-layout.ts should check isAdultIndustryVariant() for market ticker container'
    );
  });

  it('isAdultIndustryVariant is imported in App.ts', () => {
    assert.ok(
      appSrc.includes('isAdultIndustryVariant'),
      'App.ts should import isAdultIndustryVariant'
    );
  });

  it('isAdultIndustryVariant is imported in panel-layout.ts', () => {
    assert.ok(
      panelLayoutSrc.includes('isAdultIndustryVariant'),
      'panel-layout.ts should import isAdultIndustryVariant'
    );
  });
});
