# **ĐỀ KIỂM TRA TRẮC NGHIỆM: CHƯƠNG 2 – MÔ HÌNH DỮ LIỆU QUAN HỆ**

Môn: Database Introduction (DBI)  
Cấu trúc: 50 câu trắc nghiệm chia thành 4 mức độ nhận thức (Nhận biết, Thông hiểu, Vận dụng, Vận dụng cao) kèm Đáp án và Hướng dẫn giải chi tiết.

# **PHẦN 1: MỨC ĐỘ NHẬN BIẾT (CÂU 1 – 15\)**

Câu 1\. Ba thành phần cốt lõi cấu thành một mô hình dữ liệu (Data Model) chuẩn là gì?  
A. Cấu trúc dữ liệu, Thao tác trên dữ liệu, Ràng buộc dữ liệu  
B. Khóa chính, Khóa ngoại, Bảng hai chiều  
C. Lược đồ, Thể hiện, Kiểu dữ liệu  
D. DDL, DML, DCL

&nbsp;

Câu 2\. Trong mô hình quan hệ, một hàng (row) trong bảng đại diện cho:  
A. Một thuộc tính (Attribute)  
B. Một bộ dữ liệu (Tuple/Record)  
C. Một miền giá trị (Domain)  
D. Một lược đồ quan hệ (Schema)

&nbsp;

Câu 3\. Tiêu đề của từng cột trong quan hệ mô tả ý nghĩa dữ liệu được gọi là:  
A. Instance  
B. Domain  
C. Attribute (Thuộc tính)  
D. Tuple

&nbsp;

Câu 4\. Tính chất nguyên tử (Atomic) của miền giá trị (Domain) trong mô hình quan hệ đòi hỏi điều gì?  
A. Mỗi giá trị phải là số nguyên dương  
B. Giá trị của một thuộc tính phải là kiểu dữ liệu cơ bản, không chứa danh sách hay cấu trúc lồng phức tạp  
C. Thuộc tính không bao giờ được nhận giá trị NULL  
D. Mỗi cột bắt buộc phải có giá trị mặc định

&nbsp;

Câu 5\. Tập hợp tất cả các lược đồ quan hệ thành phần cấu thành nên một CSDL được gọi là:  
A. Relation Schema  
B. Database Instance  
C. Database Schema  
D. Relation Component

&nbsp;

Câu 6\. Ngôn ngữ SQL được chia thành hai phân ngôn ngữ chính nào?  
A. Data-Definition Language (DDL) và Data-Manipulation Language (DML)  
B. Relational Algebra và Relational Calculus  
C. Query Language và Procedural Language  
D. Static SQL và Dynamic SQL

&nbsp;

Câu 7\. Ký hiệu nào trong Đại số quan hệ đại diện cho phép Chiếu (Projection)?  
A. σ  
B. π  
C. ρ  
D. ⋈

&nbsp;

Câu 8\. Ký hiệu nào trong Đại số quan hệ đại diện cho phép Chọn (Selection)?  
A. σ  
B. π  
C. ×  
D. ∩

&nbsp;

Câu 9\. Trong Đại số quan hệ, toán tử ρ (rho) được sử dụng cho mục đích gì?  
A. Nối hai quan hệ  
B. Đổi tên quan hệ hoặc thuộc tính  
C. Tìm tập các giá trị rỗng  
D. Tính tích Đề-các

&nbsp;

Câu 10\. Điểm khác biệt cơ bản giữa kiểu dữ liệu CHAR(n) và VARCHAR(n) trong SQL là:  
A. CHAR(n) lưu số thực, VARCHAR(n) lưu chuỗi ký tự  
B. CHAR(n) có độ dài cố định (tự bù khoảng trắng nếu chuỗi ngắn hơn n), còn VARCHAR(n) có độ dài biến đổi  
C. VARCHAR(n) bắt buộc phải chứa đúng n ký tự  
D. CHAR(n) không hỗ trợ lưu trữ ký tự chữ hoa

&nbsp;

Câu 11\. Sự khác biệt then chốt giữa việc khai báo PRIMARY KEY và UNIQUE trong SQL là:  
A. UNIQUE cho phép trùng dữ liệu, PRIMARY KEY thì không  
B. Cột khai báo PRIMARY KEY không được nhận giá trị NULL, trong khi UNIQUE được phép nhận giá trị NULL  
C. Mỗi bảng có thể có nhiều PRIMARY KEY nhưng chỉ có 1 UNIQUE  
D. UNIQUE chỉ áp dụng cho kiểu số, PRIMARY KEY chỉ áp dụng cho kiểu chuỗi

