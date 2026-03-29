/**
 * Adult Industry Events Map Layer
 * 
 * Creates a DeckGL ScatterplotLayer for displaying industry events
 * on the map with type-based coloring and size based on proximity.
 */
import { ScatterplotLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import {
  INDUSTRY_EVENTS,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_ICONS,
  getDaysUntilEvent,
  isEventOngoing,
  type IndustryEvent,
  type EventType,
} from '../data/events';

/** Layer ID constant */
export const EVENTS_LAYER_ID = 'adult-industry-events';

/** Convert hex color to RGB array */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [255, 107, 53]; // Default orange
  }
  return [
    Number.parseInt(result[1] ?? 'ff', 16),
    Number.parseInt(result[2] ?? '6b', 16),
    Number.parseInt(result[3] ?? '35', 16),
  ];
}

/** Get color for event type */
function getEventColor(type: EventType): [number, number, number] {
  return hexToRgb(EVENT_TYPE_COLORS[type]);
}

/** Options for events layer creation */
export interface EventsLayerOptions {
  /** Reference date for calculating upcoming events */
  referenceDate?: Date;
  /** Days threshold for highlighting upcoming events */
  upcomingDays?: number;
  /** Filter by event types */
  types?: EventType[];
  /** Filter B2B only events */
  b2bOnly?: boolean;
  /** Visibility */
  visible?: boolean;
  /** Base radius in meters */
  baseRadius?: number;
  /** Click handler */
  onClick?: (info: PickingInfo<IndustryEvent>) => void;
  /** Hover handler */
  onHover?: (info: PickingInfo<IndustryEvent>) => void;
}

/**
 * Create the events ScatterplotLayer
 */
export function createEventsLayer(
  options: EventsLayerOptions = {}
): ScatterplotLayer<IndustryEvent> {
  const {
    referenceDate = new Date(),
    upcomingDays = 30,
    types,
    b2bOnly,
    visible = true,
    baseRadius = 30000,
    onClick,
    onHover,
  } = options;

  // Filter events based on options
  let filteredEvents = [...INDUSTRY_EVENTS];
  
  if (types && types.length > 0) {
    filteredEvents = filteredEvents.filter(e => types.includes(e.type));
  }
  
  if (b2bOnly !== undefined) {
    filteredEvents = filteredEvents.filter(e => e.b2bOnly === b2bOnly);
  }

  return new ScatterplotLayer<IndustryEvent>({
    id: EVENTS_LAYER_ID,
    data: filteredEvents,
    visible,
    pickable: true,
    stroked: true,
    filled: true,
    
    getPosition: (d) => d.location.coordinates,
    
    getRadius: (d) => {
      const daysUntil = getDaysUntilEvent(d, referenceDate);
      const ongoing = isEventOngoing(d, referenceDate);
      
      // Ongoing events are largest
      if (ongoing) {
        return baseRadius * 2;
      }
      
      // Upcoming events (within threshold) are larger
      if (daysUntil >= 0 && daysUntil <= upcomingDays) {
        // Scale: closer events are larger
        const scale = 1 + (1 - daysUntil / upcomingDays);
        return baseRadius * scale;
      }
      
      // Past or far future events
      return baseRadius * 0.8;
    },
    
    getFillColor: (d) => {
      const color = getEventColor(d.type);
      const daysUntil = getDaysUntilEvent(d, referenceDate);
      const ongoing = isEventOngoing(d, referenceDate);
      
      // Full opacity for ongoing/upcoming, reduced for past
      const alpha = ongoing || daysUntil >= 0 ? 200 : 100;
      
      return [...color, alpha] as [number, number, number, number];
    },
    
    getLineColor: (d) => {
      const ongoing = isEventOngoing(d, referenceDate);
      // White border for ongoing events
      return ongoing ? [255, 255, 255, 255] : [50, 50, 50, 150];
    },
    
    lineWidthMinPixels: 2,
    radiusMinPixels: 8,
    radiusMaxPixels: 40,
    
    onClick,
    onHover,
    
    updateTriggers: {
      getRadius: [referenceDate, upcomingDays],
      getFillColor: [referenceDate],
      getLineColor: [referenceDate],
    },
  });
}

/** Format event info for tooltip/popup display */
export function formatEventInfo(event: IndustryEvent, referenceDate: Date = new Date()): string {
  const icon = EVENT_TYPE_ICONS[event.type];
  const typeLabel = EVENT_TYPE_LABELS[event.type];
  const daysUntil = getDaysUntilEvent(event, referenceDate);
  const ongoing = isEventOngoing(event, referenceDate);
  
  const lines = [
    `${icon} **${event.name}**`,
    `📍 ${event.location.venue}, ${event.location.city}, ${event.location.country}`,
    `📅 ${formatDateRange(event.dates.start, event.dates.end)}`,
    `🏷️ ${typeLabel}${event.b2bOnly ? ' (B2B Only)' : ''}`,
  ];
  
  // Status line
  if (ongoing) {
    lines.push('🔴 **HAPPENING NOW**');
  } else if (daysUntil > 0) {
    lines.push(`⏳ ${daysUntil} days until event`);
  } else if (daysUntil < 0) {
    lines.push(`✓ Event ended ${Math.abs(daysUntil)} days ago`);
  }
  
  if (event.attendance) {
    lines.push(`👥 ~${event.attendance.toLocaleString()} expected attendees`);
  }
  
  if (event.description) {
    lines.push('', event.description);
  }
  
  if (event.website) {
    lines.push('', `🔗 ${event.website}`);
  }
  
  return lines.join('\n');
}

/** Format date range for display */
function formatDateRange(start: string, end: string): string {
  const startDate = new Date(start);
  const endDate = new Date(end);
  
  const options: Intl.DateTimeFormatOptions = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };
  
  if (start === end) {
    return startDate.toLocaleDateString('en-US', options);
  }
  
  // Same month
  if (startDate.getMonth() === endDate.getMonth() && startDate.getFullYear() === endDate.getFullYear()) {
    return `${startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}-${endDate.getDate()}, ${endDate.getFullYear()}`;
  }
  
  return `${startDate.toLocaleDateString('en-US', options)} - ${endDate.toLocaleDateString('en-US', options)}`;
}

/** Get legend data for UI display */
export function getEventsLegend(): Array<{ type: EventType; label: string; color: string; icon: string }> {
  return (['trade-show', 'conference', 'awards', 'expo'] as EventType[]).map(type => ({
    type,
    label: EVENT_TYPE_LABELS[type],
    color: EVENT_TYPE_COLORS[type],
    icon: EVENT_TYPE_ICONS[type],
  }));
}

/** Get event statistics */
export function getEventsStats(referenceDate: Date = new Date()): {
  total: number;
  upcoming: number;
  ongoing: number;
  byType: Record<EventType, number>;
  byCountry: Record<string, number>;
} {
  const byType: Record<EventType, number> = {
    'trade-show': 0,
    'conference': 0,
    'awards': 0,
    'expo': 0,
  };
  
  const byCountry: Record<string, number> = {};
  let upcoming = 0;
  let ongoing = 0;
  
  for (const event of INDUSTRY_EVENTS) {
    byType[event.type]++;
    byCountry[event.location.country] = (byCountry[event.location.country] || 0) + 1;
    
    if (isEventOngoing(event, referenceDate)) {
      ongoing++;
    } else if (getDaysUntilEvent(event, referenceDate) > 0) {
      upcoming++;
    }
  }
  
  return {
    total: INDUSTRY_EVENTS.length,
    upcoming,
    ongoing,
    byType,
    byCountry,
  };
}
