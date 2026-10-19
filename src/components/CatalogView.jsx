import React, { useState, useMemo } from 'react';
import { ChevronDown } from 'lucide-react';
import ProductCard from './ProductCard';
import { CATEGORIES } from '../data/products';

export default function CatalogView({
  products,
  activeCategory,
  onSelectCategory,
  onBackToHome,
  onOpenProduct,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  searchQuery,
  onSearchChange
}) {
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = useMemo(() => {
    let result = products.filter((item) => {
      if (activeCategory !== 'ALL') {
        const itemCat = item.category?.toUpperCase() || '';
        if (activeCategory === 'NEW ARRIVALS') {
          const isNew = item.isNewArrival || item.badge?.toLowerCase().includes('new');
          if (!isNew) return false;
        } else if (activeCategory === 'BEST SELLERS') {
          const isBest = item.isBestSeller || item.badge?.toLowerCase().includes('best');
          if (!isBest) return false;
        } else if (activeCategory === 'YOU MAY LIKE') {
          const isFav = item.isRecommended || item.rating >= 4.9;
          if (!isFav) return false;
        } else if (activeCategory === 'KNIT COLLAR') {
          const isKnit = item.name.toUpperCase().includes('KNIT COLLAR') || itemCat === 'KNIT COLLAR';
          if (!isKnit) return false;
        } else if (activeCategory === 'JEANS') {
          if (itemCat !== 'JEANS' && itemCat !== 'DENIM') return false;
        } else if (itemCat !== activeCategory) {
          return false;
        }
      }

      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(q);
        const matchesCategory = item.category.toLowerCase().includes(q);
        const matchesColor = (item.colorName || '').toLowerCase().includes(q);
        if (!matchesName && !matchesCategory && !matchesColor) return false;
      }

      return true;
    });

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, activeCategory, searchQuery, sortBy]);

  const getCategoryTitle = () => {
    if (activeCategory === 'NEW ARRIVALS') return 'NEW ARRIVALS';
    if (activeCategory === 'BEST SELLERS') return 'BEST SELLERS';
    if (activeCategory === 'YOU MAY LIKE') return 'YOU MAY LIKE';
    if (activeCategory === 'ALL') return 'ALL PRODUCTS';
    return `${activeCategory}`;
  };

  return (
    <div className="catalog-page-container" id="category-page-root">
      {/* Top Editorial Breadcrumb Bar */}
      <div className="pdp-breadcrumbs-bar">
        <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          <div className="breadcrumbs-inner">
            <button className="breadcrumb-nav-btn" onClick={onBackToHome}>
              Home
            </button>
            <span className="breadcrumb-slash">/</span>
            <button className="breadcrumb-nav-btn" onClick={() => onSelectCategory('ALL')}>
              Catalog
            </button>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-current">{getCategoryTitle()}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '1.5rem 1rem 5rem' }}>
        {/* Minimal Editorial Header with Title & Clean Sort */}
        <div className="catalog-hero-header">
          <div className="catalog-hero-left">
            <h1 className="catalog-main-heading">
              {getCategoryTitle()}
            </h1>
            <span className="catalog-count-pill">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'PIECE' : 'PIECES'}
            </span>
          </div>

          <div className="catalog-filter-controls">
            <div className="catalog-select-box">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="catalog-sort-select"
                aria-label="Sort products"
              >
                <option value="featured">SORT: FEATURED</option>
                <option value="price-asc">PRICE: LOW TO HIGH</option>
                <option value="price-desc">PRICE: HIGH TO LOW</option>
                <option value="rating">HIGHEST RATED</option>
              </select>
              <ChevronDown size={14} className="catalog-select-arrow" />
            </div>
          </div>
        </div>

        {/* Minimal Category Tabs Bar (NO distracting icons, pure clean text) */}
        <div className="catalog-pills-bar">
          <div className="category-scroll-container">
            <div className="category-tabs-row" role="tablist">
              {CATEGORIES.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    role="tab"
                    aria-selected={isActive}
                    className={`category-tab-btn ${isActive ? 'active' : ''}`}
                    onClick={() => onSelectCategory(cat)}
                    id={`cat-page-tab-${cat.toLowerCase().replace(/[\s/]+/g, '-')}`}
                  >
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Perfect 4-Column Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="catalog-empty-box">
            <p className="catalog-empty-title">NO PIECES FOUND</p>
            <button
              className="btn-load-more"
              style={{ marginTop: '1.5rem' }}
              onClick={() => onSelectCategory('ALL')}
            >
              VIEW ALL PIECES
            </button>
          </div>
        ) : (
          <div className="catalog-products-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                isWishlisted={typeof isWishlisted === 'function' ? isWishlisted(product.id) : false}
                onToggleWishlist={onToggleWishlist}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
