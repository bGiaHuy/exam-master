# **ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG 3 – TỔNG QUAN CẤP CAO VỀ CHỨC NĂNG VÀ LIÊN KẾT MÁY TÍNH**

Môn: Computer Organization and Architecture (CEA)
Cấu trúc: 50 câu trắc nghiệm chia thành 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) kèm Đáp án và Hướng dẫn giải chi tiết.

# **PHẦN 1: MỨC ĐỘ NHẬN BIẾT (CÂU 1 – 15)**

Câu 1. Theo kiến trúc Von Neumann, lệnh và dữ liệu được lưu trữ như thế nào?

* A. Trong hai bộ nhớ chỉ đọc tách biệt
* B. Chỉ lệnh được lưu trong bộ nhớ, còn dữ liệu nằm trong CPU
* C. Trong cùng một bộ nhớ có khả năng đọc và ghi
* D. Chỉ dữ liệu được lưu trong bộ nhớ, còn lệnh được nối cứng

Câu 2. CPU trong kiến trúc Von Neumann thông thường thực hiện chương trình theo cách nào?

* A. Thực hiện đồng thời toàn bộ lệnh
* B. Thực hiện tuần tự từng lệnh, trừ khi trình tự bị thay đổi
* C. Thực hiện lệnh theo thứ tự ngẫu nhiên
* D. Luôn thực hiện lệnh có địa chỉ lớn nhất trước

Câu 3. Khái niệm Hardwired Program chỉ điều gì?

* A. Chương trình được thực hiện bằng cách kết nối vật lý các thành phần phần cứng
* B. Chương trình được lưu trên ổ SSD
* C. Chương trình được viết hoàn toàn bằng hợp ngữ
* D. Chương trình chỉ có thể chạy trong RAM

Câu 4. Đặc điểm nào phân biệt phần mềm với Hardwired Program?

* A. Phần mềm không cần CPU để thực hiện
* B. Phần mềm chỉ có thể được lưu trong ROM
* C. Muốn thay đổi phần mềm phải nối lại mạch phần cứng
* D. Có thể thay đổi chức năng bằng cách nạp một chuỗi lệnh mới

Câu 5. Hai thành phần chức năng chính cấu thành CPU theo nội dung bài học là gì?

* A. Bộ nhớ chính và bộ nhớ đệm
* B. Bộ thông dịch lệnh và đơn vị số học–logic (ALU)
* C. Thiết bị nhập và thiết bị xuất
* D. Bus địa chỉ và bus dữ liệu

Câu 6. Mô-đun nào chuyển đổi dữ liệu từ thiết bị bên ngoài thành tín hiệu mà máy tính có thể xử lý?

* A. Mô-đun xuất
* B. Bộ giải mã lệnh
* C. Mô-đun nhập
* D. Bộ nhớ đệm

Câu 7. Chức năng chính của thanh ghi địa chỉ bộ nhớ (MAR) là gì?

* A. Giữ địa chỉ ô nhớ sẽ được đọc hoặc ghi
* B. Giữ lệnh vừa được nạp
* C. Giữ dữ liệu vừa đọc từ thiết bị vào
* D. Giữ kết quả cuối cùng của ALU

Câu 8. Thanh ghi đệm bộ nhớ (MBR) dùng để làm gì?

* A. Chỉ giữ mã thao tác của lệnh
* B. Chỉ giữ địa chỉ lệnh kế tiếp
* C. Chỉ giữ địa chỉ thiết bị vào/ra
* D. Giữ dữ liệu đọc từ bộ nhớ hoặc dữ liệu chuẩn bị ghi vào bộ nhớ

Câu 9. Thanh ghi địa chỉ vào/ra (I/OAR) có nhiệm vụ gì?

* A. Lưu dữ liệu đang trao đổi với thiết bị vào/ra
* B. Xác định một thiết bị hoặc cổng vào/ra cụ thể
* C. Lưu địa chỉ lệnh kế tiếp
* D. Lưu kết quả của phép toán số học

Câu 10. Thanh ghi nào chứa địa chỉ của lệnh kế tiếp cần được nạp?

* A. Thanh ghi lệnh (IR)
* B. Thanh ghi tích lũy (AC)
* C. Bộ đếm chương trình (PC)
* D. Thanh ghi đệm bộ nhớ (MBR)

Câu 11. Chu kỳ nạp lệnh kết thúc khi lệnh vừa đọc được đưa vào thanh ghi nào?

* A. MAR
* B. AC
* C. I/OAR
* D. IR

Câu 12. Thanh ghi lệnh (IR) lưu trữ nội dung nào?

* A. Lệnh vừa được nạp và đang được xử lý
* B. Địa chỉ của thiết bị vào/ra
* C. Kết quả trung gian của mọi phép tính
* D. Địa chỉ của lệnh kế tiếp

