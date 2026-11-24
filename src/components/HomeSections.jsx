import ProductCard from './ProductCard';
import ShopLink from './ShopLink';
import { categoryPath, findProducts } from '../storefront';

export default function HomeSections({ products, title, category, onNavigate, ...shopping }) {
  const collection = findProducts(products, category);
  const headingId = 'shelf-' + category.toLowerCase().replaceAll(' ', '-');
  return (
    <section className="home-section" aria-labelledby={headingId}>
      <div className="section-heading">
        <h2 id={headingId}>{title}</h2>
        <ShopLink className="text-link" href={categoryPath(category)} onNavigate={onNavigate} aria-label={'View collection for ' + title.toLowerCase()}>View collection</ShopLink>
      </div>
      <div className="product-grid">
        {collection.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} {...shopping} />)}
      </div>
    </section>
  );
}
