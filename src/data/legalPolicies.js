/**
 * ExamMaster Legal & Policy Repository
 * - Terms of Service
 * - Privacy Policy
 * - Payment, Subscription & Refund Policy
 * - Acceptable Use & AI Disclaimer
 * - User Rights & Account/Data Deletion Policy
 * - Local Storage & Cookie Notice
 * 
 * Complies with actual codebase behavior:
 * - Purely client-side SPA (no remote database)
 * - LocalStorage data persistence
 * - AI integration via DeepSeek & Google Gemini APIs
 * - Manual payment model via bank transfer & license key activation (No automated recurring card charges)
 */

export const LEGAL_METADATA = {
  effectiveDate: '15/09/2026',
  lastUpdated: '15/09/2026',
  version: '1.0.0',
  supportTelegram: '@huygia219',
  telegramUrl: 'https://t.me/huygia219'
};

export const LEGAL_POLICIES = {
  terms: {
    id: 'terms',
    title: 'Điều Khoản Dịch Vụ',
    subtitle: 'Quy định sử dụng nền tảng ExamMaster, trách nhiệm tài khoản và giới hạn quyền lợi',
    badge: 'ToS v1.0',
    content: `
# ĐIỀU KHOẢN DỊCH VỤ (TERMS OF SERVICE)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

Chào mừng bạn đến với **ExamMaster** ("Ứng dụng", "Dịch vụ", "Chúng tôi"). Bằng việc truy cập hoặc sử dụng Dịch vụ dưới bất kỳ hình thức nào (bao gồm đăng nhập SSO, tải lên đề thi, học tập, làm bài kiểm tra hoặc kích hoạt gói cước PRO), bạn xác nhận đã đọc, hiểu và đồng ý chịu ràng buộc bởi các Điều khoản này.

---

### 1. ĐƠN VỊ CUNG CẤP & ĐẠI DIỆN PHÁP LÝ
- **Chủ quản nền tảng:** [PRODUCT OWNER DECISION REQUIRED: Tên công ty / Tổ chức / Cá nhân pháp lý sở hữu Dịch vụ].
- **Địa chỉ liên hệ:** [PRODUCT OWNER DECISION REQUIRED: Địa chỉ trụ sở văn phòng hoặc địa chỉ liên hệ hành chính].
- **Kênh hỗ trợ kỹ thuật:** Telegram [${LEGAL_METADATA.supportTelegram}](${LEGAL_METADATA.telegramUrl}) | Email: [PRODUCT OWNER DECISION REQUIRED: Email hỗ trợ chính thức].

---

### 2. ĐỐI TƯỢNG VÀ ĐIỀU KIỆN SỬ DỤNG (ELIGIBILITY)
- Dịch vụ được thiết kế phục vụ mục đích học tập cá nhân, ôn luyện thi cử chuyên ngành Công nghệ thông tin và học tập gia đình.
- Người dùng phải từ **[PRODUCT OWNER DECISION REQUIRED: Độ tuổi tối thiểu, ví dụ: 13 tuổi]** trở lên, hoặc có sự đồng ý, giám sát của cha mẹ hoặc người giám hộ hợp pháp khi sử dụng Dịch vụ.
- Bạn cam kết mọi thông tin cung cấp (khi đăng nhập SSO hoặc trao đổi kích hoạt gói) là trung thực và chính xác.

---

### 3. TÀI KHOẢN & XÁC THỰC SINGLE SIGN-ON (SSO)
- Ứng dụng hỗ trợ đăng nhập một chạm qua **Google Identity Services** và **Microsoft Entra ID / Office 365** (như email trường đại học).
- Bạn có trách nhiệm tự bảo mật thông tin đăng nhập tài khoản Google hoặc Microsoft của mình. Chúng tôi không chịu trách nhiệm về bất kỳ tổn thất nào phát sinh do tài khoản của bạn bị lộ thông tin đăng nhập bên thứ ba.
- Toàn bộ phiên làm việc của bạn được quản lý trên trình duyệt cá nhân thông qua cơ chế lưu trữ cục bộ (\`localStorage\`). Bạn có thể đăng xuất hoặc xóa dữ liệu bất kỳ lúc nào.

---

### 4. BẢN QUYỀN NỘI DUNG & TÀI NGUYÊN HỌC TẬP
- **Nội dung mẫu mặc định:** Các bộ câu hỏi mẫu (như môn CEA, CSD, DBI) và bài giảng tổng hợp được cung cấp nhằm mục đích học thuật và tham khảo sư phạm. Bản quyền tài liệu gốc thuộc về các tác giả và cơ sở đào tạo tương ứng.
- **Tài liệu do người dùng tải lên (User-Generated Content):** Khi bạn nhập hoặc tải tệp Markdown (\`.md\`) đề thi cá nhân vào hệ thống, tệp đó chỉ được lưu trữ trong bộ nhớ trình duyệt (\`localStorage\`) của riêng bạn. ExamMaster không sở hữu, không lưu trữ trên máy chủ công cộng và không phân phối lại nội dung của bạn.

---

### 5. FOCUS MODE PRO & GIÁM SÁT THI CỬ
- Tính năng **Focus Mode PRO** là công cụ kỹ thuật hỗ trợ người học rèn luyện tính tập trung, phát hiện hành vi rời khỏi tab bài thi hoặc chuyển đổi ứng dụng.
- Focus Mode PRO hoạt động thông qua các API trình duyệt tiêu chuẩn (\`visibilitychange\` và \`window.blur\`). Hệ thống **KHÔNG** quay video màn hình, không bật webcam và không thu âm micro của bạn.
- Bạn hiểu rằng việc bị chấm dứt bài thi do vượt quá 3 lần cảnh cáo vi phạm trong phòng thi mô phỏng là một phần của quy chế rèn luyện tập trung và không cấu thành lỗi kỹ thuật của hệ thống.

---

### 6. QUY ĐỊNH VỀ GÓI PRO & MÃ BẢN QUYỀN (LICENSE KEY)
- Dịch vụ cung cấp gói Miễn phí (Free) với hạn ngạch 3 lượt hỏi AI/ngày và gói PRO VIP (không giới hạn lượt AI, mở khóa Focus Mode PRO).
- Chi tiết về mức giá, kích hoạt mã bản quyền và chính sách hoàn tiền được quy định cụ thể tại **Chính Sách Thanh Toán & Hoàn Tiền**.
- Nghiêm cấm hành vi dịch ngược, tấn công brute-force, chia sẻ trái phép hoặc bán lại mã bản quyền ký đối xứng của hệ thống.

---

### 7. TUYÊN BỐ TỪ CHỐI BẢO ĐẢM (DISCLAIMER)
- Dịch vụ được cung cấp trên nguyên tắc **"NGUYÊN TRẠNG" (AS IS)** và **"TÙY THEO TÌNH TRẠNG KHẢ DỤNG" (AS AVAILABLE)**.
- Chúng tôi không cam kết rằng dịch vụ sẽ không bao giờ bị gián đoạn, hoàn toàn không có lỗi, hoặc các kết quả do trí tuệ nhân tạo (AI) trả về luôn luôn chính xác 100%.

---

### 8. GIỚI HẠN TRÁCH NHIỆM (LIMITATION OF LIABILITY)
- Trong giới hạn tối đa được pháp luật cho phép, Chúng tôi không chịu trách nhiệm đối với bất kỳ thiệt hại gián tiếp, ngẫu nhiên, đặc biệt hoặc mang tính hệ quả nào (bao gồm tổn thất dữ liệu cục bộ, kết quả thi cử thực tế tại trường của học viên, hoặc chi phí gián đoạn học tập) phát sinh từ việc sử dụng hoặc không thể sử dụng Dịch vụ.
- Trong mọi trường hợp, tổng trách nhiệm pháp lý tích lũy của Chúng tôi đối với bạn sẽ không vượt quá số tiền thực tế bạn đã thanh toán cho gói PRO trong khoảng thời gian 01 tháng gần nhất trước khi xảy ra khiếu nại.

---

### 9. THAY ĐỔI ĐIỀU KHOẢN & LIÊN HỆ
- Chúng tôi có quyền sửa đổi hoặc cập nhật Điều khoản này bất kỳ lúc nào. Ngày cập nhật mới nhất sẽ luôn được ghi rõ ở đầu văn bản. Việc bạn tiếp tục sử dụng Dịch vụ sau khi thay đổi được công bố đồng nghĩa với việc bạn chấp thuận các thay đổi đó.
- **Luật điều chỉnh & Cơ quan tài phán:** [PRODUCT OWNER DECISION REQUIRED: Ví dụ: Tuân thủ pháp luật nước Cộng hòa Xã hội Chủ nghĩa Việt Nam. Mọi tranh chấp nếu không giải quyết được qua thương lượng sẽ được giải quyết tại Tòa án nhân dân có thẩm quyền tại Việt Nam].
    `
  },

  privacy: {
    id: 'privacy',
    title: 'Chính Sách Quyền Riêng Tư',
    subtitle: 'Minh bạch 100% về cách dữ liệu được lưu cục bộ và những gì được chuyển tới dịch vụ AI bên thứ ba',
    badge: 'Privacy v1.0',
    content: `
# CHÍNH SÁCH QUYỀN RIÊNG TƯ (PRIVACY POLICY)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

ExamMaster cam kết bảo vệ quyền riêng tư và quyền tự chủ dữ liệu của bạn. Chính sách này mô tả chi tiết và trung thực cách thức hệ thống vận hành về mặt dữ liệu.

---

### 1. NGUYÊN TẮC CỐT LÕI: LƯU TRỮ CỤC BỘ (LOCAL-FIRST)
Khác với các nền tảng web truyền thống lưu toàn bộ dữ liệu người dùng về máy chủ cơ sở dữ liệu trung tâm, **ExamMaster KHÔNG có cơ sở dữ liệu từ xa (no remote database)**.
- Đề thi tự nạp của bạn được lưu trong \`localStorage\` trên trình duyệt của bạn.
- Điểm bài kiểm tra, bài giảng tự tạo và lịch sử thi nằm trên thiết bị của bạn.
- Chúng tôi không thu thập hoặc bán dữ liệu học tập cá nhân của bạn cho bất kỳ nhà quảng cáo hoặc bên môi giới dữ liệu nào.

---

### 2. DANH MỤC DỮ LIỆU THU THẬP & NƠI LƯU TRỮ

| Dữ Liệu | Nguồn Thu Thập | Mục Đích | Vị Trí Lưu | Có Gửi Bên Thứ Ba Không? |
| :--- | :--- | :--- | :--- | :--- |
| **Email & Tên** | Người dùng đăng nhập qua Google / Microsoft SSO | Định danh người dùng, hiển thị lời chào trên Dashboard | \`localStorage\` (\`exam_sso_user\`) | Không (chỉ nhận từ Google/MS) |
| **Ảnh đại diện** | Google/MS SSO hoặc Dicebear fallback | Hiển thị avatar trong Navbar | \`localStorage\` | Không |
| **Đề thi tự nạp** | Tệp Markdown do bạn chọn hoặc dán vào | Lưu đề thi để luyện tập | \`localStorage\` (\`custom_exams\`) | **Không gửi đi đâu**, 100% nội bộ |
| **Bài làm tự luận** | Bạn gõ vào ô trả lời câu sai | Chấm điểm tự luận sư phạm | \`localStorage\` tạm thời | **Gửi tới AI API** (DeepSeek hoặc Google Gemini) |
| **Nội dung slide** | Bạn dán vào để chuyển đổi | Tóm tắt bài giảng tiếng Việt | \`localStorage\` (\`custom_study_lectures\`) | **Gửi tới AI API** (DeepSeek hoặc Google Gemini) |
| **API Key cá nhân (BYOK)** | Bạn tự nhập vào | Gọi API trực tiếp bằng tài khoản của bạn | \`localStorage\` (\`ai_api_key\`) | Gửi trực tiếp tới DeepSeek/Google khi gọi hàm |
| **License Code & Hạn PRO** | Bạn nhập mã VIP | Xác thực gói cước PRO | \`localStorage\` (\`exam_pro_subscription\`) | Không |
| **Cài đặt giao diện** | Tùy chọn cỡ chữ, theme, âm thanh | Trải nghiệm người dùng | \`localStorage\` (\`exam_theme\`, \`exam_font_size\`) | Không |

---

### 3. CÁC DỊCH VỤ BÊN THỨ BA (THIRD-PARTY PROCESSORS)
Khi sử dụng một số tính năng mở rộng, trình duyệt của bạn sẽ trực tiếp tương tác với các nhà cung cấp dịch vụ bên thứ ba sau:

1. **DeepSeek API (\`api.deepseek.com\`):**
   - *Dữ liệu gửi:* Nội dung câu hỏi trắc nghiệm, bài làm tự luận của bạn, hoặc nội dung slide bài giảng.
   - *Mục đích:* Chấm điểm, phân tích điểm mạnh/yếu sư phạm và tóm tắt kiến thức.
   - *Chính sách riêng tư:* Tuân thủ chính sách quyền riêng tư của DeepSeek.
2. **Google Gemini API (\`generativelanguage.googleapis.com\`):**
   - *Dữ liệu gửi:* Tương tự như trên khi bạn chọn hoặc cấu hình sử dụng Gemini.
   - *Mục đích:* Xử lý ngôn ngữ tự nhiên và chấm bài học tập.
3. **Google Identity Services (\`accounts.google.com\`):**
   - *Dữ liệu nhận:* ID Token (JWT) chứa email, họ tên, ảnh đại diện khi bạn chọn "Đăng nhập với Google".
4. **Vercel Inc. (Hạ tầng lưu trữ web tĩnh):**
   - *Mục đích:* Phân phối mã nguồn frontend đã biên dịch (HTML/CSS/JS) tới trình duyệt của bạn qua mạng CDN toàn cầu. Vercel có thể ghi nhận nhật ký truy cập mạng tiêu chuẩn (IP address, trình duyệt, mã trạng thái HTTP).

---

### 4. THỜI GIAN LƯU TRỮ VÀ QUYỀN XÓA DỮ LIỆU
- **Thời hạn lưu giữ:** Dữ liệu trong \`localStorage\` tồn tại cho đến khi bạn chủ động xóa bộ nhớ cache trình duyệt hoặc sử dụng công cụ xóa tích hợp của chúng tôi.
- **Quyền tự xóa dữ liệu (Right to Erasure):** Bạn có toàn quyền xóa 100% dữ liệu bất kỳ lúc nào bằng cách sử dụng công cụ **"Xóa Toàn Bộ Dữ Liệu & Tài Khoản Của Tôi"** tại trang *Chính Sách Xóa Dữ Liệu* của ExamMaster. Toàn bộ thông tin tài khoản, bài thi tự nạp và mã bản quyền sẽ biến mất ngay lập tức khỏi máy tính của bạn.

---

### 5. AN TOÀN DỮ LIỆU (SECURITY)
- Chúng tôi sử dụng các tiêu chuẩn an toàn web hiện đại: Truyền tải 100% qua HTTPS, xác thực phiên bằng chữ ký mật mã HMAC/SHA-256 đối xứng.
- **Khuyến cáo quan trọng:** Do dữ liệu lưu trên \`localStorage\` của trình duyệt, nếu bạn sử dụng máy tính công cộng (quán net, máy tính phòng thí nghiệm trường học), bạn **BẮT BUỘC** phải nhấn **Đăng Xuất** và **Xóa Dữ Liệu** trước khi rời khỏi máy để tránh người dùng sau truy cập vào tài khoản của bạn.

---

### 6. QUYỀN RIÊNG TƯ CỦA TRẺ EM (CHILDREN'S PRIVACY)
- Chúng tôi không cố ý thu thập thông tin cá nhân từ trẻ em dưới **[PRODUCT OWNER DECISION REQUIRED: Độ tuổi, ví dụ: 13 tuổi]**. Nếu bạn là phụ huynh hoặc người giám hộ phát hiện con em mình đã cung cấp thông tin mà không có sự đồng ý của bạn, vui lòng liên hệ với chúng tôi để xóa dữ liệu.

---

### 7. LIÊN HỆ BỘ PHẬN PHỤ TRÁCH QUYỀN RIÊNG TƯ
- **Cán bộ phụ trách quyền riêng tư (DPO/Privacy Contact):** [PRODUCT OWNER DECISION REQUIRED: Họ tên / Chức danh người phụ trách].
- **Kênh tiếp nhận:** Telegram [${LEGAL_METADATA.supportTelegram}](${LEGAL_METADATA.telegramUrl}) hoặc [PRODUCT OWNER DECISION REQUIRED: Email bảo mật dữ liệu].
    `
  },

  payment: {
    id: 'payment',
    title: 'Chính Sách Thanh Toán & Hoàn Tiền',
    subtitle: 'Quy định minh bạch về mô hình thanh toán thủ công, kích hoạt gói cước PRO và điều kiện hoàn tiền',
    badge: 'Billing v1.0',
    content: `
# CHÍNH SÁCH THANH TOÁN, NÂNG CẤP & HOÀN TIỀN (PAYMENT & REFUND POLICY)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

Chính sách này công khai và giải thích rõ ràng cơ chế tài chính, thanh toán và hoàn trả của **ExamMaster**.

---

### 1. BẢNG GIÁ & CÁC GÓI DỊCH VỤ
- **Gói Miễn Phí (Free Tier):**
  - Chi phí: **0 VNĐ**.
  - Quyền lợi: Thi trắc nghiệm không giới hạn, 03 lượt hỏi AI tự luận/chuyển đổi bài giảng mỗi ngày (hạn ngạch hồi phục vào 00:00 hàng ngày).
- **Gói PRO VIP Unlimited:**
  - Chi phí chuẩn: **3 USD / 30 ngày** (tương đương **75.000 VNĐ / tháng** theo tỷ giá niêm yết).
  - Quyền lợi: Không giới hạn lượt chấm điểm tự luận AI, đường truyền ưu tiên tốc độ cao 1-2s, mở khóa chế độ Focus Mode PRO chống phân tâm trong phòng thi.
- **Tùy chọn Miễn Phí Thay Thế (BYOK - Bring Your Own Key):**
  - Người dùng có thể tự lấy API Key Google Gemini (miễn phí từ Google AI Studio) hoặc DeepSeek và nhập vào ứng dụng để sử dụng các tính năng AI không giới hạn mà **không cần thanh toán bất kỳ khoản tiền nào cho ExamMaster**.

---

### 2. PHƯƠNG THỨC THANH TOÁN (PAYMENT METHODS)
- **Cơ chế thanh toán thủ công:** Hiện tại ExamMaster áp dụng phương thức chuyển khoản ngân hàng trực tiếp (nội địa Việt Nam) hoặc thanh toán thỏa thuận thông qua Quản trị viên hệ thống (Telegram \`@huygia219\`).
- **KHÔNG LƯU THẺ TÍN DỤNG:** Hệ thống **HOÀN TOÀN KHÔNG LƯU TRỮ** thông tin thẻ tín dụng (Visa, Mastercard, JCB), không tích hợp cổng tự động trừ thẻ (No recurring auto-debit).
- **KHÔNG TỰ ĐỘNG GIA HẠN TRỪ TIỀN (NO HIDDEN AUTO-RENEWAL):**
  - Gói PRO được cấp dưới dạng **Mã Bản Quyền VIP (License Key)** có thời hạn cố định (ví dụ 30 ngày hoặc trọn đời).
  - Khi hết hạn, tài khoản của bạn sẽ tự động quay trở về Gói Miễn Phí. **Hệ thống không thể và sẽ không bao giờ tự ý trừ tiền tài khoản ngân hàng của bạn mà không có sự đồng ý chủ động của bạn cho mỗi lần giao dịch mới.**

---

### 3. QUY TRÌNH KÍCH HOẠT DỊCH VỤ
1. Bạn thực hiện chuyển khoản theo thông tin hướng dẫn trên giao diện nâng cấp PRO (Nội dung chuyển khoản: \`EXAM PRO [Số điện thoại hoặc tên của bạn]\`).
2. Liên hệ Admin qua Telegram [${LEGAL_METADATA.supportTelegram}](${LEGAL_METADATA.telegramUrl}) để gửi biên lai giao dịch.
3. Quản trị viên kiểm tra giao dịch và cấp **Mã Kích Hoạt VIP Đối Xứng** (ví dụ: \`VIP-2026-XXXX-XXXX\`).
4. Bạn nhập mã vào hộp thoại Nâng cấp PRO trên ứng dụng để mở khóa ngay lập tức.

---

### 4. CHÍNH SÁCH HOÀN TIỀN (REFUND POLICY)
Chúng tôi cam kết đảm bảo quyền lợi chính đáng của học viên:

#### 4.1. Các trường hợp ĐƯỢC hoàn tiền 100%:
- **Chuyển khoản trùng lặp (Duplicate Payment):** Bạn vô tình chuyển khoản 2 lần cho cùng một đợt nâng cấp.
- **Mã kích hoạt bị lỗi kỹ thuật:** Mã VIP không thể kích hoạt do lỗi hệ thống máy chủ ký khóa và Quản trị viên không thể cung cấp mã thay thế trong vòng **[PRODUCT OWNER DECISION REQUIRED: Thời gian xử lý, ví dụ: 24 giờ]**.
- **Không hài lòng trong thời gian trải nghiệm ban đầu:** Yêu cầu hoàn tiền trong vòng **[PRODUCT OWNER DECISION REQUIRED: Cửa sổ thời gian hoàn tiền, ví dụ: 03 ngày kể từ khi nhận mã kích hoạt]** với điều kiện bạn chưa tiêu thụ quá [PRODUCT OWNER DECISION REQUIRED: Giới hạn lượt sử dụng, ví dụ: 10 lượt hỏi AI bằng gói PRO].

#### 4.2. Các trường hợp KHÔNG được hoàn tiền:
- Bạn yêu cầu hoàn tiền sau khi đã sử dụng hết thời hạn của gói cước PRO (sau 30 ngày).
- Bạn vi phạm nghiêm trọng Điều khoản Dịch vụ dẫn đến việc bị thu hồi mã kích hoạt (như chia sẻ mã công khai lên mạng cho hàng nghìn người cùng dùng, hoặc cố tình phát tán mã độc).
- Các sự cố khách quan xuất phát từ phía bên thứ ba độc lập (ví dụ dịch vụ AI của DeepSeek hoặc Google toàn cầu gặp sự cố sập mạng diện rộng tạm thời) mà ExamMaster đã kích hoạt cơ chế chấm từ khóa dự phòng nội bộ thay thế.

#### 4.3. Quy trình yêu cầu hoàn tiền:
- Gửi tin nhắn đến Telegram [${LEGAL_METADATA.supportTelegram}](${LEGAL_METADATA.telegramUrl}) kèm ảnh chụp biên lai chuyển khoản và mã VIP của bạn.
- Thời gian tiếp nhận và xử lý chuyển khoản hoàn tiền: Trong vòng **[PRODUCT OWNER DECISION REQUIRED: Thời gian giải quyết hoàn tiền, ví dụ: 1 - 3 ngày làm việc]** qua số tài khoản ngân hàng gốc bạn đã chuyển.

---

### 5. HỦY DỊCH VỤ (CANCELLATION)
- Do hệ thống hoạt động trên cơ chế mã bản quyền trả trước (Pre-paid License Key), không có hợp đồng ràng buộc định kỳ, bạn không cần phải làm thủ tục "Hủy gia hạn hàng tháng".
- Nếu không muốn tiếp tục sử dụng PRO, bạn chỉ cần không mua mã mới khi hết hạn. Nếu muốn quay về gói Free ngay lập tức trước khi hết hạn, bạn có thể bấm nút **"Quay Về Miễn Phí"** trong bảng điều khiển.
    `
  },

  ai: {
    id: 'ai',
    title: 'Quy Định Sử Dụng & Miễn Trừ Trách Nhiệm AI',
    subtitle: 'Giới hạn trách nhiệm về nội dung sinh bởi AI, hiện tượng ảo giác (hallucination) và chuẩn mực học tập',
    badge: 'AI & AUP v1.0',
    content: `
# QUY ĐỊNH SỬ DỤNG HỢP CHUẨN & TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM AI (ACCEPTABLE USE & AI DISCLAIMER)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

---

### 1. BẢN CHẤT CỦA TÍNH NĂNG TRÍ TUỆ NHÂN TẠO (AI)
ExamMaster tích hợp các mô hình ngôn ngữ lớn (Large Language Models - LLM) tiên tiến gồm **DeepSeek Chat** và **Google Gemini** để hỗ trợ:
1. Chấm điểm và đưa ra nhận xét sư phạm đối với bài làm tự luận ôn tập câu sai.
2. Tóm tắt và giải thích các khái niệm kỹ thuật phức tạp từ slide tiếng Anh thành ví dụ đời thường sinh động bằng tiếng Việt.

---

### 2. TUYÊN BỐ MIỄN TRỪ TRÁCH NHIỆM NỘI DUNG AI (AI CONTENT DISCLAIMER)
> ⚠️ **LƯU Ý CỰC KỲ QUAN TRỌNG:**
> - **AI có thể đưa ra câu trả lời không chính xác (Hiện tượng ảo giác - AI Hallucination):** Dù đã được tinh chỉnh bằng các prompt chuyên môn kỹ thuật, AI vẫn có thể nhầm lẫn số liệu, công thức toán học, phiên bản phần mềm hoặc kiến thức đặc thù của từng trường đại học.
> - **AI chỉ đóng vai trò tham khảo & gia sư ảo:** Nội dung do AI sinh ra không thay thế cho giáo trình chuẩn của trường, bài giảng chính thức của giảng viên bộ môn, hoặc tài liệu thi cử được cơ sở đào tạo phê duyệt.
> - **Người học tự chịu trách nhiệm kiểm chứng:** Bạn phải luôn tự đối chiếu các câu trả lời, công thức và đáp án trắc nghiệm với giáo trình chính thống trước các kỳ thi học kỳ hoặc thi chứng chỉ thực tế. ExamMaster không chịu trách nhiệm về bất kỳ kết quả thi cử, điểm số hay quyết định học vụ nào của người học.

---

### 3. CHÍNH SÁCH SỬ DỤNG HỢP LỆ (ACCEPTABLE USE POLICY)
Người dùng cam kết KHÔNG sử dụng Dịch vụ hoặc các tính năng AI vào các mục đích sau:
1. **Gian lận thi cử trực tiếp:** Sử dụng ứng dụng để gian lận trong các kỳ thi chính thức đang diễn ra tại trường học mà không được phép của giám thị.
2. **Khai thác hạ tầng quá mức (Abuse & DoS):** Gửi hàng nghìn yêu cầu tự động bằng bot, script nhằm làm cạn kiệt tài nguyên API hoặc gây nghẽn máy chủ.
3. **Nội dung bất hợp pháp & độc hại:** Nhập vào hệ thống các bài làm hoặc slide có nội dung vi phạm pháp luật Việt Nam, bôi nhọ danh dự người khác, kích động bạo lực, khiêu dâm, hoặc xâm phạm bản quyền nghiêm trọng.
4. **Tấn công bảo mật:** Cố tình bẻ khóa chữ ký số HMAC, khai thác lỗ hổng nhằm chiếm đoạt System API Key của quản trị viên.

---

### 4. XỬ LÝ VI PHẠM
Nếu phát hiện hành vi lạm dụng hoặc vi phạm chính sách sử dụng, Chúng tôi có quyền:
- Từ chối cung cấp dịch vụ hoặc khóa quyền truy cập tính năng AI của thiết bị vi phạm.
- Thu hồi mã bản quyền PRO VIP đã cấp mà không hoàn tiền.
- Báo cáo cơ quan chức năng nếu hành vi vi phạm pháp luật hình sự hoặc gây thiệt hại tài sản nghiêm trọng.
    `
  },

  deletion: {
    id: 'deletion',
    title: 'Chính Sách Xóa Dữ Liệu & Tài Khoản',
    subtitle: 'Quyền được lãng quên: Minh bạch cách xóa toàn bộ dữ liệu khỏi trình duyệt và công cụ xóa tự phục vụ',
    badge: 'Data Rights v1.0',
    content: `
# CHÍNH SÁCH QUYỀN NGƯỜI DÙNG & XÓA DỮ LIỆU (USER RIGHTS & DATA DELETION)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

Tại ExamMaster, chúng tôi tôn trọng quyền kiểm soát tuyệt đối của bạn đối với dữ liệu của mình, phù hợp với các tiêu chuẩn bảo vệ quyền riêng tư toàn cầu (như GDPR Right to Erasure).

---

### 1. DỮ LIỆU ĐƯỢC LƯU NHỮNG GÌ TRÊN MÁY BẠN?
Do ứng dụng vận hành theo kiến trúc máy khách thuần túy (Client-side architecture), toàn bộ dữ liệu của bạn nằm trọn vẹn trong bộ nhớ trình duyệt (\`localStorage\`), bao gồm:
1. Thông tin tài khoản SSO (\`exam_sso_user\`)
2. Tất cả đề thi bạn tự nhập (\`custom_exams\`)
3. Toàn bộ bài giảng tự sinh (\`custom_study_lectures\`)
4. Lịch sử làm bài thi và điểm số
5. Hạn ngạch sử dụng AI trong ngày (\`exam_daily_ai_usage\`)
6. Gói cước PRO và mã bản quyền đã kích hoạt (\`exam_pro_subscription\`)
7. API Key cá nhân của bạn (\`ai_api_key\`)
8. Cài đặt giao diện, cỡ chữ và âm thanh

---

### 2. CÁCH THỨC XÓA DỮ LIỆU
Bạn có 2 cách dễ dàng để xóa sạch 100% dữ liệu:

#### Cách 1: Sử dụng Công cụ Tự Phục Vụ (Khuyến nghị)
Ngay bên dưới trang này, chúng tôi cung cấp nút **"Xóa Toàn Bộ Dữ Liệu & Đặt Lại Ứng Dụng"**. Khi bạn bấm xác nhận:
- Mọi khóa lưu trữ nêu trên sẽ được thanh trừng vĩnh viễn khỏi trình duyệt.
- Phiên đăng nhập SSO sẽ bị hủy hoàn toàn.
- Hệ thống sẽ tự động làm mới trang và đưa ứng dụng về trạng thái trắng ban đầu như khi vừa cài đặt.

#### Cách 2: Xóa trực tiếp qua cài đặt trình duyệt
Bạn có thể mở Cài đặt trình duyệt (Chrome, Safari, Edge, Firefox):
- Vào mục: *Quyền riêng tư & Bảo mật* &gt; *Xóa dữ liệu duyệt web* &gt; Chọn *Dữ liệu trang web và cookie* đối với tên miền \`exam-virid-eta.vercel.app\`.

---

### 3. DỮ LIỆU NÀO ĐƯỢC GIỮ LẠI BÊN NGOÀI TRÌNH DUYỆT?
- Vì Chúng tôi không vận hành máy chủ cơ sở dữ liệu lưu thông tin người dùng, sau khi bạn xóa cục bộ, **chúng tôi không còn giữ bất kỳ bản sao nào về đề thi, bài làm hay mật khẩu của bạn**.
- Các yêu cầu AI đã gửi trước đó tới DeepSeek hoặc Google Gemini sẽ tuân theo chính sách lưu giữ nhật ký kỹ thuật tạm thời của các nhà cung cấp đó (thông thường lưu 30 ngày cho mục đích chống lạm dụng rồi tự động hủy theo chính sách của Google và DeepSeek).
- Lịch sử giao dịch ngân hàng chuyển khoản (nếu bạn đã từng chuyển tiền mua PRO) sẽ được lưu trữ trong sao kê ngân hàng của quản trị viên theo quy định kế toán của pháp luật tài chính [PRODUCT OWNER DECISION REQUIRED: Thời gian lưu trữ sao kê thuế/kế toán, ví dụ: 05 năm].
    `
  },

  cookies: {
    id: 'cookies',
    title: 'Thông Báo Về Lưu Trữ Trình Duyệt & Cookie',
    subtitle: 'Giải thích chi tiết về Local Storage, Cache và lý do chúng tôi không sử dụng Cookie theo dõi quảng cáo',
    badge: 'Storage Notice v1.0',
    content: `
# THÔNG BÁO VỀ LƯU TRỮ TRÌNH DUYỆT & COOKIE (STORAGE & COOKIE NOTICE)
**Ngày có hiệu lực:** 15/09/2026 | **Phiên bản:** 1.0.0

---

### 1. EXAMMASTER CÓ SỬ DỤNG COOKIE THEO DÕI KHÔNG?
**KHÔNG.** ExamMaster:
- KHÔNG sử dụng cookie theo dõi của bên thứ ba (No third-party tracking cookies).
- KHÔNG nhúng mã theo dõi tiếp thị, Facebook Pixel, Google Analytics hay bất kỳ mạng quảng cáo nhắm mục tiêu hành vi nào.
- KHÔNG bán dữ liệu lướt web của bạn cho các đối tác quảng cáo.

---

### 2. CHÚNG TÔI SỬ DỤNG CÔNG NGHỆ LƯU TRỮ NÀO?
Thay vì dùng HTTP Cookies, chúng tôi sử dụng cơ chế **Web Storage API (\`localStorage\`)** tiêu chuẩn của trình duyệt. Công nghệ này có các đặc tính ưu việt:
1. **Chỉ nằm trên thiết bị của bạn:** Dữ liệu trong \`localStorage\` không tự động gửi lên máy chủ trong mỗi yêu cầu HTTP như Cookie truyền thống, giúp tiết kiệm băng thông và bảo mật hơn.
2. **Hoạt động ngoại tuyến (Offline-ready):** Cho phép bạn tiếp tục làm bài thi, ôn lại câu sai ngay cả khi mất mạng tạm thời.
3. **Người dùng kiểm soát 100%:** Bạn có thể tự kiểm tra, chỉnh sửa hoặc xóa bất kỳ lúc nào qua DevTools hoặc công cụ xóa trên ứng dụng.

---

### 3. CHI TIẾT CÁC MỤC LƯU TRỮ TRÊN TRÌNH DUYỆT (LOCALSTORAGE INVENTORY)
- \`exam_sso_user\`: Lưu thông tin phiên đăng nhập (Họ tên, email, ảnh đại diện).
- \`custom_exams\`: Lưu trữ các đề thi trắc nghiệm bạn nhập thêm.
- \`custom_study_lectures\`: Lưu bài học tiếng Việt chuyển đổi từ slide.
- \`exam_pro_subscription\`: Lưu chữ ký số xác thực gói PRO của bạn.
- \`exam_daily_ai_usage\`: Đếm số lượt hỏi AI trong ngày để hồi phục lúc 00:00.
- \`exam_theme\`: Lưu trạng thái giao diện Sáng hoặc Tối.
- \`exam_font_size\`: Lưu cỡ chữ tùy chỉnh để dễ đọc bài giảng.
- \`exam_sound_enabled\`: Lưu cài đặt bật/tắt âm thanh tương tác.
- \`ai_api_key\`: Lưu khóa API cá nhân của bạn (nếu bạn tự nhập theo dạng BYOK).

---

### 4. QUẢN LÝ VÀ TẮT LƯU TRỮ
Nếu bạn không muốn trình duyệt lưu trữ bất kỳ thông tin nào, bạn có thể:
- Sử dụng chế độ **Ẩn danh (Incognito / Private Browsing)** khi mở ứng dụng. Khi bạn đóng cửa sổ ẩn danh, toàn bộ dữ liệu bài làm và phiên đăng nhập sẽ tự động biến mất.
- Hoặc sử dụng nút **Xóa Dữ Liệu** trong mục Chính sách Quyền Người Dùng.
    `
  }
};
