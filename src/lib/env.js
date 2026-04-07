export function getDrupalBaseUrl() {
  return import.meta.env.VITE_DRUPAL_URL || 'http://localhost:8000';
}
