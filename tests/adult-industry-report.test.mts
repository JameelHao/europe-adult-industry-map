/**
 * Tests for FR #64: HTML report export
 */

import { describe, it } from 'node:test';
import * as assert from 'node:assert';

describe('Adult Industry Report', () => {
  it('exports generateAdultIndustryReport function', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    assert.ok(typeof mod.generateAdultIndustryReport === 'function');
  });

  it('exports renderAdultIndustryReportTemplate function', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    assert.ok(typeof mod.renderAdultIndustryReportTemplate === 'function');
  });

  it('exports getReportPreview function', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    assert.ok(typeof mod.getReportPreview === 'function');
  });

  it('report functions are exported from adult-industry index', async () => {
    const mod = await import('../src/config/variants/adult-industry/index.ts');
    assert.ok(typeof mod.generateAdultIndustryReport === 'function');
    assert.ok(typeof mod.getReportPreview === 'function');
  });
});

describe('Report Template', () => {
  it('getReportPreview returns valid HTML', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('<!DOCTYPE html>'), 'Should have DOCTYPE');
    assert.ok(html.includes('<html'), 'Should have html tag');
    assert.ok(html.includes('</html>'), 'Should have closing html tag');
  });

  it('report contains title', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Europe Adult Industry Report'), 'Should have report title');
  });

  it('report contains market overview section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Market Overview'), 'Should have market overview section');
    assert.ok(html.includes('Global Market'), 'Should have global market stat');
    assert.ok(html.includes('EU Market'), 'Should have EU market stat');
  });

  it('report contains regulations section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Country Regulations'), 'Should have regulations section');
    assert.ok(html.includes('Brothels'), 'Should have brothels column');
  });

  it('report contains cities section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Major Cities'), 'Should have cities section');
  });

  it('report contains red light districts section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Red Light Districts'), 'Should have RLD section');
  });

  it('report contains FKK clubs section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('FKK Clubs'), 'Should have FKK clubs section');
  });

  it('report contains events section', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Upcoming Events'), 'Should have events section');
  });

  it('report contains footer with disclaimer', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('Disclaimer'), 'Should have disclaimer');
    assert.ok(html.includes('Data Sources'), 'Should have data sources');
  });

  it('report has printable styles', async () => {
    const mod = await import('../src/config/variants/adult-industry/report.ts');
    const html = mod.getReportPreview();
    
    assert.ok(html.includes('@media print'), 'Should have print media query');
  });
});
