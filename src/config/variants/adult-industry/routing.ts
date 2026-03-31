/**
 * URL Routing for Adult Industry Variant
 *
 * Provides URL parsing and navigation functions for
 * landing page and country-focused map views.
 */

/** Route parameters parsed from URL */
export interface RouteParams {
  /** View type: null for landing, "map" for full map */
  view: string | null;
  /** Country code to focus on: null or lowercase country code */
  country: string | null;
}

/**
 * Parse route parameters from current URL
 * Works in both browser and SSR environments
 */
export function parseRoute(searchString?: string): RouteParams {
  // Use provided search string or window.location.search if in browser
  const search =
    searchString !== undefined
      ? searchString
      : typeof window !== 'undefined'
        ? window.location.search
        : '';

  const params = new URLSearchParams(search);

  return {
    view: params.get('view'),
    country: params.get('country')?.toLowerCase() || null,
  };
}

/**
 * Check if landing page should be shown
 * Landing page shows when no view or country params are set
 */
export function shouldShowLanding(searchString?: string): boolean {
  const { view, country } = parseRoute(searchString);
  return !view && !country;
}

/**
 * Check if map view should be shown
 * Map shows when view=map or country param is set
 */
export function shouldShowMap(searchString?: string): boolean {
  const { view, country } = parseRoute(searchString);
  return view === 'map' || !!country;
}

/**
 * Get country code to focus on
 * Returns lowercase country code or null
 */
export function getCountryToFocus(searchString?: string): string | null {
  return parseRoute(searchString).country;
}

/**
 * Build URL for country view
 */
export function buildCountryUrl(countryCode: string): string {
  return `/?country=${countryCode.toLowerCase()}`;
}

/**
 * Build URL for map view
 */
export function buildMapUrl(): string {
  return '/?view=map';
}

/**
 * Build URL for landing page
 */
export function buildLandingUrl(): string {
  return '/';
}

/**
 * Navigate to country view (browser only)
 */
export function goToCountry(countryCode: string): void {
  if (typeof window !== 'undefined') {
    window.location.href = buildCountryUrl(countryCode);
  }
}

/**
 * Navigate to full map view (browser only)
 */
export function goToMap(): void {
  if (typeof window !== 'undefined') {
    window.location.href = buildMapUrl();
  }
}

/**
 * Navigate to landing page (browser only)
 */
export function goToLanding(): void {
  if (typeof window !== 'undefined') {
    window.location.href = buildLandingUrl();
  }
}

/**
 * Update URL without page reload using History API (browser only)
 */
export function updateUrlParam(key: string, value: string | null): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);

  if (value === null) {
    url.searchParams.delete(key);
  } else {
    url.searchParams.set(key, value);
  }

  window.history.pushState({}, '', url.toString());
}

/**
 * Clear all route params and go to landing (browser only)
 */
export function clearRouteParams(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  url.search = '';
  window.history.pushState({}, '', url.toString());
}
