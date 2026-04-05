import {
    LuBuilding,
    LuBuilding2,
    LuUser,
    LuFileText,
    LuMail,
    LuPhone,
    LuMapPin,
    LuEarth,
    LuPaperclip,
    LuCalendar,
    LuHash,
    LuIdCard,
} from 'react-icons/lu';
import { PARTNERSHIP_SPAN_FULL_KEYS, PARTNERSHIP_SPAN_HALF_KEYS } from './partnershipFormConfig';

/**
 * Full-width vs half-width in the partner grid (config keys first, then type heuristics).
 */
export function getPartnerFieldSpan(el) {
    if (PARTNERSHIP_SPAN_FULL_KEYS.has(el.key)) return 'full';
    if (PARTNERSHIP_SPAN_HALF_KEYS.has(el.key)) return 'half';
    if (['textarea', 'checkboxes', 'radios', 'file'].includes(el.type)) return 'full';
    if (el.type === 'select') return 'full';
    if (el.type === 'url') return 'full';
    return 'half';
}

/** Fields that use a leading icon (reference design). */
export function partnerFieldUsesIcon(el) {
    if (['textarea', 'checkboxes', 'radios', 'file'].includes(el.type)) return false;
    return true;
}

/**
 * Lucide-style icon per field (type + key; matches design: Building, Building2, User, IdCard, Mail, Phone, MapPin, Earth).
 */
export function getPartnerIcon(el) {
    const k = (el.key || '').toLowerCase();
    const title = (el.title || '').toLowerCase();

    if (el.type === 'email') return LuMail;
    if (el.type === 'tel') return LuPhone;
    if (el.type === 'url') return LuEarth;
    if (el.type === 'select') return LuBuilding2;
    if (el.type === 'file' || el.type === 'webform_document_file') return LuPaperclip;
    if (el.type === 'date' || el.type === 'datetime') return LuCalendar;
    if (el.type === 'number') return LuHash;

    if (/^organization_name$|org_name$|^company_name$/i.test(k) || (k.includes('organization') && k.includes('name'))) {
        return LuBuilding;
    }
    if (/organization|company|institution|organisation/.test(k) && !/type|contact/.test(k)) {
        return LuBuilding;
    }

    if (/contact|person|representative/.test(k) || /contact person/.test(title)) return LuUser;

    if (/position|job|role/.test(k) || /position\/title|position|title/.test(title)) return LuIdCard;

    if (/phone|tel|mobile|whatsapp/.test(k)) return LuPhone;
    if (/mail|e-?mail/.test(k)) return LuMail;

    if (/country|city|region|address|location|postal|zip/.test(k)) return LuMapPin;

    if (/website|url|web|link|homepage/.test(k)) return LuEarth;

    if (/description|brief|about|summary|activities|proposal|message|notes|comment/.test(k)) {
        return LuFileText;
    }

    return LuFileText;
}
