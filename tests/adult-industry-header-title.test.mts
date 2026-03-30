/**
 * Adult Industry Header Title Tests
 *
 * Validates that adult-industry variant uses correct header title
 * instead of "Global Situation" or "World Monitor".
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('adult-industry header title', () => {
  it('variant config has correct headerText', () => {
    const configPath = resolve(__dirname, '../src/config/variants/adult-industry.ts');
    const src = readFileSync(configPath, 'utf-8');
    
    // Check headerText is set
    assert.ok(
      src.includes("headerText: 'EUROPE ADULT INDUSTRY MAP'"),
      'Should have headerText set to EUROPE ADULT INDUSTRY MAP'
    );
    
    // Should NOT have Global Situation or World Monitor
    assert.ok(
      !src.includes('Global Situation'),
      'Should NOT contain Global Situation'
    );
    assert.ok(
      !src.includes('WORLD MONITOR'),
      'Should NOT contain WORLD MONITOR'
    );
  });

  it('panel-layout uses brand.headerText for header', () => {
    const layoutPath = resolve(__dirname, '../src/app/panel-layout.ts');
    const src = readFileSync(layoutPath, 'utf-8');
    
    // Verify getBrand() is called
    assert.ok(
      src.includes('getBrand()'),
      'Should call getBrand()'
    );
    
    // Verify headerText is used
    assert.ok(
      src.includes('brand.headerText'),
      'Should use brand.headerText'
    );
    
    // Should NOT have hardcoded Global Situation
    assert.ok(
      !src.includes('"Global Situation"') && !src.includes("'Global Situation'"),
      'Should NOT have hardcoded Global Situation string'
    );
  });

  it('variant config has correct brand displayName', () => {
    const configPath = resolve(__dirname, '../src/config/variants/adult-industry.ts');
    const src = readFileSync(configPath, 'utf-8');
    
    assert.ok(
      src.includes("displayName: 'Europe Adult Industry Map'"),
      'Should have displayName set to Europe Adult Industry Map'
    );
  });

  it('variant config has correct logoText', () => {
    const configPath = resolve(__dirname, '../src/config/variants/adult-industry.ts');
    const src = readFileSync(configPath, 'utf-8');
    
    assert.ok(
      src.includes("logoText: 'ADULT'"),
      'Should have logoText set to ADULT'
    );
  });
});