&nbsp;

Câu 12\. Khái niệm "Dangling tuple" (bộ dữ liệu mồ côi) trong phép nối tự nhiên (Natural Join) dùng để chỉ:  
A. Bộ dữ liệu chứa toàn giá trị NULL  
B. Bộ dữ liệu vi phạm ràng buộc khóa chính  
C. Bộ dữ liệu ở một bảng không tìm thấy bộ tương ứng ở bảng bên kia để ghép đôi nên bị loại khỏi kết quả  
D. Bộ dữ liệu mới được thêm vào nhưng chưa được lưu trữ xuống đĩa

&nbsp;

Câu 13\. Tập 6 phép toán độc lập cốt lõi của Đại số quan hệ (không thể biểu diễn thay thế bằng các phép khác) gồm:  
A. ∪, ∩, −, σ, π, ⋈  
B. ∪, −, σ, π, ×, ρ  
C. ∩, −, σ, π, ×, ⋈  
D. ∪, −, σ, π, ⋈\_C, ⋈

&nbsp;

Câu 14\. Dữ liệu được tổ chức dưới dạng cây hoặc đồ thị với các thẻ (tags) lồng nhau theo thứ bậc (như XML) thuộc mô hình dữ liệu nào?  
A. Relational Model  
B. Semistructured-Data Model (Mô hình bán cấu trúc)  
C. Hierarchical Model  
D. Purely Object-Oriented Model

&nbsp;

Câu 15\. Hai dạng toán học tương đương thường dùng để biểu diễn ràng buộc toàn vẹn bằng Đại số quan hệ là:  
A. Dạng rỗng (R \= ∅) và Dạng tập con (R ⊆ S)  
B. Dạng bằng nhau (R \= S) và Dạng tập cha (R ⊇ S)  
C. Dạng phủ định (R ≠ S) và Dạng đối ngẫu (R ∩ S \= ∅)  
D. Dạng vô hạn (R \= ∞) và Dạng hữu hạn (R ≠ ∅)

# **PHẦN 2: MỨC ĐỘ THÔNG HIỂU (CÂU 16 – 30\)**

Câu 16\. Vì sao việc hoán đổi thứ tự các hàng hoặc hoán đổi vị trí các cột (đi kèm dữ liệu tương ứng) trong bảng không làm thay đổi bản chất của một quan hệ?  
A. Vì quan hệ được lưu trữ tuần tự trên bộ nhớ vật lý  
B. Vì quan hệ được định nghĩa toán học là một tập hợp các bộ dữ liệu và các cột được định danh bằng tên thuộc tính  
C. Vì DBMS tự động sắp xếp lại bảng theo thứ tự bảng chữ cái  
D. Vì các hàng đều có chứa khóa chính tự tăng

&nbsp;

Câu 17\. Yếu tố nào giúp Mô hình quan hệ vẫn thống trị trong các DBMS thương mại so với mô hình bán cấu trúc (XML)?  
A. Mô hình quan hệ có cấu trúc cây linh hoạt hơn  
B. Cấu trúc bảng đơn giản, tập thao tác cơ bản bị giới hạn giúp DBMS dễ dàng tối ưu hóa câu truy vấn để đạt hiệu năng rất cao  
C. Mô hình quan hệ không yêu cầu định nghĩa lược đồ (Schema) trước  
D. Cho phép lưu trữ trực tiếp các mảng và cấu trúc dữ liệu lồng nhau

&nbsp;

Câu 18\. Phát biểu nào sau đây phân biệt chính xác giữa Lược đồ quan hệ (Schema) và Thể hiện của quan hệ (Instance)?  
A. Schema thay đổi liên tục theo từng giây, còn Instance cố định vĩnh viễn  
B. Schema gồm tên quan hệ và danh sách các thuộc tính (cấu trúc tĩnh), còn Instance là tập hợp các tuple tại một thời điểm cụ thể (dữ liệu động)  
C. Schema đại diện cho dữ liệu hàng, Instance đại diện cho dữ liệu cột  
D. Schema là bảng ảo (View), Instance là bảng lưu trữ vật lý (Table)

&nbsp;

