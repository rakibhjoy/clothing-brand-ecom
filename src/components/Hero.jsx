import React from 'react';
import { Award, ArrowDown, Sparkles } from 'lucide-react';

export default function Hero({ onExploreClick, onSelectCategory }) {
  return (
    <section className="editorial-hero parallax-hero-container" id="home-hero">
      {/* Background with Mobile Parallax Visual Depth & High-End Clothing Banner */}
      <div className="hero-parallax-bg-wrapper">
        <img
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=85"
          alt="Winter New Collection - Rogue & Raw Apparel"
          className="editorial-hero-img parallax-img"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=2000&q=85";
          }}
        />
        <div className="hero-noise-overlay" />
      </div>

      <div className="editorial-hero-overlay">
        <div className="container" style={{ maxWidth: '1680px', margin: '0 auto', width: '100%', padding: 0 }}>
          <div className="hero-editorial-content parallax-content-layer">
            <div className="hero-chips-row">
              <span className="hero-sub-tag">
                <Sparkles size={13} style={{ marginRight: '6px', color: '#ffb703' }} />
                SEASON '26
              </span>
              <span className="hero-pill-badge">[ WINTER NEW COLLECTION ]</span>
              <span className="hero-pill-badge season-pill">DROP 01</span>
            </div>

            <h1 className="hero-editorial-title">
              WINTER NEW COLLECTION
            </h1>

            <p className="hero-minimal-season-tagline">
              ROGUE &amp; RAW™ // HEAVYWEIGHT APPAREL &bull; LIMITED ARCHIVE
            </p>

            <div className="hero-cta-wrapper">
              <button
                className="hero-bracket-btn highlight"
                onClick={() => onSelectCategory ? onSelectCategory('NEW ARRIVALS', true) : onExploreClick()}
                id="btn-hero-new-arrivals"
              >
                [ EXPLORE NEW ARRIVALS ]
              </button>
              <button
                className="hero-bracket-btn"
                onClick={() => onSelectCategory ? onSelectCategory('BEST SELLERS', true) : onExploreClick()}
                id="btn-hero-bestsellers"
              >
                <Award size={13} style={{ display: 'inline', marginRight: '5px' }} />
                [ BEST SELLERS ]
              </button>
              <button
                className="hero-bracket-btn ghost"
                onClick={onExploreClick}
                id="btn-hero-explore-all"
                title="Scroll down to lookbook and categories"
                aria-label="Scroll down to lookbook"
              >
                <ArrowDown size={14} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

