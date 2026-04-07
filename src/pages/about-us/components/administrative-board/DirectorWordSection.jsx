import { Quote } from 'lucide-react';
import amin from '../../../../../assets/images/amin.png';

const BIO_ITEMS = [
  'بكالوريوس محاسبة وإدارة أعمال',
  'خريجة مدارس الكلية العلمية الإسلامية – 1990',
  'محاسبة قانونية في مكتب عبيدات لتدقيق الحسابات',
  'مؤسسة لموقع لشراء الهدايا عبر الانترنت (Le panier gift basket shop) في عمان.',
  'عضو المجلس المحلي لمنطقتي ضاحية الرشيد و الجبيهه',
  'احد داعمي مبادرات تمكين المرأة و تطويرها من خلال تقديم محاضرات تعليمية لصناعة الشوكولاته و غيرها.',
];

/** Secretary-general profile: portrait + bio card (inner page body). */
export function DirectorWordSection({
  portraitSrc = '/images/secretary-general.png',
  portraitAlt = 'الامين العام',
  name = 'نشوى عبيدات',
  role = 'الامين العام',
  heading = 'الزميلة نشوى عبيدات',
}) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid items-start gap-12 lg:grid-cols-12" data-aos="fade-up">
        <div className="relative lg:col-span-5">
          <div className="relative transform overflow-hidden rounded-2xl border-4 border-white shadow-2xl transition-transform duration-500 hover:rotate-0 lg:rotate-2">
            <img src={amin} alt={portraitAlt} className="h-auto w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" aria-hidden />
            <div className="absolute bottom-6 right-6 text-white">
              <p className="text-xl font-bold">{name}</p>
              <p className="text-sm opacity-90">{role}</p>
            </div>
          </div>
          <div
            className="absolute -top-6 -right-6 -z-10 hidden h-full w-full rounded-2xl border-2 border-[#897D56]/20 lg:block"
            aria-hidden
          />
        </div>

        <div className="lg:col-span-7">
          <div className="relative rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12">
            <Quote
              className="absolute top-8 start-8 h-24 w-24 -scale-x-100 text-[#897D56]/10"
              strokeWidth={2}
              aria-hidden
            />
            <h2 className="relative z-10 mb-6 text-2xl font-bold text-[#564636]">{heading}</h2>
            <div className="relative z-10 space-y-6 text-lg leading-relaxed text-gray-600">
              <ul className="space-y-4">
                {BIO_ITEMS.map((text) => (
                  <li key={text} className="flex gap-3">
                    <span className="mt-2.5 h-2 w-2 shrink-0 rounded-full bg-[#897D56]" aria-hidden />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
