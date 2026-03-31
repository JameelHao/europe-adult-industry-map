/**
 * Venue Card Component
 *
 * Rich card display for venue information with ratings,
 * prices, status, and external links.
 */

import type { VenueDetail } from '@/config/variants/adult-industry/country-details';

/**
 * Get price level description
 */
export function getPriceDescription(level: string): string {
  const prices: Record<string, string> = {
    '€': '(Budget, €10-30)',
    '€€': '(Moderate, €30-60)',
    '€€€': '(Upscale, €60-100)',
    '€€€€': '(Luxury, €100+)',
  };
  return prices[level] || '';
}

/**
 * Get status icon
 */
export function getStatusIcon(status: string): string {
  switch (status) {
    case 'Active':
      return '✅';
    case 'Closed':
      return '❌';
    case 'Restricted':
      return '⚠️';
    default:
      return '';
  }
}

/**
 * Build Google Maps URL from coordinates
 */
export function buildGoogleMapsUrl(coords: [number, number]): string {
  // coords are [longitude, latitude], Google Maps expects lat,lng
  return `https://www.google.com/maps/search/?api=1&query=${coords[1]},${coords[0]}`;
}

/**
 * Generate star rating display
 */
function renderRating(rating: number): string {
  const fullStars = Math.round(rating);
  return '⭐'.repeat(fullStars);
}

/**
 * Create a venue card element
 */
export function createVenueCard(venue: VenueDetail): HTMLElement {
  const card = document.createElement('div');
  card.className = `venue-card ${venue.status.toLowerCase()}`;

  // Build rating HTML if available
  const ratingHtml = venue.rating
    ? `<div class="venue-rating">${renderRating(venue.rating)} (${venue.rating}/5)</div>`
    : '';

  // Build price HTML if available
  const priceHtml = venue.priceLevel
    ? `<div class="venue-price">${venue.priceLevel} ${getPriceDescription(venue.priceLevel)}</div>`
    : '';

  // Build note HTML if available
  const noteHtml = venue.note ? `<p class="venue-note">${venue.note}</p>` : '';

  // Build action links
  const websiteLink = venue.websiteUrl
    ? `<a href="${venue.websiteUrl}" target="_blank" rel="noopener noreferrer" class="venue-link">🌐 Website</a>`
    : '';

  const mapsLink = venue.coordinates
    ? `<a href="${buildGoogleMapsUrl(venue.coordinates)}" target="_blank" rel="noopener noreferrer" class="venue-link">🗺️ Google Maps</a>`
    : '';

  // Check if we have any links to display
  const hasLinks = websiteLink || mapsLink;
  const actionsHtml = hasLinks
    ? `<div class="venue-actions">${websiteLink}${mapsLink}</div>`
    : '';

  card.innerHTML = `
    <div class="venue-header">
      <h3 class="venue-name">${venue.name}</h3>
      <span class="venue-type">${venue.type}</span>
    </div>
    <div class="venue-body">
      <p class="venue-location">📍 ${venue.location}</p>
      ${ratingHtml}
      ${priceHtml}
      <div class="venue-status ${venue.status.toLowerCase()}">
        ${getStatusIcon(venue.status)} ${venue.status}
      </div>
      ${noteHtml}
    </div>
    ${actionsHtml}
  `;

  return card;
}

/**
 * Create a grid of venue cards
 */
export function createVenueGrid(venues: VenueDetail[]): HTMLElement {
  const grid = document.createElement('div');
  grid.className = 'venue-grid';

  for (const venue of venues) {
    grid.appendChild(createVenueCard(venue));
  }

  return grid;
}
