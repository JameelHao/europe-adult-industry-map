/**
 * Tests for FR #58: Header branding for adult-industry variant
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';
import * as fs from 'node:fs';
import * as path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');

describe('adult-industry header branding', () => {
  it('adult-industry.ts has headerText configured', () => {
    const filePath = path.join(ROOT, 'src/config/variants/adult-industry.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes("headerText: 'EUROPE ADULT INDUSTRY MAP'"),
      'Should have headerText configured'
    );
  });

  it('panel-layout.ts uses BRAND_NAME for adult-industry variant', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes("SITE_VARIANT === 'adult-industry' ? BRAND_NAME"),
      'Should use BRAND_NAME for adult-industry variant in panel title'
    );
  });

  it('panel-layout.ts gets brand from getBrand()', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('const brand = getBrand()'),
      'Should get brand from getBrand()'
    );
    assert.ok(
      content.includes('const BRAND_NAME = brand.headerText'),
      'Should extract headerText from brand'
    );
  });

  it('BRAND_NAME is used in mobile menu title', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('mobile-menu-title">${BRAND_NAME}'),
      'Should use BRAND_NAME in mobile menu title'
    );
  });

  it('BRAND_NAME is used in footer', () => {
    const filePath = path.join(ROOT, 'src/app/panel-layout.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(
      content.includes('site-footer-name">${BRAND_NAME}'),
      'Should use BRAND_NAME in footer'
    );
  });
});

describe('adult-industry variant config', () => {
  it('adult-industry.ts has brand configuration', () => {
    const filePath = path.join(ROOT, 'src/config/variants/adult-industry.ts');
    const content = fs.readFileSync(filePath, 'utf-8');
    assert.ok(content.includes('brand: {'), 'Should have brand config');
    assert.ok(content.includes('displayName:'), 'Should have displayName');
    assert.ok(content.includes('logoText:'), 'Should have logoText');
    assert.ok(content.includes('headerText:'), 'Should have headerText');
  });
});
