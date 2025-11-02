// API configuration for different environments
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper to construct full API URLs
export function getApiUrl(path: string): string {
  // If API_BASE_URL is set (production), use it as full URL
  // Otherwise use relative paths (development with same-origin)
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}
