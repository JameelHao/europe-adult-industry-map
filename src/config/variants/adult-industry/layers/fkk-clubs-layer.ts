/**
 * FKK Clubs Layer
 *
 * ScatterplotLayer for displaying FKK clubs on the map.
 * Uses orange/sauna themed color.
 */

import { ScatterplotLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import { FKK_CLUBS, type FKKClub } from '../data/fkk-clubs';

// Layer configuration
const FKK_CLUBS_LAYER_ID = 'adult-fkk-clubs';
const MARKER_COLOR: [number, number, number, number] = [255, 152, 0, 220]; // #FF9800 with alpha
const MARKER_RADIUS = 600; // meters

// Price range colors
const PRICE_COLORS: Record<FKKClub['priceRange'], [number, number, number, number]> = {
  '€': [76, 175, 80, 220],    // Green for budget
  '€€': [255, 152, 0, 220],   // Orange for mid-range
  '€€€': [156, 39, 176, 220], // Purple for premium
};

export interface FKKClubsLayerOptions {
  onClick?: (info: PickingInfo) => void;
}

/**
 * Create the FKK clubs layer
 */
export function createFKKClubsLayer(
  options: FKKClubsLayerOptions = {}
): ScatterplotLayer<FKKClub> {
  return new ScatterplotLayer<FKKClub>({
    id: FKK_CLUBS_LAYER_ID,
    data: FKK_CLUBS,
    pickable: true,
    opacity: 0.85,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 6,
    radiusMaxPixels: 20,
    lineWidthMinPixels: 2,
    getPosition: (d: FKKClub) => d.coordinates,
    getRadius: () => MARKER_RADIUS,
    getFillColor: (d: FKKClub) => PRICE_COLORS[d.priceRange] || MARKER_COLOR,
    getLineColor: () => [255, 255, 255, 255], // White outline
    onClick: options.onClick,
  });
}

/**
 * Format FKK club popup content
 */
export function formatFKKClubPopup(club: FKKClub): string {
  const parts: string[] = [];

  // Header
  parts.push(`<div class="popup-header">`);
  parts.push(`<h3>🧖 ${club.name}</h3>`);
  parts.push(`<p class="popup-subtitle">${club.city}, ${club.country}</p>`);
  parts.push(`</div>`);

  // Details
  parts.push(`<div class="popup-body">`);

  // Price and rating
  parts.push(`<p><strong>Price:</strong> ${club.priceRange}</p>`);
  if (club.rating) {
    const stars = '⭐'.repeat(Math.round(club.rating));
    parts.push(`<p><strong>Rating:</strong> ${stars} (${club.rating}/5)</p>`);
  }

  // Description
  if (club.description) {
    parts.push(`<p>${club.description}</p>`);
  }

  // Features
  if (club.features && club.features.length > 0) {
    const featureIcons: Record<string, string> = {
      sauna: '🧖',
      pool: '🏊',
      bar: '🍸',
      rooms: '🛏️',
      garden: '🌳',
      wellness: '💆',
      cinema: '🎬',
      gym: '🏋️',
    };
    const featureList = club.features
      .map((f) => `${featureIcons[f] || '•'} ${f}`)
      .join(', ');
    parts.push(`<p><strong>Features:</strong> ${featureList}</p>`);
  }

  // Open hours
  if (club.openHours) {
    parts.push(`<p><strong>Hours:</strong> ${club.openHours}</p>`);
  }

  // Website link
  if (club.website) {
    parts.push(
      `<p><a href="${club.website}" target="_blank" rel="noopener">Visit Website →</a></p>`
    );
  }

  parts.push(`</div>`);

  return parts.join('\n');
}

export { FKK_CLUBS_LAYER_ID };
