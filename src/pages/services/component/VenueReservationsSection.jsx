import Card from '../../../components/ui/Card.jsx';
import { RESERVATION_VENUES } from './reservationVenues.js';

/** شبكة ملاعب وقاعات للحجز */
export function VenueReservationsSection({ venues = RESERVATION_VENUES }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {venues.map((venue) => (
          <Card key={venue.id} variant="reservation-venue" {...venue} />
        ))}
      </div>
    </div>
  );
}
