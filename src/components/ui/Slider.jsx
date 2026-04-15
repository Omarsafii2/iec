import { useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from './Card.jsx';

/* --- Hero defaults & styles --- */

const HERO_PRIMARY_BTN =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md py-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-lg text-white bg-[#564636] hover:bg-[#3e3226]';

const HERO_SECONDARY_BTN =
  'inline-flex items-center justify-center whitespace-nowrap rounded-md py-2 font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-12 px-8 text-lg border border-white text-[#564636] bg-white hover:bg-white/90';

const DEFAULT_HERO_SLIDES = [
  {
    id: '1',
    image:
      'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80',
    alt: 'نادي خريجي الكلية العلمية الإسلامية',
    title: 'نادي خريجي الكلية العلمية الإسلامية',
    subtitle: 'ملتقى الأجيال وذاكرة المكان',
    primary: {
      label: 'انضم إلينا الآن',
      href: 'https://iec-alumni.jo/',
      external: true,
    },
    secondary: { to: '/about/history', label: 'إقرأ المزيد' },
  },
  {
    id: '2',
    image:
      'https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&w=1920&q=80',
    alt: 'ذكريات لا تنسى',
    title: 'ذكريات لا تنسى',
    subtitle: 'نحيي الماضي لنبني المستقبل',
    primary: {
      label: 'انضم إلينا الآن',
      href: 'https://iec-alumni.jo/',
      external: true,
    },
    secondary: { to: '/about/history', label: 'إقرأ المزيد' },
  },
  {
    id: '3',
    image:
      'https://images.unsplash.com/photo-1564760055770-d63a2b7297bb?auto=format&fit=crop&w=1920&q=80',
    alt: 'مكارم الهاشميين',
    badge: 'مئوية الدولة الأردنية',
    title: 'مكارم الهاشميين',
    subtitle: 'مسيرة عطاء تحت ظل الراية الهاشمية',
    primary: { label: 'اهم الإنجازات', to: '/about/achievements' },
    secondary: { to: '/about/history', label: 'إقرأ المزيد' },
  },
];

function HeroPrimaryCta({ primary }) {
  if (primary.href) {
    return (
      <a
        href={primary.href}
        target={primary.external ? '_blank' : undefined}
        rel={primary.external ? 'noopener noreferrer' : undefined}
        className={HERO_PRIMARY_BTN}
      >
        {primary.label}
      </a>
    );
  }
  return (
    <Link to={primary.to} className={HERO_PRIMARY_BTN}>
      {primary.label}
    </Link>
  );
}

function SliderHero({ slides: slidesProp, className, sectionClassName }) {
  const slides = slidesProp?.length ? slidesProp : DEFAULT_HERO_SLIDES;
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, direction: 'rtl', align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  return (
    <section
      className={`iec-slider iec-slider--hero relative h-[900px] overflow-hidden bg-gray-900 ${sectionClassName || ''}`}
      dir="rtl"
    >
      <div className={`embla iec-slider__viewport h-full w-full overflow-hidden ${className || ''}`} ref={emblaRef}>
        <div className="iec-slider__container flex h-full w-full touch-pan-y">
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className="iec-slider__slide relative h-full min-w-0 flex-[0_0_100%] w-full"
            >
              <div className="absolute inset-0">
                <img
                  src={slide.image}
                  alt={slide.alt}
                  className="h-full w-full object-cover opacity-60"
                  style={{ objectPosition: 'center 0%' }}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#564636] via-[#564636]/50 to-transparent" />
              </div>
              <div className="relative z-10 container mx-auto flex h-full flex-col items-start justify-center px-8 text-white md:px-24">
                <div
                  className={`iec-slider__content max-w-2xl transition-all duration-700 ease-out ${
                    index === selectedIndex ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                  }`}
                >
                  {slide.badge ? (
                    <div className="mb-4 inline-block rounded-full border border-yellow-500/50 bg-yellow-500/10 px-4 py-1 text-sm font-medium text-yellow-400">
                      {slide.badge}
                    </div>
                  ) : null}
                  <h2 className="mb-6 text-5xl font-bold leading-tight md:text-6xl">{slide.title}</h2>
                  <p className="mb-8 text-xl font-light text-gray-200 md:text-2xl">{slide.subtitle}</p>
                  <div className="flex flex-wrap gap-4">
                    <HeroPrimaryCta primary={slide.primary} />
                    <Link to={slide.secondary.to} className={HERO_SECONDARY_BTN}>
                      {slide.secondary.label}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="iec-slider__nav iec-slider__nav--next absolute left-8 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:left-16"
        onClick={scrollNext}
        aria-label="الشريحة التالية"
      >
        <ArrowLeft size={32} strokeWidth={2} />
      </button>
      <button
        type="button"
        className="iec-slider__nav iec-slider__nav--prev absolute right-8 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-white/10 p-2 text-white backdrop-blur-sm transition-all hover:bg-white/20 md:right-16"
        onClick={scrollPrev}
        aria-label="الشريحة السابقة"
      >
        <ArrowRight size={32} strokeWidth={2} />
      </button>
    </section>
  );
}

/* --- Partners --- */

const DEFAULT_PARTNER_SLIDES = [
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+1', alt: 'Partner 1' },
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+2', alt: 'Partner 2' },
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+3', alt: 'Partner 3' },
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+4', alt: 'Partner 4' },
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+5', alt: 'Partner 5' },
  { image: 'https://placehold.co/240x96/f8f9fa/564636?text=Partner+6', alt: 'Partner 6' },
];

const PARTNER_SLIDER_MIN = 6;

function PartnerLogoCell({ item }) {
  return (
    <div className="iec-slider__slide flex min-w-0 shrink-0 items-center justify-center px-6">
      <div className="flex h-28 w-full max-w-[200px] items-center justify-center transition-transform duration-300 hover:scale-110">
        <img
          src={item.image}
          alt={item.alt}
          className="max-h-20 max-w-full object-contain"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

/** أقل من 6 شعارات: عرض ثابت في المنتصف بدون سلايدر */
function PartnersStaticGrid({ items }) {
  return (
    <div className="mx-auto flex max-w-[1200px] flex-wrap justify-center gap-x-10 gap-y-8 px-4 py-6 md:gap-x-14 md:px-8">
      {items.map((item, index) => (
        <PartnerLogoCell key={`${item.alt}-static-${index}`} item={item} />
      ))}
    </div>
  );
}

/** 6 شعارات أو أكثر: سلايدر Embla مع تكرار للحلقة */
function PartnersEmblaSlider({ items }) {
  const loopItems = useMemo(() => [...items, ...items], [items]);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    direction: 'rtl',
    align: 'start',
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  return (
    <div className="group relative mx-auto max-w-[1200px] px-4 md:px-12">
      <button
        type="button"
        className="iec-slider__nav iec-slider__nav--prev absolute -right-2 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 translate-x-4 items-center justify-center rounded-full border border-gray-100 bg-white text-[#564636] opacity-0 shadow-lg transition-all duration-300 hover:bg-[#564636] hover:text-white group-hover:translate-x-0 group-hover:opacity-100 md:-right-6"
        onClick={scrollPrev}
        aria-label="الشريك السابق"
      >
        <ArrowRight size={22} strokeWidth={2} />
      </button>

      <div className="iec-slider__viewport overflow-hidden py-4" ref={emblaRef}>
        <div className="iec-slider__container -mx-6 flex cursor-grab touch-pan-y items-center select-none active:cursor-grabbing">
          {loopItems.map((item, index) => (
            <div
              key={`${item.alt}-${index}`}
              className="iec-slider__slide min-w-0 shrink-0 grow-0 basis-1/2 px-6 md:basis-1/4 lg:basis-[16.666%]"
            >
              <div className="flex h-28 items-center justify-center transition-transform duration-300 hover:scale-110">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="max-h-20 max-w-full object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="iec-slider__nav iec-slider__nav--next absolute -left-2 top-1/2 z-20 flex h-12 w-12 -translate-x-4 -translate-y-1/2 items-center justify-center rounded-full border border-gray-100 bg-white text-[#564636] opacity-0 shadow-lg transition-all duration-300 hover:bg-[#564636] hover:text-white group-hover:translate-x-0 group-hover:opacity-100 md:-left-6"
        onClick={scrollNext}
        aria-label="الشريك التالي"
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>
    </div>
  );
}

function SliderPartners({ partners, title = 'شركاؤنا', className, sectionClassName }) {
  const base = useMemo(() => {
    return partners?.length ? partners : DEFAULT_PARTNER_SLIDES;
  }, [partners]);

  const useSlider = base.length >= PARTNER_SLIDER_MIN;

  return (
    <section
      className={`iec-slider iec-slider--partners relative overflow-hidden border-t border-gray-200/60 bg-[#f8f9fa] py-24 ${sectionClassName || ''}`}
      dir="rtl"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(rgb(86, 70, 54) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      <div className={`relative z-10 container mx-auto px-4 ${className || ''}`}>
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-4xl font-bold text-[#564636]">{title}</h2>
          <div className="mx-auto h-1.5 w-20 rounded-full bg-[#897D56] opacity-80" />
        </div>

        {useSlider ? <PartnersEmblaSlider items={base} /> : <PartnersStaticGrid items={base} />}
      </div>
    </section>
  );
}

/* --- Shop / product image carousel (reusable on any page) --- */

/**
 * Image carousel for product or merch galleries (Embla, RTL, dots, optional badge).
 *
 * @param {object} props
 * @param {Array<{ id: string, image: string, alt?: string }>} props.slides
 * @param {string} [props.badge] — e.g. "جديد", shown top-end on the media
 * @param {string} [props.className] — root element
 */
export function ShopProductImageSlider({ slides = [], badge, className }) {
  const items = slides?.length ? slides : [];
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: items.length > 1, direction: 'rtl', align: 'start' });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);

  if (!items.length) {
    return <div className={`relative h-full min-h-[16rem] bg-gray-100 ${className || ''}`} aria-hidden />;
  }

  return (
    <div
      className={`iec-slider iec-slider--shop-product relative h-full min-h-0 w-full bg-gray-100 ${className || ''}`}
      dir="rtl"
    >
      <div className="embla h-full min-h-0 w-full overflow-hidden" ref={emblaRef}>
        <div className="flex h-full min-h-0 touch-pan-y">
          {items.map((slide, index) => (
            <div
              key={slide.id}
              className="relative h-full min-h-0 min-w-0 shrink-0 grow-0 basis-full"
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="absolute inset-0 size-full min-h-0 object-cover"
                loading={index === 0 ? 'eager' : 'lazy'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>

      {badge ? (
        <span className="absolute top-4 right-4 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#564636] shadow-sm backdrop-blur-sm">
          {badge}
        </span>
      ) : null}

      {items.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md transition-all hover:bg-white"
            onClick={scrollPrev}
            aria-label="الصورة السابقة"
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-gray-800 shadow-md transition-all hover:bg-white"
            onClick={scrollNext}
            aria-label="الصورة التالية"
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
          <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-1.5">
            {items.map((slide, i) => (
              <div
                key={`${slide.id}-dot-${i}`}
                className={`h-1.5 w-1.5 rounded-full transition-colors ${i === selectedIndex ? 'bg-white' : 'bg-white/50'}`}
                aria-hidden
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function SliderAcademies({ items = [], className, viewportClassName }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: items.length > 3,
    direction: 'rtl',
    align: 'start',
    dragFree: false,
  });

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  if (!items.length) {
    return null;
  }

  return (
    <div className={`iec-slider iec-slider--academies relative ${className || ''}`} dir="rtl">
      <div className="relative px-10 md:px-14">
        <button
          type="button"
          className="absolute right-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#564636]"
          onClick={scrollPrev}
          aria-label="العناصر السابقة"
        >
          <ArrowRight size={20} strokeWidth={2} />
        </button>

        <div className={`overflow-hidden ${viewportClassName || ''}`} ref={emblaRef}>
          <div className="-mx-3 flex touch-pan-y">
            {items.map((item) => (
              <div
                key={item.to}
                className="min-w-0 shrink-0 grow-0 basis-1/2 px-3 md:basis-1/3 lg:basis-1/5"
              >
                <Card variant="academies" {...item} />
              </div>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="absolute left-0 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white hover:text-[#564636]"
          onClick={scrollNext}
          aria-label="العناصر التالية"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

/* --- Public API (mirrors Card switch) --- */

export function Slider({ variant = 'hero', ...props }) {
  switch (variant) {
    case 'hero':
      return <SliderHero {...props} />;
    case 'partners':
      return <SliderPartners {...props} />;
    case 'academies':
      return <SliderAcademies {...props} />;
    case 'shop-product':
      return <ShopProductImageSlider {...props} />;
    default:
      return null;
  }
}

export default Slider;
