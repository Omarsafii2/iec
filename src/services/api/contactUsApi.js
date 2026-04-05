import { DRUPAL_BASE_URL } from './axios.config';

const getBaseUrl = (override) => {
    if (override) return String(override).replace(/\/$/, '');
    if (import.meta.env.DEV) return '/api';
    return (DRUPAL_BASE_URL || '').replace(/\/$/, '');
};

const BASE = getBaseUrl();

// ─── CSRF token cache ─────────────────────────────────────────────────────────
let _csrfTokenCache = null;

const fetchCsrfToken = async (baseUrl) => {
    if (_csrfTokenCache) return _csrfTokenCache;
    const root = getBaseUrl(baseUrl);
    const res = await fetch(`${root}/session/token`);
    if (!res.ok) {
        console.warn('[contactUsApi] Could not fetch CSRF token:', res.status);
        return null;
    }
    _csrfTokenCache = (await res.text()).trim();
    // expire after 5 min
    setTimeout(() => { _csrfTokenCache = null; }, 5 * 60 * 1000);
    return _csrfTokenCache;
};

// ─── Error parser ─────────────────────────────────────────────────────────────
const parseSubmitError = async (res) => {
    const text = await res.text().catch(() => '');
    if (!text.trim()) return `Request failed (${res.status})`;
    let j;
    try { j = JSON.parse(text); } catch { return text.slice(0, 500); }

    const base =
        j.message ||
        j.error?.message ||
        (typeof j.error === 'string' ? j.error : null) ||
        j.detail ||
        j.title;

    if (Array.isArray(j.errors)) {
        const parts = j.errors
            .map((e) => e.detail || e.message || e.title || (typeof e === 'string' ? e : null))
            .filter(Boolean);
        if (parts.length) return parts.join(' ');
    }

    if (j.error && typeof j.error === 'object' && !Array.isArray(j.error)) {
        const flat = Object.entries(j.error)
            .map(([k, v]) => {
                if (v == null) return null;
                if (typeof v === 'string') return `${k}: ${v}`;
                if (Array.isArray(v)) return `${k}: ${v.join(', ')}`;
                if (typeof v === 'object') {
                    const inner = Object.values(v).filter(Boolean).join(', ');
                    return inner ? `${k}: ${inner}` : null;
                }
                return `${k}: ${String(v)}`;
            })
            .filter(Boolean);
        if (flat.length) return `${base || 'Validation error'} — ${flat.join('; ')}`;
    }

    if (typeof base === 'string') return base;
    if (j.errors && typeof j.errors === 'object' && !Array.isArray(j.errors)) {
        return Object.values(j.errors).flat().join(' ') || JSON.stringify(j.errors);
    }
    return JSON.stringify(j);
};

// ─── Fetch webform elements ───────────────────────────────────────────────────
export const fetchWebformElements = async (webformId, baseUrl) => {
    const root = getBaseUrl(baseUrl);
    const url = `${root}/webform_rest/${encodeURIComponent(webformId)}/elements?_format=json`;
    if (import.meta.env.DEV) console.log('[contactUsApi] fetchWebformElements:', url);

    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        throw new Error(`Failed to load webform (${res.status}): ${body.slice(0, 240)}`);
    }
    return res.json();
};

// ─── Submit webform (no files) ────────────────────────────────────────────────
/**
 * Submit webform without file uploads.
 * Sends flat JSON: { webform_id, ...fields }
 * Requires X-CSRF-Token header for Drupal REST.
 */
export const submitWebform = async (webformId, data, baseUrl) => {
    const root = getBaseUrl(baseUrl);
    const url = `${root}/webform_rest/submit?_format=json`;
    const csrfToken = await fetchCsrfToken(baseUrl);

    const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    };
    if (csrfToken) headers['X-CSRF-Token'] = csrfToken;

    if (import.meta.env.DEV) {
        console.log('[contactUsApi] submitWebform payload:', { webform_id: webformId, ...data });
    }

    const res = await fetch(url, {
        method: 'POST',
        headers,
        body: JSON.stringify({ webform_id: webformId, ...data }),
    });

    if (!res.ok) {
        _csrfTokenCache = null;
        throw new Error(await parseSubmitError(res));
    }
    return res.json().catch(() => ({}));
};

// ─── Submit webform WITH file fields ─────────────────────────────────────────
/**
 * Submit webform that contains file uploads.
 *
 * Uses the custom Drupal module endpoint:
 *   POST /webform-file-upload/{webformId}/{fieldName}
 *
 * This endpoint:
 *   1. Receives file + all form fields as multipart/form-data
 *   2. Saves the file → gets fid
 *   3. Creates the webform submission with fid attached
 *   4. Returns { sid, fid, filename }
 *
 * If there are multiple file fields, the first file field
 * drives the custom-module call (which also creates the submission).
 * Additional files would need separate uploads — currently not needed
 * since both service forms have only one file field (attachments).
 *
 * @param {string} webformId   - Webform machine name
 * @param {Object} textData    - All non-file fields already built by DrupalWebform
 * @param {Object} fileData    - { fieldName: File } — file fields
 * @param {string} [baseUrl]   - Override base URL
 */
