/**
 * HTML Report Template
 * 
 * Professional report template for Europe Adult Industry data export.
 * Supports print-friendly styling and responsive layout.
 */

/** Report data structure */
export interface ReportData {
  /** Report generation date */
  generatedDate: string;
  /** Data last updated date */
  dataDate: string;
  /** Total brands count */
  brandCount: number;
  /** Total retailers count */
  retailerCount: number;
  /** Countries covered count */
  countryCount: number;
  /** Events count */
  eventCount: number;
  /** Brand rows HTML */
  brandsTableRows: string;
  /** Retailers rows HTML */
  retailersTableRows: string;
  /** Regulations rows HTML */
  regulationsTableRows: string;
  /** Events rows HTML */
  eventsTableRows: string;
  /** Map screenshot as base64 data URL (optional) */
  mapScreenshot?: string;
}

/** CSS styles for the report */
const REPORT_CSS = `
  * {
    box-sizing: border-box;
  }
  
  body {
    font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0;
    color: #333;
    line-height: 1.6;
    background: #fff;
  }
  
  .header {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
    color: white;
    padding: 40px;
    text-align: center;
    border-radius: 0 0 8px 8px;
  }
  
  .header h1 {
    margin: 0 0 10px 0;
    font-size: 2rem;
    font-weight: 700;
  }
  
  .header .subtitle {
    margin: 0;
    opacity: 0.8;
    font-size: 0.95rem;
  }
  
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
    margin: 30px 0;
    padding: 0 20px;
  }
  
  .stat-card {
    background: #f8f9fa;
    border-radius: 8px;
    padding: 20px;
    text-align: center;
    border: 1px solid #e9ecef;
  }
  
  .stat-value {
    font-size: 2rem;
    font-weight: 700;
    color: #1a1a2e;
  }
  
  .stat-label {
    font-size: 0.85rem;
    color: #666;
    margin-top: 5px;
  }
  
  .section {
    margin: 40px 20px;
    padding: 20px 0;
    border-bottom: 1px solid #eee;
  }
  
  .section:last-of-type {
    border-bottom: none;
  }
  
  .section h2 {
    font-size: 1.4rem;
    color: #1a1a2e;
    margin: 0 0 20px 0;
    padding-bottom: 10px;
    border-bottom: 2px solid #e0e0e0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.9rem;
  }
  
  thead {
    background: #f8f9fa;
  }
  
  th {
    padding: 12px;
    text-align: left;
    font-weight: 600;
    color: #1a1a2e;
    border-bottom: 2px solid #dee2e6;
  }
  
  td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #eee;
  }
  
  tr:hover {
    background: #f8f9fa;
  }
  
  .map-container {
    margin: 20px 0;
    text-align: center;
  }
  
  .map-container img {
    max-width: 100%;
    border-radius: 8px;
    border: 1px solid #e9ecef;
  }
  
  .map-caption {
    font-size: 0.85rem;
    color: #666;
    margin-top: 10px;
    font-style: italic;
  }
  
  .score-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-weight: 600;
    font-size: 0.85rem;
  }
  
  .score-1 { background: #fee2e2; color: #dc2626; }
  .score-2 { background: #ffedd5; color: #ea580c; }
  .score-3 { background: #fef3c7; color: #d97706; }
  .score-4 { background: #d1fae5; color: #059669; }
  .score-5 { background: #bbf7d0; color: #16a34a; }
  
  .event-type {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: 500;
  }
  
  .event-trade-show { background: #ffedd5; color: #c2410c; }
  .event-conference { background: #ccfbf1; color: #0d9488; }
  .event-awards { background: #fef9c3; color: #a16207; }
  .event-expo { background: #f3e8ff; color: #7e22ce; }
  
  footer {
    text-align: center;
    padding: 30px 20px;
    color: #666;
    font-size: 0.85rem;
    border-top: 1px solid #eee;
    margin-top: 40px;
  }
  
  footer p {
    margin: 5px 0;
  }
  
  .disclaimer {
    font-style: italic;
    color: #999;
  }
  
  /* Print styles */
  @media print {
    body {
      max-width: 100%;
      padding: 0;
    }
    
    .header {
      background: #1a1a2e !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .stat-card {
      background: #f8f9fa !important;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .section {
      page-break-inside: avoid;
    }
    
    table {
      page-break-inside: auto;
    }
    
    tr {
      page-break-inside: avoid;
      page-break-after: auto;
    }
    
    .no-print {
      display: none !important;
    }
  }
  
  @media (max-width: 768px) {
    .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
    
    .header {
      padding: 30px 20px;
    }
    
    .header h1 {
      font-size: 1.5rem;
    }
    
    table {
      font-size: 0.8rem;
    }
    
    th, td {
      padding: 8px;
    }
  }
`;

