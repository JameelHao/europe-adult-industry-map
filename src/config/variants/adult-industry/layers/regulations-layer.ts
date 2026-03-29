/**
 * Adult Industry Regulations Heat Map Layer
 * 
 * Creates a DeckGL GeoJsonLayer for displaying regulatory environment
 * across European countries as a heat map.
 */
import { GeoJsonLayer } from '@deck.gl/layers';
import type { PickingInfo } from '@deck.gl/core';
import { 
  COUNTRY_REGULATIONS, 
  REGULATION_COLORS,
  REGULATION_SCORE_LABELS,
  getRegulationByCode,
  type CountryRegulation,
  type RegulationScore,
} from '../data/regulations';

/** Layer ID constant */
export const REGULATIONS_LAYER_ID = 'adult-regulations-heatmap';

/** Convert hex color to RGBA array */
function hexToRgba(hex: string, alpha = 200): [number, number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) {
    return [255, 204, 0, alpha]; // Default yellow
  }
  return [
    Number.parseInt(result[1] ?? 'ff', 16),
    Number.parseInt(result[2] ?? 'cc', 16),
    Number.parseInt(result[3] ?? '00', 16),
    alpha,
  ];
}

/** Get color for regulation score */
function getScoreColor(score: RegulationScore, alpha = 150): [number, number, number, number] {
  const hex = REGULATION_COLORS[score];
  return hexToRgba(hex, alpha);
}

/** Default color for countries without data */
const DEFAULT_COLOR: [number, number, number, number] = [128, 128, 128, 100];

/** GeoJSON feature properties expected from country boundaries */
interface CountryFeatureProperties {
  ISO_A2?: string;
  iso_a2?: string;
  ISO_A3?: string;
  iso_a3?: string;
  NAME?: string;
  name?: string;
  ADMIN?: string;
  admin?: string;
}

/** Options for regulations layer creation */
export interface RegulationsLayerOptions {
  /** GeoJSON data URL or object */
  geoJsonUrl?: string;
  /** Opacity (0-1) */
  opacity?: number;
  /** Minimum score to show (filter) */
  minScore?: RegulationScore;
  /** Maximum score to show (filter) */
  maxScore?: RegulationScore;
  /** Visibility */
  visible?: boolean;
  /** Click handler */
  onClick?: (info: PickingInfo<CountryFeatureProperties>) => void;
  /** Hover handler */
  onHover?: (info: PickingInfo<CountryFeatureProperties>) => void;
}

/** Get country code from GeoJSON feature properties */
function getCountryCodeFromProperties(properties: CountryFeatureProperties): string | undefined {
  return properties.ISO_A2 || properties.iso_a2;
}

/**
 * Create the regulations GeoJsonLayer
 * 
 * Note: Requires a GeoJSON data source with European country boundaries.
 * Each feature should have ISO_A2 or iso_a2 property for country matching.
 */
export function createRegulationsLayer(
  geoJsonData: string | GeoJSON.FeatureCollection | GeoJSON.Feature[],
  options: RegulationsLayerOptions = {}
): GeoJsonLayer {
  const {
    opacity = 0.5,
    minScore,
    maxScore,
    visible = true,
    onClick,
    onHover,
  } = options;

  return new GeoJsonLayer({
    id: REGULATIONS_LAYER_ID,
    data: geoJsonData,
    visible,
    pickable: true,
    stroked: true,
    filled: true,
    lineWidthMinPixels: 1,
    
    getFillColor: (feature) => {
      const properties = feature.properties as CountryFeatureProperties;
      const countryCode = getCountryCodeFromProperties(properties);
      
      if (!countryCode) {
        return DEFAULT_COLOR;
      }
      
      const regulation = getRegulationByCode(countryCode);
      
      if (!regulation) {
        return DEFAULT_COLOR;
      }
      
      // Apply score filters if specified
      if (minScore !== undefined && regulation.overallScore < minScore) {
        return [0, 0, 0, 0]; // Transparent
      }
      if (maxScore !== undefined && regulation.overallScore > maxScore) {
        return [0, 0, 0, 0]; // Transparent
      }
      
      return getScoreColor(regulation.overallScore, Math.round(opacity * 255));
    },
    
    getLineColor: [255, 255, 255, 180],
    getLineWidth: 1,
    
    onClick,
    onHover,
    
    updateTriggers: {
      getFillColor: [opacity, minScore, maxScore],
    },
  });
}

/** Format regulation info for tooltip/popup display */
export function formatRegulationInfo(regulation: CountryRegulation): string {
  const scoreLabel = REGULATION_SCORE_LABELS[regulation.overallScore];
  const stars = '★'.repeat(regulation.overallScore) + '☆'.repeat(5 - regulation.overallScore);
  
  const lines = [
    `🏳️ **${regulation.countryName}** (${regulation.countryCode})`,
    `📊 ${stars} ${scoreLabel}`,
    '',
    `🏪 Physical Retail: ${regulation.physicalRetailLegal ? '✅ Legal' : '❌ Illegal'}`,
    `🌐 Online Sales: ${regulation.onlineSalesLegal ? '✅ Legal' : '❌ Illegal'}`,
    `📺 Advertising: ${formatAdvertisingRestriction(regulation.advertisingRestrictions)}`,
    `🔞 Age Verification: ${formatAgeVerification(regulation.ageVerificationMethod)}`,
    `📦 Import Restrictions: ${regulation.importRestrictions ? '⚠️ Yes' : '✅ None'}`,
  ];
  
  if (regulation.notes) {
    lines.push('', `📝 ${regulation.notes}`);
  }
  
  lines.push('', `📅 Last updated: ${regulation.lastUpdated}`);
  
  return lines.join('\n');
}

/** Format advertising restriction for display */
function formatAdvertisingRestriction(level: string): string {
  const formats: Record<string, string> = {
    none: '✅ None',
    limited: '⚠️ Limited',
    strict: '🚫 Strict',
    banned: '❌ Banned',
  };
  return formats[level] ?? level;
}

/** Format age verification method for display */
function formatAgeVerification(method: string): string {
  const formats: Record<string, string> = {
    'self-declaration': '📝 Self-declaration',
    'id-check': '🪪 ID Check',
    'strict-kyc': '🔐 Strict KYC',
  };
  return formats[method] ?? method;
}

/** Get regulation summary stats */
export function getRegulationStats(): {
  totalCountries: number;
  byScore: Record<RegulationScore, number>;
  averageScore: number;
} {
  const byScore: Record<RegulationScore, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  let totalScore = 0;
  
  for (const reg of COUNTRY_REGULATIONS) {
    byScore[reg.overallScore]++;
    totalScore += reg.overallScore;
  }
  
  return {
    totalCountries: COUNTRY_REGULATIONS.length,
    byScore,
    averageScore: totalScore / COUNTRY_REGULATIONS.length,
  };
}

/** Get legend data for UI display */
export function getRegulationLegend(): Array<{ score: RegulationScore; label: string; color: string; count: number }> {
  const stats = getRegulationStats();
  
  return ([5, 4, 3, 2, 1] as RegulationScore[]).map(score => ({
    score,
    label: REGULATION_SCORE_LABELS[score],
    color: REGULATION_COLORS[score],
    count: stats.byScore[score],
  }));
}
