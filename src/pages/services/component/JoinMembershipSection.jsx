import { Send, UserRoundPlus } from 'lucide-react';
import DrupalWebform from '../../../components/DrupalWebform/DrupalWebform.jsx';
import './JoinMembershipSection.css';

const JOIN_WEBFORM_ID = import.meta.env.VITE_WEBFORM_JOIN_ID || 'contact_us';

const MEMBERSHIP_RULES = [
  'أن يكون المتقدم خريجاً من مدارس الكلية العلمية الإسلامية أو ممن درس فيها مدة لا تقل عن ثلاث سنوات.',
  'أن يكون قد أتم الثامنة عشرة من عمره، ومتمتعاً بالأهلية القانونية الكاملة.',
  'أن يكون حسن السيرة والسلوك، وغير محكوم بأي جناية مخلة بالشرف أو الأمانة.',
  'أن يوافق على النظام الداخلي للنادي، ويتعهد بالالتزام بأحكامه وقرارات الهيئة الإدارية.',
  'تسديد رسوم الانتساب والاشتراك السنوي المقررة بموجب النظام المالي للنادي (رسوم الانتساب 15 دينار والاشتراك السنوي 24 ديناً).',
];

export function JoinMembershipSection() {
  return (
    <section className="join-membership-section relative overflow-hidden bg-[#f6f4ef] py-16 sm:py-20">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#ece7dd] to-transparent" />

      <div className="container mx-auto px-4">
        <div className="join-membership-card mx-auto max-w-5xl px-5 py-6 sm:px-8 sm:py-8 lg:px-12 lg:py-10">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex items-start justify-between gap-4 border-b border-[#ebe5dc] pb-7">
              <div className="text-right">
                <h2 className="text-3xl font-extrabold tracking-tight text-[#564636] sm:text-[2rem]">
                  نموذج طلب العضوية
                </h2>
                <p className="mt-2 text-sm leading-7 text-[#8f7f69] sm:text-base">
                  يرجى تعبئة النموذج أدناه لتقديم طلب انتساب للنادي
                </p>
              </div>

              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#f0ebe3] text-[#8a7553] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)]">
                <UserRoundPlus size={26} strokeWidth={1.8} aria-hidden />
              </div>
            </div>

            <DrupalWebform
              webformId={JOIN_WEBFORM_ID}
              className="join-membership-form"
              submitLabel="إرسال طلب"
              submitIcon={<Send size={16} strokeWidth={2} />}
              excludeFields={['subject']}
              fieldOrder={[
                ['full_name', 'name', 'fullName'],
                ['email', 'mail'],
                ['phone', 'mobile', 'telephone'],
                ['message', 'details', 'note'],
              ]}
              fieldRows={[
                [
                  ['email', 'mail'],
                  ['phone', 'mobile', 'telephone'],
                ],
              ]}
              fieldOverrides={{
                full_name: { title: 'الاسم بالكامل', placeholder: 'الاسم الرباعي' },
                name: { title: 'الاسم بالكامل', placeholder: 'الاسم الرباعي' },
                fullName: { title: 'الاسم بالكامل', placeholder: 'الاسم الرباعي' },
                email: { title: 'البريد الإلكتروني', placeholder: 'example@email.com' },
                mail: { title: 'البريد الإلكتروني', placeholder: 'example@email.com' },
                phone: { title: 'رقم الهاتف', placeholder: '0790000000' },
                mobile: { title: 'رقم الهاتف', placeholder: '0790000000' },
                telephone: { title: 'رقم الهاتف', placeholder: '0790000000' },
                message: { title: 'الرسالة', placeholder: 'اكتب رسالتك هنا...' },
                details: { title: 'الرسالة', placeholder: 'اكتب رسالتك هنا...' },
                note: { title: 'الرسالة', placeholder: 'اكتب رسالتك هنا...' },
              }}
              messages={{
                loading: 'جارٍ تحميل النموذج...',
                loadError: 'تعذر تحميل نموذج طلب العضوية. يرجى المحاولة مرة أخرى.',
                submitting: 'جارٍ إرسال الطلب...',
                successTitle: 'تم إرسال الطلب بنجاح',
                successText: 'شكرًا لك، سيتم مراجعة طلبك والتواصل معك في أقرب وقت ممكن.',
                errorTitle: 'تعذر إرسال الطلب',
                errorGeneric: 'حدث خطأ أثناء إرسال الطلب. يرجى المحاولة مرة أخرى.',
                ok: 'حسنًا',
                fieldRequired: (title) => `حقل ${title} مطلوب`,
                invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
              }}
            />

            <div className="mt-8 border-t border-[#ebe5dc] pt-8">
              <h3 className="text-center text-2xl font-extrabold text-[#564636] sm:text-[1.75rem]">
                شروط التقدم لطلب الانتساب
              </h3>
              <ul className="join-membership-rules mt-6 space-y-4 pr-6 text-right text-[15px] leading-8 text-[#7a6b59] sm:text-base">
                {MEMBERSHIP_RULES.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
