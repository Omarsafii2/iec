/**
 * Partnership application layout (order + two-column rows).
 * Must match Drupal `#webform_key` values from:
 * /webform_rest/partnership_application/elements?_format=json
 * (e.g. backend.rccr.com…/webform_rest/partnership_application/elements)
 *
 * Common alternates: proposed_activities ↔ proposed_partnership_activities,
 * areas_of_interest ↔ interests, organization_description ↔ brief_description.
 */

/** Top-to-bottom display order (matches design mockup + live element keys). */
export const PARTNERSHIP_FIELD_ORDER = [
    'organization_name',
    'organization_type',
    'contact_person',
    'position_title',
    'email_address',
    'phone_number',
    'country',
    'city',
    'website',
    'areas_of_interest',
    'organization_description',
    'proposed_partnership_activities',
];

/**
 * Adjacent keys rendered as one row, two columns (must appear in order above, consecutively).
 */
export const PARTNERSHIP_FIELD_ROWS = [
    ['contact_person', 'position_title'],
    ['email_address', 'phone_number'],
    ['country', 'city'],
];

/** Full-width rows (md:col-span-2). */
export const PARTNERSHIP_SPAN_FULL_KEYS = new Set([
    'organization_name',
    'organization_type',
    'website',
    'areas_of_interest',
    'organization_description',
    'proposed_partnership_activities',
    'proposed_activities',
    'brief_description',
]);

/** Half-width when not inside a PARTNERSHIP_FIELD_ROWS pair (usually overridden by rows). */
export const PARTNERSHIP_SPAN_HALF_KEYS = new Set([
    'contact_person',
    'position_title',
    'email',
    'phone',
    'email_address',
    'e_mail',
    'phone_number',
    'country',
    'city',
]);

/**
 * Map Drupal machine names to canonical keys used in PARTNERSHIP_FIELD_ORDER / FIELD_ROWS
 * so sort + row pairing work when the backend uses e.g. email_address instead of email.
 */
export function canonicalPartnerKeyForSort(key) {
    const k = (key || '').toLowerCase();
    if (['email', 'e_mail', 'email_address', 'mail'].includes(k)) return 'email';
    if (['phone', 'phone_number', 'tel', 'mobile', 'mobile_number'].includes(k)) return 'phone';
    if (['country', 'country_region'].includes(k)) return 'country';
    if (['city', 'town'].includes(k)) return 'city';
    return key;
}

/**
 * Map React state keys → POST `data` keys when an older/alternate elements export
 * used different machine names. Live RCCR keys are already `email_address` / `phone_number`.
 */
export const PARTNERSHIP_SUBMIT_KEY_OVERRIDES = {
    email: 'email_address',
    phone: 'phone_number',
    e_mail: 'email_address',
    mail: 'email_address',
    tel: 'phone_number',
    mobile: 'phone_number',
};
