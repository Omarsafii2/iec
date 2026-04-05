/**
 * Drupal JSON:API helper for Contact Us page.
 * Uses fetch (no axios). Base URL for JEPA demo site.
 *
 * Final request URL when include works:
 * GET {BASE_URL}/jsonapi/node/contact_us?include=field_contact_us_cards,field_contact_us_cards.field_icon,field_contact_us_cards.field_icon.field_media_image&sort=-changed&page[limit]=1
 *
 * If field names differ, adjust include chain:
 * - Node paragraphs: field_contact_us_cards (confirmed)
 * - Paragraph icon: field_icon (TRY) -> field_media -> field_media_image
 * - Media image field: field_media_image (common for media--image)
 */

const BASE_URL = 'http://jepa-demo.com.dedi5536.your-server.de';

/**
 * Build full URL from path. Path should start with / (e.g. /jsonapi/node/contact_us).
 * @param {string} path - API path
 * @returns {string} Full URL
 */
export function buildUrl(path) {
    const clean = path.startsWith('/') ? path : `/${path}`;
    return `${BASE_URL}${clean}`;
}

/**
 * Fetch URL and parse JSON.
 * @param {string} url - Full URL (use buildUrl for paths)
 * @param {RequestInit} [opts] - fetch options (method, headers, etc.)
 * @returns {Promise<object>} Parsed JSON
 */
export async function fetchJson(url, opts = {}) {
    const options = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            ...opts.headers
        },
        ...opts
    };
    const res = await fetch(url, options);
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
    return res.json();
}

export { BASE_URL };
