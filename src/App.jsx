import { useEffect, useState } from 'react';
import { Bell } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TriBanner from './components/TriBanner';
import HomeSections from './components/HomeSections';
import DenimEdit from './components/DenimEdit';
import ProductDetailsPage from './components/ProductDetailsPage';
import CatalogView from './components/CatalogView';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import WishlistView from './components/WishlistView';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import CheckoutPage from './components/CheckoutPage';
import Footer from './components/Footer';
import ShopLink from './components/ShopLink';
import { PRODUCTS } from './data/products';
import { COLLECTIONS } from './data/collections';
import {
  addCartItem, BAG_LIMIT, cartKey, createCartItem, directCheckoutPath, getDirectCheckoutItem, getProduct,
  GUEST, loadStorefront, productName, productPath, readRoute, readStored, recordOrder, writeStored
} from './storefront';
import { getSessionProfile, saveSession } from './accounts';
import { routeHref } from './urls';

const pageTitles = {
  catalog: 'Shop', cart: 'Shopping bag', checkout: 'Checkout', orders: 'Orders', wishlist: 'Saved items',
  profile: 'Account', login: 'Sign in', register: 'Create an account', missing: 'Page unavailable'
};

const bestSellers = ['wr-denim-01', 'wr-knit-02', 'wr-shirt-01', 'wr-acc-02'].map(getProduct).filter(Boolean);

