import { categoryPath } from '../storefront';
import { imageUrl } from '../urls';
import ShopLink from './ShopLink';

export default function DenimEdit({ onNavigate }) {
  return (
    <section className="denim-edit" aria-labelledby="denim-edit-title">
      <img className="denim-edit-image" src={imageUrl('/images/denim-editorial.jpg')} alt="Relaxed washed jeans worn on concrete steps" loading="lazy" decoding="async" />
      <div className="denim-edit-copy">
        <h2 id="denim-edit-title">The Denim Edit</h2>
        <p>Roomy cuts and textured washes, from stone blue to raw indigo.</p>
        <ShopLink className="button button-dark" href={categoryPath('JEANS')} onNavigate={onNavigate}>Shop denim</ShopLink>
      </div>
    </section>
  );
}
