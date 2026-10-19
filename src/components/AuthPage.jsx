import React, { useState } from 'react';
import {
  User,
  Mail,
  Lock,
  Phone,
  Eye,
  EyeOff,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  MapPin,
  Tag
} from 'lucide-react';

export default function AuthPage({
  initialMode = 'login', // 'login' | 'register'
  onLoginSuccess,
  onBackToHome,
  onNavigate
}) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Login Form Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register Form Fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regCity, setRegCity] = useState('Dhaka');
  const [regAddress, setRegAddress] = useState('');
  const [regPreferredSize, setRegPreferredSize] = useState('L');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Fill Demo Credentials for instant testing
  const handleQuickDemoLogin = () => {
    setLoginEmail('rafid.ahmed@example.com');
    setLoginPassword('rogueraw2026');
    setErrorMsg('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setErrorMsg('Please enter both your email address and password.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      // Check registered users in localStorage
      let existingUsers = [];
      try {
        const stored = localStorage.getItem('rr_registered_users');
        if (stored) existingUsers = JSON.parse(stored);
      } catch (err) {
        console.error(err);
      }

      // Check if user matches registered user or demo user
      const matched = existingUsers.find(
        (u) => u.email.toLowerCase() === loginEmail.trim().toLowerCase()
      );

      let userProfile;
      if (matched) {
        userProfile = { ...matched, isLoggedIn: true };
      } else {
        // Fallback / standard login account
        const namePart = loginEmail.split('@')[0];
        const formattedName =
          namePart.charAt(0).toUpperCase() + namePart.slice(1);

        userProfile = {
          id: `usr_${Date.now()}`,
          name: loginEmail.toLowerCase().includes('rafid') ? 'Rafid Ahmed' : formattedName,
          email: loginEmail.trim(),
          phone: '+880 1712-345678',
          city: 'Dhaka',
          district: 'Dhaka',
          address: 'House 42, Road 11, Block D, Banani',
          postalCode: '1213',
          gender: 'Male',
          preferredSize: 'L',
          memberTier: 'BLACK VIP ARCHIVE',
          joinedDate: 'October 2025',
          loyaltyPoints: 480,
          isLoggedIn: true
        };
      }

      setSuccessMsg('Authentication successful! Loading your account...');
      setTimeout(() => {
        onLoginSuccess(userProfile);
      }, 700);
    }, 600);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regName.trim() || !regEmail.trim() || !regPhone.trim() || !regPassword) {
      setErrorMsg('Please fill in all mandatory fields.');
      return;
    }

    if (regPassword.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Passwords do not match. Please verify and try again.');
      return;
    }

    if (!agreedTerms) {
      setErrorMsg('Please accept the Terms of Service to create an account.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newUser = {
        id: `usr_${Date.now()}`,
        name: regName.trim(),
        email: regEmail.trim(),
        phone: regPhone.trim(),
        city: regCity,
        district: regCity,
        address: regAddress.trim() || `${regCity}, Bangladesh`,
        postalCode: regCity === 'Dhaka' ? '1213' : '4000',
        gender: 'Not Specified',
        preferredSize: regPreferredSize,
        memberTier: 'ARCHIVE MEMBER',
        joinedDate: 'October 2026',
        loyaltyPoints: 100, // 100 bonus sign up points
        isLoggedIn: true
      };

      // Save to registered users list
      try {
        const stored = localStorage.getItem('rr_registered_users');
        const list = stored ? JSON.parse(stored) : [];
        list.push(newUser);
        localStorage.setItem('rr_registered_users', JSON.stringify(list));
      } catch (err) {
        console.error(err);
      }

      setSuccessMsg('Account registered successfully! Welcome to Rogue & Raw Archive.');
      setTimeout(() => {
        onLoginSuccess(newUser);
      }, 700);
    }, 650);
  };

  return (
    <div className="auth-page-wrapper" id="auth-page-container">
      {/* Editorial Breadcrumbs */}
      <div className="pdp-breadcrumbs-bar">
        <div className="container" style={{ maxWidth: '1560px', margin: '0 auto', width: '100%', padding: '0 1rem' }}>
          <div className="breadcrumbs-inner">
            <button className="breadcrumb-nav-btn" onClick={onBackToHome}>
              Home
            </button>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-current">
              {mode === 'login' ? 'Account Sign In' : 'Create Account'}
            </span>
          </div>
        </div>
      </div>

      <div className="auth-content-container">
        {/* Auth Box */}
        <div className="auth-card-box">
          {/* Top Brand Tag & Mode Switcher */}
          <div className="auth-card-top">
            <span className="auth-brand-tag">ROGUE &amp; RAW™ MEMBERS ARCHIVE</span>
            <h1 className="auth-main-title">
              {mode === 'login' ? 'SIGN IN TO YOUR ACCOUNT' : 'JOIN THE ARCHIVE CLUB'}
            </h1>
            <p className="auth-subtitle">
              {mode === 'login'
                ? 'Access your orders, saved wishlist, digital receipts, and VIP express checkout.'
                : 'Create an account to unlock 10% off your first drop, order tracking, and secret vault access.'}
            </p>

            {/* Mode Switch Tabs */}
            <div className="auth-tabs-bar">
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'login' ? 'active' : ''}`}
                onClick={() => {
                  setMode('login');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Sign In
              </button>
              <button
                type="button"
                className={`auth-tab-btn ${mode === 'register' ? 'active' : ''}`}
                onClick={() => {
                  setMode('register');
                  setErrorMsg('');
                  setSuccessMsg('');
                }}
              >
                Create Account
              </button>
            </div>
          </div>

          {/* Feedback Alerts */}
          {errorMsg && (
            <div className="auth-alert error">
              <span>✕</span>
              <span>{errorMsg}</span>
            </div>
          )}

          {successMsg && (
            <div className="auth-alert success">
              <Check size={16} />
              <span>{successMsg}</span>
            </div>
          )}

          {/* ================= MODE: LOGIN ================= */}
          {mode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="auth-form" id="form-user-login">
              {/* Quick Demo Credentials Pill */}
              <div className="auth-demo-shortcut-box">
                <div className="demo-shortcut-left">
                  <Sparkles size={14} className="gold-icon" />
                  <span>Test Account: <strong>rafid.ahmed@example.com</strong></span>
                </div>
                <button
                  type="button"
                  className="btn-fill-demo"
                  onClick={handleQuickDemoLogin}
                >
                  AUTO-FILL DEMO
                </button>
              </div>

              {/* Email Address */}
              <div className="auth-field-group">
                <label className="auth-field-label" htmlFor="login-email">
                  EMAIL ADDRESS OR PHONE NUMBER <span className="req">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <Mail size={16} className="auth-field-icon" />
                  <input
                    type="text"
                    id="login-email"
                    required
                    placeholder="e.g. rafid.ahmed@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="auth-field-group">
                <div className="auth-label-row">
                  <label className="auth-field-label" htmlFor="login-password">
                    PASSWORD <span className="req">*</span>
                  </label>
                  <button
                    type="button"
                    className="auth-forgot-link"
                    onClick={() =>
                      alert("Password Reset Hint: If using the demo account, use 'rogueraw2026'. Or sign in with auto-fill demo button!")
                    }
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="auth-input-wrapper">
                  <Lock size={16} className="auth-field-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="login-password"
                    required
                    placeholder="Enter your account password"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="auth-input"
                  />
                  <button
                    type="button"
                    className="auth-eye-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-auth-submit"
                disabled={isSubmitting}
                id="btn-login-submit"
              >
                {isSubmitting ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>SIGN IN TO ARCHIVE</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Switch to Register */}
              <div className="auth-footer-prompt">
                <span>New to Rogue &amp; Raw?</span>{' '}
                <button
                  type="button"
                  className="auth-inline-link"
                  onClick={() => {
                    setMode('register');
                    setErrorMsg('');
                  }}
                >
                  Create an account here &rarr;
                </button>
              </div>
            </form>
          )}

          {/* ================= MODE: REGISTER ================= */}
          {mode === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="auth-form" id="form-user-register">
              {/* Full Name */}
              <div className="auth-field-group">
                <label className="auth-field-label" htmlFor="reg-name">
                  FULL NAME <span className="req">*</span>
                </label>
                <div className="auth-input-wrapper">
                  <User size={16} className="auth-field-icon" />
                  <input
                    type="text"
                    id="reg-name"
                    required
                    placeholder="e.g. Rafid Ahmed"
                    value={regName}
                    onChange={(e) => setRegName(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Grid: Email & Phone */}
              <div className="auth-form-grid-2">
                <div className="auth-field-group">
                  <label className="auth-field-label" htmlFor="reg-email">
                    EMAIL ADDRESS <span className="req">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Mail size={16} className="auth-field-icon" />
                    <input
                      type="email"
                      id="reg-email"
                      required
                      placeholder="e.g. rafid@example.com"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-field-label" htmlFor="reg-phone">
                    PHONE NUMBER <span className="req">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Phone size={16} className="auth-field-icon" />
                    <input
                      type="tel"
                      id="reg-phone"
                      required
                      placeholder="+880 1700-000000"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="auth-input"
                    />
                  </div>
                </div>
              </div>

              {/* Grid: City & Preferred Size */}
              <div className="auth-form-grid-2">
                <div className="auth-field-group">
                  <label className="auth-field-label" htmlFor="reg-city">
                    DELIVERY CITY / DISTRICT <span className="req">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <MapPin size={16} className="auth-field-icon" />
                    <select
                      id="reg-city"
                      value={regCity}
                      onChange={(e) => setRegCity(e.target.value)}
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
                      <option value="Other Districts">Other Bangladesh District</option>
                    </select>
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-field-label">
                    DEFAULT STREETWEAR SIZE
                  </label>
                  <div className="auth-input-wrapper">
                    <Tag size={16} className="auth-field-icon" />
                    <select
                      value={regPreferredSize}
                      onChange={(e) => setRegPreferredSize(e.target.value)}
                      className="auth-select"
                    >
                      {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((s) => (
                        <option key={s} value={s}>
                          Size {s} {s === 'M' || s === 'L' ? '(Most Popular Boxy Fit)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Full Delivery Address */}
              <div className="auth-field-group">
                <label className="auth-field-label" htmlFor="reg-address">
                  PRIMARY SHIPPING ADDRESS (OPTIONAL)
                </label>
                <div className="auth-input-wrapper">
                  <input
                    type="text"
                    id="reg-address"
                    placeholder="e.g. House 14, Road 5, Block B, Dhanmondi"
                    value={regAddress}
                    onChange={(e) => setRegAddress(e.target.value)}
                    className="auth-input"
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div className="auth-form-grid-2">
                <div className="auth-field-group">
                  <label className="auth-field-label" htmlFor="reg-password">
                    PASSWORD <span className="req">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="reg-password"
                      required
                      placeholder="Min. 6 characters"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="auth-input"
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>

                <div className="auth-field-group">
                  <label className="auth-field-label" htmlFor="reg-confirm">
                    CONFIRM PASSWORD <span className="req">*</span>
                  </label>
                  <div className="auth-input-wrapper">
                    <Lock size={16} className="auth-field-icon" />
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="reg-confirm"
                      required
                      placeholder="Re-type password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="auth-input"
                    />
                    <button
                      type="button"
                      className="auth-eye-btn"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              {/* Terms Checkbox */}
              <div className="auth-options-row">
                <label className="auth-checkbox-label">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    required
                  />
                  <span>
                    I agree to the <strong>Terms of Service</strong> &amp;{' '}
                    <strong>Privacy Policy</strong>. Receive VIP drop alerts via SMS.
                  </span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="btn-auth-submit"
                disabled={isSubmitting}
                id="btn-register-submit"
              >
                {isSubmitting ? (
                  <span>CREATING ARCHIVE ACCOUNT...</span>
                ) : (
                  <>
                    <span>CREATE ACCOUNT &amp; GET 10% OFF</span>
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              {/* Switch to Login */}
              <div className="auth-footer-prompt">
                <span>Already a member?</span>{' '}
                <button
                  type="button"
                  className="auth-inline-link"
                  onClick={() => {
                    setMode('login');
                    setErrorMsg('');
                  }}
                >
                  Sign in here &rarr;
                </button>
              </div>
            </form>
          )}

          {/* Trust Guarantees */}
          <div className="auth-trust-row">
            <div className="auth-trust-item">
              <ShieldCheck size={15} />
              <span>256-Bit SSL Encrypted Checkout</span>
            </div>
            <div className="auth-trust-item">
              <Sparkles size={15} />
              <span>Exclusive Member Pre-Drops</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
