/**
 * API Guard for Adult Industry Variant
 *
 * Prevents World Monitor API calls for adult-industry variant
 * to avoid 401/403 errors from unauthenticated requests.
 */

/**
 * Check if current variant is adult-industry.
 * Uses safe access to avoid import.meta.env issues in Node.js tests.
 */
function isAdultIndustryVariant(): boolean {
  try {
    // Access import.meta.env safely
    const env = (import.meta as { env?: { VITE_VARIANT?: string } }).env;
    return env?.VITE_VARIANT === 'adult-industry';
  } catch {
    // Fallback for Node.js test environments
    return false;
  }
}

/**
 * APIs allowed for adult-industry variant.
 * Only RSS proxy and static assets are permitted.
 */
const ALLOWED_ADULT_INDUSTRY_APIS: string[] = [
  '/api/rss-proxy',       // RSS feeds for news
  '/api/news/v1/list-feed-digest',  // Feed digest (may work without auth)
  '/assets/',             // Static assets
  '/data/',               // Static data files
];

/**
 * APIs that should be completely blocked for adult-industry variant.
 * These require World Monitor API authentication.
 */
const BLOCKED_WORLDMONITOR_APIS: string[] = [
  '/api/bootstrap',
  '/api/intelligence/',
  '/api/market/',
  '/api/military/',
  '/api/conflict/',
  '/api/infrastructure/',
  '/api/maritime/',
  '/api/research/',
  '/api/cyber/',
  '/api/youtube/',
  '/api/risk-scores',
  '/api/telegram-feed',
];

/**
 * Check if an API call should be made for the current variant.
 *
 * @param url - The API URL to check
 * @returns true if the API call is allowed, false if it should be skipped
 */
export function shouldCallApi(url: string): boolean {
  // Non-adult-industry variants can call any API
  if (!isAdultIndustryVariant()) {
    return true;
  }

  // Check if URL is in allowed list
  for (const allowed of ALLOWED_ADULT_INDUSTRY_APIS) {
    if (url.includes(allowed)) {
      return true;
    }
  }

  // Check if URL is in blocked list
  for (const blocked of BLOCKED_WORLDMONITOR_APIS) {
    if (url.includes(blocked)) {
      return false;
    }
  }

  // Default: allow unknown APIs (might be static resources)
  // But log for debugging
  if (url.includes('/api/')) {
    console.debug(`[API Guard] Unknown API for adult-industry: ${url}`);
  }

  return true;
}

/**
 * Check if RPC client should be initialized for the current variant.
 * RPC clients make gRPC calls to World Monitor backend.
 *
 * @returns true if RPC is allowed, false for adult-industry variant
 */
export function shouldInitRpc(): boolean {
  return !isAdultIndustryVariant();
}

/**
 * Check if WebSocket connections should be established.
 * WebSockets are used for real-time data which requires authentication.
 *
 * @returns true if WebSocket is allowed, false for adult-industry variant
 */
export function shouldConnectWebSocket(): boolean {
  return !isAdultIndustryVariant();
}
