import { useEffect, useState } from 'react';
import Slider from '../../components/ui/Slider.jsx';
import { getNodes } from '../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const PARTNER_IMAGE_FIELDS = [
  { fieldName: 'field_media_image', mode: 'media', mediaSourceField: 'field_media_image' },
];

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformPartner = (node) => {
  const attr    = node.attributes;
  const media   = node.field_media_image_resolved;
  const fileUri = media?.file?.attributes?.uri?.url ?? null;
  const image   = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;

  return {
    id:     node.id,
    image,
    alt:    attr.title    ?? 'شريك',
    weight: attr.field_weight ?? 0,
  };
};

// ─── 3. Component ─────────────────────────────────────────────────────────────

export function PartnersSection() {
  const [partners, setPartners] = useState([]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('partners', PARTNER_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)
          .map(transformPartner)
          .filter((p) => p.image)
          .sort((a, b) => a.weight - b.weight);  // respect field_weight order

        setPartners(transformed);
      } catch (err) {
        console.error('PartnersSection: failed to load', err);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // Don't render until we have data — Slider handles its own empty state
  if (!partners.length) return null;

  return <Slider variant="partners" partners={partners} title="شركاؤنا" />;
}

export default PartnersSection;