Câu 13. Hai giai đoạn cơ bản của một chu kỳ lệnh là gì?

* A. Đọc và ghi
* B. Nạp lệnh và thực hiện lệnh
* C. Giải mã và lưu trữ
* D. Vào và ra

Câu 14. Nội dung nào sau đây không thuộc bốn nhóm hành động chính của lệnh được nêu trong bài?

* A. Trao đổi giữa bộ xử lý và bộ nhớ
* B. Trao đổi giữa bộ xử lý và thiết bị vào/ra
* C. Xử lý dữ liệu
* D. Trao đổi trực tiếp bộ nhớ–bộ nhớ như một nhóm độc lập

Câu 15. Lệnh điều khiển (Control instruction) chủ yếu được dùng để làm gì?

* A. Đọc dữ liệu từ thiết bị vào
* B. Thực hiện phép cộng số học
* C. Thay đổi trình tự thực hiện chương trình
* D. Ghi một từ dữ liệu vào bộ nhớ

# **PHẦN 2: MỨC ĐỘ THÔNG HIỂU (CÂU 16 – 30)**

Câu 16. Trong ví dụ cộng các giá trị lấy từ bộ nhớ, thanh ghi tích lũy (AC) đóng vai trò nào?

* A. Chứa địa chỉ của toán hạng
* B. Chứa kết quả trung gian và kết quả tính toán cuối cùng
* C. Chứa địa chỉ của lệnh kế tiếp
* D. Xác định thiết bị vào/ra cần truy cập

Câu 17. Trạng thái IOD (Instruction Operation Decoding) trong sơ đồ chu kỳ lệnh thực hiện công việc gì?

* A. Giải mã thao tác mà lệnh yêu cầu
* B. Tính địa chỉ của toán hạng
* C. Ghi kết quả vào bộ nhớ
* D. Phục hồi ngữ cảnh sau ngắt

Câu 18. Trạng thái OAC (Operand Address Calculation) có mục đích gì?

* A. Nạp lệnh từ bộ nhớ vào IR
* B. Thực hiện phép toán trên dữ liệu
* C. Xác định địa chỉ của toán hạng
* D. Kiểm tra lỗi phần cứng

Câu 19. Trong sơ đồ trạng thái chu kỳ lệnh, OS (Operand Store) biểu thị hoạt động nào?

* A. Chọn mã thao tác
* B. Khởi động hệ điều hành
* C. Nạp toán hạng vào AC
* D. Lưu toán hạng hoặc kết quả đến đích

Câu 20. Vì sao cơ chế ngắt có thể nâng cao hiệu suất sử dụng bộ xử lý khi làm việc với thiết bị vào/ra?

* A. Vì ngắt làm tăng trực tiếp tần số xung nhịp CPU
* B. Vì CPU có thể làm công việc khác trong lúc thiết bị vào/ra xử lý yêu cầu
* C. Vì ngắt làm tăng độ rộng bus dữ liệu
* D. Vì mọi thiết bị vào/ra sẽ hoạt động đồng thời với tốc độ CPU

Câu 21. Một chương trình thực hiện phép chia cho 0 thường gây ra loại ngắt nào?

* A. Ngắt bộ định thời
* B. Ngắt vào/ra
* C. Ngắt chương trình
* D. Ngắt do hỏng phần cứng

Câu 22. Ngắt bộ định thời (Timer interrupt) thường giúp hệ điều hành thực hiện mục tiêu nào?

* A. Thực hiện các tác vụ định kỳ và giành lại quyền điều khiển CPU khi cần
* B. Tăng dung lượng tối đa của RAM
* C. Xác định địa chỉ của thiết bị vào/ra
* D. Thay thế hoàn toàn chu kỳ nạp lệnh

Câu 23. Vì sao CPU phải lưu ngữ cảnh của chương trình hiện tại khi chấp nhận một ngắt?

* A. Để xóa hoàn toàn chương trình đang chạy khỏi bộ nhớ
* B. Để chuyển mọi lệnh của chương trình sang thiết bị vào/ra
* C. Để tăng độ rộng của bus địa chỉ
* D. Để có thể khôi phục và tiếp tục chương trình đúng trạng thái sau khi xử lý ngắt

Câu 24. Trình xử lý ngắt (Interrupt Handler) thường là một bộ phận của thành phần nào?

* A. Bộ nhớ đệm
* B. Hệ điều hành
* C. ALU
* D. Trình biên dịch của chương trình đang chạy

Câu 25. Direct Memory Access (DMA) làm giảm gánh nặng cho CPU bằng cách nào?

