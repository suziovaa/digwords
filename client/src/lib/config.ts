// API configuration for same-origin deployment
// Both frontend and backend are served from the same Render instance
// Use relative paths for all API requests
export const API_BASE_URL = '';

// Helper to construct API URLs
export function getApiUrl(path: string): string {
  // Always use relative paths since frontend and backend are on same origin
  return path;
}

