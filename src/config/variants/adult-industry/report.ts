/**
 * Adult Industry Report Generator
 *
 * Generates downloadable HTML reports with market data,
 * regulations, cities, and events information.
 */

import { MARKET_STATS } from './data/market-stats';
import { COUNTRY_REGULATIONS } from './data/regulations';
import { CITIES } from './data/cities';
import { INDUSTRY_EVENTS } from './data/events';
import { RED_LIGHT_DISTRICTS } from './data/red-light-districts';
import { FKK_CLUBS } from './data/fkk-clubs';

/** Report data structure */
interface ReportData {
  generatedAt: Date;
  marketStats: typeof MARKET_STATS;
  regulations: typeof COUNTRY_REGULATIONS;
  cities: typeof CITIES;
  events: typeof INDUSTRY_EVENTS;
  redLightDistricts: typeof RED_LIGHT_DISTRICTS;
  fkkClubs: typeof FKK_CLUBS;
}

/**
 * Format date as readable string
 */
function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Get legal status label
 */
function getLegalStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    legal: '✅ Legal',
    illegal: '❌ Illegal',
    'partially-legal': '⚠️ Partially Legal',
    regulated: '📋 Regulated',
    decriminalized: '🔓 Decriminalized',
  };
  return labels[status] || status;
}

/**
 * Render the HTML report template
 */
