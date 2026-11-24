import { CATEGORIES, PRODUCTS, PROMO_CODES } from './data/products.js';

export const FREE_SHIPPING_MINIMUM = 3000;
export const BAG_LIMIT = 99;
export const GUEST = { isLoggedIn: false };

const pages = ['cart', 'orders', 'wishlist', 'profile', 'login', 'register'];
const money = new Intl.NumberFormat('en-BD', {
  style: 'currency', currency: 'BDT', currencyDisplay: 'narrowSymbol', maximumFractionDigits: 2, minimumFractionDigits: 0
});

const fractionalMoney = new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT', currencyDisplay: 'narrowSymbol' });
export const formatPrice = (amount) => (Number.isInteger(amount) ? money : fractionalMoney).format(amount);
export const productName = (product) => product.name.replace(/^R&R\s+/, '');
export function productCategory(product) {
  if (product.id.startsWith('wr-knit-')) return 'Knit collar';
  return product.category === 'T-Shirts' ? 'T-shirts' : product.category;
}
export const productCode = (product) => product.id.toUpperCase();
export const variantProductName = (product) => product.styleName || productName(product);
export const productPath = (id) => '/product/' + encodeURIComponent(id);
export const categoryPath = (category) => category === 'ALL' ? '/catalog' : '/catalog?cat=' + encodeURIComponent(category);
export const cartKey = (item) => JSON.stringify([item.id, item.selectedColor, item.selectedVariant]);
export const getProduct = (id) => typeof id === 'string'
  ? PRODUCTS.find((product) => product.id === id || product.id === id.replace(/^rr-/, 'wr-'))
  : undefined;

export const photoKey = (url) => url?.split('?')[0];

export function productSku(product, color, size) {
  if (!product.sizes.includes(size) || !product.colors.some((entry) => entry.name === color)) return null;
  const skuPart = (value) => value.toUpperCase().replace(/[^A-Z0-9]+/g, '-').replace(/^-|-$/g, '');
  return [productCode(product), skuPart(color), skuPart(size)].join('-');
}

export function getProductPhotos(product) {
  const sources = [product.image, ...product.gallery, ...product.colors.map((color) => color.thumb)].filter(Boolean);
  const photos = new Map();
  for (const source of sources) {
    const key = photoKey(source);
    if (!photos.has(key)) photos.set(key, source);
  }
  return [...photos.values()];
}

export function normalizeCategory(value) {
  const category = value?.trim().toUpperCase();
  if (category === 'DENIM') return 'JEANS';
  return CATEGORIES.includes(category) ? category : 'ALL';
}

export function readRoute(location) {
  const hashRoute = location.pathname === '/' && location.hash.startsWith('#/')
    ? new URL(location.hash.slice(1), location.origin)
    : location;
  const pathname = hashRoute.pathname.replace(/\/+$/, '') || '/';
  const params = new URLSearchParams(hashRoute.search);

  if (pathname.startsWith('/product/')) {
    try {
      return { view: 'product', id: decodeURIComponent(pathname.slice(9)) };
    } catch {
      return { view: 'missing' };
    }
  }

  if (pathname === '/product' || (pathname === '/' && (params.has('product') || params.has('id')))) {
    return { view: 'product', id: params.get('product') || params.get('id') };
  }

  if (['/catalog', '/category'].includes(pathname) ||
      (pathname === '/' && ['category', 'cat', 'q'].some((key) => params.has(key)))) {
    return {
      view: 'catalog',
      category: normalizeCategory(params.get('cat') || params.get('category')),
      query: params.get('q')?.trim() || ''
    };
  }

  const page = pathname === '/' ? params.get('view') : pathname.slice(1);
  if (pages.includes(page)) return { view: page };
  return { view: pathname === '/' ? 'home' : 'missing' };
}

export function matchesCategory(product, category) {
  switch (category) {
    case 'ALL': return true;
    case 'NEW ARRIVALS': return product.isNewArrival || product.badge?.toLowerCase().includes('new');
    case 'BEST SELLERS': return product.isBestSeller || product.badge?.toLowerCase().includes('best');
    case 'YOU MAY LIKE': return product.isRecommended || product.rating >= 4.9;
    case 'KNIT COLLAR': return product.id.startsWith('wr-knit-') || product.category === 'Knit Collar';
    default: return normalizeCategory(product.category) === category;
  }
}

