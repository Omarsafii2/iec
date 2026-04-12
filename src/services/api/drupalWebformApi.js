/**
 * drupalWebformApi.js
 *
 * Reusable API layer for Drupal Webform REST — powered by the shared axios instance.
 * Works with any Drupal site that has the webform_rest module installed.
 *
 * Endpoints used:
 *   GET  /webform_rest/{webformId}/elements?_format=json
 *   POST /webform_rest/submit?_format=json
 *   GET  /session/token  (CSRF — required by Drupal for state-changing requests)
 */

import { drupalApi } from './axios.config';

// ─── CSRF Token ───────────────────────────────────────────────────────────────
// Drupal requires an X-CSRF-Token on all state-changing requests.
// Cached and auto-expired after 5 min.

let _csrfCache = null; // { token, expiresAt }

const getCsrfToken = async () => {
  const now = Date.now();

  if (_csrfCache && _csrfCache.expiresAt > now) {
    return _csrfCache.token;
  }

  try {
    // drupalApi already has the correct baseURL — just hit the path
    const { data } = await drupalApi.get('/session/token', {
      // Override Content-Type: token endpoint returns plain text
      headers: { Accept: 'text/plain' },
      // Tell axios not to parse as JSON
      transformResponse: [(raw) => raw],
    });

    const token = (data ?? '').trim();
    _csrfCache = { token, expiresAt: now + 5 * 60 * 1000 };
    return token;
  } catch (err) {
    console.warn('[drupalWebformApi] CSRF fetch failed:', err);
    return null;
  }
};

const invalidateCsrf = () => { _csrfCache = null; };

// ─── Error Parser ─────────────────────────────────────────────────────────────
// Normalises the many shapes Drupal can return errors in into a plain string.

const parseAxiosError = (err) => {
  const json = err.response?.data;

  if (!json) return err.message || 'Request failed';
  if (typeof json === 'string') return json.slice(0, 400);

  if (typeof json.message === 'string') return json.message;
  if (typeof json.error   === 'string') return json.error;
  if (typeof json.detail  === 'string') return json.detail;
  if (typeof json.title   === 'string') return json.title;

  // Array of error objects (JSON:API style)
  if (Array.isArray(json.errors)) {
    const parts = json.errors
      .map((e) => e.detail || e.message || e.title || (typeof e === 'string' ? e : null))
      .filter(Boolean);
    if (parts.length) return parts.join(' ');
  }

  // Flat error object { field: message }
  if (json.error && typeof json.error === 'object') {
    const flat = Object.entries(json.error)
      .map(([k, v]) => {
        if (!v) return null;
        if (typeof v === 'string') return `${k}: ${v}`;
        if (Array.isArray(v))     return `${k}: ${v.join(', ')}`;
        return `${k}: ${JSON.stringify(v)}`;
      })
      .filter(Boolean);
    if (flat.length) return flat.join('; ');
  }

  return JSON.stringify(json).slice(0, 400);
};

// ─── Fetch Elements ───────────────────────────────────────────────────────────

/**
 * Fetches the raw element schema from Drupal.
 *
 * @param {string} webformId - Drupal webform machine name (e.g. "contact_us")
 * @returns {Promise<object>}
 */
export const fetchWebformElements = async (webformId) => {
  try {
    const { data } = await drupalApi.get(
      `/webform_rest/${encodeURIComponent(webformId)}/elements`,
      { params: { _format: 'json' } }
    );
    return data;
  } catch (err) {
    throw new Error(
      `Failed to load webform "${webformId}" (${err.response?.status ?? 'network'}): ${parseAxiosError(err)}`
    );
  }
};

// ─── Submit (text-only) ───────────────────────────────────────────────────────

/**
 * Submits a webform with no file fields.
 *
 * @param {string} webformId - Drupal webform machine name
 * @param {object} data      - Key/value pairs matching Drupal webform element keys
 * @returns {Promise<object>}
 */
export const submitWebform = async (webformId, data) => {
  const csrfToken = await getCsrfToken();

  try {
    const { data: response } = await drupalApi.post(
      '/webform_rest/submit',
      { webform_id: webformId, ...data },
      {
        params: { _format: 'json' },
        headers: csrfToken ? { 'X-CSRF-Token': csrfToken } : {},
      }
    );
    return response ?? {};
  } catch (err) {
    invalidateCsrf(); // token may have expired — bust the cache
    throw new Error(parseAxiosError(err));
  }
};

// ─── Submit (with file upload) ────────────────────────────────────────────────

/**
 * Submits a webform that includes one or more file fields.
 * Falls back to submitWebform() automatically if no actual File objects are found.
 *
 * @param {string} webformId   - Drupal webform machine name
 * @param {object} textData    - Non-file field values
 * @param {object} fileData    - { fieldKey: File } — one entry per file field
 * @param {object} [options]
 * @param {string} [options.uploadPath] - Custom upload path template.
 *                                        Defaults to "/webform-file-upload/{webformId}/{fieldName}".
 *                                        Tokens: {webformId}, {fieldName}
 * @returns {Promise<object>}
 */
export const submitWebformWithFile = async (webformId, textData, fileData, options = {}) => {
  const fileEntries = Object.entries(fileData).filter(([, f]) => f instanceof File);

  // No real files — use the plain JSON endpoint
  if (fileEntries.length === 0) {
    return submitWebform(webformId, textData);
  }

  const [fieldName, file] = fileEntries[0];

  const uploadPathTemplate =
    options.uploadPath ?? '/webform-file-upload/{webformId}/{fieldName}';

  const uploadPath = uploadPathTemplate
    .replace('{webformId}', encodeURIComponent(webformId))
    .replace('{fieldName}', encodeURIComponent(fieldName));

  // Build FormData
  const form = new FormData();
  form.append('files[file]', file, file.name);
  form.append('webform_id', webformId);

  for (const [key, value] of Object.entries(textData)) {
    if (value === null || value === undefined) continue;

    if (Array.isArray(value)) {
      value
        .filter((v) => v !== null && v !== undefined && v !== '')
        .forEach((v) => form.append(`${key}[]`, String(v)));
      continue;
    }

    if (typeof value === 'object') {
      form.append(key, JSON.stringify(value));
      continue;
    }

    if (String(value).trim() !== '') {
      form.append(key, String(value));
    }
  }

  try {
    const { data } = await drupalApi.post(uploadPath, form, {
      // Let axios set Content-Type + boundary automatically for FormData
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data ?? {};
  } catch (err) {
    throw new Error(
      err.response?.data?.message ||
      err.response?.data?.error  ||
      `File submission failed (${err.response?.status ?? 'network'}): ${parseAxiosError(err)}`
    );
  }
};