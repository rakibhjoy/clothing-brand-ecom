import React from 'react';
import { CATEGORIES } from '../data/products';
import { Sparkles, Flame, Heart, Layers } from 'lucide-react';

export default function FilterBar({
  activeCategory,
  onSelectCategory,
  totalCount,
  filteredCount
}) {
  const getCategoryIcon = (cat) => {
    switch (cat) {
      case 'NEW ARRIVALS':
        return <Sparkles size={13} className="tab-pill-icon" />;
      case 'BEST SELLERS':
        return <Flame size={13} className="tab-pill-icon text-orange" />;
      case 'YOU MAY LIKE':
        return null;
      case 'ALL':
        return <Layers size={13} className="tab-pill-icon" />;
      default:
        return null;
    }
  };

  const getHeadingTitle = () => {
    if (activeCategory === 'ALL') return 'ALL PRODUCTS';
    if (activeCategory === 'NEW ARRIVALS') return 'NEW ARRIVALS';
    if (activeCategory === 'BEST SELLERS') return 'BEST SELLERS';
    if (activeCategory === 'YOU MAY LIKE') return 'YOU MAY LIKE';
    return `${activeCategory}`;
  };

  return (
    <div className="section-head-wrap" id="catalog-section">
      <div className="catalog-header-meta">
        <div>
          <h2 className="section-heading-clean">{getHeadingTitle()}</h2>
        </div>
        <div className="catalog-count-indicator">
          <span>{filteredCount} {filteredCount === 1 ? 'PIECE' : 'PIECES'}</span>
        </div>
      </div>

      {/* Horizontally scrollable category tabs row for mobile & desktop */}
      <div className="category-scroll-container">
        <div className="category-tabs-row" role="tablist">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            const icon = getCategoryIcon(cat);
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                className={`category-tab-btn ${isActive ? 'active' : ''} ${cat === 'NEW ARRIVALS' || cat === 'BEST SELLERS' || cat === 'YOU MAY LIKE' ? 'featured-cat-btn' : ''}`}
                onClick={() => onSelectCategory(cat)}
                id={`tab-${cat.toLowerCase().replace(/[\s/]+/g, '-')}`}
              >
                {icon}
                <span>{cat}</span>
                {isActive && <span className="cat-pill-count">{filteredCount}</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
