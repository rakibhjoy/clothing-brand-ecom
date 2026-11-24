import { useRef, useState } from 'react';
import ShopDialog from './ShopDialog';
import { formatPrice, getCartTotals } from '../storefront';

const cities = ['Dhaka', 'Chattogram', 'Sylhet', 'Rajshahi', 'Khulna', 'Barishal', 'Rangpur', 'Mymensingh'];

export default function CheckoutModal({ items, promo, user, onClose, onComplete }) {
  const [city, setCity] = useState(user.city || 'Dhaka');
  const [error, setError] = useState('');
  const submitted = useRef(false);
  const totals = getCartTotals(items, promo, city || 'Dhaka');

  function submit(event) {
    event.preventDefault();
    if (submitted.current || !items.length) return;
    const form = new FormData(event.currentTarget);
    const name = form.get('name').trim();
    const phone = form.get('phone').trim();
    const address = form.get('address').trim();
    const locality = city.trim();
    const digits = phone.replace(/\D/g, '');
    if (!name || !address || !locality || digits.length < 7 || digits.length > 15 || !/^[+\d ().-]+$/.test(phone)) {
      setError('Enter your name, a valid phone number, street address and city.');
      return;
    }

    submitted.current = true;
    const id = Array.from(window.crypto.getRandomValues(new Uint8Array(6)), (number) => number.toString(16).padStart(2, '0')).join('').toUpperCase();
    if (!onComplete({
      id: 'RR-' + id,
      date: new Date().toISOString(),
      status: 'Saved demo',
      paymentMethod: 'Cash on delivery',
      deliveryAddress: address + ', ' + locality,
      customerName: name,
      sandbox: true,
      items,
      ...getCartTotals(items, promo, locality)
    })) {
      submitted.current = false;
      setError('The order could not be saved. Check your browser storage settings and try again.');
    }
  }

  return (
    <ShopDialog title="Checkout" onClose={onClose} className="checkout-dialog">
      <p className="muted">Demo checkout. This order is saved on this device. No payment is collected.</p>
      <form className="checkout-form" onSubmit={submit}>
        <div className="form-grid">
          <label>Full name<input name="name" autoComplete="name" defaultValue={user.name || ''} required maxLength={100} /></label>
          <label>Phone<input name="phone" type="tel" autoComplete="tel" defaultValue={user.phone || ''} required maxLength={30} /></label>
          <label className="span-all">Street address<input name="address" autoComplete="street-address" defaultValue={user.address || ''} required maxLength={180} /></label>
          <label>City<input name="city" value={city} onChange={(event) => setCity(event.target.value)} autoComplete="address-level2" list="checkout-cities" required maxLength={70} /></label>
          <label>Payment method<input value="Cash on delivery" readOnly /></label>
        </div>
        <datalist id="checkout-cities">{cities.map((name) => <option key={name} value={name} />)}</datalist>
        <dl className="totals">
          <div><dt>Subtotal</dt><dd>{formatPrice(totals.subtotal)}</dd></div>
          <div><dt>Delivery</dt><dd>{totals.shipping ? formatPrice(totals.shipping) : 'Free'}</dd></div>
          {totals.discount > 0 && <div><dt>Discount</dt><dd>−{formatPrice(totals.discount)}</dd></div>}
          <div className="totals-final"><dt>Total</dt><dd>{formatPrice(totals.total)}</dd></div>
        </dl>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark full-width" type="submit">Save demo order</button>
      </form>
    </ShopDialog>
  );
}