export default function App() {
  const [route, setRoute] = useState(() => readRoute(window.location));
  const [store, setStore] = useState(loadStorefront);
  const [user, setUser] = useState(getSessionProfile);
  const [notice, setNotice] = useState(null);
  const accountPath = user.isLoggedIn ? '/profile' : '/login';
  const product = route.view === 'product' ? getProduct(route.id) : undefined;
  const collection = route.view === 'catalog' && !route.query ? COLLECTIONS[route.category] : null;
  const bannerId = route.view === 'home' ? 'home-banner' : collection && 'catalog-banner';
  const directItem = route.purchase ? getDirectCheckoutItem(route.purchase) : null;
  const checkoutItems = route.purchase ? (directItem ? [directItem] : []) : store.cart;
  const returnProduct = route.purchase ? getProduct(route.purchase.id) : null;
  const checkoutReturnPath = route.purchase ? (returnProduct ? productPath(returnProduct.id) : '/catalog') : '/cart';
  const orders = store.orders.filter((order) => (order.ownerId || 'guest') === (user.id || 'guest'));
  const cartCount = store.cart.reduce((total, item) => total + item.quantity, 0);
  const missing = route.view === 'missing' || (route.view === 'product' && !product);

  useEffect(() => {
    function syncRoute() {
      setRoute(readRoute(window.location));
    }

    function syncStorage(event) {
      if (event.key === 'rr_storefront') setStore(loadStorefront());
      if (event.key === 'rr_session_v2' || event.key === 'rr_accounts_v2') setUser(getSessionProfile());
    }

    window.addEventListener('storage', syncStorage);
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    return () => {
      window.removeEventListener('storage', syncStorage);
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  useEffect(() => {
    const title = missing ? pageTitles.missing : product ? productName(product) : collection?.title || pageTitles[route.view];
    document.title = title ? title + ' | Rogue & Raw' : 'Rogue & Raw | Everyday Streetwear';
  }, [collection, missing, product, route.view]);

  useEffect(() => {
    writeStored('localStorage', 'rr_storefront', store);
  }, [store]);

  useEffect(() => {
    if (!notice) return;
    const timeout = window.setTimeout(() => setNotice(null), 3500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  function navigate(path, { scroll = true, replace = false } = {}) {
    const current = window.location.pathname + window.location.search + window.location.hash;
    const href = routeHref(path);
    if (current !== href) {
      if (replace) window.history.replaceState(null, '', href);
      else window.history.pushState(null, '', href);
    }
    setRoute(readRoute(window.location));
    if (scroll) {
      window.scrollTo(0, 0);
      window.requestAnimationFrame(() => document.getElementById('main-content')?.focus({ preventScroll: true }));
    }
  }

  function notify(message) {
    setNotice({ message });
  }

  function login(profile, remember) {
    if (!saveSession(profile.id, remember)) return false;
    setUser(profile);
    navigate('/profile');
    notify('Signed in as ' + profile.name);
    return true;
  }

  function logout() {
    saveSession(null);
    setUser(GUEST);
    navigate('/');
    notify('Signed out.');
  }

  function addToCart(itemProduct, color, size, quantity) {
    const item = createCartItem(itemProduct, color, size, quantity);
    if (store.cart.some((entry) => cartKey(entry) === cartKey(item) && entry.quantity >= BAG_LIMIT)) {
      notify('Your bag has reached the quantity limit for this item.');
      return;
    }
    setStore((current) => ({ ...current, cart: addCartItem(current.cart, item) }));
    notify(item.name + ' added to your bag.');
  }

  function updateQuantity(item, quantity) {
    if (!Number.isInteger(quantity)) return;
    setStore((current) => {
      const key = cartKey(item);
      const cart = quantity <= 0
        ? current.cart.filter((entry) => cartKey(entry) !== key)
        : current.cart.map((entry) => cartKey(entry) === key
          ? { ...entry, quantity: Math.min(BAG_LIMIT, quantity) }
          : entry);
      return { ...current, cart, promo: cart.length ? current.promo : '' };
    });
    if (quantity <= 0) notify('Item removed from your bag.');
  }

  function toggleSaved(itemProduct) {
    const wasSaved = store.wishlist.includes(itemProduct.id);
    setStore((current) => ({
      ...current,
      wishlist: current.wishlist.includes(itemProduct.id)
        ? current.wishlist.filter((id) => id !== itemProduct.id)
        : [...current.wishlist, itemProduct.id]
    }));
    notify(wasSaved ? 'Removed from saved items.' : 'Saved to your wishlist.');
  }

  function completeOrder(order) {
    const fromBag = !route.purchase;
    const current = readStored('localStorage', 'rr_storefront', null) ? loadStorefront() : store;
    if (fromBag && (current.promo !== store.promo || current.cart.length !== order.items.length ||
        current.cart.some((item, index) => {
          const selected = order.items[index];
          return cartKey(item) !== cartKey(selected) || item.quantity !== selected.quantity || item.price !== selected.price;
        }))) {
      setStore(current);
      return 'Your bag changed. Review the updated order summary and try again.';
    }

    const next = recordOrder(current, order, user.id || 'guest', fromBag);
    if (!writeStored('localStorage', 'rr_storefront', next)) {
      return 'The order could not be saved. Check your browser storage settings and try again.';
    }
    setStore(next);
    navigate('/orders?order=' + encodeURIComponent(order.id), { replace: true });
    return '';
  }

  const shopping = {
    onNavigate: navigate,
    onAddToCart: addToCart,
    savedIds: store.wishlist,
    onToggleSaved: toggleSaved
  };

  return (
    <div className="site-shell">
      <a className="skip-link" href="#main-content" onClick={(event) => {
        event.preventDefault();
        document.getElementById('main-content')?.focus();
      }}>Skip to content</a>
      <Navbar route={route} bannerId={bannerId} onNavigate={navigate} cartCount={cartCount} accountPath={accountPath} savedCount={store.wishlist.length} />
      <main id="main-content" tabIndex={-1}>
        {route.view === 'home' && (
          <>
            <Hero onNavigate={navigate} />
            <TriBanner onNavigate={navigate} />
            <HomeSections products={PRODUCTS} category="NEW ARRIVALS" title="New arrivals" {...shopping} />
            <DenimEdit onNavigate={navigate} />
            <HomeSections products={bestSellers} category="BEST SELLERS" title="Best sellers" {...shopping} />
          </>
        )}
        {route.view === 'catalog' && <CatalogView products={PRODUCTS} route={route} collection={collection} {...shopping} />}
        {product && (
          <ProductDetailsPage
            key={product.id}
            product={product}
            allProducts={PRODUCTS}
            onBuyNow={(color, size, quantity) => navigate(directCheckoutPath(product.id, color, size, quantity))}
            {...shopping}
          />
        )}
        {route.view === 'cart' && (
          <CartPage cart={store.cart} promo={store.promo} city={user.city} onNavigate={navigate}
            onUpdateQuantity={updateQuantity}
            onApplyPromo={(promo) => setStore((current) => ({ ...current, promo }))} />
        )}
        {route.view === 'checkout' && (
          <CheckoutPage key={window.location.pathname + window.location.search + window.location.hash}
            items={checkoutItems} promo={route.purchase ? '' : store.promo} user={user}
            direct={Boolean(route.purchase)} returnPath={checkoutReturnPath} onNavigate={navigate} onComplete={completeOrder} />
        )}
        {route.view === 'wishlist' && (
          <WishlistView wishlist={store.wishlist.map(getProduct).filter(Boolean)} {...shopping} />
        )}
        {route.view === 'orders' && <OrdersPage orders={orders} confirmedOrderId={route.confirmedOrderId} onNavigate={navigate} />}
        {((route.view === 'profile' && !user.isLoggedIn) || (['login', 'register'].includes(route.view) && !user.isLoggedIn)) && (
          <AuthPage key={route.view} mode={route.view === 'register' ? 'register' : 'login'} onNavigate={navigate} onLogin={login} />
        )}
        {['profile', 'login', 'register'].includes(route.view) && user.isLoggedIn && (
          <ProfilePage user={user} onNavigate={navigate} onLogout={logout} onUpdate={(updated) => {
            setUser(updated);
            notify('Account details saved.');
          }} />
        )}
        {missing && (
          <section className="container empty-state standalone-empty">
            <h1>Page unavailable</h1>
            <p>This link may have moved. You can still browse the full collection.</p>
            <ShopLink className="button button-dark" href="/catalog" onNavigate={navigate}>Browse clothing</ShopLink>
          </section>
        )}
      </main>
      <Footer onNavigate={navigate} accountPath={accountPath} />
      <div className="notice-region" role="status" aria-live="polite">
        {notice && (
          <div className="notice-toast">
            <Bell className="notice-toast-icon" aria-hidden="true" />
            <span>{notice.message}</span>
          </div>
        )}
      </div>
    </div>
  );
}
