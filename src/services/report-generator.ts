/**
 * Report Generator Service
 * 
 * Generates HTML reports from Europe Adult Industry data.
 * Collects data from brands, retailers, regulations, and events,
 * then renders into a professional HTML report.
 */
import {
  renderReportHtml,
  escapeHtml,
  formatScoreBadge,
  formatEventTypeBadge,
  formatBoolean,
  formatDate,
  type ReportData,
} from '../templates/report-template';
import { ADULT_BRANDS } from '../config/variants/adult-industry/data/brands';
import { ADULT_RETAILERS } from '../config/variants/adult-industry/data/retailers';
import { COUNTRY_REGULATIONS } from '../config/variants/adult-industry/data/regulations';
import { INDUSTRY_EVENTS, EVENT_TYPE_LABELS } from '../config/variants/adult-industry/data/events';

/** Report generation options */
export interface ReportOptions {
  /** Include brands section */
  includeBrands?: boolean;
  /** Include retailers section */
  includeRetailers?: boolean;
  /** Include regulations section */
  includeRegulations?: boolean;
  /** Include events section */
  includeEvents?: boolean;
  /** Filter by country (ISO code) */
  region?: string;
  /** Map screenshot as base64 data URL */
  mapScreenshot?: string;
}

/** Default options */
const DEFAULT_OPTIONS: Required<Omit<ReportOptions, 'region' | 'mapScreenshot'>> = {
  includeBrands: true,
  includeRetailers: true,
  includeRegulations: true,
  includeEvents: true,
};

/**
 * Generate HTML report with specified options
 */
export function generateReportHtml(options: ReportOptions = {}): string {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  
  // Collect data
  const brands = opts.includeBrands ? getBrands(opts.region) : [];
  const retailers = opts.includeRetailers ? getRetailers(opts.region) : [];
  const regulations = opts.includeRegulations ? getRegulations(opts.region) : [];
  const events = opts.includeEvents ? getEvents() : [];
  
  // Get unique countries
  const countries = new Set<string>();
  for (const b of brands) countries.add(b.country);
  for (const r of retailers) countries.add(r.country);
  for (const reg of regulations) countries.add(reg.countryName);
  
  // Build report data
  const reportData: ReportData = {
    generatedDate: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }),
    dataDate: '2026-03-01', // Data snapshot date
    brandCount: brands.length,
    retailerCount: retailers.length,
    countryCount: countries.size,
    eventCount: events.length,
    brandsTableRows: generateBrandsRows(brands),
    retailersTableRows: generateRetailersRows(retailers),
    regulationsTableRows: generateRegulationsRows(regulations),
    eventsTableRows: generateEventsRows(events),
    mapScreenshot: opts.mapScreenshot,
  };
  
  return renderReportHtml(reportData);
}

/**
 * Download report as HTML file (browser only)
 */
export function downloadReportAsFile(html: string, filename: string): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    throw new Error('downloadReportAsFile is only available in browser environment');
  }
  
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.style.display = 'none';
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  
  URL.revokeObjectURL(url);
}

/**
 * Generate default filename for report
 */
export function generateReportFilename(): string {
  const date = new Date().toISOString().split('T')[0];
  return `europe-adult-industry-report-${date}.html`;
}

// ============ Data Collection Helpers ============

interface BrandRow {
  name: string;
  country: string;
  category: string;
  founded?: number;
  website?: string;
}

function getBrands(region?: string): BrandRow[] {
  let brands = ADULT_BRANDS.map(b => ({
    name: b.name,
    country: b.country,
    category: b.category,
    founded: b.founded,
    website: b.website,
  }));
  
  if (region) {
    brands = brands.filter(b => 
      b.country.toLowerCase().includes(region.toLowerCase())
    );
  }
  
  return brands.sort((a, b) => a.name.localeCompare(b.name));
}

interface RetailerRow {
  name: string;
  country: string;
  type: string;
  locations?: number;
}

function getRetailers(region?: string): RetailerRow[] {
  let retailers = ADULT_RETAILERS.map(r => ({
    name: r.name,
    country: r.country,
    type: r.type,
    locations: r.storeCount,
  }));
  
  if (region) {
    retailers = retailers.filter(r => 
      r.country.toLowerCase().includes(region.toLowerCase())
    );
  }
  
  return retailers.sort((a, b) => a.name.localeCompare(b.name));
}

