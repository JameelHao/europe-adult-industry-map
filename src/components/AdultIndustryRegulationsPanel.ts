/**
 * Adult Industry Regulations Panel
 *
 * Displays country regulations from static data with service legality matrix.
 * Used by adult-industry variant.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  COUNTRY_REGULATIONS,
  getRegulationsByScore,
  REGULATION_COLORS,
  REGULATION_SCORE_LABELS,
  SERVICE_LEGALITY_ICONS,
  SERVICE_TYPE_LABELS,
  type CountryRegulation,
  type RegulationScore,
  type ServiceLegalityInfo,
} from '@/config/variants/adult-industry/data/regulations';

type ViewMode = 'all' | 'strict' | 'moderate' | 'liberal';

export class AdultIndustryRegulationsPanel extends Panel {
  private viewMode: ViewMode = 'all';
  private regulations: CountryRegulation[] = [];

  constructor(id: string) {
    super({ id, title: 'Regulations by Country', showCount: true });
    this.regulations = COUNTRY_REGULATIONS;
    this.setCount(this.regulations.length);
    this.render();
  }

  private render(): void {
    const content = this.element.querySelector('.panel-content');
    if (!content) return;

    const container = h('div', { className: 'adult-regulations-panel' });

    // Filter toggle
    const filterBar = h('div', { className: 'regulations-filter-bar' });
    const filters: { mode: ViewMode; label: string }[] = [
      { mode: 'all', label: 'All' },
      { mode: 'strict', label: '🔴 Strict' },
      { mode: 'moderate', label: '🟡 Moderate' },
      { mode: 'liberal', label: '🟢 Liberal' },
    ];

    for (const { mode, label } of filters) {
      const btn = h('button', {
        className: `filter-btn ${this.viewMode === mode ? 'active' : ''}`,
        onclick: () => { this.viewMode = mode; this.render(); }
      }, label);
      filterBar.appendChild(btn);
    }
    container.appendChild(filterBar);

    // Get filtered regulations
    let filtered: CountryRegulation[];
    switch (this.viewMode) {
      case 'strict':
        filtered = [...getRegulationsByScore(1), ...getRegulationsByScore(2)];
        break;
      case 'moderate':
        filtered = getRegulationsByScore(3);
        break;
      case 'liberal':
        filtered = [...getRegulationsByScore(4), ...getRegulationsByScore(5)];
        break;
      default:
        filtered = this.regulations;
    }

    // Sort by score (permissive first for better UX)
    filtered = [...filtered].sort((a, b) => b.overallScore - a.overallScore);

    // Regulations list
    const list = h('div', { className: 'regulations-list' });
    for (const reg of filtered) {
      list.appendChild(this.renderRegulationCard(reg));
    }
    container.appendChild(list);

    // Legend
    const legend = h('div', { className: 'regulations-legend' });
    legend.innerHTML = `
      <div class="legend-title">Score: 1 (Strict) → 5 (Liberal)</div>
      <div class="legend-items">
        <span class="legend-item">✅ Legal</span>
        <span class="legend-item">⚠️ Tolerated</span>
        <span class="legend-item">❌ Illegal</span>
      </div>
    `;
    container.appendChild(legend);

    replaceChildren(content, container);
  }

  private renderRegulationCard(reg: CountryRegulation): HTMLElement {
    const score = reg.overallScore as RegulationScore;
    const color = REGULATION_COLORS[score];
    const label = REGULATION_SCORE_LABELS[score];

    // Build service matrix
    const serviceMatrix = this.buildServiceMatrix(reg.services);

    // Special badges
    const badges: string[] = [];
    if (reg.hasRedLightDistricts) badges.push('🔴 Red Light District');
    if (reg.hasFKKClubs) badges.push('🧖 FKK Clubs');

    const card = h('div', { className: 'regulation-card' });
    card.innerHTML = `
      <div class="regulation-header">
        <span class="regulation-country">${reg.countryName}</span>
        <span class="regulation-score" style="background: ${color}">${score}/5</span>
      </div>
      <div class="regulation-label" style="color: ${color}">${label}</div>
      ${badges.length > 0 ? `<div class="regulation-badges">${badges.join(' • ')}</div>` : ''}
      <div class="regulation-services">${serviceMatrix}</div>
      <div class="regulation-summary">${reg.summary}</div>
      ${reg.warnings && reg.warnings.length > 0 ? `
        <div class="regulation-warnings">
          ${reg.warnings.map(w => `⚠️ ${w}`).join('<br>')}
        </div>
      ` : ''}
      <div class="regulation-source">
        <a href="${reg.sourceUrl}" target="_blank" rel="noopener">📖 Source</a>
      </div>
    `;

    return card;
  }

  private buildServiceMatrix(services: ServiceLegalityInfo): string {
    const serviceKeys: (keyof ServiceLegalityInfo)[] = [
      'brothels', 'escorts', 'stripClubs', 'swingerClubs', 'streetProstitution', 'eroticMassage'
    ];

    const items = serviceKeys.map(key => {
      const status = services[key];
      const icon = SERVICE_LEGALITY_ICONS[status];
      const shortLabel = SERVICE_TYPE_LABELS[key];
      return `<span class="service-item" title="${shortLabel}: ${status}">${icon}</span>`;
    });

    return `
      <div class="service-matrix">
        <div class="service-labels">
          ${serviceKeys.map(k => `<span class="svc-label">${SERVICE_TYPE_LABELS[k]}</span>`).join('')}
        </div>
        <div class="service-icons">${items.join('')}</div>
      </div>
    `;
  }

  async refresh(): Promise<void> {
    this.render();
  }
}
