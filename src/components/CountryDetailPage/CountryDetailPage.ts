/**
 * Country Detail Page Component
 *
 * Renders detailed country information page with
 * summary, cities, venues, and legal status.
 */

import {
  getCountryDetailData,
  type CountryDetailData,
  type CityInfo,
} from '@/config/variants/adult-industry/country-details';
import {
  goToLanding,
  goToCountryMap,
  getCountryToFocus,
} from '@/config/variants/adult-industry/routing';

/**
 * Render the country detail page into the container
 */
export async function renderCountryDetailPage(containerId: string): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[CountryDetailPage] Container #${containerId} not found`);
    return;
  }

  const countryCode = getCountryToFocus();
  if (!countryCode) {
    console.error('[CountryDetailPage] No country code in URL');
    goToLanding();
    return;
  }

  const data = getCountryDetailData(countryCode);
  if (!data) {
    console.error(`[CountryDetailPage] No data for country: ${countryCode}`);
    goToLanding();
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Add country detail page class
  container.classList.add('country-detail-page');

  // Render sections
  container.appendChild(createHeaderSection(data));
  container.appendChild(createSummarySection(data));
  container.appendChild(createCitiesSection(data));
  container.appendChild(createLegalSection(data));
  container.appendChild(createFooterSection());
}

/**
 * Create header section with back button and country info
 */
function createHeaderSection(data: CountryDetailData): HTMLElement {
  const header = document.createElement('header');
  header.className = 'country-detail-header';

  const stars = '⭐'.repeat(data.score);

  header.innerHTML = `
    <div class="country-detail-header-content">
      <button class="country-detail-back-btn" id="backToCountries">
        ← Back to Countries
      </button>
      <div class="country-detail-title">
        <span class="country-detail-flag">${data.flagEmoji}</span>
        <h1 class="country-detail-name">${data.countryName.toUpperCase()}</h1>
      </div>
      <div class="country-detail-rating">
        <span class="country-detail-stars">${stars}</span>
        <span class="country-detail-score-label">${data.scoreLabel}</span>
      </div>
      <div class="country-detail-tags">
        ${data.hasRedLightDistricts ? '<span class="country-detail-tag rld">🔴 Red Light Districts</span>' : ''}
        ${data.hasFKKClubs ? '<span class="country-detail-tag fkk">🧖 FKK Clubs</span>' : ''}
      </div>
    </div>
  `;

  // Bind back button
  header.querySelector('#backToCountries')?.addEventListener('click', () => {
    goToLanding();
  });

  return header;
}

/**
 * Create summary section with description and map button
 */
function createSummarySection(data: CountryDetailData): HTMLElement {
  const section = document.createElement('section');
  section.className = 'country-detail-summary';

  section.innerHTML = `
    <div class="country-detail-summary-content">
      <p class="country-detail-description">${data.summary}</p>
      <div class="country-detail-stats">
        ${data.rldCount > 0 ? `<span class="country-detail-stat">🔴 ${data.rldCount} Red Light District${data.rldCount > 1 ? 's' : ''}</span>` : ''}
        ${data.fkkCount > 0 ? `<span class="country-detail-stat">🧖 ${data.fkkCount} FKK Club${data.fkkCount > 1 ? 's' : ''}</span>` : ''}
        <span class="country-detail-stat">🏙️ ${data.cities.length} Cit${data.cities.length === 1 ? 'y' : 'ies'}</span>
      </div>
      <button class="country-detail-map-btn" id="viewOnMap">
        🗺️ View on Interactive Map
      </button>
    </div>
  `;

  // Bind map button
  section.querySelector('#viewOnMap')?.addEventListener('click', () => {
    goToCountryMap(data.countryCode);
  });

  return section;
}

/**
 * Create cities section with city cards
 */
function createCitiesSection(data: CountryDetailData): HTMLElement {
  const section = document.createElement('section');
  section.className = 'country-detail-cities';

  if (data.cities.length === 0) {
    section.innerHTML = `
      <h2 class="country-detail-section-title">📍 Cities & Districts</h2>
      <p class="country-detail-empty">No cities with adult venues in our database yet.</p>
    `;
    return section;
  }

  section.innerHTML = `
    <h2 class="country-detail-section-title">📍 Cities & Districts</h2>
    <div class="country-detail-cities-grid">
      ${data.cities.slice(0, 12).map(city => createCityCardHTML(city)).join('')}
    </div>
    ${data.cities.length > 12 ? `<p class="country-detail-more">+ ${data.cities.length - 12} more cities</p>` : ''}
  `;

  return section;
}

/**
 * Create city card HTML
 */
function createCityCardHTML(city: CityInfo): string {
  return `
    <div class="country-detail-city-card">
      <h3 class="country-detail-city-name">${city.name}</h3>
      <div class="country-detail-city-stats">
        ${city.rldCount > 0 ? `<span>🔴 ${city.rldCount} RLD</span>` : ''}
        ${city.fkkCount > 0 ? `<span>🧖 ${city.fkkCount} FKK</span>` : ''}
        ${city.rldCount === 0 && city.fkkCount === 0 ? '<span>No venues</span>' : ''}
      </div>
      ${city.population ? `<span class="country-detail-city-pop">${formatPopulation(city.population)}</span>` : ''}
    </div>
  `;
}

/**
 * Format population number
 */
function formatPopulation(pop: number): string {
  if (pop >= 1000000) {
    return `${(pop / 1000000).toFixed(1)}M pop.`;
  }
  if (pop >= 1000) {
    return `${Math.round(pop / 1000)}K pop.`;
  }
  return `${pop} pop.`;
}

/**
 * Create legal status section
 */
function createLegalSection(data: CountryDetailData): HTMLElement {
  const section = document.createElement('section');
  section.className = 'country-detail-legal';

  const { legalStatus } = data;

  section.innerHTML = `
    <h2 class="country-detail-section-title">⚖️ Legal Framework</h2>
    <div class="country-detail-legal-grid">
      ${createLegalItemHTML('Prostitution', legalStatus.prostitutionLegal)}
      ${createLegalItemHTML('Brothels', legalStatus.brothelsLegal)}
      ${createLegalItemHTML('Street Work', legalStatus.streetWorkLegal)}
      ${createLegalItemHTML('Buying', legalStatus.buyingLegal)}
      ${createLegalItemHTML('Advertising', legalStatus.advertisingLegal)}
    </div>
    ${legalStatus.notes ? `<p class="country-detail-legal-notes">Note: ${legalStatus.notes}</p>` : ''}
    <p class="country-detail-legal-disclaimer">
      ⚠️ Laws may vary by region and are subject to change. Always verify current local regulations.
    </p>
  `;

  return section;
}

/**
 * Create legal status item HTML
 */
function createLegalItemHTML(label: string, isLegal: boolean): string {
  const icon = isLegal ? '✅' : '❌';
  const statusClass = isLegal ? 'legal' : 'illegal';
  return `
    <div class="country-detail-legal-item ${statusClass}">
      <span class="country-detail-legal-icon">${icon}</span>
      <span class="country-detail-legal-label">${label}</span>
    </div>
  `;
}

/**
 * Create footer section
 */
function createFooterSection(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'country-detail-footer';
  footer.innerHTML = `
    <div class="country-detail-footer-content">
      <p>Information is for educational purposes only.</p>
      <p>Always verify local laws before visiting any venue.</p>
    </div>
  `;
  return footer;
}

/**
 * Destroy country detail page and clean up
 */
export function destroyCountryDetailPage(containerId: string): void {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
    container.classList.remove('country-detail-page');
  }
}
