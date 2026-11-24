import { useState } from 'react';
import { Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { PROMO_CODES } from '../data/products';
import { BAG_LIMIT, cartKey, formatPrice, getCartTotals, productName, productPath } from '../storefront';
import { ProductImage } from './Media';
import ShopLink from './ShopLink';

export default function CartPage({ cart, promo, city, onNavigate, onUpdateQuantity, onApplyPromo, onCheckout }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const totals = getCartTotals(cart, promo, city);
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);

  function applyPromo(event) {
    event.preventDefault();
    const value = code.trim().toUpperCase();
    if (!Object.hasOwn(PROMO_CODES, value)) {
      setError('Enter a valid promo code.');
      return;
    }
    onApplyPromo(value);
    setCode('');
    setError('');
  }

  return (
    <section className="container page-section">
      <div className="page-heading"><h1>Shopping bag</h1>{count > 0 && <p>{count} {count === 1 ? 'item' : 'items'}</p>}</div>
      {count === 0 ? (
        <div className="empty-state">
          <ShoppingBag size={28} aria-hidden="true" />
          <h2>Your bag is empty</h2><p>Find your next everyday essential.</p>
          <ShopLink className="button button-dark" href="/catalog" onNavigate={onNavigate}>Browse clothing</ShopLink>
        </div>
      ) : (
        <div className="cart-layout">
          <ul className="line-items">
            {cart.map((item) => {
              const name = productName(item);
              return (
                <li key={cartKey(item)} className="cart-item">
                  <ShopLink className="line-image" href={productPath(item.id)} onNavigate={onNavigate} aria-label={name}>
                    <ProductImage src={item.image} alt="" />
                  </ShopLink>
                  <div className="line-info">
                    <h2><ShopLink href={productPath(item.id)} onNavigate={onNavigate}>{name}</ShopLink></h2>
                    <p>{item.selectedColor} · {item.selectedVariant}</p>
                    <div className="cart-item-controls">
                      <div className="quantity-stepper" aria-label={'Quantity for ' + name}>
                        <button type="button" onClick={() => onUpdateQuantity(item, item.quantity - 1)} disabled={item.quantity === 1} aria-label={'Decrease quantity of ' + name}><Minus size={15} /></button>
                        <span>{item.quantity}</span>
                        <button type="button" onClick={() => onUpdateQuantity(item, item.quantity + 1)} disabled={item.quantity >= BAG_LIMIT} aria-label={'Increase quantity of ' + name}><Plus size={15} /></button>
                      </div>
                      <button type="button" className="icon-button remove-item" onClick={() => onUpdateQuantity(item, 0)} aria-label={'Remove ' + name}><Trash2 size={17} /></button>
                    </div>
                  </div>
                  <strong className="line-price">{formatPrice(item.price * item.quantity)}</strong>
                </li>
              );
            })}
          </ul>
          <aside className="cart-summary surface">
            <h2>Order summary</h2>
            <dl className="totals">
              <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
              <div><dt>Estimated delivery</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
              {promo && <div><dt>Discount</dt><dd>−{formatPrice(totals.discount)}</dd></div>}
              <div className="totals-final"><dt>Estimated total</dt><dd>{formatPrice(totals.total)}</dd></div>
            </dl>
            {promo ? (
              <div className="applied-code"><span>{promo} applied</span><button type="button" className="text-link" onClick={() => onApplyPromo('')}>Remove</button></div>
            ) : (
              <form className="promo-form" onSubmit={applyPromo}>
                <label htmlFor="promo-code">Promo code</label>
                <div className="promo-row"><input id="promo-code" value={code} onChange={(event) => { setCode(event.target.value); setError(''); }} />
                  <button type="submit" className="button button-outline">Apply</button></div>
                {error && <p className="form-error" role="alert">{error}</p>}
              </form>
            )}
            <button type="button" className="button button-dark full-width" onClick={onCheckout}>Continue to checkout</button>
          </aside>
        </div>
      )}
    </section>
  );
}
