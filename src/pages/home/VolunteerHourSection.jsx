import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import img from '../../../assets/images/hour.png';

const INITIATIVE_IMAGE =
  'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop';

export function VolunteerHourSection() {
  return (
    <section className="relative overflow-hidden bg-white py-16" dir="rtl">
      <div className="absolute top-0 right-0 h-64 w-64 -translate-y-1/2 translate-x-1/2 rounded-full bg-[#897D56]/5 blur-3xl" />
      <div className="relative z-10 container mx-auto px-4">
        <div className="flex flex-col items-center gap-8 rounded-[2rem] bg-[#564636]/5 p-8 md:flex-row md:gap-16 md:p-12">
          <div className="flex w-full shrink-0 justify-center md:w-1/3 md:justify-start">
            <div className="relative w-full max-w-[280px] rotate-2 overflow-hidden rounded-2xl border-4 border-white shadow-lg transition-transform duration-500 hover:rotate-0">
              <img
                src={img}
                alt='ساعة تصنع الفرق'
                className="h-auto w-full"
              />
            </div>
          </div>
          <div className="w-full text-right md:w-2/3">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#897D56]/10 px-3 py-1 text-sm font-bold text-[#897D56]">
              <Clock className="size-4 shrink-0" strokeWidth={2} aria-hidden />
              <span>مبادرة تطوعية</span>
            </div>
            <h2 className="mb-6 text-3xl font-bold leading-tight text-[#564636] md:text-4xl">
              مبادرة &quot;ساعة تصنع الفرق&quot;
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              تهدف مبادرة &quot;ساعة تصنع الفرق&quot; إلى تعزيز ثقافة العمل التطوعي بين الخريجين، حيث يمكن لكل عضو
              المساهمة بساعة واحدة من وقته وخبرته لخدمة المجتمع والطلاب. سواء كانت استشارة مهنية،
              ورشة عمل، أو مساعدة في تنظيم فعالية، ساعتك الواحدة قد تكون نقطة تحول في حياة الآخرين.
            </p>
            <Link
              to="/contact"
              className="inline-flex h-12 items-center justify-center whitespace-nowrap rounded-xl bg-[#897D56] px-8 py-2 text-lg font-medium text-white shadow-lg outline-none ring-offset-background transition-all hover:bg-[#756A45] hover:shadow-xl focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              شارك معنا الآن
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
