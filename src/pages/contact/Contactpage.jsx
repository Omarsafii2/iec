import { useEffect, useState } from 'react';
import { Send } from 'lucide-react';
import { InnerPageHero } from '../../components/common/InnerPageHero.jsx';
import { getNodesFull } from '../../services/api/drupalApi.js';
import { submitWebform } from '../../services/api/drupalWebformApi.js';
import { DRUPAL_BASE_URL } from '../../services/api/axios.config.js';
import './Contactpage.css';

// ─── 1. Field config ──────────────────────────────────────────────────────────

const CONTACT_NODE_FIELDS = {
  imageFields:    [],
  documentFields: [],
  taxonomyFields: [],
  paragraphField:  'field_contact_us',
  paragraphFields: {
    'paragraph--contact_us': {
      imageFields: [
        { fieldName: 'field_icon', mode: 'media', mediaSourceField: 'field_media_image' },
      ],
      documentFields: [],
      taxonomyFields: [],
    },
  },
};

// ─── 2. Transform ─────────────────────────────────────────────────────────────

const extractMapSrc = (html) => {
  if (!html) return null;
  const match = html.match(/src="([^"]+)"/);
  return match ? match[1] : null;
};

const stripHtml = (html) => (html ?? '').replace(/<[^>]*>/g, '').trim();

const extractHref = (html) => {
  if (!html) return null;
  const match = html.match(/href="([^"]+)"/);
  return match ? match[1] : null;
};

const transformContactNode = (node) => {
  const attr   = node.attributes;
  const mapSrc = extractMapSrc(attr.field_map?.processed ?? attr.field_map?.value ?? '');

  const contactItems = (node.field_contact_us_resolved ?? []).map((p) => {
    const title    = p.attributes?.field_title ?? '';
    const bodyHtml = p.attributes?.field_body?.processed ?? p.attributes?.field_body?.value ?? '';
    const value    = stripHtml(bodyHtml);
    const href     = extractHref(bodyHtml);

    // Icon from field_icon media image
    const iconMedia = p.field_icon_resolved;
    const iconUri   = iconMedia?.file?.attributes?.uri?.url ?? null;
    const iconUrl   = iconUri ? `${DRUPAL_BASE_URL}${iconUri}` : null;

    return { title, value, href, iconUrl };
  });

  return { mapSrc, contactItems };
};

// ─── 3. Contact info item ─────────────────────────────────────────────────────

