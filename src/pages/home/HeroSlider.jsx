import { useEffect, useState } from 'react';
import Slider from '../../components/ui/Slider.jsx';
import { getNodes } from '../../services/api/drupalApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';

// Image field config — slider uses media--image → field_media_image (file)
const SLIDER_IMAGE_FIELDS = [
  {
    fieldName: 'field_media_image',
    mode: 'media',
    mediaSourceField: 'field_media_image',
  },
];

/**
 * Transform a raw Drupal slider node into the shape SliderHero expects:
 * {
 *   id, image, alt, title, subtitle, badge?,
 *   primary:   { label, href?, to?, external? },
 *   secondary: { label, to },
 * }
 */
const transformSlide = (node) => {
  const attr = node.attributes;

  // ── Image ────────────────────────────────────────────────────────────────
  // resolved media entity sits at node.field_media_image_resolved
  const media    = node.field_media_image_resolved;
  const fileUri  = media?.file?.attributes?.uri?.url ?? null;
  const imageUrl = fileUri ? `${DRUPAL_BASE_URL}${fileUri}` : null;
  const imageAlt = media?.file?.attributes?.filename ?? attr.title;

  // ── CTAs ─────────────────────────────────────────────────────────────────
  const rawPrimary   = attr.field_call_to_action_button;
  const rawSecondary = attr.field_second_call_to_action_butt;

  const resolveLink = (raw) => {
    if (!raw?.uri) return null;
    const isExternal = raw.uri.startsWith('http');
    const isInternal = raw.uri.startsWith('internal:');
    const path       = isInternal ? raw.uri.replace('internal:', '') || '/' : raw.uri;
    return {
      label:    raw.title || '',
      ...(isExternal ? { href: raw.uri, external: true } : { to: path }),
    };
  };

  // ── Body / subtitle ───────────────────────────────────────────────────────
  const subtitle =
    attr.body?.summary ||
    attr.body?.value?.replace(/<[^>]*>/g, '').trim() ||
    '';

  return {
    id:        node.id,
    image:     imageUrl,
    alt:       imageAlt,
    title:     attr.title,
    subtitle,
    badge:     attr.field_tag || undefined,
    primary:   resolveLink(rawPrimary),
    secondary: resolveLink(rawSecondary),
  };
};

export function HeroSlider(props) {
  const [slides, setSlides]   = useState([]);   // empty → Slider falls back to defaults
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('slider', SLIDER_IMAGE_FIELDS);
        if (cancelled) return;

        const transformed = nodes
          .filter((n) => n.attributes.status)          // published only
          .map(transformSlide)
          .filter((s) => s.image);                     // skip slides with no image

        setSlides(transformed);
      } catch (err) {
        if (!cancelled) {
          console.error('HeroSlider: failed to load slides', err);
          setError(err);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // While loading keep the section height reserved (avoids layout shift)
  if (loading) {
    return (
      <div className="relative h-[900px] w-full animate-pulse bg-gray-200" aria-hidden />
    );
  }

  // On error (or no slides) the Slider component will render its built-in defaults
  return <Slider variant="hero" slides={slides} {...props} />;
}

export default HeroSlider;