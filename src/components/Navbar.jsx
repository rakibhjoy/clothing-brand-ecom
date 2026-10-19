import React, { useState, useRef, useEffect } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  X,
  ChevronDown,
  ChevronRight,
  Menu,
  Package,
  MapPin,
  LogOut,
  Settings,
  Sparkles,
  LogIn
} from 'lucide-react';

export default function Navbar({
  currentView,
  onNavigate,
  cartCount,
  wishlistCount,
  ordersCount = 1,
  currentUser,
  onLogout,
  userName,
  userEmail,
  searchQuery,
  onSearchChange,
  onSelectCategory
}) {
  const [showSearch, setShowSearch] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const categoryDropdownRef = useRef(null);
  const userDropdownRef = useRef(null);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCategoryClick = (cat) => {
    onSelectCategory(cat, true);
    setCategoryDropdownOpen(false);
  };

  return (
    <>
      {/* Top Black Announcement Ticker */}
      <div className="wr-ticker-bar" id="wr-top-ticker">
        <div className="wr-ticker-inner">
          <span>SPRING '26</span>
          <span>ROGUE & RAW™</span>
          <span>LIVE NOW</span>
          <span>ROGUE & RAW™</span>
          <span>SPRING '26</span>
          <span>ROGUE & RAW™</span>
          <span>LIVE NOW</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="wr-header" id="wr-main-header">
        <div className="wr-header-content">
          {/* Left Navigation: Mobile Hamburger Button & Desktop Navigation */}
          <div className="wr-nav-left">
            {/* Mobile Hamburger Trigger (Visible on mobile/tablet) */}
            <button
              type="button"
              className="mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              id="btn-mobile-hamburger"
            >
              <Menu size={22} />
            </button>

            {/* Desktop Navigation Items (Hidden on mobile) */}
            <div className="wr-nav-desktop-items">
              <button
                className={`wr-nav-link ${currentView === 'home' ? 'active' : ''}`}
                onClick={() => onNavigate('home')}
                id="nav-btn-home"
              >
                HOME
              </button>

              {/* Categories Dropdown (T-Shirts, Shirts, Jeans, Accessories, Knit Collar) */}
              <div className="wr-dropdown-wrapper" ref={categoryDropdownRef}>
                <button
                  className={`wr-nav-link wr-dropdown-trigger ${categoryDropdownOpen ? 'active' : ''}`}
                  onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
                  id="nav-btn-categories"
                  aria-expanded={categoryDropdownOpen}
                >
                  <span>CATEGORIES</span>
                  <ChevronDown size={14} className={`dropdown-chevron ${categoryDropdownOpen ? 'rotate' : ''}`} />
                </button>

                {categoryDropdownOpen && (
                  <div className="wr-dropdown-menu" id="menu-categories-dropdown">
                    <button className="wr-dropdown-item" onClick={() => handleCategoryClick('T-SHIRTS')} id="cat-opt-tshirts">
                      T-Shirts (Heavyweight)
                    </button>
                    <button className="wr-dropdown-item" onClick={() => handleCategoryClick('SHIRTS')} id="cat-opt-shirts">
                      Shirts (Flannels & Plaid)
                    </button>
                    <button className="wr-dropdown-item" onClick={() => handleCategoryClick('JEANS')} id="cat-opt-jeans">
                      Jeans & Baggy Denim
                    </button>
                    <button className="wr-dropdown-item" onClick={() => handleCategoryClick('ACCESSORIES')} id="cat-opt-accessories">
                      Accessories (Belts & Caps)
                    </button>
                    <button className="wr-dropdown-item" onClick={() => handleCategoryClick('KNIT COLLAR')} id="cat-opt-knit">
                      Knit Collar Series
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center Brand Wordmark */}
          <div
            className="wr-brand-logo"
            onClick={() => onNavigate('home')}
            id="brand-logo-rogue-raw"
          >
            Rogue&Raw.
          </div>

          {/* Right Actions: Search, Wishlist, USER NAME DROPDOWN, Shopping Bag */}
          <div className="wr-nav-right">
            {/* Live Search */}
            {showSearch ? (
              <div className="navbar-search-box">
                <input
                  type="text"
                  placeholder="SEARCH..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  autoFocus
                />
                <button type="button" onClick={() => setShowSearch(false)} aria-label="Close search">
                  <X size={13} />
                </button>
              </div>
            ) : (
              <button
                className="wr-nav-link"
                onClick={() => setShowSearch(true)}
                title="Search"
                aria-label="Search"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <Search size={18} />
              </button>
            )}

            {/* Saved Wishlist */}
            <button
              className="wr-nav-link"
              onClick={() => onNavigate('wishlist')}
              title="Saved items"
              aria-label="Wishlist"
              style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
              id="nav-btn-wishlist"
            >
              <Heart size={18} />
              {wishlistCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-8px',
                  background: '#000',
                  color: '#fff',
                  borderRadius: '50%',
                  width: '15px',
                  height: '15px',
                  fontSize: '0.65rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700
                }}>
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* USER NAME / AUTH DROPDOWN */}
            <div className="wr-dropdown-wrapper" ref={userDropdownRef}>
              <button
                className={`wr-nav-link wr-user-btn ${userDropdownOpen ? 'active' : ''}`}
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                id="nav-btn-user"
                aria-expanded={userDropdownOpen}
                title={currentUser?.isLoggedIn ? "User Account" : "Sign In or Register"}
              >
                <span className="wr-user-avatar">
                  {currentUser?.isLoggedIn ? (
                    <span style={{ fontSize: '0.65rem', fontWeight: 900 }}>
                      {(currentUser.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                    </span>
                  ) : (
                    <User size={14} />
                  )}
                </span>
                <span className="wr-user-name-text">
                  {currentUser?.isLoggedIn ? currentUser.name : 'SIGN IN'}
                </span>
                <ChevronDown size={13} className={`dropdown-chevron ${userDropdownOpen ? 'rotate' : ''}`} />
              </button>

              {userDropdownOpen && (
                <div className="wr-dropdown-menu wr-user-menu" id="menu-user-dropdown">
                  {currentUser?.isLoggedIn ? (
                    <>
                      <div className="wr-user-card-header">
                        <div className="wr-user-avatar-lg">
                          {(currentUser.name || 'U').split(' ').map(n => n[0]).slice(0, 2).join('').toUpperCase()}
                        </div>
                        <div style={{ minWidth: 0, overflow: 'hidden' }}>
                          <div className="wr-user-card-name" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {currentUser.name}
                          </div>
                          <div className="wr-user-card-email" style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                            {currentUser.email}
                          </div>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '3px', marginTop: '3px', fontSize: '0.62rem', fontWeight: 800, color: '#ea580c', textTransform: 'uppercase' }}>
                            <Sparkles size={10} />
                            <span>{currentUser.memberTier || 'VIP ARCHIVE'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="wr-dropdown-divider" />

                      {/* Edit Profile Link */}
                      <button
                        className="wr-dropdown-item with-icon highlight"
                        onClick={() => {
                          onNavigate('profile');
                          setUserDropdownOpen(false);
                        }}
                        id="user-menu-profile"
                      >
                        <Settings size={16} />
                        <span>Edit Profile &amp; Preferences</span>
                      </button>

                      <button
                        className="wr-dropdown-item with-icon"
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                        id="user-menu-orders"
                      >
                        <Package size={16} />
                        <span>My Orders</span>
                        {ordersCount > 0 && <span className="wr-pill-count">{ordersCount}</span>}
                      </button>

                      <button
                        className="wr-dropdown-item with-icon"
                        onClick={() => {
                          onNavigate('wishlist');
                          setUserDropdownOpen(false);
                        }}
                        id="user-menu-wishlist"
                      >
                        <Heart size={16} />
                        <span>Saved Wishlist</span>
                        {wishlistCount > 0 && <span className="wr-pill-count">{wishlistCount}</span>}
                      </button>

                      <button
                        className="wr-dropdown-item with-icon"
                        onClick={() => {
                          onNavigate('cart');
                          setUserDropdownOpen(false);
                        }}
                        id="user-menu-bag"
                      >
                        <ShoppingBag size={16} />
                        <span>Shopping Bag</span>
                        {cartCount > 0 && <span className="wr-pill-count">{cartCount}</span>}
                      </button>

                      <div className="wr-dropdown-divider" />

                      <div className="wr-dropdown-address-hint">
                        <MapPin size={13} />
                        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {currentUser.address || 'Banani, Dhaka 1213'}
                        </span>
                      </div>

                      <button
                        className="wr-dropdown-item with-icon"
                        style={{ color: '#e11d48' }}
                        onClick={() => {
                          if (onLogout) onLogout();
                          setUserDropdownOpen(false);
                        }}
                        id="user-menu-logout"
                      >
                        <LogOut size={16} />
                        <span>Sign Out of Account</span>
                      </button>
                    </>
                  ) : (
                    <>
                      <div style={{ padding: '0.85rem 1rem 0.5rem' }}>
                        <div style={{ fontSize: '0.68rem', fontWeight: 800, letterSpacing: '0.12em', color: '#888', textTransform: 'uppercase' }}>
                          ROGUE &amp; RAW™ MEMBERS
                        </div>
                        <div style={{ fontSize: '0.85rem', fontWeight: 900, color: '#000', marginTop: '0.2rem' }}>
                          Welcome to the Archive
                        </div>
                        <p style={{ fontSize: '0.72rem', color: '#666', margin: '0.35rem 0 0.75rem', lineHeight: 1.4 }}>
                          Sign in to access order tracking, digital tax receipts, and VIP drops.
                        </p>
                      </div>

                      <div style={{ padding: '0 0.85rem 0.6rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                        <button
                          type="button"
                          className="btn-checkout-block"
                          style={{ padding: '0.55rem', fontSize: '0.75rem' }}
                          onClick={() => {
                            onNavigate('login');
                            setUserDropdownOpen(false);
                          }}
                          id="nav-btn-signin"
                        >
                          SIGN IN TO ARCHIVE
                        </button>
                        <button
                          type="button"
                          className="btn-pdp-add-to-cart"
                          style={{ height: '38px', fontSize: '0.72rem' }}
                          onClick={() => {
                            onNavigate('register');
                            setUserDropdownOpen(false);
                          }}
                          id="nav-btn-register"
                        >
                          CREATE ACCOUNT
                        </button>
                      </div>

                      <div className="wr-dropdown-divider" />

                      <button
                        className="wr-dropdown-item with-icon"
                        onClick={() => {
                          onNavigate('orders');
                          setUserDropdownOpen(false);
                        }}
                      >
                        <Package size={16} />
                        <span>Track Orders by Order ID</span>
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Shopping Bag */}
            <button
              className="wr-nav-link"
              onClick={() => onNavigate('cart')}
              title="Shopping Bag"
              aria-label="Shopping Bag"
              style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontWeight: 800 }}
              id="btn-nav-cart"
            >
              <ShoppingBag size={18} />
              <span>({cartCount})</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Streetwear Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setMobileMenuOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
        >
          <div
            className="mobile-menu-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Header */}
            <div className="mobile-drawer-header">
              <div className="mobile-drawer-brand">
                <span className="mobile-drawer-logo">Rogue&Raw.</span>
                <span className="mobile-drawer-tag">SPRING '26</span>
              </div>
              <button
                type="button"
                className="mobile-drawer-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                id="btn-close-mobile-menu"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Live Search in Drawer */}
            <div className="mobile-drawer-search">
              <div className="mobile-search-inner">
                <Search size={15} className="mobile-search-icon" />
                <input
                  type="text"
                  placeholder="SEARCH APPAREL OR DROPS..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      onNavigate('category');
                      setMobileMenuOpen(false);
                    }
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchChange('')}
                    style={{ background: 'none', border: 'none', color: '#999', padding: '2px', cursor: 'pointer' }}
                    aria-label="Clear search"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            {/* Scrollable Drawer Content */}
            <div className="mobile-drawer-scroll">
              {/* Primary Curated Pages */}
              <div className="mobile-nav-group">
                <div className="mobile-group-title">EXPLORE ARCHIVE</div>
                <button
                  type="button"
                  className={`mobile-nav-item ${currentView === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>HOME</span>
                  <ChevronRight size={15} className="mobile-item-arrow" />
                </button>
                <button
                  type="button"
                  className={`mobile-nav-item ${currentView === 'category' ? 'active' : ''}`}
                  onClick={() => {
                    onSelectCategory('ALL', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>ALL PIECES / CATALOG</span>
                  <span className="mobile-pill-badge">ALL</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item highlight-orange"
                  onClick={() => {
                    onSelectCategory('NEW ARRIVALS', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} />
                    <span>NEW ARRIVALS</span>
                  </span>
                  <span className="mobile-pill-badge badge-orange">SPRING '26</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item highlight-red"
                  onClick={() => {
                    onSelectCategory('BEST SELLERS', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>BEST SELLERS</span>
                  <span className="mobile-pill-badge badge-red">HOT</span>
                </button>
              </div>

              {/* Streetwear Categories */}
              <div className="mobile-nav-group">
                <div className="mobile-group-title">COLLECTIONS &amp; DROPS</div>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onSelectCategory('T-SHIRTS', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>T-Shirts (Heavyweight)</span>
                  <span className="mobile-item-meta">260 GSM</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onSelectCategory('SHIRTS', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Shirts (Flannels &amp; Plaid)</span>
                  <span className="mobile-item-meta">Boxy Check</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onSelectCategory('JEANS', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Jeans &amp; Baggy Denim</span>
                  <span className="mobile-item-meta">Relaxed</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onSelectCategory('ACCESSORIES', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Accessories (Belts &amp; Caps)</span>
                  <span className="mobile-item-meta">Hardware</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onSelectCategory('KNIT COLLAR', true);
                    setMobileMenuOpen(false);
                  }}
                >
                  <span>Knit Collar Series</span>
                  <span className="mobile-item-meta">Ribbed</span>
                </button>
              </div>

              {/* Customer Account & Saved Links */}
              <div className="mobile-nav-group">
                <div className="mobile-group-title">ACCOUNT &amp; BAG</div>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onNavigate('wishlist');
                    setMobileMenuOpen(false);
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Heart size={16} />
                    <span>Saved Wishlist</span>
                  </span>
                  <span className="mobile-pill-badge">{wishlistCount}</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onNavigate('orders');
                    setMobileMenuOpen(false);
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={16} />
                    <span>Track Orders &amp; Receipts</span>
                  </span>
                  <span className="mobile-pill-badge">{ordersCount}</span>
                </button>
                <button
                  type="button"
                  className="mobile-nav-item"
                  onClick={() => {
                    onNavigate('cart');
                    setMobileMenuOpen(false);
                  }}
                >
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                    <ShoppingBag size={16} />
                    <span>Shopping Bag</span>
                  </span>
                  <span className="mobile-pill-badge">{cartCount}</span>
                </button>
              </div>

              {/* User Authentication Box at bottom of drawer */}
              <div className="mobile-user-card-wrap">
                {currentUser?.isLoggedIn ? (
                  <div className="mobile-user-card">
                    <div className="mobile-user-card-top">
                      <div className="mobile-user-avatar">
                        {(currentUser.name || 'U').split(' ').map((n) => n[0]).slice(0, 2).join('').toUpperCase()}
                      </div>
                      <div className="mobile-user-info">
                        <div className="mobile-user-name">{currentUser.name}</div>
                        <div className="mobile-user-email">{currentUser.email}</div>
                        <span className="mobile-user-tier">{currentUser.memberTier || 'VIP ARCHIVE'}</span>
                      </div>
                    </div>
                    <div className="mobile-user-actions">
                      <button
                        type="button"
                        className="mobile-btn-profile"
                        onClick={() => {
                          onNavigate('profile');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <User size={14} />
                        <span>Manage Profile</span>
                      </button>
                      <button
                        type="button"
                        className="mobile-btn-logout"
                        onClick={() => {
                          onLogout();
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogOut size={14} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="mobile-guest-card">
                    <div className="mobile-guest-text">
                      <strong>SIGN IN TO ROGUE &amp; RAW™</strong>
                      <span>Unlock VIP drops, faster checkout, and order archives.</span>
                    </div>
                    <div className="mobile-guest-btns">
                      <button
                        type="button"
                        className="mobile-btn-signin"
                        onClick={() => {
                          onNavigate('login');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LogIn size={15} />
                        <span>Sign In</span>
                      </button>
                      <button
                        type="button"
                        className="mobile-btn-register"
                        onClick={() => {
                          onNavigate('register');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span>Join Club</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Service Banner */}
            <div className="mobile-drawer-footer">
              <div className="mobile-footer-banner">
                <MapPin size={12} />
                <span>EXPRESS COURIER DELIVERY NATIONWIDE &bull; 2-3 DAYS</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
