import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  appliedPromo,
  onApplyPromo,
  onCheckout
}) {
  if (!isOpen) return null;

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 150;

  // Subtotal calculation
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // Discount calculation
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo]?.discount || 0 : 0;
  const discountAmount = subtotal * discountRate;

  // Shipping
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  // Progress to free shipping
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
  const amountNeeded = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

  const handleApplyPromoCode = (e) => {
    e.preventDefault();
    const cleanCode = promoInput.trim().toUpperCase();
    if (!cleanCode) return;

    if (PROMO_CODES[cleanCode]) {
      onApplyPromo(cleanCode);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid code. Try "AURA20" for 20% off.');
    }
  };

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={onClose} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Shopping Cart">
        {/* Header */}
        <div className="cart-header">
          <div className="cart-title">
            <ShoppingBag size={20} color="#e2b170" />
            <span>Shopping Bag ({items.reduce((sum, i) => sum + i.quantity, 0)})</span>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close cart" id="btn-close-cart">
            <X size={18} />
          </button>
        </div>

        {/* Free Shipping Tracker */}
        <div className="shipping-progress-box">
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
            <span>
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <strong style={{ color: 'var(--accent-emerald)' }}>🎉 You have unlocked Free Express Shipping!</strong>
              ) : (
                <span>Add <strong>${amountNeeded}</strong> more for Free Shipping</span>
              )}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="progress-track">
            <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Items List */}
        <div className="cart-items-list">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-icon-box">
                <ShoppingBag size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your bag is empty</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Discover our latest handcrafted tailoring pieces and elevate your wardrobe.
              </p>
              <button className="btn btn-primary" onClick={onClose} id="btn-cart-continue">
                Start Exploring
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="cart-item-card">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-variant">
                      Size: {item.selectedSize} • Color: {item.selectedColor}
                    </div>
                  </div>

                  <div className="cart-item-controls">
                    <div className="quantity-control" style={{ transform: 'scale(0.85)', transformOrigin: 'left center' }}>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQty(item, item.quantity - 1)}
                        aria-label="Decrease"
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        type="button"
                        className="qty-btn"
                        onClick={() => onUpdateQty(item, item.quantity + 1)}
                        aria-label="Increase"
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span className="cart-item-price">${item.price * item.quantity}</span>
                      <button
                        className="btn-item-remove"
                        onClick={() => onRemoveItem(item)}
                        title="Remove piece"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer & Checkout */}
        {items.length > 0 && (
          <div className="cart-footer">
            {/* Promo Code Form */}
            <form onSubmit={handleApplyPromoCode} className="promo-form">
              <input
                type="text"
                className="promo-input"
                placeholder="PROMO CODE (e.g. AURA20)"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                id="input-promo-code"
              />
              <button type="submit" className="btn btn-secondary" style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}>
                Apply
              </button>
            </form>

            {promoError && (
              <div style={{ color: 'var(--accent-coral)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>
                {promoError}
              </div>
            )}

            {appliedPromo && (
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.6rem',
                background: 'rgba(16, 185, 129, 0.1)',
                border: '1px solid rgba(16, 185, 129, 0.25)',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--accent-emerald)',
                fontSize: '0.82rem',
                marginBottom: '0.85rem'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Tag size={13} />
                  Code {appliedPromo} applied ({PROMO_CODES[appliedPromo]?.label})
                </span>
                <button
                  type="button"
                  onClick={() => onApplyPromo(null)}
                  style={{ color: 'var(--text-muted)', fontSize: '0.75rem', textDecoration: 'underline' }}
                >
                  Remove
                </button>
              </div>
            )}

            {/* Calculations */}
            <div className="cart-summary-line">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="cart-summary-line" style={{ color: 'var(--accent-emerald)' }}>
                <span>Discount</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="cart-summary-line">
              <span>Estimated Shipping</span>
              <span>{shipping === 0 ? 'Complimentary' : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="cart-summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', marginTop: '1rem', padding: '0.85rem' }}
              onClick={onCheckout}
              id="btn-proceed-checkout"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
