/**
 * Tests for FR #95: Venue Cards
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('VenueCard exports', () => {
  it('exports createVenueCard', async () => {
    const mod = await import('../src/components/VenueCard/index.ts');
    assert.ok(typeof mod.createVenueCard === 'function');
  });

  it('exports createVenueGrid', async () => {
    const mod = await import('../src/components/VenueCard/index.ts');
    assert.ok(typeof mod.createVenueGrid === 'function');
  });

  it('exports getPriceDescription', async () => {
    const mod = await import('../src/components/VenueCard/index.ts');
    assert.ok(typeof mod.getPriceDescription === 'function');
  });

  it('exports getStatusIcon', async () => {
    const mod = await import('../src/components/VenueCard/index.ts');
    assert.ok(typeof mod.getStatusIcon === 'function');
  });

  it('exports buildGoogleMapsUrl', async () => {
    const mod = await import('../src/components/VenueCard/index.ts');
    assert.ok(typeof mod.buildGoogleMapsUrl === 'function');
  });
});

describe('getPriceDescription', () => {
  it('returns description for €', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    const desc = mod.getPriceDescription('€');
    assert.ok(desc.includes('Budget'));
    assert.ok(desc.includes('10-30'));
  });

  it('returns description for €€', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    const desc = mod.getPriceDescription('€€');
    assert.ok(desc.includes('Moderate'));
    assert.ok(desc.includes('30-60'));
  });

  it('returns description for €€€', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    const desc = mod.getPriceDescription('€€€');
    assert.ok(desc.includes('Upscale'));
    assert.ok(desc.includes('60-100'));
  });

  it('returns description for €€€€', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    const desc = mod.getPriceDescription('€€€€');
    assert.ok(desc.includes('Luxury'));
    assert.ok(desc.includes('100+'));
  });

  it('returns empty string for unknown', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    assert.strictEqual(mod.getPriceDescription('$$$'), '');
  });
});

describe('getStatusIcon', () => {
  it('returns ✅ for Active', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    assert.strictEqual(mod.getStatusIcon('Active'), '✅');
  });

  it('returns ❌ for Closed', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    assert.strictEqual(mod.getStatusIcon('Closed'), '❌');
  });

  it('returns ⚠️ for Restricted', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    assert.strictEqual(mod.getStatusIcon('Restricted'), '⚠️');
  });

  it('returns empty string for unknown', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    assert.strictEqual(mod.getStatusIcon('Unknown'), '');
  });
});

describe('buildGoogleMapsUrl', () => {
  it('builds correct URL from coordinates', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    // coords are [longitude, latitude]
    const url = mod.buildGoogleMapsUrl([4.8979, 52.3731]);

    assert.ok(url.includes('google.com/maps'));
    assert.ok(url.includes('52.3731'));
    assert.ok(url.includes('4.8979'));
  });

  it('swaps lon/lat correctly for Google Maps (lat,lng format)', async () => {
    const mod = await import('../src/components/VenueCard/VenueCard.ts');
    // Input: [lon, lat], Output should have lat first
    const url = mod.buildGoogleMapsUrl([10.0, 50.0]);

    // The URL should have query=50.0,10.0 (lat,lng)
    assert.ok(url.includes('query=50,10'));
  });
});

describe('CSS file exists', () => {
  it('venue-card.css is importable', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const exists = fs.existsSync(cssPath);
    assert.ok(exists, 'venue-card.css should exist');
  });

  it('contains venue-card class', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.venue-card'), 'Should have .venue-card class');
  });

  it('contains venue-grid class', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.venue-grid'), 'Should have .venue-grid class');
  });

  it('contains status classes', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.venue-status.active'), 'Should have .venue-status.active');
    assert.ok(content.includes('.venue-status.closed'), 'Should have .venue-status.closed');
    assert.ok(content.includes('.venue-status.restricted'), 'Should have .venue-status.restricted');
  });

  it('contains hover effects', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('.venue-card:hover'), 'Should have hover effect');
    assert.ok(content.includes('transform'), 'Should use transform');
  });

  it('contains responsive styles', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const cssPath = path.resolve('./src/styles/venue-card.css');
    const content = fs.readFileSync(cssPath, 'utf-8');
    assert.ok(content.includes('@media'), 'Should have media queries');
    assert.ok(content.includes('768px'), 'Should have tablet breakpoint');
  });
});

describe('main.ts imports venue-card.css', () => {
  it('main.ts includes venue-card.css import', async () => {
    const fs = await import('node:fs');
    const path = await import('node:path');
    const mainPath = path.resolve('./src/main.ts');
    const content = fs.readFileSync(mainPath, 'utf-8');
    assert.ok(content.includes('venue-card.css'), 'main.ts should import venue-card.css');
  });
});
