/**
 * Adult Industry Regulations Panel
 *
 * Displays country regulations from static data.
 * Used by adult-industry variant.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  COUNTRY_REGULATIONS,
  getRegulationsByScore,
  REGULATION_COLORS,
  REGULATION_SCORE_LABELS,
  type CountryRegulation,
  type RegulationScore,
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

    // Sort by score (strictest first)
    filtered = [...filtered].sort((a, b) => a.overallScore - b.overallScore);

    // Regulations list
    const list = h('div', { className: 'regulations-list' });
    for (const reg of filtered) {
      list.appendChild(this.renderRegulationCard(reg));
    }
    container.appendChild(list);

    // Legend
    const legend = h('div', { className: 'regulations-legend' });
    legend.innerHTML = `
      <div class="legend-title">Score Guide:</div>
      <div class="legend-items">
        <span class="legend-item"><span style="color: ${REGULATION_COLORS[1]}">●</span> 1-2: Strict</span>
        <span class="legend-item"><span style="color: ${REGULATION_COLORS[3]}">●</span> 3: Moderate</span>
        <span class="legend-item"><span style="color: ${REGULATION_COLORS[5]}">●</span> 4-5: Liberal</span>
      </div>
    `;
    container.appendChild(legend);

    replaceChildren(content, container);
  }

  private renderRegulationCard(reg: CountryRegulation): HTMLElement {
    const score = reg.overallScore as RegulationScore;
    const color = REGULATION_COLORS[score];
    const label = REGULATION_SCORE_LABELS[score];

    // Build summary from regulation fields
    const summaryParts: string[] = [];
    if (reg.physicalRetailLegal) summaryParts.push('Retail ✓');
    if (reg.onlineSalesLegal) summaryParts.push('Online ✓');
    if (reg.ageVerificationRequired) summaryParts.push(`Age verify: ${reg.ageVerificationMethod}`);
    const summary = summaryParts.join(' • ') || 'See details';

    const card = h('div', { className: 'regulation-card' });
    card.innerHTML = `
      <div class="regulation-header">
        <span class="regulation-country">${reg.countryName}</span>
        <span class="regulation-score" style="background: ${color}">${score}/5</span>
      </div>
      <div class="regulation-label" style="color: ${color}">${label}</div>
      <div class="regulation-summary">${summary}</div>
      ${reg.notes ? `<div class="regulation-notes">${reg.notes}</div>` : ''}
    `;
    return card;
  }

  async refresh(): Promise<void> {
    this.render();
  }
}
