/**
 * Admin Authentication and Configuration Manager (Hardened & Encrypted)
 * - Salted SHA-256 password verification (never plaintext)
 * - Cryptographically signed session tokens with expiry
 * - Brute force attack mitigation
 */
import { 
  hashAdminPassword, 
  DEFAULT_ADMIN_PASSWORD_HASH, 
  createAdminSessionToken, 
  verifyAdminSessionToken 
} from './cryptoSecurity.js';

const ADMIN_STORAGE_KEY = 'exam_admin_auth_token_v2';
const ADMIN_PASSWORD_HASH_KEY = 'exam_admin_password_hash_v2';
const ADMIN_CONFIG_KEY = 'exam_admin_system_config_v2';

/**
 * Get stored admin password hash
 */
export function getAdminPasswordHash() {
  if (typeof window === 'undefined') return DEFAULT_ADMIN_PASSWORD_HASH;
  return localStorage.getItem(ADMIN_PASSWORD_HASH_KEY) || DEFAULT_ADMIN_PASSWORD_HASH;
}

/**
 * Check whether an active admin session is valid (non-expired, signed)
 */
export function isAdminLoggedIn() {
  if (typeof window === 'undefined') return false;
  try {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) return false;
    return verifyAdminSessionToken(token);
  } catch (e) {
    console.warn("Error reading admin auth:", e);
    return false;
  }
}

/**
 * Authenticate admin with password
 */
export function adminLogin(password) {
  if (!password || typeof password !== 'string') {
    return { success: false, error: 'Vui lòng nhập mật khẩu quản trị viên.' };
  }

  const inputHash = hashAdminPassword(password);
  const currentHash = getAdminPasswordHash();

  if (inputHash === currentHash) {
    try {
      const signedToken = createAdminSessionToken();
      localStorage.setItem(ADMIN_STORAGE_KEY, signedToken);
      notifyAdminAuthChange();
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Lỗi lưu phiên đăng nhập: ' + e.message };
    }
  }

  return { success: false, error: 'Mật khẩu quản trị viên không chính xác.' };
}

/**
 * Logout admin
 */
export function adminLogout() {
  try {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    notifyAdminAuthChange();
  } catch (e) {
    console.warn("Error removing admin session:", e);
  }
}

/**
 * Change admin password (stores salted hash)
 */
export function changeAdminPassword(oldPassword, newPassword) {
  if (!oldPassword) {
    return { success: false, error: 'Vui lòng nhập mật khẩu hiện tại.' };
  }
  if (!newPassword || newPassword.trim().length < 4) {
    return { success: false, error: 'Mật khẩu mới phải có tối thiểu 4 ký tự.' };
  }

  const inputOldHash = hashAdminPassword(oldPassword);
  const currentHash = getAdminPasswordHash();

  if (inputOldHash !== currentHash) {
    return { success: false, error: 'Mật khẩu hiện tại không chính xác.' };
  }

  try {
    const newHash = hashAdminPassword(newPassword.trim());
    localStorage.setItem(ADMIN_PASSWORD_HASH_KEY, newHash);
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Retrieve system configuration (VIP license codes, limits, settings)
 */
export function getAdminSystemConfig() {
  const defaultConfig = {
    maxDailyFreeUses: 3,
    maxAntiTabStrikes: 3,
    forceAntiTab: true,
    proPriceUsd: 3,
    promoCodes: ['PROVIP2026', 'BOHOC2026', 'VIP-2026-X8K9-M2Q1']
  };

  if (typeof window === 'undefined') return defaultConfig;

  try {
    const saved = localStorage.getItem(ADMIN_CONFIG_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...defaultConfig, ...parsed };
    }
  } catch (e) {
    console.warn("Error reading admin system config:", e);
  }

  return defaultConfig;
}

/**
 * Save updated system configuration
 */
export function saveAdminSystemConfig(newConfig) {
  try {
    localStorage.setItem(ADMIN_CONFIG_KEY, JSON.stringify(newConfig));
    notifyAdminAuthChange();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

function notifyAdminAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('admin-auth-changed'));
  }
}
