/**
 * Adult Industry Bloomberg Video Removal Tests
 *
 * Validates that adult-industry variant does not create live-news panel
 * (which contains Bloomberg video player).
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const panelLayoutPath = resolve(__dirname, '../src/app/panel-layout.ts');

describe('adult-industry variant hides Bloomberg video', () => {
  const panelLayoutSrc = readFileSync(panelLayoutPath, 'utf-8');

  it('panel-layout.ts checks isAdultIndustryVariant() before creating live-news panel', () => {
    // Find the live-news panel creation section
    const liveNewsSection = panelLayoutSrc.split('\n').find(line => 
      line.includes("'live-news'") && line.includes('shouldCreatePanel')
    );
    assert.ok(liveNewsSection, 'Should have live-news panel creation condition');
    
    // Verify isAdultIndustryVariant() check is in the condition
    assert.ok(
      liveNewsSection.includes('isAdultIndustryVariant()'),
      'live-news panel condition should check isAdultIndustryVariant()'
    );
    
    // Verify it's negated (skip for adult-industry)
    assert.ok(
      liveNewsSection.includes('!isAdultIndustryVariant()'),
      'Should skip live-news for adult-industry variant (!isAdultIndustryVariant())'
    );
  });

  it('LiveNewsPanel contains Bloomberg channel', () => {
    const liveNewsPanelPath = resolve(__dirname, '../src/components/LiveNewsPanel.ts');
    const liveNewsSrc = readFileSync(liveNewsPanelPath, 'utf-8');
    
    assert.ok(
      liveNewsSrc.includes("id: 'bloomberg'") || liveNewsSrc.includes('bloomberg'),
      'LiveNewsPanel should contain bloomberg channel reference'
    );
  });
});