export const submitWebformWithFile = async (webformId, textData, fileData, baseUrl) => {
    // Find the first (and usually only) file field
    const fileEntries = Object.entries(fileData).filter(([, f]) => f instanceof File);

    if (fileEntries.length === 0) {
        // No actual files — fall back to plain JSON submit
        return submitWebform(webformId, textData, baseUrl);
    }

    const [fieldName, file] = fileEntries[0];

    // Build multipart/form-data:
    //   files[file]  → the actual binary file
    //   webform_id   → drupal webform machine name
    //   ...textData  → all other fields (text, select, radios, checkboxes arrays, etc.)
    const formData = new FormData();

    // File — key must match PHP: $request->files->get('files')['file']
    formData.append('files[file]', file, file.name);

    // Webform ID
    formData.append('webform_id', webformId);

    // All text/select/radio/checkbox fields
    for (const [key, value] of Object.entries(textData)) {
        if (value === null || value === undefined) continue;

        // checkboxes come as arrays — append each value separately
        if (Array.isArray(value)) {
            value.forEach((v) => {
                if (v !== null && v !== undefined && v !== '') {
                    formData.append(`${key}[]`, String(v));
                }
            });
            continue;
        }

        if (typeof value === 'object') {
            // Nested object — shouldn't happen with our buildSubmitPayload but handle gracefully
            formData.append(key, JSON.stringify(value));
            continue;
        }

        if (String(value).trim() !== '') {
            formData.append(key, String(value));
        }
    }

    // Custom module upload URL
    // In dev: /webform-file-upload/... goes through Vite proxy → Drupal (no rewrite)
    // In prod: direct Drupal URL
    const uploadUrl = import.meta.env.DEV
        ? `/webform-file-upload/${webformId}/${fieldName}`
        : `${(baseUrl || DRUPAL_BASE_URL || '').replace(/\/$/, '')}/webform-file-upload/${webformId}/${fieldName}`;

    if (import.meta.env.DEV) {
        console.log('[contactUsApi] submitWebformWithFile → custom module:', uploadUrl);
        console.log('[contactUsApi] fieldName:', fieldName, '| file:', file.name);
        console.log('[contactUsApi] textData keys:', Object.keys(textData));
    }

    // ⚠️ Do NOT set Content-Type — browser sets multipart/form-data boundary automatically
    const res = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
    });

    const json = await res.json().catch(() => ({}));

    if (import.meta.env.DEV) {
        console.log('[contactUsApi] custom module response:', json);
    }

    if (!res.ok) {
        throw new Error(
            json?.message || json?.error || `Submission failed: ${res.status}`
        );
    }

    if (!json?.sid && !json?.fid) {
        console.warn('[contactUsApi] Unexpected response from custom module:', json);
    }

    return json;
};

// ─── fetchContactUs (unchanged) ───────────────────────────────────────────────
const extractMapSrc = (html) => {
    if (!html) return null;
    const match = html.match(/src="([^"]+)"/);
    return match ? match[1] : null;
};

const extractText = (field) => {
    if (!field) return null;
    if (typeof field === 'string') return field;
    if (typeof field === 'object') {
        return field.processed || field.value || field.uri || field.title || null;
    }
    return String(field);
};

export const fetchContactUs = async () => {
    const url = `${BASE}/jsonapi/node/contact_us?include=field_contact_us`;
    if (import.meta.env.DEV) console.log('[contactUsApi] fetching:', url);

    const res = await fetch(url);
    if (!res.ok) {
        const body = await res.text().catch(() => '');
        console.error('[contactUsApi] error body:', body);
        throw new Error(`Failed to fetch contact info: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();
    const included = json.included || [];
    const node = json.data[0];
    if (!node) throw new Error('No contact_us node found');

    const attr = node.attributes;
    const briefHtml = attr?.field_breif?.processed || '';
    const brief = briefHtml.replace(/<[^>]*>/g, '').trim();
    const mapHtml = attr?.field_map?.processed || '';
    const mapSrc = extractMapSrc(mapHtml);
    const paragraphRels = node.relationships?.field_contact_us?.data || [];

    const paragraphs = paragraphRels.map((rel) => {
        const para = included.find(
            (inc) => inc.type === 'paragraph--contact_us' && inc.id === rel.id
        );
        if (!para) return null;
        const pa = para.attributes;
        if (import.meta.env.DEV) {
            console.log(`[contactUsApi] paragraph ${para.id} attributes:`, pa);
        }
        const fieldTitle = extractText(pa?.field_title ?? pa?.field_label ?? pa?.field_heading ?? null);
        const fieldValue = extractText(
            pa?.field_value ?? pa?.field_text ?? pa?.field_body ??
            pa?.field_content ?? pa?.field_description ?? null
        );
        const fieldLink = extractText(
            pa?.field_link ?? pa?.field_url ?? pa?.field_email ??
            pa?.field_phone ?? null
        );
        const fieldType = extractText(
            pa?.field_type ?? pa?.field_icon_type ?? pa?.field_category ?? null
        );
        return { id: para.id, fieldTitle, fieldValue, fieldLink, fieldType };
    }).filter(Boolean);

    if (import.meta.env.DEV) {
        console.log('[contactUsApi] resolved paragraphs:', paragraphs);
    }

    return { id: node.id, title: attr.title, brief, mapSrc, mapHtml, paragraphs };
};