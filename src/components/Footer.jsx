import React from 'react';

export default function Footer({ onNavigate, currentUser }) {
  return (
    <footer className="wr-footer" id="wr-site-footer">
      <div className="wr-footer-inner">
        {/* Social Icons Row */}
        <div className="wr-footer-social-row">
          <a href="#" className="wr-social-icon" aria-label="Facebook">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="#" className="wr-social-icon" aria-label="Instagram">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
            </svg>
          </a>
          <a href="#" className="wr-social-icon" aria-label="TikTok">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
            </svg>
          </a>
        </div>

        {/* Links Row */}
        <div className="wr-footer-links-row">
          {onNavigate && (
            <button
              type="button"
              className="wr-footer-link"
              onClick={() => onNavigate(currentUser?.isLoggedIn ? 'profile' : 'login')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              {currentUser?.isLoggedIn ? 'Account Profile' : 'Sign In / Register'}
            </button>
          )}
          {onNavigate && (
            <button
              type="button"
              className="wr-footer-link"
              onClick={() => onNavigate('orders')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              Track Orders
            </button>
          )}
          <a href="#" className="wr-footer-link">Support</a>
          <a href="#" className="wr-footer-link">Privacy Policy</a>
          <a href="#" className="wr-footer-link">Terms of service</a>
          <a href="#" className="wr-footer-link">Return & Exchange Portal</a>
        </div>

        {/* Copyright */}
        <div className="wr-copyright">
          © 2026 - Rogue & Raw Ltd.
        </div>
      </div>
    </footer>
  );
}
