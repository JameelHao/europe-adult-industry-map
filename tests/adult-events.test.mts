/**
 * Adult Industry Events Data Tests
 */
import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  INDUSTRY_EVENTS,
  EVENT_TYPE_COLORS,
  EVENT_TYPE_LABELS,
  EVENT_TYPE_ICONS,
  getEventsSortedByDate,
  getEventsByType,
  getUpcomingEvents,
  getEventsWithinDays,
  getB2BEvents,
  getPublicEvents,
  getDaysUntilEvent,
  isEventOngoing,
  getEventById,
  getEventsByCountry,
  getEventCountries,
  type EventType,
} from '../src/config/variants/adult-industry/data/events.js';
import {
  formatEventInfo,
  getEventsLegend,
  getEventsStats,
  EVENTS_LAYER_ID,
} from '../src/config/variants/adult-industry/layers/events-layer.js';

describe('Industry Events Data', () => {
  it('should have at least 10 events', () => {
    assert.ok(INDUSTRY_EVENTS.length >= 10, `Expected >= 10 events, got ${INDUSTRY_EVENTS.length}`);
  });

  it('should have all required fields for each event', () => {
    for (const event of INDUSTRY_EVENTS) {
      assert.ok(event.id, 'Should have id');
      assert.ok(event.name, 'Should have name');
      assert.ok(['trade-show', 'conference', 'awards', 'expo'].includes(event.type), 'Should have valid type');
      assert.ok(event.location.venue, 'Should have venue');
      assert.ok(event.location.city, 'Should have city');
      assert.ok(event.location.country, 'Should have country');
      assert.equal(event.location.coordinates.length, 2, 'Should have coordinates [lng, lat]');
      assert.ok(event.dates.start, 'Should have start date');
      assert.ok(event.dates.end, 'Should have end date');
      assert.equal(typeof event.b2bOnly, 'boolean', 'Should have b2bOnly flag');
    }
  });

  it('should have unique event IDs', () => {
    const ids = INDUSTRY_EVENTS.map(e => e.id);
    const uniqueIds = new Set(ids);
    assert.equal(uniqueIds.size, ids.length, 'All event IDs should be unique');
  });

  it('should have valid coordinates', () => {
    for (const event of INDUSTRY_EVENTS) {
      const [lng, lat] = event.location.coordinates;
      assert.ok(lng >= -180 && lng <= 180, `${event.name}: Longitude should be -180 to 180`);
      assert.ok(lat >= -90 && lat <= 90, `${event.name}: Latitude should be -90 to 90`);
    }
  });

  it('should have valid date formats', () => {
    for (const event of INDUSTRY_EVENTS) {
      const startDate = new Date(event.dates.start);
      const endDate = new Date(event.dates.end);
      assert.ok(!Number.isNaN(startDate.getTime()), `${event.name}: Start date should be valid`);
      assert.ok(!Number.isNaN(endDate.getTime()), `${event.name}: End date should be valid`);
      assert.ok(endDate >= startDate, `${event.name}: End date should be >= start date`);
    }
  });

  it('should cover multiple event types', () => {
    const types = new Set(INDUSTRY_EVENTS.map(e => e.type));
    assert.ok(types.size >= 3, 'Should have at least 3 different event types');
  });

  it('should include major events', () => {
    const names = INDUSTRY_EVENTS.map(e => e.name.toLowerCase());
    assert.ok(names.some(n => n.includes('erofame') || n.includes('ero fame')), 'Should include eroFame');
    assert.ok(names.some(n => n.includes('venus')), 'Should include Venus Berlin');
  });
});

