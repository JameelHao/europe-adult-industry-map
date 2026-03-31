/**
 * Tests for FR #88: Country Guide button in map header
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Country Guide Button Config', () => {
  it('getCountryGuideButton returns config', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.ok(btn.text, 'Should have text');
    assert.ok(btn.icon, 'Should have icon');
    assert.ok(btn.href, 'Should have href');
  });

  it('button text is Country Guide', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.text, 'Country Guide');
  });

  it('button icon is globe emoji', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.icon, '🌍');
  });

  it('button href links to landing', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.ok(btn.href.includes('landing'), 'Should link to landing page');
  });

  it('iconOnlyOnMobile is true', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.iconOnlyOnMobile, true);
  });
});

// Note: isAdultIndustryVariant requires Vite env, skipped in node:test

describe('Header Nav Config', () => {
  it('getHeaderNavConfig includes countryGuide', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeaderNavConfig();

    assert.ok(config.countryGuide, 'Should have countryGuide');
    assert.strictEqual(config.countryGuide.text, 'Country Guide');
  });

  it('getHeaderNavConfig includes viewMap', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeaderNavConfig();

    assert.ok(config.viewMap, 'Should have viewMap');
    assert.ok(config.viewMap.href.includes('map'), 'Should link to map');
  });
});