function ContactInfoItem({ title, value, href, iconUrl }) {
  const isLtr = href?.startsWith('tel:') || href?.startsWith('mailto:');

  return (
    <div className="group flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#897D56]/10 text-[#897D56] transition-all duration-300 group-hover:bg-[#897D56]">
        {iconUrl ? (
          <img src={iconUrl} alt="" className="size-6 object-contain" aria-hidden />
        ) : (
          // Generic placeholder if no icon
          <span className="size-6 rounded bg-[#897D56]/40" aria-hidden />
        )}
      </div>
      <div>
        <h4 className="mb-1 font-bold text-gray-800">{title}</h4>
        {href ? (
          <a href={href} className="text-gray-600 transition-colors hover:text-[#897D56]"
            dir={isLtr ? 'ltr' : undefined}>
            {value}
          </a>
        ) : (
          <p className="leading-relaxed text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}

// ─── 4. Fallbacks ─────────────────────────────────────────────────────────────

const FALLBACK_MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.2777176168864!2d35.91811807624647!3d31.953538425624772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca0718d098523%3A0xe8375e21544a49c9!2z2KfZhNmD2YTZSdmHINin2YTYudmE2YXZitipINin2YTYp9iz2YTYp9mF2YrYqQ!5e0!3m2!1sar!2sjo!4v1709476543210!5m2!1sar!2sjo';

const FALLBACK_CONTACT = [
  { title: 'رقم الهاتف',        value: '0798477408',         href: 'tel:0798477408',            iconUrl: null },
  { title: 'البريد الإلكتروني', value: 'info@iec-alumni.jo', href: 'mailto:info@iec-alumni.jo', iconUrl: null },
  { title: 'الموقع',             value: 'عمان، الأردن - الجبيهة', href: null,                   iconUrl: null },
  { title: 'ساعات العمل',       value: 'يومياً من الساعة 9:00 صباحاً حتى 5:00 مساءً', href: null, iconUrl: null },
];

// ─── 5. Form ──────────────────────────────────────────────────────────────────

const INITIAL_FORM = { full_name: '', phone: '', email: '', subject: '', message: '' };

// ─── 6. Page ──────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [contactItems, setContactItems] = useState(FALLBACK_CONTACT);
  const [mapSrc, setMapSrc]             = useState(FALLBACK_MAP_SRC);
  const [form, setForm]                 = useState(INITIAL_FORM);
  const [submitting, setSubmitting]     = useState(false);
  const [success, setSuccess]           = useState(false);
  const [error, setError]               = useState('');

  useEffect(() => {
    let cancelled = false;
    const load = async () => {
      try {
        const nodes = await getNodesFull('contact_us', CONTACT_NODE_FIELDS);
        if (cancelled || !nodes?.length) return;
        const { mapSrc: src, contactItems: items } = transformContactNode(nodes[0]);
        if (src)          setMapSrc(src);
        if (items.length) setContactItems(items);
      } catch (err) {
        console.error('ContactPage: failed to load contact info', err);
      }
    };
    load();
    return () => { cancelled = true; };
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    const missing = ['full_name', 'phone', 'email', 'subject', 'message'].find((k) => !form[k].trim());
    if (missing) { setError('يرجى تعبئة جميع الحقول المطلوبة.'); return; }
    setSubmitting(true);
    setError('');
    try {
      await submitWebform('contact_us', form);
      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero title="اتصل بنا" breadcrumbs={[{ label: 'اتصل بنا' }]} />

      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-12">

          {/* Contact info + map */}
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm" data-aos="fade-up">
              <h3 className="relative mb-8 pb-4 text-2xl font-bold text-[#564636] after:absolute after:bottom-0 after:right-0 after:h-1 after:w-16 after:rounded-full after:bg-[#897D56]">
                معلومات التواصل
              </h3>
              <div className="space-y-6">
                {contactItems.map((item) => (
                  <ContactInfoItem key={item.title} {...item} />
                ))}
              </div>
            </div>

            <div className="h-80 overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-sm" data-aos="fade-up">
              <iframe src={mapSrc} width="100%" height="100%" allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع نادي خريجي الكلية العلمية الإسلامية"
                className="rounded-2xl border-0" />
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">
              <div className="mb-10">
                <h3 className="mb-4 text-3xl font-bold text-[#564636]">تواصل معنا</h3>
                <p className="text-lg text-gray-600">
                  نسعد باستقبال استفساراتكم وملاحظاتكم. يرجى ملء النموذج أدناه وسنقوم بالرد عليكم في أقرب وقت ممكن.
                </p>
              </div>

              {success ? (
                <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-green-50 p-12 text-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                    <Send size={28} strokeWidth={2} />
                  </div>
                  <h4 className="text-xl font-bold text-green-700">تم إرسال رسالتك بنجاح!</h4>
                  <p className="text-green-600">سنقوم بالرد عليكم في أقرب وقت ممكن.</p>
                  <button type="button"
                    className="mt-4 rounded-xl border border-green-300 px-6 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                    onClick={() => setSuccess(false)}>
                    إرسال رسالة أخرى
                  </button>
                </div>
              ) : (
                <div className="static-webform" dir="rtl">
                  <div className="static-webform__row">
                    <div className="static-webform__field">
                      <label htmlFor="contact-name" className="static-webform__label">الاسم الكامل <span className="text-red-500">*</span></label>
                      <input id="contact-name" name="full_name" className="static-webform__input" type="text"
                        placeholder="أدخل اسمك هنا" value={form.full_name} onChange={handleChange} disabled={submitting} />
                    </div>
                    <div className="static-webform__field">
                      <label htmlFor="contact-phone" className="static-webform__label">رقم الهاتف <span className="text-red-500">*</span></label>
                      <input id="contact-phone" name="phone" className="static-webform__input static-webform__input--ltr"
                        type="tel" placeholder="079xxxxxxx" dir="ltr" value={form.phone} onChange={handleChange} disabled={submitting} />
                    </div>
                  </div>
                  <div className="static-webform__field">
                    <label htmlFor="contact-email" className="static-webform__label">البريد الإلكتروني <span className="text-red-500">*</span></label>
                    <input id="contact-email" name="email" className="static-webform__input static-webform__input--ltr"
                      type="email" placeholder="name@example.com" dir="ltr" value={form.email} onChange={handleChange} disabled={submitting} />
                  </div>
                  <div className="static-webform__field">
                    <label htmlFor="contact-subject" className="static-webform__label">موضوع الرسالة <span className="text-red-500">*</span></label>
                    <input id="contact-subject" name="subject" className="static-webform__input" type="text"
                      placeholder="عنوان استفسارك" value={form.subject} onChange={handleChange} disabled={submitting} />
                  </div>
                  <div className="static-webform__field">
                    <label htmlFor="contact-message" className="static-webform__label">الرسالة <span className="text-red-500">*</span></label>
                    <textarea id="contact-message" name="message" className="static-webform__textarea"
                      placeholder="اكتب رسالتك هنا..." value={form.message} onChange={handleChange} disabled={submitting} />
                  </div>
                  {error && <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}
                  <div className="static-webform__actions">
                    <button type="button" className="static-webform__button" onClick={handleSubmit} disabled={submitting}>
                      <span>{submitting ? 'جارٍ الإرسال...' : 'إرسال الرسالة'}</span>
                      {!submitting && <Send size={20} strokeWidth={2} className="rotate-180" aria-hidden />}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}