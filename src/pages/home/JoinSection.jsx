import { useEffect, useState } from 'react';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import { getNodes } from '../../services/api/drupalApi.js';

// ─── 1. Field config ──────────────────────────────────────────────────────────
// No image fields needed — background is a static Unsplash URL

const JOIN_BG_IMAGE =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const transformInvitation = (node) => {
  const attr = node.attributes;

  // body contains the heading HTML e.g. <h2><strong>هل أنت خريج...</strong></h2>
  const headingHtml = attr.body?.processed ?? attr.body?.value ?? '';

  // field_description is the paragraph below the heading
  const descHtml    = attr.field_description?.processed ?? attr.field_description?.value ?? '';
  const description = descHtml.replace(/<[^>]*>/g, '').trim();

  // CTA — external URL in this case
  const rawCta   = attr.field_call_to_action_button;
  const ctaHref  = rawCta?.uri ?? 'https://iec-alumni.jo/';
  const ctaLabel = rawCta?.title ?? 'استمارة تسجيل عضوية جديدة';
  const ctaExternal = !ctaHref.startsWith('internal:');

  const tag = attr.field_tag ?? '';

  return { headingHtml, description, ctaHref, ctaLabel, ctaExternal, tag };
};

// ─── 3. Component ─────────────────────────────────────────────────────────────

export function JoinSection() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const nodes = await getNodes('invitation_to_register_membershi');
        if (cancelled) return;
        const published = nodes.filter((n) => n.attributes.status);
        if (published.length) setData(transformInvitation(published[0]));
      } catch (err) {
        console.error('JoinSection: failed to load', err);
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  // Fallback values — render immediately with static content, swap on load
  const headingHtml  = data?.headingHtml  ?? '';
  const description  = data?.description  ?? 'انضم إلينا اليوم وكن جزءاً من شبكة خريجينا المتميزة. سجل عضويتك الآن واستفد من كافة الميزات والخدمات الحصرية للأعضاء.';
  const ctaHref      = data?.ctaHref      ?? 'https://iec-alumni.jo/';
  const ctaLabel     = data?.ctaLabel     ?? 'استمارة تسجيل عضوية جديدة';
  const ctaExternal  = data?.ctaExternal  ?? true;
  const tag          = data?.tag          ?? 'التسجيل متاح لجميع الدفعات';

  return (
    <section id="join" className="relative overflow-hidden py-24" dir="rtl">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img src={JOIN_BG_IMAGE} alt="" className="size-full scale-105 object-cover" aria-hidden />
        <div className="absolute inset-0 bg-[#564636]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#564636] via-[#564636]/85 to-[#4a3c2e]/95" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#897D56]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#897D56]/20 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">

          {/* Icon */}
          <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl ring-1 ring-white/5 backdrop-blur-md">
            <GraduationCap className="size-10 text-[#d4c5a0]" strokeWidth={2} aria-hidden />
          </div>

          {/* Heading — from Drupal body HTML */}
          {headingHtml ? (
            <div
              className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl
                [&_h2]:text-4xl [&_h2]:font-bold [&_h2]:leading-tight [&_h2]:md:text-6xl
                [&_strong]:text-[#d4c5a0]"
              dangerouslySetInnerHTML={{ __html: headingHtml }}
            />
          ) : (
            <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
              هل أنت خريج{' '}
              <br className="hidden md:block" />
              <span className="text-[#d4c5a0]">الكلية العلمية الإسلامية</span> ؟
            </h2>
          )}

          {/* Description */}
          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-gray-200 opacity-90 md:text-xl">
            {description}
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-6">
            <a
              href={ctaHref}
              target={ctaExternal ? '_blank' : undefined}
              rel={ctaExternal ? 'noopener noreferrer' : undefined}
              className="group relative flex h-16 items-center justify-center gap-4 overflow-hidden rounded-2xl border-t border-white/20 bg-[#897D56] px-12 py-2 text-xl font-medium text-white shadow-[0_0_50px_-10px_rgba(137,125,86,0.6)] outline-none ring-offset-background transition-all duration-300 hover:scale-[1.02] hover:bg-[#756A45] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 font-bold">{ctaLabel}</span>
              <ArrowLeft className="relative z-10 size-6 transition-transform group-hover:-translate-x-1" strokeWidth={2} aria-hidden />
            </a>

            {tag && (
              <p className="flex items-center gap-2 text-sm text-white/50">
                <span className="size-1.5 animate-pulse rounded-full bg-[#4ade80]" />
                {tag}
              </p>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

export default JoinSection;