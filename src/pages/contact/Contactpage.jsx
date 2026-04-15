import { Clock3, Mail, MapPin, Phone, Send } from 'lucide-react';
import { InnerPageHero } from '../../components/common/InnerPageHero.jsx';
import './Contactpage.css';

const CONTACT_INFO = [
  {
    title: 'رقم الهاتف',
    value: '0798477408',
    href: 'tel:0798477408',
    icon: Phone,
    dir: 'ltr',
  },
  {
    title: 'البريد الإلكتروني',
    value: 'info@iec-alumni.jo',
    href: 'mailto:info@iec-alumni.jo',
    icon: Mail,
    dir: 'ltr',
  },
  {
    title: 'الموقع',
    value: 'عمان، الأردن - الجبيهة',
    icon: MapPin,
  },
  {
    title: 'ساعات العمل',
    value: 'يومياً من الساعة 9:00 صباحاً حتى 5:00 مساءً\n(ما عدا الجمعة والعطل الرسمية)',
    icon: Clock3,
  },
];

const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3385.2777176168864!2d35.91811807624647!3d31.953538425624772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151ca0718d098523%3A0xe8375e21544a49c9!2z2KfZhNmD2YTZSdmHINin2YTYudmE2YXZitipINin2YTYp9iz2YTYp9mF2YrYqQ!5e0!3m2!1sar!2sjo!4v1709476543210!5m2!1sar!2sjo';

function ContactInfoItem({ title, value, href, icon: Icon, dir }) {
  return (
    <div className="group flex items-start gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#897D56]/10 text-[#897D56] transition-all duration-300 group-hover:bg-[#897D56] group-hover:text-white">
        <Icon size={24} strokeWidth={2} aria-hidden />
      </div>

      <div>
        <h4 className="mb-1 font-bold text-gray-800">{title}</h4>
        {href ? (
          <p className={`text-right text-gray-600 ${dir === 'ltr' ? 'dir-ltr' : ''}`} dir={dir}>
            <a href={href} className="transition-colors hover:text-[#897D56]" dir={dir}>
              {value}
            </a>
          </p>
        ) : (
          <p className="whitespace-pre-line leading-relaxed text-gray-600">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero title="اتصل بنا" breadcrumbs={[{ label: 'اتصل بنا' }]} />

      <div className="container mx-auto px-4 py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm" data-aos="fade-up">
              <h3 className="relative mb-8 pb-4 text-2xl font-bold text-[#564636] after:absolute after:bottom-0 after:right-0 after:h-1 after:w-16 after:rounded-full after:bg-[#897D56]">
                معلومات التواصل
              </h3>

              <div className="space-y-6">
                {CONTACT_INFO.map((item) => (
                  <ContactInfoItem key={item.title} {...item} />
                ))}
              </div>
            </div>

            <div className="h-80 overflow-hidden rounded-3xl border border-gray-100 bg-white p-2 shadow-sm" data-aos="fade-up">
              <iframe
                src={MAP_EMBED_URL}
                width="100%"
                height="100%"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="موقع نادي خريجي الكلية العلمية الإسلامية"
                className="rounded-2xl border-0"
              />
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="h-full rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">
              <div className="mb-10">
                <h3 className="mb-4 text-3xl font-bold text-[#564636]">تواصل معنا</h3>
                <p className="text-lg text-gray-600">
                  نسعد باستقبال استفساراتكم وملاحظاتكم. يرجى ملء النموذج أدناه وسنقوم بالرد عليكم في أقرب وقت ممكن.
                </p>
              </div>

              <form className="static-webform" dir="rtl">
                <div className="static-webform__row">
                  <div className="static-webform__field">
                    <label htmlFor="contact-name" className="static-webform__label">الاسم الكامل</label>
                    <input id="contact-name" className="static-webform__input" type="text" placeholder="أدخل اسمك هنا" />
                  </div>

                  <div className="static-webform__field">
                    <label htmlFor="contact-phone" className="static-webform__label">رقم الهاتف</label>
                    <input id="contact-phone" className="static-webform__input static-webform__input--ltr" type="tel" placeholder="079xxxxxxx" dir="ltr" />
                  </div>
                </div>

                <div className="static-webform__field">
                  <label htmlFor="contact-email" className="static-webform__label">البريد الإلكتروني</label>
                  <input id="contact-email" className="static-webform__input static-webform__input--ltr" type="email" placeholder="name@example.com" dir="ltr" />
                </div>

                <div className="static-webform__field">
                  <label htmlFor="contact-subject" className="static-webform__label">موضوع الرسالة</label>
                  <input id="contact-subject" className="static-webform__input" type="text" placeholder="عنوان استفسارك" />
                </div>

                <div className="static-webform__field">
                  <label htmlFor="contact-message" className="static-webform__label">الرسالة</label>
                  <textarea id="contact-message" className="static-webform__textarea" placeholder="اكتب رسالتك هنا..." />
                </div>

                <div className="static-webform__actions">
                  <button type="button" className="static-webform__button">
                    <span>إرسال الرسالة</span>
                    <Send size={20} strokeWidth={2} className="rotate-180" aria-hidden />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
