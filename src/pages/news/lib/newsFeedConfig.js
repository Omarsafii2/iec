import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

/** Drupal list field machine name (max 32 chars). */
export const NEWS_CLASSIFICATION_FIELD = 'field_initiatives_events_activit';

export const NEWS_IMAGE_FIELDS = [
  {
    fieldName:        'field_media_image',
    mode:             'media',
    mediaSourceField: 'field_media_image',
  },
];

export const NEWS_PLACEHOLDER_IMAGE =
  'https://placehold.co/800x500/f5f5f4/897D56?text=IEC';

export const NEWS_FEEDS = {
  initiatives: {
    key: 'initiatives',
    classification: 'initiatives',
    title: 'المبادرات',
    listPath: '/news/initiatives',
    backLabel: 'العودة للمبادرات',
  },
  events: {
    key: 'events',
    classification: 'events',
    title: 'الفعاليات',
    listPath: '/news/events',
    backLabel: 'العودة للفعاليات',
  },
  activities: {
    key: 'activities',
    classification: 'activities',
    title: 'الأنشطة',
    listPath: '/news/activities',
    backLabel: 'العودة للأنشطة',
  },
};

/**
 * Exact `field_initiatives_events_activit` values from Drupal JSON:API.
 * - initiatives: `initiatives_events_activities` (CMS list key; not plain `initiatives`)
 * - events: `events`
 * - activities: `activities`
 */
export const DRUPAL_CLASSIFICATION_BY_FEED = {
  initiatives: ['initiatives', 'initiatives_events_activities'],
  events: ['events'],
  activities: ['activities'],
};

const CLASSIFICATION_ALIASES = {
  initiatives: ['initiative', 'mubadrat', 'mubadarat', 'المبادرات', 'مبادرات'],
  events:      ['event', 'faaliyat', 'faaliya', 'الفعاليات', 'فعاليات'],
  activities:  ['activity', 'anshita', 'anshiyah', 'الأنشطة', 'أنشطة'],
};

export function getNewsFeedConfig(feedKey) {
  return NEWS_FEEDS[feedKey] ?? null;
}

/** Read classification from a news node attributes. */
export function getNewsClassification(node) {
  const value = node?.attributes?.[NEWS_CLASSIFICATION_FIELD];
  if (value == null || value === '') return null;
  return String(value).trim();
}

export function matchesNewsClassification(rawValue, feedKey) {
  if (!getNewsFeedConfig(feedKey) || rawValue == null || rawValue === '') return false;

  const normalized = String(rawValue).trim().toLowerCase();
  const drupalValues = (DRUPAL_CLASSIFICATION_BY_FEED[feedKey] ?? []).map((v) => v.toLowerCase());
  const aliases = (CLASSIFICATION_ALIASES[feedKey] ?? []).map((v) => v.toLowerCase());
  const config = getNewsFeedConfig(feedKey);

  return (
    drupalValues.includes(normalized)
    || normalized === config.classification
    || aliases.includes(normalized)
  );
}

export function isClubNewsNode(node) {
  return Boolean(node?.attributes?.status)
    && node?.relationships?.field_networking_and_academic?.data == null;
}

export function filterNewsByFeed(nodes, feedKey) {
  return nodes.filter(
    (node) => isClubNewsNode(node) && matchesNewsClassification(getNewsClassification(node), feedKey),
  );
}

const formatDate = (rawDate) => (
  rawDate
    ? new Date(rawDate).toLocaleDateString('ar-JO', {
        year: 'numeric', month: 'long', day: 'numeric',
      })
    : ''
);

export function transformNewsListItem(node) {
  const attr = node.attributes;
  const media = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;

  const bodyPlain = (attr.body?.processed ?? attr.body?.value ?? '')
    .replace(/<[^>]*>/g, '')
    .trim();

  const excerptSource = attr.body?.summary?.trim() || bodyPlain;
  const excerpt = excerptSource
    ? (excerptSource.length > 180 ? `${excerptSource.slice(0, 180)}...` : excerptSource)
    : '';

  return {
    id:             node.id,
    title:          attr.title ?? '',
    date:           formatDate(attr.created),
    excerpt,
    image:          fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : NEWS_PLACEHOLDER_IMAGE,
    imageAlt:       attr.title ?? '',
    category:       attr.field_tag ?? '',
    classification: getNewsClassification(node),
  };
}

export function transformNewsDetailItem(node) {
  const attr = node.attributes;
  const media = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;

  return {
    id:             node.id,
    title:          attr.title ?? '',
    date:           formatDate(attr.created),
    image:          fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : NEWS_PLACEHOLDER_IMAGE,
    imageAlt:       attr.title ?? '',
    category:       attr.field_tag ?? '',
    classification: getNewsClassification(node),
    bodyHtml:       attr.body?.processed ?? attr.body?.value ?? '',
  };
}

export function getNewsDetailPath(feedKey, articleId) {
  const config = getNewsFeedConfig(feedKey);
  return config ? `${config.listPath}/${articleId}` : `/news/news/${articleId}`;
}
