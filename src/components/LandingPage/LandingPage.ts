/**
 * Landing Page Component
 *
 * Renders the landing page with hero section, statistics,
 * and regional country grids for the adult-industry variant.
 */

import {
  getHeroConfig,
  getLandingStatistics,
  getRegionData,
  type RegionData,
  type CountryCardData,
  SCORE_LABELS,
} from '@/config/variants/adult-industry/landing';
import { goToCountry, goToMap, buildMapUrl } from '@/config/variants/adult-industry/routing';

/**
 * Render the landing page into the container
 */
export async function renderLandingPage(containerId: string): Promise<void> {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`[LandingPage] Container #${containerId} not found`);
    return;
  }

  // Clear existing content
  container.innerHTML = '';

  // Add landing page class
  container.classList.add('landing-page');

  // Render sections
  container.appendChild(createHeroSection());
  container.appendChild(createStatisticsSection());

  const regions = getRegionData();
  for (const region of regions) {
    container.appendChild(createRegionSection(region));
  }

  // Add footer
  container.appendChild(createFooterSection());
}

/**
 * Create hero section
 */
function createHeroSection(): HTMLElement {
  const config = getHeroConfig();
  // Note: guideBtn config is for the map header, not used here

  const hero = document.createElement('section');
  hero.className = 'landing-hero';
  hero.innerHTML = `
    <div class="landing-hero-content">
      <h1 class="landing-hero-title">${config.title}</h1>
      <p class="landing-hero-subtitle">${config.subtitle}</p>
      <div class="landing-cta-buttons">
        <button class="landing-cta-primary" data-href="${buildMapUrl()}">
          ${config.primaryCTA.icon} ${config.primaryCTA.text}
        </button>
        ${
          config.secondaryCTA
            ? `
          <button class="landing-cta-secondary" data-scroll="regions">
            ${config.secondaryCTA.icon} ${config.secondaryCTA.text}
          </button>
        `
            : ''
        }
      </div>
    </div>
  `;

  // Bind click events
  hero.querySelector('.landing-cta-primary')?.addEventListener('click', () => {
    goToMap();
  });

  hero.querySelector('.landing-cta-secondary')?.addEventListener('click', () => {
    document.getElementById('regions')?.scrollIntoView({ behavior: 'smooth' });
  });

  return hero;
}

/**
 * Create statistics section
 */
function createStatisticsSection(): HTMLElement {
  const stats = getLandingStatistics();

  const section = document.createElement('section');
  section.className = 'landing-statistics';
  section.innerHTML = `
    <div class="landing-statistics-grid">
      ${stats
        .map(
          (stat) => `
        <div class="landing-stat-card">
          <span class="landing-stat-icon">${stat.icon}</span>
          <span class="landing-stat-value">${stat.value}</span>
          <span class="landing-stat-label">${stat.label}</span>
        </div>
      `
        )
        .join('')}
    </div>
  `;

  return section;
}

/**
 * Create region section
 */
function createRegionSection(region: RegionData): HTMLElement {
  const section = document.createElement('section');
  section.className = 'landing-region';
  if (region.key === 'north') {
    section.id = 'regions';
  }

  section.innerHTML = `
    <div class="landing-region-header">
      <h2 class="landing-region-title">${region.title}</h2>
      <p class="landing-region-subtitle">${region.subtitle}</p>
      <span class="landing-region-count">${region.countryCount} Countries</span>
    </div>
    <div class="landing-country-grid">
      ${region.cards.map((card) => createCountryCardHTML(card)).join('')}
    </div>
  `;

  // Bind country card clicks
  section.querySelectorAll('.landing-country-card').forEach((cardEl) => {
    cardEl.addEventListener('click', () => {
      const code = (cardEl as HTMLElement).dataset.country;
      if (code) goToCountry(code);
    });
  });

  return section;
}

/**
 * Create country card HTML
 */
function createCountryCardHTML(card: CountryCardData): string {
  const stars = '⭐'.repeat(card.score);
  const scoreLabel = SCORE_LABELS[card.score] || '';

  return `
    <div class="landing-country-card" data-country="${card.countryCode.toLowerCase()}">
      <div class="landing-card-flag">${card.flagEmoji}</div>
      <h3 class="landing-card-name">${card.countryName}</h3>
      <div class="landing-card-rating">
        <span class="landing-card-stars">${stars}</span>
        <span class="landing-card-score-label">${scoreLabel}</span>
      </div>
      <div class="landing-card-features">
        ${card.hasRedLightDistricts ? '<span class="landing-feature-tag rld">🔴 Red Light</span>' : ''}
        ${card.hasFKKClubs ? '<span class="landing-feature-tag fkk">🧖 FKK</span>' : ''}
      </div>
      ${card.cityCount > 0 ? `<span class="landing-card-cities">${card.cityCount} cities</span>` : ''}
    </div>
  `;
}

/**
 * Create footer section
 */
function createFooterSection(): HTMLElement {
  const footer = document.createElement('footer');
  footer.className = 'landing-footer';
  footer.innerHTML = `
    <div class="landing-footer-content">
      <p>© ${new Date().getFullYear()} Europe Adult Industry Map</p>
      <p class="landing-footer-disclaimer">
        Information is for educational purposes only. 
        Always verify local laws before visiting any venue.
      </p>
    </div>
  `;

  return footer;
}

/**
 * Destroy landing page and clean up
 */
export function destroyLandingPage(containerId: string): void {
  const container = document.getElementById(containerId);
  if (container) {
    container.innerHTML = '';
    container.classList.remove('landing-page');
  }
}
