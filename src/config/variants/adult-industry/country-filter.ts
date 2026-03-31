/**
 * Country Filter Functionality
 *
 * Provides country-based filtering for cities, red light districts, and FKK clubs.
 * Also calculates bounding boxes for map zoom.
 */

import { CITIES, type City } from './data/cities';
import { RED_LIGHT_DISTRICTS, type RedLightDistrict } from './data/red-light-districts';
import { FKK_CLUBS, type FKKClub } from './data/fkk-clubs';

/** Geographic bounds for map viewport */
export interface GeoBounds {
  /** Minimum longitude (west) */
  minLng: number;
  /** Maximum longitude (east) */
  maxLng: number;
  /** Minimum latitude (south) */
  minLat: number;
  /** Maximum latitude (north) */
  maxLat: number;
}

/**
 * Get all unique countries from the data
 * Returns sorted list of country names
 */
export function getAvailableCountries(): string[] {
  const countries = new Set<string>();

  for (const city of CITIES) {
    countries.add(city.country);
  }
  for (const rld of RED_LIGHT_DISTRICTS) {
    countries.add(rld.country);
  }
  for (const fkk of FKK_CLUBS) {
    countries.add(fkk.country);
  }

  return Array.from(countries).sort();
}

/**
 * Filter cities by country
 * @param country - Country name or null for all countries
 */
export function filterCitiesByCountry(country: string | null): City[] {
  if (!country) {
    return CITIES;
  }
  return CITIES.filter((c) => c.country === country);
}

/**
 * Filter red light districts by country
 * @param country - Country name or null for all countries
 */
export function filterRedLightDistrictsByCountry(country: string | null): RedLightDistrict[] {
  if (!country) {
    return RED_LIGHT_DISTRICTS;
  }
  return RED_LIGHT_DISTRICTS.filter((r) => r.country === country);
}

/**
 * Filter FKK clubs by country
 * @param country - Country name or null for all countries
 */
export function filterFKKClubsByCountry(country: string | null): FKKClub[] {
  if (!country) {
    return FKK_CLUBS;
  }
  return FKK_CLUBS.filter((f) => f.country === country);
}

/**
 * Get all data points for a specific country
 * Used for calculating bounds
 */
function getCountryCoordinates(country: string): [number, number][] {
  const coords: [number, number][] = [];

  for (const city of CITIES) {
    if (city.country === country) {
      coords.push(city.coordinates);
    }
  }
  for (const rld of RED_LIGHT_DISTRICTS) {
    if (rld.country === country) {
      coords.push(rld.coordinates);
    }
  }
  for (const fkk of FKK_CLUBS) {
    if (fkk.country === country) {
      coords.push(fkk.coordinates);
    }
  }

  return coords;
}

/**
 * Calculate geographic bounds for a country based on its data points
 * Adds padding around the bounds for better visualization
 *
 * @param country - Country name
 * @returns Geographic bounds or null if no data points found
 */
export function getCountryBounds(country: string): GeoBounds | null {
  const coords = getCountryCoordinates(country);

  if (coords.length === 0) {
    return null;
  }

  let minLng = Infinity;
  let maxLng = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;

  for (const [lng, lat] of coords) {
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
  }

  // Add padding (10% of range, minimum 0.5 degrees)
  const lngRange = maxLng - minLng;
  const latRange = maxLat - minLat;
  const lngPadding = Math.max(lngRange * 0.1, 0.5);
  const latPadding = Math.max(latRange * 0.1, 0.5);

  return {
    minLng: minLng - lngPadding,
    maxLng: maxLng + lngPadding,
    minLat: minLat - latPadding,
    maxLat: maxLat + latPadding,
  };
}

/**
 * Get center point of a country based on its data points
 *
 * @param country - Country name
 * @returns Center coordinates [longitude, latitude] or null
 */
export function getCountryCenter(country: string): [number, number] | null {
  const bounds = getCountryBounds(country);

  if (!bounds) {
    return null;
  }

  return [(bounds.minLng + bounds.maxLng) / 2, (bounds.minLat + bounds.maxLat) / 2];
}

/**
 * Get count of data points by country
 * Returns object mapping country names to total counts
 */
export function getCountryDataCounts(): Record<string, number> {
  const counts: Record<string, number> = {};

  for (const city of CITIES) {
    counts[city.country] = (counts[city.country] || 0) + 1;
  }
  for (const rld of RED_LIGHT_DISTRICTS) {
    counts[rld.country] = (counts[rld.country] || 0) + 1;
  }
  for (const fkk of FKK_CLUBS) {
    counts[fkk.country] = (counts[fkk.country] || 0) + 1;
  }

  return counts;
}

/**
 * Get countries sorted by data count (most data first)
 */
export function getCountriesByDataCount(): string[] {
  const counts = getCountryDataCounts();
  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .map(([country]) => country);
}
