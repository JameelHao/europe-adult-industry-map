/**
 * Tests for FR #63: Red Light District popup with details
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('formatRedLightDistrictPopup', () => {
  it('formats popup with district name and location', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    assert.ok(deWallen, 'Should find De Wallen');

    const popup = mod.formatRedLightDistrictPopup(deWallen);
    assert.ok(popup.includes('De Wallen'), 'Popup should include district name');
    assert.ok(popup.includes('Amsterdam'), 'Popup should include city');
    assert.ok(popup.includes('Netherlands'), 'Popup should include country');
  });

  it('formats popup as HTML with header', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(popup.includes('<div class="popup-header">'), 'Should have popup header');
    assert.ok(popup.includes('<h3>'), 'Should have h3 element');
    assert.ok(popup.includes('🔴'), 'Should have red circle emoji');
  });

  it('shows type with label', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(popup.includes('Type:'), 'Should show type label');
    assert.ok(popup.includes('Window Prostitution'), 'Should show type value');
  });

  it('shows legal status', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(popup.includes('Status:'), 'Should show status label');
    assert.ok(popup.includes('Fully Legal'), 'Should show legal status');
  });

  it('shows description', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(
      popup.includes('red light district'),
      'Should include description text'
    );
  });

  it('shows tips when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(popup.includes('Tips:'), 'Should show tips header');
    assert.ok(popup.includes('<ul>'), 'Should have tips list');
    assert.ok(popup.includes('<li>'), 'Should have list items');
    assert.ok(popup.includes('Do not photograph'), 'Should include tip text');
  });

  it('shows source link', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    const deWallen = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { id: string }) => d.id === 'de-wallen'
    );
    const popup = mod.formatRedLightDistrictPopup(deWallen!);

    assert.ok(popup.includes('More info'), 'Should have more info link');
    assert.ok(popup.includes('target="_blank"'), 'Link should open in new tab');
    assert.ok(popup.includes('eurosexscene.com'), 'Should link to source');
  });

  it('handles district without tips', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    // Find a district without tips
    const districtNoTips = dataMod.RED_LIGHT_DISTRICTS.find(
      (d: { tips?: string[] }) => !d.tips || d.tips.length === 0
    );
    
    if (districtNoTips) {
      const popup = mod.formatRedLightDistrictPopup(districtNoTips);
      // Should still work without crashing
      assert.ok(popup.includes(districtNoTips.name), 'Should show name');
      // Should not have empty tips section
      const hasTipsSection = popup.includes('Tips:');
      assert.ok(!hasTipsSection || !popup.includes('<ul></ul>'), 'Should not have empty tips list');
    }
  });
});

describe('Red Light District popup integration', () => {
  it('formatRedLightDistrictPopup is exported from layer', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/red-light-districts-layer.ts'
    );
    assert.ok(typeof mod.formatRedLightDistrictPopup === 'function');
  });

  it('formatRedLightDistrictPopup is exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.formatRedLightDistrictPopup === 'function');
  });

  it('RED_LIGHT_DISTRICTS has required fields for popup', async () => {
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/red-light-districts.ts'
    );

    for (const district of dataMod.RED_LIGHT_DISTRICTS) {
      assert.ok(district.name, `District should have name`);
      assert.ok(district.city, `District ${district.name} should have city`);
      assert.ok(district.country, `District ${district.name} should have country`);
      assert.ok(district.type, `District ${district.name} should have type`);
      assert.ok(district.legalStatus, `District ${district.name} should have legalStatus`);
      assert.ok(district.description, `District ${district.name} should have description`);
    }
  });
});
