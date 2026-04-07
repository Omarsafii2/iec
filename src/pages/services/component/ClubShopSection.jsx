import Card from "../../../components/ui/Card.jsx";
import { CLUB_SHOP_PRODUCTS } from './shopProducts.js';

/** شبكة منتجات دكان النادي */
export function ClubShopSection({ products = CLUB_SHOP_PRODUCTS }) {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {products.map((p) => (
          <Card key={p.id} variant="slider-card" {...p} />
        ))}
      </div>
    </div>
  );
}
