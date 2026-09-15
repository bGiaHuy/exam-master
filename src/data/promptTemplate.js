// ============================================================
// PPTX_EXAM_PROMPT - Prompt chuẩn để nhờ AI gen đề trắc nghiệm
// Parser target: markdownParser.js (parseExamMarkdown)
// QUAN TRỌNG: Mọi thay đổi phải giữ nguyên format parser nhận diện được
// ============================================================

export const PPTX_EXAM_PROMPT = `Bạn là một chuyên gia khảo thí đại học kỳ cựu. Tôi gửi kèm file slide bài giảng (PowerPoint .pptx). Hãy đọc kỹ và soạn bộ đề kiểm tra trắc nghiệm chuyên sâu từ 30-50 câu bằng Tiếng Việt.

===================================================
QUY TAC BAT BUOC (DOC TRUOC KHI SOAN)
===================================================
1. Chi xuat DUY NHAT noi dung Markdown ben duoi. KHONG them bat ky dong chu thich, loi mo dau, loi ket, hay giai thich nao ben ngoai phan Markdown.
2. Cau hoi BAT BUOC danh so: "Câu 1." "Câu 2." ... (chu "Câu", khoang trang, so, DAU CHAM — KHONG dung dau hai cham, dau ngoac, ky tu in dam **)
3. Phuong an BAT BUOC theo mau: "* A." "* B." "* C." "* D." (dau sao, khoang trang, chu hoa, DAU CHAM — KHONG dung dau ngoac don, dau gach ngang)
4. Bang dap an BAT BUOC khong co header "Câu" — chi co so va chu (xem mau ben duoi)
5. Giai thich BAT BUOC theo mau: "* **Câu N (X):** noi dung" (N = so cau, X = chu dap an dung)
===================================================

--- BAT DAU OUTPUT ---

# ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG [SỐ] – [TÊN CHƯƠNG VIẾT HOA]

Môn: [Tên môn học đầy đủ, ví dụ: Computer Organization and Architecture (CEA)]
Cấu trúc: [N] câu trắc nghiệm | 4 mức độ nhận thức | Kèm đáp án và giải thích chi tiết

# PHẦN 1: MỨC ĐỘ NHẬN BIẾT (CÂU 1 – 12)

Câu 1. Kiến trúc Von Neumann mô tả máy tính bao gồm những thành phần cơ bản nào?
* A. CPU, bộ nhớ chính, thiết bị vào/ra và bus hệ thống
* B. Màn hình, bàn phím, chuột và loa
* C. Chỉ CPU và RAM
* D. Ổ cứng, card màn hình và nguồn điện

Câu 2. [Nội dung câu hỏi nhận biết thứ 2]?
* A. [Phương án A]
* B. [Phương án B]
* C. [Phương án C]
* D. [Phương án D]

(Tiếp tục Câu 3 đến Câu 12 theo đúng mẫu "Câu N." và "* X." như trên)

# PHẦN 2: MỨC ĐỘ THÔNG HIỂU (CÂU 13 – 25)

Câu 13. [Nội dung câu hỏi thông hiểu — so sánh, phân biệt bản chất]?
* A. [Phương án A]
* B. [Phương án B]
* C. [Phương án C]
* D. [Phương án D]

(Tiếp tục Câu 14 đến Câu 25 theo đúng mẫu)

# PHẦN 3: MỨC ĐỘ VẬN DỤNG (CÂU 26 – 38)

Câu 26. [Nội dung câu hỏi vận dụng — tính toán, tình huống kỹ thuật]?
* A. [Phương án A]
* B. [Phương án B]
* C. [Phương án C]
* D. [Phương án D]

(Tiếp tục Câu 27 đến Câu 38 theo đúng mẫu)

# PHẦN 4: MỨC ĐỘ VẬN DỤNG CAO (CÂU 39 – 50)

Câu 39. [Nội dung câu hỏi vận dụng cao — tổng hợp, phân tích đa thành phần]?
* A. [Phương án A]
* B. [Phương án B]
* C. [Phương án C]
* D. [Phương án D]

(Tiếp tục Câu 40 đến Câu 50 theo đúng mẫu)

# BẢNG ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT

## BẢNG ĐÁP ÁN

| 1 | A | 11 | B | 21 | C | 31 | D | 41 | A |
| 2 | B | 12 | A | 22 | B | 32 | C | 42 | B |
| 3 | C | 13 | D | 23 | A | 33 | A | 43 | C |
| 4 | A | 14 | C | 24 | B | 34 | B | 44 | D |
| 5 | D | 15 | B | 25 | D | 35 | D | 45 | B |
| 6 | B | 16 | A | 26 | C | 36 | C | 46 | A |
| 7 | C | 17 | D | 27 | B | 37 | A | 47 | C |
| 8 | A | 18 | B | 28 | A | 38 | B | 48 | B |
| 9 | D | 19 | C | 29 | D | 39 | D | 49 | A |
| 10 | B | 20 | A | 30 | C | 40 | B | 50 | C |

## GIẢI THÍCH CHI TIẾT

* **Câu 1 (A):** Kiến trúc Von Neumann định nghĩa máy tính gồm 4 thành phần: CPU (xử lý), bộ nhớ chính (lưu lệnh & dữ liệu chung), thiết bị vào/ra và bus kết nối. Các phương án B, C, D mô tả thiết bị ngoại vi hoặc thiếu thành phần cốt lõi.
* **Câu 2 (B):** [Giải thích vì sao đáp án đúng, bản chất kiến thức, và vì sao các phương án kia sai — 2-3 câu ngắn gọn].
* **Câu 3 (C):** [Giải thích tương tự...].

(Tiếp tục giải thích ĐỦ từ Câu 1 đến Câu cuối cùng theo đúng mẫu "* **Câu N (X):**")

--- KẾT THÚC OUTPUT ---

NHAC LAI LAN CUOI: Sau dong "--- KẾT THÚC OUTPUT ---" KHONG duoc them bat ky van ban nao. Thay the tat ca noi dung trong dau [] bang noi dung thuc tu slide. Giu nguyen 100% ky hieu "Câu N." va "* X." — khong duoc thay doi.`;


// ============================================================
// EXAM_GEN_SYSTEM_PROMPT - System prompt khi gọi API trực tiếp
// ============================================================
export const EXAM_GEN_SYSTEM_PROMPT = `Bạn là chuyên gia khảo thí. Chỉ xuất nội dung Markdown thuần túy theo đúng format được yêu cầu. Không thêm bất kỳ văn bản, lời giải thích hay nhận xét nào ngoài phần Markdown.

FORMAT CHUẨN BẮT BUỘC:
- Câu hỏi: "Câu N. nội dung?" (N là số nguyên, sau N là DẤU CHẤM)
- Phương án: "* A. nội dung" / "* B. nội dung" / "* C. nội dung" / "* D. nội dung"
- Bảng đáp án: "| 1 | A | 2 | B | ..." (KHÔNG có header "Câu/Đáp án" — chỉ số và chữ)
- Giải thích: "* **Câu N (X):** nội dung" (X là chữ đáp án đúng in hoa)`;
