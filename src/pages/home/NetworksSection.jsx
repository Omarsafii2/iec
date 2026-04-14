import Slider from '../../components/ui/Slider.jsx';
import img from '../../../assets/images/academies-1.png';

const NETWORKS = [
  { to: '/academies/arts-culture', title: 'أكاديمية الفنون والثقافة', image: img },
  { to: '/academies/sports', title: 'أكاديمية الرياضة', image: img },
  { to: '/academies/chess', title: 'أكاديمية الشطرنج', image: img },
  { to: '/academies/development', title: 'أكاديمية التطوير', image: img },
  { to: '/academies/tech-innovation', title: 'أكاديمية التكنولوجيا والابتكار', image: img },
  { to: '/academies/health-life', title: 'شبكة الصحة والحياة', image: img },
  { to: '/academies/environment', title: 'شبكة البيئة', image: img },
  { to: '/academies/community-service', title: 'شبكة خدمة المجتمع', image: img },
  { to: '/academies/youth-power', title: 'شبكة القوة الشبابية', image: img },
  { to: '/academies/golden-age', title: 'شبكة العمر الذهبي', image: img },
];

export function NetworksSection() {
  const firstFive = NETWORKS.slice(0, 5);
  const secondFive = NETWORKS.slice(5, 10);
  const topRow = [...firstFive, firstFive[0]];
  const bottomRow = [...secondFive, secondFive[0]];

  return (
    <section id="academies" className="relative z-10 -mt-24 bg-[#564636] py-20" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-white">الشبكات والأكاديميات</h2>
          <div className="mx-auto h-1 w-24 bg-[#897D56]" />
        </div>

        <div className="space-y-8">
          <Slider variant="academies" items={topRow} />
          <Slider variant="academies" items={bottomRow} />
        </div>
      </div>
    </section>
  );
}
