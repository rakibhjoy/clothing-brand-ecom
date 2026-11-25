import ShopLink from './ShopLink';
import { imageUrl } from '../urls';
import { categoryPath } from '../storefront';

const collections = [
  { category: 'T-SHIRTS', title: 'T-shirts', image: '/images/category-tees.jpg' },
  { category: 'JEANS', title: 'Denim', image: '/images/category-denim.jpg' },
  { category: 'SHIRTS', title: 'Shirts', image: '/images/category-shirts.jpg' }
];

export default function TriBanner({ onNavigate }) {
  return (
    <nav className="collections-grid" aria-label="Clothing categories">
      {collections.map(({ category, title, image }) => (
        <ShopLink key={category} className="collection-card" href={categoryPath(category)} onNavigate={onNavigate}>
          <img src={imageUrl(image)} alt="" loading="lazy" decoding="async" />
          <span>{title}</span>
        </ShopLink>
      ))}
    </nav>
  );
}
