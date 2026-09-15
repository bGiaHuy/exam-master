/**
 * Subscription and Quota Manager (Cryptographically Signed & Anti-Tamper)
 * Free tier: 3 AI essay question/grading uses per day
 * Pro tier: Unlimited AI uses - Requires verified VIP License Key
 */
import { 
  signSubscriptionData, 
  verifySubscriptionData, 
  isValidVipLicenseKey,
  verifySymmetricLicenseKey 
} from './cryptoSecurity.js';

export const MAX_FREE_DAILY_USES = 3;
export const PRO_PRICE_USD = 3;
export const PRO_PRICE_VND = 75000;

export function getLocalDateString() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getSubscriptionStatus() {
  if (typeof window === 'undefined') {
    return {
      isPro: false,
      planName: 'Gói Miễn Phí',
      usesToday: 0,
      maxUses: MAX_FREE_DAILY_USES,
      remainingUses: MAX_FREE_DAILY_USES,
      expiresAt: null
    };
  }

  // 1. Check PRO status with cryptographic signature validation
  let isPro = false;
  let expiresAt = null;
  try {
    const rawPro = localStorage.getItem('exam_pro_subscription');
    if (rawPro) {
      const proData = JSON.parse(rawPro);
      if (proData && proData.isPro) {
        if (verifySubscriptionData(proData)) {
          if (!proData.expiresAt || proData.expiresAt > Date.now()) {
            isPro = true;
            expiresAt = proData.expiresAt;
          } else {
            // Expired
            localStorage.removeItem('exam_pro_subscription');
          }
        } else {
          // Tampered signature or old insecure entry
          console.warn("Invalid or tampered Pro subscription signature detected. Reverting to free.");
          localStorage.removeItem('exam_pro_subscription');
        }
      }
    }
  } catch (e) {
    console.warn("Error reading pro subscription:", e);
  }

  // 2. Check Daily Usage for today
  const todayStr = getLocalDateString();
  let usesToday = 0;
  try {
    const rawUsage = localStorage.getItem('exam_daily_ai_usage');
    if (rawUsage) {
      const usageData = JSON.parse(rawUsage);
      if (usageData.date === todayStr) {
        usesToday = typeof usageData.count === 'number' ? usageData.count : 0;
      }
    }
  } catch (e) {
    console.warn("Error reading daily AI usage:", e);
  }

  const remainingUses = isPro ? Infinity : Math.max(0, MAX_FREE_DAILY_USES - usesToday);

  return {
    isPro,
    planName: isPro ? 'Gói PRO Unlimited' : 'Gói Miễn Phí (Free)',
    usesToday,
    maxUses: isPro ? 'Không giới hạn' : MAX_FREE_DAILY_USES,
    remainingUses,
    expiresAt,
    todayDate: todayStr
  };
}

export function canUseAIEssay() {
  const status = getSubscriptionStatus();
  return status.isPro || status.remainingUses > 0;
}

export function consumeAIEssayUse() {
  const status = getSubscriptionStatus();

  if (status.isPro) {
    return {
      success: true,
      isPro: true,
      remainingUses: Infinity,
      usesToday: status.usesToday
    };
  }

  if (status.remainingUses <= 0) {
    return {
      success: false,
      reason: 'QUOTA_EXCEEDED',
      isPro: false,
      remainingUses: 0,
      usesToday: status.usesToday
    };
  }

  const todayStr = getLocalDateString();
  const newCount = status.usesToday + 1;

  try {
    localStorage.setItem('exam_daily_ai_usage', JSON.stringify({
      date: todayStr,
      count: newCount
    }));
  } catch (e) {
    console.warn("Error writing daily usage:", e);
  }

  notifySubscriptionChange();

  return {
    success: true,
    isPro: false,
    remainingUses: Math.max(0, MAX_FREE_DAILY_USES - newCount),
    usesToday: newCount
  };
}

/**
 * Activate Pro using a verified VIP Symmetric License Key
 */
export function activateProWithLicenseKey(inputKey, allowedCodesList = []) {
  if (!inputKey || typeof inputKey !== 'string') {
    return { success: false, error: 'Vui lòng nhập mã kích hoạt VIP.' };
  }

  const result = verifySymmetricLicenseKey(inputKey, allowedCodesList);
  if (!result.isValid) {
    return { 
      success: false, 
      error: 'Mã bản quyền không hợp lệ hoặc sai chữ ký đối xứng. Vui lòng liên hệ Admin để nhận mã chính thức.' 
    };
  }

  const days = result.days || 30;
  const cleanCode = inputKey.trim().toUpperCase();
  const planLabel = result.plan === 'LIFE' ? 'Trọn Đời (Vĩnh Viễn)' : `${days} ngày`;
  const status = upgradeToPro(days, cleanCode);

  return { 
    success: true, 
    status, 
    days,
    message: `🎉 Kích hoạt thành công gói PRO ${planLabel} với mã đối xứng hợp lệ!` 
  };
}

/**
 * Internal secure Pro upgrade with cryptographic signature
 */
export function upgradeToPro(days = 30, licenseCode = 'ADMIN-AUTH') {
  const now = Date.now();
  const expiresAt = days >= 3650 ? now + 10 * 365 * 24 * 60 * 60 * 1000 : now + days * 24 * 60 * 60 * 1000;
  const proData = {
    isPro: true,
    plan: days >= 3650 ? 'PRO_LIFETIME' : `PRO_${days}D`,
    priceUsd: PRO_PRICE_USD,
    licenseCode,
    activatedAt: now,
    expiresAt
  };

  proData.signature = signSubscriptionData(proData);

  try {
    localStorage.setItem('exam_pro_subscription', JSON.stringify(proData));
  } catch (e) {
    console.warn("Error saving pro subscription:", e);
  }

  notifySubscriptionChange();
  return getSubscriptionStatus();
}

export function downgradeToFree() {
  try {
    localStorage.removeItem('exam_pro_subscription');
  } catch (e) {
    console.warn("Error downgrading to free:", e);
  }

  notifySubscriptionChange();
  return getSubscriptionStatus();
}

export function resetDailyUsage() {
  try {
    localStorage.removeItem('exam_daily_ai_usage');
  } catch (e) {}
  notifySubscriptionChange();
  return getSubscriptionStatus();
}

function notifySubscriptionChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('subscription-changed'));
  }
}
