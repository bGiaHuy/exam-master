import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { parseExamMarkdown } from '../src/utils/markdownParser.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const sampleExamsPath = path.join(rootDir, 'src', 'data', 'sampleExams.js');

const foldersToScan = ['dbi', 'CEA', 'CSD'];

console.log('[Bắt đầu quét thư mục đề thi]...');
const allExams = [];

foldersToScan.forEach(folder => {
  const folderPath = path.join(rootDir, folder);
  if (!fs.existsSync(folderPath)) return;

  const files = fs.readdirSync(folderPath).filter(f => f.endsWith('.md'));
  files.forEach(file => {
    const fullPath = path.join(folderPath, file);
    try {
      const text = fs.readFileSync(fullPath, 'utf-8');
      if (text.includes('Câu 1') || text.includes('ĐỀ KIỂM TRA')) {
        const parsed = parseExamMarkdown(text, path.basename(file, '.md'));
        
        // Detect subject
        let subjName = folder.toUpperCase();
        if (folder.toLowerCase() === 'dbi') subjName = 'Database Systems (DBI)';
        else if (folder.toLowerCase() === 'cea') subjName = 'Computer Architecture (CEA)';
        else if (folder.toLowerCase() === 'csd') subjName = 'Data Structures (CSD)';

        const chapMatch = file.match(/Chương\s*(\d+)|Chapter\s*(\d+)/i);
        const chapNum = chapMatch ? (chapMatch[1] || chapMatch[2]) : '1';

        parsed.id = `${folder.toLowerCase()}-ch${chapNum}`;
        parsed.subject = subjName;
        parsed.chapter = `Chương ${chapNum}`;

        allExams.push(parsed);
        console.log(`+ Đã quét thấy đề: [${folder}] ${file} -> ${parsed.questions.length} câu`);
      }
    } catch (err) {
      console.error(`- Lỗi khi đọc file ${file}:`, err.message);
    }
  });
});

if (allExams.length > 0) {
  const fileContent = `// Auto-generated & managed by scripts/sync_all_exams.js\nexport const DEFAULT_EXAMS = ${JSON.stringify(allExams, null, 2)};\n`;
  fs.writeFileSync(sampleExamsPath, fileContent, 'utf-8');
  console.log(`[Thành công] Đã đồng bộ ${allExams.length} đề thi vào database ứng dụng!`);
} else {
  console.log('[Thông báo] Không tìm thấy file đề thi mới nào.');
}
