# QUY TẮC TỰ ĐỘNG THÊM ĐỀ THI VÀO DATABASE CHO HỆ THỐNG EXAMMASTER

> ⛔ **QUY TẮC BẢO VỆ TOKEN / API CỦA NGƯỜI DÙNG (CỰC KỲ QUAN TRỌNG):**
> 1. TUYỆT ĐỐI KHÔNG sử dụng các API Key mà người dùng cung cấp để gọi AI sinh đề hoặc import đề thi.
> 2. Các API Key của người dùng (trong `kimchiAIapi.md` hay cài đặt) CHỈ ĐƯỢC PHÉP DÙNG DUY NHẤT CHO TÍNH NĂNG CHẤM BÀI TỰ LUẬN (Essay Mistake Review).
> 3. Toàn bộ quá trình import, bóc tách và nạp đề vào database của hệ thống BẮT BUỘC thực hiện 100% bằng script regex nội bộ (`scripts/add_exam.js` hoặc `scripts/sync_all_exams.js`), hoàn toàn offline và không tiêu tốn API token.

Khi người dùng yêu cầu:
- "Hãy thêm đề môn [Tên môn] chapter [Số chương]..."
- "Thêm đề [Môn] chương [Số] vào database..."
- "Tạo đề [Môn] chapter [Số] rồi add vào web..."

HÃY THỰC HIỆN CHÍNH XÁC QUY TRÌNH TỰ ĐỘNG SAU:

### Bước 1: Kiểm tra nguồn tài liệu hoặc file đề có sẵn
1. Kiểm tra trong thư mục môn học: `c:/Users/Administrator/Documents/Codespace/exam/[môn]/` (ví dụ `dbi/`, `CEA/`, `CSD/`).
2. Nếu chưa có file markdown đề thi sẵn:
   - Kiểm tra các slide hoặc giáo trình tương ứng trong `c:/Users/Administrator/Downloads/Documents/` (ví dụ `Downloads/Documents/1_CEA201/Slides` cho môn CEA, `Downloads/Documents/dbi` cho môn DBI).
   - Tiến hành biên soạn bộ đề kiểm tra trắc nghiệm chuyên sâu (thường từ 30 đến 50 câu) bằng tiếng Việt theo đúng cấu trúc chuẩn:
     - Header: `# **ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG X – ...**`
     - Phân bổ 4 mức độ nhận thức: Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao.
     - Mỗi câu có 4 đáp án `A`, `B`, `C`, `D`.
     - Cuối đề có bảng đáp án chuẩn:
       ```markdown
       # **BẢNG ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT**
       ## **BẢNG ĐÁP ÁN**
       | Câu | ĐA | Câu | ĐA | Câu | ĐA | Câu | ĐA | Câu | ĐA |
       | 1 | A | ... |
       ## **GIẢI THÍCH CHI TIẾT**
       * **Câu 1 (A):** Giải thích chi tiết bản chất...
       ```
   - Lưu file vào thư mục tương ứng của môn, ví dụ: `c:/Users/Administrator/Documents/Codespace/exam/CEA/Đề kiểm tra trắc nghiệm CEA - Chương 1.md`.

### Bước 2: Tự động chạy lệnh nạp đề vào database
Chạy lệnh PowerShell tại thư mục gốc:
```powershell
node scripts/add_exam.js "<đường dẫn file .md vừa tạo>" "[Tên Môn Học Đầy Đủ]" "Chương [X]"
```
Hoặc:
```powershell
npm run sync-exams
```

### Bước 3: Xác nhận với người dùng
- Báo cáo số lượng câu hỏi đã nạp vào hệ thống.
- Báo người dùng chỉ cần chuyển sang trình duyệt tại `http://localhost:5173/` (hoặc F5 lại trang) là đề mới đã xuất hiện ngay trong danh sách chọn đề ở góc trên màn hình để bố học!
