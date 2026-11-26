import { ArrowDown } from 'lucide-react';
import ShopLink from './ShopLink';
import { imageUrl } from '../urls';

function jumpToStudio(event) {
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const studio = document.getElementById('garment-studio');
  if (!studio) return;

  event.preventDefault();
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  studio.focus({ preventScroll: true });
  studio.scrollIntoView({ behavior: reduceMotion ? 'instant' : 'smooth' });
}

export default function Hero({ onNavigate }) {
  return (
    <section id="home-banner" className="home-hero" aria-labelledby="hero-title">
      <picture className="hero-visual">
        <source media="(max-width: 49rem) and (orientation: portrait)" srcSet={imageUrl('/images/winter-campaign-mobile.jpg')} />
        <img src={imageUrl('/images/winter-campaign.jpg')} alt="Model wearing an oversized charcoal T-shirt and relaxed black denim" width="1536" height="1024" />
      </picture>
      <div className="container hero-content">
        <h1 id="hero-title">Built to <br />live in.</h1>
        <p className="hero-description">Heavyweight tees, relaxed denim and easy layers for every day.</p>
        <div className="hero-actions">
          <ShopLink className="button button-light hero-action" href="/catalog" onNavigate={onNavigate}>Shop the collection</ShopLink>
          <a className="button hero-studio-link" href="#garment-studio" onClick={jumpToStudio}>Explore the studio <ArrowDown size={17} /></a>
        </div>
      </div>
    </section>
  );
}
