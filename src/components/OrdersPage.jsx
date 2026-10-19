import React, { useState, useMemo } from 'react';
import {
  Package,
  X,
  Truck,
  CheckCircle2,
  Clock,
  Search,
  Printer,
  Copy,
  Check,
  ArrowRight,
  Calendar,
  MapPin,
  CreditCard,
  ShieldCheck,
  FileText
} from 'lucide-react';

export default function OrdersPage({ orders = [], onStartShopping, onOpenProduct, onAddToCart }) {
  const [activeStatus, setActiveStatus] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState(null);

  // Status counts
  const counts = useMemo(() => {
    return {
      all: orders.length,
      processing: orders.filter((o) => o.status?.toUpperCase() === 'PROCESSING').length,
      shipped: orders.filter((o) => o.status?.toUpperCase() === 'SHIPPED').length,
      delivered: orders.filter((o) => o.status?.toUpperCase() === 'DELIVERED').length
    };
  }, [orders]);

  // Total Lifetime Spend
  const totalLifetimeSpend = useMemo(() => {
    return orders.reduce((sum, o) => sum + (o.total || 0), 0);
  }, [orders]);

  // Total Items Count
  const totalItemsCount = useMemo(() => {
    return orders.reduce((sum, o) => {
      const itemsCount = o.items ? o.items.reduce((acc, it) => acc + (it.quantity || 1), 0) : 0;
      return sum + itemsCount;
    }, 0);
  }, [orders]);

  // Filter orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchesStatus =
        activeStatus === 'ALL' || o.status?.toUpperCase() === activeStatus.toUpperCase();

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        o.id?.toLowerCase().includes(q) ||
        o.trackingNumber?.toLowerCase().includes(q) ||
        o.deliveryAddress?.toLowerCase().includes(q) ||
        o.items?.some((it) => it.name?.toLowerCase().includes(q));

      return matchesStatus && matchesSearch;
    });
  }, [orders, activeStatus, searchQuery]);

  const handleCopyId = (id) => {
    try {
      navigator.clipboard?.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const getStatusBadge = (status = '') => {
    const s = status.toUpperCase();
    if (s === 'DELIVERED') {
      return (
        <span className="order-pill-badge badge-delivered">
          <CheckCircle2 size={12} />
          <span>DELIVERED</span>
        </span>
      );
    }
    if (s === 'SHIPPED') {
      return (
        <span className="order-pill-badge badge-shipped">
          <Truck size={12} />
          <span>IN TRANSIT</span>
        </span>
      );
    }
    return (
      <span className="order-pill-badge badge-processing">
        <Clock size={12} />
        <span>PROCESSING</span>
      </span>
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="orders-page-wrap" id="orders-page-view">
      {/* Editorial Header */}
      <div className="orders-header-section">
        <div className="orders-pre-badge">
          <span>[ ARCHIVE 2026 // USER ACCOUNT ]</span>
          <span className="badge-verified">
            <ShieldCheck size={12} style={{ marginRight: '4px' }} />
            VERIFIED BUYER
          </span>
        </div>
        <h1 className="orders-main-title">CUSTOMER ORDER ARCHIVE</h1>
        <p className="orders-subtitle">
          Real-time courier dispatch status, itemized manifests, and official digital tax invoices for all purchases.
        </p>

        {/* Stats Metrics Bar */}
        <div className="orders-stats-grid">
          <div className="order-stat-card">
            <div className="stat-label">TOTAL ORDERS</div>
            <div className="stat-value">{orders.length}</div>
            <div className="stat-hint">Lifetime purchases</div>
          </div>
          <div className="order-stat-card">
            <div className="stat-label">PIECES PURCHASED</div>
            <div className="stat-value">{totalItemsCount}</div>
            <div className="stat-hint">Heavyweight apparel</div>
          </div>
          <div className="order-stat-card">
            <div className="stat-label">TOTAL SPENT</div>
            <div className="stat-value">৳ {totalLifetimeSpend.toLocaleString()}</div>
            <div className="stat-hint">BDT (All Taxes Incl.)</div>
          </div>
          <div className="order-stat-card">
            <div className="stat-label">PRIMARY COURIER</div>
            <div className="stat-value courier-text">STEADFAST EXPRESS</div>
            <div className="stat-hint">Dhaka Fast Hub 24-48h</div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="orders-controls-bar">
        <div className="orders-tabs-group">
          {[
            { id: 'ALL', label: 'ALL', count: counts.all },
            { id: 'DELIVERED', label: 'DELIVERED', count: counts.delivered },
            { id: 'SHIPPED', label: 'IN TRANSIT', count: counts.shipped },
            { id: 'PROCESSING', label: 'PROCESSING', count: counts.processing }
          ].map((tab) => (
            <button
              key={tab.id}
              className={`order-tab-btn ${activeStatus === tab.id ? 'active' : ''}`}
              onClick={() => setActiveStatus(tab.id)}
            >
              <span>{tab.label}</span>
              <span className="order-tab-count">{tab.count}</span>
            </button>
          ))}
        </div>

        <div className="orders-search-wrapper">
          <Search size={14} className="orders-search-icon" />
          <input
            type="text"
            placeholder="Search order ID, product name, tracking..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="orders-search-input"
          />
          {searchQuery && (
            <button className="orders-search-clear" onClick={() => setSearchQuery('')}>
              <X size={13} />
            </button>
          )}
        </div>
      </div>

      {/* Orders List or Empty State */}
      {filteredOrders.length === 0 ? (
        <div className="orders-empty-state">
          <div className="orders-empty-icon-box">
            <Package size={32} />
          </div>
          <h2 className="orders-empty-title">NO ORDERS FOUND</h2>
          <p className="orders-empty-text">
            {searchQuery
              ? `No records matching "${searchQuery}". Try searching with a different order ID or keyword.`
              : `You do not have any orders under the "${activeStatus}" filter.`}
          </p>
          <button className="orders-explore-btn" onClick={onStartShopping}>
            [ EXPLORE NEW ARRIVALS <ArrowRight size={14} style={{ display: 'inline', marginLeft: '6px' }} /> ]
          </button>
        </div>
      ) : (
        <div className="orders-cards-stack">
          {filteredOrders.map((order) => (
            <article key={order.id} className="order-card-item" id={`order-${order.id}`}>
              {/* Order Card Header */}
              <div className="order-card-header">
                <div className="order-header-left">
                  <div className="order-id-group">
                    <span className="order-id-label">ORDER ID:</span>
                    <strong className="order-id-code">#{order.id}</strong>
                    <button
                      className="order-copy-btn"
                      onClick={() => handleCopyId(order.id)}
                      title="Copy Order ID"
                    >
                      {copiedId === order.id ? <Check size={12} color="#10b981" /> : <Copy size={12} />}
                      <span>{copiedId === order.id ? 'COPIED' : 'COPY'}</span>
                    </button>
                  </div>
                  <div className="order-meta-pill">
                    <Calendar size={12} />
                    <span>{order.date}</span>
                  </div>
                </div>

                <div className="order-header-right">
                  <div className="order-status-wrap">{getStatusBadge(order.status)}</div>
                  <div className="order-total-price">
                    <span className="total-label">TOTAL PAID:</span>
                    <span className="total-amount">৳ {order.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Order Stepper Progress Indicator */}
              <div className="order-stepper-container">
                <div className="stepper-track">
                  <div
                    className="stepper-fill"
                    style={{
                      width:
                        order.status?.toUpperCase() === 'DELIVERED'
                          ? '100%'
                          : order.status?.toUpperCase() === 'SHIPPED'
                          ? '66%'
                          : '33%'
                    }}
                  />
                </div>
                <div className="stepper-steps">
                  <div className="stepper-step completed">
                    <span className="step-dot" />
                    <span className="step-label">Order Confirmed</span>
                  </div>
                  <div
                    className={`stepper-step ${
                      order.status?.toUpperCase() === 'SHIPPED' || order.status?.toUpperCase() === 'DELIVERED'
                        ? 'completed'
                        : 'active'
                    }`}
                  >
                    <span className="step-dot" />
                    <span className="step-label">Packing &amp; QC</span>
                  </div>
                  <div
                    className={`stepper-step ${
                      order.status?.toUpperCase() === 'SHIPPED' || order.status?.toUpperCase() === 'DELIVERED'
                        ? 'completed'
                        : ''
                    }`}
                  >
                    <span className="step-dot" />
                    <span className="step-label">Handed to Courier</span>
                  </div>
                  <div className={`stepper-step ${order.status?.toUpperCase() === 'DELIVERED' ? 'completed' : ''}`}>
                    <span className="step-dot" />
                    <span className="step-label">Delivered</span>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="order-items-wrapper">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item-row">
                    <div className="order-item-thumb-box">
                      <img
                        src={item.image || '/images/wr_purple_tee.jpg'}
                        alt={item.name}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = '/images/wr_purple_tee.jpg';
                        }}
                      />
                    </div>
                    <div className="order-item-details">
                      <h4
                        className="order-item-name"
                        onClick={() => onOpenProduct && onOpenProduct(item)}
                        style={{ cursor: onOpenProduct ? 'pointer' : 'default' }}
                      >
                        {item.name}
                      </h4>
                      <div className="order-item-specs">
                        <span className="spec-tag">SIZE: {item.selectedVariant || 'M'}</span>
                        {item.selectedColor && (
                          <span className="spec-tag">COLOR: {item.selectedColor}</span>
                        )}
                        <span className="spec-tag">QTY: {item.quantity || 1}</span>
                        <span className="spec-price-tag">৳ {item.price.toLocaleString()} each</span>
                      </div>
                    </div>
                    <div className="order-item-subtotal">
                      ৳ {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Card Footer */}
              <div className="order-card-footer">
                <div className="order-delivery-meta">
                  <div className="meta-line">
                    <MapPin size={13} className="meta-icon" />
                    <span><strong>Destination:</strong> {order.deliveryAddress || 'Dhaka, Bangladesh'}</span>
                  </div>
                  <div className="meta-line">
                    <Truck size={13} className="meta-icon" />
                    <span>
                      <strong>Courier Tracking:</strong> {order.trackingNumber || 'STEADFAST-ACTIVE'} &bull;{' '}
                      {order.estimatedDelivery}
                    </span>
                  </div>
                  <div className="meta-line">
                    <CreditCard size={13} className="meta-icon" />
                    <span><strong>Payment:</strong> {order.paymentMethod || 'bKash / Card Payment'} (Verified)</span>
                  </div>
                </div>

                <div className="order-actions-group">
                  <button
                    className="order-btn-outline"
                    onClick={() => setTrackingModalOrder(order)}
                    title="Track package with Steadfast Express"
                  >
                    <Truck size={13} style={{ marginRight: '5px' }} />
                    [ TRACK PACKAGE ]
                  </button>
                  <button
                    className="order-btn-solid"
                    onClick={() => setSelectedOrder(order)}
                    title="View and print official invoice"
                  >
                    <FileText size={13} style={{ marginRight: '5px' }} />
                    [ VIEW INVOICE ]
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Digital Tax Invoice Modal */}
      {selectedOrder && (
        <div className="modal-backdrop" onClick={() => setSelectedOrder(null)}>
          <div className="invoice-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setSelectedOrder(null)}
              aria-label="Close invoice"
            >
              <X size={16} />
            </button>

            {/* Printable Invoice Sheet */}
            <div className="printable-invoice-sheet" id="printable-invoice-content">
              {/* Invoice Header */}
              <div className="invoice-header-row">
                <div>
                  <div className="invoice-brand-title">ROGUE &amp; RAW™</div>
                  <div className="invoice-brand-sub">HEAVYWEIGHT APPAREL &bull; DHAKA, BANGLADESH</div>
                  <div className="invoice-legal-text">BIN: 002914820-0101 // TAX INVOICE</div>
                </div>
                <div className="invoice-header-right">
                  <div className="invoice-number-tag">INVOICE #{selectedOrder.id}</div>
                  <div className="invoice-date-line">DATE: {selectedOrder.date}</div>
                  <div className="invoice-paid-badge">
                    <Check size={12} style={{ marginRight: '4px' }} /> PAID IN FULL
                  </div>
                </div>
              </div>

              {/* Invoice Metadata Grid */}
              <div className="invoice-meta-grid">
                <div className="invoice-meta-block">
                  <div className="block-title">BILLED &amp; SHIPPED TO:</div>
                  <div className="block-content">
                    <strong>Rafid Ahmed</strong>
                    <div>{selectedOrder.deliveryAddress || 'Dhaka, Bangladesh'}</div>
                    <div>Phone: +880 1712-345678</div>
                    <div>Email: rafid.ahmed@example.com</div>
                  </div>
                </div>

                <div className="invoice-meta-block">
                  <div className="block-title">DISPATCH &amp; SETTLEMENT:</div>
                  <div className="block-content">
                    <div><strong>Courier:</strong> Steadfast Express</div>
                    <div><strong>Tracking Code:</strong> {selectedOrder.trackingNumber || 'STEADFAST-ACTIVE'}</div>
                    <div><strong>Payment Method:</strong> {selectedOrder.paymentMethod || 'bKash Online'}</div>
                    <div><strong>Dispatch Hub:</strong> Banani Sector 07 Hub</div>
                  </div>
                </div>
              </div>

              {/* Itemized Table */}
              <table className="invoice-items-table">
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left' }}>ITEM DESCRIPTION</th>
                    <th style={{ textAlign: 'center' }}>SIZE</th>
                    <th style={{ textAlign: 'center' }}>QTY</th>
                    <th style={{ textAlign: 'right' }}>UNIT PRICE</th>
                    <th style={{ textAlign: 'right' }}>AMOUNT</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>
                        <div className="invoice-table-item">
                          <img
                            src={item.image || '/images/wr_purple_tee.jpg'}
                            alt={item.name}
                            className="invoice-item-thumb"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = '/images/wr_purple_tee.jpg';
                            }}
                          />
                          <div>
                            <div className="invoice-item-name">{item.name}</div>
                            <div className="invoice-item-sub">
                              {item.selectedColor ? `Color: ${item.selectedColor} • ` : ''}SKU: {item.id || 'RR-ITEM'}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>
                        {item.selectedVariant || 'M'}
                      </td>
                      <td style={{ textAlign: 'center', fontWeight: 700 }}>
                        {item.quantity || 1}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        ৳ {(item.price || 0).toLocaleString()}
                      </td>
                      <td style={{ textAlign: 'right', fontWeight: 800 }}>
                        ৳ {((item.price || 0) * (item.quantity || 1)).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Totals Summary */}
              <div className="invoice-totals-section">
                <div className="invoice-notes-block">
                  <div className="notes-heading">CUSTOMER NOTICE &amp; EXCHANGE POLICY:</div>
                  <p>
                    All Rogue &amp; Raw garments are covered by our 7-Day Hassle-Free Size &amp; Fit Exchange Guarantee. Keep all swing-tags attached.
                  </p>
                  <div className="invoice-barcode-graphic">
                    ||| | ||||| || |||| |||| ||| ||||||| | || |||||
                  </div>
                </div>

                <div className="invoice-summary-box">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>৳ {(selectedOrder.subtotal || selectedOrder.total).toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Standard Express Shipping:</span>
                    <span>৳ {(selectedOrder.shipping ?? 70).toLocaleString()}</span>
                  </div>
                  {selectedOrder.discount > 0 && (
                    <div className="summary-row discount">
                      <span>Voucher Discount:</span>
                      <span>- ৳ {selectedOrder.discount.toLocaleString()}</span>
                    </div>
                  )}
                  <div className="summary-row total-paid">
                    <span>Grand Total:</span>
                    <span>৳ {selectedOrder.total.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="invoice-modal-actions no-print">
              <button className="invoice-print-btn" onClick={handlePrint}>
                <Printer size={14} style={{ marginRight: '6px' }} />
                [ PRINT / SAVE PDF ]
              </button>
              <button className="invoice-close-btn" onClick={() => setSelectedOrder(null)}>
                [ CLOSE INVOICE ]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Live Courier Tracking Modal */}
      {trackingModalOrder && (
        <div className="modal-backdrop" onClick={() => setTrackingModalOrder(null)}>
          <div className="tracking-modal-card" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setTrackingModalOrder(null)}>
              <X size={16} />
            </button>

            <div className="tracking-modal-header">
              <div className="tracking-courier-tag">STEADFAST COURIER API</div>
              <h2 className="tracking-modal-title">LIVE PARCEL TRACKING</h2>
              <div className="tracking-code-pill">
                TRACKING ID: <strong>{trackingModalOrder.trackingNumber || 'STEADFAST-990214'}</strong>
              </div>
            </div>

            <div className="tracking-route-status">
              <div className="route-status-item">
                <span className="route-label">Origin:</span>
                <span className="route-val">Tejgaon Warehouse Hub, Dhaka</span>
              </div>
              <div className="route-status-item">
                <span className="route-label">Destination:</span>
                <span className="route-val">{trackingModalOrder.deliveryAddress}</span>
              </div>
              <div className="route-status-item">
                <span className="route-label">Estimated Delivery:</span>
                <span className="route-val highlight">{trackingModalOrder.estimatedDelivery}</span>
              </div>
            </div>

            <div className="tracking-timeline-list">
              <div className="tracking-timeline-point completed">
                <span className="timeline-marker" />
                <div className="timeline-info">
                  <div className="timeline-title">Parcel Delivered Successfully</div>
                  <div className="timeline-time">Oct 19, 2026 &bull; 02:45 PM &bull; Signed by customer</div>
                </div>
              </div>
              <div className="tracking-timeline-point completed">
                <span className="timeline-marker" />
                <div className="timeline-info">
                  <div className="timeline-title">Out for Delivery with Rider</div>
                  <div className="timeline-time">Oct 19, 2026 &bull; 10:15 AM &bull; Banani Hub Rider #41</div>
                </div>
              </div>
              <div className="tracking-timeline-point completed">
                <span className="timeline-marker" />
                <div className="timeline-info">
                  <div className="timeline-title">Arrived at Dhaka Sorting Facility</div>
                  <div className="timeline-time">Oct 18, 2026 &bull; 08:30 PM</div>
                </div>
              </div>
              <div className="tracking-timeline-point completed">
                <span className="timeline-marker" />
                <div className="timeline-info">
                  <div className="timeline-title">Shipment Handed Over by Rogue &amp; Raw</div>
                  <div className="timeline-time">Oct 17, 2026 &bull; 04:20 PM</div>
                </div>
              </div>
            </div>

            <button
              className="btn-checkout-block"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setTrackingModalOrder(null)}
            >
              DONE
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
