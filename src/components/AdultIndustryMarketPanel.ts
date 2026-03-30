/**
 * Adult Industry Market Panel
 *
 * Displays market statistics from static data.
 * Used by adult-industry variant.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  MARKET_STATS,
  getTopCountries,
  formatMarketSize,
  formatPercent,
  type MarketStats,
  type MarketSegment,
} from '@/config/variants/adult-industry/data/market-stats';

export class AdultIndustryMarketPanel extends Panel {
  private stats: MarketStats;

  constructor(id: string) {
    super({ id, title: 'Market Overview', showCount: false });
    this.stats = MARKET_STATS;
    this.render();
  }

  private render(): void {
    const content = this.element.querySelector('.panel-content');
    if (!content) return;

    const container = h('div', { className: 'adult-market-panel' });

    // Main stats
    const statsGrid = h('div', { className: 'market-stats-grid' });
    
    // Global market
    statsGrid.appendChild(this.renderStatCard(
      '🌍',
      'Global Market',
      formatMarketSize(this.stats.globalMarketSizeB),
      `+${formatPercent(this.stats.yoyGrowthPercent)} YoY`
    ));
    
    // EU market
    const euShare = ((this.stats.euMarketSizeB / this.stats.globalMarketSizeB) * 100).toFixed(0);
    statsGrid.appendChild(this.renderStatCard(
      '🇪🇺',
      'EU Market',
      formatMarketSize(this.stats.euMarketSizeB),
      `${euShare}% of global`
    ));

    // E-commerce share
    statsGrid.appendChild(this.renderStatCard(
      '🛒',
      'E-commerce',
      `${formatPercent(this.stats.ecommerceSharePercent)}`,
      'of total sales'
    ));

    container.appendChild(statsGrid);

    // Top segments
    const segments = this.stats.segments.slice(0, 5);
    if (segments.length > 0) {
      const segmentsSection = h('div', { className: 'market-section' });
      segmentsSection.innerHTML = `
        <h4 class="market-section-title">📊 Top Segments</h4>
        <div class="market-segments">
          ${segments.map((s: MarketSegment) => `
            <div class="segment-row">
              <span class="segment-name">${s.name}</span>
              <span class="segment-value">${formatPercent(s.sharePercent)} share</span>
              ${s.growthPercent !== undefined ? `
                <span class="segment-growth ${s.growthPercent >= 0 ? 'positive' : 'negative'}">
                  ${s.growthPercent >= 0 ? '+' : ''}${formatPercent(s.growthPercent)}
                </span>
              ` : ''}
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(segmentsSection);
    }

    // Top countries
    const countries = getTopCountries(5);
    if (countries.length > 0) {
      const countriesSection = h('div', { className: 'market-section' });
      countriesSection.innerHTML = `
        <h4 class="market-section-title">🏆 Top Markets</h4>
        <div class="market-countries">
          ${countries.map((c, i) => `
            <div class="country-row">
              <span class="country-rank">#${i + 1}</span>
              <span class="country-name">${c.country}</span>
              <span class="country-value">${formatPercent(c.sharePercent)}</span>
            </div>
          `).join('')}
        </div>
      `;
      container.appendChild(countriesSection);
    }

    // Data source note
    const note = h('div', { className: 'market-note' });
    note.textContent = `Data: ${this.stats.dataYear} estimates`;
    container.appendChild(note);

    replaceChildren(content, container);
  }

  private renderStatCard(icon: string, label: string, value: string, subtext: string): HTMLElement {
    const card = h('div', { className: 'market-stat-card' });
    card.innerHTML = `
      <div class="stat-icon">${icon}</div>
      <div class="stat-label">${label}</div>
      <div class="stat-value">${value}</div>
      <div class="stat-subtext">${subtext}</div>
    `;
    return card;
  }

  async refresh(): Promise<void> {
    this.render();
  }
}
