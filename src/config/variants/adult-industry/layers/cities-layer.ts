/**
 * Cities Layer for Adult Industry Map
 *
 * Displays 64 European cities with adult industry services.
 */
import { ScatterplotLayer } from '@deck.gl/layers';
import {
  CITIES,
  getCities,
  getCityById,
  SERVICE_ICONS,
  SERVICE_LABELS,
  type City,
  type CityService,
} from '../data/cities';

/** Layer colors based on services */
const CITY_COLORS = {
  withRedLight: [231, 76, 60] as [number, number, number],    // Red for red light districts
  manyServices: [155, 89, 182] as [number, number, number],   // Purple for many services
  fewServices: [52, 152, 219] as [number, number, number],    // Blue for few services
  default: [241, 196, 15] as [number, number, number],        // Yellow default
};

/**
 * Get color for city based on services
 */
function getCityColor(city: City): [number, number, number] {
  if (city.hasRedLightDistrict) {
    return CITY_COLORS.withRedLight;
  }
  if (city.services.length >= 5) {
    return CITY_COLORS.manyServices;
  }
  if (city.services.length >= 3) {
    return CITY_COLORS.fewServices;
  }
  return CITY_COLORS.default;
}

/**
 * Get radius for city based on population/importance
 */
function getCityRadius(city: City): number {
  if (city.hasRedLightDistrict) return 12000;
  if (city.population && city.population > 2000000) return 10000;
  if (city.population && city.population > 1000000) return 8000;
  if (city.services.length >= 5) return 7000;
  return 5000;
}

/**
 * Create DeckGL ScatterplotLayer for cities
 */
export function createCitiesLayer(options?: {
  visible?: boolean;
  opacity?: number;
  data?: City[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: (info: any) => void;
}): ScatterplotLayer<City> {
  const { visible = true, opacity = 0.8, data, onClick } = options || {};

  return new ScatterplotLayer<City>({
    id: 'adult-cities-layer',
    data: data ?? getCities(),
    pickable: true,
    opacity,
    visible,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 4,
    radiusMaxPixels: 25,
    lineWidthMinPixels: 1,
    getPosition: (d: City) => d.coordinates,
    getRadius: (d: City) => getCityRadius(d),
    getFillColor: (d: City) => getCityColor(d),
    getLineColor: [255, 255, 255],
    getLineWidth: 2,
    onClick,
  });
}

/**
 * Format city popup content as HTML
 */
export function formatCityPopup(city: City): string {
  const parts: string[] = [];

  // Header
  parts.push(`<div class="popup-header">`);
  parts.push(`<h3>🏙️ ${city.name}</h3>`);
  parts.push(`<p class="popup-subtitle">${city.country}</p>`);
  parts.push(`</div>`);

  // Body
  parts.push(`<div class="popup-body">`);

  // Red light district badge
  if (city.hasRedLightDistrict) {
    parts.push(`<p class="city-badge"><strong>📍 Has Red Light District</strong></p>`);
  }

  // Services
  if (city.services.length > 0) {
    parts.push(`<p><strong>Services Available:</strong></p>`);
    parts.push(`<div class="city-services">`);
    city.services.forEach((service: CityService) => {
      const icon = SERVICE_ICONS[service] || '•';
      const label = SERVICE_LABELS[service] || service;
      parts.push(`<span class="city-service">✅ ${icon} ${label}</span>`);
    });
    parts.push(`</div>`);
  }

  // Population
  if (city.population) {
    parts.push(`<p>👥 <strong>Population:</strong> ${city.population.toLocaleString()}</p>`);
  }

  // Guide link
  parts.push(
    `<p><a href="${city.guideUrl}" target="_blank" rel="noopener">View Full Guide →</a></p>`
  );

  parts.push(`</div>`);

  return parts.join('\n');
}

/**
 * Get city from layer pick info
 */
export function getCityFromPickInfo(info: { object?: City }): City | undefined {
  return info.object;
}

/**
 * Layer configuration for registry
 */
export const CITIES_LAYER_CONFIG = {
  id: 'adultCities',
  name: 'Cities',
  icon: '🏙️',
  group: 'adult-industry',
  defaultVisible: true,
  description: '64 European cities with adult services',
};

// Re-export for convenience
export { CITIES, getCities, getCityById };
