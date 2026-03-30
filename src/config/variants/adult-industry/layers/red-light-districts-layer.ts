/**
 * Red Light Districts Layer
 *
 * ScatterplotLayer for displaying red light districts on the map.
 */

import { ScatterplotLayer } from '@deck.gl/layers';
import {
  RED_LIGHT_DISTRICTS,
  type RedLightDistrict,
} from '../data/red-light-districts';

// Layer configuration
const RED_LIGHT_DISTRICTS_LAYER_ID = 'adult-red-light-districts';
const MARKER_COLOR: [number, number, number, number] = [231, 76, 60, 220]; // #e74c3c with alpha
const MARKER_RADIUS = 800; // meters

// Type labels for display
const TYPE_LABELS: Record<RedLightDistrict['type'], string> = {
  windows: '🪟 Window Prostitution',
  street: '🚶 Street Scene',
  clubs: '🎭 Clubs & Shows',
  mixed: '🔀 Mixed',
};

// Legal status labels and colors
const LEGAL_STATUS_LABELS: Record<RedLightDistrict['legalStatus'], string> = {
  'fully-legal': '✅ Fully Legal',
  tolerated: '⚠️ Tolerated',
  'grey-area': '❓ Grey Area',
};

import type { PickingInfo } from '@deck.gl/core';

export interface RedLightDistrictsLayerOptions {
  onClick?: (info: PickingInfo) => void;
}

/**
 * Create the red light districts layer
 */
export function createRedLightDistrictsLayer(
  options: RedLightDistrictsLayerOptions = {}
): ScatterplotLayer<RedLightDistrict> {
  return new ScatterplotLayer<RedLightDistrict>({
    id: RED_LIGHT_DISTRICTS_LAYER_ID,
    data: RED_LIGHT_DISTRICTS,
    pickable: true,
    opacity: 0.8,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: 8,
    radiusMaxPixels: 30,
    lineWidthMinPixels: 2,
    getPosition: (d: RedLightDistrict) => d.coordinates,
    getRadius: () => MARKER_RADIUS,
    getFillColor: () => MARKER_COLOR,
    getLineColor: () => [180, 40, 30, 255], // Darker red outline
    onClick: options.onClick,
  });
}

/**
 * Format red light district popup content
 */
export function formatRedLightDistrictPopup(district: RedLightDistrict): string {
  const parts: string[] = [];

  // Header
  parts.push(`<div class="popup-header">`);
  parts.push(`<h3>🔴 ${district.name}</h3>`);
  parts.push(`<p class="popup-subtitle">${district.city}, ${district.country}</p>`);
  parts.push(`</div>`);

  // Details
  parts.push(`<div class="popup-body">`);

  // Type and legal status
  parts.push(`<p><strong>Type:</strong> ${TYPE_LABELS[district.type]}</p>`);
  parts.push(
    `<p><strong>Status:</strong> ${LEGAL_STATUS_LABELS[district.legalStatus]}</p>`
  );

  // Description
  parts.push(`<p>${district.description}</p>`);

  // Famous for
  if (district.famousFor) {
    parts.push(`<p><strong>Famous for:</strong> ${district.famousFor}</p>`);
  }

  // Open hours
  if (district.openHours) {
    parts.push(`<p><strong>Hours:</strong> ${district.openHours}</p>`);
  }

  // Tips
  if (district.tips && district.tips.length > 0) {
    parts.push(`<p><strong>Tips:</strong></p>`);
    parts.push(`<ul>`);
    for (const tip of district.tips) {
      parts.push(`<li>${tip}</li>`);
    }
    parts.push(`</ul>`);
  }

  // Source link
  if (district.sourceUrl) {
    parts.push(
      `<p><a href="${district.sourceUrl}" target="_blank" rel="noopener">More info →</a></p>`
    );
  }

  parts.push(`</div>`);

  return parts.join('\n');
}

export { RED_LIGHT_DISTRICTS_LAYER_ID };
