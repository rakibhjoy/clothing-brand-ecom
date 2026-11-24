import ShopLink from './ShopLink';

export default function Hero({ onNavigate }) {
  return (
    <section id="home-banner" className="home-hero" aria-labelledby="hero-title">
      <picture className="hero-visual">
        <source media="(max-width: 49rem) and (orientation: portrait)" srcSet="/images/winter-campaign-mobile.jpg" />
        <img src="/images/winter-campaign.jpg" alt="Model wearing an oversized charcoal T-shirt and relaxed black denim" width="1536" height="1024" />
      </picture>
      <div className="container hero-content">
        <h1 id="hero-title">Built to <br />live in.</h1>
        <p className="hero-description">Heavyweight tees, relaxed denim and easy layers for every day.</p>
        <ShopLink className="button button-light hero-action" href="/catalog" onNavigate={onNavigate}>Shop the collection</ShopLink>
      </div>
    </section>
  );
}
