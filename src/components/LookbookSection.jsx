import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function LookbookSection({ onShopLookbook }) {
  return (
    <section className="lookbook-section" id="lookbook-section">
      <div className="container">
        <div className="lookbook-card">
          <div className="lookbook-content">
            <div className="hero-tagline" style={{ background: 'rgba(255,255,255,0.06)', borderColor: 'rgba(255,255,255,0.15)', color: 'var(--text-primary)' }}>
              <Sparkles size={14} color="#e2b170" />
              <span>Editorial Lookbook</span>
            </div>

            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, marginBottom: '1.2rem' }}>
              The Architectural <br />
              <span style={{ color: 'var(--accent-gold)' }}>Minimalist Wardrobe</span>
            </h2>

            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', maxWidth: '440px' }}>
              Designed around muted tones, geometric drape, and fluid movement. Every garment is constructed to be effortlessly mixed, matched, and layered through all seasons.
            </p>

            <button className="btn btn-primary" onClick={onShopLookbook} id="btn-lookbook-shop">
              <span>Shop The Editorial</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="lookbook-image">
            <img
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80"
              alt="Editorial fashion lookbook featuring minimalist coats and wool garments"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
