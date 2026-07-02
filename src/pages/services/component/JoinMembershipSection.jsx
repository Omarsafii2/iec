import { useState } from 'react';
import { Send, UserPlus } from 'lucide-react';
import { submitWebform } from '../../../services/api/drupalWebformApi.js';
import './JoinMembershipSection.css';

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

/** Applicant fields for Drupal webform `membership_application_form`. */
const APPLICANT_KEYS = [
  'full_name',
  'birth_place',
  'birth_day',
  'birth_month',
  'birth_year',
  'years_study',
  'graduation_year',
  'islamic_college_graduate',
  'profession',
  'work_phone',
  'home_phone',
  'mobile_phone',
  // 'fax',
  // 'po_box',
  // 'postal_code',
  'email',
  // 'hobbies',
  'activities',
  'biography',
  'signature',
];

const INITIAL_FORM = Object.fromEntries(APPLICANT_KEYS.map((k) => [k, '']));

const ISLAMIC_COLLEGE_OPTIONS = [
  { value: 'yes', label: 'نعم' },
  { value: 'no', label: 'لا' },
];

function getAgeFromBirth(day, month, year) {
  const d = Number(day);
  const m = Number(month);
  const y = Number(year);
  if (!d || !m || !y) return null;

  const birth = new Date(y, m - 1, d);
  if (Number.isNaN(birth.getTime())) return null;

  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age -= 1;
  }
  return age;
}

function buildSubmissionPayload(form) {
  const payload = {};
  APPLICANT_KEYS.forEach((key) => {
    if (form[key]?.toString().trim()) payload[key] = form[key];
  });
  return payload;
}

function TextField({
  id,
  name,
  label,
  value,
  onChange,
  disabled,
  required = false,
  type = 'text',
  placeholder = '',
  ltr = false,
  ...inputProps
}) {
  const inputClass = ltr
    ? 'join-membership-form__input join-membership-form__input--ltr'
    : 'join-membership-form__input';

  return (
    <div className="join-membership-form__field">
      <label htmlFor={id} className="join-membership-form__label">
        {label}
        {required && <span className="text-red-500"> *</span>}
      </label>
      <input
        id={id}
        name={name}
        className={inputClass}
        type={type}
        placeholder={placeholder}
        dir={ltr ? 'ltr' : undefined}
        value={value}
        onChange={onChange}
        disabled={disabled}
        {...inputProps}
      />
    </div>
  );
}

