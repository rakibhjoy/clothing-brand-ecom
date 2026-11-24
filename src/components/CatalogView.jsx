import { useState } from 'react';
import { CATEGORIES } from '../data/products';
import { categoryPath, findProducts } from '../storefront';
import ShopLink from './ShopLink';
import ProductCard from './ProductCard';

const categoryLabels = {
  ALL: 'All clothing', 'NEW ARRIVALS': 'New arrivals', 'BEST SELLERS': 'Best sellers',
  'T-SHIRTS': 'T-shirts', SHIRTS: 'Shirts', JEANS: 'Denim', ACCESSORIES: 'Accessories',
  'KNIT COLLAR': 'Knit collar', 'YOU MAY LIKE': 'Recommended'
};

export default function CatalogView({ products, route, onNavigate, ...shopping }) {
  const { category, query } = route;
  const [sort, setSort] = useState('featured');
  const items = findProducts(products, category, query, sort);
  const title = query ? 'Search results' : categoryLabels[category];

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      <nav className="breadcrumbs catalog-breadcrumbs" aria-label="Breadcrumb"><ShopLink href="/" onNavigate={onNavigate}>Home</ShopLink><span aria-hidden="true">/</span><span aria-current="page">Shop</span></nav>
      <div className="catalog-heading">
        <div className="catalog-title-group">
          <h1 id="catalog-title">{title}</h1>
          {query && <p>Results for &ldquo;{query}&rdquo;</p>}
          <p className="catalog-results" role="status">{items.length} {items.length === 1 ? 'product' : 'products'}</p>
        </div>
        <label className="sort-label">
          <span>Sort by</span>
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            <option value="featured">Featured</option>
            <option value="price-asc">Price, low to high</option>
            <option value="price-desc">Price, high to low</option>
            <option value="rating">Highest rated</option>
          </select>
        </label>
      </div>
      <nav className="category-nav" aria-label="Collections">
        {CATEGORIES.map((item) => (
          <ShopLink key={item} href={categoryPath(item)} onNavigate={onNavigate} aria-current={!query && category === item ? "page" : undefined}>
            {categoryLabels[item]}
          </ShopLink>
        ))}
      </nav>
      {items.length ? (
        <div className="product-grid">
          {items.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} {...shopping} />)}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No products found</h2>
          <p>{query ? 'Try a different product name, color or category.' : 'Browse the full catalog to see more clothing.'}</p>
          <ShopLink className="button button-dark" href="/catalog" onNavigate={onNavigate}>Browse all clothing</ShopLink>
        </div>
      )}
    </section>
  );
}
