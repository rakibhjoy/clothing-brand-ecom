import { useState } from 'react';
import { registerAccount, signIn } from '../accounts';
import ShopLink from './ShopLink';

export default function AuthPage({ mode, onNavigate, onLogin }) {
  const registering = mode === 'register';
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function onSubmit(event) {
    event.preventDefault();
    if (busy) return;
    const form = new FormData(event.currentTarget);
    const name = form.get('name')?.trim();
    const email = form.get('email').trim();
    const password = form.get('password');
    if (registering && (!name || password !== form.get('confirmation'))) {
      setError(!name ? 'Enter your name.' : 'Passwords do not match.');
      return;
    }
    setBusy(true);
    setError('');
    try {
      const profile = registering ? await registerAccount({ name, email, password }) : await signIn(email, password);
      if (!onLogin(profile, form.get('remember') === 'on')) throw new Error('Your browser could not start a session.');
    } catch (failure) {
      setError(failure.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <section className="container page-section auth-page">
      <div className="page-heading">
        <h1>{registering ? 'Create an account' : 'Sign in'}</h1>
        <p>Demo accounts are stored in this browser.</p>
      </div>
      <form className="account-form" onSubmit={onSubmit}>
        {registering && <label>Full name<input autoComplete="name" name="name" required maxLength={100} /></label>}
        <label>Email address<input type="email" autoComplete="email" name="email" required maxLength={254} /></label>
        <label>Password<input type="password" autoComplete={registering ? 'new-password' : 'current-password'} name="password" required minLength={registering ? 8 : undefined} maxLength={128} /></label>
        {registering && <label>Confirm password<input type="password" autoComplete="new-password" name="confirmation" required minLength={8} maxLength={128} /></label>}
        {registering && <p className="muted">Use at least 8 characters.</p>}
        <label className="checkbox-field"><input type="checkbox" name="remember" /> Keep me signed in on this device</label>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-dark full-width" type="submit" disabled={busy}>
          {busy ? 'Please wait…' : registering ? 'Create account' : 'Sign in'}
        </button>
      </form>
      <p className="auth-alternate">
        {registering ? 'Already have an account? ' : 'New to Rogue & Raw? '}
        <ShopLink className="text-link" href={registering ? '/login' : '/register'} onNavigate={onNavigate}>{registering ? 'Sign in' : 'Create an account'}</ShopLink>
      </p>
    </section>
  );
}