interface RegulationRow {
  countryName: string;
  overallScore: number;
  physicalRetailLegal: boolean;
  onlineSalesLegal: boolean;
  advertisingRestrictions: string;
}

function getRegulations(region?: string): RegulationRow[] {
  let regs = COUNTRY_REGULATIONS.map(r => ({
    countryName: r.countryName,
    overallScore: r.overallScore,
    physicalRetailLegal: r.physicalRetailLegal,
    onlineSalesLegal: r.onlineSalesLegal,
    advertisingRestrictions: r.advertisingRestrictions,
  }));
  
  if (region) {
    regs = regs.filter(r => 
      r.countryName.toLowerCase().includes(region.toLowerCase())
    );
  }
  
  return regs.sort((a, b) => b.overallScore - a.overallScore);
}

interface EventRow {
  name: string;
  type: string;
  location: string;
  dates: string;
  b2bOnly: boolean;
}

function getEvents(): EventRow[] {
  const now = new Date();
  
  return INDUSTRY_EVENTS
    .filter(e => new Date(e.dates.start) >= now)
    .sort((a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime())
    .map(e => ({
      name: e.name,
      type: EVENT_TYPE_LABELS[e.type],
      location: `${e.location.city}, ${e.location.country}`,
      dates: formatDateRange(e.dates.start, e.dates.end),
      b2bOnly: e.b2bOnly,
    }));
}

function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  if (start === end) {
    return formatDate(start);
  }
  
  if (startDate.getMonth() === endDate.getMonth() && 
      startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${endDate.getDate()}, ${endDate.getFullYear()}`;
  }
  
  return `${formatDate(start)} - ${formatDate(end)}`;
}

// ============ Row Generators ============

function generateBrandsRows(brands: BrandRow[]): string {
  if (brands.length === 0) {
    return '<tr><td colspan="5" style="text-align:center;color:#666;">No brands data</td></tr>';
  }
  
  return brands.map(b => `
    <tr>
      <td>${escapeHtml(b.name)}</td>
      <td>${escapeHtml(b.country)}</td>
      <td>${escapeHtml(b.category)}</td>
      <td>${b.founded ?? '-'}</td>
      <td>${b.website ? `<a href="${escapeHtml(b.website)}" target="_blank">🔗</a>` : '-'}</td>
    </tr>
  `).join('');
}

function generateRetailersRows(retailers: RetailerRow[]): string {
  if (retailers.length === 0) {
    return '<tr><td colspan="4" style="text-align:center;color:#666;">No retailers data</td></tr>';
  }
  
  return retailers.map(r => `
    <tr>
      <td>${escapeHtml(r.name)}</td>
      <td>${escapeHtml(r.country)}</td>
      <td>${escapeHtml(r.type)}</td>
      <td>${r.locations ?? '-'}</td>
    </tr>
  `).join('');
}

function generateRegulationsRows(regulations: RegulationRow[]): string {
  if (regulations.length === 0) {
    return '<tr><td colspan="5" style="text-align:center;color:#666;">No regulations data</td></tr>';
  }
  
  return regulations.map(r => `
    <tr>
      <td>${escapeHtml(r.countryName)}</td>
      <td>${formatScoreBadge(r.overallScore)}</td>
      <td>${formatBoolean(r.physicalRetailLegal)}</td>
      <td>${formatBoolean(r.onlineSalesLegal)}</td>
      <td>${escapeHtml(r.advertisingRestrictions)}</td>
    </tr>
  `).join('');
}

function generateEventsRows(events: EventRow[]): string {
  if (events.length === 0) {
    return '<tr><td colspan="5" style="text-align:center;color:#666;">No upcoming events</td></tr>';
  }
  
  return events.map(e => `
    <tr>
      <td>${escapeHtml(e.name)}</td>
      <td>${formatEventTypeBadge(e.type)}</td>
      <td>${escapeHtml(e.location)}</td>
      <td>${escapeHtml(e.dates)}</td>
      <td>${formatBoolean(e.b2bOnly)}</td>
    </tr>
  `).join('');
}
