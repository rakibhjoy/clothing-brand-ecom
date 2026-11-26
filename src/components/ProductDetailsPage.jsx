import { useState } from 'react';
import { Check, Heart, Link2, ScanSearch } from 'lucide-react';
import {
  categoryPath, formatPrice, FREE_SHIPPING_MINIMUM, getProductPhotos, normalizeCategory,
  photoKey, productCategory, productCode, productSku, variantProductName
} from '../storefront';
import ProductCard from './ProductCard';
import ProductInspector from './ProductInspector';
import { ProductImage } from './Media';
import PhotoControls from './PhotoControls';
import ShopDialog from './ShopDialog';
import ShopLink from './ShopLink';

const teeMeasurements = [
  ['XS', 42, 27, 8.5], ['S', 44, 28, 9], ['M', 46, 29, 9.5],
  ['L', 48, 30, 10], ['XL', 50, 31, 10.5], ['2XL', 52, 32, 11]
];

export default function ProductDetailsPage({ product, allProducts, onNavigate, onAddToCart, onBuyNow, savedIds, onToggleSaved }) {
  const [color, setColor] = useState(product.colors[0]?.name || product.colorName);
  const [size, setSize] = useState(product.sizes.length === 1 ? product.sizes[0] : '');
  const [quantity, setQuantity] = useState(1);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [inspecting, setInspecting] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [shareMessage, setShareMessage] = useState('');
  const name = variantProductName(product);
  const category = productCategory(product);
  const collectionUrl = categoryPath(normalizeCategory(category));
  const sku = productSku(product, color, size);
  const deliveryEstimates = product.shippingInfo
    .filter((entry) => /\b(?:days?|hours?)\b/i.test(entry))
    .map((entry) => entry.replace(/\s+\([^)]*\)$/, ''));
  const images = getProductPhotos(product);
  const saved = savedIds.includes(product.id);
  const measurements = product.category === 'T-Shirts' && !product.id.startsWith('wr-knit-')
    ? teeMeasurements.filter(([value]) => product.sizes.includes(value))
    : [];
  const related = allProducts.filter((item) => item.id !== product.id && item.category === product.category).slice(0, 4);

  function showPhoto(index) {
    setPhotoIndex(index);
    const key = photoKey(images[index]);
    const matchingColor = product.colors.find((entry) => entry.thumb && photoKey(entry.thumb) === key);
    if (matchingColor) setColor(matchingColor.name);
  }

  function selectColor(entry) {
    setColor(entry.name);
    const index = images.findIndex((image) => photoKey(image) === photoKey(entry.thumb));
    if (index !== -1) setPhotoIndex(index);
  }

  function add(action) {
    if (!size) {
      setSizeError(true);
      document.querySelector('#product-sizes input')?.focus();
      return;
    }
    if (action === 'buy') onBuyNow(color, size, quantity);
    else onAddToCart(product, color, size, quantity);
  }

  async function share() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareMessage('Link copied.');
    } catch {
      setShareMessage('Copy the address from your browser to share this product.');
    }
  }

  const cardActions = { onNavigate, savedIds, onToggleSaved };

  return (
    <section className="product-page" aria-labelledby="product-title">
      <nav className="breadcrumbs product-breadcrumbs" aria-label="Breadcrumb">
        <ShopLink href="/" onNavigate={onNavigate}>Home</ShopLink><span aria-hidden="true">/</span>
        <ShopLink href={collectionUrl} onNavigate={onNavigate}>{category}</ShopLink>
        <span aria-hidden="true">/</span><span aria-current="page">{name}</span>
      </nav>
      <div className="product-layout">
        <div className="product-gallery">
          <div className="gallery-main">
            <button type="button" className="gallery-inspect" aria-haspopup="dialog" aria-label={'Inspect ' + name}
              onClick={() => setInspecting(true)}>
              <ProductImage src={images[photoIndex]} alt="" loading="eager" />
              <span className="gallery-inspect-label"><ScanSearch size={18} /> Inspect garment</span>
            </button>
            <PhotoControls total={images.length} index={photoIndex} onChange={showPhoto} label={name + " photos"} showCount />
          </div>
          {product.imageIsMockup && <p className="product-photo-caption">Product mockup</p>}
          {images.length > 1 && (
            <div className="gallery-thumbs" role="group" aria-label="Product photos">
              {images.map((image, index) => (
                <button type="button" key={image} aria-label={'View image ' + (index + 1)} aria-pressed={photoIndex === index} onClick={() => showPhoto(index)}>
                  <ProductImage src={image} alt="" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="product-info">
          <header className="product-summary">
            <ShopLink className="product-category-link" href={collectionUrl} onNavigate={onNavigate}>{category}</ShopLink>
            <h1 id="product-title">{name}</h1>
            <p className="price-line product-price">
              <span>{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && <del>{formatPrice(product.originalPrice)}</del>}
            </p>
            <p className="product-description">{product.description}</p>
          </header>
          <dl className="product-identifiers">
            <div><dt>Product code</dt><dd className="product-code">{productCode(product)}</dd></div>
            <div><dt>SKU</dt><dd aria-live="polite" className={sku ? "product-code" : "muted"}>{sku || "Select a size"}</dd></div>
          </dl>
          <div className="product-options">
            <fieldset className="variant-field">
              <legend>Color <span>{color}</span></legend>
              <div className="swatches">
                {product.colors.map((entry) => (
                  <label key={entry.name} className="swatch" title={entry.name}>
                    <input className="sr-only" type="radio" name="product-color" checked={color === entry.name} onChange={() => selectColor(entry)} aria-label={entry.name} />
                    <span style={{ backgroundColor: entry.hex }} />
                  </label>
                ))}
              </div>
            </fieldset>
            <div className="product-size-choice">
              <button type="button" className="text-link size-guide-link" onClick={() => setGuideOpen(true)}>Size guide</button>
              <fieldset className="variant-field size-field" id="product-sizes" aria-describedby={sizeError ? "size-error" : undefined}>
                <legend>Size</legend>
                <div className="size-options">
                  {product.sizes.map((value) => (
                    <label key={value} className="size-option">
                      <input className="sr-only" type="radio" name="product-size" checked={size === value} onChange={() => { setSize(value); setSizeError(false); }} />
                      <span>{value}</span>
                    </label>
                  ))}
                </div>
                {sizeError && <p id="size-error" className="form-error" role="alert">Choose a size to continue.</p>}
              </fieldset>
            </div>
          </div>
          <div className="product-purchase">
            <label className="quantity-field">Quantity
              <select value={quantity} onChange={(event) => setQuantity(Number(event.target.value))}>
                {Array.from({ length: 10 }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}
              </select>
            </label>
            <button type="button" className="button button-dark" onClick={() => add('cart')}>Add to bag</button>
            <button type="button" className="icon-button button-outline product-save" aria-pressed={saved} aria-label={saved ? "Remove from saved items" : "Save product"} onClick={() => onToggleSaved(product)}>
              <Heart size={20} fill={saved ? "currentColor" : "none"} />
            </button>
            <button type="button" className="button button-outline buy-now" onClick={() => add('buy')}>Buy now</button>
          </div>
          <div className="product-disclosures">
            <details open><summary>Product details</summary><ul>{product.details.map((detail) => <li key={detail}>{detail}</li>)}</ul></details>
            {product.modelFit && <details><summary>Fit and sizing</summary><p>{product.modelFit}</p></details>}
            <details><summary>Delivery</summary>
              <p>Dhaka {formatPrice(70)} &middot; Outside Dhaka {formatPrice(130)}. Free delivery on orders of {formatPrice(FREE_SHIPPING_MINIMUM)} or more.</p>
              {deliveryEstimates.length > 0 && <ul>{deliveryEstimates.map((estimate) => <li key={estimate}>{estimate}</li>)}</ul>}
            </details>
          </div>
          <div className="product-tools">
            <button className="share-button text-link" type="button" onClick={share}>{shareMessage === "Link copied." ? <Check size={16} /> : <Link2 size={16} />} Share product</button>
            <span className="share-feedback" role="status">{shareMessage}</span>
          </div>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related-section" aria-labelledby="related-heading">
          <div className="section-heading"><h2 id="related-heading">You may also like</h2></div>
          <div className="product-grid">{related.map((item) => <ProductCard key={item.id} product={item} {...cardActions} />)}</div>
        </section>
      )}
      {inspecting && <ProductInspector product={product} initialPhoto={photoIndex} onClose={() => setInspecting(false)} />}
      {guideOpen && (
        <ShopDialog title="Size guide" onClose={() => setGuideOpen(false)}>
          <p>{product.modelFit}</p>
          {measurements.length > 0 && (
            <table className="data-table">
              <thead><tr><th scope="col">Size</th><th scope="col">Chest (in)</th><th scope="col">Length (in)</th><th scope="col">Sleeve (in)</th></tr></thead>
              <tbody>{measurements.map(([variant, chest, length, sleeve]) => <tr key={variant}><th scope="row">{variant}</th><td>{chest}</td><td>{length}</td><td>{sleeve}</td></tr>)}</tbody>
            </table>
          )}
          {measurements.length === 0 && <p>Available sizes: {product.sizes.join(', ')}.</p>}
        </ShopDialog>
      )}
    </section>
  );
}
