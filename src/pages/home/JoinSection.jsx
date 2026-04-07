import { GraduationCap, ArrowLeft } from 'lucide-react';

const JOIN_BG_IMAGE =
  'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1920&q=80';

export function JoinSection() {
  return (
    <section id="join" className="relative overflow-hidden py-24" dir="rtl">
      <div className="absolute inset-0 z-0">
        <img
          src={JOIN_BG_IMAGE}
          alt="IECA Building"
          className="size-full scale-105 object-cover"
        />
        <div className="absolute inset-0 bg-[#564636]/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#564636] via-[#564636]/85 to-[#4a3c2e]/95" />
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: 'radial-gradient(white 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />
      </div>

      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/2 rounded-full bg-[#897D56]/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-[#897D56]/20 blur-3xl" />

      <div className="relative z-10 container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-4 shadow-2xl ring-1 ring-white/5 backdrop-blur-md">
            <GraduationCap className="size-10 text-[#d4c5a0]" strokeWidth={2} aria-hidden />
          </div>

          <h2 className="mb-8 text-4xl font-bold leading-tight tracking-tight text-white md:text-6xl">
            هل أنت خريج{' '}
            <br className="hidden md:block" />
            <span className="relative mt-2 inline-block text-[#d4c5a0]">
              الكلية العلمية الإسلامية
              <svg
                className="absolute -bottom-1 right-0 h-3 w-full text-[#897D56] opacity-60"
                viewBox="0 0 200 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M2.00025 6.99997C25.8038 4.60252 89.8637 1.88607 198.001 2.00001"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>{' '}
            ؟
          </h2>

          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-gray-200 opacity-90 md:text-xl">
            انضم إلينا اليوم وكن جزءاً من شبكة خريجينا المتميزة. سجل عضويتك الآن واستفد من كافة الميزات
            والخدمات الحصرية للأعضاء.
          </p>

          <div className="flex flex-col items-center gap-6">
            <a
              href="https://iec-alumni.figma.site"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-16 items-center justify-center gap-4 overflow-hidden rounded-2xl border-t border-white/20 bg-[#897D56] px-12 py-2 text-xl font-medium text-white shadow-[0_0_50px_-10px_rgba(137,125,86,0.6)] outline-none ring-offset-background transition-all duration-300 hover:scale-[1.02] hover:bg-[#756A45] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="absolute inset-0 -translate-x-full skew-x-12 bg-white/20 transition-transform duration-500 ease-out group-hover:translate-x-0" />
              <span className="relative z-10 font-bold">استمارة تسجيل عضوية جديدة</span>
              <ArrowLeft
                className="relative z-10 size-6 transition-transform group-hover:-translate-x-1"
                strokeWidth={2}
                aria-hidden
              />
            </a>

            <p className="flex items-center gap-2 text-sm text-white/50">
              <span className="size-1.5 animate-pulse rounded-full bg-[#4ade80]" />
              التسجيل متاح لجميع الدفعات
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
