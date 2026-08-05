import { useState, useEffect, useCallback, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useHeaderScroll } from '../../hooks/useHeaderScroll.js';
import initiativesIcon from '../../../assets/images/mobadrat2.svg';
import eventsIcon from '../../../assets/images/faaailiat2.svg';
import iecTalksIcon from '../../../assets/images/iec-talks2.svg';
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
  Newspaper,
} from 'lucide-react';

const newsSubmenuIconClass = 'size-[18px] shrink-0 object-contain';
const newsSubmenuIconClassMobile = 'size-4 shrink-0 object-contain';

const navClassHero =
  'flex items-center gap-1.5 text-[16px] font-bold transition-colors duration-300 text-white hover:text-[#897D56]';

const navClassScrolled =
  'flex items-center gap-1.5 text-[16px] font-bold transition-colors duration-300 text-[#564636] hover:text-[#897D56]';

const submenuItemClass =
  'flex items-center gap-3 px-3 py-3 text-sm font-medium text-gray-700 hover:bg-[#564636]/5 hover:text-[#564636] rounded-lg transition-colors';

const navItemWrapClass = 'relative group px-[3px] py-2 xl:px-3';

const megaMenuPanel =
  'absolute top-full start-0 z-[100] w-64 pt-2 opacity-0 invisible translate-y-1 pointer-events-none transition-all duration-200 ease-out group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:pointer-events-auto group-focus-within:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:pointer-events-auto';

const nestedFlyoutPanel =
  'absolute top-0 start-full z-[110] w-56 ps-2 opacity-0 invisible pointer-events-none transition-all duration-150 ease-out group-hover/nested:opacity-100 group-hover/nested:visible group-hover/nested:pointer-events-auto group-focus-within/nested:opacity-100 group-focus-within/nested:visible group-focus-within/nested:pointer-events-auto';

