import React from 'react';
import { Sparkles, Flame, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';

export default function HomeSections({
  products,
  onOpenProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onSelectCategory
}) {
  const allNewArrivals = products.filter((p) => p.isNewArrival || p.badge?.toLowerCase().includes('new'));
  const allBestSellers = products.filter((p) => p.isBestSeller || p.badge?.toLowerCase().includes('best'));
  const allYouMayLike = products.filter((p) => p.isRecommended || p.rating >= 4.9);

  // Exactly 4 products displayed per category grid on Home
  const newArrivals = allNewArrivals.slice(0, 4);
  const bestSellers = allBestSellers.slice(0, 4);
  const youMayLike = allYouMayLike.slice(0, 4);

  return (
    <div className="home-curated-showcases">
      {/* 1. NEW ARRIVALS - 4 PRODUCT GRID (NO SCROLL EFFECT) */}
      <section className="curated-shelf-section" id="shelf-new-arrivals">
        <div className="container">
          <div className="shelf-header-row">
            <div className="shelf-header-left">
              <span className="shelf-badge-tag">
                <Sparkles size={12} /> FRESH DROPS 2026
              </span>
              <h2 className="shelf-main-title">NEW ARRIVALS</h2>
            </div>
            <div className="shelf-header-right">
              <button
                className="shelf-view-all-btn"
                onClick={() => onSelectCategory('NEW ARRIVALS', true)}
                id="btn-see-more-new-arrivals"
              >
                <span>SEE MORE ({allNewArrivals.length} PIECES)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="home-category-grid">
            {newArrivals.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. BEST SELLERS - 4 PRODUCT GRID (NO SCROLL EFFECT) */}
      <section className="curated-shelf-section shelf-dark-tint" id="shelf-best-sellers">
        <div className="container">
          <div className="shelf-header-row">
            <div className="shelf-header-left">
              <h2 className="shelf-main-title">BEST SELLERS</h2>
            </div>
            <div className="shelf-header-right">
              <button
                className="shelf-view-all-btn"
                onClick={() => onSelectCategory('BEST SELLERS', true)}
                id="btn-see-more-best-sellers"
              >
                <span>SEE MORE ({allBestSellers.length} PIECES)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="home-category-grid">
            {bestSellers.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. YOU MAY LIKE - 4 PRODUCT GRID (NO SCROLL EFFECT) */}
      <section className="curated-shelf-section" id="shelf-you-may-like">
        <div className="container">
          <div className="shelf-header-row">
            <div className="shelf-header-left">
              <h2 className="shelf-main-title">YOU MAY LIKE</h2>
            </div>
            <div className="shelf-header-right">
              <button
                className="shelf-view-all-btn"
                onClick={() => onSelectCategory('YOU MAY LIKE', true)}
                id="btn-see-more-you-may-like"
              >
                <span>SEE MORE ({allYouMayLike.length} PIECES)</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>

          <div className="home-category-grid">
            {youMayLike.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={isWishlisted(product.id)}
                onToggleWishlist={onToggleWishlist}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