Câu 19\. Trong quan hệ Movies(title, year, length, genre), tại sao thuộc tính title đơn lẻ không thể làm khóa chính mà cần dùng khóa kết hợp (title, year)?  
A. Vì title là kiểu chuỗi ký tự nên tốc độ tìm kiếm chậm  
B. Vì một bộ phim có thể có nhiều phiên bản làm lại (remake) trùng tên sản xuất vào các năm khác nhau  
C. Vì thuộc tính year luôn luôn lớn hơn 1900  
D. Vì thuộc tính genre không có giá trị duy nhất

&nbsp;

Câu 20\. Để thực hiện được các phép toán tập hợp cơ bản (∪, ∩, −) giữa hai quan hệ R và S, điều kiện tiên quyết là gì?  
A. Hai quan hệ phải có cùng số lượng hàng  
B. Hai quan hệ phải có cùng khóa chính  
C. Hai quan hệ phải khả hợp (cùng số lượng thuộc tính, các thuộc tính tương ứng cùng miền giá trị và cùng thứ tự)  
D. Một trong hai quan hệ phải là tập con của quan hệ còn lại

&nbsp;

Câu 21\. Khi thực hiện phép Chiếu π\_genre(Movies) trên một bảng gồm 1.000 bộ phim (thuộc 5 thể loại khác nhau), kết quả trả về sẽ gồm bao nhiêu dòng?  
A. 1.000 dòng  
B. 5 dòng (vì kết quả của phép chiếu tuân thủ tính chất tập hợp, tự động loại bỏ các dòng trùng lặp hoàn toàn)  
C. 1 dòng  
D. Lỗi thực thi do thiếu điều kiện lọc

&nbsp;

Câu 22\. Cho quan hệ R(A, B) có 3 dòng và quan hệ S(B, C, D) có 4 dòng. Phép tích Đề-các R × S sẽ tạo ra quan hệ mới có:  
A. 7 dòng, 5 cột  
B. 12 dòng, 5 cột (các cột trùng tên được viết dưới dạng R.B và S.B)  
C. 12 dòng, 4 cột (cột B tự động bị gộp lại)  
D. 3 dòng, 5 cột

&nbsp;

Câu 23\. Điểm khác biệt bản chất giữa phép Nối tự nhiên (R ⋈ S) và phép Tích Đề-các (R × S) là:  
A. Phép nối tự nhiên chỉ ghép cặp các bộ dữ liệu có cùng giá trị ở các thuộc tính chung và gộp các thuộc tính trùng tên thành 1 cột  
B. Phép nối tự nhiên luôn trả về nhiều dòng hơn phép tích Đề-các  
C. Phép tích Đề-các tự động loại bỏ các Dangling tuple  
D. Phép nối tự nhiên không yêu cầu hai quan hệ phải có thuộc tính chung

&nbsp;

Câu 24\. Biểu thức nào sau đây biểu diễn phép giao (R ∩ S) thông qua phép hiệu (−) một cách chính xác?  
A. R ∩ S \= R − S  
B. R ∩ S \= S − R  
C. R ∩ S \= R − (R − S)  
D. R ∩ S \= (R ∪ S) − (R − S)

&nbsp;

Câu 25\. Phép nối Theta (R ⋈\_C S) có mối liên hệ tương đương với phép toán nào sau đây?  
A. π\_C(R × S)  
B. σ\_C(R × S)  
C. σ\_C(R ⋈ S)  
D. ρ\_C(R ∪ S)

&nbsp;

Câu 26\. Hai phát biểu ràng buộc toán học R ⊆ S và R − S \= ∅ có quan hệ như thế nào?  
A. Hoàn toàn tương đương về mặt ngữ nghĩa (mọi phần tử của R đều thuộc S thì tập các phần tử thuộc R mà không thuộc S phải là rỗng)  
B. R ⊆ S là điều kiện đủ nhưng không phải điều kiện cần của R − S \= ∅  
C. Trái ngược nhau về mặt bản chất  
D. Chỉ tương đương khi R và S có số lượng phần tử bằng nhau

&nbsp;

Câu 27\. Ràng buộc toàn vẹn tham chiếu đảm bảo cột A của quan hệ R tham chiếu đến cột B của quan hệ S được viết dưới dạng Đại số quan hệ là:  
A. π\_A(R) ∩ π\_B(S) \= ∅  
B. π\_A(R) ⊆ π\_B(S)  
C. π\_B(S) ⊆ π\_A(R)  
D. σ\_A(R) \= σ\_B(S)

&nbsp;

