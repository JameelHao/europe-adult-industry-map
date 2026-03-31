/**
 * Tests for FR #67: FKK Club popup with details
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('formatFKKClubPopup', () => {
  it('formats popup with club name and location', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const club = dataMod.FKK_CLUBS[0];
    const popup = mod.formatFKKClubPopup(club);

    assert.ok(popup.includes(club.name), 'Popup should include club name');
    assert.ok(popup.includes(club.city), 'Popup should include city');
    assert.ok(popup.includes(club.country), 'Popup should include country');
  });

  it('formats popup as HTML with header', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const club = dataMod.FKK_CLUBS[0];
    const popup = mod.formatFKKClubPopup(club);

    assert.ok(popup.includes('<div class="popup-header">'), 'Should have popup header');
    assert.ok(popup.includes('<h3>'), 'Should have h3 element');
    assert.ok(popup.includes('🧖'), 'Should have FKK emoji');
  });

  it('shows price range', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const club = dataMod.FKK_CLUBS[0];
    const popup = mod.formatFKKClubPopup(club);

    assert.ok(popup.includes('Price:'), 'Should show price label');
    assert.ok(popup.includes(club.priceRange), 'Should show price range');
  });

  it('shows rating with stars when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const clubWithRating = dataMod.FKK_CLUBS.find(
      (c: { rating?: number }) => c.rating !== undefined
    );

    if (clubWithRating) {
      const popup = mod.formatFKKClubPopup(clubWithRating);
      assert.ok(popup.includes('Rating:'), 'Should show rating label');
      assert.ok(popup.includes('⭐'), 'Should show star emoji');
    }
  });

  it('shows features when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const clubWithFeatures = dataMod.FKK_CLUBS.find(
      (c: { features?: string[] }) => c.features && c.features.length > 0
    );

    if (clubWithFeatures) {
      const popup = mod.formatFKKClubPopup(clubWithFeatures);
      assert.ok(popup.includes('Features:'), 'Should show features label');
    }
  });

  it('shows website link when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const clubWithWebsite = dataMod.FKK_CLUBS.find(
      (c: { website?: string }) => c.website !== undefined
    );

    if (clubWithWebsite) {
      const popup = mod.formatFKKClubPopup(clubWithWebsite);
      assert.ok(popup.includes('Visit Website'), 'Should show website link');
      assert.ok(popup.includes('target="_blank"'), 'Link should open in new tab');
      assert.ok(popup.includes(clubWithWebsite.website!), 'Should include website URL');
    }
  });

  it('shows description when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const clubWithDesc = dataMod.FKK_CLUBS.find(
      (c: { description?: string }) => c.description !== undefined
    );

    if (clubWithDesc) {
      const popup = mod.formatFKKClubPopup(clubWithDesc);
      assert.ok(popup.includes(clubWithDesc.description!), 'Should include description');
    }
  });

  it('shows open hours when available', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    const clubWithHours = dataMod.FKK_CLUBS.find(
      (c: { openHours?: string }) => c.openHours !== undefined
    );

    if (clubWithHours) {
      const popup = mod.formatFKKClubPopup(clubWithHours);
      assert.ok(popup.includes('Hours:'), 'Should show hours label');
      assert.ok(popup.includes(clubWithHours.openHours!), 'Should include hours');
    }
  });
});

describe('FKK Club popup integration', () => {
  it('formatFKKClubPopup is exported from layer', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    assert.ok(typeof mod.formatFKKClubPopup === 'function');
  });

  it('formatFKKClubPopup is exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.formatFKKClubPopup === 'function');
  });

  it('FKK_CLUBS has required fields for popup', async () => {
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    for (const club of dataMod.FKK_CLUBS) {
      assert.ok(club.name, `Club should have name`);
      assert.ok(club.city, `Club ${club.name} should have city`);
      assert.ok(club.country, `Club ${club.name} should have country`);
      assert.ok(club.priceRange, `Club ${club.name} should have priceRange`);
    }
  });

  it('all FKK clubs can be formatted without error', async () => {
    const mod = await import(
      '../src/config/variants/adult-industry/layers/fkk-clubs-layer.ts'
    );
    const dataMod = await import('../src/config/variants/adult-industry/data/fkk-clubs.ts');

    for (const club of dataMod.FKK_CLUBS) {
      const popup = mod.formatFKKClubPopup(club);
      assert.ok(typeof popup === 'string', `Should return string for ${club.name}`);
      assert.ok(popup.length > 0, `Should not be empty for ${club.name}`);
    }
  });
});