export function findProducts(products, category, query = '', sort = 'featured') {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  const results = products.filter((product) => {
    const text = [
      product.name, product.category, productCategory(product), productCode(product),
      product.colorName, ...product.colors.map((color) => color.name)
    ].join(' ').toLowerCase();
    return matchesCategory(product, category) && terms.every((term) => text.includes(term));
  });
  if (sort === 'price-asc') results.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') results.sort((a, b) => b.price - a.price);
  if (sort === 'rating') results.sort((a, b) => b.rating - a.rating);
  return results;
}

export function getCartTotals(items, promo, city = 'Dhaka') {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const rate = Object.hasOwn(PROMO_CODES, promo) ? PROMO_CODES[promo].discount : 0;
  const discount = Math.round(subtotal * rate * 100) / 100;
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_MINIMUM
    ? 0
    : city.trim().toLowerCase() === 'dhaka' ? 70 : 130;
  const total = Math.round((subtotal - discount + shipping) * 100) / 100;
  return { subtotal, discount, shipping, total };
}

export function createCartItem(product, colorName, size, quantity = 1) {
  const color = product.colors.find((entry) => entry.name === colorName) || product.colors[0];
  return {
    id: product.id,
    name: variantProductName(product),
    price: product.price,
    image: color?.thumb || product.image,
    selectedColor: color?.name || product.colorName,
    selectedVariant: product.sizes.includes(size) ? size : product.sizes[0],
    quantity: Math.min(BAG_LIMIT, Math.max(1, Math.trunc(Number(quantity)) || 1))
  };
}

export function addCartItem(cart, item) {
  const key = cartKey(item);
  if (!cart.some((entry) => cartKey(entry) === key)) return [...cart, item];
  return cart.map((entry) => cartKey(entry) === key
    ? { ...entry, quantity: Math.min(BAG_LIMIT, entry.quantity + item.quantity) }
    : entry);
}

export function readStored(storage, key, fallback) {
  try {
    return JSON.parse(window[storage].getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writeStored(storage, key, value) {
  try {
    window[storage].setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function storedList(state, field, ...keys) {
  if (Array.isArray(state?.[field])) return state[field];
  for (const key of keys) {
    const value = readStored('localStorage', key, null);
    if (Array.isArray(value)) return value;
  }
  return [];
}

export function loadStorefront() {
  const state = readStored('localStorage', 'rr_storefront', null);
  const cart = storedList(state, 'cart', 'rr_cart', 'wr_cart').reduce((items, entry) => {
    const product = getProduct(entry?.id);
    if (!product || !Number.isFinite(Number(entry.quantity)) || Number(entry.quantity) < 1) return items;
    return addCartItem(items, createCartItem(product, entry.selectedColor, entry.selectedVariant, entry.quantity));
  }, []);

  const wishlist = [...new Set(storedList(state, 'wishlist', 'rr_wishlist', 'wr_wishlist')
    .map((entry) => getProduct(typeof entry === 'string' ? entry : entry?.id)?.id)
    .filter(Boolean))];
  const orders = storedList(state, 'orders', 'rr_orders', 'wr_orders')
    .filter((order) => typeof order?.id === 'string' && order.id !== 'RR-92041' &&
      Array.isArray(order.items) && order.items.every((item) => typeof item?.name === 'string' &&
        Number.isFinite(item.price) && Number.isFinite(item.quantity)) &&
      [order.subtotal, order.shipping, order.total].every(Number.isFinite));
  const promo = Object.hasOwn(PROMO_CODES, state?.promo) ? state.promo : '';
  return { cart, wishlist, orders, promo };
}

export function recordOrder(store, order, ownerId, fromBag) {
  const purchased = new Map(order.items.map((item) => [cartKey(item), item.quantity]));
  const cart = fromBag ? store.cart.flatMap((item) => {
    const quantity = item.quantity - (purchased.get(cartKey(item)) || 0);
    return quantity > 0 ? [{ ...item, quantity }] : [];
  }) : store.cart;

  return {
    ...store,
    cart,
    promo: cart.length ? store.promo : '',
    orders: [{ ...order, ownerId }, ...store.orders]
  };
}
