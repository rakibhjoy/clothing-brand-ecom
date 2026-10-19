import React, { useState, useEffect, useMemo } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TriBanner from './components/TriBanner';
import HomeSections from './components/HomeSections';
import ProductDetailsPage from './components/ProductDetailsPage';
import CatalogView from './components/CatalogView';
import CartPage from './components/CartPage';
import OrdersPage from './components/OrdersPage';
import WishlistView from './components/WishlistView';
import AuthPage from './components/AuthPage';
import ProfilePage from './components/ProfilePage';
import CheckoutModal from './components/CheckoutModal';
import Footer from './components/Footer';
import Toast from './components/Toast';
import {
  PRODUCTS,
  INITIAL_ORDERS,
  PROMO_CODES
} from './data/products';

const INITIAL_USER = {
  id: "usr_001",
  name: "Rafid Ahmed",
  email: "rafid.ahmed@example.com",
  phone: "+880 1712-345678",
  city: "Dhaka",
  district: "Dhaka",
  address: "House 42, Road 11, Block D, Banani",
  postalCode: "1213",
  gender: "Male",
  dob: "1998-05-14",
  preferredSize: "L",
  preferredPantsSize: "32",
  fitSilhouette: "Boxy Oversized Drop Shoulder",
  memberTier: "BLACK VIP ARCHIVE",
  joinedDate: "October 2025",
  loyaltyPoints: 480,
  isLoggedIn: true
};

// --- URL Routing & History Synchronization Helpers ---
function parseRouteFromLocation() {
  if (typeof window === 'undefined') {
    return { view: 'home', category: 'ALL', productId: null };
  }

  const pathname = window.location.pathname.replace(/\/+$/, '') || '/';
  const searchParams = new URLSearchParams(window.location.search);
  const hash = window.location.hash || '';

  // 1. Direct path check for product: /product/:id
  if (pathname.startsWith('/product/')) {
    const rawId = pathname.slice('/product/'.length).trim();
    if (rawId) {
      return {
        view: 'product-details',
        category: 'ALL',
        productId: decodeURIComponent(rawId)
      };
    }
  }

  // 2. Query param for product: /product?id=... or ?product=... or ?id=...
  if (pathname === '/product' || searchParams.has('product') || searchParams.has('id')) {
    const rawId = searchParams.get('product') || searchParams.get('id');
    if (rawId) {
      return {
        view: 'product-details',
        category: 'ALL',
        productId: decodeURIComponent(rawId)
      };
    }
  }

  // 3. Catalog / Category check: /catalog or /category
  if (pathname === '/catalog' || pathname === '/category' || searchParams.has('cat') || searchParams.has('category')) {
    const cat = searchParams.get('cat') || searchParams.get('category') || 'ALL';
    return {
      view: 'category',
      category: cat.toUpperCase(),
      productId: null
    };
  }

  // 4. Standalone standard views
  if (pathname === '/cart' || searchParams.get('view') === 'cart') {
    return { view: 'cart', category: 'ALL', productId: null };
  }
  if (pathname === '/orders' || searchParams.get('view') === 'orders') {
    return { view: 'orders', category: 'ALL', productId: null };
  }
  if (pathname === '/wishlist' || searchParams.get('view') === 'wishlist') {
    return { view: 'wishlist', category: 'ALL', productId: null };
  }
  if (pathname === '/profile' || searchParams.get('view') === 'profile') {
    return { view: 'profile', category: 'ALL', productId: null };
  }
  if (pathname === '/login' || searchParams.get('view') === 'login') {
    return { view: 'login', category: 'ALL', productId: null };
  }
  if (pathname === '/register' || searchParams.get('view') === 'register') {
    return { view: 'register', category: 'ALL', productId: null };
  }

  // 5. Hash fallback (e.g. #/cart, #/product/...)
  if (hash.startsWith('#/')) {
    const hashSub = hash.slice(1);
    const [hPath, hQuery] = hashSub.split('?');
    const hParams = new URLSearchParams(hQuery || '');
    if (hPath.startsWith('/product/')) {
      const rawId = hPath.slice('/product/'.length).trim();
      return { view: 'product-details', category: 'ALL', productId: decodeURIComponent(rawId) };
    }
    if (hPath === '/catalog' || hPath === '/category') {
      const cat = hParams.get('cat') || 'ALL';
      return { view: 'category', category: cat.toUpperCase(), productId: null };
    }
    const cleanHash = hPath.replace(/^\//, '');
    if (['cart', 'orders', 'wishlist', 'profile', 'login', 'register'].includes(cleanHash)) {
      return { view: cleanHash, category: 'ALL', productId: null };
    }
  }

  // 6. Session fallback for page refresh on root path '/'
  try {
    const saved = sessionStorage.getItem('rr_active_route') || localStorage.getItem('rr_active_route');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed && parsed.view && parsed.view !== 'home') {
        return parsed;
      }
    }
  } catch (e) {
    // ignore
  }

  return { view: 'home', category: 'ALL', productId: null };
}