Câu 28\. Trong SQL, câu lệnh nào sau đây dùng để xóa hoàn toàn một cột đã có ra khỏi bảng?  
A. DROP COLUMN tên\_cột;  
B. ALTER TABLE tên\_bảng DROP tên\_cột;  
C. DELETE FROM tên\_bảng WHERE tên\_cột IS NOT NULL;  
D. UPDATE tên\_bảng DROP tên\_cột;

&nbsp;

Câu 29\. Cây biểu thức (Expression Tree) trong Đại số quan hệ được đánh giá (evaluate) theo nguyên tắc nào?  
A. Từ trên xuống dưới (Top-down)  
B. Từ dưới lên trên (Bottom-up: nút lá là quan hệ cơ sở, nút trong là các phép toán, đỉnh cây là kết quả cuối cùng)  
C. Từ trái sang phải bất kể cấp độ  
D. Ngẫu nhiên dựa trên bộ tối ưu hóa

&nbsp;

Câu 30\. Mục đích của việc gán giá trị mặc định bằng mệnh đề DEFAULT khi khai báo thuộc tính trong SQL là gì?  
A. Bắt buộc người dùng không được phép nhập giá trị mới  
B. Tự động điền giá trị được chỉ định thay vì mặc định điền NULL khi thêm bộ dữ liệu mới mà không cung cấp giá trị cho cột đó  
C. Biến cột đó thành khóa chính tự động tăng  
D. Ngăn cản thuộc tính đó bị sửa đổi bằng lệnh UPDATE

# **PHẦN 3: MỨC ĐỘ VẬN DỤNG (CÂU 31 – 40\)**

Câu 31\. Cho quan hệ R(A, B) gồm 4 bộ dữ liệu và quan hệ S(C, D, E) gồm 6 bộ dữ liệu. Không có thuộc tính nào trùng tên giữa R và S. Số lượng bộ dữ liệu và số lượng thuộc tính của quan hệ R × S lần lượt là:  
A. 10 bộ dữ liệu, 5 thuộc tính  
B. 24 bộ dữ liệu, 5 thuộc tính  
C. 24 bộ dữ liệu, 6 thuộc tính  
D. 16 bộ dữ liệu, 5 thuộc tính

&nbsp;

Câu 32\. Cho hai quan hệ sau:

&nbsp;

* R(A, B) \= {(1, 2), (3, 4)}  
* S(B, C) \= {(2, 5), (4, 6), (7, 8)}  
  Kết quả của phép nối tự nhiên R ⋈ S là:  
  A. {(1, 2, 5), (3, 4, 6)}  
  B. {(1, 2, 5), (3, 4, 6), (null, 7, 8)}  
  C. {(1, 2, 2, 5), (3, 4, 4, 6)}  
  D. {(1, 5), (3, 6)}

&nbsp;

Câu 33\. Cho quan hệ R chứa danh sách sinh viên tham gia CLB Tin học: R \= {An, Bình, Cường} và quan hệ S chứa danh sách sinh viên tham gia CLB Tiếng Anh: S \= {Bình, Dũng}. Kết quả của phép hiệu R − S là:  
A. {Bình}  
B. {An, Cường}  
C. {Dũng}  
D. {An, Cường, Dũng}

&nbsp;

Câu 34\. Để tạo bảng Movies với hai thuộc tính title (chuỗi tối đa 100 ký tự) và year (số nguyên) cùng tạo thành khóa chính phức hợp, câu lệnh SQL chuẩn là:  
A.  
CREATE TABLE Movies (  
title CHAR(100) PRIMARY KEY,  
year INT PRIMARY KEY,  
length INT  
);  
B.  
CREATE TABLE Movies (  
title CHAR(100),  
year INT,  
length INT,  
PRIMARY KEY (title, year)  
);  
C.  
CREATE TABLE Movies (  
title CHAR(100),  
year INT,  
length INT,  
KEY (title),  
KEY (year)  
);  
D.  
CREATE TABLE Movies (  
PRIMARY KEY title CHAR(100),  
PRIMARY KEY year INT  
);

&nbsp;

Câu 35\. Câu truy vấn: "Tìm tiêu đề và năm sản xuất của những bộ phim có thời lượng từ 120 phút trở lên" được biểu diễn bằng biểu thức Đại số quan hệ nào sau đây?  
A. σ\_{title, year}(π\_{length ≥ 120}(Movies))  
B. π\_{title, year}(σ\_{length ≥ 120}(Movies))  
C. π\_{title, year}(Movies) × σ\_{length ≥ 120}(Movies)  
D. σ\_{length ≥ 120}(title, year)

&nbsp;

