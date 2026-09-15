/**
 * API Configuration and Key Management
 * - Detects DeepSeek (sk-...) vs Google Gemini (AIzaSy...)
 * - Prevents raw key leakage in public bundles
 * - Respects BYOK (Bring Your Own Key) for free users
 * - Provides system key only for verified VIP Pro or Admin sessions
 */
import { deobfuscateString, obfuscateString } from '../utils/cryptoSecurity.js';

const SYSTEM_API_KEY_STORAGE = 'exam_admin_system_api_key_enc';

/**
 * Get active API key for current context
 */
export function getActiveApiKey() {
  if (typeof window === 'undefined') return '';

  // 1. User's personal API key (highest priority)
  const userKey = localStorage.getItem('ai_api_key') || localStorage.getItem('gemini_api_key');
  if (userKey && userKey.trim().length > 6) {
    return userKey.trim();
  }

  // 2. System API key (only accessible if Admin or Pro subscriber)
  try {
    const rawPro = localStorage.getItem('exam_pro_subscription');
    const rawAdmin = localStorage.getItem('exam_admin_auth');
    const isPro = rawPro && JSON.parse(rawPro)?.isPro === true;
    const isAdmin = rawAdmin && JSON.parse(rawAdmin)?.signature;

    if (isPro || isAdmin) {
      const encKey = localStorage.getItem(SYSTEM_API_KEY_STORAGE);
      if (encKey) {
        const decrypted = deobfuscateString(encKey);
        if (decrypted && decrypted.trim().length > 6) {
          return decrypted.trim();
        }
      }
    }
  } catch (e) {
    // Ignore storage parse errors
  }

  return '';
}

/**
 * Save System API Key (Called by Admin in Admin Dashboard)
 */
export function setSystemApiKey(rawKey) {
  if (typeof window === 'undefined') return;
  if (!rawKey || !rawKey.trim()) {
    localStorage.removeItem(SYSTEM_API_KEY_STORAGE);
    return;
  }
  const enc = obfuscateString(rawKey.trim());
  localStorage.setItem(SYSTEM_API_KEY_STORAGE, enc);
}

/**
 * Get masked System API Key for Admin display (e.g. sk-368e••••••••••••••••0ef)
 */
export function getMaskedSystemApiKey() {
  if (typeof window === 'undefined') return '';
  const encKey = localStorage.getItem(SYSTEM_API_KEY_STORAGE);
  if (!encKey) return '';
  const decrypted = deobfuscateString(encKey);
  if (!decrypted || decrypted.length < 8) return '';
  const start = decrypted.slice(0, 7);
  const end = decrypted.slice(-4);
  return `${start}${'•'.repeat(Math.max(8, decrypted.length - 11))}${end}`;
}

/**
 * Detect provider from key structure
 */
export function detectProvider(key) {
  if (!key) return 'none';
  const clean = key.trim();
  if (clean.startsWith('sk-')) return 'deepseek';
  if (clean.startsWith('AIzaSy')) return 'gemini';
  return 'deepseek';
}
