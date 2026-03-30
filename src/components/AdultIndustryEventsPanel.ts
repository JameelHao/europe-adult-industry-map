/**
 * Adult Industry Events Panel
 *
 * Displays industry events (trade shows, conferences, awards) from static data.
 * Used by adult-industry variant instead of TechEventsPanel.
 */
import { Panel } from './Panel';
import { h, replaceChildren } from '@/utils/dom-utils';
import {
  getEventsSortedByDate,
  getUpcomingEvents,
  getDaysUntilEvent,
  isEventOngoing,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_ICONS,
  EVENT_TYPE_LABELS,
  type IndustryEvent,
} from '@/config/variants/adult-industry/data/events';

type ViewMode = 'upcoming' | 'all';

export class AdultIndustryEventsPanel extends Panel {
  private viewMode: ViewMode = 'upcoming';
  private events: IndustryEvent[] = [];

  constructor(id: string) {
    super({ id, title: 'Industry Events', showCount: true });
    this.element.classList.add('panel-tall');
    this.loadEvents();
  }

  private loadEvents(): void {
    // Load from static data
    this.events = getEventsSortedByDate();
    const upcoming = getUpcomingEvents();
    this.setCount(upcoming.length);
    this.render();
  }

  private render(): void {
    const content = this.element.querySelector('.panel-content');
    if (!content) return;

    const events = this.viewMode === 'upcoming'
      ? getUpcomingEvents()
      : this.events;

    if (events.length === 0) {
      replaceChildren(content, h('div', { className: 'panel-empty' }, 'No events scheduled'));
      return;
    }

    const container = h('div', { className: 'adult-events-list' });

    // View mode toggle
    const toggleBar = h('div', { className: 'events-toggle-bar' },
      h('button', {
        className: `events-toggle-btn ${this.viewMode === 'upcoming' ? 'active' : ''}`,
        onclick: () => { this.viewMode = 'upcoming'; this.render(); }
      }, 'Upcoming'),
      h('button', {
        className: `events-toggle-btn ${this.viewMode === 'all' ? 'active' : ''}`,
        onclick: () => { this.viewMode = 'all'; this.render(); }
      }, 'All Events'),
    );
    container.appendChild(toggleBar);

    // Events list
    const list = h('div', { className: 'events-list' });
    for (const event of events.slice(0, 20)) {
      list.appendChild(this.renderEventCard(event));
    }
    container.appendChild(list);

    replaceChildren(content, container);
  }

  private renderEventCard(event: IndustryEvent): HTMLElement {
    const daysUntil = getDaysUntilEvent(event);
    const ongoing = isEventOngoing(event);
    const icon = EVENT_TYPE_ICONS[event.type] || '📅';
    const color = EVENT_TYPE_COLORS[event.type] || '#888';
    const typeLabel = EVENT_TYPE_LABELS[event.type] || event.type;

    const startDate = new Date(event.dates.start);
    const dateStr = startDate.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    let statusBadge = '';
    if (ongoing) {
      statusBadge = '<span class="event-badge ongoing">LIVE NOW</span>';
    } else if (daysUntil !== null && daysUntil <= 30) {
      statusBadge = `<span class="event-badge soon">${daysUntil}d</span>`;
    }

    const card = h('div', { className: 'event-card' });
    card.innerHTML = `
      <div class="event-header">
        <span class="event-icon">${icon}</span>
        <span class="event-type" style="color: ${color}">${typeLabel}</span>
        ${statusBadge}
      </div>
      <div class="event-name">${event.name}</div>
      <div class="event-location">📍 ${event.location.city}, ${event.location.country}</div>
      <div class="event-date">📆 ${dateStr}</div>
      ${event.b2bOnly ? '<div class="event-b2b">🔒 B2B Only</div>' : ''}
    `;

    if (event.website) {
      card.style.cursor = 'pointer';
      card.onclick = () => window.open(event.website, '_blank', 'noopener');
    }

    return card;
  }

  async refresh(): Promise<void> {
    this.loadEvents();
  }
}
