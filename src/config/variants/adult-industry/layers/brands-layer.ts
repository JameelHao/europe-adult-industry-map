/**
 * Adult Industry Brands Map Layer
 * 
 * Creates a DeckGL ScatterplotLayer for displaying brand headquarters
 * on the map with category-based colors.
 */
import { ScatterplotLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import { 
  ADULT_BRANDS, 
  BRAND_CATEGORY_CONFIG,
  type AdultBrand,
  type BrandCategory,
} from '../data/brands';

/** Layer ID constant */
export const BRANDS_LAYER_ID = 'adult-brands';

/** Convert hex color to RGB array */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [255, 107, 157]; // Default pink
  }
  return [
    Number.parseInt(result[1] ?? 'ff', 16),
    Number.parseInt(result[2] ?? '6b', 16),
    Number.parseInt(result[3] ?? '9d', 16),
  ];
}

/** Get color for brand category */
function getCategoryColor(category: BrandCategory): [number, number, number] {
  const config = BRAND_CATEGORY_CONFIG[category];
  return hexToRgb(config.color);
}

/** Options for brands layer creation */
export interface BrandsLayerOptions {
  /** Filter by categories (show all if empty) */
  categories?: BrandCategory[];
  /** Filter by countries (show all if empty) */
  countries?: string[];
  /** Opacity (0-1) */
  opacity?: number;
  /** Point radius in pixels */
  radius?: number;
  /** Visibility */
  visible?: boolean;
  /** Click handler */
  onClick?: (info: PickingInfo<AdultBrand>) => void;
  /** Hover handler */
  onHover?: (info: PickingInfo<AdultBrand>) => void;
}

/**
 * Create the brands ScatterplotLayer
 */
export function createBrandsLayer(options: BrandsLayerOptions = {}): ScatterplotLayer<AdultBrand> {
  const {
    categories = [],
    countries = [],
    opacity = 0.8,
    radius = 8,
    visible = true,
    onClick,
    onHover,
  } = options;

  // Filter data based on options
  let data = ADULT_BRANDS;
  
  if (categories.length > 0) {
    data = data.filter(brand => categories.includes(brand.category));
  }
  
  if (countries.length > 0) {
    data = data.filter(brand => countries.includes(brand.country));
  }

  return new ScatterplotLayer<AdultBrand>({
    id: BRANDS_LAYER_ID,
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
    
    getPosition: (d: AdultBrand) => d.coordinates,
    getRadius: radius,
    getFillColor: (d: AdultBrand) => [...getCategoryColor(d.category), 200],
    getLineColor: [255, 255, 255],
    getLineWidth: 2,
    
    onClick,
    onHover,
    
    // Update triggers for re-rendering when filters change
    updateTriggers: {
      getPosition: [categories, countries],
      getFillColor: [categories],
    },
  });
}

/** Format brand info for tooltip/popup display */
export function formatBrandInfo(brand: AdultBrand): string {
  const categoryConfig = BRAND_CATEGORY_CONFIG[brand.category];
  const lines = [
    `${categoryConfig.icon} **${brand.name}**`,
    `📍 ${brand.city}, ${brand.country}`,
    `🏷️ ${categoryConfig.label}`,
  ];
  
  if (brand.founded) {
    lines.push(`📅 Founded: ${brand.founded}`);
  }
  
  if (brand.description) {
    lines.push(`ℹ️ ${brand.description}`);
  }
  
  if (brand.website) {
    lines.push(`🔗 ${brand.website}`);
  }
  
  return lines.join('\n');
}

/** Get brand by ID */
export function getBrandById(id: string): AdultBrand | undefined {
  return ADULT_BRANDS.find(brand => brand.id === id);
}
