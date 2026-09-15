#!/usr/bin/env node
/**
 * =======================================================
 *   ExamMaster Pro - License Key Generator
 *   by @huygia219
 * =======================================================
 * Usage:
 *   node genkey.js              -> menu tuong tac
 *   node genkey.js 30D          -> 1 key 30 ngay
 *   node genkey.js LIFE 5       -> 5 key tron doi
 *   node genkey.js verify KEY   -> kiem tra key
 */

const MASTER_SECRET = 'EXAM_MASTER_SYM_SECRET_2026_@v2';
const CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

const C = {
  reset:  '\x1b[0m',  bold:   '\x1b[1m',
  cyan:   '\x1b[36m', green:  '\x1b[32m',
  yellow: '\x1b[33m', red:    '\x1b[31m',
  purple: '\x1b[35m', gray:   '\x1b[90m',
  white:  '\x1b[97m',
};

function simpleHashHex(str) {
  let h1 = 0xdeadbeef ^ 31, h2 = 0x41c6ce57 ^ 31;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)).toString(16).padStart(16, '0');
}

function generateKey(plan) {
  const p = ['30D','90D','365D','LIFE'].includes(plan.toUpperCase()) ? plan.toUpperCase() : '30D';
  let nonce = '';
  for (let i = 0; i < 4; i++) nonce += CHARS[Math.floor(Math.random() * CHARS.length)];
  const hash = simpleHashHex(`${p}::${nonce}::${MASTER_SECRET}`).toUpperCase();
  return `PRO-${p}-${nonce}-${hash.slice(0,4)}-${hash.slice(4,8)}`;
}

function verifyKey(input) {
  const c = input.trim().toUpperCase();
  const p = c.split('-');
  if (p.length < 5 || p[0] !== 'PRO') return { valid: false };
  const exp = simpleHashHex(`${p[1]}::${p[2]}::${MASTER_SECRET}`).toUpperCase();
  if (exp.slice(0,4) === p[3] && exp.slice(4,8) === p[4]) {
    const days = {'30D':30,'90D':90,'365D':365,'LIFE':3650}[p[1]] || 30;
    return { valid: true, plan: p[1], days, key: c };
  }
  return { valid: false };
}

const PLAN_LABELS = { '30D': '30 ngay', '90D': '90 ngay', '365D': '1 nam', 'LIFE': 'Tron Doi' };

function header() {
  console.log('');
  console.log(`${C.cyan}${C.bold}+=======================================================+${C.reset}`);
  console.log(`${C.cyan}${C.bold}|   ExamMaster Pro -- License Key Generator             |${C.reset}`);
  console.log(`${C.cyan}${C.bold}|   Telegram: ${C.yellow}@huygia219${C.cyan}                                |${C.reset}`);
  console.log(`${C.cyan}${C.bold}+=======================================================+${C.reset}`);
  console.log('');
}

function printKeys(plan, count) {
  const label = PLAN_LABELS[plan.toUpperCase()] || plan;
  console.log(`${C.green}${C.bold}  [GOI: ${plan}] ${label} -- ${count} key:${C.reset}`);
  console.log(`${C.gray}  ${'─'.repeat(50)}${C.reset}`);
  for (let i = 0; i < count; i++) {
    const key = generateKey(plan);
    console.log(`  ${C.bold}${String(i+1).padStart(2,' ')}.${C.reset}  ${C.green}${key}${C.reset}`);
  }
  console.log(`${C.gray}  ${'─'.repeat(50)}${C.reset}`);
  console.log(`${C.gray}  Copy va gui qua Telegram @huygia219${C.reset}`);
  console.log('');
}

// CLI args mode
const args = process.argv.slice(2);

if (args[0] === 'verify' || args[0] === 'v') {
  header();
  const key = args[1] || '';
  if (!key) { console.log(`  ${C.red}Dung: node genkey.js verify PRO-LIFE-XXXX-XXXX-XXXX${C.reset}\n`); process.exit(1); }
  const r = verifyKey(key);
  if (r.valid) {
    console.log(`  ${C.green}${C.bold}[OK] HOP LE${C.reset}`);
    console.log(`  Goi : ${C.yellow}${PLAN_LABELS[r.plan]}${C.reset}`);
    console.log(`  Ngay: ${r.days} ngay`);
    console.log(`  Key : ${C.green}${r.key}${C.reset}`);
  } else {
    console.log(`  ${C.red}${C.bold}[X] KHONG HOP LE -- Ma sai hoac bi chinh sua${C.reset}`);
  }
  console.log('');
  process.exit(0);
}

if (args.length > 0) {
  // Quick mode: node genkey.js LIFE 5
  const plan = args[0].toUpperCase();
  const count = Math.max(1, Math.min(50, parseInt(args[1]) || 1));
  header();
  printKeys(plan, count);
  process.exit(0);
}

// Interactive mode
const readline = require('readline');
function interactiveMode() {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ask = q => new Promise(r => rl.question(q, r));

  (async () => {
    header();
    console.log(`  ${C.green}[1]${C.reset} Sinh ma ban quyen`);
    console.log(`  ${C.purple}[2]${C.reset} Xac minh ma ban quyen`);
    console.log(`  ${C.gray}[0]${C.reset} Thoat`);
    console.log('');

    const choice = (await ask(`${C.bold}  Chon > ${C.reset}`)).trim();
    rl.close();

    if (choice === '1') {
      const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
      const ask2 = q => new Promise(r => rl2.question(q, r));
      console.log('');
      console.log(`  [1] 30 ngay  [2] 90 ngay  [3] 1 nam  [4] Tron Doi`);
      const pc = (await ask2(`${C.bold}  Chon goi > ${C.reset}`)).trim();
      const plan = { '1':'30D','2':'90D','3':'365D','4':'LIFE' }[pc] || '30D';
      const cs = await ask2(`${C.bold}  So luong (mac dinh 1) > ${C.reset}`);
      const count = Math.max(1, Math.min(50, parseInt(cs) || 1));
      rl2.close();
      console.log('');
      printKeys(plan, count);
      setTimeout(interactiveMode, 100);

    } else if (choice === '2') {
      const rl2 = readline.createInterface({ input: process.stdin, output: process.stdout });
      const ask2 = q => new Promise(r => rl2.question(q, r));
      console.log('');
      const input = await ask2(`${C.bold}  Nhap ma > ${C.reset}`);
      rl2.close();
      const r = verifyKey(input);
      console.log('');
      if (r.valid) {
        console.log(`  ${C.green}${C.bold}[OK] HOP LE${C.reset}`);
        console.log(`  Goi : ${C.yellow}${PLAN_LABELS[r.plan]}${C.reset}  (${r.days} ngay)`);
        console.log(`  Key : ${C.green}${r.key}${C.reset}`);
      } else {
        console.log(`  ${C.red}${C.bold}[X] KHONG HOP LE${C.reset}`);
      }
      console.log('');
      setTimeout(interactiveMode, 100);

    } else if (choice === '0') {
      console.log(`\n  ${C.gray}Tam biet! -- @huygia219${C.reset}\n`);
    } else {
      setTimeout(interactiveMode, 100);
    }
  })();
}

interactiveMode();
