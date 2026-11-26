import { ArrowUpRight } from 'lucide-react';
import { productName, productPath } from '../storefront';
import GarmentViewer from './GarmentViewer';
import ShopDialog from './ShopDialog';
import ShopLink from './ShopLink';

export default function ProductInspector({ product, initialPhoto, initialMode, initialAngle, onClose, onNavigate }) {
  return (
    <ShopDialog title={productName(product)} onClose={onClose} className="product-inspector">
      <GarmentViewer product={product} initialPhoto={initialPhoto} initialMode={initialMode} initialAngle={initialAngle} />
      {onNavigate && (
        <ShopLink className="button button-dark inspector-shop" href={productPath(product.id)} onNavigate={(path) => {
          onClose();
          onNavigate(path);
        }}>View product <ArrowUpRight size={17} /></ShopLink>
      )}
    </ShopDialog>
  );
}