function RadioGroup({ name, label, value, options, onChange, disabled }) {
  return (
    <fieldset className="join-membership-form__field">
      <legend className="join-membership-form__label">{label}</legend>
      <div className="join-membership-form__radios" role="radiogroup" aria-label={label}>
        {options.map((opt) => (
          <label key={opt.value} className="join-membership-form__radio-label">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={onChange}
              disabled={disabled}
            />
            <span>{opt.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function JoinMembershipSection() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = async () => {
    const required = [
      'full_name',
      'birth_day',
      'birth_month',
      'birth_year',
      'mobile_phone',
      'email',
      'signature',
    ];
    const missing = required.find((k) => !form[k].toString().trim());
    if (missing) {
      setError('يرجى تعبئة جميع الحقول المطلوبة.');
      return;
    }

    const age = getAgeFromBirth(form.birth_day, form.birth_month, form.birth_year);
    if (age === null) {
      setError('يرجى إدخال تاريخ ميلاد صحيح.');
      return;
    }
    if (age < 18) {
      setError('يجب أن يكون عمرك 18 عاماً على الأقل وقت تقديم الطلب.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      setError('يرجى إدخال بريد إلكتروني صحيح.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await submitWebform('membership_application_form', buildSubmissionPayload(form));
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
        <div className="mx-auto max-w-4xl">
          <div
            className="join-membership-card rounded-3xl border border-gray-100 bg-white p-8 shadow-sm md:p-12"
            data-aos="fade-up"
          >
            <div className="mb-8 flex items-center gap-4 border-b border-gray-100 pb-8">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#897D56]/10 text-[#897D56]">
                <UserPlus size={32} strokeWidth={2} aria-hidden />
              </div>
              <div className="text-right">
                <h2 className="text-2xl font-bold text-[#564636]">طلب إنتساب</h2>
                <p className="text-gray-500">نموذج طلب العضوية في نادي خريجي الكلية العلمية الإسلامية</p>
              </div>
            </div>

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
                <div className="join-membership-letter">
                  <p>السادة الهيئة الإدارية لنادي خريجي الكلية العلمية الإسلامية :</p>
                  <p>تحية طيبة و بعد ،</p>
                  <p>
                    أتقدم إليكم بعد الاطلاع على نظام النادي و مراميه، و الرغبة بأن تقبلوني عضواً فيه،
                    و أتعهد بأن أحترم قوانينه و قرارات الهيئة الإدارية.
                  </p>
                  <p>و تفضلوا بقبول فائق الإحترام ،،،</p>
                </div>

                <TextField
                  id="join-full-name-ar"
                  name="full_name"
                  label="الإسم الكامل"
                  placeholder="الاسم الرباعي"
                  value={form.full_name}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />

                <TextField
                  id="join-full-name-en"
                  name="full_name"
                  label="Full Name"
                  placeholder="Full Name"
                  ltr
                  value={form.full_name}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <div className="join-membership-form__row join-membership-form__row--4">
                  <TextField
                    id="join-birth-place"
                    name="birth_place"
                    label="مكان الولادة"
                    value={form.birth_place}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <TextField
                    id="join-birth-day"
                    name="birth_day"
                    label="اليوم"
                    type="number"
                    min={1}
                    max={31}
                    ltr
                    value={form.birth_day}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                  <TextField
                    id="join-birth-month"
                    name="birth_month"
                    label="الشهر"
                    type="number"
                    min={1}
                    max={12}
                    ltr
                    value={form.birth_month}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                  <TextField
                    id="join-birth-year"
                    name="birth_year"
                    label="السنة"
                    type="number"
                    min={1940}
                    max={new Date().getFullYear()}
                    ltr
                    value={form.birth_year}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>

                <TextField
                  id="join-years-study"
                  name="years_study"
                  label="عدد سنوات الدراسة في الكلية العلمية الإسلامية"
                  type="number"
                  min={0}
                  ltr
                  value={form.years_study}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <TextField
                  id="join-graduation-year"
                  name="graduation_year"
                  label="سنة التخرج من المدرسة"
                  type="number"
                  ltr
                  value={form.graduation_year}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <RadioGroup
                  name="islamic_college_graduate"
                  label="هل كان تخرجك من الكلية العلمية الإسلامية"
                  value={form.islamic_college_graduate}
                  options={ISLAMIC_COLLEGE_OPTIONS}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <TextField
                  id="join-profession"
                  name="profession"
                  label="المهنة"
                  value={form.profession}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <div className="join-membership-form__row join-membership-form__row--3">
                  <TextField
                    id="join-work-phone"
                    name="work_phone"
                    label="تلفون العمل"
                    type="tel"
                    ltr
                    value={form.work_phone}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <TextField
                    id="join-home-phone"
                    name="home_phone"
                    label="تلفون المنزل"
                    type="tel"
                    ltr
                    value={form.home_phone}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <TextField
                    id="join-mobile-phone"
                    name="mobile_phone"
                    label="الخليوي"
                    type="tel"
                    placeholder="0790000000"
                    ltr
                    value={form.mobile_phone}
                    onChange={handleChange}
                    disabled={submitting}
                    required
                  />
                </div>

                {/* <div className="join-membership-form__row join-membership-form__row--3">
                  <TextField
                    id="join-fax"
                    name="fax"
                    label="فاكس"
                    type="tel"
                    ltr
                    value={form.fax}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <TextField
                    id="join-po-box"
                    name="po_box"
                    label="صندوق بريد"
                    ltr
                    value={form.po_box}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                  <TextField
                    id="join-postal-code"
                    name="postal_code"
                    label="الرمز البريدي"
                    ltr
                    value={form.postal_code}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div> */}

                <TextField
                  id="join-email-ar"
                  name="email"
                  label="البريد الإلكتروني"
                  type="email"
                  placeholder="example@email.com"
                  ltr
                  value={form.email}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />

                <TextField
                  id="join-email-en"
                  name="email"
                  label="Email"
                  type="email"
                  ltr
                  value={form.email}
                  onChange={handleChange}
                  disabled={submitting}
                />

                <div className="join-membership-form__row">
                  {/* <TextField
                    id="join-hobbies"
                    name="hobbies"
                    label="الهوايات"
                    value={form.hobbies}
                    onChange={handleChange}
                    disabled={submitting}
                  /> */}
                  <TextField
                    id="join-activities"
                    name="activities"
                    label="النشاطات"
                    value={form.activities}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <div className="join-membership-form__field">
                  <label htmlFor="join-biography" className="join-membership-form__label">
                    السيرة الذاتية
                  </label>
                  <textarea
                    id="join-biography"
                    name="biography"
                    className="join-membership-form__textarea"
                    rows={4}
                    placeholder="اكتب نبذة عنك..."
                    value={form.biography}
                    onChange={handleChange}
                    disabled={submitting}
                  />
                </div>

                <TextField
                  id="join-signature"
                  name="signature"
                  label="التوقيع"
                  placeholder="الاسم كتوقيع"
                  value={form.signature}
                  onChange={handleChange}
                  disabled={submitting}
                  required
                />

                <div className="join-membership-form__admin" aria-label="لاستعمال الهيئة الإدارية">
                  <p className="join-membership-form__admin-heading">لاستعمال الهيئة الإدارية</p>

                  <TextField
                    id="join-admin-meeting-date"
                    label="إجتمعت الهيئة الإدارية بتاريخ ... و تقرر قبول / عدم قبول"
                    value=""
                    onChange={() => {}}
                    disabled
                  />

                  <TextField
                    id="join-member-name"
                    label="عضواً : عاملاً    مؤازراً    فخرياً"
                    value=""
                    onChange={() => {}}
                    disabled
                  />

                  <div className="join-membership-form__row">
                    <TextField
                      id="join-membership-fee-receipt"
                      label="سددت رسوم الإنتساب بإيصال رقم"
                      value=""
                      onChange={() => {}}
                      disabled
                    />
                    <TextField
                      id="join-membership-fee-date"
                      label="تاريخ"
                      value=""
                      onChange={() => {}}
                      disabled
                    />
                  </div>

                  <TextField
                    id="join-membership-number"
                    label="رقم العضوية"
                    value=""
                    onChange={() => {}}
                    disabled
                  />

                  <p className="join-membership-form__admin-footer">رئيس الهيئة الإدارية</p>
                </div>

                {error && (
                  <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>
                )}

                <div className="join-membership-form__actions">
                  <button
                    type="button"
                    className="join-membership-form__button"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <span>{submitting ? 'جارٍ الإرسال...' : 'إرسال الطلب'}</span>
                    {!submitting && <Send size={18} strokeWidth={2} aria-hidden />}
                  </button>
                </div>
              </div>
            )}

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
