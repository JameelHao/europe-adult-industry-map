/**
 * Adult Industry RSS Feeds Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// Get project root
const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, '..');

// Load allowed domains
const allowedDomainsPath = join(projectRoot, 'shared', 'rss-allowed-domains.json');
const allowedDomains: string[] = JSON.parse(readFileSync(allowedDomainsPath, 'utf-8'));

// Import feeds config - use dynamic import with path alias
// Note: Direct import not supported in node:test, we'll test via file read
const FEEDS_FILE = join(projectRoot, 'src', 'config', 'variants', 'adult-industry.ts');
const feedsContent = readFileSync(FEEDS_FILE, 'utf-8');

describe('RSS Allowed Domains', () => {
  it('should include xbiz.com', () => {
    assert.ok(allowedDomains.includes('xbiz.com'), 'Should allow xbiz.com');
  });

  it('should include ean-online.com', () => {
    assert.ok(allowedDomains.includes('ean-online.com'), 'Should allow ean-online.com');
  });

  it('should include avn.com', () => {
    assert.ok(allowedDomains.includes('avn.com'), 'Should allow avn.com');
  });

  it('should be sorted alphabetically', () => {
    const sorted = [...allowedDomains].sort();
    assert.deepEqual(allowedDomains, sorted, 'Domains should be sorted');
  });

  it('should have unique entries', () => {
    const uniqueDomains = new Set(allowedDomains);
    assert.equal(uniqueDomains.size, allowedDomains.length, 'Should have no duplicates');
  });
});

describe('Adult Industry FEEDS Config (via source file)', () => {
  it('should have industryNews section with XBIZ', () => {
    assert.ok(feedsContent.includes('industryNews:'), 'Should have industryNews section');
    assert.ok(feedsContent.includes("name: 'XBIZ'"), 'Should have XBIZ feed');
  });

  it('should have XBIZ Europe feed', () => {
    assert.ok(feedsContent.includes("name: 'XBIZ Europe'"), 'Should have XBIZ Europe feed');
    assert.ok(feedsContent.includes('xbiz.com/europe'), 'XBIZ Europe URL should reference europe');
  });

  it('should have EAN Online feed', () => {
    assert.ok(feedsContent.includes("name: 'EAN Online'"), 'Should have EAN Online feed');
    assert.ok(feedsContent.includes('ean-online.com'), 'Should reference ean-online.com');
  });

  it('should have AVN feed', () => {
    assert.ok(feedsContent.includes("name: 'AVN'"), 'Should have AVN feed');
    assert.ok(feedsContent.includes('avn.com'), 'Should reference avn.com');
  });

  it('should have events section', () => {
    assert.ok(feedsContent.includes('events:'), 'Should have events section');
  });

  it('should have market section', () => {
    assert.ok(feedsContent.includes('market:'), 'Should have market section');
  });

  it('should have regulations section', () => {
    assert.ok(feedsContent.includes('regulations:'), 'Should have regulations section');
  });

  it('should use rssProxyUrl wrapper', () => {
    // Check that feeds use the rss() proxy wrapper
    assert.ok(feedsContent.includes('rss('), 'Should use rss() proxy wrapper for feeds');
    assert.ok(feedsContent.includes('const rss = rssProxyUrl'), 'Should import rssProxyUrl');
  });
});
