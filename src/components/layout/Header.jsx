import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderScroll } from '../../hooks/useHeaderScroll.js';
import {
  ChevronDown,
  ChevronLeft,
  Search,
  UserPlus,
  Menu,
  X,
  ShoppingBag,
  Calendar,
  Users,
  History,
  Target,
  BookOpen,
  Award,
  Image,
  Video,
  Newspaper,
} from 'lucide-react';

const navClassHero =
  'flex items-center gap-1.5 text-[16px] font-bold transition-colors duration-300 text-white hover:text-[#897D56]';

const navClassScrolled =
  'flex items-center gap-1.5 text-[16px] font-bold transition-colors duration-300 text-[#564636] hover:text-[#897D56]';

const submenuItemClass =
  'flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 hover:bg-[#564636]/5 hover:text-[#564636] rounded-lg transition-colors';

const megaMenuPanel =
  'absolute top-full start-0 z-[100] w-64 pt-2 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto';

const nestedFlyoutPanel =
  'absolute top-0 start-full z-[110] w-56 ps-2 opacity-0 invisible pointer-events-none transition-all duration-150 ease-out group-hover/nested:opacity-100 group-hover/nested:visible group-hover/nested:pointer-events-auto group-focus-within/nested:opacity-100 group-focus-within/nested:visible group-focus-within/nested:pointer-events-auto';

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useHeaderScroll();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  /** Off home, use solid bar at top (no hero overlap; TopBar only on home). */
  const solid = !isHome || scrolled;
  const navClass = solid ? navClassScrolled : navClassHero;
  const mobileOverlayTop = !isHome ? 'top-20' : scrolled ? 'top-24' : 'top-36';

  return (
    <>
      <header
        className={`fixed w-full transition-all duration-500 ${
          solid
            ? 'top-0 z-50 border-b border-gray-100 bg-white/95 py-2 shadow-lg backdrop-blur-md'
            : 'top-14 z-[62] border-b border-transparent bg-transparent py-2'
        }`}
        dir="rtl"
        lang="ar"
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="z-50 flex items-center gap-4">
            <Link className="group flex items-center gap-3" to="/">
              <div
                className={`relative rounded-full p-2 transition-all duration-500 ease-out ${
                  solid ? 'bg-transparent' : 'bg-white/10 shadow-xl ring-2 ring-white/10 backdrop-blur-sm'
                }`}
              >
                <img
                  src="/logo.png"
                  alt="IECA Alumni Club Logo"
                  className={`object-contain transition-all duration-500 drop-shadow-lg ${
                    solid ? 'h-16 w-16 md:h-20 md:w-20' : 'h-20 w-20 md:h-[100px] md:w-[100px]'
                  }`}
                />
              </div>
              <div className="flex flex-col opacity-100 transition-all duration-500">
                <h1
                  className={`text-2xl font-extrabold leading-none tracking-wide whitespace-nowrap drop-shadow-md transition-colors duration-300 md:text-4xl ${
                    solid ? 'text-[#564636]' : 'text-white'
                  }`}
                >
                  نادي خريجي
                </h1>
                <span
                  className={`mt-1 text-sm font-bold tracking-wider whitespace-nowrap drop-shadow-sm transition-colors duration-300 md:text-lg ${
                    solid ? 'text-[#897D56]' : 'text-gray-200'
                  }`}
                >
                  الكلية العلمية الإسلامية
                </span>
                <span
                  className={`mt-0.5 text-[24px] font-bold tracking-wider whitespace-nowrap drop-shadow-sm transition-colors duration-300 ${
                    solid ? 'text-[#564636]' : 'text-gray-200'
                  }`}
                >
                  مكرمة ملكية سامية
                </span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-6 md:gap-8">
            <nav className="hidden items-center gap-1 lg:flex" aria-label="التنقل الرئيسي">
              <div className="relative group px-3 py-2">
                <Link className={navClass} to="/">
                  الرئيسية
                </Link>
              </div>
              <div className="relative group px-3 py-2">
                <a className={navClass} href="/#about">
                  من نحن
                  <ChevronDown className="shrink-0" size={14} strokeWidth={3} aria-hidden />
                </a>
                <div className={megaMenuPanel} role="menu" aria-label="من نحن">
                  <div className="relative mt-2 overflow-visible rounded-xl border border-gray-100 bg-white pt-2 shadow-xl">
                    <div className="absolute start-0 top-0 h-1 w-full rounded-t-xl bg-[#897D56]" />
                    <div className="rounded-b-xl bg-white p-2">
                      <div className="relative w-full group/nested">
                        <button
                          type="button"
                          className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-start text-sm font-medium text-gray-700 transition-colors hover:bg-[#564636]/5 hover:text-[#564636]"
                          aria-expanded="false"
                          aria-haspopup="true"
                        >
                          <div className="flex items-center gap-3">
                            <Users className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                            الهيئة الإدارية
                          </div>
                          <ChevronLeft className="shrink-0 text-gray-400" size={14} strokeWidth={2} aria-hidden />
                        </button>
                        <div className={nestedFlyoutPanel} role="menu">
                          <div className="relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                            <div className="absolute start-2 top-0 bottom-0 w-1 rounded-e bg-[#897D56]" />
                            <div className="p-2">
                              <Link
                                className={submenuItemClass}
                                to="/about/director-word"
                                role="menuitem"
                              >
                                كلمة الامين العام
                              </Link>
                              <Link
                                className={submenuItemClass}
                                to="/about/board-members"
                                role="menuitem"
                              >
                                أعضاء مجلس الإدارة
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Link className={submenuItemClass} to="/about/history" role="menuitem">
                        <History className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        تاريخ التأسيس
                      </Link>
                      <Link className={submenuItemClass} to="/about/objectives" role="menuitem">
                        <Target className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        أهداف النادي
                      </Link>
                      <Link className={submenuItemClass} to="/about/bylaws" role="menuitem">
                        <BookOpen className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        النظام الداخلي
                      </Link>
                      <Link className={submenuItemClass} to="/about/achievements" role="menuitem">
                        <Award className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        إنجازات النادي
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group px-3 py-2">
                <a className={navClass} href="/#services">
                  خدمات النادي
                  <ChevronDown className="shrink-0" size={14} strokeWidth={3} aria-hidden />
                </a>
                <div className={megaMenuPanel} role="menu" aria-label="خدمات النادي">
                  <div className="relative mt-2 overflow-visible rounded-xl border border-gray-100 bg-white pt-2 shadow-xl">
                    <div className="absolute start-0 top-0 h-1 w-full rounded-t-xl bg-[#897D56]" />
                    <div className="rounded-b-xl bg-white p-2">
                      <Link className={submenuItemClass} to="/services/join" role="menuitem">
                        <UserPlus className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        طلب الانتساب
                      </Link>
                      <Link className={submenuItemClass} to="/services/shop" role="menuitem">
                        <ShoppingBag className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        دكان النادي
                      </Link>
                      <Link className={submenuItemClass} to="/services/reservations" role="menuitem">
                        <Calendar className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        حجوزات الملاعب والقاعات
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group px-3 py-2">
                <a className={navClass} href="/#news">
                  النشرة الإخبارية
                  <ChevronDown className="shrink-0" size={14} strokeWidth={3} aria-hidden />
                </a>
                <div className={megaMenuPanel} role="menu" aria-label="النشرة الإخبارية">
                  <div className="relative mt-2 overflow-visible rounded-xl border border-gray-100 bg-white pt-2 shadow-xl">
                    <div className="absolute start-0 top-0 h-1 w-full rounded-t-xl bg-[#897D56]" />
                    <div className="rounded-b-xl bg-white p-2">
                      <Link className={submenuItemClass} to="/news/photos" role="menuitem">
                        <Image className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        الصور
                      </Link>
                      <Link className={submenuItemClass} to="/news/videos" role="menuitem">
                        <Video className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        الفيديوهات
                      </Link>
                      <Link className={submenuItemClass} to="/news/news" role="menuitem">
                        <Newspaper className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                        الأخبار
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative group px-3 py-2">
                <Link className={navClass} to="/contact">
                  اتصل بنا
                </Link>
              </div>
            </nav>

            <div className="flex items-center gap-3">
              <Link to="/search" aria-label="بحث">
                <button
                  type="button"
                  className={`rounded-full p-2.5 transition-all duration-300 ${
                    solid
                      ? 'text-gray-600 hover:bg-gray-100 hover:text-[#564636]'
                      : 'text-white hover:bg-white/20'
                  }`}
                >
                  <Search size={22} strokeWidth={2} />
                </button>
              </Link>
              <a
                href="https://iec-alumni.figma.site"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex"
              >
                <button
                  type="button"
                  className={`flex h-11 items-center justify-center gap-2 rounded-full border-2 px-6 py-2 text-sm font-bold shadow-lg ring-offset-background transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${solid ? 'border-transparent bg-[#897D56] text-white hover:bg-[#756A45]' : 'border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#564636]'}`}
                >
                  {solid ? (
                    <>
                      <UserPlus size={18} strokeWidth={2} aria-hidden />
                      <span className="relative top-px">تسجيل عضوية</span>
                    </>
                  ) : (
                    <>
                      <span className="relative top-px">تسجيل عضوية</span>
                      <UserPlus size={18} strokeWidth={2} aria-hidden />
                    </>
                  )}
                </button>
              </a>
              <button
                type="button"
                className={`rounded-full p-2 transition-colors lg:hidden ${
                  solid ? 'text-[#564636] hover:bg-[#564636]/5' : 'text-white hover:bg-white/10'
                }`}
                aria-haspopup="dialog"
                aria-expanded={mobileOpen}
                aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                onClick={() => setMobileOpen((o) => !o)}
              >
                {mobileOpen ? <X size={28} strokeWidth={2} /> : <Menu size={28} strokeWidth={2} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          className={`fixed bottom-0 start-0 end-0 z-50 overflow-y-auto bg-[#564636]/95 px-4 py-4 backdrop-blur-md lg:hidden ${mobileOverlayTop}`}
          role="dialog"
          aria-modal="true"
          aria-label="قائمة التنقل"
        >
          <nav
            className="flex flex-col gap-4 text-white font-bold text-lg"
            dir="rtl"
            onClick={(e) => e.stopPropagation()}
          >
            <Link to="/" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
              الرئيسية
            </Link>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3">
              <a href="/#about" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
                من نحن
              </a>
              <div className="flex flex-col gap-1 pe-3 text-base font-semibold text-gray-200">
                <Link
                  to="/about/director-word"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  كلمة الامين العام
                </Link>
                <Link
                  to="/about/board-members"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  أعضاء مجلس الإدارة
                </Link>
                <Link
                  to="/about/history"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  تاريخ التأسيس
                </Link>
                <Link
                  to="/about/objectives"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  أهداف النادي
                </Link>
                <Link
                  to="/about/bylaws"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  النظام الداخلي
                </Link>
                <Link
                  to="/about/achievements"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  إنجازات النادي
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3">
              <a href="/#services" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
                خدمات النادي
              </a>
              <div className="flex flex-col gap-1 pe-3 text-base font-semibold text-gray-200">
                <Link
                  to="/services/join"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  طلب الانتساب
                </Link>
                <Link
                  to="/services/shop"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  دكان النادي
                </Link>
                <Link
                  to="/services/reservations"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  حجوزات الملاعب والقاعات
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 border-b border-white/10 pb-3">
              <a href="/#news" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
                النشرة الإخبارية
              </a>
              <div className="flex flex-col gap-1 pe-3 text-base font-semibold text-gray-200">
                <Link
                  to="/news/photos"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  الصور
                </Link>
                <Link
                  to="/news/videos"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-[#897D56] py-1.5"
                >
                  الفيديوهات
                </Link>
                <Link to="/news/news" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-1.5">
                  الأخبار
                </Link>
              </div>
            </div>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
              اتصل بنا
            </Link>
            <Link to="/search" onClick={() => setMobileOpen(false)} className="hover:text-[#897D56] py-2">
              بحث
            </Link>
            <a
              href="https://iec-alumni.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#897D56] py-2"
            >
              تسجيل عضوية
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
