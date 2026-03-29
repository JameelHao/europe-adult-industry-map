/**
 * Adult Industry Retailers Map Layer
 * 
 * Creates a DeckGL ScatterplotLayer for displaying retailer locations
 * on the map with type-based colors.
 */
import { ScatterplotLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import { 
  ADULT_RETAILERS, 
  RETAILER_TYPE_CONFIG,
  type AdultRetailer,
  type RetailerType,
} from '../data/retailers';

/** Layer ID constant */
export const RETAILERS_LAYER_ID = 'adult-retailers';

/** Convert hex color to RGB array */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [52, 152, 219]; // Default blue
  }
  return [
    Number.parseInt(result[1] ?? '34', 16),
    Number.parseInt(result[2] ?? '98', 16),
    Number.parseInt(result[3] ?? 'db', 16),
  ];
}

/** Get color for retailer type */
function getTypeColor(type: RetailerType): [number, number, number] {
  const config = RETAILER_TYPE_CONFIG[type];
  return hexToRgb(config.color);
}

/** Options for retailers layer creation */
export interface RetailersLayerOptions {
  /** Filter by types (show all if empty) */
  types?: RetailerType[];
  /** Filter by countries (show all if empty) */
  countries?: string[];
  /** Opacity (0-1) */
  opacity?: number;
  /** Point radius in pixels */
  radius?: number;
  /** Visibility */
  visible?: boolean;
  /** Click handler */
  onClick?: (info: PickingInfo<AdultRetailer>) => void;
  /** Hover handler */
  onHover?: (info: PickingInfo<AdultRetailer>) => void;
}

/**
 * Create the retailers ScatterplotLayer
 */
export function createRetailersLayer(options: RetailersLayerOptions = {}): ScatterplotLayer<AdultRetailer> {
  const {
    types = [],
    countries = [],
    opacity = 0.8,
    radius = 8,
    visible = true,
    onClick,
    onHover,
  } = options;

  // Filter data based on options
  let data = ADULT_RETAILERS;
  
  if (types.length > 0) {
    data = data.filter(retailer => types.includes(retailer.type));
  }
  
  if (countries.length > 0) {
    data = data.filter(retailer => countries.includes(retailer.country));
  }

  return new ScatterplotLayer<AdultRetailer>({
    id: RETAILERS_LAYER_ID,
    data,
    visible,
    pickable: true,
    opacity,
    stroked: true,
    filled: true,
    radiusScale: 1,
    radiusMinPixels: radius,
    radiusMaxPixels: radius * 2,
    lineWidthMinPixels: 1,
    
    getPosition: (d: AdultRetailer) => d.coordinates,
    getRadius: (d: AdultRetailer) => {
      // Larger radius for chains with more stores
      if (d.type === 'chain' && d.storeCount) {
        return radius + Math.min(d.storeCount / 20, 4);
      }
      return radius;
    },
    getFillColor: (d: AdultRetailer) => [...getTypeColor(d.type), 200],
    getLineColor: [255, 255, 255],
    getLineWidth: 2,
    
    onClick,
    onHover,
    
    // Update triggers for re-rendering when filters change
    updateTriggers: {
      getPosition: [types, countries],
      getFillColor: [types],
      getRadius: [types],
    },
  });
}

/** Format retailer info for tooltip/popup display */
export function formatRetailerInfo(retailer: AdultRetailer): string {
  const typeConfig = RETAILER_TYPE_CONFIG[retailer.type];
  const lines = [
    `${typeConfig.icon} **${retailer.name}**`,
    `📍 ${retailer.city}, ${retailer.country}`,
    `🏷️ ${typeConfig.label}`,
  ];
  
  if (retailer.storeCount) {
    lines.push(`🏬 ${retailer.storeCount} stores`);
  }
  
  if (retailer.founded) {
    lines.push(`📅 Founded: ${retailer.founded}`);
  }
  
  if (retailer.description) {
    lines.push(`ℹ️ ${retailer.description}`);
  }
  
  if (retailer.website) {
    lines.push(`🔗 ${retailer.website}`);
  }
  
  return lines.join('\n');
}

/** Get retailer by ID */
export function getRetailerById(id: string): AdultRetailer | undefined {
  return ADULT_RETAILERS.find(retailer => retailer.id === id);
}