export function Header() {
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState(null);
  const closeTimeoutRef = useRef(null);
  const skipPathCloseRef = useRef(true);
  const scrolled = useHeaderScroll();
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  /** Off home, use solid bar at top (no hero overlap; TopBar only on home). */
  const solid = !isHome || scrolled;
  const navClass = solid ? navClassScrolled : navClassHero;

  const openMobileMenu = useCallback(() => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setMobileMounted(true);
    setExpandedSection(null);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setMobileOpen(true));
    });
  }, []);

  const closeMobileMenu = useCallback(() => {
    setMobileOpen(false);
    closeTimeoutRef.current = window.setTimeout(() => {
      setMobileMounted(false);
      setExpandedSection(null);
      closeTimeoutRef.current = null;
    }, 320);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    if (mobileOpen) closeMobileMenu();
    else openMobileMenu();
  }, [mobileOpen, closeMobileMenu, openMobileMenu]);

  useEffect(() => {
    if (!mobileMounted) return undefined;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [mobileMounted]);

  useEffect(() => {
    if (!mobileMounted) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') closeMobileMenu();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileMounted, closeMobileMenu]);

  useEffect(() => {
    if (skipPathCloseRef.current) {
      skipPathCloseRef.current = false;
      return;
    }
    closeMobileMenu();
  }, [pathname, closeMobileMenu]);

  useEffect(() => () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  }, []);

  const toggleSection = (id) => {
    setExpandedSection((cur) => (cur === id ? null : id));
  };

  return (
    <>
      <header
        className={`fixed w-full transition-all duration-500 ${
          solid
            ? 'top-0 z-50 border-b border-gray-100 bg-white/95 py-1.5 shadow-lg backdrop-blur-md'
            : 'top-14 z-[62] border-b border-transparent bg-transparent py-1.5'
        }`}
        dir="rtl"
        lang="ar"
      >
        <div className="container mx-auto flex items-center justify-between px-3 md:px-4">
          <div className="z-50 flex min-w-0 items-center gap-2 md:gap-3">
            <Link className="group flex min-w-0 max-w-full items-center gap-1.5 sm:gap-2" to="/">
 
                <img
                  src="/logo.png"
                  alt="IECA Alumni Club Logo"
                  className={`object-contain transition-all duration-500 drop-shadow-lg ${
                    solid ? 'h-12 w-12 md:h-16 md:w-16' : 'h-14 w-14 md:h-20 md:w-20'
                  }`}
                  style={{
                    background: 'rgba(255,255,255,0.16)',
                    borderRadius: '50%',
                    padding: '3px 4px 4px 2px',
                    backdropFilter: 'blur(55px)',
                  }}
                />

              <div className="flex min-w-0 flex-col gap-0 font-['Cairo',sans-serif] opacity-100 transition-all duration-500">
                <h1
                  className={`text-xl font-extrabold leading-tight tracking-tight drop-shadow-md transition-colors duration-300 sm:text-2xl md:text-[1.65rem] ${
                    solid ? 'text-[#564636]' : 'text-white'
                  }`}
                >
                  جمعية نادي الخريجي
                </h1>
                <span
                  className={`text-sm font-bold leading-snug tracking-normal drop-shadow-sm transition-colors duration-300 sm:text-base md:text-lg ${
                    solid ? 'text-[#897D56]' : 'text-gray-200'
                  }`}
                >
                  الكلية العلمية الإسلامية
                </span>
                <span
                  className={`text-[11px] font-semibold leading-snug tracking-normal drop-shadow-sm transition-colors duration-300 sm:text-xs md:text-sm ${
                    solid ? 'text-[#564636]' : 'text-gray-200'
                  }`}
                >
                  مكرمة ملكية سامية
                </span>
              </div>
            </Link>
          </div>

          <div className="flex shrink-0 items-center gap-1.5 xl:gap-4">
            <nav className="hidden items-center gap-0 xl:gap-1 lg:flex" aria-label="التنقل الرئيسي">
              <div className={navItemWrapClass}>
                <Link className={navClass} to="/">
                  الرئيسية
                </Link>
              </div>
              <div className={navItemWrapClass}>
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
                                to="/about/chairman-speech"
                                role="menuitem"
                              >
                                كلمة رئيس الهيئة الإدارية
                              </Link>
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
              <div className={navItemWrapClass}>
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
              <div className={navItemWrapClass}>
                <a className={navClass} href="/#news">
                الأخبار
                  <ChevronDown className="shrink-0" size={14} strokeWidth={3} aria-hidden />
                </a>
                <div className={megaMenuPanel} role="menu" aria-label="الأخبار">
                  <div className="relative mt-2 overflow-visible rounded-xl border border-gray-100 bg-white pt-2 shadow-xl">
                    <div className="absolute start-0 top-0 h-1 w-full rounded-t-xl bg-[#897D56]" />
                    <div className="rounded-b-xl bg-white p-2">
                      <Link className={submenuItemClass} to="/news/initiatives" role="menuitem">
                        <img src={initiativesIcon} alt="" className={newsSubmenuIconClass} aria-hidden />
                        المبادرات
                      </Link>
                      <Link className={submenuItemClass} to="/news/events" role="menuitem">
                        <img src={eventsIcon} alt="" className={newsSubmenuIconClass} aria-hidden />
                        الفعاليات
                      </Link>
                      <Link className={submenuItemClass} to="/news/activities" role="menuitem">
                        <img src={iecTalksIcon} alt="" className={newsSubmenuIconClass} aria-hidden />
                        IEC Talks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className={navItemWrapClass}>
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
              <Link
                to="/services/join"
                className={`hidden h-11 items-center justify-center gap-2 rounded-full border-2 px-6 py-2 text-sm font-bold shadow-lg ring-offset-background transition-all duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:inline-flex ${solid ? 'border-transparent bg-[#897D56] text-white hover:bg-[#756A45]' : 'border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#564636]'}`}
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
              </Link>
              <button
                type="button"
                className={`rounded-full p-2 transition-all duration-200 active:scale-95 lg:hidden ${
                  solid ? 'text-[#564636] hover:bg-[#564636]/5' : 'text-white hover:bg-white/10'
                }`}
                aria-haspopup="dialog"
                aria-expanded={mobileMounted && mobileOpen}
                aria-label={mobileOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
                onClick={toggleMobileMenu}
              >
                {mobileMounted && mobileOpen ? (
                  <X size={28} strokeWidth={2} />
                ) : (
                  <Menu size={28} strokeWidth={2} />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMounted && (
        <div
          className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
          aria-hidden={!mobileOpen}
        >
          <button
            type="button"
            className={`absolute inset-0 bg-[#1a1410]/50 backdrop-blur-[3px] transition-opacity duration-300 ease-out motion-reduce:transition-none ${
              mobileOpen ? 'opacity-100' : 'opacity-0'
            }`}
            aria-label="إغلاق القائمة"
            tabIndex={mobileOpen ? 0 : -1}
            onClick={closeMobileMenu}
          />
          <div
            dir="rtl"
            lang="ar"
            className={`absolute inset-y-0 start-0 flex h-full min-h-0 w-[min(100vw,20.5rem)] max-w-full flex-col bg-white shadow-[0_0_40px_-12px_rgba(86,70,54,0.35)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
              mobileOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{
              paddingTop:    'max(env(safe-area-inset-top, 0px), 0.75rem)',
              paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 0.75rem)',
            }}
            role="dialog"
            aria-modal="true"
            aria-label="قائمة التنقل"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-gray-100 px-4 pb-3">
              <span className="font-['Cairo',sans-serif] text-lg font-extrabold text-[#564636]">القائمة</span>
              <button
                type="button"
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#564636] transition-colors hover:bg-[#897D56]/15 hover:text-[#564636]"
                aria-label="إغلاق القائمة"
                onClick={closeMobileMenu}
              >
                <X size={22} strokeWidth={2} />
              </button>
            </div>

            <nav
              className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain px-3 py-4 font-['Cairo',sans-serif]"
              dir="rtl"
            >
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="flex min-h-12 items-center rounded-xl px-4 text-base font-bold text-[#564636] transition-colors duration-200 hover:bg-[#897D56]/12 active:bg-[#897D56]/18"
              >
                الرئيسية
              </Link>

              <div className="pt-1">
                <button
                  type="button"
                  className="flex w-full min-h-12 items-center justify-between gap-2 rounded-xl px-4 text-start text-base font-bold text-[#564636] transition-colors hover:bg-[#897D56]/12"
                  aria-expanded={expandedSection === 'about'}
                  onClick={() => toggleSection('about')}
                >
                  <span className="flex items-center gap-2">
                    <Users className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                    من نحن
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[#897D56] transition-transform duration-300 ease-out ${
                      expandedSection === 'about' ? '-rotate-180' : ''
                    }`}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    expandedSection === 'about' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-0.5 border-s-2 border-[#897D56]/25 pb-2 ps-3 pt-1">
                      <Link
                        to="/about/chairman-speech"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        كلمة رئيس الهيئة الإدارية
                      </Link>
                      <Link
                        to="/about/director-word"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        كلمة الامين العام
                      </Link>
                      <Link
                        to="/about/board-members"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        أعضاء مجلس الإدارة
                      </Link>
                      <Link
                        to="/about/history"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        تاريخ التأسيس
                      </Link>
                      <Link
                        to="/about/objectives"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        أهداف النادي
                      </Link>
                      <Link
                        to="/about/bylaws"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        النظام الداخلي
                      </Link>
                      <Link
                        to="/about/achievements"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        إنجازات النادي
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  className="flex w-full min-h-12 items-center justify-between gap-2 rounded-xl px-4 text-start text-base font-bold text-[#564636] transition-colors hover:bg-[#897D56]/12"
                  aria-expanded={expandedSection === 'services'}
                  onClick={() => toggleSection('services')}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                    خدمات النادي
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[#897D56] transition-transform duration-300 ease-out ${
                      expandedSection === 'services' ? '-rotate-180' : ''
                    }`}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    expandedSection === 'services' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-0.5 border-s-2 border-[#897D56]/25 pb-2 ps-3 pt-1">
                      <Link
                        to="/services/join"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        طلب الانتساب
                      </Link>
                      <Link
                        to="/services/shop"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        دكان النادي
                      </Link>
                      <Link
                        to="/services/reservations"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        حجوزات الملاعب والقاعات
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <button
                  type="button"
                  className="flex w-full min-h-12 items-center justify-between gap-2 rounded-xl px-4 text-start text-base font-bold text-[#564636] transition-colors hover:bg-[#897D56]/12"
                  aria-expanded={expandedSection === 'news'}
                  onClick={() => toggleSection('news')}
                >
                  <span className="flex items-center gap-2">
                    <Newspaper className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                    النشرة الإخبارية
                  </span>
                  <ChevronDown
                    className={`size-4 shrink-0 text-[#897D56] transition-transform duration-300 ease-out ${
                      expandedSection === 'news' ? '-rotate-180' : ''
                    }`}
                    strokeWidth={2.5}
                    aria-hidden
                  />
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${
                    expandedSection === 'news' ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="space-y-0.5 border-s-2 border-[#897D56]/25 pb-2 ps-3 pt-1">
                      <Link
                        to="/news/initiatives"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        <img src={initiativesIcon} alt="" className={newsSubmenuIconClassMobile} aria-hidden />
                        المبادرات
                      </Link>
                      <Link
                        to="/news/events"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        <img src={eventsIcon} alt="" className={newsSubmenuIconClassMobile} aria-hidden />
                        الفعاليات
                      </Link>
                      <Link
                        to="/news/activities"
                        onClick={closeMobileMenu}
                        className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-[15px] font-semibold text-[#564636]/95 transition-colors hover:bg-[#897D56]/10"
                      >
                        <img src={iecTalksIcon} alt="" className={newsSubmenuIconClassMobile} aria-hidden />
                        IEC Talks
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <Link
                to="/contact"
                onClick={closeMobileMenu}
                className="mt-2 flex min-h-12 items-center rounded-xl px-4 text-base font-bold text-[#564636] transition-colors duration-200 hover:bg-[#897D56]/12"
              >
                اتصل بنا
              </Link>

              <Link
                to="/search"
                onClick={closeMobileMenu}
                className="flex min-h-12 items-center gap-3 rounded-xl px-4 text-base font-bold text-[#564636] transition-colors duration-200 hover:bg-[#897D56]/12"
              >
                <Search className="size-[18px] shrink-0 text-[#897D56]" strokeWidth={2} aria-hidden />
                بحث
              </Link>

              <div className="mt-auto shrink-0 border-t border-gray-100 pt-4">
                <Link
                  to="/services/join"
                  onClick={closeMobileMenu}
                  className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#897D56] px-4 text-sm font-bold text-white shadow-md transition-colors hover:bg-[#756A45]"
                >
                  <UserPlus size={18} strokeWidth={2} aria-hidden />
                  تسجيل عضوية
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
