import { useState } from 'react';
import { changePassword, updateAccount } from '../accounts';
import ShopLink from './ShopLink';

export default function ProfilePage({ user, onNavigate, onLogout, onUpdate }) {
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [busy, setBusy] = useState(false);

  function saveDetails(event) {
    event.preventDefault();
    setError('');
    const form = new FormData(event.currentTarget);
    const fields = Object.fromEntries([...form.entries()].map(([key, value]) => [key, value.trim()]));
    if (!fields.name) {
      setError('Enter your name.');
      return;
    }
    try {
      onUpdate(updateAccount(user.id, fields));
    } catch (failure) {
      setError(failure.message);
    }
  }

  async function savePassword(event) {
    event.preventDefault();
    if (busy) return;
    setPasswordError('');
    setPasswordMessage('');
    const element = event.currentTarget;
    const form = new FormData(element);
    const next = form.get('next');
    if (next !== form.get('confirm')) {
      setPasswordError('Passwords do not match.');
      return;
    }
    setBusy(true);
    try {
      await changePassword(user.id, form.get('current'), next);
      element.reset();
      setPasswordMessage('Password updated.');
    } catch (failure) {
      setPasswordError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container page-section account-page">
      <div className="page-heading"><h1>Your account</h1><p>Manage your details for this browser.</p></div>
      <div className="account-layout">
        <aside className="account-menu surface">
          <h2>{user.name}</h2>
          <nav aria-label="Account">
            <ShopLink href="/orders" onNavigate={onNavigate}>Order history</ShopLink>
            <ShopLink href="/wishlist" onNavigate={onNavigate}>Saved items</ShopLink>
            <ShopLink href="/cart" onNavigate={onNavigate}>Shopping bag</ShopLink>
          </nav>
          <button type="button" className="text-link" onClick={onLogout}>Sign out</button>
        </aside>
        <div className="account-details">
          <form className="account-form surface" onSubmit={saveDetails}>
            <h2>Personal details</h2>
            <div className="form-grid">
              <label>Full name<input name="name" autoComplete="name" defaultValue={user.name} required maxLength={100} /></label>
              <label>Email<input type="email" name="email" autoComplete="email" defaultValue={user.email} required maxLength={254} /></label>
              <label>Phone<input type="tel" name="phone" autoComplete="tel" defaultValue={user.phone} maxLength={30} /></label>
              <label>Preferred size<select name="preferredSize" defaultValue={user.preferredSize || ''}>
                <option value="">Select a size</option>
                {['XS', 'S', 'M', 'L', 'XL', '2XL'].map((size) => <option key={size}>{size}</option>)}
              </select></label>
              <label className="span-all">Street address<input name="address" autoComplete="street-address" defaultValue={user.address} maxLength={180} /></label>
              <label>City<input name="city" autoComplete="address-level2" defaultValue={user.city} maxLength={70} /></label>
              <label>Postal code<input name="postalCode" autoComplete="postal-code" defaultValue={user.postalCode} maxLength={15} /></label>
            </div>
            {error && <p className="form-error" role="alert">{error}</p>}
            <button type="submit" className="button button-dark">Save details</button>
          </form>
          <form className="account-form surface" onSubmit={savePassword}>
            <h2>Change password</h2>
            <div className="form-grid">
              <label className="span-all">Current password<input type="password" name="current" autoComplete="current-password" required maxLength={128} /></label>
              <label>New password<input type="password" name="next" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
              <label>Confirm new password<input type="password" name="confirm" autoComplete="new-password" required minLength={8} maxLength={128} /></label>
            </div>
            {passwordError && <p className="form-error" role="alert">{passwordError}</p>}
            {passwordMessage && <p role="status">{passwordMessage}</p>}
            <button type="submit" className="button button-outline" disabled={busy}>{busy ? 'Updating…' : 'Update password'}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