Câu 36\. Cho bảng MovieStar đã tồn tại trong CSDL. Bạn muốn bổ sung thêm cột số điện thoại phone kiểu chuỗi 15 ký tự với giá trị mặc định khi chưa có là 'Unknown'. Câu lệnh SQL chính xác là:  
A. INSERT INTO MovieStar ADD phone CHAR(15) DEFAULT 'Unknown';  
B. ALTER TABLE MovieStar ADD phone CHAR(15) DEFAULT 'Unknown';  
C. UPDATE MovieStar ADD phone CHAR(15) \= 'Unknown';  
D. ALTER TABLE MovieStar MODIFY phone CHAR(15) DEFAULT 'Unknown';

&nbsp;

Câu 37\. Cho bảng MovieStar(name, address, gender, birthdate). Ràng buộc miền giá trị: "Cột gender chỉ chấp nhận giá trị 'F' hoặc 'M'" được biểu diễn dưới dạng biểu thức rỗng bằng Đại số quan hệ là:  
A. σ\_{gender \= 'F' AND gender \= 'M'}(MovieStar) \= ∅  
B. σ\_{gender ≠ 'F' AND gender ≠ 'M'}(MovieStar) \= ∅  
C. π\_{gender}(MovieStar) \= {'F', 'M'}  
D. σ\_{gender ≠ 'F' OR gender ≠ 'M'}(MovieStar) \= ∅

&nbsp;

Câu 38\. Cho quan hệ U(A, B) gồm các tuple: {(1, 10), (2, 20)} và quan hệ V(C, D) gồm các tuple: {(5, 10), (1, 30)}. Kết quả của phép nối Theta U ⋈\_{A \< C} V gồm bao nhiêu bộ dữ liệu?  
A. 1 bộ dữ liệu: (1, 10, 5, 10\)  
B. 2 bộ dữ liệu: (1, 10, 5, 10\) và (2, 20, 5, 10\)  
C. 0 bộ dữ liệu  
D. 3 bộ dữ liệu

&nbsp;

Câu 39\. Cặp thuộc tính (movieTitle, movieYear) trong bảng StarsIn tham chiếu đến cặp khóa (title, year) trong bảng Movies. Biểu diễn ràng buộc toàn vẹn tham chiếu này bằng dạng tập con là:  
A. π\_{title, year}(Movies) ⊆ π\_{movieTitle, movieYear}(StarsIn)  
B. π\_{movieTitle, movieYear}(StarsIn) ⊆ π\_{title, year}(Movies)  
C. π\_{movieTitle}(StarsIn) ⊆ π\_{title}(Movies)  
D. σ\_{movieTitle \= title}(StarsIn × Movies) ⊆ Movies

&nbsp;

Câu 40\. Để đổi tên thuộc tính B trong quan hệ S(B, C, D) thành X mà không làm thay đổi tên quan hệ S hay dữ liệu bên trong, ta sử dụng toán tử đổi tên:  
A. ρ\_{S(X, C, D)}(S)  
B. ρ\_{X ← B}(S)  
C. π\_{X, C, D}(S)  
D. σ\_{B \= X}(S)

# **PHẦN 4: MỨC ĐỘ VẬN DỤNG CAO (CÂU 41 – 50\)**

Câu 41\. Cho bài toán: "Tìm tên (name) và tài sản ròng (netWorth) của các nhà sản xuất đã làm ra những bộ phim có sự tham gia của diễn viên 'Harrison Ford' và phim đó được sản xuất sau năm 1990".  
Biết CSDL có các quan hệ:

&nbsp;

