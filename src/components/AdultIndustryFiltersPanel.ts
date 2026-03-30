/**
 * Adult Industry Filters Panel
 *
 * Filter cities by service type (brothels, escorts, strip clubs, etc.)
 * Uses OR logic: shows cities with ANY selected service.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  type CityService,
  SERVICE_LABELS,
  SERVICE_ICONS,
} from '@/config/variants/adult-industry/data/cities';

/** All available service types for filtering */
const FILTER_SERVICES: CityService[] = [
  'redLightDistrict',
  'escorts',
  'stripClubs',
  'swingerClubs',
  'sexShops',
  'massageParlors',
  'lgbtVenues',
  'adultCinemas',
];

export type FilterChangeCallback = (activeFilters: CityService[]) => void;

export class AdultIndustryFiltersPanel extends Panel {
  private activeFilters: Set<CityService> = new Set();
  private onFilterChange?: FilterChangeCallback;

  constructor(id: string, onFilterChange?: FilterChangeCallback) {
    super({ id, title: 'City Filters', showCount: true });
    this.onFilterChange = onFilterChange;
    this.setCount(0);
    this.render();
  }

  /**
   * Set filter change callback
   */
  setOnFilterChange(callback: FilterChangeCallback): void {
    this.onFilterChange = callback;
  }

  /**
   * Get currently active filters
   */
  getActiveFilters(): CityService[] {
    return Array.from(this.activeFilters);
  }

  /**
   * Check if any filters are active
   */
  hasActiveFilters(): boolean {
    return this.activeFilters.size > 0;
  }

  /**
   * Clear all filters
   */
  clearFilters(): void {
    this.activeFilters.clear();
    this.setCount(0);
    this.render();
    this.notifyChange();
  }

  /**
   * Toggle a service filter
   */
  toggleFilter(service: CityService): void {
    if (this.activeFilters.has(service)) {
      this.activeFilters.delete(service);
    } else {
      this.activeFilters.add(service);
    }
    this.setCount(this.activeFilters.size);
    this.render();
    this.notifyChange();
  }

  private notifyChange(): void {
    if (this.onFilterChange) {
      this.onFilterChange(this.getActiveFilters());
    }
  }

  private render(): void {
    const content = this.element.querySelector('.panel-content');
    if (!content) return;

    const container = h('div', { className: 'filter-panel' });

    // Header with clear button
    if (this.activeFilters.size > 0) {
      const header = h('div', { className: 'filter-header' });
      const clearBtn = h('button', {
        className: 'filter-clear-btn',
        onclick: () => this.clearFilters(),
      });
      clearBtn.textContent = `Clear all (${this.activeFilters.size})`;
      header.appendChild(clearBtn);
      container.appendChild(header);
    }

    // Filter chips
    const chipContainer = h('div', { className: 'filter-chips' });

    for (const service of FILTER_SERVICES) {
      const isActive = this.activeFilters.has(service);
      const chip = h('button', {
        className: `filter-chip ${isActive ? 'active' : ''}`,
        onclick: () => this.toggleFilter(service),
      });

      const icon = SERVICE_ICONS[service] || '📍';
      const label = SERVICE_LABELS[service] || service;

      chip.innerHTML = `
        <span class="filter-chip-icon">${icon}</span>
        <span class="filter-chip-label">${label}</span>
      `;

      chipContainer.appendChild(chip);
    }

    container.appendChild(chipContainer);

    // Info text
    const info = h('div', { className: 'filter-info' });
    if (this.activeFilters.size === 0) {
      info.textContent = 'Select filters to show cities with specific services';
    } else {
      info.textContent = `Showing cities with: ${this.getActiveFilters()
        .map((s) => SERVICE_LABELS[s])
        .join(' or ')}`;
    }
    container.appendChild(info);

    replaceChildren(content, container);
  }
}

/**
 * Filter cities by active service filters (OR logic)
 */
export function filterCitiesByServices<T extends { services: CityService[] }>(
  cities: T[],
  activeFilters: CityService[]
): T[] {
  if (activeFilters.length === 0) {
    return cities;
  }
  return cities.filter((city) =>
    activeFilters.some((filter) => city.services.includes(filter))
  );
}
