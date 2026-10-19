import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer({
  isOpen,
  onClose,
  items,
  onRemoveFromWishlist,
  onMoveToCart
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="cart-drawer-backdrop" onClick={onClose} />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-label="Saved Wishlist">
        <div className="cart-header">
          <div className="cart-title">
            <Heart size={20} color="#fb7185" fill="#fb7185" />
            <span>Saved Wishlist ({items.length})</span>
          </div>
          <button className="btn-icon" onClick={onClose} aria-label="Close wishlist" id="btn-close-wishlist">
            <X size={18} />
          </button>
        </div>

        <div className="cart-items-list">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-icon-box">
                <Heart size={32} />
              </div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Your wishlist is empty</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
                Tap the heart on any product to save your favorite garments for later.
              </p>
              <button className="btn btn-primary" onClick={onClose}>
                Browse Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="cart-item-card">
                <div className="cart-item-img">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item-info">
                  <div>
                    <h4 className="cart-item-name">{item.name}</h4>
                    <div className="cart-item-variant">{item.category} • ${item.price}</div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
                    <button
                      className="btn btn-primary"
                      style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', flexGrow: 1 }}
                      onClick={() => onMoveToCart(item)}
                    >
                      <ShoppingBag size={14} />
                      <span>Move to Bag</span>
                    </button>
                    <button
                      className="btn-icon"
                      style={{ width: '34px', height: '34px' }}
                      onClick={() => onRemoveFromWishlist(item)}
                      title="Remove from saved"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
}
