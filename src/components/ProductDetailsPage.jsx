import React, { useState, useEffect, useMemo } from 'react';
import {
  Heart,
  Package,
  Truck,
  Plus,
  Minus,
  ShieldCheck,
  RotateCcw,
  Check,
  Star,
  Sparkles,
  ArrowRight,
  Share2,
  ShoppingBag,
  Zap
} from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductDetailsPage({
  product,
  allProducts,
  onOpenProduct,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  onBack,
  onSelectCategory
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0]?.name || product?.colorName || 'Dark Purple'
  );
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || 'M');
  const [quantity, setQuantity] = useState(1);
  const [detailsOpen, setDetailsOpen] = useState(true);
  const [shippingOpen, setShippingOpen] = useState(false);
  const [fitGuideOpen, setFitGuideOpen] = useState(false);
  const [sizeModalOpen, setSizeModalOpen] = useState(false);
  const [youMayLikeTab, setYouMayLikeTab] = useState('Recommended');
  const [addedRecently, setAddedRecently] = useState(false);
  const [customPhoto, setCustomPhoto] = useState(null);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setSelectedColor(product.colors?.[0]?.name || product.colorName || 'Dark Purple');
      setSelectedSize(product.sizes?.[0] || 'M');
      setQuantity(1);
      setCustomPhoto(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [product]);

  if (!product) return null;

  // Build comprehensive gallery from product data
  const allGalleryPhotos = useMemo(() => {
    const list = [];
    if (product.image) list.push(product.image);
    if (Array.isArray(product.gallery)) {
      product.gallery.forEach((img) => {
        if (img && !list.includes(img)) list.push(img);
      });
    }
    if (Array.isArray(product.colors)) {
      product.colors.forEach((c) => {
        if (c.thumb && !list.includes(c.thumb)) list.push(c.thumb);
      });
    }
    return list.length > 0 ? list : [product.image];
  }, [product]);

  const displayedPhoto =
    customPhoto || allGalleryPhotos[activeImageIndex % allGalleryPhotos.length] || product.image;

  const handlePrevPhoto = (e) => {
    if (e) e.stopPropagation();
    setCustomPhoto(null);
    setActiveImageIndex((prev) => (prev - 1 + allGalleryPhotos.length) % allGalleryPhotos.length);
  };

  const handleNextPhoto = (e) => {
    if (e) e.stopPropagation();
    setCustomPhoto(null);
    setActiveImageIndex((prev) => (prev + 1) % allGalleryPhotos.length);
  };

  const handleThumbnailClick = (idx) => {
    setActiveImageIndex(idx);
    setCustomPhoto(null);
  };

  const handleColorSelect = (colorObj) => {
    setSelectedColor(colorObj.name);
    if (colorObj.thumb) {
      const foundIdx = allGalleryPhotos.indexOf(colorObj.thumb);
      if (foundIdx !== -1) {
        setActiveImageIndex(foundIdx);
        setCustomPhoto(null);
      } else {
        setCustomPhoto(colorObj.thumb);
      }
    }
    // Also see if a separate product exists for this colorway
    const matchingProduct = allProducts.find(
      (p) => p.id !== product.id && p.colorName?.toLowerCase() === colorObj.name.toLowerCase()
    );
    if (matchingProduct) {
      onOpenProduct(matchingProduct);
    }
  };

  const handleDecQty = () => {
    setQuantity((q) => (q > 1 ? q - 1 : 1));
  };

  const handleIncQty = () => {
    setQuantity((q) => (q < 10 ? q + 1 : 10));
  };

  const handleAddToCart = () => {
    onAddToCart(
      {
        ...product,
        selectedColor,
        selectedVariant: selectedSize,
        image: displayedPhoto,
        quantity
      },
      quantity
    );
    setAddedRecently(true);
    setTimeout(() => setAddedRecently(false), 1600);
  };

  const handleBuyNow = () => {
    const itemToBuy = {
      ...product,
      selectedColor,
      selectedVariant: selectedSize,
      image: displayedPhoto,
      quantity
    };
    if (onBuyNow) {
      onBuyNow(itemToBuy, quantity);
    } else {
      onAddToCart(itemToBuy, quantity);
    }
  };

  const handleShare = () => {
    try {
      navigator.clipboard?.writeText(window.location.href);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    } catch {
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2000);
    }
  };

  const availableSizes =
    product.sizes && product.sizes.length > 0
      ? product.sizes
      : ['XS', 'S', 'M', 'L', 'XL', '2XL'];

  const isSaved = typeof isWishlisted === 'function' ? isWishlisted(product.id) : false;

  // Filter recommendations (4 products per row)
  const youMayLikeProducts = useMemo(() => {
    const filtered = allProducts.filter((p) => {
      if (p.id === product.id) return false;
      if (youMayLikeTab === 'Recommended') return p.isRecommended || p.category === product.category;
      if (youMayLikeTab === 'Best Sellers') return p.isBestSeller;
      if (youMayLikeTab === 'New Arrivals') return p.isNewArrival;
      return true;
    });

    if (filtered.length >= 4) {
      return filtered.slice(0, 4);
    }

    const remaining = allProducts.filter(
      (p) => p.id !== product.id && !filtered.some((fp) => fp.id === p.id)
    );
    return [...filtered, ...remaining].slice(0, 4);
  }, [allProducts, product.id, product.category, youMayLikeTab]);

  const discountSavings =
    product.originalPrice && product.originalPrice > product.price
      ? product.originalPrice - product.price
      : 0;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((discountSavings / product.originalPrice) * 100)
      : 0;

  return (
    <div className="pdp-fullpage-wrapper" id="pdp-view-container">
      {/* Top Editorial Breadcrumbs Bar */}
      <div className="pdp-breadcrumbs-bar">
        <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          <div className="breadcrumbs-inner">
            <button className="breadcrumb-nav-btn" onClick={onBack}>
              Home
            </button>
            <span className="breadcrumb-slash">/</span>
            <button
              className="breadcrumb-nav-btn"
              onClick={() => onSelectCategory && onSelectCategory(product.category?.toUpperCase())}
            >
              {product.category?.toUpperCase() || 'Catalog'}
            </button>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-current">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '1.5rem 1rem 5rem' }}>
        {/* Main 2-Column Split */}
        <div className="pdp-main-grid">
          {/* LEFT COLUMN: Clean Edge-to-Edge Product Photo Box & Thumbnails */}
          <div className="pdp-gallery-column">
            {/* Primary Image Box (Zero Padding/Margins, 1:1 Prominent Frame) */}
            <div className="pdp-photo-wrapper">
              {/* Category / Collection Floating Badge */}
              <div className="pdp-floating-badge-group">
                {product.badge && (
                  <span className="pdp-tag-badge dark">
                    <Sparkles size={11} style={{ marginRight: '4px' }} />
                    {product.badge}
                  </span>
                )}
                {product.isNewArrival && !product.badge && (
                  <span className="pdp-tag-badge dark">NEW IN</span>
                )}
                {product.isBestSeller && !product.badge && (
                  <span className="pdp-tag-badge orange">BEST SELLER</span>
                )}
                <span className="pdp-tag-badge gsm">HEAVYWEIGHT CUT</span>
              </div>

              {/* Previous Image Arrow */}
              {allGalleryPhotos.length > 1 && (
                <button
                  type="button"
                  className="pdp-arrow-btn left"
                  onClick={handlePrevPhoto}
                  aria-label="Previous photo"
                  title="Previous image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-left"
                    aria-hidden="true"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
              )}

              {/* Main Prominent Product Image (Zero padding) */}
              <img
                src={displayedPhoto}
                alt={product.name}
                key={displayedPhoto}
                className="pdp-featured-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/wr_purple_tee.jpg';
                }}
              />

              {/* Next Image Arrow */}
              {allGalleryPhotos.length > 1 && (
                <button
                  type="button"
                  className="pdp-arrow-btn right"
                  onClick={handleNextPhoto}
                  aria-label="Next photo"
                  title="Next image"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevron-right"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              )}

              {/* Photo Counter Pill */}
              <div className="pdp-photo-counter">
                {activeImageIndex + 1} / {allGalleryPhotos.length}
              </div>

              {/* Quick Wishlist Floating Button */}
              <button
                type="button"
                className={`pdp-floating-wishlist ${isSaved ? 'active' : ''}`}
                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                title={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={isSaved ? '#e11d48' : 'none'} stroke={isSaved ? '#e11d48' : '#000'} />
              </button>
            </div>

            {/* Product Thumbnails Strip Below Main Image */}
            {allGalleryPhotos.length > 1 && (
              <div className="pdp-thumbnails-strip" aria-label="Product image gallery thumbnails">
                {allGalleryPhotos.map((thumbSrc, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb-item ${
                      idx === (activeImageIndex % allGalleryPhotos.length) && !customPhoto ? 'active' : ''
                    } ${customPhoto === thumbSrc ? 'active' : ''}`}
                    onClick={() => handleThumbnailClick(idx)}
                    aria-label={`View photo ${idx + 1}`}
                  >
                    <img
                      src={thumbSrc}
                      alt={`${product.name} view ${idx + 1}`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '/images/wr_purple_tee.jpg';
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Product Information & Purchase Operations Panel */}
          <div className="pdp-details-column">
            {/* Category & Rating Row */}
            <div className="pdp-meta-header-row">
              <span className="pdp-category-tag">{product.category?.toUpperCase() || 'STREETWEAR'}</span>
              <div className="pdp-rating-pill">
                <Star size={13} fill="#ffb703" stroke="#ffb703" />
                <span className="pdp-rating-val">{product.rating || 4.9}</span>
                <span className="pdp-reviews-count">({product.reviewsCount || 120} Reviews)</span>
              </div>
            </div>

            {/* Product Name Title */}
            <h1 className="pdp-product-name">{product.name}</h1>

            {/* Price Row with Original Price Strikethrough & Savings Tag */}
            <div className="pdp-price-container">
              <div className="pdp-current-price">
                <span className="currency-symbol">৳</span>
                <span>{product.price.toLocaleString()}</span>
              </div>
              {product.originalPrice && product.originalPrice > product.price && (
                <>
                  <div className="pdp-original-price">৳ {product.originalPrice.toLocaleString()}</div>
                  <div className="pdp-discount-tag">
                    SAVE ৳ {discountSavings.toLocaleString()} ({discountPercent}% OFF)
                  </div>
                </>
              )}
            </div>

            {/* In-Stock & Dispatch Status */}
            <div className="pdp-stock-banner">
              <span className="stock-dot" />
              <span>IN STOCK &bull; DISPATCHES WITHIN 24 HOURS ACROSS BANGLADESH</span>
            </div>

            {/* Color Swatch Picker */}
            {product.colors && product.colors.length > 0 && (
              <div className="pdp-section-block">
                <div className="pdp-block-header">
                  <span className="block-title">COLORWAY:</span>
                  <span className="block-selection-text">{selectedColor}</span>
                  <span className="color-count-sub">({product.colors.length} Available)</span>
                </div>

                <div className="pdp-swatches-row">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`pdp-swatch-thumb-btn ${selectedColor === c.name ? 'active' : ''}`}
                      onClick={() => handleColorSelect(c)}
                      title={c.name}
                      aria-label={`Select color ${c.name}`}
                    >
                      <img src={c.thumb || product.image} alt={c.name} />
                      <span className="swatch-color-name-tooltip">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector Grid */}
            <div className="pdp-section-block">
              <div className="pdp-block-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="block-title">SIZE:</span>
                  <span className="block-selection-text">{selectedSize}</span>
                </div>
                <button
                  type="button"
                  className="pdp-size-guide-btn"
                  onClick={() => setSizeModalOpen(true)}
                  id="btn-pdp-find-size"
                >
                  Size &amp; Fit Guide
                </button>
              </div>

              <div className="pdp-sizes-cells-grid">
                {availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`pdp-size-cell-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                    id={`size-btn-${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Model Fit Brief Guidance */}
            <div className="pdp-model-fit-box">
              <strong>FIT NOTE:</strong> {product.modelFit || "Male model is 6' wearing size L, Female model is 5'6\" wearing size S. Drop shoulder boxy drape."}
            </div>

            {/* Quantity Selector & Action Buttons */}
            <div className="pdp-purchase-actions-container">
              {/* Sleek inline quantity stepper matching button height */}
              <div className="pdp-qty-stepper" aria-label="Product quantity stepper">
                <button
                  type="button"
                  className="pdp-qty-btn minus"
                  onClick={handleDecQty}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  title="Decrease quantity"
                >
                  <Minus size={14} strokeWidth={2.4} />
                </button>
                <div className="pdp-qty-display">
                  <span className="pdp-qty-number">{quantity}</span>
                </div>
                <button
                  type="button"
                  className="pdp-qty-btn plus"
                  onClick={handleIncQty}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  title="Increase quantity"
                >
                  <Plus size={14} strokeWidth={2.4} />
                </button>
              </div>

              {/* Add To Cart Button */}
              <button
                type="button"
                className={`btn-pdp-add-to-cart ${addedRecently ? 'added' : ''}`}
                onClick={handleAddToCart}
                id="btn-pdp-add-cart"
              >
                {addedRecently ? (
                  <>
                    <Check size={18} strokeWidth={2.5} className="btn-icon" />
                    <span>ADDED TO BAG</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag size={18} strokeWidth={2} className="btn-icon" />
                    <span>ADD TO BAG</span>
                  </>
                )}
              </button>

              {/* Buy Now Button */}
              <button
                type="button"
                className="btn-pdp-buy-now"
                onClick={handleBuyNow}
                id="btn-pdp-buy-now"
              >
                <Zap size={16} fill="#ffb703" stroke="#ffb703" className="btn-icon zap-icon" />
                <span>BUY NOW</span>
                <ArrowRight size={16} strokeWidth={2.2} className="btn-buy-arrow" />
              </button>
            </div>

            {/* Trust & Guarantee Badges */}
            <div className="pdp-trust-badges-grid">
              <div className="trust-badge-item">
                <ShieldCheck size={16} className="trust-icon" />
                <div className="trust-text">
                  <strong>Heavyweight Cotton</strong>
                  <span>Pre-shrunk 300+ GSM compact jersey</span>
                </div>
              </div>
              <div className="trust-badge-item">
                <Truck size={16} className="trust-icon" />
                <div className="trust-text">
                  <strong>Express Shipping</strong>
                  <span>Inside Dhaka: 24-48h (৳ 70)</span>
                </div>
              </div>
              <div className="trust-badge-item">
                <RotateCcw size={16} className="trust-icon" />
                <div className="trust-text">
                  <strong>7-Day Easy Exchange</strong>
                  <span>Hassle-free size replacement portal</span>
                </div>
              </div>
            </div>

            {/* Accordions */}
            <div className="pdp-accordions-stack">
              {/* Accordion 1: Product Details */}
              <div className="pdp-accordion-item">
                <button
                  type="button"
                  className="pdp-accordion-header"
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  aria-expanded={detailsOpen}
                >
                  <div className="accordion-title-left">
                    <Package size={15} />
                    <span>Garment Details &amp; Fabric Specs</span>
                  </div>
                  <span>{detailsOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                </button>

                {detailsOpen && (
                  <div className="pdp-accordion-content">
                    <ul className="details-bullets-list">
                      {product.details ? (
                        product.details.map((d, idx) => <li key={idx}>{d}</li>)
                      ) : (
                        <>
                          <li>300 GSM Heavyweight Combed Compact Cotton</li>
                          <li>Signature R&R Sun-Faded Stone Enzyme Wash</li>
                          <li>Drop shoulder boxy silhouette with thick ribbed collar</li>
                          <li>Twin-needle reinforced stitching on hem and cuffs</li>
                          <li>Custom embroidery logo on chest and tonal typography on nape</li>
                        </>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 2: Shipping & Delivery */}
              <div className="pdp-accordion-item">
                <button
                  type="button"
                  className="pdp-accordion-header"
                  onClick={() => setShippingOpen(!shippingOpen)}
                  aria-expanded={shippingOpen}
                >
                  <div className="accordion-title-left">
                    <Truck size={15} />
                    <span>Shipping, Returns &amp; Delivery Hubs</span>
                  </div>
                  <span>{shippingOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                </button>

                {shippingOpen && (
                  <div className="pdp-accordion-content">
                    <ul className="details-bullets-list">
                      <li><strong>Inside Dhaka City:</strong> Delivered in 24-48 hours via Steadfast Express (৳ 70).</li>
                      <li><strong>Outside Dhaka / All Districts:</strong> Delivered in 2-4 business days (৳ 130).</li>
                      <li><strong>Complimentary Shipping:</strong> Free express shipping on all orders over ৳ 3,000.</li>
                      <li><strong>Cash On Delivery:</strong> Available across all 64 districts in Bangladesh with verification.</li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Accordion 3: Fit & Care Guide */}
              <div className="pdp-accordion-item">
                <button
                  type="button"
                  className="pdp-accordion-header"
                  onClick={() => setFitGuideOpen(!fitGuideOpen)}
                  aria-expanded={fitGuideOpen}
                >
                  <div className="accordion-title-left">
                    <Sparkles size={15} />
                    <span>Care Instructions &amp; Preservation</span>
                  </div>
                  <span>{fitGuideOpen ? <Minus size={14} /> : <Plus size={14} />}</span>
                </button>

                {fitGuideOpen && (
                  <div className="pdp-accordion-content">
                    <ul className="details-bullets-list">
                      <li>Machine wash cold inside out with like dark colors.</li>
                      <li>Do not tumble dry; dry flat in shade to preserve stone enzyme wash texture.</li>
                      <li>Iron inside out on medium heat; avoid direct contact with graphic prints.</li>
                      <li>Do not bleach or dry clean.</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Share link button */}
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '0.75rem' }}>
              <button
                type="button"
                className="pdp-share-btn"
                onClick={handleShare}
                title="Copy product link"
              >
                <Share2 size={13} style={{ marginRight: '6px' }} />
                <span>{copiedShare ? 'LINK COPIED TO CLIPBOARD ✓' : 'SHARE PIECE'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: Recommendations */}
        <div className="you-may-also-like-section">
          <div className="you-may-like-header-row">
            <div className="you-may-like-tabs">
              {['Recommended', 'Best Sellers', 'New Arrivals'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`you-may-like-tab ${youMayLikeTab === tab ? 'active' : ''}`}
                  onClick={() => setYouMayLikeTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* 4-Column Grid */}
          <div className="catalog-products-grid">
            {youMayLikeProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isWishlisted={typeof isWishlisted === 'function' ? isWishlisted(p.id) : false}
                onToggleWishlist={onToggleWishlist}
                onOpenProduct={onOpenProduct}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Size Guide Modal */}
      {sizeModalOpen && (
        <div className="modal-backdrop" onClick={() => setSizeModalOpen(false)}>
          <div className="size-guide-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="size-modal-title">ROGUE &amp; RAW™ SIZE &amp; MEASUREMENT MATRIX</h3>
              <button
                type="button"
                className="modal-close-icon-btn"
                onClick={() => setSizeModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <p className="size-modal-sub">
              Our streetwear garments are designed with an architectural oversized, dropped shoulder boxy drape. Order your normal size for the intended boxy silhouette.
            </p>

            <table className="size-guide-table">
              <thead>
                <tr>
                  <th>SIZE</th>
                  <th>CHEST (IN)</th>
                  <th>LENGTH (IN)</th>
                  <th>SLEEVE (IN)</th>
                  <th>RECOMMENDED HEIGHT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>XS</strong></td>
                  <td>42"</td>
                  <td>27"</td>
                  <td>8.5"</td>
                  <td>5'4" - 5'6" (50-60 kg)</td>
                </tr>
                <tr>
                  <td><strong>S</strong></td>
                  <td>44"</td>
                  <td>28"</td>
                  <td>9.0"</td>
                  <td>5'6" - 5'8" (60-68 kg)</td>
                </tr>
                <tr className="recommended-row">
                  <td><strong>M (Standard)</strong></td>
                  <td>46"</td>
                  <td>29"</td>
                  <td>9.5"</td>
                  <td>5'8" - 5'10" (68-76 kg)</td>
                </tr>
                <tr>
                  <td><strong>L</strong></td>
                  <td>48"</td>
                  <td>30"</td>
                  <td>10.0"</td>
                  <td>5'10" - 6'1" (76-85 kg)</td>
                </tr>
                <tr>
                  <td><strong>XL</strong></td>
                  <td>50"</td>
                  <td>31"</td>
                  <td>10.5"</td>
                  <td>6'0" - 6'3" (85-95 kg)</td>
                </tr>
                <tr>
                  <td><strong>2XL</strong></td>
                  <td>52"</td>
                  <td>32"</td>
                  <td>11.0"</td>
                  <td>6'2"+ (95+ kg)</td>
                </tr>
              </tbody>
            </table>

            <button
              type="button"
              className="btn-checkout-block"
              style={{ marginTop: '1.5rem' }}
              onClick={() => setSizeModalOpen(false)}
            >
              GOT IT — RETURN TO PRODUCT
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
