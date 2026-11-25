import { useEffect, useRef, useState } from 'react';
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from 'lucide-react';
import { categoryPath } from '../storefront';
import ShopLink from './ShopLink';
import ShopDialog from './ShopDialog';

const links = [
  { label: 'New arrivals', href: categoryPath('NEW ARRIVALS') },
  { label: 'T-shirts', href: categoryPath('T-SHIRTS') },
  { label: 'Denim', href: categoryPath('JEANS') },
  { label: 'Shop all', href: '/catalog' }
];

export default function Navbar({ route, bannerId, onNavigate, cartCount, accountPath, savedCount }) {
  const [panel, setPanel] = useState('');
  const [query, setQuery] = useState('');
  const [overHero, setOverHero] = useState(true);
  const header = useRef(null);
  const field = useRef(null);
  const searchTrigger = useRef(null);
  const searchQuery = route.view === 'catalog' ? route.query : '';

  useEffect(() => {
    if (panel === 'search') field.current?.focus();
  }, [panel]);

  useEffect(() => {
    if (!bannerId) {
      setOverHero(true);
      return;
    }

    const banner = document.getElementById(bannerId);
    const navigation = header.current;
    if (!banner || !navigation) return;

    function updateHeader() {
      setOverHero(banner.getBoundingClientRect().bottom > navigation.offsetHeight);
    }

    updateHeader();
    window.addEventListener('scroll', updateHeader, { passive: true });
    window.addEventListener('resize', updateHeader);
    return () => {
      window.removeEventListener('scroll', updateHeader);
      window.removeEventListener('resize', updateHeader);
    };
  }, [bannerId]);

  const headerClass = ['site-header', bannerId && 'site-header-overlay', bannerId && overHero && 'site-header-over-hero']
    .filter(Boolean).join(' ');

  function follow(path) {
    setPanel('');
    onNavigate(path);
  }

  function closeSearch() {
    setPanel('');
    searchTrigger.current?.focus();
  }

  function search(event) {
    event.preventDefault();
    const value = query.trim();
    follow(value ? '/catalog?q=' + encodeURIComponent(value) : '/catalog');
  }

  function openSearch() {
    if (panel === 'search') {
      closeSearch();
      return;
    }
    setQuery(searchQuery);
    setPanel('search');
  }

  return (
    <header ref={header} className={headerClass}>
      <div className="announcement">Free delivery on orders of ৳3,000 or more</div>
      <div className="header-inner">
        <button type="button" className="icon-button menu-trigger" onClick={() => setPanel('menu')} aria-label="Open menu"><Menu size={23} /></button>
        <ShopLink className="wordmark" href="/" onNavigate={follow} aria-label="Rogue & Raw home">ROGUE<span>&amp;</span>RAW.</ShopLink>
        <nav className="primary-nav" aria-label="Main navigation">
          {links.map(({ label, href }) => <ShopLink key={href} href={href} onNavigate={follow}>{label}</ShopLink>)}
        </nav>
        <div className="header-actions">
          <button ref={searchTrigger} className="icon-button" type="button" onClick={openSearch}
            aria-label={panel === 'search' ? 'Close search' : 'Search'} aria-expanded={panel === 'search'} aria-controls={panel === 'search' ? 'shop-search' : undefined}>
            {panel === 'search' ? <X size={21} /> : <Search size={21} />}
          </button>
          <ShopLink className="icon-button header-account" href={accountPath} onNavigate={follow} aria-label="Account"><UserRound size={21} /></ShopLink>
          <ShopLink className="icon-button header-saved" href="/wishlist" onNavigate={follow} aria-label={`Saved items (${savedCount})`}><Heart size={21} /></ShopLink>
          <ShopLink className="icon-button bag-link" href="/cart" onNavigate={follow} aria-label={`Shopping bag (${cartCount})`}>
            <ShoppingBag size={21} />
            <span className="bag-count" aria-hidden="true">{cartCount > 99 ? '99+' : cartCount}</span>
          </ShopLink>
        </div>
      </div>
      {panel === 'search' && (
        <div className="search-panel" id="shop-search" onKeyDown={(event) => { if (event.key === 'Escape') closeSearch(); }}>
          <form className="search-form" role="search" onSubmit={search}>
            <label className="sr-only" htmlFor="shop-search-input">Search clothing</label>
            <input id="shop-search-input" ref={field} type="search" value={query} onChange={(event) => setQuery(event.target.value)}
              maxLength={100} placeholder="Search products, categories or codes" />
            <button className="button button-dark" type="submit">Search</button>
          </form>
        </div>
      )}
      {panel === 'menu' && (
        <ShopDialog title="Menu" onClose={() => setPanel('')} className="mobile-menu">
          <nav aria-label="Mobile navigation">
            {links.map(({ label, href }) => <ShopLink key={href} href={href} onNavigate={follow}>{label}</ShopLink>)}
            <ShopLink href={accountPath} onNavigate={follow}>Account</ShopLink>
            <ShopLink href="/wishlist" onNavigate={follow}>Saved items ({savedCount})</ShopLink>
            <ShopLink href="/orders" onNavigate={follow}>Orders</ShopLink>
          </nav>
        </ShopDialog>
      )}
    </header>
  );
}
