import { useRef, useState } from 'react';
import { ArrowLeft, Banknote, CreditCard, Info, MapPin, ShoppingBag, Smartphone } from 'lucide-react';
import { cartKey, formatPrice, getCartTotals, productName } from '../storefront';
import { ProductImage } from './Media';
import ShopLink from './ShopLink';

const cities = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];

const paymentMethods = [
  { id: 'cash', name: 'Cash on delivery', icon: Banknote },
  { id: 'bkash', name: 'bKash', icon: Smartphone },
  { id: 'nagad', name: 'Nagad', icon: Smartphone },
  { id: 'card', name: 'Credit or debit card', icon: CreditCard }
];

export default function CheckoutPage({ items, promo, user, direct, returnPath, onNavigate, onComplete }) {
  const [city, setCity] = useState(user.city || 'Dhaka');
  const [payment, setPayment] = useState(paymentMethods[0].id);
  const [error, setError] = useState('');
  const submitted = useRef(false);
  const totals = getCartTotals(items, promo, city.trim() || 'Dhaka');
  const count = items.reduce((sum, item) => sum + item.quantity, 0);
  const method = paymentMethods.find((entry) => entry.id === payment);
  const returnLabel = direct ? (returnPath === '/catalog' ? 'Continue shopping' : 'Back to product') : 'Back to bag';

  function submit(event) {
    event.preventDefault();
    if (submitted.current || !items.length) return;
    const form = new FormData(event.currentTarget);
    const name = form.get('name').trim();
    const phone = form.get('phone').trim();
    const address = form.get('address').trim();
    const postalCode = form.get('postalCode').trim();
    const locality = city.trim();
    const digits = phone.replace(/\D/g, '');

    if (!name || !address || !locality || digits.length < 7 || digits.length > 15 || !/^[+\d ().-]+$/.test(phone)) {
      setError('Enter your name, a valid phone number, your street address and city.');
      return;
    }

    submitted.current = true;
    const id = Array.from(window.crypto.getRandomValues(new Uint8Array(6)), (number) => number.toString(16).padStart(2, '0')).join('').toUpperCase();
    const failure = onComplete({
      id: 'RR-' + id,
      date: new Date().toISOString(),
      status: 'Saved demo',
      paymentMethod: method.name,
      deliveryAddress: [address, locality, postalCode].filter(Boolean).join(', '),
      customerName: name,
      customerPhone: phone,
      sandbox: true,
      items,
      ...getCartTotals(items, promo, locality)
    });

    if (failure) {
      submitted.current = false;
      setError(failure);
    }
  }

  return (
    <section className="checkout-page" aria-labelledby="checkout-title">
      <div className="container page-section">
        <header className="page-heading checkout-heading">
          <ShopLink className="checkout-back" href={returnPath} onNavigate={onNavigate}>
            <ArrowLeft size={16} aria-hidden="true" />{returnLabel}
          </ShopLink>
          <h1 id="checkout-title">Checkout</h1>
        </header>
        {items.length ? (
          <form className="checkout-layout" onSubmit={submit}>
            <div className="checkout-fields">
              <section className="checkout-panel checkout-address" aria-labelledby="delivery-title">
                <h2 className="checkout-panel-title" id="delivery-title"><MapPin size={21} aria-hidden="true" /> Delivery details</h2>
                <div className="form-grid">
                  <label>Full name<input name="name" autoComplete="name" defaultValue={user.name || ''} required maxLength={100} /></label>
                  <label>Phone number<input name="phone" type="tel" autoComplete="tel" defaultValue={user.phone || ''} required maxLength={30} /></label>
                  <label className="span-all">Street address<input name="address" autoComplete="street-address" defaultValue={user.address || ''} required maxLength={180} /></label>
                  <label>City<input name="city" value={city} onChange={(event) => setCity(event.target.value)} autoComplete="address-level2" list="checkout-cities" required maxLength={70} /></label>
                  <label><span>Postal code <span className="muted">(optional)</span></span><input name="postalCode" autoComplete="postal-code" defaultValue={user.postalCode || ''} maxLength={15} /></label>
                </div>
                <datalist id="checkout-cities">{cities.map((name) => <option key={name} value={name} />)}</datalist>
              </section>

              <section className="checkout-panel" aria-labelledby="payment-title">
                <h2 className="checkout-panel-title" id="payment-title"><CreditCard size={21} aria-hidden="true" /> Payment method</h2>
                <fieldset className="checkout-payment" aria-describedby="checkout-payment-note">
                  <legend className="sr-only">Choose a payment method</legend>
                  {paymentMethods.map(({ id, name, icon: Icon }) => (
                    <label className="checkout-payment-option" key={id}>
                      <input name="payment" type="radio" value={id} checked={payment === id} onChange={() => setPayment(id)} />
                      <Icon size={19} aria-hidden="true" />
                      <span>{name}</span>
                    </label>
                  ))}
                </fieldset>
                <p id="checkout-payment-note" className="checkout-payment-note">
                  <Info size={16} aria-hidden="true" />
                  <span>Demo checkout. Your order is saved on this device. No payment is collected.</span>
                </p>
              </section>
            </div>

            <aside className="checkout-panel checkout-summary" aria-labelledby="checkout-summary-title">
              <div className="checkout-summary-heading">
                <h2 id="checkout-summary-title">Order summary</h2>
                <span>{count} {count === 1 ? 'item' : 'items'}</span>
              </div>
              <ul className="checkout-items">
                {items.map((item) => (
                  <li className="checkout-item" key={cartKey(item)}>
                    <div className="line-image"><ProductImage src={item.image} alt="" loading="eager" /></div>
                    <div>
                      <strong>{productName(item)}</strong>
                      <p>{item.selectedColor} &middot; {item.selectedVariant}</p>
                      <p>Qty {item.quantity}</p>
                    </div>
                    <strong className="line-price">{formatPrice(item.price * item.quantity)}</strong>
                  </li>
                ))}
              </ul>
              <dl className="totals checkout-totals" aria-live="polite">
                <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
                <div><dt>Delivery</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
                {totals.discount > 0 && <div><dt>Discount <span className="checkout-promo">{promo}</span></dt><dd>&minus;{formatPrice(totals.discount)}</dd></div>}
                <div className="totals-final"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
              </dl>
              {error && <p className="form-error" role="alert">{error}</p>}
              <button className="button button-dark full-width checkout-submit" type="submit">Save demo order</button>
            </aside>
          </form>
        ) : (
          <div className="empty-state">
            <ShoppingBag size={28} aria-hidden="true" />
            <h2>{direct ? 'This selection is unavailable' : 'Your bag is empty'}</h2>
            <p>{direct ? 'Return to the product and choose an available color and size.' : 'Add something to your bag to continue to checkout.'}</p>
            <ShopLink className="button button-dark" href={direct ? returnPath : '/catalog'} onNavigate={onNavigate}>
              {direct && returnPath !== '/catalog' ? 'Back to product' : 'Browse clothing'}
            </ShopLink>
          </div>
        )}
      </div>
    </section>
  );
}