* A. Cho phép bộ nhớ tự giải mã mọi lệnh máy
* B. Bỏ qua hoàn toàn mô-đun vào/ra
* C. Cho phép mô-đun vào/ra truyền khối dữ liệu trực tiếp tới hoặc từ bộ nhớ
* D. Thay thế ALU khi thực hiện phép toán số học

Câu 26. Ba bus chức năng hợp thành bus hệ thống là gì?

* A. Bus dữ liệu, bus địa chỉ và bus điều khiển
* B. Bus đọc, bus ghi và bus xung nhịp
* C. Bus bộ nhớ, bus bộ đệm và bus DMA
* D. Bus nhập, bus xuất và bus ngắt

Câu 27. Độ rộng của bus dữ liệu phản ánh trực tiếp đại lượng nào?

* A. Số lượng thiết bị vào/ra tối đa
* B. Dung lượng tối đa của bộ nhớ có thể đánh địa chỉ
* C. Tần số xung nhịp của CPU
* D. Số bit có thể truyền trong một thao tác bus

Câu 28. Tại sao độ rộng bus địa chỉ ảnh hưởng đến dung lượng bộ nhớ tối đa có thể truy cập?

* A. Vì bus địa chỉ quyết định kích thước mỗi phép tính của ALU
* B. Vì số bit địa chỉ quyết định số vị trí địa chỉ phân biệt có thể biểu diễn
* C. Vì bus địa chỉ chứa dữ liệu của từng ô nhớ
* D. Vì bus địa chỉ quyết định trực tiếp tốc độ của thiết bị vào/ra

Câu 29. Ưu điểm quan trọng của liên kết điểm–điểm so với bus dùng chung là gì?

* A. Mọi thiết bị bắt buộc truyền trên cùng một đường vật lý
* B. Chỉ một thiết bị trong toàn hệ thống có thể hoạt động tại một thời điểm
* C. Các liên kết riêng làm giảm tranh chấp và không cần phân xử một bus chung cho mọi giao tiếp
* D. Không cần bất kỳ cơ chế điều khiển truyền dữ liệu nào

Câu 30. Trong kiến trúc QuickPath Interconnect (QPI), đơn vị truyền ở tầng liên kết là gì?

* A. Flit
* B. Frame
* C. Packet
* D. Byte

# **PHẦN 3: MỨC ĐỘ VẬN DỤNG (CÂU 31 – 40)**

Câu 31. Một hệ thống có bus địa chỉ rộng 16 bit và bộ nhớ được đánh địa chỉ theo byte. Dung lượng không gian địa chỉ tối đa là bao nhiêu?

* A. 16 KiB
* B. 64 KiB
* C. 128 KiB
* D. 256 KiB

Câu 32. Một bus dữ liệu rộng 32 bit cần truyền một khối dữ liệu 128 bit. Bỏ qua phần điều khiển, tối thiểu cần bao nhiêu thao tác truyền trên bus?

* A. 2 thao tác
* B. 3 thao tác
* C. 8 thao tác
* D. 4 thao tác

Câu 33. Trước chu kỳ nạp lệnh, PC = 200 và ô nhớ 200 chứa lệnh X. Nếu mỗi lệnh chiếm một ô nhớ, trạng thái hợp lý ngay sau khi nạp lệnh là gì?

* A. IR chứa X và PC = 201
* B. MAR chứa X và PC = 200
* C. AC chứa X và PC = 199
* D. MBR chứa 201 và IR rỗng

Câu 34. AC đang chứa 12, còn ô nhớ 500 chứa 7. Sau khi thực hiện lệnh cộng nội dung ô nhớ 500 vào AC, giá trị của AC là bao nhiêu?

* A. 5
* B. 7
* C. 19
* D. 84

Câu 35. Ô nhớ 100 chứa 5, ô nhớ 101 chứa 8. CPU lần lượt thực hiện LOAD 100, ADD 101 và STORE 102. Giá trị cuối cùng tại ô nhớ 102 là bao nhiêu?

* A. 5
* B. 13
* C. 8
* D. 40

Câu 36. CPU yêu cầu một thiết bị vào/ra thực hiện tác vụ kéo dài 100 chu kỳ và trong thời gian đó có 70 chu kỳ công việc độc lập sẵn sàng. Lợi ích trực tiếp của cơ chế ngắt là gì?

* A. Biến tác vụ vào/ra 100 chu kỳ thành tác vụ 30 chu kỳ
* B. Làm CPU tăng tần số thêm 70 chu kỳ
* C. Loại bỏ hoàn toàn thời gian xử lý ngắt
* D. Cho phép CPU tận dụng tối đa 70 chu kỳ để làm công việc khác thay vì chờ bận

Câu 37. Khi chương trình đang chạy phát sinh lỗi chia cho 0, CPU nên chuyển quyền điều khiển đến đâu?

