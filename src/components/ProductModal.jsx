import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ShieldCheck, RefreshCw, Truck } from 'lucide-react';

export default function ProductModal({
  product,
  isOpen,
  onClose,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) {
  if (!isOpen || !product) return null;

  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [quantity, setQuantity] = useState(1);

  // Sync state if product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedColor(product.colors[0]?.name || '');
      setSelectedSize(product.sizes[0] || 'M');
      setQuantity(1);
    }
  }, [product]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    onAddToCart({
      ...product,
      selectedColor,
      selectedSize,
      quantity
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal" id="btn-close-modal">
          <X size={18} />
        </button>

        <div className="modal-grid">
          {/* Media Column */}
          <div className="modal-media">
            <img src={activeImage} alt={product.name} />
          </div>

          {/* Details Column */}
          <div className="modal-body">
            <div className="product-meta">
              <span>{product.category} • {product.gender}</span>
              <div className="product-rating">
                <Star size={14} fill="#e2b170" stroke="#e2b170" />
                <span>{product.rating} ({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h2 className="modal-title">{product.name}</h2>

            <div className="product-price-row">
              <span className="current-price" style={{ fontSize: '1.5rem' }}>${product.price}</span>
              {product.originalPrice && (
                <span className="original-price" style={{ fontSize: '1.1rem' }}>${product.originalPrice}</span>
              )}
              {discountPercent && (
                <span className="save-percent">Save {discountPercent}%</span>
              )}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.4rem' }}>
              {product.description}
            </p>

            {/* Color Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="size-selector-label">
                <span>Color</span>
                <span style={{ color: 'var(--accent-gold)' }}>{selectedColor}</span>
              </div>
              <div className="color-swatches">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    type="button"
                    className={`swatch-dot ${selectedColor === c.name ? 'active' : ''}`}
                    onClick={() => setSelectedColor(c.name)}
                    style={{ width: '24px', height: '24px' }}
                    title={c.name}
                  >
                    <div className="swatch-inner" style={{ backgroundColor: c.hex }} />
                  </button>
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div className="size-selector-label">
                <span>Select Size</span>
                <span style={{ color: 'var(--text-muted)' }}>True to Size</span>
              </div>
              <div className="size-pills">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`size-pill ${selectedSize === s ? 'active' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-row">
              <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Quantity</span>
              <div className="quantity-control">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: 'auto' }}>
              <button
                className="btn btn-primary"
                style={{ flexGrow: 1 }}
                onClick={handleAdd}
                id="btn-modal-add-bag"
              >
                <ShoppingBag size={18} />
                <span>Add to Bag • ${(product.price * quantity).toFixed(2)}</span>
              </button>

              <button
                className={`btn-icon ${isWishlisted ? 'active' : ''}`}
                onClick={() => onToggleWishlist(product)}
                title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                style={{ width: '48px', height: '48px' }}
              >
                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} color={isWishlisted ? '#fb7185' : 'currentColor'} />
              </button>
            </div>

            {/* Extra Specifications */}
            <div className="modal-specs">
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Fabric:</strong> {product.fabric}
              </div>
              <div style={{ marginBottom: '0.5rem' }}>
                <strong>Care:</strong> {product.care}
              </div>
              <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <Truck size={14} /> Express shipping
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <RefreshCw size={14} /> Free 30-day returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
