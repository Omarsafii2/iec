import { InnerPageHero } from '../components/common/InnerPageHero.jsx';
import { ContactSection } from '../features/contact/components/ContactSection.jsx';

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="اتصل بنا"
        breadcrumbs={[
          { label: 'اتصل بنا' },
        ]}
      />
      <ContactSection />
    </main>
  );
}
