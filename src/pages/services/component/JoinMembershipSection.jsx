import { Send, UserPlus } from 'lucide-react';
import DrupalWebform from '../../../components/DrupalWebform/DrupalWebform.jsx';
import './JoinMembershipSection.css';

const JOIN_WEBFORM_ID = import.meta.env.VITE_WEBFORM_JOIN_ID || 'contact_us';
const JOIN_EXTRA_DATA = JOIN_WEBFORM_ID === 'contact_us' ? { subject: 'طلب انتساب' } : undefined;

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

            <DrupalWebform
              webformId={JOIN_WEBFORM_ID}
              className="join-membership-form"
              submitLabel="ارسال طلب"
              submitIcon={<Send size={18} strokeWidth={2} />}
              excludeFields={['subject']}
              extraData={JOIN_EXTRA_DATA}
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