function getRouteUrl(view, category = 'ALL', productId = null) {
  switch (view) {
    case 'home':
      return '/';
    case 'category':
      return category && category !== 'ALL'
        ? `/catalog?cat=${encodeURIComponent(category)}`
        : '/catalog';
    case 'product-details':
      return productId ? `/product/${encodeURIComponent(productId)}` : '/catalog';
    case 'cart':
      return '/cart';
    case 'orders':
      return '/orders';
    case 'wishlist':
      return '/wishlist';
    case 'profile':
      return '/profile';
    case 'login':
      return '/login';
    case 'register':
      return '/register';
    default:
      return '/';
  }
}

export default function App() {
  const initialRoute = useMemo(() => parseRouteFromLocation(), []);

  // Navigation & View State: 'home' | 'category' | 'product-details' | 'cart' | 'orders' | 'wishlist' | 'login' | 'register' | 'profile'
  const [currentView, setCurrentView] = useState(initialRoute.view || 'home');
  const [activeCategory, setActiveCategory] = useState(initialRoute.category || 'ALL');
  const [selectedProduct, setSelectedProduct] = useState(() => {
    if (initialRoute.productId) {
      const found = PRODUCTS.find((p) => p.id === initialRoute.productId);
      if (found) return found;
    }
    return PRODUCTS[0];
  });
  const [searchQuery, setSearchQuery] = useState('');

  // Cart State (Persisted)
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('rr_cart') || localStorage.getItem('wr_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: "rr-tee-01",
          name: "R&R Light Wash Purple T-Shirt",
          category: "T-Shirts",
          price: 1399,
          quantity: 1,
          selectedColor: "Dark Purple",
          selectedVariant: "M",
          image: "/images/wr_purple_tee.jpg"
        }
      ];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rr_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Wishlist State (Persisted)
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('rr_wishlist') || localStorage.getItem('wr_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rr_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Orders State (Persisted)
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('rr_orders') || localStorage.getItem('wr_orders');
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rr_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // User / Auth State (Persisted)
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('rr_user');
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('rr_user', JSON.stringify(currentUser));
    } catch (e) {
      console.error(e);
    }
  }, [currentUser]);

  // Central Navigation & URL Sync Function
  const navigateTo = (view, options = {}) => {
    const nextCategory = options.category !== undefined
      ? options.category
      : (view === 'category' ? activeCategory : 'ALL');

    let nextProduct = selectedProduct;
    let nextProductId = null;

    if (view === 'product-details') {
      if (options.product) {
        nextProduct = options.product;
        nextProductId = options.product.id;
      } else if (options.productId) {
        const found = PRODUCTS.find((p) => p.id === options.productId);
        if (found) nextProduct = found;
        nextProductId = options.productId;
      } else if (selectedProduct) {
        nextProductId = selectedProduct.id;
      }
    }

    const routeData = { view, category: nextCategory, productId: nextProductId };
    const targetUrl = getRouteUrl(view, nextCategory, nextProductId);

    // 1. Update React state
    setCurrentView(view);
    if (nextCategory) setActiveCategory(nextCategory);
    if (nextProduct && view === 'product-details') setSelectedProduct(nextProduct);

    // 2. Persist to storage for refresh failsafe
    try {
      sessionStorage.setItem('rr_active_route', JSON.stringify(routeData));
      localStorage.setItem('rr_active_route', JSON.stringify(routeData));
    } catch (e) {
      console.error(e);
    }

    // 3. Push or Replace in browser history
    try {
      const currentFullUrl = window.location.pathname + window.location.search;
      if (options.replace) {
        window.history.replaceState(routeData, '', targetUrl);
      } else if (currentFullUrl !== targetUrl) {
        window.history.pushState(routeData, '', targetUrl);
      }
    } catch (e) {
      console.error(e);
    }

    if (options.scroll !== false) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Browser Back & Forward Button Handling (popstate)
  useEffect(() => {
    const handlePopState = (event) => {
      let state = event.state;
      if (!state || !state.view) {
        state = parseRouteFromLocation();
      }

      if (state && state.view) {
        setCurrentView(state.view);
        if (state.category) {
          setActiveCategory(state.category);
        }
        if (state.productId) {
          const found = PRODUCTS.find((p) => p.id === state.productId);
          if (found) setSelectedProduct(found);
        }
        try {
          sessionStorage.setItem('rr_active_route', JSON.stringify(state));
          localStorage.setItem('rr_active_route', JSON.stringify(state));
        } catch (e) {
          console.error(e);
        }
      }
    };

    window.addEventListener('popstate', handlePopState);

    // Sync initial history state on first render
    const initialUrl = getRouteUrl(initialRoute.view, initialRoute.category, initialRoute.productId);
    const currentFullUrl = window.location.pathname + window.location.search;
    const initialUrlToUse = currentFullUrl === '/' && initialRoute.view !== 'home' ? initialUrl : currentFullUrl;

    try {
      window.history.replaceState(
        { view: initialRoute.view, category: initialRoute.category, productId: initialRoute.productId },
        '',
        initialUrlToUse
      );
    } catch (e) {
      console.error(e);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  // Auth Operations
  const handleLogin = (userProfile) => {
    setCurrentUser(userProfile);
    addToast(`Welcome back, ${userProfile.name}!`, 'success');
    navigateTo('home');
  };

  const handleLogout = () => {
    const guestUser = { isLoggedIn: false };
    setCurrentUser(guestUser);
    addToast('Signed out of account. Guest session active.', 'info');
    navigateTo('home');
  };

  const handleUpdateProfile = (updatedUser) => {
    setCurrentUser(updatedUser);
    addToast('Profile and preferences updated successfully!', 'success');
  };

  // Promo Code State
  const [appliedPromo, setAppliedPromo] = useState('ROGUE10');

  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Toast System
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 2800);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // View Navigation Handlers
  const handleNavigate = (view) => {
    navigateTo(view);
  };

  const handleSelectCategory = (cat, openPage = true) => {
    if (openPage) {
      navigateTo('category', { category: cat });
    } else {
      navigateTo('home', { category: cat });
    }
  };

  const handleOpenProduct = (product) => {
    navigateTo('product-details', { product, productId: product.id });
  };

  // Cart Operations
  const handleAddToCart = (productWithVariant) => {
    const { id, selectedColor = 'Default', selectedVariant = 'M', quantity = 1 } = productWithVariant;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.id === id &&
          item.selectedColor === selectedColor &&
          item.selectedVariant === selectedVariant
      );

      if (existingIdx > -1) {
        const nextCart = [...prevCart];
        nextCart[existingIdx] = {
          ...nextCart[existingIdx],
          quantity: nextCart[existingIdx].quantity + quantity
        };
        return nextCart;
      }
      return [...prevCart, { ...productWithVariant, quantity }];
    });

    addToast(`Added "${productWithVariant.name}" to bag`, 'success');
  };

  const handleUpdateCartQty = (itemToUpdate, newQty) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemToUpdate);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === itemToUpdate.id &&
        item.selectedColor === itemToUpdate.selectedColor &&
        item.selectedVariant === itemToUpdate.selectedVariant
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveCartItem = (itemToRemove) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.id === itemToRemove.id &&
            item.selectedColor === itemToRemove.selectedColor &&
            item.selectedVariant === itemToRemove.selectedVariant
          )
      )
    );
    addToast('Item removed from cart', 'info');
  };

  // Wishlist Operations
  const handleToggleWishlist = (product) => {
    const isSaved = wishlist.some((item) => item.id === product.id);
    if (isSaved) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(`Removed from saved`, 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(`Saved to wishlist`, 'success');
    }
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Buy Now direct checkout
  const handleBuyNow = (productWithVariant, quantity = 1) => {
    handleAddToCart(productWithVariant, quantity);
    setIsCheckoutOpen(true);
  };

  // Checkout Placement
  const handleOrderComplete = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    addToast(`Order #${newOrder.id} placed successfully!`, 'success');
    navigateTo('orders');
  };

  // Cart Calculations for Checkout
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = appliedPromo ? PROMO_CODES[appliedPromo]?.discount || 0 : 0;
  const cartDiscount = cartSubtotal * discountRate;
  const cartShipping = cartSubtotal >= 3000 || cart.length === 0 ? 0 : 70;
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  return (
    <div className="wr-app" id="wr-app-root">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={handleNavigate}
        onSelectCategory={handleSelectCategory}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        ordersCount={orders.length}
        currentUser={currentUser}
        onLogout={handleLogout}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q && currentView !== 'home') {
            setCurrentView('home');
          }
        }}
      />

      <main>
        {/* 1. Home View with Parallax Hero, Lookbook Banner & Curated Drops */}
        {currentView === 'home' && (
          <>
            {/* Cinematic Parallax Hero */}
            <Hero
              onExploreClick={() => {
                const el = document.getElementById('tri-banner-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onSelectCategory={(cat) => handleSelectCategory(cat, true)}
            />

            {/* 3-Column Editorial Tri-Banner (T-Shirts / Jeans / Shirts) right below Main Section */}
            <TriBanner onSelectCategory={(cat) => handleSelectCategory(cat, true)} />

            {/* Curated Category Showcases (4 Products per Category with See More buttons) */}
            <HomeSections
              products={PRODUCTS}
              onOpenProduct={handleOpenProduct}
              onAddToCart={handleAddToCart}
              isWishlisted={isWishlisted}
              onToggleWishlist={handleToggleWishlist}
              onSelectCategory={(cat) => handleSelectCategory(cat, true)}
            />
          </>
        )}

        {/* Dedicated Category / Collection Products Page */}
        {currentView === 'category' && (
          <CatalogView
            products={PRODUCTS}
            activeCategory={activeCategory}
            onSelectCategory={(cat) => handleSelectCategory(cat, true)}
            onBackToHome={() => handleNavigate('home')}
            onOpenProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
            isWishlisted={isWishlisted}
            onToggleWishlist={handleToggleWishlist}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        )}

        {/* Dedicated Product Details Page */}
        {currentView === 'product-details' && (
          <ProductDetailsPage
            product={selectedProduct}
            allProducts={PRODUCTS}
            onOpenProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isWishlisted={isWishlisted}
            onToggleWishlist={handleToggleWishlist}
            onBack={() => handleNavigate('home')}
            onSelectCategory={(cat) => handleSelectCategory(cat, true)}
          />
        )}

        {/* 3. Dedicated Shopping Cart Page */}
        {currentView === 'cart' && (
          <CartPage
            cart={cart}
            onUpdateQty={handleUpdateCartQty}
            onRemoveItem={handleRemoveCartItem}
            onContinueShopping={() => handleNavigate('home')}
            onProceedCheckout={() => setIsCheckoutOpen(true)}
            appliedPromo={appliedPromo}
            onApplyPromo={(code) => {
              setAppliedPromo(code);
              if (code) addToast(`Voucher ${code} applied!`, 'success');
            }}
          />
        )}

        {/* 4. Dedicated Customer Orders Page */}
        {currentView === 'orders' && (
          <OrdersPage
            orders={orders}
            onStartShopping={() => handleNavigate('home')}
            onOpenProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {/* 5. Saved Wishlist Page */}
        {currentView === 'wishlist' && (
          <WishlistView
            wishlist={wishlist}
            onOpenProduct={handleOpenProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onStartShopping={() => handleNavigate('home')}
          />
        )}

        {/* 6. Customer Sign In Page */}
        {currentView === 'login' && (
          <AuthPage
            initialMode="login"
            onLoginSuccess={handleLogin}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {/* 7. Customer Registration Page */}
        {currentView === 'register' && (
          <AuthPage
            initialMode="register"
            onLoginSuccess={handleLogin}
            onBackToHome={() => handleNavigate('home')}
            onNavigate={handleNavigate}
          />
        )}

        {/* 8. Dedicated Customer Profile & Edit Page */}
        {currentView === 'profile' && (
          <ProfilePage
            user={currentUser}
            onUpdateProfile={handleUpdateProfile}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            ordersCount={orders.length}
            wishlistCount={wishlist.length}
            cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
          />
        )}
      </main>

      {/* Pure Black Streetwear Footer (Screenshot 2 Match) */}
      <Footer onSelectCategory={handleSelectCategory} onNavigate={handleNavigate} currentUser={currentUser} />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        subtotal={cartSubtotal}
        shipping={cartShipping}
        discount={cartDiscount}
        total={cartTotal}
        onOrderComplete={handleOrderComplete}
        currentUser={currentUser}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} onDismiss={removeToast} />
    </div>
  );
}
