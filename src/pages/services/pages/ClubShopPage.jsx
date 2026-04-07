import { InnerPageHero } from "../../../components/common/InnerPageHero.jsx";
import { ClubShopSection } from "../component/ClubShopSection.jsx";

/** دكان النادي */
export default function ClubShopPage() {
  return (
    <main className="min-h-screen bg-gray-50 pt-[140px]">
      <InnerPageHero
        title="دكان النادي"
        breadcrumbs={[
          { label: 'خدمات النادي', href: '/#services' },
          { label: 'دكان النادي' },
        ]}
      />
      <ClubShopSection />
    </main>
  );
}