* A. Mô-đun DMA
* B. Mô-đun xuất
* C. Trình xử lý ngắt chương trình tương ứng
* D. Bus địa chỉ

Câu 38. Một thiết bị cần chuyển liên tục một khối 4096 byte vào bộ nhớ. Giải pháp nào phù hợp nhất để hạn chế CPU phải tham gia vào từng lần truyền nhỏ?

* A. Cấu hình DMA để truyền trực tiếp cả khối giữa mô-đun vào/ra và bộ nhớ
* B. Dùng PC làm thanh ghi đệm dữ liệu
* C. Tăng độ rộng bus địa chỉ nhưng vẫn để CPU sao chép từng byte
* D. Chuyển toàn bộ phép truyền thành lệnh điều khiển rẽ nhánh

Câu 39. Một bộ nhớ được đánh địa chỉ theo byte và dùng bus địa chỉ 20 bit. Dung lượng không gian địa chỉ tối đa là bao nhiêu?

* A. 20 KiB
* B. 1 MiB
* C. 2 MiB
* D. 20 MiB

Câu 40. Trên một bus dùng chung, CPU và bộ điều khiển DMA cùng yêu cầu quyền sử dụng bus tại một thời điểm. Cơ chế nào cần được kích hoạt?

* A. Giải mã lệnh trong IR
* B. Tăng tự động độ rộng bus dữ liệu
* C. Chuyển dữ liệu sang I/OAR
* D. Phân xử bus để chọn một bên được truyền tại thời điểm đó

# **PHẦN 4: MỨC ĐỘ VẬN DỤNG CAO (CÂU 41 – 50)**

Câu 41. Chuỗi vi thao tác nào mô tả hợp lý nhất một chu kỳ nạp lệnh đơn giản?

* A. IR → MAR; AC → MBR; MBR → PC; giảm PC
* B. MBR → MAR; IR → PC; PC → AC; tăng IR
* C. PC → MAR; đọc bộ nhớ vào MBR; tăng PC; MBR → IR
* D. AC → I/OAR; đọc thiết bị vào MAR; MAR → IR; xóa PC

Câu 42. CPU cần đọc toán hạng tại địa chỉ 800 từ bộ nhớ. Cách phối hợp MAR và MBR nào đúng?

* A. Đưa 800 vào MAR; dữ liệu đọc từ ô 800 được nhận qua MBR
* B. Đưa 800 vào MBR; dữ liệu đọc được nhận qua MAR
* C. Đưa 800 vào IR; dữ liệu đọc được nhận qua PC
* D. Đưa 800 vào AC; dữ liệu đọc được nhận qua I/OAR

Câu 43. Một trình xử lý ngắt thay đổi PC và các thanh ghi làm việc nhưng không lưu chúng trước đó. Hậu quả có khả năng xảy ra nhất là gì?

* A. Bus địa chỉ tự động tăng thêm một bit
* B. Thiết bị vào/ra chuyển sang chế độ DMA
* C. Lệnh trong IR trở thành một Hardwired Program
* D. Chương trình bị ngắt không thể tiếp tục chính xác từ trạng thái trước ngắt

Câu 44. Hệ thống đang xử lý một ngắt vào/ra thì xuất hiện tín hiệu báo lỗi phần cứng nghiêm trọng. Chính sách nào phù hợp nhất nếu ngắt lỗi phần cứng có ưu tiên cao hơn?

* A. Luôn bỏ qua vĩnh viễn ngắt lỗi phần cứng
* B. Lưu ngữ cảnh xử lý hiện tại, phục vụ ngắt ưu tiên cao rồi quay lại nếu hệ thống còn an toàn
* C. Cho hai trình xử lý ngắt cùng sửa các thanh ghi mà không bảo vệ ngữ cảnh
* D. Chuyển tín hiệu lỗi sang bus dữ liệu và coi như dữ liệu thông thường

Câu 45. Một hệ thống nhiều bộ xử lý thường xuyên bị nghẽn vì nhiều thành phần tranh quyền trên một bus chung. Thay đổi nào trực tiếp xử lý nguyên nhân này tốt nhất?

* A. Giảm số bit của bus địa chỉ
* B. Dùng AC thay cho MBR
* C. Dùng các liên kết điểm–điểm độc lập để cho phép nhiều đường giao tiếp hoạt động đồng thời
* D. Buộc mọi thiết bị truyền qua một mô-đun nhập duy nhất

Câu 46. Hệ thống có đủ không gian địa chỉ nhưng mỗi lần chỉ truyền được ít dữ liệu, khiến việc chuyển khối lớn chậm. Cải tiến nào đánh đúng nút thắt nhất?

