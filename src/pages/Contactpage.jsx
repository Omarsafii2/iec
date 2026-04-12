import DrupalWebform from '../components/drupalWebForm/DrupalWebform';

/**
 * ContactPage
 *
 * Renders the contact_us webform dynamically from Drupal.
 *
 * Fields from Drupal (auto-discovered):
 *   full_name, phone, email, subject, message
 *
 * fieldRows mirrors the webform_flexbox row Drupal defined:
 *   full_name + phone side-by-side
 */
export default function ContactPage() {
  return (
    <DrupalWebform
      webformId="contact_us"
      submitLabel="إرسال الرسالة"
      fieldRows={[['full_name', 'phone']]}
      messages={{
        loading:      'جارٍ تحميل النموذج…',
        loadError:    'تعذّر تحميل النموذج. يرجى المحاولة مجدداً.',
        submitting:   'جارٍ الإرسال…',
        successTitle: 'تم الإرسال بنجاح',
        successText:  'شكراً لك، سنتواصل معك في أقرب وقت ممكن.',
        errorTitle:   'فشل الإرسال',
        errorGeneric: 'حدث خطأ ما. يرجى المحاولة مجدداً.',
        ok:           'حسناً',
        fieldRequired: (title) => `${title} مطلوب`,
        invalidEmail: 'يرجى إدخال بريد إلكتروني صحيح',
        invalidUrl:   'يرجى إدخال رابط صحيح',
      }}
    />
  );
}