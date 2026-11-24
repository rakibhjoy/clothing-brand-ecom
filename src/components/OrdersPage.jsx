import { useState } from 'react';
import { Package } from 'lucide-react';
import { cartKey, formatPrice, getProduct, productName, productPath } from '../storefront';
import { ProductImage } from './Media';
import ShopDialog from './ShopDialog';
import ShopLink from './ShopLink';

const dateFormat = new Intl.DateTimeFormat('en-BD', { day: 'numeric', month: 'short', year: 'numeric' });

function orderDate(date) {
  const value = new Date(date);
  return Number.isNaN(value.valueOf()) ? 'Date unavailable' : dateFormat.format(value);
}

function OrderTotals({ order }) {
  return (
    <dl className="totals">
      <div><dt>Subtotal</dt><dd>{formatPrice(order.subtotal)}</dd></div>
      <div><dt>Delivery</dt><dd>{order.shipping ? formatPrice(order.shipping) : 'Free'}</dd></div>
      {order.discount > 0 && <div><dt>Discount</dt><dd>−{formatPrice(order.discount)}</dd></div>}
      <div className="totals-final"><dt>Total</dt><dd>{formatPrice(order.total)}</dd></div>
    </dl>
  );
}

export default function OrdersPage({ orders, onNavigate }) {
  const [query, setQuery] = useState('');
  const [receipt, setReceipt] = useState(null);
  const search = query.trim().toLowerCase();
  const results = [...orders].sort((a, b) => String(b.date).localeCompare(String(a.date))).filter((order) =>
    [order.id, order.trackingNumber, order.status, ...order.items.map((item) => item.name)]
      .some((text) => typeof text === 'string' && text.toLowerCase().includes(search))
  );

  return (
    <section className="container page-section orders-page">
      <div className="page-heading"><h1>Order history</h1><p>Orders saved in this browser.</p></div>
      {orders.length > 1 && (
        <label className="order-search">Find an order<input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Order number, product or status" /></label>
      )}
      {results.length ? (
        <div className="orders-list">
          {results.map((order) => (
            <article className="order-card" key={order.id}>
              <header>
                <div><h2>{order.id}</h2><p>{orderDate(order.date)}</p></div>
                <span className="order-status">{order.status || 'Saved'}</span>
              </header>
              <ul>
                {order.items.map((item, index) => {
                  const product = getProduct(item.id);
                  const name = productName(item);
                  return (
                    <li key={cartKey(item) + '-' + index} className="order-item">
                      <div className="line-image"><ProductImage src={item.image} alt="" /></div>
                      <div>
                        {product ? <ShopLink href={productPath(product.id)} onNavigate={onNavigate}>{name}</ShopLink> : <strong>{name}</strong>}
                        <p>{[item.selectedColor, item.selectedVariant, 'Qty ' + item.quantity].filter(Boolean).join(' · ')}</p>
                      </div>
                      <strong>{formatPrice(item.price * item.quantity)}</strong>
                    </li>
                  );
                })}
              </ul>
              {order.trackingNumber && <p className="tracking-info">Tracking number <strong>{order.trackingNumber}</strong>{order.estimatedDelivery && <> · {order.estimatedDelivery}</>}</p>}
              <footer><span>Total <strong>{formatPrice(order.total)}</strong></span><button type="button" className="text-link" onClick={() => setReceipt(order)}>View order summary</button></footer>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Package size={28} aria-hidden="true" />
          <h2>{orders.length ? 'No matching orders' : 'No orders yet'}</h2>
          <p>{orders.length ? 'Try searching for a different order or product.' : 'Orders you save during checkout appear here.'}</p>
          {orders.length ? <button className="text-link" type="button" onClick={() => setQuery('')}>Clear search</button>
            : <ShopLink href="/catalog" className="button button-dark" onNavigate={onNavigate}>Browse clothing</ShopLink>}
        </div>
      )}
      {receipt && (
        <ShopDialog title="Order summary" onClose={() => setReceipt(null)} className="receipt-dialog">
          <div className="receipt-content">
            <p className="eyebrow">Rogue &amp; Raw</p>
            <h3>{receipt.id}</h3>
            <p>{orderDate(receipt.date)}</p>
            {receipt.sandbox && <p className="muted">Demo order. No payment was collected.</p>}
            <dl className="receipt-address">
              {receipt.customerName && <div><dt>Customer</dt><dd>{receipt.customerName}</dd></div>}
              <div><dt>Delivery address</dt><dd>{receipt.deliveryAddress}</dd></div>
              <div><dt>Payment method</dt><dd>{receipt.paymentMethod}</dd></div>
            </dl>
            <ul className="receipt-items">{receipt.items.map((item, index) => <li key={cartKey(item) + '-' + index}>
              <span>{productName(item)} × {item.quantity}</span><strong>{formatPrice(item.price * item.quantity)}</strong>
            </li>)}</ul>
            <OrderTotals order={receipt} />
          </div>
          <button className="button button-outline full-width no-print" type="button" onClick={() => window.print()}>Print summary</button>
        </ShopDialog>
      )}
    </section>
  );
}
