import { DRUPAL_BASE_URL } from '../../../services/api/axios.config.js';

/** Drupal machine name (max 32 chars). */
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

const CLASSIFICATION_ALIASES = {
  initiatives: ['initiatives', 'initiative', 'mubadrat', 'mubadarat', 'المبادرات', 'مبادرات'],
  events:      ['events', 'event', 'faaliyat', 'faaliya', 'الفعاليات', 'فعاليات'],
  activities:  ['activities', 'activity', 'anshita', 'anshiyah', 'الأنشطة', 'أنشطة'],
};

export function getNewsFeedConfig(feedKey) {
  return NEWS_FEEDS[feedKey] ?? null;
}

export function matchesNewsClassification(rawValue, feedKey) {
  const config = getNewsFeedConfig(feedKey);
  if (!config || rawValue == null || rawValue === '') return false;

  const normalized = String(rawValue).trim().toLowerCase();
  const aliases = CLASSIFICATION_ALIASES[feedKey] ?? [];
  return (
    normalized === config.classification
    || aliases.some((alias) => alias.toLowerCase() === normalized)
  );
}

export function isClubNewsNode(node) {
  return node?.attributes?.status
    && node?.relationships?.field_networking_and_academic?.data == null;
}

export function filterNewsByFeed(nodes, feedKey) {
  return nodes.filter(
    (node) => isClubNewsNode(node) && matchesNewsClassification(
      node.attributes?.[NEWS_CLASSIFICATION_FIELD],
      feedKey,
    ),
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
    classification: attr[NEWS_CLASSIFICATION_FIELD] ?? null,
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
    classification: attr[NEWS_CLASSIFICATION_FIELD] ?? null,
    bodyHtml:       attr.body?.processed ?? attr.body?.value ?? '',
  };
}

export function getNewsDetailPath(feedKey, articleId) {
  const config = getNewsFeedConfig(feedKey);
  return config ? `${config.listPath}/${articleId}` : `/news/news/${articleId}`;
}
