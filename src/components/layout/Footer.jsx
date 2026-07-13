import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

const footerLinkClass =
  'group flex items-center gap-2 text-sm transition-colors hover:text-[#897D56]';

function FooterNavLink({ to, children }) {
  return (
    <Link to={to} className={footerLinkClass}>
      <span className="size-1.5 rounded-full bg-[#897D56] opacity-0 transition-opacity group-hover:opacity-100" />
      {children}
    </Link>
  );
}

function FooterHashLink({ href, children }) {
  return (
    <a href={href} className={footerLinkClass}>
      <span className="size-1.5 rounded-full bg-[#897D56] opacity-0 transition-opacity group-hover:opacity-100" />
      {children}
    </a>
  );
}

const socialBtnClass =
  'group flex size-10 items-center justify-center rounded-full bg-white/5 transition-all duration-300 hover:bg-[#897D56] hover:text-white';

/** Google Maps — نادي خريجي الكلية العلمية الإسلامية (الجبيهة) */
const FOOTER_CLUB_MAPS_URL =
  'https://www.google.com/maps/place/%D9%86%D8%A7%D8%AF%D9%8A+%D8%AE%D8%B1%D9%8A%D8%AC%D9%8A+%D8%A7%D9%84%D9%83%D9%84%D9%8A%D8%A9+%D8%A7%D9%84%D8%B9%D9%84%D9%85%D9%8A%D8%A9+%D8%A7%D9%84%D8%A5%D8%B3%D9%84%D8%A7%D9%85%D9%8A%D8%A9%E2%80%AD/@32.0205214,35.8876073,17z/data=!3m1!4b1!4m6!3m5!1s0x151c9fc5e25d397b:0x65c859eeb154b132!8m2!3d32.0205214!4d35.8876073!16s%2Fg%2F11gns0g34h?entry=ttu&g_ep=EgoyMDI2MDUxMy4wIKXMDSoASAFQAw%3D%3D';

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden border-t-4 border-[#897D56] bg-[#1C1C1C] py-6 text-gray-300 md:py-6"
      dir="rtl"
    >
      <div className="relative z-10 container mx-auto px-4">
        <div className="grid gap-6 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-5 flex items-center gap-4">
              <div className="">
                <img
                  src="/logo.png"
                  alt="IECA Alumni Club Logo"
                  className="size-24 object-contain"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold leading-tight text-white">
                  نادي خريجي
                  <span className="block text-[#897D56]">الكلية العلمية الإسلامية</span>
                  <span className="mt-1 block text-[#897D56]">- مكرمة ملكية سامية -</span>
                </h3>
              </div>
            </div>
            <p className="mb-5 max-w-sm leading-relaxed text-gray-400">
              المظلة الجامعة لكل خريجي الكلية العلمية الإسلامية، نعمل معاً لخدمة مجتمعنا ووطنا الغالي من
              خلال مبادرات ريادية وشراكات استراتيجية.
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={socialBtnClass} aria-label="Facebook">
                <FaFacebookF className="size-[18px] transition-transform group-hover:scale-110" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className={socialBtnClass} aria-label="X">
                <FaXTwitter className="size-[18px] transition-transform group-hover:scale-110" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={socialBtnClass} aria-label="Instagram">
                <FaInstagram className="size-[18px] transition-transform group-hover:scale-110" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className={socialBtnClass} aria-label="LinkedIn">
                <FaLinkedinIn className="size-[18px] transition-transform group-hover:scale-110" />
              </a>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <h4 className="mb-4 inline-block border-b-2 border-[#897D56] pb-2 text-lg font-bold text-white">
              روابط سريعة
            </h4>
            <ul className="space-y-3">
              <li>
                <FooterHashLink href="/#about">من نحن</FooterHashLink>
              </li>
              <li>
                <FooterNavLink to="/about/board-members">الهيئة الإدارية</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/news/initiatives">المبادرات</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/news/events">الفعاليات</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/news/activities">الأنشطة</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/faq">الأسئلة الشائعة</FooterNavLink>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 inline-block border-b-2 border-[#897D56] pb-2 text-lg font-bold text-white">
              عن النادي
            </h4>
            <ul className="space-y-3">
              <li>
                <FooterNavLink to="/about/history">تاريخ التأسيس</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/about/objectives">أهداف النادي</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/about/bylaws">النظام الداخلي</FooterNavLink>
              </li>
              <li>
                <FooterNavLink to="/about/achievements">إنجازات النادي</FooterNavLink>
              </li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="mb-4 inline-block border-b-2 border-[#897D56] pb-2 text-lg font-bold text-white">
              معلومات التواصل
            </h4>
            <ul className="space-y-4">
              <li className="group flex items-start gap-4">
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56] transition-colors group-hover:bg-[#897D56] group-hover:text-white">
                  <MapPin size={20} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 font-medium text-white">العنوان</p>
                  <a
                    href={FOOTER_CLUB_MAPS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-400 transition-colors hover:text-[#897D56]"
                  >
                    عمان، الأردن - الجبيهة
                  </a>
                </div>
              </li>
           
              <li className="group flex items-center gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56] transition-colors group-hover:bg-[#897D56] group-hover:text-white">
                  <Mail size={20} strokeWidth={2} aria-hidden />
                </div>
                <div>
                  <p className="mb-1 font-medium text-white">البريد الإلكتروني</p>
                  <a
                    href="mailto:info@iec-alumni.jo"
                    className="font-sans text-sm text-gray-400 hover:text-[#897D56]"
                  >
                    info@iec-alumni.jo
                  </a>
                </div>
              </li>
           
              <li className="group flex items-start gap-4">
                <div className="mt-1 flex size-10 shrink-0 items-center justify-center rounded-full bg-[#897D56]/10 text-[#897D56] transition-colors group-hover:bg-[#897D56] group-hover:text-white">
                  <Phone size={20} strokeWidth={2} aria-hidden />
                </div>
                <div className="min-w-0 space-y-3">
                  <p className="mb-1 font-medium text-white">الهاتف</p>
                  <div className="space-y-2.5 text-sm text-gray-400">
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500">مبادرات وفعاليات</p>
                      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5" dir="ltr">
                        <a href="tel:+962790183335" className="hover:text-[#897D56]">
                          0790183335
                        </a>
                        <span aria-hidden className="text-gray-500">
                          +
                        </span>
                        <a href="tel:+962798477408" className="hover:text-[#897D56]">
                          0798477408
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500">الدورات</p>
                      <p className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5" dir="ltr">
                        <a href="tel:+962770454499" className="hover:text-[#897D56]">
                          0770454499
                        </a>
                        <span aria-hidden className="text-gray-500">
                          +
                        </span>
                        <a href="tel:+962770680690" className="hover:text-[#897D56]">
                          0770680690
                        </a>
                      </p>
                    </div>
                    <div>
                      <p className="mb-1 text-xs font-medium text-gray-500">قاعات وملاعب</p>
                      <p dir="ltr">
                        <a href="tel:+962770454499" className="hover:text-[#897D56]">
                          0770454499
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-gray-800 pt-5 md:flex-row">
          <p className="text-sm text-gray-500">
          تصميم و تطوير شركة الشعاع الازرق لحلول البرمجيات. جميع الحقوق محفوظة © 2026
          </p>
          <div className="flex gap-8 text-sm">
            <Link to="/contact" className="text-gray-500 transition-colors hover:text-[#897D56]">
              اتصل بنا
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
