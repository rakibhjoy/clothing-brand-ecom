import { GUEST, readStored, writeStored } from './storefront.js';

const accountsKey = 'rr_accounts_v2';
const sessionKey = 'rr_session_v2';
const encoder = new TextEncoder();
const hex = (bytes) => Array.from(bytes, (value) => value.toString(16).padStart(2, '0')).join('');
const newId = () => hex(window.crypto.getRandomValues(new Uint8Array(16)));
const normalizeEmail = (email) => email.trim().toLowerCase();

function loadAccounts() {
  const accounts = readStored('localStorage', accountsKey, []);
  return Array.isArray(accounts) ? accounts.filter((entry) => entry?.profile?.id && entry.salt && entry.digest) : [];
}

function storeAccounts(accounts) {
  if (!writeStored('localStorage', accountsKey, accounts)) {
    throw new Error('Browser storage is unavailable. Check your settings and try again.');
  }
}

async function hashPassword(password, salt) {
  if (!window.crypto?.subtle) throw new Error('Local accounts require HTTPS or localhost.');
  const key = await window.crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await window.crypto.subtle.deriveBits({
    name: 'PBKDF2', salt: encoder.encode(salt), iterations: 600000, hash: 'SHA-256'
  }, key, 256);
  return hex(new Uint8Array(bits));
}

export function getSessionProfile() {
  const session = readStored('sessionStorage', sessionKey, null) || readStored('localStorage', sessionKey, null);
  return loadAccounts().find(({ profile }) => profile.id === session)?.profile || GUEST;
}

export function saveSession(id, remember = false) {
  try {
    window.sessionStorage.removeItem(sessionKey);
    window.localStorage.removeItem(sessionKey);
    return !id || writeStored(remember ? 'localStorage' : 'sessionStorage', sessionKey, id);
  } catch {
    return false;
  }
}

export async function registerAccount({ name, email, password }) {
  const normalized = normalizeEmail(email);
  const salt = newId();
  const digest = await hashPassword(password, salt);
  const accounts = loadAccounts();
  if (accounts.some(({ profile }) => profile.email === normalized)) {
    throw new Error('This email already has an account on this device.');
  }
  const profile = { id: newId(), name: name.trim(), email: normalized, isLoggedIn: true };
  storeAccounts([...accounts, { profile, salt, digest }]);
  return profile;
}

export async function signIn(email, password) {
  const normalized = normalizeEmail(email);
  const account = loadAccounts().find(({ profile }) => profile.email === normalized);
  if (!account || await hashPassword(password, account.salt) !== account.digest) {
    throw new Error('Email or password is incorrect for this device.');
  }
  return account.profile;
}

export function updateAccount(id, fields) {
  const accounts = loadAccounts();
  const account = accounts.find(({ profile }) => profile.id === id);
  if (!account) throw new Error('Sign in again to update this account.');
  const email = normalizeEmail(fields.email ?? account.profile.email);
  if (accounts.some(({ profile }) => profile.id !== id && profile.email === email)) {
    throw new Error('This email already has an account on this device.');
  }
  const profile = { ...account.profile, ...fields, email };
  storeAccounts(accounts.map((entry) => entry === account ? { ...entry, profile } : entry));
  return profile;
}

export async function changePassword(id, current, next) {
  const account = loadAccounts().find(({ profile }) => profile.id === id);
  if (!account || await hashPassword(current, account.salt) !== account.digest) {
    throw new Error('The current password is incorrect.');
  }
  const salt = newId();
  const digest = await hashPassword(next, salt);
  const accounts = loadAccounts();
  if (!accounts.some((entry) => entry.profile.id === id && entry.digest === account.digest)) {
    throw new Error('The account changed. Sign in and try again.');
  }
  storeAccounts(accounts.map((entry) => entry.profile.id === id ? { ...entry, salt, digest } : entry));
}
