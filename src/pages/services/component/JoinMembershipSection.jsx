import { Send, UserPlus } from 'lucide-react';
import './JoinMembershipSection.css';

const MEMBERSHIP_RULES = [
  'أن يكون المتقدم خريجاً من مدارس الكلية العلمية الإسلامية، أو ممن درس فيها لمدة لا تقل عن ثلاث سنوات.',
  'أن يكون قد أتم الثامنة عشرة من عمره، ومتمتعاً بالأهلية القانونية الكاملة.',
  'أن يكون حسن السيرة والسلوك، وغير محكوم بجناية أو جنحة مخلة بالشرف أو الأمانة.',
  'أن يوافق على النظام الداخلي للنادي، ويتعهد بالالتزام بأهدافه وقرارات الهيئة الإدارية.',
  'تسديد رسوم الانتساب والاشتراك السنوي المقررة بموجب النظام المالي للنادي (رسوم الانتساب 15 دينار والاشتراك السنوي 24 دينار).',
];

export function JoinMembershipSection() {
  return (
    <section className="join-membership-section" dir="rtl">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="join-membership-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">
            <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#897D56]/10 text-[#897D56]">
                <UserPlus size={32} strokeWidth={2} aria-hidden />
              </div>

              <div className="text-right">
                <h2 className="text-2xl font-bold text-[#564636]">نموذج طلب العضوية</h2>
                <p className="text-gray-500">يرجى تعبئة النموذج أدناه لتقديم طلب انتساب للنادي</p>
              </div>
            </div>

            <form className="join-membership-form">
              <div className="join-membership-form__field">
                <label htmlFor="join-full-name" className="join-membership-form__label">الاسم بالكامل</label>
                <input id="join-full-name" className="join-membership-form__input" type="text" placeholder="الاسم الرباعي" />
              </div>

              <div className="join-membership-form__row">
                <div className="join-membership-form__field">
                  <label htmlFor="join-email" className="join-membership-form__label">البريد الإلكتروني</label>
                  <input id="join-email" className="join-membership-form__input join-membership-form__input--ltr" type="email" placeholder="example@email.com" dir="ltr" />
                </div>

                <div className="join-membership-form__field">
                  <label htmlFor="join-phone" className="join-membership-form__label">رقم الهاتف</label>
                  <input id="join-phone" className="join-membership-form__input join-membership-form__input--ltr" type="tel" placeholder="0790000000" dir="ltr" />
                </div>
              </div>

              <div className="join-membership-form__field">
                <label htmlFor="join-message" className="join-membership-form__label">الرسالة</label>
                <textarea id="join-message" className="join-membership-form__textarea" placeholder="اكتب رسالتك هنا..." />
              </div>

              <div className="join-membership-form__actions">
                <button type="button" className="join-membership-form__button">
                  <span>ارسال طلب</span>
                  <Send size={18} strokeWidth={2} aria-hidden />
                </button>
              </div>
            </form>

            <div className="mt-12 border-t border-gray-100 pt-8">
              <h3 className="mb-6 text-right text-xl font-bold text-[#564636]">شروط التقدم لطلب الانتساب</h3>
              <ul className="join-membership-rules space-y-4">
                {MEMBERSHIP_RULES.map((rule) => (
                  <li key={rule} className="flex items-start gap-3 text-sm leading-relaxed text-gray-600 sm:text-[15px]">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#897D56]" aria-hidden />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