* A. Tăng độ rộng bus dữ liệu hoặc tăng khả năng truyền dữ liệu trên mỗi thao tác bus
* B. Tăng độ rộng bus địa chỉ nhưng giữ nguyên đường dữ liệu
* C. Thay PC bằng IR
* D. Tăng số lượng mã ngắt chương trình

Câu 47. Một máy có bus địa chỉ 24 bit, đánh địa chỉ theo từ; mỗi từ dài 4 byte. Dung lượng tối đa có thể đánh địa chỉ là bao nhiêu?

* A. 16 MiB
* B. 24 MiB
* C. 32 MiB
* D. 64 MiB

Câu 48. Trình tự nào mô tả đúng nhất quá trình truyền một khối dữ liệu bằng DMA?

* A. CPU sao chép từng từ; DMA chỉ tăng PC; thiết bị gửi ngắt trước khi truyền
* B. CPU cấu hình DMA; DMA trao đổi trực tiếp với bộ nhớ; khi hoàn tất, DMA thông báo cho CPU bằng ngắt
* C. DMA giải mã và thực hiện toàn bộ chương trình; CPU trở thành thiết bị vào/ra
* D. CPU đưa mọi byte vào IR; ALU chuyển từng byte tới thiết bị

Câu 49. Nhận định nào kết hợp đúng đặc trưng của QPI và liên kết điểm–điểm?

* A. QPI dùng một bus chung duy nhất và truyền frame ở tầng liên kết
* B. QPI không có tổ chức tầng và mọi thiết bị phải phân xử cùng một bus
* C. QPI sử dụng liên kết điểm–điểm; ở tầng liên kết, dữ liệu được tổ chức thành flit
* D. QPI chỉ là tên khác của thanh ghi MBR

Câu 50. Thiết bị vào/ra phát ngắt đúng lúc CPU đang thực hiện một lệnh. Trình tự xử lý tổng thể nào hợp lý nhất?

* A. Hoàn tất lệnh hiện tại; ghi nhận ngắt; lưu ngữ cảnh; chạy trình xử lý ngắt; khôi phục ngữ cảnh và tiếp tục chương trình
* B. Xóa ngay toàn bộ thanh ghi; khởi động lại máy; bỏ qua chương trình cũ
* C. Ghi tín hiệu ngắt vào AC; bỏ qua trình xử lý ngắt; tiếp tục với dữ liệu ngẫu nhiên
* D. Chuyển lệnh hiện tại sang I/OAR; để thiết bị vào/ra thực hiện lệnh thay CPU

# **BẢNG ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT**

## **BẢNG ĐÁP ÁN**

| Câu | ĐA | Câu | ĐA | Câu | ĐA | Câu | ĐA | Câu | ĐA |
| :-- | :- | :-- | :- | :-- | :- | :-- | :- | :-- | :- |
| 1   | C  | 11  | D  | 21  | C  | 31  | B  | 41  | C  |
| 2   | B  | 12  | A  | 22  | A  | 32  | D  | 42  | A  |
| 3   | A  | 13  | B  | 23  | D  | 33  | A  | 43  | D  |
| 4   | D  | 14  | D  | 24  | B  | 34  | C  | 44  | B  |
| 5   | B  | 15  | C  | 25  | C  | 35  | B  | 45  | C  |
| 6   | C  | 16  | B  | 26  | A  | 36  | D  | 46  | A  |
| 7   | A  | 17  | A  | 27  | D  | 37  | C  | 47  | D  |
| 8   | D  | 18  | C  | 28  | B  | 38  | A  | 48  | B  |
| 9   | B  | 19  | D  | 29  | C  | 39  | B  | 49  | C  |
| 10  | C  | 20  | B  | 30  | A  | 40  | D  | 50  | A  |

## **GIẢI THÍCH CHI TIẾT**

