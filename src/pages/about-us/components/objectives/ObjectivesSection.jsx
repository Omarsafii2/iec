import { Users, Lightbulb, Target, Heart } from 'lucide-react';
import Card from '../../../../components/ui/Card.jsx';
import { CLUB_OBJECTIVES } from './objectivesData.js';

const ICONS = {
  users: <Users className="size-8" strokeWidth={2} aria-hidden />,
  lightbulb: <Lightbulb className="size-8" strokeWidth={2} aria-hidden />,
  target: <Target className="size-8" strokeWidth={2} aria-hidden />,
  heart: <Heart className="size-8" strokeWidth={2} aria-hidden />,
};

/** بطاقات أهداف النادي */
export function ObjectivesSection({ items = CLUB_OBJECTIVES }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div
        className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2"
        data-aos="fade-up"
      >
        {items.map((item) => (
          <Card
            key={item.title}
            variant="objectives"
            icon={ICONS[item.iconKey]}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
}
