/**
 * إنشاء slug من العنوان للاستخدام في الـ URL (بدل id عشوائي)
 * يحافظ على الأحرف العربية ويفصل الكلمات بشرطة
 */

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * تحويل العنوان إلى slug آمن للـ URL
 * @param {string} title
 * @returns {string}
 */
export function createSlug(title) {
    if (title == null || typeof title !== 'string') return '';
    const s = title.trim().replace(/\s+/g, '-').replace(/[#?&]/g, '');
    return s || '';
}

/**
 * هل القيمة تبدو كـ id (UUID أو رقم) وليست slug من العنوان؟
 * @param {string} param - القيمة من useParams()
 * @returns {boolean}
 */
export function isIdParam(param) {
    if (param == null || typeof param !== 'string') return false;
    const t = param.trim();
    if (UUID_REGEX.test(t)) return true;
    if (/^\d+$/.test(t)) return true;
    return false;
}

/**
 * مقارنة slug من الـ URL بعنوان العنصر (بعد فك الترميز)
 * @param {string} urlSlug - القيمة من useParams()
 * @param {string} title - عنوان العنصر
 * @returns {boolean}
 */
export function slugMatches(urlSlug, title) {
    if (!urlSlug || !title) return false;
    try {
        const decoded = decodeURIComponent(urlSlug.trim());
        const expected = createSlug(title);
        return decoded === expected;
    } catch {
        return false;
    }
}
