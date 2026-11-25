import { useState } from 'react';
import { Heart } from 'lucide-react';
import { formatPrice, getProductPhotos, productCategory, productCode, productName, productPath } from '../storefront';
import { ProductImage } from './Media';
import PhotoControls from './PhotoControls';
import ShopLink from './ShopLink';

export default function ProductCard({ product, onNavigate, savedIds, onToggleSaved }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const photos = getProductPhotos(product);
  const saved = savedIds.includes(product.id);
  const name = productName(product);
  const colorCount = product.colors.length;

  return (
    <article className="product-card">
      <ShopLink className="product-card-link" href={productPath(product.id)} onNavigate={onNavigate}>
        <div className="product-card-media">
          <ProductImage src={photos[photoIndex]} alt="" />
        </div>
        <div className="product-card-details">
          <div className="product-card-heading">
            <h3>{name}</h3>
            <p className="product-card-prices">
              <span>{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && <del>{formatPrice(product.originalPrice)}</del>}
            </p>
          </div>
          <div className="product-card-meta">
            <span>{productCategory(product)}</span>
            <span className="product-code"><span className="sr-only">Product code </span>{productCode(product)}</span>
          </div>
          <p className="product-card-color">{colorCount > 1 ? colorCount + ' colors' : product.colorName}</p>
          {product.imageIsMockup && <p className="product-card-disclosure">Product mockup</p>}
        </div>
      </ShopLink>
      <PhotoControls total={photos.length} index={photoIndex} onChange={setPhotoIndex} label={name + " photos"} />
      <button type="button" className="icon-button card-save" aria-pressed={saved}
        aria-label={(saved ? 'Remove ' : 'Save ') + name} onClick={() => onToggleSaved(product)}>
        <Heart size={20} fill={saved ? 'currentColor' : 'none'} />
      </button>
    </article>
  );
}
