import { useEffect, useMemo, useRef, useState } from 'react';
import { FileText, Search as SearchIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { InnerPageHero } from '../../components/common/InnerPageHero.jsx';
import Card from '../../components/ui/Card.jsx';
import './Search.css';

const SITE_PAGES = [
  { title: 'من نحن', path: '/#about', badge: 'قسم', description: 'نبذة عن النادي وتاريخه ورسالته.' },
  { title: 'تاريخ التأسيس', path: '/about/history', badge: 'صفحة', description: 'معلومات عن تأسيس النادي وتطوره عبر السنوات.' },
  { title: 'أهداف النادي', path: '/about/objectives', badge: 'صفحة', description: 'تعرف على رؤية النادي ورسالته وأهدافه.' },
  { title: 'النظام الداخلي', path: '/about/bylaws', badge: 'صفحة', description: 'اطلع على النظام الداخلي واللوائح المنظمة لعمل النادي.' },
  { title: 'الإنجازات', path: '/about/achievements', badge: 'صفحة', description: 'استعرض أبرز إنجازات النادي ومحطاته المهمة.' },
  { title: 'دكان النادي', path: '/services/shop', badge: 'خدمة', description: 'متجر منتجات وهدايا النادي.' },
  { title: 'طلب الانتساب', path: '/services/join', badge: 'خدمة', description: 'صفحة تقديم طلب الانتساب للنادي.' },
  { title: 'حجز القاعات', path: '/services/reservations', badge: 'خدمة', description: 'حجز مرافق وقاعات النادي للمناسبات والفعاليات.' },
  { title: 'أرشيف الصور', path: '/news/photos', badge: 'معرض', description: 'صور من نشاطات وفعاليات النادي.' },
  { title: 'أرشيف الفيديو', path: '/news/videos', badge: 'معرض', description: 'فيديوهات من الفعاليات والأنشطة المختلفة.' },
  { title: 'الأخبار', path: '/news/news', badge: 'أخبار', description: 'آخر أخبار النادي وتحديثاته وإعلاناته.' },
  { title: 'المشاريع', path: '/projects', badge: 'مشروع', description: 'تعرف على مشاريع النادي ومبادراته المجتمعية.' },
  { title: 'اتصل بنا', path: '/contact', badge: 'تواصل', description: 'طرق التواصل مع النادي ومعلومات الاتصال.' },
  { title: 'الأسئلة الشائعة', path: '/faq', badge: 'مساعدة', description: 'إجابات عن أكثر الأسئلة شيوعًا حول النادي وخدماته.' },
];

function highlightMatch(text, query) {
  if (!query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escaped})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : part
  );
}

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const normalizedQuery = query.toLowerCase();
    return SITE_PAGES.filter((page) =>
      page.title.toLowerCase().includes(normalizedQuery) ||
      page.description.toLowerCase().includes(normalizedQuery) ||
      page.badge.toLowerCase().includes(normalizedQuery)
    );
  }, [query]);

  const handleChange = (event) => {
    const value = event.target.value;
    setQuery(value);

    if (value.trim()) {
      setSearchParams({ q: value.trim() });
    } else {
      setSearchParams({});
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero title="البحث" breadcrumbs={[{ label: 'البحث' }]} />

      <div className="container mx-auto px-4 py-16">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-12" data-aos="fade-up">
            <input
              ref={inputRef}
              type="text"
              placeholder="ابحث عن صفحة، خدمة، أو معلومة..."
              className="h-16 w-full rounded-2xl border-2 border-gray-200 px-6 pr-14 text-lg shadow-sm transition-all focus:border-[#897D56] focus:outline-none"
              value={query}
              onChange={handleChange}
              dir="rtl"
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
              <SearchIcon size={24} strokeWidth={2} aria-hidden />
            </div>
          </div>

          {query.trim() ? (
            results.length > 0 ? (
            <div className="space-y-4">
              {results.map((page) => (
                <Card
                  key={page.path}
                  variant="search-result"
                  to={page.path}
                  icon={<FileText size={20} strokeWidth={2} aria-hidden />}
                  badge={page.badge}
                  title={highlightMatch(page.title, query)}
                  description={highlightMatch(page.description, query)}
                  className="block"
                />
              ))}
            </div>
            ) : (
            <div className="search-empty rounded-3xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center shadow-sm" data-aos="fade-up">
              <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56]">
                <SearchIcon size={28} strokeWidth={2} aria-hidden />
              </div>
              <h2 className="mb-2 text-2xl font-bold text-[#564636]">لا توجد نتائج</h2>
              <p className="mx-auto max-w-md text-gray-500">
                جرّب كلمات بحث مختلفة أو ابحث باسم صفحة، خدمة، أو قسم من أقسام الموقع.
              </p>
            </div>
            )
          ) : null}
        </div>
      </div>
    </main>
  );
}
