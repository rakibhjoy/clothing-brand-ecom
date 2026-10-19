import React, { useState, useMemo } from 'react';
import { Heart, Plus, Check } from 'lucide-react';

export default function ProductCard({
  product,
  isWishlisted,
  onToggleWishlist,
  onOpenProduct,
  onAddToCart
}) {
  const [isAddedRecently, setIsAddedRecently] = useState(false);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  // Extract all available images for image cycling
  const images = useMemo(() => {
    const list = [];
    if (product.image) list.push(product.image);
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (Array.isArray(product.colors)) {
      product.colors.forEach((c) => {
        if (c.thumb && !list.includes(c.thumb)) list.push(c.thumb);
      });
    }
    return list.length > 0 ? list : [product.image];
  }, [product]);

  const currentImage = images[activeImgIndex % images.length];

  const handlePrevImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    if (images.length <= 1) return;
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    onAddToCart({
      ...product,
      selectedColor: product.colors?.[0]?.name || product.colorName || 'Dark Purple',
      selectedVariant: product.sizes?.[0] || 'M',
      quantity: 1
    });
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1400);
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <article
      className="streetwear-card"
      id={`product-card-${product.id}`}
      onClick={() => onOpenProduct && onOpenProduct(product)}
    >
      {/* Studio Neutral Grey Background Box with Parallax Depth & Carousel Arrows */}
      <div className="card-media-box">
        {/* Floating Category Badge */}
        {product.badge && (
          <span className={`card-badge-tag badge-${product.badge.toLowerCase().replace(/\s+/g, '-')}`}>
            {product.badge}
          </span>
        )}
        {!product.badge && product.isNewArrival && (
          <span className="card-badge-tag badge-new">NEW IN</span>
        )}
        {!product.badge && !product.isNewArrival && product.isBestSeller && (
          <span className="card-badge-tag badge-bestseller">BEST SELLER</span>
        )}

        <img
          src={currentImage}
          alt={product.name}
          loading="lazy"
          className="card-main-img"
        />

        {/* Previous Image Arrow (Left Side) */}
        {images.length > 1 && (
          <button
            type="button"
            className="card-arrow-btn card-arrow-prev"
            onClick={handlePrevImage}
            title="Previous image"
            aria-label="Previous image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-left"
              aria-hidden="true"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
        )}

        {/* Next Image Arrow (Right Side) */}
        {images.length > 1 && (
          <button
            type="button"
            className="card-arrow-btn card-arrow-next"
            onClick={handleNextImage}
            title="Next image"
            aria-label="Next image"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right"
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        )}

        {/* Micro Dots Indicator */}
        {images.length > 1 && (
          <div className="card-image-dots" aria-hidden="true">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={`card-img-dot ${idx === (activeImgIndex % images.length) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImgIndex(idx);
                }}
              />
            ))}
          </div>
        )}

        {/* Wishlist Button (Top Right - Always Visible) */}
        <button
          type="button"
          className={`streetwear-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={handleWishlistClick}
          title={isWishlisted ? "Remove from saved" : "Save to wishlist"}
          aria-label="Wishlist toggle"
        >
          <Heart size={15} fill={isWishlisted ? '#e11d48' : 'none'} stroke={isWishlisted ? '#e11d48' : '#000'} />
        </button>

        {/* Quick Add to Bag + Icon Button (Bottom Right - Always Visible) */}
        <button
          type="button"
          className={`card-quick-add-btn ${isAddedRecently ? 'added' : ''}`}
          onClick={handleQuickAdd}
          title={isAddedRecently ? "Added to bag!" : "Quick add to bag"}
          aria-label="Quick add to bag"
          id={`btn-quick-add-${product.id}`}
        >
          {isAddedRecently ? (
            <Check size={16} strokeWidth={2.8} />
          ) : (
            <Plus size={16} strokeWidth={2.4} />
          )}
        </button>
      </div>

      {/* Info Underneath */}
      <div className="card-info-box">
        <div className="card-title-price-row">
          <h3 className="card-item-title" title={product.name}>
            {product.name}
          </h3>
          <div className="card-price-group">
            <span className="card-item-price">৳ {product.price.toLocaleString()}</span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="card-item-original-price">৳ {product.originalPrice.toLocaleString()}</span>
            )}
          </div>
        </div>
        <div className="card-sub-info">
          <span>{product.colorCountText || `${product.colors ? product.colors.length : 1} IN COLORS`}</span>
          {product.colors && product.colors.length > 1 && (
            <div className="card-mini-swatches" aria-hidden="true">
              {product.colors.slice(0, 4).map((c, i) => (
                <span
                  key={i}
                  className="mini-color-dot"
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (c.thumb) {
                      const foundIdx = images.indexOf(c.thumb);
                      if (foundIdx !== -1) setActiveImgIndex(foundIdx);
                    }
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

