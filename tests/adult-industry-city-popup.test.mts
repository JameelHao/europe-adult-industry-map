/**
 * Tests for FR #62: City popup with detailed information
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('formatCityPopup', () => {
  it('formats popup with city name and country', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    const amsterdam = dataMod.CITIES.find((c: { id: string }) => c.id === 'amsterdam');
    assert.ok(amsterdam, 'Should find Amsterdam');

    const popup = mod.formatCityPopup(amsterdam);
    assert.ok(popup.includes('Amsterdam'), 'Popup should include city name');
    assert.ok(popup.includes('Netherlands'), 'Popup should include country');
  });

  it('formats popup as HTML with header', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    const amsterdam = dataMod.CITIES.find((c: { id: string }) => c.id === 'amsterdam');
    const popup = mod.formatCityPopup(amsterdam!);
    
    assert.ok(popup.includes('<div class="popup-header">'), 'Should have popup header');
    assert.ok(popup.includes('<h3>'), 'Should have h3 element');
    assert.ok(popup.includes('</div>'), 'Should have closing div');
  });

  it('shows red light district badge when applicable', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    // Amsterdam has red light district
    const amsterdam = dataMod.CITIES.find((c: { id: string }) => c.id === 'amsterdam');
    const popup = mod.formatCityPopup(amsterdam!);
    assert.ok(
      popup.includes('Has Red Light District'),
      'Amsterdam popup should show red light district badge'
    );
  });

  it('lists available services with icons', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    const amsterdam = dataMod.CITIES.find((c: { id: string }) => c.id === 'amsterdam');
    const popup = mod.formatCityPopup(amsterdam!);
    
    assert.ok(popup.includes('Services Available'), 'Should show services header');
    assert.ok(popup.includes('city-service'), 'Should have service spans');
    assert.ok(popup.includes('✅'), 'Should have checkmark icons');
  });

  it('includes guide link', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    const amsterdam = dataMod.CITIES.find((c: { id: string }) => c.id === 'amsterdam');
    const popup = mod.formatCityPopup(amsterdam!);
    
    assert.ok(popup.includes('View Full Guide'), 'Should have guide link text');
    assert.ok(popup.includes('target="_blank"'), 'Link should open in new tab');
    assert.ok(popup.includes('eurosexscene.com'), 'Should link to eurosexscene');
  });

  it('formats popup for city without red light district', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    const dataMod = await import(
      '../src/config/variants/adult-industry/data/cities.ts'
    );

    // Find a city without red light district
    const cityWithoutRLD = dataMod.CITIES.find(
      (c: { hasRedLightDistrict: boolean }) => !c.hasRedLightDistrict
    );
    assert.ok(cityWithoutRLD, 'Should find city without RLD');
    
    const popup = mod.formatCityPopup(cityWithoutRLD);
    assert.ok(!popup.includes('Has Red Light District'), 'Should not show RLD badge');
    assert.ok(popup.includes(cityWithoutRLD.name), 'Should still show city name');
  });
});

describe('city popup integration', () => {
  it('formatCityPopup is exported from cities-layer', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/cities-layer.ts'
    );
    assert.ok(typeof mod.formatCityPopup === 'function');
  });

  it('formatCityPopup is exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.formatCityPopup === 'function');
  });
});
