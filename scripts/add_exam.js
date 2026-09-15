import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseExamMarkdown } from '../src/utils/markdownParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sampleExamsPath = path.join(rootDir, 'src', 'data', 'sampleExams.js');

const args = process.argv.slice(2);
if (args.length === 0) {
  console.log(`
Usage:
  node scripts/add_exam.js <file_path.md> [subject_name] [chapter_name]

Example:
  node scripts/add_exam.js "CEA/De_Kiem_Tra_CEA_Ch1.md" "Computer Architecture (CEA)" "Chương 1"
`);
  process.exit(1);
}

const inputFilePath = path.resolve(rootDir, args[0]);
if (!fs.existsSync(inputFilePath)) {
  console.error(`[Error] File not found: ${inputFilePath}`);
  process.exit(1);
}

const rawText = fs.readFileSync(inputFilePath, 'utf-8');
const fileName = path.basename(inputFilePath, path.extname(inputFilePath));

const parsed = parseExamMarkdown(rawText, fileName);

const subject = args[1] || parsed.subject || 'Kiến thức chung';
const chapter = args[2] || (fileName.match(/Chương\s*\d+|Chapter\s*\d+/i)?.[0] || 'Chương mới');

// Form a stable ID
const cleanSubj = subject.toLowerCase().replace(/[^a-z0-9]/g, '');
const cleanChap = chapter.toLowerCase().replace(/[^a-z0-9]/g, '');
parsed.id = `${cleanSubj || 'subj'}-${cleanChap || Date.now()}`;
parsed.subject = subject;
parsed.chapter = chapter;

// Read existing sampleExams.js
let existingExams = [];
if (fs.existsSync(sampleExamsPath)) {
  const content = fs.readFileSync(sampleExamsPath, 'utf-8');
  const jsonMatch = content.match(/export const DEFAULT_EXAMS = (\[[\s\S]*\]);/);
  if (jsonMatch) {
    try {
      existingExams = JSON.parse(jsonMatch[1]);
    } catch (e) {
      console.warn("Could not parse existing exams JSON, initializing new list");
    }
  }
}

// Upsert
const existingIdx = existingExams.findIndex(e => e.id === parsed.id || e.title === parsed.title);
if (existingIdx >= 0) {
  existingExams[existingIdx] = parsed;
  console.log(`[Cập nhật] Đã cập nhật lại đề: "${parsed.title}" (ID: ${parsed.id})`);
} else {
  existingExams.push(parsed);
  console.log(`[Thêm mới] Đã thêm thành công đề: "${parsed.title}" (ID: ${parsed.id})`);
}

// Write back
const newFileContent = `// Auto-generated & managed by scripts/add_exam.js\nexport const DEFAULT_EXAMS = ${JSON.stringify(existingExams, null, 2)};\n`;
fs.writeFileSync(sampleExamsPath, newFileContent, 'utf-8');

console.log(`[Hoàn tất] Tổng số đề hiện có trong hệ thống: ${existingExams.length}`);
console.log(`- Đề vừa nạp: ${parsed.questions.length} câu hỏi, đầy đủ đáp án & giải thích.`);
