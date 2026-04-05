import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

import slider1 from '../assets/slider1.jpg';
import { fetchSlides } from '../../services/api/sliderApi'; // adjust path if needed
import './HeroSlider.css';

const DEFAULT_SLIDES = [
  {
    id: 'default-1',
    category: 'Heritage Preservation',
    title: "Preserving Jordan's Ancient Legacy",
    description:
      'Safeguarding the archaeological treasures of Jerash through expert conservation, restoration, and sustainable heritage management for future generations.',
    ctaLabel: 'Explore Our Work',
    ctaLink: '/the-project',
    image: slider1,
  },
  {
    id: 'default-2',
    category: 'Conservation',
    title: 'Expert Conservation & Restoration',
    description:
      'Dedicated to preserving cultural heritage through innovative techniques, research, and collaboration with international partners.',
    ctaLabel: 'Learn More',
    ctaLink: '/the-center',
    image: slider1,
  },
  {
    id: 'default-3',
    category: 'Training & Education',
    title: 'Building Capacity for Heritage Care',
    description:
      'Training the next generation of conservators through hands-on programs and applied conservation sciences.',
    ctaLabel: 'Our Courses',
    ctaLink: '/the-center/courses',
    image: slider1,
  },
];

const ArrowIcon = ({ dir }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    {dir === 'prev'
      ? <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
      : <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);

const HeroSlider = () => {
  const swiperRef = useRef(null);
  const [slides, setSlides] = useState(DEFAULT_SLIDES);

  useEffect(() => {
    let cancelled = false;
    fetchSlides()
      .then((data) => {
        if (!cancelled && data.length > 0) {
          setSlides(data);
        }
      })
      .catch((err) => {
        // Silently fall back to DEFAULT_SLIDES on error
        console.error('[HeroSlider] fetch error — using defaults:', err);
      });
    return () => { cancelled = true; };
  }, []);

  return (
    <section className="hero-slider">
      <Swiper
        onSwiper={(swiperInstance) => { swiperRef.current = swiperInstance; }}
        modules={[Navigation, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        speed={800}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={slides.length > 1}
        className="hero-slider__swiper"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-slider__slide">
            <div
              className="hero-slider__bg"
              style={{ backgroundImage: `url(${slide.image || slider1})` }}
            />
            <div className="hero-slider__overlay" />
            <div className="hero-slider__bottom-fade" />

            <div className="hero-slider__container">
              <div className="hero-slider__content">
                {slide.category && (
                  <span className="hero-slider__category">{slide.category}</span>
                )}
                <h2 className="hero-slider__title">{slide.title}</h2>
                {slide.description && (
                  <p className="hero-slider__description">{slide.description}</p>
                )}
                <Link to={slide.ctaLink || '#'} className="hero-slider__cta">
                  {slide.ctaLabel || 'Learn More'}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <button
        type="button"
        className="hero-slider__nav hero-slider__nav--prev"
        aria-label="Previous slide"
        onClick={() => swiperRef.current?.slidePrev()}
      >
        <ArrowIcon dir="prev" />
      </button>
      <button
        type="button"
        className="hero-slider__nav hero-slider__nav--next"
        aria-label="Next slide"
        onClick={() => swiperRef.current?.slideNext()}
      >
        <ArrowIcon dir="next" />
      </button>
    </section>
  );
};

export default HeroSlider;