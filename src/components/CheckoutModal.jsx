import React, { useState } from 'react';
import { X, Lock } from 'lucide-react';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  subtotal,
  shipping,
  discount,
  total,
  onOrderComplete,
  currentUser
}) {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: currentUser?.name || 'Rafid Ahmed',
    email: currentUser?.email || 'rafid.ahmed@example.com',
    phone: currentUser?.phone || '+880 1712-345678',
    address: currentUser?.address || 'House 42, Road 11, Block D, Banani',
    city: currentUser?.city || 'Dhaka',
    zone: (currentUser?.city || 'Dhaka') === 'Dhaka' ? 'Inside Dhaka' : 'Outside Dhaka',
    paymentMethod: 'Cash on Delivery / bKash'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `RR-${Math.floor(10000 + Math.random() * 90000)}`;
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        status: 'Processing',
        paymentMethod: formData.paymentMethod,
        deliveryAddress: `${formData.address}, ${formData.city} (Phone: ${formData.phone})`,
        estimatedDelivery: 'Dispatched via Steadfast Courier (2-3 Business Days)',
        trackingNumber: `STEADFAST-${Math.floor(100000 + Math.random() * 900000)}`,
        shipping,
        subtotal,
        discount,
        total,
        items: [...cart]
      };

      setIsSubmitting(false);
      onOrderComplete(newOrder);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="order-modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={16} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Lock size={18} />
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, textTransform: 'uppercase' }}>
            Rogue & Raw Checkout
          </h2>
        </div>
        <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '1.5rem' }}>
          Please fill in your delivery details for courier dispatch.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="checkout-grid-2col" style={{ marginBottom: '0.75rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Phone Number
              </label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', fontSize: '0.85rem' }}
              />
            </div>
          </div>

          <div style={{ marginBottom: '0.75rem' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
              Delivery Street Address
            </label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', fontSize: '0.85rem' }}
            />
          </div>

          <div className="checkout-grid-2col" style={{ marginBottom: '1.25rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                City
              </label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', fontSize: '0.85rem' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.25rem' }}>
                Payment Method
              </label>
              <select
                value={formData.paymentMethod}
                onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                style={{ width: '100%', padding: '0.55rem', border: '1px solid #ccc', fontSize: '0.85rem', background: '#fff' }}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="bKash / Nagad">bKash / Nagad Mobile Pay</option>
                <option value="Debit / Credit Card">Debit / Credit Card</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '1rem', borderTop: '2px solid #000' }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' }}>Total to Pay</div>
              <div style={{ fontSize: '1.4rem', fontWeight: 800 }}>৳ {total.toLocaleString()}</div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-checkout-block"
              style={{ width: 'auto', padding: '0.85rem 1.75rem', margin: 0 }}
              id="btn-confirm-order"
            >
              {isSubmitting ? 'PROCESSING...' : 'CONFIRM ORDER'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