/**
 * Generate the full HTML report
 */
export function renderReportHtml(data: ReportData): string {
  const mapSection = data.mapScreenshot
    ? `
    <section class="section" id="map">
      <h2>🗺️ Industry Distribution Map</h2>
      <div class="map-container">
        <img src="${data.mapScreenshot}" alt="Europe Adult Industry Map" />
        <p class="map-caption">Geographic distribution of brands, retailers, and regulations</p>
      </div>
    </section>
    `
    : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Europe Adult Industry Report - ${data.generatedDate}</title>
  <style>${REPORT_CSS}</style>
</head>
<body>
  <header class="header">
    <h1>🌍 Europe Adult Industry Report</h1>
    <p class="subtitle">Generated: ${data.generatedDate} | Data as of: ${data.dataDate}</p>
  </header>

  <div class="stats-grid">
    <div class="stat-card">
      <div class="stat-value">${data.brandCount}</div>
      <div class="stat-label">Brands</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${data.retailerCount}</div>
      <div class="stat-label">Retailers</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${data.countryCount}</div>
      <div class="stat-label">Countries</div>
    </div>
    <div class="stat-card">
      <div class="stat-value">${data.eventCount}</div>
      <div class="stat-label">Events</div>
    </div>
  </div>

  ${mapSection}

  <section class="section" id="brands">
    <h2>🏢 Major Brands</h2>
    <table>
      <thead>
        <tr>
          <th>Brand</th>
          <th>Country</th>
          <th>Category</th>
          <th>Founded</th>
          <th>Website</th>
        </tr>
      </thead>
      <tbody>
        ${data.brandsTableRows}
      </tbody>
    </table>
  </section>

  <section class="section" id="retailers">
    <h2>🏪 Major Retailers</h2>
    <table>
      <thead>
        <tr>
          <th>Retailer</th>
          <th>Country</th>
          <th>Type</th>
          <th>Locations</th>
        </tr>
      </thead>
      <tbody>
        ${data.retailersTableRows}
      </tbody>
    </table>
  </section>

  <section class="section" id="regulations">
    <h2>⚖️ Regulatory Landscape</h2>
    <table>
      <thead>
        <tr>
          <th>Country</th>
          <th>Score</th>
          <th>Physical Retail</th>
          <th>Online Sales</th>
          <th>Advertising</th>
        </tr>
      </thead>
      <tbody>
        ${data.regulationsTableRows}
      </tbody>
    </table>
  </section>

  <section class="section" id="events">
    <h2>📅 Upcoming Events</h2>
    <table>
      <thead>
        <tr>
          <th>Event</th>
          <th>Type</th>
          <th>Location</th>
          <th>Dates</th>
          <th>B2B Only</th>
        </tr>
      </thead>
      <tbody>
        ${data.eventsTableRows}
      </tbody>
    </table>
  </section>

  <footer>
    <p><strong>Europe Adult Industry Map</strong></p>
    <p>Data sources: XBIZ, EAN Online, public records, industry reports</p>
    <p class="disclaimer">Disclaimer: This report is for informational purposes only. Data accuracy is not guaranteed.</p>
  </footer>
</body>
</html>`;
}

/**
 * Escape HTML special characters
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (char) => map[char] ?? char);
}

/**
 * Format score badge HTML
 */
export function formatScoreBadge(score: number): string {
  return `<span class="score-badge score-${score}">${score}/5</span>`;
}

/**
 * Format event type badge HTML
 */
export function formatEventTypeBadge(type: string): string {
  const typeClass = type.replace(/\s+/g, '-').toLowerCase();
  return `<span class="event-type event-${typeClass}">${type}</span>`;
}

/**
 * Format boolean as checkmark or cross
 */
export function formatBoolean(value: boolean): string {
  return value ? '✅' : '❌';
}

/**
 * Format date for display
 */
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
