/**
 * Tests for FR #75: Landing Page hero section configuration
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Landing Page Functions', () => {
  it('exports getHeroConfig function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getHeroConfig === 'function');
  });

  it('exports getLandingStatistics function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getLandingStatistics === 'function');
  });

  it('exports getRegionSummaries function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getRegionSummaries === 'function');
  });

  it('exports getFeaturedCountries function', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(typeof mod.getFeaturedCountries === 'function');
  });

  it('functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.getHeroConfig === 'function');
    assert.ok(typeof mod.getLandingStatistics === 'function');
  });
});

describe('getHeroConfig', () => {
  it('returns hero configuration', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config, 'Should return config');
    assert.ok(typeof config === 'object', 'Should be object');
  });

  it('has title', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.title, 'Should have title');
    assert.ok(config.title.includes('ADULT INDUSTRY'), 'Title should mention adult industry');
  });

  it('has subtitle with country count', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.subtitle, 'Should have subtitle');
    assert.ok(config.subtitle.includes('European'), 'Subtitle should mention European');
  });

  it('has primary CTA', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.primaryCTA, 'Should have primary CTA');
    assert.ok(config.primaryCTA.text, 'CTA should have text');
    assert.ok(config.primaryCTA.icon, 'CTA should have icon');
    assert.strictEqual(config.primaryCTA.variant, 'primary', 'Should be primary variant');
  });

  it('has secondary CTA', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.secondaryCTA, 'Should have secondary CTA');
    assert.strictEqual(config.secondaryCTA.variant, 'secondary', 'Should be secondary variant');
  });

  it('has background gradient', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeroConfig();

    assert.ok(config.backgroundGradient, 'Should have gradient');
    assert.ok(Array.isArray(config.backgroundGradient), 'Should be array');
    assert.strictEqual(config.backgroundGradient.length, 2, 'Should have 2 colors');
  });
});

describe('getLandingStatistics', () => {
  it('returns array of statistics', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    assert.ok(Array.isArray(stats), 'Should return array');
    assert.ok(stats.length > 0, 'Should have statistics');
  });

  it('statistics have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    for (const stat of stats) {
      assert.ok(stat.value, 'Should have value');
      assert.ok(stat.label, 'Should have label');
      assert.ok(stat.icon, 'Should have icon');
    }
  });

  it('includes countries statistic', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    const countryStat = stats.find((s: { label: string }) => s.label === 'Countries');
    assert.ok(countryStat, 'Should have countries statistic');
    assert.ok(parseInt(countryStat.value) > 0, 'Should have positive count');
  });

  it('includes cities statistic', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const stats = mod.getLandingStatistics();

    const cityStat = stats.find((s: { label: string }) => s.label === 'Cities');
    assert.ok(cityStat, 'Should have cities statistic');
  });
});

describe('getRegionSummaries', () => {
  it('returns array of region summaries', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    assert.ok(Array.isArray(regions), 'Should return array');
    assert.ok(regions.length > 0, 'Should have regions');
  });

  it('summaries have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    for (const region of regions) {
      assert.ok(region.name, 'Should have name');
      assert.ok(typeof region.countries === 'number', 'Should have country count');
      assert.ok(typeof region.cities === 'number', 'Should have city count');
      assert.ok(region.description, 'Should have description');
    }
  });

  it('includes Western Europe', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const regions = mod.getRegionSummaries();

    const western = regions.find((r: { name: string }) => r.name === 'Western Europe');
    assert.ok(western, 'Should have Western Europe');
    assert.ok(western.countries > 0, 'Should have countries');
  });
});

describe('getFeaturedCountries', () => {
  it('returns array of country names', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    assert.ok(Array.isArray(countries), 'Should return array');
    assert.ok(countries.length > 0, 'Should have countries');
  });

  it('returns up to 6 countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    assert.ok(countries.length <= 6, 'Should return at most 6 countries');
  });

  it('returns strings', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getFeaturedCountries();

    for (const country of countries) {
      assert.ok(typeof country === 'string', 'Should be string');
      assert.ok(country.length > 0, 'Should not be empty');
    }
  });
});

// ============================================================================
// Country Card Tests (FR #76)
// ============================================================================

describe('SCORE_LABELS', () => {
  it('has labels for all scores 1-5', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');

    assert.ok(mod.SCORE_LABELS[1], 'Should have label for 1');
    assert.ok(mod.SCORE_LABELS[2], 'Should have label for 2');
    assert.ok(mod.SCORE_LABELS[3], 'Should have label for 3');
    assert.ok(mod.SCORE_LABELS[4], 'Should have label for 4');
    assert.ok(mod.SCORE_LABELS[5], 'Should have label for 5');
  });

  it('score 5 is Very Permissive', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.SCORE_LABELS[5], 'Very Permissive');
  });

  it('score 1 is Very Restrictive', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.SCORE_LABELS[1], 'Very Restrictive');
  });
});

describe('FLAG_EMOJIS', () => {
  it('has flag for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_EMOJIS['DE'], '🇩🇪');
  });

  it('has flag for Netherlands', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_EMOJIS['NL'], '🇳🇱');
  });

  it('has multiple flags', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.ok(Object.keys(mod.FLAG_EMOJIS).length >= 20, 'Should have many flags');
  });
});

describe('getCountryCards', () => {
  it('returns array of country cards', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    assert.ok(Array.isArray(cards), 'Should return array');
    assert.ok(cards.length > 0, 'Should have cards');
  });

  it('cards have required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    for (const card of cards.slice(0, 5)) {
      assert.ok(card.countryCode, 'Should have countryCode');
      assert.ok(card.countryName, 'Should have countryName');
      assert.ok(card.score >= 1 && card.score <= 5, 'Score should be 1-5');
      assert.ok(card.scoreLabel, 'Should have scoreLabel');
      assert.ok(typeof card.hasRedLightDistricts === 'boolean', 'Should have hasRedLightDistricts');
      assert.ok(typeof card.hasFKKClubs === 'boolean', 'Should have hasFKKClubs');
      assert.ok(typeof card.cityCount === 'number', 'Should have cityCount');
      assert.ok(card.flagEmoji, 'Should have flagEmoji');
    }
  });

  it('scoreLabel matches score', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCards();

    for (const card of cards) {
      assert.strictEqual(
        card.scoreLabel,
        mod.SCORE_LABELS[card.score],
        `${card.countryName} scoreLabel should match`
      );
    }
  });
});

describe('getCountryCardsSortedByScore', () => {
  it('returns cards sorted by score descending', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsSortedByScore();

    for (let i = 1; i < cards.length; i++) {
      assert.ok(
        cards[i - 1].score >= cards[i].score,
        'Should be in descending order'
      );
    }
  });
});

describe('getCountryCardsSortedByName', () => {
  it('returns cards sorted by name', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsSortedByName();

    for (let i = 1; i < cards.length; i++) {
      assert.ok(
        cards[i - 1].countryName.localeCompare(cards[i].countryName) <= 0,
        'Should be in alphabetical order'
      );
    }
  });
});

describe('getCountryCardsWithFeatures', () => {
  it('filters by hasRedLightDistricts', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsWithFeatures({ hasRedLightDistricts: true });

    for (const card of cards) {
      assert.strictEqual(card.hasRedLightDistricts, true, 'Should have RLD');
    }
  });

  it('filters by hasFKKClubs', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const cards = mod.getCountryCardsWithFeatures({ hasFKKClubs: true });

    for (const card of cards) {
      assert.strictEqual(card.hasFKKClubs, true, 'Should have FKK');
    }
  });

  it('returns all when no filter', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const all = mod.getCountryCards();
    const filtered = mod.getCountryCardsWithFeatures({});

    assert.strictEqual(filtered.length, all.length, 'Should return all');
  });
});

// ============================================================================
// Region Sections Tests (FR #78)
// ============================================================================

describe('REGION_DEFINITIONS', () => {
  it('has 4 regions', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.REGION_DEFINITIONS.length, 4);
  });

  it('has north region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const north = mod.REGION_DEFINITIONS.find((r) => r.key === 'north');
    assert.ok(north, 'Should have north region');
    assert.strictEqual(north.title, 'North Europe');
  });

  it('has west region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const west = mod.REGION_DEFINITIONS.find((r) => r.key === 'west');
    assert.ok(west, 'Should have west region');
    assert.strictEqual(west.title, 'West Europe');
  });

  it('has south region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const south = mod.REGION_DEFINITIONS.find((r) => r.key === 'south');
    assert.ok(south, 'Should have south region');
    assert.strictEqual(south.title, 'South Europe');
  });

  it('has east region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const east = mod.REGION_DEFINITIONS.find((r) => r.key === 'east');
    assert.ok(east, 'Should have east region');
    assert.strictEqual(east.title, 'East Europe');
  });

  it('each region has required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');

    for (const region of mod.REGION_DEFINITIONS) {
      assert.ok(region.key, 'Should have key');
      assert.ok(region.title, 'Should have title');
      assert.ok(region.subtitle, 'Should have subtitle');
      assert.ok(Array.isArray(region.countries), 'Should have countries array');
      assert.ok(region.countries.length > 0, 'Should have at least one country');
    }
  });
});

describe('getCountriesByRegion', () => {
  it('returns countries for north region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getCountriesByRegion('north');

    assert.ok(Array.isArray(countries));
    assert.ok(countries.includes('Denmark'));
    assert.ok(countries.includes('Sweden'));
  });

  it('returns countries for west region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const countries = mod.getCountriesByRegion('west');

    assert.ok(countries.includes('Germany'));
    assert.ok(countries.includes('Netherlands'));
  });

  it('returns empty array for invalid key', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    // @ts-expect-error - testing invalid key
    const countries = mod.getCountriesByRegion('invalid');

    assert.deepStrictEqual(countries, []);
  });
});

describe('getRegionData', () => {
  it('returns array of region data', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const data = mod.getRegionData();

    assert.ok(Array.isArray(data));
    assert.strictEqual(data.length, 4);
  });

  it('each region has required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const data = mod.getRegionData();

    for (const region of data) {
      assert.ok(region.key, 'Should have key');
      assert.ok(region.title, 'Should have title');
      assert.ok(region.subtitle, 'Should have subtitle');
      assert.ok(typeof region.countryCount === 'number', 'Should have countryCount');
      assert.ok(Array.isArray(region.cards), 'Should have cards array');
    }
  });

  it('cards are sorted by score within region', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const data = mod.getRegionData();

    for (const region of data) {
      if (region.cards.length > 1) {
        for (let i = 1; i < region.cards.length; i++) {
          assert.ok(
            region.cards[i - 1].score >= region.cards[i].score,
            `${region.key} cards should be sorted by score`
          );
        }
      }
    }
  });
});

describe('getRegionByKey', () => {
  it('returns region data for valid key', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const west = mod.getRegionByKey('west');

    assert.ok(west);
    assert.strictEqual(west.key, 'west');
    assert.strictEqual(west.title, 'West Europe');
  });

  it('returns null for invalid key', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    // @ts-expect-error - testing invalid key
    const invalid = mod.getRegionByKey('invalid');

    assert.strictEqual(invalid, null);
  });
});

describe('getRegionKeys', () => {
  it('returns array of region keys', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const keys = mod.getRegionKeys();

    assert.deepStrictEqual(keys, ['north', 'west', 'south', 'east']);
  });
});

// ============================================================================
// Flag Images Tests (FR #79)
// ============================================================================

describe('FLAG_IMAGE_CONFIG', () => {
  it('has basePath', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_IMAGE_CONFIG.basePath, '/flags');
  });

  it('has dimensions', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.FLAG_IMAGE_CONFIG.width, 800);
    assert.strictEqual(mod.FLAG_IMAGE_CONFIG.height, 600);
  });

  it('has formats', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.deepStrictEqual(mod.FLAG_IMAGE_CONFIG.formats, ['webp', 'jpg']);
  });
});

describe('COUNTRY_TO_FILENAME', () => {
  it('has mapping for Germany', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.COUNTRY_TO_FILENAME['Germany'], 'germany');
  });

  it('has mapping for Czech Republic', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.COUNTRY_TO_FILENAME['Czech Republic'], 'czech-republic');
  });

  it('has mapping for United Kingdom', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.COUNTRY_TO_FILENAME['United Kingdom'], 'united-kingdom');
  });

  it('has 39 countries', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(Object.keys(mod.COUNTRY_TO_FILENAME).length, 39);
  });
});

describe('countryToFilename', () => {
  it('converts known country', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.countryToFilename('Germany'), 'germany');
  });

  it('handles spaces', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.countryToFilename('Czech Republic'), 'czech-republic');
  });

  it('handles unknown country with fallback', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.countryToFilename('New Country'), 'new-country');
  });
});

describe('getFlagImagePath', () => {
  it('returns webp path by default', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const path = mod.getFlagImagePath('Germany');
    assert.strictEqual(path, '/flags/germany.webp');
  });

  it('returns jpg path when specified', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const path = mod.getFlagImagePath('Germany', 'jpg');
    assert.strictEqual(path, '/flags/germany.jpg');
  });

  it('handles spaces in country name', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const path = mod.getFlagImagePath('Czech Republic');
    assert.strictEqual(path, '/flags/czech-republic.webp');
  });
});

describe('getFlagImageSrcSet', () => {
  it('returns srcset for country', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const srcset = mod.getFlagImageSrcSet('Germany');

    assert.strictEqual(srcset.webp, '/flags/germany.webp');
    assert.strictEqual(srcset.jpg, '/flags/germany.jpg');
    assert.strictEqual(srcset.alt, 'Germany flag');
    assert.strictEqual(srcset.width, 800);
    assert.strictEqual(srcset.height, 600);
  });

  it('handles multi-word country', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const srcset = mod.getFlagImageSrcSet('United Kingdom');

    assert.strictEqual(srcset.webp, '/flags/united-kingdom.webp');
    assert.strictEqual(srcset.alt, 'United Kingdom flag');
  });
});

describe('getAllFlagImages', () => {
  it('returns array of srcsets', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const images = mod.getAllFlagImages();

    assert.ok(Array.isArray(images));
    assert.strictEqual(images.length, 39);
  });

  it('each image has required fields', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const images = mod.getAllFlagImages();

    for (const img of images.slice(0, 5)) {
      assert.ok(img.webp, 'Should have webp');
      assert.ok(img.jpg, 'Should have jpg');
      assert.ok(img.alt, 'Should have alt');
      assert.ok(typeof img.width === 'number', 'Should have width');
      assert.ok(typeof img.height === 'number', 'Should have height');
    }
  });
});

describe('hasCountryFlag', () => {
  it('returns true for known country', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.hasCountryFlag('Germany'), true);
  });

  it('returns false for unknown country', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    assert.strictEqual(mod.hasCountryFlag('Atlantis'), false);
  });
});

// ============================================================================
// Header Navigation Tests (FR #85)
// ============================================================================

describe('getCountryGuideButton', () => {
  it('returns button configuration', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.ok(btn.text, 'Should have text');
    assert.ok(btn.icon, 'Should have icon');
    assert.ok(btn.href, 'Should have href');
    assert.ok(btn.title, 'Should have title');
  });

  it('has correct text', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.text, 'Country Guide');
  });

  it('has globe icon', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.icon, '🌍');
  });

  it('links to landing page', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.ok(btn.href.includes('landing'), 'Should link to landing');
  });

  it('has iconOnlyOnMobile true', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getCountryGuideButton();

    assert.strictEqual(btn.iconOnlyOnMobile, true);
  });
});

describe('getViewMapButton', () => {
  it('returns button configuration', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getViewMapButton();

    assert.ok(btn.text, 'Should have text');
    assert.ok(btn.icon, 'Should have icon');
    assert.ok(btn.href, 'Should have href');
    assert.ok(btn.title, 'Should have title');
  });

  it('has correct text', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getViewMapButton();

    assert.strictEqual(btn.text, 'View Interactive Map');
  });

  it('has map icon', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getViewMapButton();

    assert.strictEqual(btn.icon, '🗺️');
  });

  it('links to map view', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const btn = mod.getViewMapButton();

    assert.ok(btn.href.includes('map'), 'Should link to map');
  });
});

describe('getHeaderNavConfig', () => {
  it('returns header nav configuration', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeaderNavConfig();

    assert.ok(config.countryGuide, 'Should have countryGuide');
    assert.ok(config.viewMap, 'Should have viewMap');
  });

  it('countryGuide matches getCountryGuideButton', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeaderNavConfig();
    const btn = mod.getCountryGuideButton();

    assert.deepStrictEqual(config.countryGuide, btn);
  });

  it('viewMap matches getViewMapButton', async () => {
    const mod = await import('../src/config/variants/adult-industry/landing.ts');
    const config = mod.getHeaderNavConfig();
    const btn = mod.getViewMapButton();

    assert.deepStrictEqual(config.viewMap, btn);
  });
});
