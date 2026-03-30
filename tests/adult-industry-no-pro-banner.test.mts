/**
 * Adult Industry PRO Banner Removal Tests
 *
 * Validates that adult-industry variant does not show PRO Coming Soon banner.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const appTsPath = resolve(__dirname, '../src/App.ts');

describe('adult-industry variant hides PRO banner', () => {
  const appSrc = readFileSync(appTsPath, 'utf-8');

  it('App.ts checks isAdultIndustryVariant() before showing PRO banner', () => {
    // Find the showProBanner call section
    const hasBannerCheck = appSrc.includes('!isAdultIndustryVariant()') &&
                           appSrc.includes('showProBanner');
    assert.ok(hasBannerCheck, 'Should check isAdultIndustryVariant() before showProBanner');
  });

  it('App.ts imports isAdultIndustryVariant', () => {
    assert.ok(
      appSrc.includes('isAdultIndustryVariant'),
      'Should import isAdultIndustryVariant'
    );
  });

  it('PRO banner is conditionally shown', () => {
    // The banner should be wrapped in a variant check
    const lines = appSrc.split('\n');
    let foundCheck = false;
    let foundBanner = false;
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.includes('!isAdultIndustryVariant()') && line.includes('{')) {
        foundCheck = true;
      }
      if (foundCheck && line.includes('showProBanner')) {
        foundBanner = true;
        break;
      }
      // Reset if we hit a closing brace before finding banner
      if (foundCheck && line.trim() === '}') {
        foundCheck = false;
      }
    }
    
    assert.ok(foundBanner, 'showProBanner should be inside isAdultIndustryVariant check');
  });
});
