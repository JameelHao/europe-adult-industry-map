/**
 * Adult Industry Factories Map Layer
 * 
 * Creates a DeckGL ScatterplotLayer for displaying manufacturing,
 * assembly, and distribution facilities on the map.
 */
import { ScatterplotLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import {
  FACTORIES,
  FACILITY_TYPE_COLORS,
  FACILITY_TYPE_LABELS,
  FACILITY_TYPE_ICONS,
  type Factory,
  type FacilityType,
} from '../data/factories';

/** Layer ID constant */
export const FACTORIES_LAYER_ID = 'adult-industry-factories';

/** Convert hex color to RGB array */
function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [139, 92, 246]; // Default purple
  }
  return [
    Number.parseInt(result[1] ?? '8b', 16),
    Number.parseInt(result[2] ?? '5c', 16),
    Number.parseInt(result[3] ?? 'f6', 16),
  ];
}

/** Get color for facility type */
function getFacilityColor(type: FacilityType): [number, number, number] {
  return hexToRgb(FACILITY_TYPE_COLORS[type]);
}

/** Options for factories layer creation */
export interface FactoriesLayerOptions {
  /** Filter by facility types */
  types?: FacilityType[];
  /** Filter by country */
  country?: string;
  /** Filter by owner brand */
  owner?: string;
  /** Visibility */
  visible?: boolean;
  /** Base radius in meters */
  baseRadius?: number;
  /** Click handler */
  onClick?: (info: PickingInfo<Factory>) => void;
  /** Hover handler */
  onHover?: (info: PickingInfo<Factory>) => void;
}

/**
 * Create the factories ScatterplotLayer
 */
export function createFactoriesLayer(
  options: FactoriesLayerOptions = {}
): ScatterplotLayer<Factory> {
  const {
    types,
    country,
    owner,
    visible = true,
    baseRadius = 25000,
    onClick,
    onHover,
  } = options;

  // Filter factories based on options
  let filteredFactories = [...FACTORIES];
  
  if (types && types.length > 0) {
    filteredFactories = filteredFactories.filter(f => types.includes(f.type));
  }
  
  if (country) {
    filteredFactories = filteredFactories.filter(f => 
      f.country.toLowerCase() === country.toLowerCase()
    );
  }
  
  if (owner) {
    filteredFactories = filteredFactories.filter(f => 
      f.owner?.toLowerCase().includes(owner.toLowerCase())
    );
  }

  return new ScatterplotLayer<Factory>({
    id: FACTORIES_LAYER_ID,
    data: filteredFactories,
    visible,
    pickable: true,
    stroked: true,
    filled: true,
    
    getPosition: (d) => d.coordinates,
    
    getRadius: (d) => {
      // Scale by employee count if available
      if (d.employees) {
        // Scale: 50 employees = base, larger = bigger
        const scale = Math.sqrt(d.employees / 50);
        return baseRadius * Math.min(Math.max(scale, 0.5), 2);
      }
      return baseRadius;
    },
    
    getFillColor: (d) => {
      const color = getFacilityColor(d.type);
      return [...color, 200] as [number, number, number, number];
    },
    
    getLineColor: [255, 255, 255, 200],
    lineWidthMinPixels: 2,
    radiusMinPixels: 8,
    radiusMaxPixels: 30,
    
    onClick,
    onHover,
    
    updateTriggers: {
      getRadius: [baseRadius],
    },
  });
}

/** Format factory info for tooltip/popup display */
export function formatFactoryInfo(factory: Factory): string {
  const icon = FACILITY_TYPE_ICONS[factory.type];
  const typeLabel = FACILITY_TYPE_LABELS[factory.type];
  
  const lines = [
    `${icon} **${factory.name}**`,
    `📍 ${factory.city}, ${factory.country}`,
    `🏷️ ${typeLabel}`,
  ];
  
  if (factory.owner) {
    lines.push(`🏢 Owner: ${factory.owner}`);
  }
  
  if (factory.products && factory.products.length > 0) {
    lines.push(`📦 Products: ${factory.products.join(', ')}`);
  }
  
  if (factory.employees) {
    lines.push(`👥 ~${factory.employees.toLocaleString()} employees`);
  }
  
  if (factory.established) {
    lines.push(`📅 Est. ${factory.established}`);
  }
  
  if (factory.notes) {
    lines.push('', `💡 ${factory.notes}`);
  }
  
  if (factory.website) {
    lines.push('', `🔗 ${factory.website}`);
  }
  
  return lines.join('\n');
}

/** Get legend data for UI display */
export function getFactoriesLegend(): Array<{ type: FacilityType; label: string; color: string; icon: string }> {
  return (['manufacturing', 'assembly', 'distribution'] as FacilityType[]).map(type => ({
    type,
    label: FACILITY_TYPE_LABELS[type],
    color: FACILITY_TYPE_COLORS[type],
    icon: FACILITY_TYPE_ICONS[type],
  }));
}

/** Get factory statistics */
export function getFactoriesStats(): {
  total: number;
  byType: Record<FacilityType, number>;
  byCountry: Record<string, number>;
  totalEmployees: number;
} {
  const byType: Record<FacilityType, number> = {
    'manufacturing': 0,
    'assembly': 0,
    'distribution': 0,
  };
  
  const byCountry: Record<string, number> = {};
  let totalEmployees = 0;
  
  for (const factory of FACTORIES) {
    byType[factory.type]++;
    byCountry[factory.country] = (byCountry[factory.country] || 0) + 1;
    totalEmployees += factory.employees ?? 0;
  }
  
  return {
    total: FACTORIES.length,
    byType,
    byCountry,
    totalEmployees,
  };
}
