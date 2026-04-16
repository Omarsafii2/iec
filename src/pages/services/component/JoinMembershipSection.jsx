import { useState } from 'react';
import { Send, UserPlus } from 'lucide-react';
import { submitWebform } from '../../../services/api/drupalWebformApi.js';
import './JoinMembershipSection.css';

// ─── Terms from webform #text field ──────────────────────────────────────────
// Extracted from the `terms` processed_text element in the webform schema

const MEMBERSHIP_TERMS_HTML = `
  <h3>شروط التقدم لطلب الانتساب</h3>
  <ul>
    <li>أن يكون المتقدم بطلب الانتساب من محبي هواية الفئة الرياضية أو ممن سبق ممارستها لمدة لا تقل عن ثلاث سنوات.</li>
    <li>ألا يقل عمر المتقدم بطلب عضوية النادي عن عمره 18 عاماً وقت تقديم الطلب للنادي.</li>
    <li>أن يلتزم مقدم الطلب بالانتساب بالنادي، وعدم تقدمه بطلبات أو اتخاذ مواقف مخالفة للنادي أو إدارته.</li>
    <li>أن يلتزم عضو النادي الجديد المعتمد بالالتزام بأنظمة وقوانين الجمعية الداخلية.</li>
    <li>لا يحق لعضو النادي أو طالب الانتساب استرداد الرسوم السنوية المدفوعة بحصول الانتساب ولا تُقبل استرداد الاشتراك السنوي بعد قبوله.</li>
  </ul>
`;

// ─── Initial form state ───────────────────────────────────────────────────────

const INITIAL_FORM = {
  full_name: '',
  age:       '',
  email:     '',
  phone:     '',
  message:   '',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function JoinMembershipSection() {
  const [form, setForm]             = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess]       = useState(false);
  const [error, setError]           = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    // Client-side required validation
    const required = ['full_name', 'age', 'email', 'phone', 'message'];
    const missing  = required.find((k) => !form[k].toString().trim());
    if (missing) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }

    // Age minimum validation (Drupal sets #min: 18)
    if (Number(form.age) < 18) {
      setError('يجب أن يكون عمرك 18 عاماً على الأقل.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitWebform('membership_application_form', {
        ...form,
        age: Number(form.age), // send as number
      });
      setSuccess(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(err.message || 'حدث خطأ أثناء الإرسال. يرجى المحاولة مرة أخرى.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="join-membership-section" dir="rtl">
      <div className="container mx-auto px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <div className="join-membership-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12" data-aos="fade-up">

            {/* Header */}
            <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#897D56]/10 text-[#897D56]">
                <UserPlus size={32} strokeWidth={2} aria-hidden />
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-[#564636]">نموذج طلب العضوية</h2>
                <p className="text-gray-500">يرجى تعبئة النموذج أدناه لتقديم طلب انتساب للنادي</p>
              </div>
            </div>

            {/* Success state */}
            {success ? (
              <div className="flex flex-col items-center justify-center gap-4 rounded-2xl bg-green-50 p-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
                  <Send size={28} strokeWidth={2} />
                </div>
                <h4 className="text-xl font-bold text-green-700">تم إرسال طلبك بنجاح!</h4>
                <p className="text-green-600">سيتم مراجعة طلبك والرد عليك في أقرب وقت ممكن.</p>
                <button
                  type="button"
                  className="mt-4 rounded-xl border border-green-300 px-6 py-2 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
                  onClick={() => setSuccess(false)}
                >
                  تقديم طلب جديد
                </button>
              </div>
            ) : (
              <div className="join-membership-form">

                {/* Full name */}
                <div className="join-membership-form__field">
                  <label htmlFor="join-full-name" className="join-membership-form__label">
                    الاسم بالكامل <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="join-full-name"
                    name="full_name"
                    className="join-membership-form__input"
                    type="text"
                    placeholder="الاسم الرباعي"
                    value={form.full_name}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                {/* Age */}
                <div className="join-membership-form__field">
                  <label htmlFor="join-age" className="join-membership-form__label">
                    العمر بالرقم <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="join-age"
                    name="age"
                    className="join-membership-form__input join-membership-form__input--ltr"
                    type="number"
                    min={18}
                    placeholder="18"
                    dir="ltr"
                    value={form.age}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                {/* Email + Phone row */}
                <div className="join-membership-form__row">
                  <div className="join-membership-form__field">
                    <label htmlFor="join-email" className="join-membership-form__label">
                      البريد الإلكتروني <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="join-email"
                      name="email"
                      className="join-membership-form__input join-membership-form__input--ltr"
                      type="email"
                      placeholder="example@email.com"
                      dir="ltr"
                      value={form.email}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                  </div>
                  <div className="join-membership-form__field">
                    <label htmlFor="join-phone" className="join-membership-form__label">
                      رقم الهاتف <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="join-phone"
                      name="phone"
                      className="join-membership-form__input join-membership-form__input--ltr"
                      type="tel"
                      placeholder="0790000000"
                      dir="ltr"
                      value={form.phone}
                      onChange={handleChange}
                      disabled={submitting}
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="join-membership-form__field">
                  <label htmlFor="join-message" className="join-membership-form__label">
                    الرسالة <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="join-message"
                    name="message"
                    className="join-membership-form__textarea"
                    placeholder="اكتب رسالتك هنا..."
                    value={form.message}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                {/* Error */}
                {error && (
                  <p className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                )}

                {/* Submit */}
                <div className="join-membership-form__actions">
                  <button
                    type="button"
                    className="join-membership-form__button"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <span>{submitting ? 'جارٍ الإرسال...' : 'إرسال طلب'}</span>
                    {!submitting && <Send size={18} strokeWidth={2} aria-hidden />}
                  </button>
                </div>
              </div>
            )}

            {/* Terms — from webform `terms` processed_text field */}
            <div
              className="mt-12 border-t border-gray-100 pt-8 text-right text-sm leading-relaxed text-gray-600
                [&_h3]:mb-6 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#564636]
                [&_ul]:space-y-4 [&_li]:flex [&_li]:items-start [&_li]:gap-3
                [&_li]:before:mt-2 [&_li]:before:h-1.5 [&_li]:before:w-1.5
                [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-[#897D56]
                [&_li]:before:content-['']"
              dangerouslySetInnerHTML={{ __html: MEMBERSHIP_TERMS_HTML }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default JoinMembershipSection;