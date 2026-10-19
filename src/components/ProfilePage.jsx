import React, { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Package,
  Heart,
  ShoppingBag,
  Check,
  LogOut,
  Sparkles,
  Lock,
  Tag,
  ArrowRight,
  ChevronRight,
  Clock,
  Award
} from 'lucide-react';

export default function ProfilePage({
  user,
  onUpdateProfile,
  onLogout,
  onNavigate,
  ordersCount = 0,
  wishlistCount = 0,
  cartCount = 0
}) {
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'address' | 'preferences' | 'security'
  const [isSavedRecently, setIsSavedRecently] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');

  // Form State initialized from user prop
  const [name, setName] = useState(user?.name || 'Rafid Ahmed');
  const [email, setEmail] = useState(user?.email || 'rafid.ahmed@example.com');
  const [phone, setPhone] = useState(user?.phone || '+880 1712-345678');
  const [gender, setGender] = useState(user?.gender || 'Male');
  const [dob, setDob] = useState(user?.dob || '1998-05-14');

  // Address State
  const [address, setAddress] = useState(user?.address || 'House 42, Road 11, Block D, Banani');
  const [city, setCity] = useState(user?.city || 'Dhaka');
  const [district, setDistrict] = useState(user?.district || 'Dhaka');
  const [postalCode, setPostalCode] = useState(user?.postalCode || '1213');
  const [deliveryNotes, setDeliveryNotes] = useState(user?.deliveryNotes || 'Please call before delivery dispatch.');

  // Fit & Sizing Preferences
  const [preferredSize, setPreferredSize] = useState(user?.preferredSize || 'L');
  const [preferredPantsSize, setPreferredPantsSize] = useState(user?.preferredPantsSize || '32');
  const [fitSilhouette, setFitSilhouette] = useState(user?.fitSilhouette || 'Boxy Oversized Drop Shoulder');

  // Security Form
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleSaveProfile = (e) => {
    if (e) e.preventDefault();
    setStatusMsg('');

    if (!name.trim()) {
      setStatusMsg('Name cannot be empty.');
      return;
    }

    if (newPassword && newPassword !== confirmNewPassword) {
      setStatusMsg('New passwords do not match. Please verify.');
      return;
    }

    const updated = {
      ...user,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      gender,
      dob,
      address: address.trim(),
      city,
      district,
      postalCode: postalCode.trim(),
      deliveryNotes: deliveryNotes.trim(),
      preferredSize,
      preferredPantsSize,
      fitSilhouette
    };

    onUpdateProfile(updated);
    setIsSavedRecently(true);
    setStatusMsg('Profile and address preferences updated successfully!');
    setCurrentPassword('');
    setNewPassword('');
    setConfirmNewPassword('');

    setTimeout(() => {
      setIsSavedRecently(false);
      setStatusMsg('');
    }, 3000);
  };

  const userInitials = (name || 'User')
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="profile-page-wrapper" id="profile-page-container">
      {/* Editorial Breadcrumbs */}
      <div className="pdp-breadcrumbs-bar">
        <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          <div className="breadcrumbs-inner">
            <button className="breadcrumb-nav-btn" onClick={() => onNavigate('home')}>
              Home
            </button>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-current">Customer Account &amp; Profile</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '1400px', margin: '0 auto', width: '100%', padding: '1.5rem 1rem 5rem' }}>
        {/* Top Luxury Customer Header Banner */}
        <div className="profile-hero-banner">
          <div className="profile-hero-left">
            <div className="profile-avatar-circle" aria-label="Customer Avatar">
              <span>{userInitials}</span>
            </div>
            <div className="profile-hero-details">
              <div className="profile-tier-badge">
                <Sparkles size={13} />
                <span>{user?.memberTier || 'BLACK VIP ARCHIVE'}</span>
              </div>
              <h1 className="profile-customer-name">{name}</h1>
              <div className="profile-meta-pills">
                <span className="profile-meta-pill">
                  <Mail size={13} />
                  <span>{email}</span>
                </span>
                <span className="profile-meta-pill">
                  <Phone size={13} />
                  <span>{phone}</span>
                </span>
                <span className="profile-meta-pill">
                  <MapPin size={13} />
                  <span>{city}, Bangladesh</span>
                </span>
              </div>
            </div>
          </div>

          <div className="profile-hero-right">
            <div className="loyalty-points-card">
              <div className="points-label">AVAILABLE STORE BALANCE</div>
              <div className="points-value">
                ৳ {(user?.loyaltyPoints || 480).toLocaleString()}
              </div>
              <div className="points-sub">
                {user?.loyaltyPoints || 480} Archive VIP Points Active
              </div>
            </div>
          </div>
        </div>

        {/* Quick Summary Metrics Grid */}
        <div className="profile-metrics-grid">
          <button
            type="button"
            className="profile-metric-card"
            onClick={() => onNavigate('orders')}
          >
            <div className="metric-icon-wrap">
              <Package size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-number">{ordersCount}</span>
              <span className="metric-title">Orders Placed</span>
            </div>
            <ChevronRight size={18} className="metric-arrow" />
          </button>

          <button
            type="button"
            className="profile-metric-card"
            onClick={() => onNavigate('wishlist')}
          >
            <div className="metric-icon-wrap">
              <Heart size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-number">{wishlistCount}</span>
              <span className="metric-title">Saved Wishlist</span>
            </div>
            <ChevronRight size={18} className="metric-arrow" />
          </button>

          <button
            type="button"
            className="profile-metric-card"
            onClick={() => onNavigate('cart')}
          >
            <div className="metric-icon-wrap">
              <ShoppingBag size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-number">{cartCount}</span>
              <span className="metric-title">Cart Items</span>
            </div>
            <ChevronRight size={18} className="metric-arrow" />
          </button>

          <div className="profile-metric-card static">
            <div className="metric-icon-wrap">
              <Award size={20} />
            </div>
            <div className="metric-info">
              <span className="metric-number">SIZE {preferredSize}</span>
              <span className="metric-title">Default Boxy Fit</span>
            </div>
          </div>
        </div>

        {/* Success / Error Message Banner */}
        {statusMsg && (
          <div className={`profile-status-alert ${isSavedRecently ? 'success' : 'error'}`}>
            <Check size={18} />
            <span>{statusMsg}</span>
          </div>
        )}

        {/* Main Edit Profile Layout */}
        <div className="profile-main-layout">
          {/* Left Vertical Tabs Navigation */}
          <aside className="profile-tabs-sidebar">
            <div className="sidebar-group-title">ACCOUNT MANAGEMENT</div>
            <button
              type="button"
              className={`profile-nav-tab ${activeTab === 'personal' ? 'active' : ''}`}
              onClick={() => setActiveTab('personal')}
            >
              <User size={16} />
              <span>Personal Information</span>
            </button>
            <button
              type="button"
              className={`profile-nav-tab ${activeTab === 'address' ? 'active' : ''}`}
              onClick={() => setActiveTab('address')}
            >
              <MapPin size={16} />
              <span>Delivery &amp; Courier Address</span>
            </button>
            <button
              type="button"
              className={`profile-nav-tab ${activeTab === 'preferences' ? 'active' : ''}`}
              onClick={() => setActiveTab('preferences')}
            >
              <Tag size={16} />
              <span>Size &amp; Fit Preferences</span>
            </button>
            <button
              type="button"
              className={`profile-nav-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Lock size={16} />
              <span>Security &amp; Password</span>
            </button>

            <div className="sidebar-divider" />

            <div className="sidebar-group-title">QUICK JUMP</div>
            <button
              type="button"
              className="profile-nav-tab secondary"
              onClick={() => onNavigate('orders')}
            >
              <Package size={16} />
              <span>Track Orders ({ordersCount})</span>
            </button>
            <button
              type="button"
              className="profile-nav-tab secondary"
              onClick={() => onNavigate('wishlist')}
            >
              <Heart size={16} />
              <span>Saved Archive ({wishlistCount})</span>
            </button>

            <div className="sidebar-divider" />

            <button
              type="button"
              className="profile-nav-tab signout"
              onClick={onLogout}
            >
              <LogOut size={16} />
              <span>Sign Out of Account</span>
            </button>
          </aside>

          {/* Right Form Content Panel */}
          <div className="profile-form-panel">
            <form onSubmit={handleSaveProfile} id="form-edit-profile">
              {/* TAB 1: PERSONAL INFORMATION */}
              {activeTab === 'personal' && (
                <div className="profile-tab-content">
                  <div className="tab-header-row">
                    <div>
                      <h2 className="tab-title">PERSONAL INFORMATION</h2>
                      <p className="tab-sub">
                        Manage your legal full name, contact numbers, and identification details.
                      </p>
                    </div>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="auth-field-group">
                      <label className="auth-field-label">
                        FULL NAME <span className="req">*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <User size={16} className="auth-field-icon" />
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="auth-input"
                          placeholder="Your Full Name"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">
                        EMAIL ADDRESS <span className="req">*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <Mail size={16} className="auth-field-icon" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="auth-input"
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">
                        PRIMARY PHONE NUMBER <span className="req">*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <Phone size={16} className="auth-field-icon" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="auth-input"
                          placeholder="+880 1700-000000"
                        />
                      </div>
                      <span className="field-hint">Used by Steadfast &amp; Pathao riders for doorstep dispatch.</span>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">GENDER IDENTIFICATION</label>
                      <div className="auth-input-wrapper">
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="auth-select"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Non-Binary">Non-Binary / Unisex</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">DATE OF BIRTH (FOR BIRTHDAY DROPS)</label>
                      <div className="auth-input-wrapper">
                        <input
                          type="date"
                          value={dob}
                          onChange={(e) => setDob(e.target.value)}
                          className="auth-input"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DELIVERY & COURIER ADDRESS */}
              {activeTab === 'address' && (
                <div className="profile-tab-content">
                  <div className="tab-header-row">
                    <div>
                      <h2 className="tab-title">DELIVERY &amp; COURIER ADDRESS</h2>
                      <p className="tab-sub">
                        Default shipping details used to auto-populate checkout for 1-click orders.
                      </p>
                    </div>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="auth-field-group full-width">
                      <label className="auth-field-label">
                        STREET ADDRESS (HOUSE, ROAD, BLOCK/SECTOR) <span className="req">*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <MapPin size={16} className="auth-field-icon" />
                        <input
                          type="text"
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="auth-input"
                          placeholder="e.g. House 42, Road 11, Block D, Banani"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">
                        CITY / DIVISION <span className="req">*</span>
                      </label>
                      <div className="auth-input-wrapper">
                        <select
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="auth-select"
                        >
                          <option value="Dhaka">Dhaka (Inside Dhaka 24-48h)</option>
                          <option value="Chittagong">Chittagong</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Barisal">Barisal</option>
                          <option value="Rangpur">Rangpur</option>
                          <option value="Mymensingh">Mymensingh</option>
                          <option value="Comilla">Comilla</option>
                          <option value="Other Districts">Other Districts (3-5 days)</option>
                        </select>
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">DISTRICT</label>
                      <div className="auth-input-wrapper">
                        <input
                          type="text"
                          value={district}
                          onChange={(e) => setDistrict(e.target.value)}
                          className="auth-input"
                          placeholder="e.g. Dhaka"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">POSTAL CODE</label>
                      <div className="auth-input-wrapper">
                        <input
                          type="text"
                          value={postalCode}
                          onChange={(e) => setPostalCode(e.target.value)}
                          className="auth-input"
                          placeholder="e.g. 1213"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group full-width">
                      <label className="auth-field-label">COURIER RIDER INSTRUCTIONS (OPTIONAL)</label>
                      <div className="auth-input-wrapper">
                        <input
                          type="text"
                          value={deliveryNotes}
                          onChange={(e) => setDeliveryNotes(e.target.value)}
                          className="auth-input"
                          placeholder="e.g. Leave with security guard if phone unreachable"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: FIT & SIZING PREFERENCES */}
              {activeTab === 'preferences' && (
                <div className="profile-tab-content">
                  <div className="tab-header-row">
                    <div>
                      <h2 className="tab-title">SIZE &amp; FIT PREFERENCES</h2>
                      <p className="tab-sub">
                        We pre-select your preferred sizes on PDP pages and filter recommendations.
                      </p>
                    </div>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="auth-field-group">
                      <label className="auth-field-label">PRIMARY TOPS &amp; TEES SIZE</label>
                      <div className="profile-size-picker-row">
                        {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((s) => (
                          <button
                            key={s}
                            type="button"
                            className={`profile-size-pill ${preferredSize === s ? 'active' : ''}`}
                            onClick={() => setPreferredSize(s)}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">PRIMARY PANTS &amp; DENIM WAIST (IN)</label>
                      <div className="profile-size-picker-row">
                        {['28', '30', '32', '34', '36', '38'].map((w) => (
                          <button
                            key={w}
                            type="button"
                            className={`profile-size-pill ${preferredPantsSize === w ? 'active' : ''}`}
                            onClick={() => setPreferredPantsSize(w)}
                          >
                            {w}"
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="auth-field-group full-width">
                      <label className="auth-field-label">PREFERRED SILHOUETTE DRAPE</label>
                      <div className="auth-input-wrapper">
                        <select
                          value={fitSilhouette}
                          onChange={(e) => setFitSilhouette(e.target.value)}
                          className="auth-select"
                        >
                          <option value="Boxy Oversized Drop Shoulder">Boxy Oversized Drop Shoulder (Signature R&amp;R Drape)</option>
                          <option value="Relaxed Standard Fit">Relaxed Standard Fit</option>
                          <option value="Tailored Slim Fit">Tailored Slim Fit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: SECURITY & PASSWORD */}
              {activeTab === 'security' && (
                <div className="profile-tab-content">
                  <div className="tab-header-row">
                    <div>
                      <h2 className="tab-title">SECURITY &amp; PASSWORD</h2>
                      <p className="tab-sub">
                        Keep your account safe by updating your password periodically.
                      </p>
                    </div>
                  </div>

                  <div className="profile-fields-grid">
                    <div className="auth-field-group full-width">
                      <label className="auth-field-label">CURRENT PASSWORD</label>
                      <div className="auth-input-wrapper">
                        <Lock size={16} className="auth-field-icon" />
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="auth-input"
                          placeholder="Enter current password"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">NEW PASSWORD</label>
                      <div className="auth-input-wrapper">
                        <Lock size={16} className="auth-field-icon" />
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="auth-input"
                          placeholder="Min. 6 characters"
                        />
                      </div>
                    </div>

                    <div className="auth-field-group">
                      <label className="auth-field-label">CONFIRM NEW PASSWORD</label>
                      <div className="auth-input-wrapper">
                        <Lock size={16} className="auth-field-icon" />
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) => setConfirmNewPassword(e.target.value)}
                          className="auth-input"
                          placeholder="Re-type new password"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Save Action Bar */}
              <div className="profile-save-bar">
                <button
                  type="submit"
                  className="btn-profile-save"
                  id="btn-save-profile"
                >
                  <Check size={18} />
                  <span>SAVE PROFILE &amp; PREFERENCES</span>
                </button>

                <button
                  type="button"
                  className="btn-profile-discard"
                  onClick={() => onNavigate('home')}
                >
                  RETURN TO HOME
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
