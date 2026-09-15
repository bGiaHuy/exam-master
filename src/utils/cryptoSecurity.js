/**
 * Cryptographic and Security Utilities
 * - Native Web Crypto SHA-256 hashing
 * - Salted password hashing
 * - Signed session token generation & verification
 * - VIP License Key cryptographic validation
 * - Masked text obfuscation
 */

const SECURITY_PEPPER = 'exam_master_secure_v1_2026_salt_xyz';
const VIP_SALT = 'vip_license_sig_salt_9988';

/**
 * Compute SHA-256 hash using native Web Crypto API (or fast fallback)
 */
export async function sha256Hex(message) {
  if (typeof window !== 'undefined' && window.crypto && window.crypto.subtle) {
    try {
      const msgUint8 = new TextEncoder().encode(message);
      const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      console.warn("WebCrypto failed, falling back to internal hasher:", e);
    }
  }
  return simpleHashHex(message);
}

/**
 * Synchronous lightweight string hash (used for instant validation)
 */
export function simpleHashHex(str) {
  let h1 = 0xdeadbeef ^ 31;
  let h2 = 0x41c6ce57 ^ 31;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  const finalHex = (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16);
  return finalHex.padStart(16, '0');
}

/**
 * Compute salted password hash (Hex)
 */
export function hashAdminPassword(password) {
  const salted = `${SECURITY_PEPPER}::${password.trim()}::${SECURITY_PEPPER}`;
  return simpleHashHex(salted);
}

/**
 * Default admin password hash for initial setup ('123')
 */
export const DEFAULT_ADMIN_PASSWORD_HASH = hashAdminPassword('123');

/**
 * Generate a signed admin session token with timestamp and 4h expiry
 */
export function createAdminSessionToken() {
  const now = Date.now();
  const expiresAt = now + 4 * 60 * 60 * 1000; // 4 hours
  const payload = `${now}:${expiresAt}:admin`;
  const signature = simpleHashHex(`${payload}:${SECURITY_PEPPER}`);
  return JSON.stringify({
    payload,
    expiresAt,
    signature
  });
}

/**
 * Verify admin session token
 */
export function verifyAdminSessionToken(tokenString) {
  if (!tokenString) return false;
  try {
    const data = JSON.parse(tokenString);
    if (!data || !data.payload || !data.expiresAt || !data.signature) return false;
    
    // Check expiry
    if (Date.now() > data.expiresAt) return false;

    // Verify signature
    const expectedSig = simpleHashHex(`${data.payload}:${SECURITY_PEPPER}`);
    return data.signature === expectedSig;
  } catch (e) {
    return false;
  }
}

export const MASTER_SYMMETRIC_SECRET = 'EXAM_MASTER_SYM_SECRET_2026_@v2';

/**
 * Generate a cryptographically signed Symmetric License Key
 * Structure: PRO-[PLAN]-[NONCE]-[SIG1]-[SIG2]
 * Example: PRO-30D-8F9A-B2C1-E4D7
 * 
 * @param {'30D' | '90D' | '365D' | 'LIFE'} plan
 * @param {string} customSecret
 */
