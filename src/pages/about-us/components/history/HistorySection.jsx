import { BookOpen, Target, Users } from 'lucide-react';
import Card from '../../../../components/ui/Card.jsx';
import containerImage from '../../../../../assets/images/Container.png';
import aminImage from '../../../../../assets/images/amin.png';

const FOUNDATION_PARAGRAPHS = [
  'أسس نادي خريجي الكلية العلمية الإسلامية في أواخر العام 1997، تحت اسم جمعية نادي خريجي الكلية العلمية الإسلامية، وشيد بمكرمة ملكية سامية من صاحب الحضرة الهاشمية الملك عبد الله الثاني بن الحسين المعظم الرئيس الفخري للنادي.',
  'قامت فكرة تأسيس النادي على عدة ركائز هامة لخدمة منتسبيه من الخريجين، والمجتمع المحلي المحيط به، من خلال شراكاته مع عدد من الجمعيات والهيئات الخيرية المختلفة.',
  'ويهتم النادي بعدة صعد تهدف إلى تقوية العلاقة مع الخريجين والخريجات من ناحية، ومن ناحية أخرى دعم العلاقة مع المجتمع المحلي.',
];

const CLUB_OVERVIEW_PARAGRAPHS = [
  'تأسس نادي خريجي الكلية العلمية الإسلامية ليكون منارة تجمع أبناء هذه المؤسسة العريقة، موحداً جهودهم لخدمة المجتمع والوطن. نحن نسعى لتمكين الخريجين وبناء جسور التواصل المستمر بينهم، لتبقى هذه الرابطة قوية ومتينة عبر الأجيال.',
  'منذ تأسيسه، شكل النادي نقطة التقاء للأجيال المتعاقبة، مما أتاح منصة فريدة لتبادل الخبرات والمعرفة. نحن نؤمن بأن قوة مجتمعنا تكمن في تلاحم أعضائه، ولذلك نعمل جاهدين على توفير بيئة داعمة تشجع على الابتكار والتميز في شتى المجالات المهنية والاجتماعية.',
  'يمتد نشاطنا ليشمل المبادرات الثقافية، والرياضية، والاجتماعية، مستلهمين من قيم مدرستنا الأم، لنسهم بفعالية في بناء مستقبل مشرق لوطننا الحبيب.',
];

const VALUE_CARDS = [
  {
    title: 'رؤيتنا',
    description: 'الريادة في العمل التطوعي والاجتماعي وتمكين الخريجين ليكونوا قادة في مجتمعاتهم.',
    icon: <Target size={24} strokeWidth={2} aria-hidden className="transition-colors group-hover:text-white" />,
    variant: 'history-vision',
  },
  {
    title: 'رسالتنا',
    description: 'بناء مجتمع متكافل من الخريجين يساهم في رفعة الوطن من خلال برامج نوعية ومستدامة.',
    icon: <BookOpen size={24} strokeWidth={2} aria-hidden className="transition-colors group-hover:text-white" />,
    variant: 'history-mission',
  },
];

export function HistorySection() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-24 max-w-7xl">
        <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="order-2 lg:order-1 lg:col-span-7">
              <div className="max-w-none text-gray-600">
                <p className="mb-8 border-b border-gray-100 pb-8 text-xl leading-loose font-bold text-[#564636]">
                  {FOUNDATION_PARAGRAPHS[0]}
                </p>
                <p className="mb-6 leading-relaxed">{FOUNDATION_PARAGRAPHS[1]}</p>
                <p className="leading-relaxed">{FOUNDATION_PARAGRAPHS[2]}</p>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 lg:col-span-5">
              <div className="relative z-10 overflow-hidden rounded-2xl border-4 border-white shadow-xl transition-transform duration-500 hover:scale-[1.02]">
                <img
                  src={containerImage}
                  alt="نشاطات نادي خريجي الكلية العلمية الإسلامية"
                  className="w-full object-cover"
                />
              </div>
              <div
                className="absolute -top-6 -left-6 hidden h-full w-full rounded-2xl border-2 border-[#897D56]/20 lg:block"
                aria-hidden
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          <div className="order-2 flex flex-col gap-8 lg:order-1" data-aos="fade-up">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#897D56]/10 px-3 py-1 text-sm font-semibold text-[#897D56]">
                <span className="h-2 w-2 rounded-full bg-[#897D56]" />
                نبذة عن النادي
              </div>
              <h2 className="mb-6 text-4xl leading-tight font-bold text-[#564636] md:text-5xl">
                إرث من التميز
                <br />
                <span className="text-[#897D56]">ومستقبل من الإبداع</span>
              </h2>
              <div className="space-y-4 text-justify text-lg leading-relaxed text-gray-600">
                {CLUB_OVERVIEW_PARAGRAPHS.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {VALUE_CARDS.map((card) => (
                <Card key={card.title} {...card} />
              ))}
            </div>
          </div>

          <div className="relative order-1 hidden min-h-[600px] h-full md:block lg:order-2" data-aos="fade-up">
            <div
              className="absolute top-10 left-10 right-0 bottom-0 -z-10 translate-x-4 translate-y-4 rounded-3xl border-2 border-[#897D56]/20"
              aria-hidden
            />

            <div className="absolute top-0 right-0 z-10 h-[85%] w-[85%] overflow-hidden rounded-3xl shadow-2xl">
              <img
                src={containerImage}
                alt="تاريخ النادي"
                className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#564636]/60 to-transparent" />
              <div className="absolute bottom-6 right-6 text-right text-white">
                <p className="text-lg font-bold">تاريخ عريق</p>
                <p className="text-sm text-white/80">منذ التأسيس</p>
              </div>
            </div>

            <div className="absolute bottom-8 left-0 z-20 aspect-[4/5] w-[55%] overflow-hidden rounded-2xl border-4 border-white shadow-2xl">
              <img
                src={aminImage}
                alt="أعضاء النادي"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="absolute top-12 left-8 z-30 rounded-xl bg-white/90 p-4 shadow-lg backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#897D56] p-2 text-white">
                  <Users size={24} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="text-xl font-bold text-[#564636]">+23,000</p>
                  <p className="text-xs text-gray-500">خريج وعضو</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 mb-8 md:hidden" data-aos="fade-up">
            <img
              src={containerImage}
              alt="نشاطات النادي"
              className="h-[400px] w-full rounded-2xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
