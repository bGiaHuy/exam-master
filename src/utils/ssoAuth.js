/**
 * SSO Authentication & User Session Manager for ExamMaster
 * Supports:
 * - Google Identity Services (GIS) OAuth2 JWT ID Token
 * - Microsoft Entra ID / Office 365 OAuth
 * - Quick Demo SSO (Offline / Instant Testing)
 * - Custom domain rules (e.g., FPT University @fpt.edu.vn)
 */

const SSO_USER_STORAGE_KEY = 'exam_sso_user';
const SSO_CONFIG_STORAGE_KEY = 'exam_sso_config';
const SSO_LOGIN_HISTORY_KEY = 'exam_sso_login_history';

// Default configuration
const DEFAULT_SSO_CONFIG = {
  googleClientId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GOOGLE_CLIENT_ID) || '',
  microsoftClientId: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_MICROSOFT_CLIENT_ID) || '',
  allowedDomains: [], // Empty means all domains allowed
  autoProDomains: ['fpt.edu.vn'], // Auto grant PRO features for specific educational domains
  enabledProviders: ['google', 'microsoft']
};

/**
 * Get stored SSO configuration
 */
export function getSsoConfig() {
  if (typeof window === 'undefined') return DEFAULT_SSO_CONFIG;
  try {
    const raw = localStorage.getItem(SSO_CONFIG_STORAGE_KEY);
    if (raw) {
      return { ...DEFAULT_SSO_CONFIG, ...JSON.parse(raw) };
    }
  } catch (e) {
    console.warn("Could not read SSO config from localStorage:", e);
  }
  return DEFAULT_SSO_CONFIG;
}

/**
 * Save SSO configuration
 */