* **Câu 1 (C):** Kiến trúc Von Neumann áp dụng nguyên lý chương trình lưu trữ: lệnh và dữ liệu cùng nằm trong một bộ nhớ đọc–ghi. Các phương án còn lại tách lệnh với dữ liệu, giới hạn sai vị trí lưu trữ hoặc mô tả cách nối cứng.
* **Câu 2 (B):** CPU thường nạp và thực hiện lệnh theo trình tự tuần tự, còn lệnh điều khiển có thể làm thay đổi trình tự đó. CPU không mặc định thực hiện toàn bộ lệnh đồng thời, ngẫu nhiên hay theo địa chỉ giảm hoặc tăng tùy ý.
* **Câu 3 (A):** Hardwired Program thể hiện chức năng bằng cấu hình kết nối vật lý giữa các thành phần phần cứng. Nơi lưu tệp, ngôn ngữ hợp ngữ hay việc sử dụng RAM không quyết định một chương trình có phải nối cứng hay không.
* **Câu 4 (D):** Phần mềm cho phép thay đổi hoạt động của hệ thống bằng cách nạp một chuỗi lệnh khác mà không cần đấu nối lại phần cứng. Các lựa chọn còn lại nhầm về vai trò CPU, vị trí lưu trữ và yêu cầu nối lại mạch.
* **Câu 5 (B):** CPU gồm phần diễn giải hoặc điều khiển việc thực hiện lệnh và ALU thực hiện các thao tác số học–logic. Bộ nhớ, thiết bị vào/ra và các bus là thành phần liên kết với CPU chứ không phải đúng cặp chức năng được hỏi.
* **Câu 6 (C):** Mô-đun nhập tiếp nhận và chuyển dữ liệu bên ngoài sang dạng tín hiệu hệ thống có thể xử lý. Mô-đun xuất làm chiều ngược lại, còn bộ giải mã và cache không đảm nhiệm chuyển đổi đầu vào bên ngoài.
* **Câu 7 (A):** MAR giữ địa chỉ của vị trí bộ nhớ mà CPU sắp truy cập để đọc hoặc ghi. IR giữ lệnh, còn dữ liệu và kết quả được giữ bởi các thanh ghi như MBR hoặc AC tùy mục đích.
* **Câu 8 (D):** MBR là vùng đệm cho dữ liệu đi từ bộ nhớ vào CPU hoặc từ CPU ra bộ nhớ. Opcode, địa chỉ lệnh kế tiếp và địa chỉ thiết bị lần lượt gắn với IR, PC và I/OAR hơn là MBR.
* **Câu 9 (B):** I/OAR mang thông tin địa chỉ để chọn đúng thiết bị hoặc cổng vào/ra. Dữ liệu I/O, địa chỉ lệnh và kết quả tính toán cần các thanh ghi khác đảm nhiệm.
* **Câu 10 (C):** PC theo dõi địa chỉ lệnh kế tiếp sẽ được nạp. IR giữ lệnh hiện tại, AC giữ dữ liệu tính toán và MBR làm đệm trao đổi với bộ nhớ.
* **Câu 11 (D):** Chu kỳ nạp đưa lệnh lấy từ bộ nhớ vào IR để CPU có thể giải mã và thực hiện. MAR, AC và I/OAR không phải nơi lưu lệnh hiện hành sau bước nạp.
* **Câu 12 (A):** IR giữ lệnh vừa được nạp trong thời gian lệnh đó được giải mã và xử lý. Địa chỉ thiết bị, kết quả trung gian và địa chỉ lệnh kế tiếp thuộc về I/OAR, AC và PC.
* **Câu 13 (B):** Ở mức cơ bản, chu kỳ lệnh gồm giai đoạn nạp lệnh và giai đoạn thực hiện lệnh. Các cặp còn lại chỉ là thao tác con hoặc loại trao đổi dữ liệu, không bao quát toàn chu kỳ.
* **Câu 14 (D):** Bốn nhóm được nêu gồm bộ xử lý–bộ nhớ, bộ xử lý–I/O, xử lý dữ liệu và điều khiển. Trao đổi bộ nhớ–bộ nhớ không được liệt kê như một nhóm hành động độc lập trong phân loại này.
* **Câu 15 (C):** Lệnh điều khiển có thể rẽ nhánh hoặc thay đổi thứ tự thực hiện lệnh của chương trình. Đọc I/O, cộng số học và ghi bộ nhớ lần lượt thuộc trao đổi I/O, xử lý dữ liệu và trao đổi bộ xử lý–bộ nhớ.
* **Câu 16 (B):** AC thường giữ toán hạng, kết quả trung gian và kết quả cuối trong chuỗi tính toán. Địa chỉ bộ nhớ, địa chỉ lệnh và địa chỉ thiết bị được quản lý bởi MAR, PC và I/OAR.
* **Câu 17 (A):** IOD là giai đoạn giải mã thao tác để xác định lệnh yêu cầu CPU làm gì. Tính địa chỉ toán hạng, lưu kết quả và phục hồi ngữ cảnh là các hoạt động khác trong luồng xử lý.
* **Câu 18 (C):** OAC tính hoặc xác định địa chỉ hiệu dụng của toán hạng trước khi nạp dữ liệu cần thiết. Nó không phải bước nạp lệnh, thực thi phép toán hay xử lý lỗi phần cứng.
* **Câu 19 (D):** OS là bước lưu toán hạng hoặc kết quả về vị trí đích sau khi xử lý. Các cách hiểu chọn opcode, khởi động hệ điều hành hoặc nạp toán hạng không đúng với tên Operand Store.
* **Câu 20 (B):** Nhờ ngắt, CPU không phải liên tục chờ hoặc thăm dò thiết bị mà có thể thực hiện công việc hữu ích khác. Ngắt không tự tăng xung nhịp, độ rộng bus hay làm thiết bị chậm đạt tốc độ CPU.
* **Câu 21 (C):** Chia cho 0 là ngoại lệ phát sinh từ quá trình thực hiện chương trình nên thuộc ngắt chương trình. Timer, I/O và lỗi phần cứng có các nguồn phát sinh khác.
* **Câu 22 (A):** Timer interrupt định kỳ trao quyền điều khiển cho hệ điều hành để lập lịch và thực hiện công việc quản trị theo thời gian. Nó không làm tăng RAM, chọn cổng I/O hay thay thế chu kỳ nạp.
* **Câu 23 (D):** Ngữ cảnh chứa thông tin cần thiết như PC và các thanh ghi để chương trình tiếp tục đúng chỗ, đúng trạng thái sau ngắt. Việc lưu ngữ cảnh không nhằm xóa chương trình, chuyển lệnh sang I/O hay thay đổi bus.
* **Câu 24 (B):** Trình xử lý ngắt thường là mã đặc quyền thuộc hệ điều hành, chịu trách nhiệm phục vụ sự kiện và điều phối tài nguyên. Cache, ALU và trình biên dịch không đảm nhiệm vai trò quản lý ngắt lúc chạy.
* **Câu 25 (C):** DMA cho phép mô-đun I/O trao đổi một khối dữ liệu trực tiếp với bộ nhớ, giảm số lần CPU phải di chuyển từng từ. DMA không biến bộ nhớ thành bộ giải mã, không bỏ mô-đun I/O và không thay ALU.
* **Câu 26 (A):** Bus hệ thống được phân theo ba chức năng: truyền dữ liệu, chỉ định địa chỉ và mang tín hiệu điều khiển. Các nhóm bus ở phương án khác không phải bộ ba chức năng chuẩn nêu trong bài.
* **Câu 27 (D):** Bus dữ liệu rộng n bit có thể mang n bit trong một thao tác truyền song song tương ứng. Khả năng đánh địa chỉ do bus địa chỉ quyết định, còn số thiết bị và tần số CPU không suy ra trực tiếp từ độ rộng bus dữ liệu.
* **Câu 28 (B):** Bus địa chỉ n bit biểu diễn được tối đa 2^n mẫu địa chỉ khác nhau, từ đó giới hạn số vị trí có thể truy cập. Nó không trực tiếp chứa dữ liệu, quyết định kích thước ALU hay tốc độ I/O.
* **Câu 29 (C):** Liên kết điểm–điểm tạo đường riêng giữa các thành phần, nhờ đó giảm tranh chấp trên một phương tiện chung và có thể hỗ trợ truyền đồng thời. Nó vẫn cần điều khiển liên kết, nhưng không buộc mọi thành phần chia sẻ duy nhất một đường truyền.
* **Câu 30 (A):** Ở tầng liên kết của QPI, đơn vị truyền được gọi là flit. Frame, packet và byte không phải thuật ngữ đúng cho đơn vị tầng liên kết theo nội dung bài.
* **Câu 31 (B):** Bus địa chỉ 16 bit tạo được 2^16 = 65.536 địa chỉ; đánh địa chỉ theo byte nên dung lượng là 65.536 byte = 64 KiB. Các đáp án khác không khớp phép tính lũy thừa hai này.
* **Câu 32 (D):** Mỗi thao tác chuyển 32 bit, vì vậy 128/32 = 4 thao tác là tối thiểu. Hai hoặc ba thao tác không đủ bit, còn tám thao tác nhiều hơn mức cần thiết.
* **Câu 33 (A):** Lệnh X tại địa chỉ do PC chỉ ra được đọc và cuối cùng nạp vào IR; đồng thời PC tăng đến địa chỉ lệnh kế tiếp là 201. Các phương án khác đặt lệnh sai thanh ghi, cập nhật PC sai hoặc để IR rỗng.
* **Câu 34 (C):** Lệnh cộng lấy 7 từ ô nhớ 500 cộng với giá trị 12 đang có trong AC, cho kết quả 19. Các giá trị 5, 7 và 84 lần lượt phản ánh trừ, giữ nguyên toán hạng hoặc nhân, không đúng thao tác.
* **Câu 35 (B):** LOAD 100 đưa 5 vào AC, ADD 101 biến AC thành 13, rồi STORE 102 ghi 13 vào ô nhớ 102. Các đáp án 5, 8 và 40 bỏ qua một bước hoặc dùng phép toán sai.
* **Câu 36 (D):** Cơ chế ngắt cho phép CPU chuyển sang 70 chu kỳ công việc độc lập trong lúc thiết bị bận và nhận thông báo khi I/O hoàn tất. Nó không rút ngắn nội tại tác vụ I/O, tăng tần số hay loại bỏ chi phí phục vụ ngắt.
* **Câu 37 (C):** Lỗi chia cho 0 phải được xử lý qua trình xử lý ngắt chương trình thích hợp. DMA, mô-đun xuất và bus địa chỉ không có trách nhiệm giải quyết ngoại lệ thực thi này.
* **Câu 38 (A):** DMA phù hợp với truyền khối lớn vì phần cứng DMA điều phối trao đổi trực tiếp giữa I/O và bộ nhớ sau khi được CPU cấu hình. Các giải pháp còn lại dùng sai thanh ghi, không giảm việc sao chép của CPU hoặc nhầm truyền dữ liệu với rẽ nhánh.
* **Câu 39 (B):** Với 20 bit địa chỉ có 2^20 địa chỉ byte, tương đương 1.048.576 byte = 1 MiB. Những lựa chọn còn lại nhầm số bit với KiB hoặc nhân sai dung lượng.
* **Câu 40 (D):** Khi hai chủ thể cùng yêu cầu một bus chung, bộ phân xử phải chọn bên được quyền sử dụng để tránh xung đột. Giải mã IR, đổi độ rộng bus hay dùng I/OAR không giải quyết quyền sở hữu phương tiện truyền.
* **Câu 41 (C):** Chuỗi đúng dùng PC cấp địa chỉ cho MAR, đọc lệnh qua MBR, tăng PC và chuyển lệnh vào IR. Các phương án khác đảo vai trò thanh ghi hoặc đưa dữ liệu I/O và AC vào chu kỳ nạp một cách sai lệch.
* **Câu 42 (A):** MAR phải chứa địa chỉ 800 để chọn ô nhớ, còn MBR nhận dữ liệu đọc từ ô đó. Đảo hai thanh ghi hoặc dùng IR, PC, AC và I/OAR sẽ không tuân theo đường truyền bộ nhớ chuẩn.
* **Câu 43 (D):** Nếu PC và các thanh ghi làm việc bị thay đổi mà không được lưu, hệ thống mất trạng thái cần thiết để quay lại chương trình chính xác. Sự cố này không làm bus rộng hơn, kích hoạt DMA hay biến lệnh thành mạch nối cứng.
* **Câu 44 (B):** Với cơ chế ưu tiên, ngắt phần cứng nghiêm trọng có thể tạm ngắt trình phục vụ I/O sau khi trạng thái hiện tại được bảo toàn. Bỏ qua lỗi hoặc cho hai trình xử lý sửa chung thanh ghi không kiểm soát đều nguy hiểm, còn coi tín hiệu lỗi là dữ liệu thường là sai bản chất.
* **Câu 45 (C):** Nút thắt là sự tranh chấp trên một phương tiện dùng chung, nên nhiều liên kết điểm–điểm độc lập có thể loại bỏ điểm tranh chấp duy nhất và hỗ trợ giao tiếp song song. Giảm bus địa chỉ, đổi thanh ghi hay dồn về một mô-đun càng không xử lý đúng nguyên nhân.
* **Câu 46 (A):** Khi không gian địa chỉ đã đủ nhưng lượng dữ liệu mỗi lần truyền thấp, độ rộng hoặc năng lực của đường dữ liệu là nút thắt cần cải thiện. Tăng bus địa chỉ chỉ thêm số vị trí truy cập; thay thanh ghi hay thêm mã ngắt không tăng lượng dữ liệu mỗi lần truyền.
* **Câu 47 (D):** Bus 24 bit biểu diễn 2^24 địa chỉ từ, mỗi từ 4 byte nên tổng dung lượng là 2^24 × 4 = 2^26 byte = 64 MiB. Các phương án khác bỏ qua kích thước từ hoặc tính sai lũy thừa.
* **Câu 48 (B):** CPU thiết lập địa chỉ, hướng và kích thước truyền cho DMA; bộ điều khiển DMA sau đó trao đổi với bộ nhớ và thường phát ngắt khi xong. Các phương án khác vẫn bắt CPU chuyển từng đơn vị hoặc gán cho DMA, IR và ALU những chức năng không đúng.
* **Câu 49 (C):** QPI là kiến trúc liên kết điểm–điểm và dùng flit làm đơn vị tại tầng liên kết. Nó không phải bus chung, không thiếu tổ chức tầng và hoàn toàn không liên quan đến việc đổi tên MBR.
* **Câu 50 (A):** CPU thường hoàn tất lệnh hiện tại, nhận ngắt tại ranh giới phù hợp, lưu ngữ cảnh, chạy trình xử lý ngắt rồi khôi phục để tiếp tục. Các chuỗi còn lại phá hủy trạng thái hoặc giao sai chức năng thực thi lệnh cho thanh ghi và thiết bị I/O.