export function renderAdultIndustryReportTemplate(data: ReportData): string {
  const { generatedAt, marketStats, regulations, cities, events, redLightDistricts, fkkClubs } =
    data;

  // Sort regulations by permissiveness score
  const sortedRegulations = [...regulations].sort(
    (a, b) => (b.overallScore || 0) - (a.overallScore || 0)
  );

  // Sort events by date
  const sortedEvents = [...events].sort(
    (a, b) => new Date(a.dates.start).getTime() - new Date(b.dates.start).getTime()
  );

  // Group cities by country
  const citiesByCountry: Record<string, (typeof cities)[number][]> = {};
  for (const city of cities) {
    if (!citiesByCountry[city.country]) citiesByCountry[city.country] = [];
    citiesByCountry[city.country]!.push(city);
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Europe Adult Industry Report - ${formatDate(generatedAt)}</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 1200px;
      margin: 0 auto;
      padding: 2rem;
      background: #f5f5f5;
    }
    .container { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #e74c3c; margin-bottom: 0.5rem; font-size: 2rem; }
    h2 { color: #2c3e50; margin: 2rem 0 1rem; border-bottom: 2px solid #e74c3c; padding-bottom: 0.5rem; }
    h3 { color: #34495e; margin: 1.5rem 0 0.5rem; }
    .meta { color: #666; margin-bottom: 2rem; }
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0; }
    .stat-card { background: #f8f9fa; padding: 1rem; border-radius: 6px; text-align: center; }
    .stat-value { font-size: 2rem; font-weight: bold; color: #e74c3c; }
    .stat-label { color: #666; font-size: 0.875rem; }
    table { width: 100%; border-collapse: collapse; margin: 1rem 0; }
    th, td { padding: 0.75rem; text-align: left; border-bottom: 1px solid #eee; }
    th { background: #f8f9fa; font-weight: 600; color: #2c3e50; }
    tr:hover { background: #f8f9fa; }
    .badge { display: inline-block; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.75rem; }
    .badge-legal { background: #d4edda; color: #155724; }
    .badge-illegal { background: #f8d7da; color: #721c24; }
    .badge-partial { background: #fff3cd; color: #856404; }
    ul { margin: 0.5rem 0 0.5rem 1.5rem; }
    li { margin: 0.25rem 0; }
    .city-list { columns: 2; column-gap: 2rem; }
    .event-card { background: #f8f9fa; padding: 1rem; border-radius: 6px; margin: 0.5rem 0; }
    .event-date { color: #e74c3c; font-weight: 600; }
    footer { margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; color: #666; font-size: 0.875rem; }
    @media print {
      body { background: white; padding: 0; }
      .container { box-shadow: none; padding: 0; }
      .stat-card { border: 1px solid #eee; }
    }
    @media (max-width: 768px) {
      .city-list { columns: 1; }
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>🔴 Europe Adult Industry Report</h1>
    <p class="meta">Generated: ${formatDate(generatedAt)} | Data Year: ${marketStats.dataYear}</p>

    <h2>📊 Market Overview</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">€${marketStats.globalMarketSizeB}B</div>
        <div class="stat-label">Global Market</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">€${marketStats.euMarketSizeB}B</div>
        <div class="stat-label">EU Market</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">+${marketStats.yoyGrowthPercent}%</div>
        <div class="stat-label">YoY Growth</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">${marketStats.ecommerceSharePercent}%</div>
        <div class="stat-label">E-commerce Share</div>
      </div>
    </div>

    <h3>Top Markets by Share</h3>
    <table>
      <thead>
        <tr><th>Rank</th><th>Country</th><th>Share</th><th>Est. Value</th></tr>
      </thead>
      <tbody>
        ${marketStats.topCountries
          .slice(0, 7)
          .map(
            (c) => `
          <tr>
            <td>#${c.rank}</td>
            <td>${c.country}</td>
            <td>${c.sharePercent}%</td>
            <td>${c.estimatedValueB ? `€${c.estimatedValueB}B` : '-'}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <h2>⚖️ Country Regulations</h2>
    <table>
      <thead>
        <tr><th>Country</th><th>Prostitution</th><th>Brothels</th><th>Score</th></tr>
      </thead>
      <tbody>
        ${sortedRegulations
          .slice(0, 15)
          .map(
            (r) => `
          <tr>
            <td>${r.countryName}</td>
            <td>${getLegalStatusLabel(r.services.escorts)}</td>
            <td>${getLegalStatusLabel(r.services.brothels)}</td>
            <td>${r.overallScore || '-'}/5</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <h2>🏙️ Major Cities (${cities.length} total)</h2>
    ${Object.entries(citiesByCountry)
      .slice(0, 8)
      .map(
        ([country, countryCities]) => `
      <h3>${country}</h3>
      <ul class="city-list">
        ${countryCities
          .slice(0, 6)
          .map(
            (c) => `
          <li><strong>${c.name}</strong>${c.hasRedLightDistrict ? ' 🔴' : ''} - ${c.services.slice(0, 3).join(', ')}</li>
        `
          )
          .join('')}
      </ul>
    `
      )
      .join('')}

    <h2>🔴 Red Light Districts (${redLightDistricts.length} total)</h2>
    <table>
      <thead>
        <tr><th>District</th><th>City</th><th>Type</th><th>Status</th></tr>
      </thead>
      <tbody>
        ${redLightDistricts
          .slice(0, 10)
          .map(
            (d) => `
          <tr>
            <td>${d.name}</td>
            <td>${d.city}, ${d.country}</td>
            <td>${d.type}</td>
            <td>${d.legalStatus.replace('-', ' ')}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <h2>🧖 FKK Clubs (${fkkClubs.length} total)</h2>
    <table>
      <thead>
        <tr><th>Club</th><th>City</th><th>Price Range</th></tr>
      </thead>
      <tbody>
        ${fkkClubs
          .slice(0, 10)
          .map(
            (c) => `
          <tr>
            <td>${c.name}</td>
            <td>${c.city}, ${c.country}</td>
            <td>${c.priceRange}</td>
          </tr>
        `
          )
          .join('')}
      </tbody>
    </table>

    <h2>📅 Upcoming Events</h2>
    ${sortedEvents
      .filter((e) => new Date(e.dates.start) >= new Date())
      .slice(0, 8)
      .map(
        (e) => `
      <div class="event-card">
        <span class="event-date">${new Date(e.dates.start).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(e.dates.end).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        <strong>${e.name}</strong> — ${e.location.city}, ${e.location.country}
        ${e.b2bOnly ? '<span class="badge badge-partial">B2B Only</span>' : ''}
      </div>
    `
      )
      .join('')}

    <footer>
      <p><strong>Data Sources:</strong> Euro Sex Scene, EAN Online, Industry Reports</p>
      <p><strong>Disclaimer:</strong> This report is for informational purposes only. Data is estimated and should be verified independently. Laws and regulations may have changed since publication.</p>
      <p>© ${new Date().getFullYear()} Europe Adult Industry Map</p>
    </footer>
  </div>
</body>
</html>`;
}

/**
 * Download HTML content as file
 */
function downloadHtml(html: string, filename: string): void {
  const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Generate and download the adult industry report
 */
export function generateAdultIndustryReport(): void {
  const data: ReportData = {
    generatedAt: new Date(),
    marketStats: MARKET_STATS,
    regulations: COUNTRY_REGULATIONS,
    cities: CITIES,
    events: INDUSTRY_EVENTS,
    redLightDistricts: RED_LIGHT_DISTRICTS,
    fkkClubs: FKK_CLUBS,
  };

  const html = renderAdultIndustryReportTemplate(data);
  const timestamp = new Date().toISOString().split('T')[0];
  downloadHtml(html, `europe-adult-industry-report-${timestamp}.html`);
}

/**
 * Get report preview (for testing without download)
 */
export function getReportPreview(): string {
  const data: ReportData = {
    generatedAt: new Date(),
    marketStats: MARKET_STATS,
    regulations: COUNTRY_REGULATIONS,
    cities: CITIES,
    events: INDUSTRY_EVENTS,
    redLightDistricts: RED_LIGHT_DISTRICTS,
    fkkClubs: FKK_CLUBS,
  };

  return renderAdultIndustryReportTemplate(data);
}
