/**
 * Adult Industry Enhanced Regulations Tests
 *
 * Validates enhanced regulations data with service legality information.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('enhanced regulations data', () => {
  const regulationsPath = resolve(__dirname, '../src/config/variants/adult-industry/data/regulations.ts');
  const regulationsSrc = readFileSync(regulationsPath, 'utf-8');

  it('exports ServiceLegalityInfo interface', () => {
    assert.ok(
      regulationsSrc.includes('export interface ServiceLegalityInfo'),
      'Should export ServiceLegalityInfo interface'
    );
  });

  it('ServiceLegalityInfo has all service types', () => {
    const services = ['brothels', 'escorts', 'stripClubs', 'swingerClubs', 'streetProstitution', 'eroticMassage'];
    for (const service of services) {
      assert.ok(
        regulationsSrc.includes(`${service}: ServiceLegality`),
        `Should have ${service} in ServiceLegalityInfo`
      );
    }
  });

  it('CountryRegulation has services field', () => {
    assert.ok(
      regulationsSrc.includes('services: ServiceLegalityInfo'),
      'CountryRegulation should have services field'
    );
  });

  it('CountryRegulation has hasRedLightDistricts field', () => {
    assert.ok(
      regulationsSrc.includes('hasRedLightDistricts: boolean'),
      'CountryRegulation should have hasRedLightDistricts field'
    );
  });

  it('CountryRegulation has hasFKKClubs field', () => {
    assert.ok(
      regulationsSrc.includes('hasFKKClubs: boolean'),
      'CountryRegulation should have hasFKKClubs field'
    );
  });

  it('CountryRegulation has sourceUrl field', () => {
    assert.ok(
      regulationsSrc.includes('sourceUrl: string'),
      'CountryRegulation should have sourceUrl field'
    );
  });

  it('has at least 30 countries with service data', () => {
    // Count services: { patterns
    const serviceMatches = regulationsSrc.match(/services:\s*\{/g);
    assert.ok(serviceMatches, 'Should have services objects');
    assert.ok(
      serviceMatches.length >= 30,
      `Should have at least 30 countries with services, found ${serviceMatches.length}`
    );
  });

  it('exports SERVICE_LEGALITY_COLORS', () => {
    assert.ok(
      regulationsSrc.includes('export const SERVICE_LEGALITY_COLORS'),
      'Should export SERVICE_LEGALITY_COLORS'
    );
  });

  it('exports SERVICE_TYPE_LABELS', () => {
    assert.ok(
      regulationsSrc.includes('export const SERVICE_TYPE_LABELS'),
      'Should export SERVICE_TYPE_LABELS'
    );
  });

  it('exports helper function for red light districts', () => {
    assert.ok(
      regulationsSrc.includes('export function getCountriesWithRedLightDistricts'),
      'Should export getCountriesWithRedLightDistricts'
    );
  });

  it('exports helper function for FKK clubs', () => {
    assert.ok(
      regulationsSrc.includes('export function getCountriesWithFKKClubs'),
      'Should export getCountriesWithFKKClubs'
    );
  });
});

describe('regulations panel uses enhanced data', () => {
  const panelPath = resolve(__dirname, '../src/components/AdultIndustryRegulationsPanel.ts');
  const panelSrc = readFileSync(panelPath, 'utf-8');

  it('imports SERVICE_LEGALITY_ICONS', () => {
    assert.ok(
      panelSrc.includes('SERVICE_LEGALITY_ICONS'),
      'Should import SERVICE_LEGALITY_ICONS'
    );
  });

  it('imports SERVICE_TYPE_LABELS', () => {
    assert.ok(
      panelSrc.includes('SERVICE_TYPE_LABELS'),
      'Should import SERVICE_TYPE_LABELS'
    );
  });

  it('has buildServiceMatrix method', () => {
    assert.ok(
      panelSrc.includes('buildServiceMatrix'),
      'Should have buildServiceMatrix method'
    );
  });

  it('displays red light district badge', () => {
    assert.ok(
      panelSrc.includes('hasRedLightDistricts'),
      'Should check for red light districts'
    );
  });

  it('displays FKK clubs badge', () => {
    assert.ok(
      panelSrc.includes('hasFKKClubs'),
      'Should check for FKK clubs'
    );
  });

  it('displays source link', () => {
    assert.ok(
      panelSrc.includes('sourceUrl'),
      'Should display source URL'
    );
  });
});
