import { useState } from 'react';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import { STUDIO_PIECES } from '../data/studio';
import { formatPrice, getProduct, productName, productPath } from '../storefront';
import GarmentViewer from './GarmentViewer';
import { ProductImage } from './Media';
import ProductInspector from './ProductInspector';
import ShopLink from './ShopLink';

const pieces = STUDIO_PIECES.map((piece) => ({ ...piece, product: getProduct(piece.id) }));

export default function GarmentStudio({ onNavigate }) {
  const [selected, setSelected] = useState(0);
  const [view, setView] = useState(null);
  const [inspection, setInspection] = useState(null);
  const product = pieces[selected].product;

  return (
    <section className="garment-studio" id="garment-studio" aria-labelledby="studio-title" tabIndex={-1}>
      <div className="container studio-layout">
        <div className="studio-content">
          <h2 id="studio-title">The Garment <span>Studio</span></h2>
          <p className="studio-intro">Drag to turn the garment, or zoom in for a closer look at the fabric and finish.</p>
          <div className="studio-selection" role="group" aria-label="Choose a garment">
            {pieces.map(({ id, label, product: item }, index) => (
              <button type="button" className="studio-piece" key={id}
                aria-pressed={index === selected} onClick={() => setSelected(index)}>
                <ProductImage src={item.image} alt="" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="studio-viewer-panel">
          <GarmentViewer key={product.id} product={product} initialMode="angles" loading="lazy"
            onViewChange={setView} paused={Boolean(inspection)} />
          <div className="studio-product">
            <div>
              <h3>{productName(product)}</h3>
              <p>{formatPrice(product.price)}</p>
            </div>
            <button type="button" className="icon-button studio-expand" aria-haspopup="dialog"
              aria-label={'Expand viewer for ' + productName(product)} onClick={() => setInspection(view || { mode: 'angles' })}>
              <Maximize2 size={19} />
            </button>
            <ShopLink className="button studio-shop" href={productPath(product.id)} onNavigate={onNavigate}>
              Shop this piece <ArrowUpRight size={17} />
            </ShopLink>
          </div>
        </div>
      </div>
      {inspection && (
        <ProductInspector product={product} initialMode={inspection.mode} initialAngle={inspection.angleIndex}
          initialPhoto={inspection.photoIndex} onClose={() => setInspection(null)} onNavigate={onNavigate} />
      )}
    </section>
  );
}
