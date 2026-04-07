import { useState, useEffect } from 'react';

/** Pixels past top before header/topbar switch to “scrolled” layout. */
const SCROLL_THRESHOLD = 48;

export function useHeaderScroll() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return scrolled;
}