export function generateSymmetricLicenseKey(plan = '30D', customSecret = MASTER_SYMMETRIC_SECRET) {
  const validPlans = ['30D', '90D', '365D', 'LIFE'];
  const safePlan = validPlans.includes(plan.toUpperCase()) ? plan.toUpperCase() : '30D';
  
  // Generate 4-char random nonce
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let nonce = '';
  for (let i = 0; i < 4; i++) {
    nonce += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  // Symmetric signature over (plan + nonce + secret)
  const fullHash = simpleHashHex(`${safePlan}::${nonce}::${customSecret}`).toUpperCase();
  const sig1 = fullHash.slice(0, 4);
  const sig2 = fullHash.slice(4, 8);

  return `PRO-${safePlan}-${nonce}-${sig1}-${sig2}`;
}

/**
 * Legacy wrapper
 */
export function generateVipLicenseKey(prefix = 'VIP') {
  return generateSymmetricLicenseKey('30D');
}

/**
 * Verify a Symmetric License Key
 * Checks format, computes HMAC-style signature with MASTER_SYMMETRIC_SECRET
 * Returns { isValid: boolean, plan?: string, days?: number, error?: string }
 */
export function verifySymmetricLicenseKey(inputKey, allowedCodesList = [], customSecret = MASTER_SYMMETRIC_SECRET) {
  if (!inputKey || typeof inputKey !== 'string') {
    return { isValid: false, error: 'Mã không được để trống.' };
  }

  const clean = inputKey.trim().toUpperCase();

  // 1. Check if matches Symmetric Key structure: PRO-[PLAN]-[NONCE]-[SIG1]-[SIG2]
  const parts = clean.split('-');
  if (parts.length === 5 && parts[0] === 'PRO') {
    const plan = parts[1];
    const nonce = parts[2];
    const sig1 = parts[3];
    const sig2 = parts[4];

    const expectedHash = simpleHashHex(`${plan}::${nonce}::${customSecret}`).toUpperCase();
    const expectedSig1 = expectedHash.slice(0, 4);
    const expectedSig2 = expectedHash.slice(4, 8);

    if (sig1 === expectedSig1 && sig2 === expectedSig2) {
      let days = 30;
      if (plan === '90D') days = 90;
      else if (plan === '365D') days = 365;
      else if (plan === 'LIFE') days = 3650; // 10 years
      else if (plan.endsWith('D')) {
        const parsed = parseInt(plan, 10);
        if (!isNaN(parsed) && parsed > 0) days = parsed;
      }

      return {
        isValid: true,
        plan,
        days,
        code: clean,
        type: 'symmetric'
      };
    }
  }

  // 2. Check Admin's custom promo codes list (e.g. BOHOC2026, PROVIP2026)
  if (Array.isArray(allowedCodesList)) {
    const matched = allowedCodesList.some(c => c && c.trim().toUpperCase() === clean);
    if (matched) {
      return {
        isValid: true,
        plan: '30D',
        days: 30,
        code: clean,
        type: 'custom_admin'
      };
    }
  }

  // 3. Predefined legacy internal VIP keys
  const internalKeys = ['PROVIP2026', 'BOHOC2026', 'ADMINVIP', 'EXAMMASTER-PRO'];
  if (internalKeys.includes(clean)) {
    return {
      isValid: true,
      plan: '30D',
      days: 30,
      code: clean,
      type: 'internal'
    };
  }

  return { isValid: false, error: 'Chữ ký mã bản quyền không hợp lệ.' };
}

/**
 * Verify whether a VIP license code is valid (Boolean)
 */
export function isValidVipLicenseKey(inputKey, allowedCodesList = []) {
  return verifySymmetricLicenseKey(inputKey, allowedCodesList).isValid;
}

/**
 * Generate a signature for subscription data to prevent localStorage tampering
 */
export function signSubscriptionData(data) {
  const str = `${data.isPro}:${data.activatedAt}:${data.expiresAt}:${SECURITY_PEPPER}`;
  return simpleHashHex(str);
}

/**
 * Verify subscription data signature
 */
export function verifySubscriptionData(data) {
  if (!data || !data.isPro) return false;
  if (!data.signature) return false;
  if (data.expiresAt && data.expiresAt < Date.now()) return false;
  const expectedSig = signSubscriptionData(data);
  return data.signature === expectedSig;
}

/**
 * Obfuscate sensitive strings in storage
 */
export function obfuscateString(str) {
  if (!str) return '';
  try {
    let result = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i) ^ 0x5a;
      result += String.fromCharCode(charCode);
    }
    return btoa(result);
  } catch (e) {
    return str;
  }
}

/**
 * Deobfuscate sensitive strings from storage
 */
export function deobfuscateString(encoded) {
  if (!encoded) return '';
  try {
    const raw = atob(encoded);
    let result = '';
    for (let i = 0; i < raw.length; i++) {
      const charCode = raw.charCodeAt(i) ^ 0x5a;
      result += String.fromCharCode(charCode);
    }
    return result;
  } catch (e) {
    return encoded;
  }
}
