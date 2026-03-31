/**
 * Adult Industry Search Functionality
 *
 * Provides search functionality for cities, red light districts, and FKK clubs.
 * Used by search UI components to find and navigate to locations.
 */

import { CITIES } from './data/cities';
import { RED_LIGHT_DISTRICTS } from './data/red-light-districts';
import { FKK_CLUBS } from './data/fkk-clubs';

/** Search result item types */
export type SearchItemType = 'city' | 'rld' | 'fkk';

/** Search result item */
export interface SearchItem {
  /** Item type */
  type: SearchItemType;
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** City name (for RLD and FKK) */
  city?: string;
  /** Country name */
  country: string;
  /** Coordinates [longitude, latitude] */
  coordinates: [number, number];
}

/** Type icons for display */
export const SEARCH_TYPE_ICONS: Record<SearchItemType, string> = {
  city: '🏙️',
  rld: '🔴',
  fkk: '🧖',
};

/** Type labels for display */
export const SEARCH_TYPE_LABELS: Record<SearchItemType, string> = {
  city: 'City',
  rld: 'Red Light District',
  fkk: 'FKK Club',
};

/**
 * Get all searchable items from adult industry data
 */
export function getSearchableItems(): SearchItem[] {
  const items: SearchItem[] = [];

  // Add cities
  for (const city of CITIES) {
    items.push({
      type: 'city',
      id: city.id,
      name: city.name,
      country: city.country,
      coordinates: city.coordinates,
    });
  }

  // Add red light districts
  for (const rld of RED_LIGHT_DISTRICTS) {
    items.push({
      type: 'rld',
      id: rld.id,
      name: rld.name,
      city: rld.city,
      country: rld.country,
      coordinates: rld.coordinates,
    });
  }

  // Add FKK clubs
  for (const fkk of FKK_CLUBS) {
    items.push({
      type: 'fkk',
      id: fkk.id,
      name: fkk.name,
      city: fkk.city,
      country: fkk.country,
      coordinates: fkk.coordinates,
    });
  }

  return items;
}

/**
 * Search adult industry items by query string
 * Case-insensitive partial matching on name, city, and country
 *
 * @param query - Search query string
 * @param limit - Maximum number of results (default: 10)
 * @returns Matching search items sorted by relevance
 */
export function searchAdultIndustryItems(query: string, limit = 10): SearchItem[] {
  if (!query || query.trim().length === 0) {
    return [];
  }

  const normalizedQuery = query.toLowerCase().trim();
  const items = getSearchableItems();

  // Score and filter items
  const scored = items
    .map((item) => {
      let score = 0;
      const nameLower = item.name.toLowerCase();
      const cityLower = item.city?.toLowerCase() || '';
      const countryLower = item.country.toLowerCase();

      // Exact name match (highest priority)
      if (nameLower === normalizedQuery) {
        score = 100;
      }
      // Name starts with query
      else if (nameLower.startsWith(normalizedQuery)) {
        score = 80;
      }
      // Name contains query
      else if (nameLower.includes(normalizedQuery)) {
        score = 60;
      }
      // City starts with query
      else if (cityLower.startsWith(normalizedQuery)) {
        score = 50;
      }
      // City contains query
      else if (cityLower.includes(normalizedQuery)) {
        score = 40;
      }
      // Country starts with query
      else if (countryLower.startsWith(normalizedQuery)) {
        score = 30;
      }
      // Country contains query
      else if (countryLower.includes(normalizedQuery)) {
        score = 20;
      }

      // Boost cities slightly as they're more commonly searched
      if (item.type === 'city' && score > 0) {
        score += 5;
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ item }) => item);

  return scored;
}

/**
 * Format search item for display
 */
export function formatSearchItem(item: SearchItem): string {
  const icon = SEARCH_TYPE_ICONS[item.type];
  if (item.city) {
    return `${icon} ${item.name}, ${item.city}`;
  }
  return `${icon} ${item.name}, ${item.country}`;
}

/**
 * Get search item by ID and type
 */
export function getSearchItemById(id: string, type: SearchItemType): SearchItem | undefined {
  const items = getSearchableItems();
  return items.find((item) => item.id === id && item.type === type);
}
