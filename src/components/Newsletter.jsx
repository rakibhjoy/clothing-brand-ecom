import React, { useState } from 'react';
import { Mail, Check, Sparkles } from 'lucide-react';

export default function Newsletter({ onSubscribed }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubmitted(true);
    if (onSubscribed) {
      onSubscribed(email);
    }
  };

  return (
    <section className="newsletter-section" id="newsletter-section">
      <div className="container">
        <div className="newsletter-box">
          <div className="hero-tagline" style={{ margin: '0 auto 1rem' }}>
            <Sparkles size={14} />
            <span>Private Access</span>
          </div>

          <h2 className="section-title" style={{ fontSize: '2.2rem', marginBottom: '0.75rem' }}>
            Join The Studio Inner Circle
          </h2>

          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.6 }}>
            Subscribe to receive private runway invites, preview upcoming drops before public release, and unlock <strong>10% off</strong> your inaugural order.
          </p>

          {submitted ? (
            <div style={{
              marginTop: '1.5rem',
              padding: '1rem',
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-sm)',
              color: 'var(--accent-emerald)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              fontWeight: 600
            }}>
              <Check size={18} />
              <span>Welcome to AURA. Use voucher <strong>WELCOME10</strong> at checkout!</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address..."
                className="newsletter-input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="input-newsletter-email"
              />
              <button type="submit" className="btn btn-primary" id="btn-newsletter-submit">
                <span>Subscribe</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