export function saveSsoConfig(newConfig) {
  try {
    const current = getSsoConfig();
    const merged = { ...current, ...newConfig };
    localStorage.setItem(SSO_CONFIG_STORAGE_KEY, JSON.stringify(merged));
    notifySsoAuthChange();
    return { success: true, config: merged };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Get current logged in SSO user
 */
export function getCurrentUser() {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(SSO_USER_STORAGE_KEY);
    if (raw) {
      const user = JSON.parse(raw);
      if (user && user.email) return user;
    }
  } catch (e) {
    console.warn("Could not read current user:", e);
  }
  return null;
}

/**
 * Safe Base64URL decode for JWT ID Tokens
 */
export function decodeJwtPayload(token) {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    let base64Url = parts[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error("Failed to decode JWT payload:", e);
    return null;
  }
}

/**
 * Check if domain is allowed by config
 */
function isDomainAllowed(email, config) {
  if (!config.allowedDomains || config.allowedDomains.length === 0) return true;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return config.allowedDomains.some(d => d.toLowerCase() === domain);
}

/**
 * Check if domain qualifies for auto-PRO status
 */
function isAutoProDomain(email, config) {
  if (!config.autoProDomains || config.autoProDomains.length === 0) return false;
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  return config.autoProDomains.some(d => d.toLowerCase() === domain);
}

/**
 * Authenticate with Google Credential (JWT returned by Google Identity Services)
 */
export function loginWithGoogleCredential(jwtCredential) {
  try {
    const payload = decodeJwtPayload(jwtCredential);
    if (!payload || !payload.email) {
      return { success: false, error: 'Mã xác thực Google không hợp lệ hoặc đã hết hạn.' };
    }

    const config = getSsoConfig();
    if (!isDomainAllowed(payload.email, config)) {
      return { 
        success: false, 
        error: `Tên miền email của bạn (${payload.email.split('@')[1]}) không thuộc danh sách cho phép.` 
      };
    }

    const isAutoPro = isAutoProDomain(payload.email, config);

    const user = {
      id: payload.sub || `google_${Date.now()}`,
      name: payload.name || payload.email.split('@')[0],
      email: payload.email,
      avatar: payload.picture || `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(payload.email)}`,
      provider: 'google',
      isPro: isAutoPro,
      domain: payload.email.split('@')[1],
      emailVerified: payload.email_verified ?? true,
      loggedInAt: Date.now()
    };

    saveUserSession(user);
    recordLoginHistory(user);
    return { success: true, user };
  } catch (e) {
    return { success: false, error: 'Lỗi đăng nhập Google: ' + e.message };
  }
}

/**
 * Authenticate with Microsoft Profile or token
 */
export function loginWithMicrosoftProfile(msProfile) {
  try {
    if (!msProfile || !msProfile.email) {
      return { success: false, error: 'Thông tin đăng nhập Microsoft không hợp lệ.' };
    }

    const config = getSsoConfig();
    if (!isDomainAllowed(msProfile.email, config)) {
      return { 
        success: false, 
        error: `Tên miền email (${msProfile.email.split('@')[1]}) không nằm trong danh sách được phép truy cập.` 
      };
    }

    const isAutoPro = isAutoProDomain(msProfile.email, config);

    const user = {
      id: msProfile.id || `ms_${Date.now()}`,
      name: msProfile.name || msProfile.email.split('@')[0],
      email: msProfile.email,
      avatar: msProfile.avatar || `https://api.dicebear.com/7.x/shapes/svg?seed=${encodeURIComponent(msProfile.email)}`,
      provider: 'microsoft',
      isPro: isAutoPro,
      domain: msProfile.email.split('@')[1],
      loggedInAt: Date.now()
    };

    saveUserSession(user);
    recordLoginHistory(user);
    return { success: true, user };
  } catch (e) {
    return { success: false, error: 'Lỗi đăng nhập Microsoft: ' + e.message };
  }
}

/**
 * Quick Demo profiles have been removed as per user request.
 * Real OAuth credentials (Google Client ID / Microsoft) should be configured.
 */
export const DEMO_PROFILES = [];

/**
 * Disabled demo login
 */
export function loginWithDemoProfile(profileId) {
  return { success: false, error: 'Chế độ đăng nhập demo đã bị gỡ bỏ. Vui lòng cấu hình Google Client ID để đăng nhập.' };
}

/**
 * Logout current user
 */
export function logoutSsoUser() {
  try {
    localStorage.removeItem(SSO_USER_STORAGE_KEY);
    notifySsoAuthChange();
    return { success: true };
  } catch (e) {
    return { success: false, error: e.message };
  }
}

/**
 * Persist user session to localStorage
 */
function saveUserSession(user) {
  try {
    localStorage.setItem(SSO_USER_STORAGE_KEY, JSON.stringify(user));
    notifySsoAuthChange();
  } catch (e) {
    console.error("Failed to save SSO user session:", e);
  }
}

/**
 * Record login history for audit in Admin dashboard
 */
function recordLoginHistory(user) {
  try {
    const raw = localStorage.getItem(SSO_LOGIN_HISTORY_KEY);
    let history = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(history)) history = [];
    
    // Prepend new login
    history.unshift({
      id: user.id,
      name: user.name,
      email: user.email,
      provider: user.provider,
      timestamp: Date.now()
    });

    // Keep last 30 entries
    if (history.length > 30) history = history.slice(0, 30);
    localStorage.setItem(SSO_LOGIN_HISTORY_KEY, JSON.stringify(history));
  } catch (e) {
    console.warn("Could not save login history:", e);
  }
}

/**
 * Get login history
 */
export function getLoginHistory() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SSO_LOGIN_HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

/**
 * Dispatch event to notify components of auth changes
 */
function notifySsoAuthChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('sso-auth-changed'));
  }
}

/**
 * Load Google Identity Services (GIS) Script dynamically
 */
export function loadGoogleIdentityScript() {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.google?.accounts?.id) return resolve(true);

    const existingScript = document.getElementById('google-identity-services-script');
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', (e) => reject(e));
      return;
    }

    const script = document.createElement('script');
    script.id = 'google-identity-services-script';
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => resolve(true);
    script.onerror = (err) => {
      console.warn("Could not load Google Identity Services SDK:", err);
      resolve(false);
    };
    document.head.appendChild(script);
  });
}
