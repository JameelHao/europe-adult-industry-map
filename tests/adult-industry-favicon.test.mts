/**
 * Adult Industry Favicon Tests
 *
 * Validates that adult-industry favicon files exist
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const faviconDir = resolve(__dirname, '../public/favico/adult-industry');

describe('adult-industry favicon files', () => {
  it('favicon.ico exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'favicon.ico')),
      'favicon.ico should exist'
    );
  });

  it('favicon-16x16.png exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'favicon-16x16.png')),
      'favicon-16x16.png should exist'
    );
  });

  it('favicon-32x32.png exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'favicon-32x32.png')),
      'favicon-32x32.png should exist'
    );
  });

  it('apple-touch-icon.png exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'apple-touch-icon.png')),
      'apple-touch-icon.png should exist'
    );
  });

  it('android-chrome-192x192.png exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'android-chrome-192x192.png')),
      'android-chrome-192x192.png should exist'
    );
  });

  it('android-chrome-512x512.png exists', () => {
    assert.ok(
      existsSync(resolve(faviconDir, 'android-chrome-512x512.png')),
      'android-chrome-512x512.png should exist'
    );
  });

  it('site.webmanifest exists and is valid JSON', () => {
    const manifestPath = resolve(faviconDir, 'site.webmanifest');
    assert.ok(existsSync(manifestPath), 'site.webmanifest should exist');
    
    const content = readFileSync(manifestPath, 'utf-8');
    const manifest = JSON.parse(content);
    
    assert.ok(manifest.name, 'manifest should have name');
    assert.ok(manifest.icons, 'manifest should have icons');
    assert.ok(Array.isArray(manifest.icons), 'icons should be an array');
    assert.ok(manifest.icons.length >= 2, 'manifest should have at least 2 icons');
  });

  it('favicon files are not empty', () => {
    const files = [
      'favicon.ico',
      'favicon-16x16.png',
      'favicon-32x32.png',
      'apple-touch-icon.png',
    ];
    
    for (const file of files) {
      const filepath = resolve(faviconDir, file);
      const stats = statSync(filepath);
      assert.ok(stats.size > 0, `${file} should not be empty`);
    }
  });
});
