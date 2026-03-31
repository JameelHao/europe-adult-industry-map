/**
 * Tests for FR #87: Landing Page Integration
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('LandingPage Component', () => {
  it('exports renderLandingPage function', async () => {
    const mod = await import('../src/components/LandingPage/LandingPage.ts');
    assert.ok(typeof mod.renderLandingPage === 'function');
  });

  it('exports destroyLandingPage function', async () => {
    const mod = await import('../src/components/LandingPage/LandingPage.ts');
    assert.ok(typeof mod.destroyLandingPage === 'function');
  });
});

describe('LandingPage Index', () => {
  it('exports renderLandingPage', async () => {
    const mod = await import('../src/components/LandingPage/index.ts');
    assert.ok(typeof mod.renderLandingPage === 'function');
  });

  it('exports destroyLandingPage', async () => {
    const mod = await import('../src/components/LandingPage/index.ts');
    assert.ok(typeof mod.destroyLandingPage === 'function');
  });
});

describe('Routing Integration', () => {
  it('shouldShowLanding returns boolean', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    const result = mod.shouldShowLanding('');
    assert.ok(typeof result === 'boolean');
  });

  it('shouldShowLanding returns true for empty query', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowLanding(''), true);
  });

  it('shouldShowMap returns true for ?view=map', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?view=map'), true);
  });

  it('shouldShowMap returns true for ?country=germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/routing.ts');
    assert.strictEqual(mod.shouldShowMap('?country=germany'), true);
  });
});

describe('Landing Data Integration', () => {
  it('getHeroConfig returns valid config', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.title, 'Should have title');
    assert.ok(config.subtitle, 'Should have subtitle');
    assert.ok(config.primaryCTA, 'Should have primary CTA');
  });

  it('getRegionData returns 4 regions', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionData();

    assert.strictEqual(regions.length, 4);
  });

  it('getLandingStatistics returns stats', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    assert.ok(Array.isArray(stats));
    assert.ok(stats.length > 0);
  });
});

describe('Country Bounds Integration', () => {
  it('getCountryBoundsByCode returns bounds', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const bounds = mod.getCountryBoundsByCode('germany');

    assert.ok(bounds);
    assert.ok(Array.isArray(bounds));
  });

  it('getCountryZoom returns zoom level', async () => {
    const mod = await import('../src/config/variants/adult-industry/country-bounds.ts');
    const zoom = mod.getCountryZoom('germany');

    assert.ok(typeof zoom === 'number');
    assert.ok(zoom >= 4 && zoom <= 10);
  });
});
