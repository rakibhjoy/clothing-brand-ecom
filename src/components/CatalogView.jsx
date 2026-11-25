import { useState } from 'react';
import { CATEGORIES } from '../data/products';
import { COLLECTIONS } from '../data/collections';
import { categoryPath, findProducts } from '../storefront';
import ShopLink from './ShopLink';
import ProductCard from './ProductCard';

export default function CatalogView({ products, route, collection, onNavigate, ...shopping }) {
  const { category, query } = route;
  const [sort, setSort] = useState('featured');
  const items = findProducts(products, category, query, sort);

  return (
    <section className="catalog" aria-labelledby="catalog-title">
      {collection && (
        <div id="catalog-banner" className="catalog-hero">
          <img className="catalog-hero-image" src={collection.image} alt="" style={{ objectPosition: collection.position }} />
          <div className="container catalog-hero-content">
            <h1 id="catalog-title">{collection.title}</h1>
            <p>{collection.description}</p>
          </div>
        </div>
      )}
      <nav className="breadcrumbs catalog-breadcrumbs" aria-label="Breadcrumb"><ShopLink href="/" onNavigate={onNavigate}>Home</ShopLink><span aria-hidden="true">/</span><span aria-current="page">Shop</span></nav>
      <div className={collection ? 'catalog-heading catalog-heading-collection' : 'catalog-heading'}>
        <div className="catalog-title-group">
          {!collection && (
            <>
              <h1 id="catalog-title">Search results</h1>
              <p>Results for &ldquo;{query}&rdquo;</p>
            </>
          )}
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
            {COLLECTIONS[item].title}
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