describe('EVENT_TYPE constants', () => {
  it('should have colors for all types', () => {
    const types: EventType[] = ['trade-show', 'conference', 'awards', 'expo'];
    for (const type of types) {
      assert.ok(EVENT_TYPE_COLORS[type], `Should have color for ${type}`);
      assert.match(EVENT_TYPE_COLORS[type], /^#[0-9A-Fa-f]{6}$/, 'Should be valid hex color');
    }
  });

  it('should have labels for all types', () => {
    const types: EventType[] = ['trade-show', 'conference', 'awards', 'expo'];
    for (const type of types) {
      assert.ok(EVENT_TYPE_LABELS[type], `Should have label for ${type}`);
    }
  });

  it('should have icons for all types', () => {
    const types: EventType[] = ['trade-show', 'conference', 'awards', 'expo'];
    for (const type of types) {
      assert.ok(EVENT_TYPE_ICONS[type], `Should have icon for ${type}`);
    }
  });
});

describe('getEventsSortedByDate', () => {
  it('should return events sorted by start date', () => {
    const sorted = getEventsSortedByDate();
    for (let i = 1; i < sorted.length; i++) {
      const prevDate = new Date(sorted[i - 1].dates.start).getTime();
      const currDate = new Date(sorted[i].dates.start).getTime();
      assert.ok(currDate >= prevDate, 'Events should be sorted by date');
    }
  });
});

describe('getEventsByType', () => {
  it('should filter trade shows', () => {
    const tradeShows = getEventsByType('trade-show');
    assert.ok(tradeShows.length > 0, 'Should have trade shows');
    assert.ok(tradeShows.every(e => e.type === 'trade-show'));
  });

  it('should filter awards', () => {
    const awards = getEventsByType('awards');
    assert.ok(awards.length > 0, 'Should have awards events');
    assert.ok(awards.every(e => e.type === 'awards'));
  });
});

describe('getUpcomingEvents', () => {
  it('should return future events from reference date', () => {
    const referenceDate = new Date('2026-01-01');
    const upcoming = getUpcomingEvents(referenceDate);
    assert.ok(upcoming.length > 0, 'Should have upcoming events');
    for (const event of upcoming) {
      const startDate = new Date(event.dates.start);
      assert.ok(startDate >= referenceDate, 'All events should be after reference date');
    }
  });

  it('should be sorted by date', () => {
    const upcoming = getUpcomingEvents(new Date('2026-01-01'));
    for (let i = 1; i < upcoming.length; i++) {
      const prevDate = new Date(upcoming[i - 1].dates.start).getTime();
      const currDate = new Date(upcoming[i].dates.start).getTime();
      assert.ok(currDate >= prevDate, 'Upcoming events should be sorted');
    }
  });
});

describe('getEventsWithinDays', () => {
  it('should return events within 30 days', () => {
    const referenceDate = new Date('2026-10-01');
    const events = getEventsWithinDays(30, referenceDate);
    
    for (const event of events) {
      const startDate = new Date(event.dates.start);
      const daysDiff = (startDate.getTime() - referenceDate.getTime()) / (24 * 60 * 60 * 1000);
      assert.ok(daysDiff >= 0 && daysDiff <= 30, `Event ${event.name} should be within 30 days`);
    }
  });
});

describe('getB2BEvents and getPublicEvents', () => {
  it('should correctly filter B2B events', () => {
    const b2bEvents = getB2BEvents();
    assert.ok(b2bEvents.length > 0, 'Should have B2B events');
    assert.ok(b2bEvents.every(e => e.b2bOnly === true));
  });

  it('should correctly filter public events', () => {
    const publicEvents = getPublicEvents();
    assert.ok(publicEvents.length > 0, 'Should have public events');
    assert.ok(publicEvents.every(e => e.b2bOnly === false));
  });

  it('B2B + public should equal total', () => {
    const b2b = getB2BEvents().length;
    const pub = getPublicEvents().length;
    assert.equal(b2b + pub, INDUSTRY_EVENTS.length);
  });
});

describe('getDaysUntilEvent', () => {
  it('should calculate positive days for future events', () => {
    const event = INDUSTRY_EVENTS.find(e => e.id === 'erofame-2026');
    assert.ok(event);
    const days = getDaysUntilEvent(event, new Date('2026-09-01'));
    assert.ok(days > 0, 'Should have positive days until eroFame from Sept 1');
  });

  it('should calculate negative days for past events', () => {
    const event = INDUSTRY_EVENTS.find(e => e.id === 'erofame-2026');
    assert.ok(event);
    const days = getDaysUntilEvent(event, new Date('2026-11-01'));
    assert.ok(days < 0, 'Should have negative days after event');
  });
});

describe('isEventOngoing', () => {
  it('should return true during event', () => {
    const event = INDUSTRY_EVENTS.find(e => e.id === 'erofame-2026');
    assert.ok(event);
    const ongoing = isEventOngoing(event, new Date('2026-10-08'));
    assert.equal(ongoing, true, 'Should be ongoing during event');
  });

  it('should return false before event', () => {
    const event = INDUSTRY_EVENTS.find(e => e.id === 'erofame-2026');
    assert.ok(event);
    const ongoing = isEventOngoing(event, new Date('2026-10-01'));
    assert.equal(ongoing, false, 'Should not be ongoing before event');
  });
});

describe('getEventById', () => {
  it('should find event by ID', () => {
    const event = getEventById('venus-berlin-2026');
    assert.ok(event, 'Should find Venus Berlin');
    assert.equal(event?.name, 'Venus Berlin');
  });

  it('should return undefined for non-existent ID', () => {
    const event = getEventById('non-existent');
    assert.equal(event, undefined);
  });
});

describe('getEventsByCountry', () => {
  it('should filter by country', () => {
    const germanEvents = getEventsByCountry('Germany');
    assert.ok(germanEvents.length > 0, 'Should have German events');
    assert.ok(germanEvents.every(e => e.location.country === 'Germany'));
  });

  it('should be case insensitive', () => {
    const events1 = getEventsByCountry('germany');
    const events2 = getEventsByCountry('GERMANY');
    assert.equal(events1.length, events2.length);
  });
});

describe('getEventCountries', () => {
  it('should return unique sorted countries', () => {
    const countries = getEventCountries();
    assert.ok(countries.length >= 3, 'Should have at least 3 countries');
    // Check sorted
    const sorted = [...countries].sort();
    assert.deepEqual(countries, sorted, 'Should be sorted');
    // Check unique
    assert.equal(new Set(countries).size, countries.length, 'Should be unique');
  });

  it('should include Germany', () => {
    const countries = getEventCountries();
    assert.ok(countries.includes('Germany'));
  });
});

describe('formatEventInfo', () => {
  it('should format event info correctly', () => {
    const event = getEventById('venus-berlin-2026');
    assert.ok(event);
    const info = formatEventInfo(event, new Date('2026-09-01'));
    assert.ok(info.includes('Venus Berlin'), 'Should include name');
    assert.ok(info.includes('Berlin'), 'Should include city');
    assert.ok(info.includes('Germany'), 'Should include country');
    assert.ok(info.includes('Expo'), 'Should include type');
  });

  it('should show ongoing status', () => {
    const event = getEventById('venus-berlin-2026');
    assert.ok(event);
    const info = formatEventInfo(event, new Date('2026-10-23'));
    assert.ok(info.includes('HAPPENING NOW'), 'Should indicate ongoing');
  });
});

describe('getEventsLegend', () => {
  it('should return legend for all event types', () => {
    const legend = getEventsLegend();
    assert.equal(legend.length, 4, 'Should have 4 event types');
    const types = legend.map(l => l.type);
    assert.ok(types.includes('trade-show'));
    assert.ok(types.includes('conference'));
    assert.ok(types.includes('awards'));
    assert.ok(types.includes('expo'));
  });
});

describe('getEventsStats', () => {
  it('should return correct total', () => {
    const stats = getEventsStats(new Date('2026-01-01'));
    assert.equal(stats.total, INDUSTRY_EVENTS.length);
  });

  it('should have byType counts', () => {
    const stats = getEventsStats();
    let total = 0;
    for (const count of Object.values(stats.byType)) {
      total += count;
    }
    assert.equal(total, stats.total);
  });
});

describe('EVENTS_LAYER_ID', () => {
  it('should have correct layer ID', () => {
    assert.equal(EVENTS_LAYER_ID, 'adult-industry-events');
  });
});
