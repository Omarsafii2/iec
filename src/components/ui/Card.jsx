import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Play,
  Video,
  Calendar,
  MapPin,
  ChevronDown,
  ChevronLeft,
} from 'lucide-react';
import { FaLinkedinIn } from 'react-icons/fa';
import Slider from './Slider.jsx';

const Card = ({ variant = 'default', ...props }) => {
  switch (variant) {
    case 'project':
      return (
        <Link
          to={props.to}
          className={
            'iec-card iec-card--project group flex h-full flex-col overflow-hidden rounded-[2rem] border border-none bg-white text-card-foreground shadow-lg outline-none transition-all duration-300 hover:shadow-2xl focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 ' +
            (props.className || '')
          }
          data-variant="project"
        >
          <div className="iec-card__media relative h-64 overflow-hidden">
            <div className="iec-card__media-gradient absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />
            <img
              src={props.image}
              alt={props.imageAlt || props.title}
              className="iec-card__image size-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="iec-card__media-hover absolute bottom-5 end-5 z-20 translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
              <div className="iec-card__media-hover-inner flex size-12 items-center justify-center rounded-full bg-white text-[#564636] shadow-lg">
                <ArrowLeft
                  className="iec-card__media-hover-icon size-6"
                  strokeWidth={2}
                  aria-hidden
                />
              </div>
            </div>
          </div>
          <div className="iec-card__body relative flex flex-1 flex-col p-6">
            <div className="iec-card__icon-wrap absolute -top-6 start-6 z-20 flex size-12 items-center justify-center rounded-xl bg-[#897D56] text-white shadow-lg">
              {props.icon}
            </div>
            <h3 className="iec-card__title mb-3 mt-2 text-xl font-bold text-[#564636] transition-colors group-hover:text-[#897D56]">
              {props.title}
            </h3>
            <p className="iec-card__description mb-6 flex-1 text-sm leading-relaxed text-gray-500">
              {props.description}
            </p>
            <span
              className={
                'iec-card__cta mt-auto flex h-10 w-full cursor-pointer items-center justify-center rounded-md bg-[#F9F8F6] px-4 py-2 text-sm font-bold text-[#564636] shadow-sm ring-offset-background transition-all group-hover:bg-[#897D56] group-hover:text-white ' +
                (props.ctaClassName || '')
              }
              data-cta="detail"
            >
              عرض التفاصيل
            </span>
          </div>
        </Link>
      );

    case 'academies':
      return (
        <Link
          to={props.to}
          className={
            'iec-card__link iec-card--academies block h-full rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#564636] ' +
            (props.linkClassName || '')
          }
          data-variant="academies"
        >
          <div
            className={
              'iec-card__inner group flex h-full cursor-pointer flex-col items-center gap-4 rounded-xl border border-transparent p-4 transition-all hover:border-white/10 hover:bg-white/10 hover:shadow-lg ' +
              (props.className || '')
            }
          >
            <div className="iec-card__figure relative flex h-32 w-32 items-center justify-center">
              <img
                src={props.image}
                alt={props.title}
                className="iec-card__figure-img h-full w-full object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
              />
            </div>
            <span className="iec-card__label text-center text-sm font-bold leading-tight text-white transition-colors group-hover:text-[#897D56]">
              {props.title}
            </span>
          </div>
        </Link>
      );

    case 'academyActivity':
      return (
        <div
          className={
            'iec-card iec-card--academy-activity group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md ' +
            (props.className || '')
          }
          data-variant="academy-activity"
        >
          <div className="iec-card__accent-bar h-4 w-full bg-[#897D56]" aria-hidden />
          <div className="iec-card__body p-6">
            <div className="iec-card__date-row mb-3 flex items-center gap-2 text-sm font-bold text-[#897D56]">
              <Calendar size={16} strokeWidth={2} aria-hidden />
              <span className="iec-card__date">{props.date}</span>
            </div>
            <h4 className="iec-card__title mb-3 text-xl font-bold text-gray-800 transition-colors group-hover:text-[#897D56]">
              {props.title}
            </h4>
            <div className="iec-card__location flex items-center gap-2 text-sm text-gray-500">
              <MapPin size={16} strokeWidth={2} aria-hidden />
              <span>{props.location}</span>
            </div>
            <div className="iec-card__contact mt-6 border-t border-gray-100 pt-4 text-center">
              <p className="iec-card__contact-label mb-1 text-sm text-gray-500">للتواصل والاستفسار</p>
              <p className="iec-card__phone text-lg font-bold text-[#897D56] dir-ltr" dir="ltr">
                {props.phone}
              </p>
            </div>
          </div>
        </div>
      );

    case 'academyNewsBrief':
      return (
        <div
          className={
            'iec-card iec-card--academy-news-brief flex flex-col gap-6 rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row ' +
            (props.className || '')
          }
          data-variant="academy-news-brief"
          data-aos="fade-up"
        >
          <div className="iec-card__date-badge flex min-w-[100px] flex-col items-center justify-center rounded-xl bg-[#897D56]/5 p-4 text-center">
            <span className="iec-card__date-day text-2xl font-bold text-[#897D56]">{props.day}</span>
            <span className="iec-card__date-month text-sm text-gray-600">{props.monthYear}</span>
          </div>
          <div className="iec-card__content flex-1">
            <h4 className="iec-card__title mb-2 text-lg font-bold text-gray-800">{props.title}</h4>
            <p className="iec-card__excerpt mb-4 text-sm leading-relaxed text-gray-600">{props.excerpt}</p>
            <Link
              to={props.readMoreTo}
              className="iec-card__read-more inline-flex items-center gap-2 text-sm font-bold text-[#897D56] hover:underline"
            >
              <span>اقرأ المزيد</span>
              <ArrowLeft size={16} strokeWidth={2} className="rtl:rotate-180" aria-hidden />
            </Link>
          </div>
        </div>
      );

    case 'academyPartnerLogo':
      return (
        <div className={'iec-card iec-card--academy-partner ' + (props.className || '')} data-variant="academy-partner">
          <img
            src={props.src}
            alt={props.alt || 'شريك'}
            className="iec-card__partner-logo h-20 opacity-80 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0"
          />
        </div>
      );

    case 'Home':
      return (
        <div className={'iec-card iec-card--legacy iec-card--home card Home-card ' + (props.className || '')} data-variant="home">
          <img className="iec-card__image" src={props.image} alt={props.title} />
          <h3 className="iec-card__title">{props.title}</h3>
          <p className="iec-card__description">{props.description}</p>
          <strong className="iec-card__price">{props.price}</strong>
          <button className="iec-card__button" type="button">
            {props.buttonText}
          </button>
        </div>
      );

    case 'service':
      return (
        <div className="iec-card iec-card--legacy iec-card--service card service-card" data-variant="service">
          <h3 className="iec-card__title">{props.title}</h3>
          <p className="iec-card__description">{props.description}</p>
        </div>
      );

    case 'team':
      return (
        <div className={'iec-card iec-card--legacy iec-card--team card team-card ' + (props.className || '')} data-variant="team">
          <img className="iec-card__image" src={props.image} alt={props.title} />
          <h3 className="iec-card__title">{props.title}</h3>
          <p className="iec-card__subtitle">{props.jobTitle}</p>
        </div>
      );

    case 'board-members':
      return (
        <div
          className={
            'iec-card iec-card--board-members group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-xl ' +
            (props.className || '')
          }
          data-variant="board-members"
        >
          <div className="iec-card__media relative aspect-square overflow-hidden bg-gray-100">
            {props.image ? (
              <img
                src={props.image}
                alt={props.imageAlt || props.name}
                className="iec-card__image size-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="iec-card__placeholder absolute inset-0 flex items-center justify-center text-gray-300" aria-hidden>
                <User className="size-16" strokeWidth={2} />
              </div>
            )}
            <div className="absolute inset-0 flex items-center justify-center gap-4 bg-[#564636]/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {props.linkedinUrl ? (
                <a
                  href={props.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white p-2 text-[#564636] transition-colors hover:bg-[#897D56] hover:text-white"
                  aria-label={`LinkedIn — ${props.name}`}
                >
                  <FaLinkedinIn className="size-5" aria-hidden />
                </a>
              ) : (
                <span
                  className="rounded-full bg-white p-2 text-[#564636] opacity-90"
                  aria-hidden
                >
                  <FaLinkedinIn className="size-5" />
                </span>
              )}
              {props.email ? (
                <a
                  href={`mailto:${props.email}`}
                  className="rounded-full bg-white p-2 text-[#564636] transition-colors hover:bg-[#897D56] hover:text-white"
                  aria-label={`البريد — ${props.name}`}
                >
                  <Mail size={20} strokeWidth={2} aria-hidden />
                </a>
              ) : (
                <span className="rounded-full bg-white p-2 text-[#564636] opacity-90" aria-hidden>
                  <Mail size={20} strokeWidth={2} />
                </span>
              )}
            </div>
          </div>
          <div className="iec-card__body p-6 text-center">
            <h3 className="iec-card__title mb-1 text-xl font-bold text-[#564636]">{props.name}</h3>
            <p className="iec-card__role text-sm font-bold text-[#897D56]">{props.role}</p>
          </div>
        </div>
      );

    case 'objectives':
      return (
        <div
          className={
            'iec-card iec-card--objectives group rounded-3xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:border-[#897D56]/30 hover:shadow-xl ' +
            (props.className || '')
          }
          data-variant="objectives"
        >
          <div className="iec-card__icon-wrap mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#564636]/5 text-[#564636] transition-colors duration-300 group-hover:bg-[#564636] group-hover:text-white">
            {props.icon}
          </div>
          <h3 className="iec-card__title mb-4 text-2xl font-bold text-[#564636]">{props.title}</h3>
          <p className="iec-card__description text-lg leading-relaxed text-gray-600">{props.description}</p>
        </div>
      );

    case 'history-vision':
      return (
        <div
          className={
            'iec-card iec-card--history-value group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:border-[#897D56]/30 ' +
            (props.className || '')
          }
          data-variant="history-vision"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#564636]/5 text-[#564636] transition-colors group-hover:bg-[#564636] group-hover:text-white">
            {props.icon}
          </div>
          <h3 className="mb-2 text-xl font-bold text-[#564636]">{props.title}</h3>
          <p className="leading-relaxed text-gray-500">{props.description}</p>
        </div>
      );

    case 'history-mission':
      return (
        <div
          className={
            'iec-card iec-card--history-value group rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-colors hover:border-[#897D56]/30 ' +
            (props.className || '')
          }
          data-variant="history-mission"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#897D56]/5 text-[#897D56] transition-colors group-hover:bg-[#897D56] group-hover:text-white">
            {props.icon}
          </div>
          <h3 className="mb-2 text-xl font-bold text-[#564636]">{props.title}</h3>
          <p className="leading-relaxed text-gray-500">{props.description}</p>
        </div>
      );

    case 'faq-item':
      return (
        <div
          className={
            'iec-card iec-card--faq-item rounded-xl border px-4 transition-colors ' +
            (props.open
              ? 'border-[#897D56]/30 bg-[#897D56]/5'
              : 'border-gray-100 bg-white') +
            ' ' +
            (props.className || '')
          }
          data-variant="faq-item"
          data-state={props.open ? 'open' : 'closed'}
        >
          <button
            type="button"
            className="flex w-full items-start justify-between gap-4 py-4 text-left"
            onClick={props.onToggle}
            aria-expanded={props.open}
          >
            <div className="flex items-center gap-4 text-right">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56]">
                {props.icon}
              </div>
              <span className="text-lg font-bold text-gray-800">{props.title}</span>
            </div>
            <ChevronDown
              size={20}
              strokeWidth={2}
              className={
                'pointer-events-none mt-1 shrink-0 text-gray-400 transition-transform duration-200 ' +
                (props.open ? 'rotate-180' : '')
              }
              aria-hidden
            />
          </button>

          {props.open ? (
            <div className="pb-4 pr-14 text-right text-sm leading-8 text-gray-600">
              {props.description}
            </div>
          ) : null}
        </div>
      );

    case 'faq-cta':
      return (
        <div
          className={
            'iec-card iec-card--faq-cta rounded-2xl bg-[#564636] p-8 text-center text-white ' +
            (props.className || '')
          }
          data-variant="faq-cta"
        >
          <h3 className="mb-2 text-xl font-bold">{props.title}</h3>
          <p className="mb-6 text-white/80">{props.description}</p>
          <Link
            to={props.to}
            className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-8 font-bold text-[#564636] transition-colors hover:bg-gray-100"
          >
            {props.ctaLabel}
          </Link>
        </div>
      );

    case 'search-result':
      return (
        <Link
          to={props.to}
          className={
            'iec-card iec-card--search-result group block outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 ' +
            (props.className || '')
          }
          data-variant="search-result"
        >
          <div className="flex items-start gap-4 rounded-xl border border-gray-100 bg-white p-6 shadow-sm transition-all hover:border-[#897D56]/30 hover:shadow-md">
            <div className="shrink-0 rounded-lg bg-[#897D56]/10 p-3 text-[#897D56] transition-colors group-hover:bg-[#897D56] group-hover:text-white">
              {props.icon}
            </div>
            <div className="min-w-0 flex-1">
              <div className="mb-1 flex items-center gap-2">
                <h3 className="text-lg font-bold text-[#564636] transition-colors group-hover:text-[#897D56]">
                  {props.title}
                </h3>
                <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-500">
                  {props.badge}
                </span>
              </div>
              <p className="text-sm leading-relaxed text-gray-500">{props.description}</p>
            </div>
            <div className="mr-auto self-center text-[#897D56] opacity-0 transition-opacity group-hover:opacity-100">
              <ChevronLeft size={20} strokeWidth={2} aria-hidden />
            </div>
          </div>
        </Link>
      );

    case 'slider-card': {
      const slides = (props.images || []).map((img, i) => ({
        id: `${props.title}-${i}`,
        image: img.src,
        alt: img.alt || props.title,
      }));
      const tel = (props.phone || '').replace(/\s/g, '');
      return (
        <div
          className={
            'iec-card iec-card--slider-card flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm md:flex-row ' +
            (props.className || '')
          }
          data-variant="slider-card"
        >
          <div className="relative h-64 w-full shrink-0 overflow-hidden bg-gray-100 md:h-full md:min-h-[280px] md:w-1/2 md:self-stretch">
            <Slider variant="shop-product" slides={slides} badge={props.badge} />
          </div>
          <div className="flex min-w-0 flex-1 flex-col justify-between p-6 md:w-1/2 md:p-8">
            <div>
              <h3 className="iec-card__title mb-4 text-2xl font-bold text-[#564636]">{props.title}</h3>
              <div className="mb-4">
                <h4 className="mb-2 text-sm font-bold text-gray-400">تفاصيل المنتج:</h4>
                <p className="iec-card__description text-sm leading-relaxed text-gray-600">{props.description}</p>
              </div>
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-sm font-bold text-gray-400">السعر:</span>
                <span className="text-2xl font-bold text-[#897D56]">
                  {props.price}{' '}
                  <span className="text-sm font-normal text-gray-500">{props.currency || 'دينار'}</span>
                </span>
              </div>
            </div>
            <div className="mt-auto border-t border-gray-100 pt-6">
              <div className="rounded-xl bg-[#564636]/5 p-4">
                <p className="mb-2 text-center text-xs font-bold text-gray-500">للاستفسار والطلب</p>
                <a
                  href={tel ? `tel:${tel}` : undefined}
                  className="flex items-center justify-center gap-2 text-lg font-bold text-[#564636] transition-colors hover:text-[#897D56] dir-ltr"
                >
                  <Phone size={18} strokeWidth={2} aria-hidden />
                  <span dir="ltr">{props.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    case 'gallery':
      return (
        <Link
          to={props.to}
          className={
            'iec-card iec-card--gallery group block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 ' +
            (props.className || '')
          }
          data-variant="gallery"
        >
          <div className="iec-card__figure iec-card__figure--gallery relative mb-4 h-64 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-lg">
            <img
              src={props.coverImage}
              alt={props.imageAlt || props.title}
              className="iec-card__thumb-img size-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="iec-card__overlay absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/40">
              <div
                className="iec-card__hover-icon flex h-12 w-12 translate-y-4 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                aria-hidden
              >
                <ImageIcon size={24} strokeWidth={2} />
              </div>
            </div>
            <div className="iec-card__badge iec-card__badge--photos absolute bottom-4 right-4 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <ImageIcon size={12} strokeWidth={2} aria-hidden />
              <span className="iec-card__badge-value">{props.photoCount}</span>
            </div>
          </div>
          <h3 className="iec-card__title mb-1 text-lg font-bold text-gray-800 transition-colors group-hover:text-[#897D56]">
            {props.title}
          </h3>
          <p className="iec-card__subtitle text-sm text-gray-500">{props.date}</p>
        </Link>
      );

    case 'videoGallery':
      return (
        <Link
          to={props.to}
          className={
            'iec-card iec-card--video-gallery group block cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 ' +
            (props.className || '')
          }
          data-variant="video-gallery"
        >
          <div className="iec-card__figure iec-card__figure--video relative mb-4 h-56 overflow-hidden rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-lg">
            <img
              src={props.coverImage}
              alt={props.imageAlt || props.title}
              className="iec-card__thumb-img size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="iec-card__overlay iec-card__overlay--video absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/50">
              <div
                className="iec-card__play-btn flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/50 bg-white/20 pl-1 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                aria-hidden
              >
                <Play size={24} strokeWidth={2} fill="white" className="iec-card__play-icon text-white" />
              </div>
            </div>
            <div className="iec-card__badge iec-card__badge--videos absolute bottom-4 end-4 flex items-center gap-1 rounded-lg bg-black/60 px-2 py-1 text-xs text-white backdrop-blur-sm">
              <Video size={12} strokeWidth={2} aria-hidden />
              <span className="iec-card__badge-value">{props.videoCount}</span>
            </div>
          </div>
          <h3 className="iec-card__title mb-1 text-lg font-bold text-gray-800 transition-colors group-hover:text-[#897D56]">
            {props.title}
          </h3>
          <p className="iec-card__subtitle text-sm text-gray-500">{props.date}</p>
        </Link>
      );

    case 'newsArticle':
      return (
        <Link
          to={props.to}
          className={
            'iec-card iec-card--news-article group flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-300 outline-none hover:shadow-lg focus-visible:ring-2 focus-visible:ring-[#897D56] focus-visible:ring-offset-2 ' +
            (props.className || '')
          }
          data-variant="news-article"
        >
          <div className="iec-card__figure iec-card__figure--news relative h-64 cursor-pointer overflow-hidden">
            <img
              src={props.image}
              alt={props.imageAlt || props.title}
              className="iec-card__thumb-img size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="iec-card__body iec-card__body--news flex flex-1 flex-col p-8">
            <div className="iec-card__date-row mb-4 flex items-center gap-2 text-xs font-bold text-gray-400">
              <Calendar size={14} strokeWidth={2} aria-hidden />
              <span className="iec-card__date">{props.date}</span>
            </div>
            <h3 className="iec-card__title iec-card__title--news mb-4 text-xl leading-tight font-bold text-[#564636] transition-colors group-hover:text-[#897D56]">
              {props.title}
            </h3>
            <p className="iec-card__excerpt mb-8 flex-1 text-sm leading-relaxed text-gray-600 line-clamp-3">
              {props.excerpt}
            </p>
            <div className="iec-card__footer mt-auto border-t border-gray-100 pt-6">
              <span className="iec-card__read-more flex items-center gap-2 text-sm font-bold text-[#897D56] transition-colors group-hover:text-[#564636]">
                اقرأ المزيد
                <ArrowLeft
                  size={16}
                  strokeWidth={2}
                  className="iec-card__read-more-icon transition-transform group-hover:-translate-x-1 "
                  aria-hidden
                />
              </span>
            </div>
          </div>
        </Link>
      );

    case 'reservation-venue': {
      const slides = (props.images || []).map((img, i) => ({
        id: `${props.title}-${i}`,
        image: img.src,
        alt: img.alt || props.title,
      }));
      const tel = (props.phone || '').replace(/\s/g, '');
      return (
        <div
          className={
            'iec-card iec-card--reservation-venue flex h-full min-h-0 flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-shadow duration-300 hover:shadow-lg ' +
            (props.className || '')
          }
          data-variant="reservation-venue"
        >
          <div className="relative h-64 shrink-0 overflow-hidden bg-gray-100 md:h-72">
            <Slider variant="shop-product" slides={slides} badge={props.badge} />
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-8">
            <div className="flex-1">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h3 className="iec-card__title text-2xl font-bold text-[#564636]">{props.title}</h3>
                <span className="whitespace-nowrap text-xl font-bold text-[#897D56]">
                  {props.price}{' '}
                  <span className="text-sm font-normal text-gray-500">{props.currency || 'دينار'}</span>
                </span>
              </div>
              <p className="iec-card__description mb-8 leading-relaxed text-gray-600">{props.description}</p>
            </div>
            <div className="mt-auto border-t border-gray-100 pt-6">
              <div className="rounded-xl bg-[#564636]/5 p-4 text-center">
                <p className="mb-2 text-sm font-bold text-gray-500">{props.ctaLabel || 'للاستفسار والحجز'}</p>
                <a
                  href={tel ? `tel:${tel}` : undefined}
                  className="flex items-center justify-center gap-2 text-lg font-bold text-[#564636] transition-colors hover:text-[#897D56] dir-ltr"
                >
                  <Phone size={20} strokeWidth={2} aria-hidden />
                  <span dir="ltr">{props.phone}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
    }

    default:
      return (
        <div className="iec-card iec-card--empty" data-variant="default">
          No card found
        </div>
      );
  }
};

export default Card;
