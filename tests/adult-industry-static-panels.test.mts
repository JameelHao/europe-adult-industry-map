/**
 * Adult Industry Static Panel Tests
 *
 * Validates that adult-industry variant panels are configured
 * to use static data instead of API calls.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Read panel component files
const eventsPanelPath = resolve(__dirname, '../src/components/AdultIndustryEventsPanel.ts');
const marketPanelPath = resolve(__dirname, '../src/components/AdultIndustryMarketPanel.ts');
const regulationsPanelPath = resolve(__dirname, '../src/components/AdultIndustryRegulationsPanel.ts');
const panelLayoutPath = resolve(__dirname, '../src/app/panel-layout.ts');

describe('adult-industry static panels', () => {
  it('AdultIndustryEventsPanel.ts exists', () => {
    assert.ok(existsSync(eventsPanelPath), 'AdultIndustryEventsPanel.ts should exist');
  });

  it('AdultIndustryMarketPanel.ts exists', () => {
    assert.ok(existsSync(marketPanelPath), 'AdultIndustryMarketPanel.ts should exist');
  });

  it('AdultIndustryRegulationsPanel.ts exists', () => {
    assert.ok(existsSync(regulationsPanelPath), 'AdultIndustryRegulationsPanel.ts should exist');
  });

  it('EventsPanel imports static data, not API client', () => {
    const src = readFileSync(eventsPanelPath, 'utf-8');
    assert.ok(
      src.includes('@/config/variants/adult-industry/data/events'),
      'should import from static data'
    );
    assert.ok(
      !src.includes('ResearchServiceClient'),
      'should NOT import ResearchServiceClient'
    );
    assert.ok(
      !src.includes('/api/'),
      'should NOT call any API'
    );
  });

  it('MarketPanel imports static data, not API client', () => {
    const src = readFileSync(marketPanelPath, 'utf-8');
    assert.ok(
      src.includes('@/config/variants/adult-industry/data/market-stats'),
      'should import from static data'
    );
    assert.ok(
      !src.includes('MarketServiceClient'),
      'should NOT import MarketServiceClient'
    );
  });

  it('RegulationsPanel imports static data, not API client', () => {
    const src = readFileSync(regulationsPanelPath, 'utf-8');
    assert.ok(
      src.includes('@/config/variants/adult-industry/data/regulations'),
      'should import from static data'
    );
    assert.ok(
      !src.includes('/api/'),
      'should NOT call any API'
    );
  });

  it('panel-layout.ts uses adult-industry panels for that variant', () => {
    const src = readFileSync(panelLayoutPath, 'utf-8');
    assert.ok(
      src.includes('AdultIndustryEventsPanel'),
      'should import AdultIndustryEventsPanel'
    );
    assert.ok(
      src.includes('AdultIndustryMarketPanel'),
      'should import AdultIndustryMarketPanel'
    );
    assert.ok(
      src.includes('AdultIndustryRegulationsPanel'),
      'should import AdultIndustryRegulationsPanel'
    );
    assert.ok(
      src.includes('isAdultIndustryVariant()'),
      'should check isAdultIndustryVariant() before creating panels'
    );
  });
});

describe('adult-industry static data availability', () => {
  it('events.ts data file exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/events.ts');
    assert.ok(existsSync(path), 'events.ts should exist');
  });

  it('market-stats.ts data file exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/market-stats.ts');
    assert.ok(existsSync(path), 'market-stats.ts should exist');
  });

  it('regulations.ts data file exists', () => {
    const path = resolve(__dirname, '../src/config/variants/adult-industry/data/regulations.ts');
    assert.ok(existsSync(path), 'regulations.ts should exist');
  });
});
