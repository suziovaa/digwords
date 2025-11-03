// API configuration for different environments
// In production (GitHub Pages), always use the Render backend
// In development (Replit), use relative paths for same-origin requests
const isProduction = import.meta.env.MODE === 'production';
export const API_BASE_URL = isProduction 
  ? 'https://digwords-api.onrender.com'
  : (import.meta.env.VITE_API_URL || '');

// Helper to construct full API URLs
export function getApiUrl(path: string): string {
  // If API_BASE_URL is set, use it as full URL
  // Otherwise use relative paths (development with same-origin)
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

