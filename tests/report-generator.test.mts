/**
 * Report Generator Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  generateReportHtml,
  generateReportFilename,
  type ReportOptions,
} from '../src/services/report-generator.js';
import {
  renderReportHtml,
  escapeHtml,
  formatScoreBadge,
  formatEventTypeBadge,
  formatBoolean,
  formatDate,
  type ReportData,
} from '../src/templates/report-template.js';

describe('Report Template - escapeHtml', () => {
  it('should escape HTML special characters', () => {
    assert.equal(escapeHtml('<script>'), '&lt;script&gt;');
    assert.equal(escapeHtml('A & B'), 'A &amp; B');
    assert.equal(escapeHtml('"quotes"'), '&quot;quotes&quot;');
    assert.equal(escapeHtml("'apostrophe'"), '&#039;apostrophe&#039;');
  });

  it('should leave normal text unchanged', () => {
    assert.equal(escapeHtml('Hello World'), 'Hello World');
    assert.equal(escapeHtml('Test 123'), 'Test 123');
  });
});

describe('Report Template - formatScoreBadge', () => {
  it('should format score 1', () => {
    const badge = formatScoreBadge(1);
    assert.ok(badge.includes('score-1'), 'Should have score-1 class');
    assert.ok(badge.includes('1/5'), 'Should show 1/5');
  });

  it('should format score 5', () => {
    const badge = formatScoreBadge(5);
    assert.ok(badge.includes('score-5'), 'Should have score-5 class');
    assert.ok(badge.includes('5/5'), 'Should show 5/5');
  });
});

describe('Report Template - formatEventTypeBadge', () => {
  it('should format Trade Show type', () => {
    const badge = formatEventTypeBadge('Trade Show');
    assert.ok(badge.includes('event-trade-show'), 'Should have event-trade-show class');
    assert.ok(badge.includes('Trade Show'), 'Should include type text');
  });

  it('should format Conference type', () => {
    const badge = formatEventTypeBadge('Conference');
    assert.ok(badge.includes('event-conference'), 'Should have event-conference class');
  });
});

describe('Report Template - formatBoolean', () => {
  it('should return checkmark for true', () => {
    assert.equal(formatBoolean(true), '✅');
  });

  it('should return cross for false', () => {
    assert.equal(formatBoolean(false), '❌');
  });
});

describe('Report Template - formatDate', () => {
  it('should format date correctly', () => {
    const formatted = formatDate('2026-03-29');
    assert.ok(formatted.includes('Mar'), 'Should include month');
    assert.ok(formatted.includes('29'), 'Should include day');
    assert.ok(formatted.includes('2026'), 'Should include year');
  });
});

describe('Report Template - renderReportHtml', () => {
  const mockData: ReportData = {
    generatedDate: 'March 29, 2026',
    dataDate: '2026-03-01',
    brandCount: 54,
    retailerCount: 30,
    countryCount: 15,
    eventCount: 12,
    brandsTableRows: '<tr><td>Test Brand</td></tr>',
    retailersTableRows: '<tr><td>Test Retailer</td></tr>',
    regulationsTableRows: '<tr><td>Germany</td></tr>',
    eventsTableRows: '<tr><td>Test Event</td></tr>',
  };

  it('should generate valid HTML document', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('<!DOCTYPE html>'), 'Should have DOCTYPE');
    assert.ok(html.includes('<html'), 'Should have html tag');
    assert.ok(html.includes('</html>'), 'Should close html tag');
  });

  it('should include report title', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('Europe Adult Industry Report'), 'Should have title');
  });

  it('should include generated date', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('March 29, 2026'), 'Should include generated date');
  });

  it('should include stats', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('54'), 'Should include brand count');
    assert.ok(html.includes('30'), 'Should include retailer count');
    assert.ok(html.includes('15'), 'Should include country count');
    assert.ok(html.includes('12'), 'Should include event count');
  });

  it('should include table rows', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('Test Brand'), 'Should include brands');
    assert.ok(html.includes('Test Retailer'), 'Should include retailers');
    assert.ok(html.includes('Germany'), 'Should include regulations');
    assert.ok(html.includes('Test Event'), 'Should include events');
  });

  it('should include print styles', () => {
    const html = renderReportHtml(mockData);
    assert.ok(html.includes('@media print'), 'Should have print media query');
  });

  it('should include map section when screenshot provided', () => {
    const dataWithMap = {
      ...mockData,
      mapScreenshot: 'data:image/png;base64,abc123',
    };
    const html = renderReportHtml(dataWithMap);
    assert.ok(html.includes('data:image/png;base64,abc123'), 'Should include map screenshot');
    assert.ok(html.includes('Industry Distribution Map'), 'Should have map section title');
  });
});

describe('Report Generator - generateReportHtml', () => {
  it('should generate complete HTML report with default options', () => {
    const html = generateReportHtml();
    assert.ok(html.includes('<!DOCTYPE html>'), 'Should be valid HTML');
    assert.ok(html.includes('Major Brands'), 'Should include brands section');
    assert.ok(html.includes('Major Retailers'), 'Should include retailers section');
    assert.ok(html.includes('Regulatory Landscape'), 'Should include regulations section');
    assert.ok(html.includes('Upcoming Events'), 'Should include events section');
  });

  it('should include actual brand data', () => {
    const html = generateReportHtml({ includeBrands: true });
    // Should include some known brands
    assert.ok(html.includes('Germany') || html.includes('Netherlands'), 'Should include European countries');
  });

  it('should include actual regulation data', () => {
    const html = generateReportHtml({ includeRegulations: true });
    assert.ok(html.includes('/5'), 'Should include score ratings');
  });

  it('should respect includeBrands option', () => {
    const htmlWith = generateReportHtml({ includeBrands: true });
    const htmlWithout = generateReportHtml({ includeBrands: false, includeRetailers: false, includeRegulations: false, includeEvents: false });
    
    // Both should be valid HTML
    assert.ok(htmlWith.includes('<!DOCTYPE html>'));
    assert.ok(htmlWithout.includes('<!DOCTYPE html>'));
    
    // With brands should have more content
    assert.ok(htmlWith.length > htmlWithout.length, 'Report with brands should be longer');
  });

  it('should filter by region when specified', () => {
    const html = generateReportHtml({ 
      includeBrands: true, 
      includeRetailers: true,
      includeRegulations: true,
      region: 'Germany' 
    });
    assert.ok(html.includes('Germany'), 'Should include Germany data');
  });
});

describe('Report Generator - generateReportFilename', () => {
  it('should generate filename with current date', () => {
    const filename = generateReportFilename();
    assert.match(filename, /europe-adult-industry-report-\d{4}-\d{2}-\d{2}\.html$/, 'Should match expected pattern');
  });

  it('should have .html extension', () => {
    const filename = generateReportFilename();
    assert.ok(filename.endsWith('.html'), 'Should end with .html');
  });
});

describe('Report Generator - HTML Output Quality', () => {
  it('should not have unclosed tags', () => {
    const html = generateReportHtml();
    
    // Count opening and closing tags for major elements
    const openTable = (html.match(/<table/g) || []).length;
    const closeTable = (html.match(/<\/table>/g) || []).length;
    assert.equal(openTable, closeTable, 'Tables should be balanced');
    
    const openTr = (html.match(/<tr/g) || []).length;
    const closeTr = (html.match(/<\/tr>/g) || []).length;
    assert.equal(openTr, closeTr, 'TR tags should be balanced');
  });

  it('should have proper charset', () => {
    const html = generateReportHtml();
    assert.ok(html.includes('charset="UTF-8"') || html.includes("charset='UTF-8'"), 'Should have UTF-8 charset');
  });

  it('should have viewport meta tag', () => {
    const html = generateReportHtml();
    assert.ok(html.includes('viewport'), 'Should have viewport meta tag');
  });
});
