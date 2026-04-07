import { Phone, Mail, ChevronDown } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { useHeaderScroll } from '../../hooks/useHeaderScroll.js';

const socialIconClass = 'inline-flex cursor-pointer items-center hover:text-[#897D56] transition-colors';

export function TopBar() {
  const scrolled = useHeaderScroll();

  return (
    <div
      className={`fixed top-0 z-[60] w-full transition-all duration-500 ease-in-out ${
        scrolled
          ? 'pointer-events-none -translate-y-full opacity-0'
          : 'translate-y-0 bg-transparent py-4 text-white opacity-100'
      }`}
      dir="rtl"
      lang="ar"
      aria-hidden={scrolled}
    >
      <div className="container mx-auto flex flex-wrap items-center justify-end gap-y-3 px-4 text-sm font-medium sm:flex-nowrap sm:gap-6">
        <div className="flex flex-wrap items-center gap-6">
          <a
            href="tel:0798477408"
            className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#897D56]"
          >
            <Phone size={14} strokeWidth={2} aria-hidden />
            0798477408
          </a>
          <a
            href="mailto:info@iec-alumni.jo"
            className="flex cursor-pointer items-center gap-2 transition-colors hover:text-[#897D56]"
          >
            <Mail size={14} strokeWidth={2} aria-hidden />
            info@iec-alumni.jo
          </a>
        </div>

        <div className="hidden h-4 w-px shrink-0 bg-white/20 sm:block" aria-hidden />

        <div className="flex items-center gap-3 opacity-90">
          <button
            type="button"
            className="group flex cursor-pointer items-center gap-1 transition-colors hover:text-[#897D56]"
            aria-haspopup="listbox"
            aria-expanded="false"
            aria-label="اللغة"
          >
            <span className="text-xs font-bold">العربية</span>
            <ChevronDown
              className="transition-transform group-hover:translate-y-0.5"
              size={12}
              strokeWidth={2}
              aria-hidden
            />
          </button>

          <div className="hidden h-3 w-px shrink-0 bg-white/40 sm:block" aria-hidden />

          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialIconClass}
            aria-label="Facebook"
          >
            <FaFacebookF className="size-[15px]" />
          </a>
          <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={socialIconClass} aria-label="X">
            <FaXTwitter className="size-[15px]" />
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialIconClass}
            aria-label="Instagram"
          >
            <FaInstagram className="size-[15px]" />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={socialIconClass}
            aria-label="LinkedIn"
          >
            <FaLinkedinIn className="size-[15px]" />
          </a>
        </div>
      </div>
    </div>
  );
}
