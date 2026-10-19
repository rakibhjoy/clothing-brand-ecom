import React from 'react';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';
import ProductCard from './ProductCard';

export default function WishlistView({
  wishlist,
  onOpenProduct,
  onAddToCart,
  onToggleWishlist,
  onStartShopping
}) {
  return (
    <div className="container" style={{ padding: '3.5rem 1.5rem 5rem' }}>
      <button className="wr-nav-link" onClick={onStartShopping} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginBottom: '1.5rem' }}>
        <ArrowLeft size={16} />
        <span>CONTINUE BROWSING</span>
      </button>

      <div style={{ marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.3rem' }}>
          Saved Pieces ({wishlist.length})
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
          Your saved apparel wishlist for upcoming releases and drops.
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 1rem' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'var(--bg-card)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem'
          }}>
            <Heart size={28} color="#000" />
          </div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase', marginBottom: '0.5rem' }}>
            Your Wishlist is Empty
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
            Tap the heart icon on any piece to save it here.
          </p>
          <button className="btn-checkout-block" style={{ maxWidth: '240px', margin: '0 auto' }} onClick={onStartShopping}>
            DISCOVER PIECES
          </button>
        </div>
      ) : (
        <div className="catalog-products-grid">
          {wishlist.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isWishlisted={true}
              onToggleWishlist={onToggleWishlist}
              onOpenProduct={onOpenProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
}
