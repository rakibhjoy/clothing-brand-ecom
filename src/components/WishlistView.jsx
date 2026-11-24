import { Heart } from 'lucide-react';
import ProductCard from './ProductCard';
import ShopLink from './ShopLink';

export default function WishlistView({ wishlist, onNavigate, ...shopping }) {
  return (
    <section className="page-section wishlist-page" aria-labelledby="wishlist-title">
      <div className="page-heading"><h1 id="wishlist-title">Saved items</h1>{wishlist.length > 0 && <p>{wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}</p>}</div>
      {wishlist.length ? (
        <div className="product-grid">
          {wishlist.map((product) => <ProductCard key={product.id} product={product} onNavigate={onNavigate} {...shopping} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Heart size={27} aria-hidden="true" />
          <h2>Your wishlist is empty</h2>
          <p>Use the heart on a product to save it for later.</p>
          <ShopLink className="button button-dark" href="/catalog" onNavigate={onNavigate}>Browse clothing</ShopLink>
        </div>
      )}
    </section>
  );
}
