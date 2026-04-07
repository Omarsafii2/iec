import Slider from '../../components/ui/Slider.jsx';
import img1 from '../../../assets/images/partner.png';
/** Replace with real logo URLs under `public/` when assets are available. */
export const PARTNER_LOGOS = [
  { image: img1, alt: 'Partner 1' },
  { image: img1, alt: 'Partner 2' },
  { image: img1, alt: 'Partner 3' },
  { image: img1, alt: 'Partner 4' },
  { image: img1, alt: 'Partner 5' },
  { image: img1, alt: 'Partner 6' },
];

export function PartnersSection() {
  return <Slider variant="partners" partners={PARTNER_LOGOS} title="شركاؤنا" />;
}
