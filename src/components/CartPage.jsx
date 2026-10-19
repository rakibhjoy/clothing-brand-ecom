import React, { useState } from 'react';
import { Trash2, ArrowLeft, ShoppingBag } from 'lucide-react';
import { PROMO_CODES } from '../data/products';

export default function CartPage({
  cart,
  onUpdateQty,
  onRemoveItem,
  onContinueShopping,
  onProceedCheckout,
  appliedPromo,
  onApplyPromo
}) {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  const FREE_SHIPPING_THRESHOLD = 3000;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo]?.discount || 0 : 0;
  const discountAmount = subtotal * discountRate;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || cart.length === 0 ? 0 : 70;
  const total = Math.max(0, subtotal - discountAmount + shipping);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const clean = promoInput.trim().toUpperCase();
    if (!clean) return;

    if (PROMO_CODES[clean]) {
      onApplyPromo(clean);
      setPromoError('');
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try "ROGUE10" for 10% off.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-page-wrap">
        <div style={{ textAlign: 'center', padding: '5rem 1rem', maxWidth: '600px', margin: '0 auto' }}>
          <div style={{
            width: '70px',
            height: '70px',
            background: 'var(--bg-card)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <ShoppingBag size={32} />
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
            Your Cart is Empty
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
            Discover our light wash boxy tees, knit collar apparel, and baggy denim jeans.
          </p>
          <button
            className="btn-checkout-block"
            style={{ maxWidth: '260px', margin: '0 auto' }}
            onClick={onContinueShopping}
            id="btn-empty-cart-continue"
          >
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page-wrap" id="cart-page-view">
      <button className="wr-nav-link" onClick={onContinueShopping} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={15} />
        <span>CONTINUE SHOPPING</span>
      </button>

      <h1 className="cart-page-title">
        Shopping Bag ({cart.reduce((sum, i) => sum + i.quantity, 0)} Items)
      </h1>

      <div className="cart-page-grid">
        {/* Left Column: Items */}
        <div>
          {cart.map((item) => (
            <div
              key={`${item.id}-${item.selectedColor}-${item.selectedVariant}`}
              className="cart-item-card"
            >
              <div className="cart-item-img-box">
                <img src={item.image} alt={item.name} />
              </div>

              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                  {item.name}
                </h4>
                <div style={{ fontSize: '0.78rem', color: '#666', marginBottom: '0.5rem' }}>
                  Size: <strong>{item.selectedVariant}</strong>
                  {item.selectedColor && ` • Color: ${item.selectedColor}`}
                </div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>
                  ৳ {item.price.toLocaleString()} each
                </div>
              </div>

              {/* Stepper & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="qty-stepper">
                  <button
                    className="qty-step-btn"
                    onClick={() => onUpdateQty(item, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="qty-step-val">{item.quantity}</span>
                  <button
                    className="qty-step-btn"
                    onClick={() => onUpdateQty(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div style={{ fontWeight: 800, fontSize: '1.05rem', minWidth: '75px', textAlign: 'right' }}>
                  ৳ {(item.price * item.quantity).toLocaleString()}
                </div>

                <button
                  onClick={() => onRemoveItem(item)}
                  style={{ color: '#888', padding: '0.3rem' }}
                  title="Remove item"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Shipping notice */}
          <div style={{
            padding: '1rem',
            background: 'var(--bg-card)',
            fontSize: '0.8rem',
            letterSpacing: '0.04em',
            fontWeight: 600
          }}>
            {subtotal >= FREE_SHIPPING_THRESHOLD
              ? '✓ Free delivery unlocked on this order!'
              : `Add ৳ ${(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()} more for free shipping`}
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <aside className="order-summary-box">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>৳ {subtotal.toLocaleString()}</span>
          </div>

          {discountAmount > 0 && (
            <div className="summary-row" style={{ color: 'var(--accent-emerald)' }}>
              <span>Promo ({appliedPromo})</span>
              <span>-৳ {discountAmount.toLocaleString()}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping</span>
            <span>{shipping === 0 ? 'FREE' : `৳ ${shipping}`}</span>
          </div>

          {/* Promo form */}
          <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.4rem', margin: '1.25rem 0' }}>
            <input
              type="text"
              placeholder="PROMO CODE"
              value={promoInput}
              onChange={(e) => setPromoInput(e.target.value)}
              style={{
                flex: 1,
                padding: '0.55rem 0.75rem',
                border: '1px solid #ccc',
                fontSize: '0.78rem',
                textTransform: 'uppercase'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#000',
                color: '#fff',
                padding: '0.55rem 0.85rem',
                fontSize: '0.75rem',
                fontWeight: 700
              }}
            >
              Apply
            </button>
          </form>

          {promoError && (
            <div style={{ color: 'var(--accent-rose)', fontSize: '0.75rem', marginBottom: '0.6rem' }}>
              {promoError}
            </div>
          )}

          <div className="summary-row total">
            <span>Estimated Total</span>
            <span>৳ {total.toLocaleString()}</span>
          </div>

          <button
            className="btn-checkout-block"
            onClick={onProceedCheckout}
            id="btn-cart-checkout"
          >
            PROCEED TO CHECKOUT
          </button>
        </aside>
      </div>
    </div>
  );
}
