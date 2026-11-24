import ShopLink from './ShopLink';
import { categoryPath } from '../storefront';

export default function Footer({ onNavigate, accountPath }) {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <ShopLink className="wordmark" href="/" onNavigate={onNavigate} aria-label="Rogue & Raw home">ROGUE<span>&amp;</span>RAW.</ShopLink>
            <p>Streetwear. Dhaka, Bangladesh.</p>
          </div>
          <nav aria-label="Shop links">
            <h2>Shop</h2>
            <ShopLink href="/catalog" onNavigate={onNavigate}>All clothing</ShopLink>
            <ShopLink href={categoryPath('NEW ARRIVALS')} onNavigate={onNavigate}>New arrivals</ShopLink>
            <ShopLink href={categoryPath('BEST SELLERS')} onNavigate={onNavigate}>Best sellers</ShopLink>
          </nav>
          <nav aria-label="Account links">
            <h2>Your account</h2>
            <ShopLink href={accountPath} onNavigate={onNavigate}>Account</ShopLink>
            <ShopLink href="/orders" onNavigate={onNavigate}>Order history</ShopLink>
            <ShopLink href="/wishlist" onNavigate={onNavigate}>Saved items</ShopLink>
          </nav>
          <div className="footer-delivery">
            <h2>Delivery</h2>
            <p>Dhaka ৳70 · Outside Dhaka ৳130</p>
            <p>Free on orders of ৳3,000 or more.</p>
          </div>
        </div>
        <div className="footer-bottom"><small>© {new Date().getFullYear()} Rogue &amp; Raw.</small><small>Bangladesh · BDT</small></div>
      </div>
    </footer>
  );
}
