/**
 * API Guard Tests
 *
 * Validates that the API guard properly blocks/allows API calls
 * based on variant and URL patterns.
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const apiGuardSrc = readFileSync(resolve(__dirname, '../src/utils/api-guard.ts'), 'utf-8');
const bootstrapSrc = readFileSync(resolve(__dirname, '../src/services/bootstrap.ts'), 'utf-8');
const countryIntelSrc = readFileSync(resolve(__dirname, '../src/app/country-intel.ts'), 'utf-8');
const appSrc = readFileSync(resolve(__dirname, '../src/App.ts'), 'utf-8');

describe('api-guard module', () => {
  it('exports shouldCallApi function', () => {
    assert.ok(
      apiGuardSrc.includes('export function shouldCallApi'),
      'should export shouldCallApi function'
    );
  });

  it('exports shouldInitRpc function', () => {
    assert.ok(
      apiGuardSrc.includes('export function shouldInitRpc'),
      'should export shouldInitRpc function'
    );
  });

  it('exports shouldConnectWebSocket function', () => {
    assert.ok(
      apiGuardSrc.includes('export function shouldConnectWebSocket'),
      'should export shouldConnectWebSocket function'
    );
  });

  it('defines isAdultIndustryVariant with safe import.meta.env access', () => {
    assert.ok(
      apiGuardSrc.includes('function isAdultIndustryVariant'),
      'should define isAdultIndustryVariant function'
    );
    assert.ok(
      apiGuardSrc.includes('import.meta'),
      'should use import.meta for variant detection'
    );
    assert.ok(
      apiGuardSrc.includes('catch'),
      'should have try-catch for Node.js compatibility'
    );
  });

  it('defines ALLOWED_ADULT_INDUSTRY_APIS list', () => {
    assert.ok(
      apiGuardSrc.includes('ALLOWED_ADULT_INDUSTRY_APIS'),
      'should define ALLOWED_ADULT_INDUSTRY_APIS'
    );
    // Should include RSS proxy
    assert.ok(
      apiGuardSrc.includes('/api/rss-proxy'),
      'should allow RSS proxy API'
    );
  });

  it('defines BLOCKED_WORLDMONITOR_APIS list', () => {
    assert.ok(
      apiGuardSrc.includes('BLOCKED_WORLDMONITOR_APIS'),
      'should define BLOCKED_WORLDMONITOR_APIS'
    );
    // Should block bootstrap
    assert.ok(
      apiGuardSrc.includes('/api/bootstrap'),
      'should block bootstrap API'
    );
    // Should block intelligence
    assert.ok(
      apiGuardSrc.includes('/api/intelligence/'),
      'should block intelligence API'
    );
  });
});

describe('api-guard integration', () => {
  it('bootstrap.ts uses shouldCallApi', () => {
    assert.ok(
      bootstrapSrc.includes('shouldCallApi'),
      'bootstrap.ts should import and use shouldCallApi'
    );
  });

  it('country-intel.ts uses shouldCallApi', () => {
    assert.ok(
      countryIntelSrc.includes('shouldCallApi'),
      'country-intel.ts should import and use shouldCallApi'
    );
  });

  it('App.ts checks isAdultIndustryVariant before fetchBootstrapData', () => {
    assert.ok(
      appSrc.includes('isAdultIndustryVariant()') && appSrc.includes('fetchBootstrapData'),
      'App.ts should check isAdultIndustryVariant before calling fetchBootstrapData'
    );
  });
});
