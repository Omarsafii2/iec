import { InnerPageHero } from '../../../../components/common/InnerPageHero.jsx';
import { BylawsSection } from '../../components/bylaws/BylawsSection.jsx';

/** النظام الداخلي */
export default function BylawsPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="النظام الداخلي"
        breadcrumbs={[
          { label: 'من نحن', href: '/#about' },
          { label: 'النظام الداخلي' },
        ]}
      />
      <BylawsSection />
    </main>
  );
}