* StarsIn(movieTitle, movieYear, starName)  
* Movies(title, year, length, genre, studioName, producerC\#)  
* MovieExec(name, address, cert\#, netWorth)  
  Quy trình kết hợp các phép toán nào sau đây là tối ưu và chính xác nhất?  
  A.  
1. Step1 := σ\_{starName \= 'Harrison Ford' AND movieYear \> 1990}(StarsIn)  
2. Step2 := Step1 ⋈\_{movieTitle \= title AND movieYear \= year} Movies  
3. Step3 := Step2 ⋈\_{producerC\# \= cert\#} MovieExec  
4. Answer := π\_{name, netWorth}(Step3)  
   B.  
5. Step1 := StarsIn × Movies × MovieExec  
6. Step2 := σ\_{starName \= 'Harrison Ford' AND year \> 1990}(Step1)  
7. Answer := π\_{name, netWorth}(Step2)  
   C.  
8. Step1 := π\_{name, netWorth}(MovieExec)  
9. Step2 := Step1 ⋈ StarsIn ⋈ Movies  
10. Answer := σ\_{starName \= 'Harrison Ford'}(Step2)  
    D.  
11. Step1 := σ\_{movieYear \> 1990}(Movies)  
12. Step2 := Step1 ∩ StarsIn  
13. Answer := π\_{name, netWorth}(Step2 ⋈ MovieExec)

&nbsp;

Câu 42\. Xét hai biểu thức Đại số quan hệ cùng giải quyết yêu cầu "Tìm tiêu đề và năm của các phim hãng Fox có thời lượng ≥ 100 phút":

&nbsp;

* Cách 1: π\_{title, year}(σ\_{length ≥ 100}(Movies) ∩ σ\_{studioName \= 'Fox'}(Movies))  
* Cách 2: π\_{title, year}(σ\_{length ≥ 100 AND studioName \= 'Fox'}(Movies))  
  Đánh giá nào sau đây về mặt tối ưu hóa truy vấn của DBMS là đúng nhất?  
  A. Cách 1 chạy nhanh hơn vì phép giao được thực thi song song  
  B. Cách 2 tối ưu hơn Cách 1 vì chỉ cần duyệt qua quan hệ Movies một lần duy nhất để kiểm tra điều kiện kết hợp thay vì phải quét bảng hai lần rồi mới lấy giao  
  C. Hai cách có chi phí tính toán hoàn toàn giống nhau trong mọi trường hợp  
  D. Cách 1 hợp lệ còn Cách 2 sai cú pháp đại số quan hệ

&nbsp;

Câu 43\. Cho lược đồ MovieStar(name, address, gender, birthdate). Để khẳng định name là một khóa (Key) của MovieStar, biểu thức Đại số quan hệ nào sau đây diễn đạt chính xác quy tắc: "Không thể có hai bộ dữ liệu trùng name nhưng khác address"?  
A. σ\_{MS1.name \= MS2.name AND MS1.address ≠ MS2.address}(MS1 × MS2) \= ∅ (với MS1 và MS2 là hai bản sao đổi tên của MovieStar)  
B. σ\_{MS1.name \= MS2.name}(MS1 ⋈ MS2) \= ∅  
C. π\_{name}(MovieStar) ∩ π\_{address}(MovieStar) \= ∅  
D. σ\_{address \= NULL}(MovieStar) \= ∅

&nbsp;

Câu 44\. Cho hai lược đồ:

&nbsp;

* Studio(name, address, presC\#)  
* MovieExec(name, address, cert\#, netWorth)  
  Ràng buộc nghiệp vụ: "Chủ tịch của một hãng phim (presC\#) bắt buộc phải có tài sản ròng (netWorth) từ 10.000.000 trở lên". Biểu thức nào dưới đây biểu diễn SAI quy tắc này?  
  A. σ\_{netWorth \< 10000000}(Studio ⋈\_{presC\# \= cert\#} MovieExec) \= ∅  
  B. π\_{presC\#}(Studio) ⊆ π\_{cert\#}(σ\_{netWorth ≥ 10000000}(MovieExec))  
  C. π\_{presC\#}(Studio) − π\_{cert\#}(σ\_{netWorth ≥ 10000000}(MovieExec)) \= ∅  
  D. σ\_{netWorth ≥ 10000000}(Studio ⋈\_{presC\# \= cert\#} MovieExec) \= ∅

&nbsp;

Câu 45\. Cho cây biểu thức (Expression Tree) có cấu trúc như sau:

&nbsp;

* Gốc (Root): π\_{title, year}  
* Nút con trung gian: Phép giao ∩ nối hai nhánh  
  * Nhánh trái: σ\_{length ≥ 120}(Movies)  
  * Nhánh phải: σ\_{genre \= 'action'}(Movies)  
    Nếu biểu diễn câu truy vấn trên bằng ký hiệu tuyến tính (Linear Notation / Assignment steps), phương án nào sau đây diễn đạt chuẩn xác?  
    A.  
    R := σ\_{length ≥ 120}(Movies)  
    S := σ\_{genre \= 'action'}(Movies)  
    T := R ∩ S  
    Answer := π\_{title, year}(T)  
    B.  
    R := π\_{title, year}(Movies)  
    S := σ\_{length ≥ 120 AND genre \= 'action'}(R)  
    Answer := R ∩ S  
    C.  
    Step1 := Movies × Movies  
    Step2 := σ\_{length ≥ 120 OR genre \= 'action'}(Step1)  
    Answer := π\_{title, year}(Step2)  
    D.  
    R := σ\_{length ≥ 120}(Movies) ∪ σ\_{genre \= 'action'}(Movies)  
    Answer := π\_{title, year}(R)

&nbsp;

Câu 46\. Cho hai bảng dữ liệu:

&nbsp;

* R(A, B) \= {(1, x), (2, y), (3, z)}  
* S(B, C) \= {(x, 10), (y, 20), (w, 30)}  
  Khi thực hiện phép nối tự nhiên R ⋈ S:  
1. Bộ dữ liệu nào là Dangling tuple của R?  
2. Bộ dữ liệu nào là Dangling tuple của S?  
   A. Của R là (1, x); của S là (x, 10\)  
   B. Của R là (3, z); của S là (w, 30\)  
   C. Cả hai bảng đều không có Dangling tuple  
   D. Của R là (2, y); của S là (w, 30\)

&nbsp;

Câu 47\. Phép nối tự nhiên R ⋈ S giữa hai quan hệ R(A, B, C) và S(B, C, D) (với thuộc tính chung là B và C) có thể được biểu diễn tường minh qua các phép toán độc lập cơ bản là:  
A. π\_{A, R.B, R.C, D}(σ\_{R.B \= S.B AND R.C \= S.C}(R × S))  
B. σ\_{R.B \= S.B OR R.C \= S.C}(R × S)  
C. π\_{A, D}(σ\_{R.B \= S.B}(R × S))  
D. ρ\_{B, C}(R) × ρ\_{B, C}(S)

&nbsp;

Câu 48\. Giả sử bạn cần thiết kế CSDL cho hệ thống rạp chiếu phim với hai bảng:

&nbsp;

* Studio(studioName, address)  
* Movies(title, year, length, genre, studioName)  
  Biết rằng: Mỗi hãng phim có tên duy nhất (studioName), một phim được xác định duy nhất bởi cặp (title, year) và mỗi phim bắt buộc phải thuộc về một hãng phim đã có trong bảng Studio. Lệnh khai báo bảng Movies nào sau đây thiết lập đầy đủ và chính xác các khóa?  
  A.  
  CREATE TABLE Movies (  
  title VARCHAR(100),  
  year INT,  
  length INT,  
  genre VARCHAR(20),  
  studioName VARCHAR(50),  
  PRIMARY KEY (title, year),  
  FOREIGN KEY (studioName) REFERENCES Studio(studioName)  
  );  
  B.  
  CREATE TABLE Movies (  
  title VARCHAR(100) PRIMARY KEY,  
  year INT PRIMARY KEY,  
  length INT,  
  genre VARCHAR(20),  
  studioName VARCHAR(50)  
  );  
  C.  
  CREATE TABLE Movies (  
  title VARCHAR(100),  
  year INT,  
  studioName VARCHAR(50) PRIMARY KEY,  
  UNIQUE (title, year)  
  );  
  D.  
  CREATE TABLE Movies (  
  title VARCHAR(100),  
  year INT,  
  studioName VARCHAR(50) REFERENCES Studio(name)  
  );

&nbsp;

Câu 49\. Xét bảng MovieStar(name CHAR(30) PRIMARY KEY, gender CHAR(1) DEFAULT '?'). Nếu thực hiện lần lượt các thao tác sau:

&nbsp;

1. INSERT INTO MovieStar(name) VALUES ('Tom Hanks');  
2. INSERT INTO MovieStar(name, gender) VALUES ('Tom Hanks', 'M');  
   Kết quả thực thi thao tác 2 sẽ như thế nào?  
   A. Thao tác 2 thành công và ghi đè giá trị 'M' lên hàng vừa tạo  
   B. Thao tác 2 báo lỗi vi phạm ràng buộc khóa chính (PRIMARY KEY constraint violation) vì giá trị 'Tom Hanks' đã tồn tại ở hàng 1  
   C. Thao tác 2 tự động sinh ra một tuple mới với tên là 'Tom Hanks\_1'  
   D. Thao tác 2 chuyển giá trị gender của cả 2 dòng về NULL

&nbsp;

Câu 50\. Trong tối ưu hóa truy vấn đại số quan hệ, quy tắc "Đẩy phép chọn xuống trước phép nối" (Pushing Selections Down) mang lại lợi ích gì?  
A. Làm thay đổi lược đồ quan hệ đầu ra để chứa ít thuộc tính hơn  
B. Giảm kích thước trung gian của các quan hệ trước khi thực hiện phép nối hoặc tích Đề-các đắt đỏ, từ đó giảm đáng kể chi phí tính toán và bộ nhớ  
C. Loại bỏ hoàn toàn sự cần thiết của phép Chiếu  
D. Đảm bảo câu truy vấn luôn trả về tập kết quả là rỗng

# **BẢNG ĐÁP ÁN VÀ GIẢI THÍCH CHI TIẾT**

## **BẢNG ĐÁP ÁN**

| Câu | Đ/A | Câu | Đ/A | Câu | Đ/A | Câu | Đ/A | Câu | Đ/A |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| 1 | A | 11 | B | 21 | B | 31 | B | 41 | A |
| 2 | B | 12 | C | 22 | B | 32 | A | 42 | B |
| 3 | C | 13 | B | 23 | A | 33 | B | 43 | A |
| 4 | B | 14 | B | 24 | C | 34 | B | 44 | D |
| 5 | C | 15 | A | 25 | B | 35 | B | 45 | A |
| 6 | A | 16 | B | 26 | A | 36 | B | 46 | B |
| 7 | B | 17 | B | 27 | B | 37 | B | 47 | A |
| 8 | A | 18 | B | 28 | B | 38 | B | 48 | A |
| 9 | B | 19 | B | 29 | B | 39 | B | 49 | B |
| 10 | B | 20 | C | 30 | B | 40 | A | 50 | B |

## **GIẢI THÍCH CHI TIẾT**

* **Câu 1 (A):** Ba thành phần chuẩn của mọi Data Model gồm: Cấu trúc dữ liệu (Structure), Thao tác dữ liệu (Operations), và Ràng buộc dữ liệu (Constraints).  
* **Câu 2 (B):** Mỗi hàng trong bảng hai chiều đại diện cho một bản ghi hay bộ dữ liệu (Tuple).  
* **Câu 3 (C):** Tiêu đề của cột là thuộc tính (Attribute).  
* **Câu 4 (B):** Tính nguyên tử (Atomic) nghĩa là giá trị thuộc tính phải là giá trị đơn giản (số, chuỗi), không thể phân rã hay chứa mảng/danh sách.  
* **Câu 5 (C):** Database Schema là tập hợp tất cả các Relation Schema cấu thành cơ sở dữ liệu.  
* **Câu 6 (A):** SQL chia thành DDL (Data-Definition Language: CREATE, ALTER, DROP) và DML (Data-Manipulation Language: SELECT, INSERT, UPDATE, DELETE).  
* **Câu 10 (B):** CHAR(n) cố định độ dài và tự thêm khoảng trắng nếu chuỗi ngắn hơn, VARCHAR(n) có độ dài linh hoạt theo nội dung thực tế.  
* **Câu 13 (B):** 6 phép toán độc lập cốt lõi là: Hợp (∪), Hiệu (−), Chọn (σ), Chiếu (π), Tích Đề-các (×), và Đổi tên (ρ).  
* **Câu 17 (B):** Việc giới hạn tập thao tác trong mô hình quan hệ cho phép bộ tối ưu hóa (query optimizer) của DBMS tự động sinh ra kế hoạch thực thi tối ưu nhất trên đĩa cứng.  
* **Câu 21 (B):** Phép chiếu π trong đại số quan hệ thuần túy luôn loại bỏ các bộ trùng lặp, do đó chỉ còn lại đúng 5 giá trị thể loại duy nhất.  
* **Câu 26 (A):** R ⊆ S ⇔ R − S \= ∅.  
* **Câu 32 (A):** Thuộc tính chung là B. Khớp giá trị: (1, 2\) với (2, 5\) cho (1, 2, 5); (3, 4\) với (4, 6\) cho (3, 4, 6). Bộ (7, 8\) của S không khớp nên bị loại.  
* **Câu 42 (B):** Biểu thức ở Cách 2 gom hai điều kiện chọn bằng phép toán logic AND, giúp hệ thống chỉ cần quét bảng dữ liệu một lần duy nhất thay vì quét hai lần và tốn thêm chi phí lấy phép giao.  
* **Câu 50 (B):** Đẩy phép chọn xuống trước phép nối (Pushing Selections Down) là nguyên lý tối ưu hóa cốt lõi, giúp lọc bớt các dòng không thỏa mãn ngay từ đầu, giảm kích thước các bảng tham gia nối và tiết kiệm đáng kể tài nguyên hệ thống.

&nbsp;