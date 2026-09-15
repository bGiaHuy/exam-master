# I. An overview of Data model

## 1. Khái niệm Mô hình dữ liệu (Data Model) và 3 thành phần cốt lõi

Mô hình dữ liệu là một hệ thống ký hiệu dùng để mô tả dữ liệu hoặc thông tin. Một mô hình dữ liệu chuẩn gồm 3 phần:

* **Cấu trúc dữ liệu (Structure of the data):** Cách thức biểu diễn dữ liệu ở mức khái niệm (conceptual level), khác với cách máy tính lưu trữ ở mức vật lý (physical level).
  * **Ví dụ:** Trong mô hình quan hệ (Relational Model), dữ liệu được tổ chức dưới dạng bảng 2 chiều gồm các hàng (rows) và cột (columns).

* **Các thao tác trên dữ liệu (Operations on the data):** Tập hợp các thao tác giới hạn cho phép truy vấn (truy xuất) và thay đổi dữ liệu.
  * **Ví dụ:** Tìm tất cả các bộ phim có thể loại là "comedy" (phim hài), hoặc cập nhật thời lượng cho một bộ phim.

* **Các ràng buộc dữ liệu (Constraints on the data):** Các quy tắc giới hạn những giá trị hợp lệ của dữ liệu nhằm duy trì tính đúng đắn.
  * **Ví dụ:** Ràng buộc giá trị thứ trong tuần phải là số nguyên từ 1 đến 7; hoặc quy định mỗi bộ phim chỉ có tối đa một tên gọi (title).

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🧩 SƠ ĐỒ 3 THÀNH PHẦN CỐT LÕI CỦA MÔ HÌNH DỮ LIỆU
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      3 trụ cột nền tảng cấu thành nên mọi hệ quản trị cơ sở dữ liệu
    </span>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 1rem; margin: 1rem 0;">
    <div class="legend-item" style="border-top: 4px solid var(--primary); background: var(--bg-surface);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 1.25rem;">🏗️</span>
        <strong style="color: var(--primary); font-size: 0.95rem; margin: 0;">1. Cấu Trúc (Structure)</strong>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
        Cách thức dữ liệu được mô hình hóa và biểu diễn ở mức khái niệm (conceptual level).
      </p>
      <div style="margin-top: 0.6rem; padding: 0.5rem 0.65rem; background: var(--bg-card); border-radius: var(--radius-sm); font-size: 0.82rem; border-left: 3px solid var(--primary);">
        ➡️ <strong>Ví dụ:</strong> Bảng 2 chiều gồm các Hàng (tuples) và Cột (attributes).
      </div>
    </div>

    <div class="legend-item" style="border-top: 4px solid var(--purple); background: var(--bg-surface);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 1.25rem;">⚙️</span>
        <strong style="color: var(--purple); font-size: 0.95rem; margin: 0;">2. Thao Tác (Operations)</strong>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
        Tập hợp các thao tác chuẩn hóa và giới hạn để truy xuất, lọc và cập nhật dữ liệu.
      </p>
      <div style="margin-top: 0.6rem; padding: 0.5rem 0.65rem; background: var(--bg-card); border-radius: var(--radius-sm); font-size: 0.82rem; border-left: 3px solid var(--purple);">
        ➡️ <strong>Ví dụ:</strong> Lọc phim hài <code>genre = 'comedy'</code>, hoặc lệnh SQL <code>UPDATE</code>.
      </div>
    </div>

    <div class="legend-item" style="border-top: 4px solid #f59e0b; background: var(--bg-surface);">
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <span style="font-size: 1.25rem;">🛡️</span>
        <strong style="color: #b45309; font-size: 0.95rem; margin: 0;">3. Ràng Buộc (Constraints)</strong>
      </div>
      <p style="margin: 0; font-size: 0.85rem; color: var(--text-main); line-height: 1.5;">
        Các quy tắc bắt buộc nhằm ngăn chặn dữ liệu sai lệch, bảo vệ tính toàn vẹn của CSDL.
      </p>
      <div style="margin-top: 0.6rem; padding: 0.5rem 0.65rem; background: var(--bg-card); border-radius: var(--radius-sm); font-size: 0.82rem; border-left: 3px solid #f59e0b;">
        ➡️ <strong>Ví dụ:</strong> Thứ trong tuần từ 1 đến 7; Không được trùng cặp <code>(title, year)</code>.
      </div>
    </div>
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 2. Mô hình quan hệ (The Relational Model)

Mô hình quan hệ biểu diễn dữ liệu dưới dạng các bảng hai chiều (relation).

* **Cấu trúc:** Gồm các cột (tương ứng với thuộc tính) và các hàng (tương ứng với một bản ghi/bản thể dữ liệu).
  * **Ví dụ:** Bảng `Movies` có các cột `title` (tên phim), `year` (năm sản xuất), `length` (thời lượng), `genre` (thể loại) và chứa các dòng dữ liệu như `("Star Wars", 1977, 124, "sciFi")`.

* **Thao tác:** Sử dụng **Đại số quan hệ (Relational Algebra)** hoặc ngôn ngữ **SQL** để truy vấn và thao tác trên các bảng.
  * **Ví dụ:** Lọc ra danh sách các hàng trong bảng `Movies` mà cột `genre` có giá trị là `"comedy"`.

* **Ràng buộc:** Giới hạn kiểu dữ liệu hoặc quy định tính duy nhất của dữ liệu.
  * **Ví dụ:** Yêu cầu cột `genre` chỉ được nhận giá trị từ một danh sách thể loại cố định; hoặc quy định không được phép có hai bộ phim trùng tên nhau.

## 3. Mô hình bán cấu trúc (The Semistructured-Data Model)

Dữ liệu được tổ chức dưới dạng cây (tree) hoặc đồ thị (graph) với các thẻ (tags) lồng nhau theo thứ bậc.

* **Cấu trúc:** Sử dụng các thẻ đánh dấu để mô tả vai trò của từng mảnh dữ liệu.
  * **Ví dụ:** Dữ liệu dạng **XML**:

```xml
<Movies>
  <Movie title="Star Wars">
    <Year>1977</Year>
    <Length>124</Length>
    <Genre>sciFi</Genre>
  </Movie>
</Movies>
```

* **Thao tác:** Duyệt theo các đường dẫn (paths) trên cây dữ liệu từ phần tử cha đến các phần tử con lồng bên trong.
  * **Ví dụ:** Bắt đầu từ phần tử gốc `<Movies>`, đi tới từng phần tử `<Movie>`, rồi kiểm tra phần tử con `<Genre>` bên trong xem có phải là `"comedy"` hay không.

* **Ràng buộc:** Qui định kiểu dữ liệu của nội dung bên trong thẻ hoặc quy tắc lồng ghép giữa các thẻ.
  * **Ví dụ:** Kiểm tra xem nội dung bên trong thẻ `<Length>` có bắt buộc phải là số nguyên hay không, hoặc mỗi thẻ `<Movie>` có bắt buộc phải chứa thẻ `<Length>` hay không.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🌲 ĐỐI CHIẾU: MÔ HÌNH BÁN CẤU TRÚC (XML) VS MÔ HÌNH QUAN HỆ
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Cấu trúc Cây lồng nhau (Tree Hierarchy) đối sánh với Bảng 2 chiều phẳng (Flat Table)
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 1; min-width: 270px; background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: var(--radius-md); font-family: 'JetBrains Mono', monospace; font-size: 0.82rem; line-height: 1.55;">
      <div style="color: #38bdf8; font-weight: 700; font-size: 0.82rem; margin-bottom: 0.5rem; text-transform: uppercase;">
        🌲 Cấu trúc Cây XML (Thẻ lồng nhau):
      </div>
      <div>&lt;<span style="color: #f43f5e;">Movies</span>&gt;</div>
      <div style="padding-left: 1.2rem;">&lt;<span style="color: #ec4899;">Movie</span> <span style="color: #f59e0b;">title</span>=<span style="color: #a7f3d0;">"Star Wars"</span>&gt;</div>
      <div style="padding-left: 2.4rem;">&lt;<span style="color: #60a5fa;">Year</span>&gt;1977&lt;/<span style="color: #60a5fa;">Year</span>&gt;</div>
      <div style="padding-left: 2.4rem;">&lt;<span style="color: #60a5fa;">Length</span>&gt;124&lt;/<span style="color: #60a5fa;">Length</span>&gt;</div>
      <div style="padding-left: 2.4rem;">&lt;<span style="color: #60a5fa;">Genre</span>&gt;sciFi&lt;/<span style="color: #60a5fa;">Genre</span>&gt;</div>
      <div style="padding-left: 1.2rem;">&lt;/<span style="color: #ec4899;">Movie</span>&gt;</div>
      <div>&lt;/<span style="color: #f43f5e;">Movies</span>&gt;</div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem;">
      <div style="font-size: 1.8rem; color: var(--primary);">➡️</div>
      <span style="font-size: 0.74rem; font-weight: 800; color: var(--primary); background: var(--primary-light); padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap;">
        Ánh xạ sang Bảng
      </span>
    </div>

    <div style="flex: 1.2; min-width: 290px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); margin-bottom: 0.4rem; text-align: center;">
        📊 Mô hình Quan hệ: Bảng phẳng <code>Movies</code>
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th><span class="key-attribute">🔑 <u>title</u></span></th>
              <th><span class="key-attribute">🔑 <u>year</u></span></th>
              <th>length</th>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>"Star Wars"</strong></td>
              <td>1977</td>
              <td>124</td>
              <td>"sciFi"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div style="background: rgba(37, 99, 235, 0.08); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.84rem; color: var(--text-main); margin-top: 0.5rem;">
    💡 <strong>Điểm khác biệt mấu chốt:</strong> XML cho phép cấu trúc phân cấp, linh hoạt nhưng khó tối ưu hóa tốc độ. Mô hình quan hệ biểu diễn dưới dạng bảng 2 chiều phẳng, giúp Hệ quản trị CSDL (DBMS) dễ dàng lập chỉ mục (index) và tối ưu truy vấn cực nhanh.
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 4. Các mô hình dữ liệu khác

* **Mô hình đối tượng - quan hệ (Object-Relational Model):** Mở rộng mô hình quan hệ bằng cách thêm các tính năng hướng đối tượng.
  * **Ví dụ:** Giá trị trong một cột không chỉ là kiểu dữ liệu cơ bản (như số nguyên hay chuỗi) mà có thể là một cấu trúc phức tạp; hoặc các bảng có thể liên kết với các phương thức (methods) xử lý.

* **Mô hình hướng đối tượng (Purely Object-Oriented Model):** Quan hệ không còn là khái niệm trung tâm mà dữ liệu được tổ chức hoàn toàn thành các đối tượng.

* **Mô hình phân cấp (Hierarchical Model) & Mô hình mạng (Network Model):** Các mô hình cũ hơn (dạng cây và dạng đồ thị ở mức vật lý). Hiện nay ít được sử dụng vì thao tác quá chi tiết ở mức vật lý, khiến lập trình viên khó viết mã ở mức độ cao.

## 5. So sánh và ưu điểm của Mô hình quan hệ

Mặc dù mô hình bán cấu trúc (XML) linh hoạt hơn, **Mô hình quan hệ** vẫn là lựa chọn hàng đầu trong các Hệ quản trị cơ sở dữ liệu (DBMS) thương mại nhờ vào:

* **Tính đơn giản nhưng linh hoạt:** Cấu trúc bảng hạn chế nhưng đủ sức biểu diễn hầu như mọi loại dữ liệu.

* **Tối ưu hóa hiệu năng cao:** Bằng việc giới hạn tập hợp các thao tác cơ bản (thông qua SQL), hệ thống quản trị CSDL có thể tự động tối ưu hóa câu truy vấn để chạy cực nhanh trên các tập dữ liệu lớn lưu trữ trên đĩa cứng.
  * **Ví dụ:** Một vài dòng lệnh SQL đơn giản có thể thực hiện công việc tương đương với hàng nghìn dòng lệnh trong ngôn ngữ C mà vẫn đảm bảo tốc độ thực thi tối ưu.

---

# II. Basics of the Relational Model

## 1. Thuộc tính (Attributes)

Thuộc tính đại diện cho các đặc trưng hoặc tiêu đề của từng cột trong quan hệ. Mỗi thuộc tính mô tả ý nghĩa của dữ liệu nằm ở cột đó.

* **Ví dụ:** Trong quan hệ `Movies`, các thuộc tính là `title` (tên phim), `year` (năm sản xuất), `length` (thời lượng tính bằng phút), và `genre` (thể loại).

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🎬 BẢNG MINH HỌA QUAN HỆ (RELATION): <code>Movies</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      📌 Sơ đồ trực quan: Thuộc tính (Cột) • Bộ dữ liệu (Hàng) • Thành phần (Ô) • Khóa kết hợp
    </span>
  </div>

  <div class="annotated-table-container">
    <table class="annotated-table">
      <thead>
        <tr>
          <th style="width: 30%;">
            <span class="arrow-label-top">⬇️ Cột 1: Thuộc tính (Attribute)</span>
            <span class="key-attribute">🔑 <u>title</u></span>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: normal; margin-top: 3px;">
              Miền: <code>string</code> (Tên phim)
            </div>
          </th>
          <th style="width: 22%;">
            <span class="arrow-label-top">⬇️ Cột 2: Thuộc tính (Attribute)</span>
            <span class="key-attribute">🔑 <u>year</u></span>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: normal; margin-top: 3px;">
              Miền: <code>integer</code> (Năm SX)
            </div>
          </th>
          <th style="width: 24%;">
            <span class="arrow-label-top">⬇️ Cột 3: Thuộc tính (Attribute)</span>
            <span style="font-weight: 700; font-size: 1rem; color: var(--text-main);">length</span>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: normal; margin-top: 3px;">
              Miền: <code>integer</code> (Thời lượng)
            </div>
          </th>
          <th style="width: 24%;">
            <span class="arrow-label-top">⬇️ Cột 4: Thuộc tính (Attribute)</span>
            <span style="font-weight: 700; font-size: 1rem; color: var(--text-main);">genre</span>
            <div style="font-size: 0.78rem; color: var(--text-muted); font-weight: normal; margin-top: 3px;">
              Miền: <code>string</code> (Thể loại)
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <span class="arrow-label-left">➡️ Hàng 1 (Tuple)</span>
            <strong>"Star Wars"</strong>
          </td>
          <td>1977</td>
          <td>124</td>
          <td>"sciFi"</td>
        </tr>
        <tr style="background: rgba(37, 99, 235, 0.05);">
          <td>
            <span class="arrow-label-left">➡️ Hàng 2 (Tuple)</span>
            <span class="component-highlight" title="Một giá trị đơn lẻ tại giao điểm 1 hàng và 1 cột gọi là Thành phần (Component)">
              🎯 "Gone With the Wind"
            </span>
          </td>
          <td>1939</td>
          <td>231</td>
          <td>"drama"</td>
        </tr>
        <tr>
          <td>
            <span class="arrow-label-left">➡️ Hàng 3 (Tuple)</span>
            <strong>"Wayne's World"</strong>
          </td>
          <td>1992</td>
          <td>95</td>
          <td>"comedy"</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="diagram-legend-grid">
    <div class="legend-item" style="border-left: 3px solid var(--purple);">
      <strong style="color: var(--purple);">⬇️ Thuộc tính (Attribute / Cột)</strong>
      <span>Đại diện cho tiêu đề từng cột: <code>title</code>, <code>year</code>, <code>length</code>, <code>genre</code>. Mô tả đặc trưng của đối tượng.</span>
    </div>

    <div class="legend-item" style="border-left: 3px solid var(--primary);">
      <strong style="color: var(--primary);">➡️ Bộ dữ liệu (Tuple / Hàng)</strong>
      <span>Mỗi hàng là một tuple đại diện cho 1 bản ghi phim đầy đủ: <code>("Star Wars", 1977, 124, "sciFi")</code>.</span>
    </div>

    <div class="legend-item" style="border-left: 3px solid #f59e0b;">
      <strong style="color: #b45309;">🎯 Thành phần (Component / Ô)</strong>
      <span>Ô dữ liệu đơn lẻ (ví dụ <code>"Gone With the Wind"</code>). Giá trị bắt buộc phải là kiểu cơ bản (nguyên tử - Atomic).</span>
    </div>

    <div class="legend-item" style="border-left: 3px solid #10b981;">
      <strong style="color: #059669;">🔑 Khóa kết hợp (Composite Key)</strong>
      <span>Cặp <code>(title, year)</code> được <u>gạch chân</u> làm khóa chính vì phải kết hợp cả 2 cột mới đảm bảo không bao giờ trùng nhau.</span>
    </div>
  </div>
<!-- RELATION_DIAGRAM_END -->
</div>

## 2. Lược đồ Quan hệ và Lược đồ CSDL (Schemas)

* **Lược đồ quan hệ (Relation Schema):** Gồm tên quan hệ đi kèm tập hợp các thuộc tính của nó (thường được viết theo một thứ tự chuẩn trong ngoặc đơn).
  * **Ví dụ:** `Movies(title, year, length, genre)`.

* **Lược đồ CSDL quan hệ (Database Schema):** Tập hợp tất cả các lược đồ quan hệ thành phần cấu thành nên một cơ sở dữ liệu.
  * **Ví dụ:** CSDL quản lý phim gồm tập hợp các lược đồ `Movies(...)`, `MovieStar(...)`, `StarsIn(...)`, `MovieExec(...)`, và `Studio(...)`.

## 3. Bộ dữ liệu (Tuples) và Thành phần (Components)

* **Bộ dữ liệu (Tuple):** Mỗi hàng trong quan hệ (không tính hàng tiêu đề) đại diện cho một bản ghi. Khi viết riêng lẻ, tuple được bao quanh bởi cặp ngoặc đơn và ngăn cách bằng dấu phẩy.

* **Thành phần (Component):** Mỗi giá trị tương ứng với một thuộc tính trong tuple.
  * **Ví dụ:** Dòng dữ liệu `(Gone With the Wind, 1939, 231, drama)` là một tuple có 4 thành phần: thành phần `title` là `"Gone With the Wind"`, `year` là `1939`, `length` là `231`, và `genre` là `"drama"`.

## 4. Miền giá trị (Domains)

Mọi thành phần trong tuple phải mang tính **nguyên tử (atomic)** — tức là kiểu dữ liệu cơ bản (số, chuỗi) chứ không được chứa danh sách, mảng hay cấu trúc phức tạp. Mỗi thuộc tính có một miền giá trị (kiểu dữ liệu) xác định.

* **Ví dụ biểu diễn kèm kiểu dữ liệu:**

```text
Movies(title: string, year: integer, length: integer, genre: string)
```

* Ở đây, `title` nhận giá trị dạng chuỗi (`string`), `year` nhận giá trị số nguyên (`integer`).

## 5. Sự tương đương trong cách biểu diễn Quan hệ (Equivalent Representations)

Một quan hệ được định nghĩa là một **tập hợp các tuple** (không phải một danh sách sắp thứ tự). Do đó:

* Việc hoán đổi thứ tự các hàng (tuples) không làm thay đổi bản chất của quan hệ.
* Việc hoán đổi vị trí các cột (attributes) đi kèm dữ liệu tương ứng của cột đó cũng tạo ra một bảng biểu diễn tương đương.
  * **Ví dụ:** Bảng hiển thị các cột theo thứ tự `(year, genre, title, length)` cùng dữ liệu đảo vị trí dòng vẫn biểu diễn chính quan hệ `Movies` ban đầu.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🔄 SỰ TƯƠNG ĐƯƠNG TRONG BIỂU DIỄN QUAN HỆ (EQUIVALENCE)
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Đổi thứ tự cột hoặc thứ tự dòng <strong>không làm thay đổi</strong> bản chất của quan hệ
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 1; min-width: 270px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.4rem; text-align: center;">
        Thứ tự cột A: <code>(title, year, length, genre)</code>
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th>title</th>
              <th>year</th>
              <th>length</th>
              <th>genre</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>"Star Wars"</strong></td>
              <td>1977</td>
              <td>124</td>
              <td>"sciFi"</td>
            </tr>
            <tr>
              <td><strong>"Wayne's World"</strong></td>
              <td>1992</td>
              <td>95</td>
              <td>"comedy"</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem;">
      <div style="font-size: 2rem; font-weight: 900; color: var(--primary);">≡</div>
      <span style="font-size: 0.76rem; font-weight: 800; color: var(--primary); background: var(--primary-light); padding: 0.2rem 0.55rem; border-radius: 4px; white-space: nowrap;">
        Đồng nhất 100%
      </span>
    </div>

    <div style="flex: 1; min-width: 270px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.4rem; text-align: center;">
        Thứ tự cột B: <code>(year, genre, title, length)</code> (Đảo cả hàng & cột)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th>year</th>
              <th>genre</th>
              <th>title</th>
              <th>length</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1992</td>
              <td>"comedy"</td>
              <td><strong>"Wayne's World"</strong></td>
              <td>95</td>
            </tr>
            <tr>
              <td>1977</td>
              <td>"sciFi"</td>
              <td><strong>"Star Wars"</strong></td>
              <td>124</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div style="background: rgba(37, 99, 235, 0.08); padding: 0.75rem 1rem; border-radius: var(--radius-sm); font-size: 0.84rem; color: var(--text-main); margin-top: 0.5rem;">
    💡 <strong>Bản chất lý thuyết:</strong> Quan hệ là một <strong>tập hợp (Set)</strong> các bộ dữ liệu, không phải danh sách có thứ tự. Việc hoán đổi vị trí các cột (đi kèm dữ liệu của cột đó) hoặc hoán đổi thứ tự các dòng không tạo ra quan hệ mới, mà chỉ là cách hiển thị khác nhau của cùng một quan hệ.
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 6. Thể hiện của Quan hệ (Relation Instances)

Dữ liệu trong CSDL thay đổi theo thời gian (thêm, sửa, xóa các tuple). Tập hợp các tuple tại một thời điểm cụ thể được gọi là một **thể hiện (instance)** của quan hệ.

* **Ví dụ:** Bảng `Movies` tại thời điểm năm 1990 chưa có phim *Wayne's World* (sản xuất năm 1992). Thể hiện hiện tại (current instance) của bảng tại hình 3 chỉ gồm 3 bộ phim được lưu trữ tại thời điểm đó.

## 7. Khóa của Quan hệ (Keys of Relations)

Khóa là một thuộc tính hoặc một tập hợp các thuộc tính dùng để **định danh duy nhất** một tuple trong quan hệ (không bao giờ có 2 tuple trùng giá trị ở tất cả các thuộc tính tạo nên khóa). Trong lược đồ, thuộc tính khóa được **gạch chân**.

* **Khóa kết hợp (Composite Key):** Trong bảng `Movies`, thuộc tính `title` không thể làm khóa riêng lẻ vì có thể trùng tên (ví dụ: các bản làm lại của phim *King Kong*). Kết hợp `(title, year)` mới tạo thành khóa duy nhất.
  * **Ví dụ lược đồ:** `Movies(`**`title`**`, `**`year`**`, length, genre)`.

* **Khóa nhân tạo (Artificial Key):** Tạo ra một mã định danh duy nhất cho từng đối tượng thay vì dùng thông tin tự nhiên.
  * **Ví dụ:** Mã số nhân viên (employee ID), Số Căn cước / Bảo hiểm xã hội (Social-Security number), Mã số sinh viên (student ID), Mã bằng lái xe hoặc mã chứng chỉ `cert#` trong bảng `MovieExec`.

---

# III. Defining a Relation Schema in SQL

## 1. Phân loại Phân ngôn ngữ SQL và Phân loại Quan hệ

SQL chia thành 2 ngôn ngữ con chính: **Data-Definition** (định nghĩa dữ liệu) và **Data-Manipulation** (thao tác/truy vấn dữ liệu). Trong SQL có 3 loại quan hệ:

* **Stored relations (Tables):** Các quan hệ được lưu trữ thực sự trong cơ sở dữ liệu, cho phép sửa đổi dữ liệu.
* **Views:** Các quan hệ ảo được tạo ra từ câu lệnh truy vấn, không lưu trữ cố định mà được tính toán khi cần.
* **Temporary tables:** Các bảng tạm thời do bộ xử lý SQL tự tạo khi thực thi câu lệnh và tự xóa sau đó.

* **Ví dụ khai báo Bảng:** Tạo một bảng lưu trữ thực sự trong CSDL:

```sql
CREATE TABLE Movies ( ... );
```

## 2. Các Kiểu Dữ liệu Nguyên tử trong SQL (Data Types)

Mỗi thuộc tính khi khai báo bắt buộc phải đi kèm một kiểu dữ liệu:

* **Chuỗi ký tự:** `CHAR(n)` (chuỗi độ dài cố định, tự thêm khoảng trắng nếu ngắn hơn `n`) và `VARCHAR(n)` (chuỗi độ dài biến đổi).
  * **Ví dụ:** `'foo'` lưu trong `CHAR(5)` sẽ trở thành `'foo  '` (thêm 2 khoảng trắng), còn `VARCHAR(255)` dùng cho địa chỉ nhà.

* **Chuỗi Bit:** `BIT(n)` hoặc `BIT VARYING(n)`.

* **Kiểu Logic:** `BOOLEAN` nhận các giá trị `TRUE`, `FALSE`, hoặc `UNKNOWN`.

* **Số nguyên:** `INT`, `INTEGER`, `SHORTINT`.

* **Số thực:** `FLOAT`, `REAL`, `DOUBLE PRECISION`, `DECIMAL(n, d)` hoặc `NUMERIC`.
  * **Ví dụ:** `DECIMAL(6,2)` có thể lưu trữ giá trị `0123.45` (tối đa 6 chữ số, 2 chữ số thập phân).

* **Ngày / Giờ:** `DATE` (định dạng `DATE 'YYYY-MM-DD'`) và `TIME` (định dạng `TIME 'HH:MM:SS'`).
  * **Ví dụ:** `DATE '1948-05-14'` hoặc `TIME '15:00:02.5'`.

## 3. Khai báo Bảng Đơn giản (Simple Table Declarations)

Cú pháp `CREATE TABLE` dùng để đặt tên bảng, danh sách thuộc tính và kiểu dữ liệu tương ứng.

* **Ví dụ:** Khai báo bảng diễn viên phim:

```sql
CREATE TABLE MovieStar (
    name CHAR(30),
    address VARCHAR(255),
    gender CHAR(1),
    birthdate DATE
);
```

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      💻 ĐỐI CHIẾU LỆNH SQL CREATE TABLE SANG BẢNG QUAN HỆ
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Cách câu lệnh SQL định hình trực tiếp các cột, kiểu dữ liệu và khóa chính
    </span>
  </div>

  <div style="display: flex; align-items: stretch; justify-content: center; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 1; min-width: 280px; background: #0f172a; color: #f8fafc; padding: 1rem; border-radius: var(--radius-md); font-family: 'JetBrains Mono', monospace; font-size: 0.84rem; line-height: 1.65;">
      <div style="color: #94a3b8; font-size: 0.76rem; margin-bottom: 0.5rem; text-transform: uppercase; font-weight: 700;">
        Câu lệnh SQL:
      </div>
      <div><span style="color: #c084fc; font-weight: 700;">CREATE TABLE</span> <span style="color: #60a5fa; font-weight: 700;">MovieStar</span> (</div>
      <div style="padding-left: 1rem;"><span style="color: #f59e0b;">name</span> <span style="color: #38bdf8;">CHAR(30)</span> <span style="color: #ec4899; font-weight: 700;">PRIMARY KEY</span>, <span style="color: #94a3b8;">-- 🔑 Khóa chính</span></div>
      <div style="padding-left: 1rem;"><span style="color: #f59e0b;">address</span> <span style="color: #38bdf8;">VARCHAR(255)</span>,</div>
      <div style="padding-left: 1rem;"><span style="color: #f59e0b;">gender</span> <span style="color: #38bdf8;">CHAR(1)</span> <span style="color: #c084fc;">DEFAULT</span> <span style="color: #a7f3d0;">'?'</span>,</div>
      <div style="padding-left: 1rem;"><span style="color: #f59e0b;">birthdate</span> <span style="color: #38bdf8;">DATE</span></div>
      <div>);</div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem;">
      <div style="font-size: 1.8rem; color: var(--purple);">➡️</div>
      <span style="font-size: 0.74rem; font-weight: 800; color: var(--purple); background: rgba(124, 58, 237, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap;">
        Sinh ra bảng
      </span>
    </div>

    <div style="flex: 1.2; min-width: 300px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--text-muted); margin-bottom: 0.4rem; text-align: center;">
        Bảng Quan Hệ Được Tạo: <code>MovieStar</code>
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th>
                <span class="key-attribute">🔑 <u>name</u></span>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">CHAR(30)</div>
              </th>
              <th>
                <span>address</span>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">VARCHAR(255)</div>
              </th>
              <th>
                <span>gender</span>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">CHAR(1) = '?'</div>
              </th>
              <th>
                <span>birthdate</span>
                <div style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal; margin-top: 2px;">DATE</div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>"Carrie Fisher"</strong></td>
              <td>"123 Maple St"</td>
              <td>'F'</td>
              <td>1956-10-21</td>
            </tr>
            <tr>
              <td><strong>"Mark Hamill"</strong></td>
              <td>"456 Oak Ave"</td>
              <td>'M'</td>
              <td>1951-09-25</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 4. Thay đổi Lược đồ Quan hệ (Modifying Relation Schemas)

Dùng để xóa hoàn toàn bảng hoặc sửa đổi các cột trong bảng đã tồn tại.

* **Xóa bảng:**

```sql
DROP TABLE R;
```

Xóa toàn bộ bảng `R` và dữ liệu trong đó.

* **Thêm thuộc tính:** `ALTER TABLE ... ADD ...`.
  * **Ví dụ:**

```sql
ALTER TABLE MovieStar ADD phone CHAR(16);
```

* **Xóa thuộc tính:** `ALTER TABLE ... DROP ...`.
  * **Ví dụ:**

```sql
ALTER TABLE MovieStar DROP birthdate;
```

## 5. Giá trị Mặc định (Default Values)

Khi thêm hàng mới hoặc thêm cột mới mà không cung cấp giá trị, hệ thống mặc định điền `NULL`. Ta có thể đổi thành giá trị cố định bằng từ khóa `DEFAULT`.

* **Ví dụ 1 (khi khai báo cột):**

```sql
gender CHAR(1) DEFAULT '?'
```

* **Ví dụ 2 (khi thêm cột mới bằng ALTER TABLE):**

```sql
ALTER TABLE MovieStar ADD phone CHAR(16) DEFAULT 'unlisted';
```

## 6. Khai báo Khóa (Declaring Keys)

Có 2 từ khóa chính để chỉ định khóa: `PRIMARY KEY` (không được trùng, **không được mang giá trị NULL**) và `UNIQUE` (không được trùng, nhưng **được phép chứa NULL**).

Cú pháp khai báo tùy thuộc vào số lượng thuộc tính làm khóa:

* **Khóa đơn (Khai báo trực tiếp dòng chứa thuộc tính):**

```sql
CREATE TABLE MovieStar (
    name CHAR(30) PRIMARY KEY,
    address VARCHAR(255)
);
```

* **Khóa đơn (Khai báo dòng riêng cuối bảng):**

```sql
CREATE TABLE MovieStar (
    name CHAR(30),
    address VARCHAR(255),
    PRIMARY KEY (name)
);
```

* **Khóa phức hợp / Khóa kết hợp (Bắt buộc khai báo dòng riêng cuối bảng):**

```sql
CREATE TABLE Movies (
    title CHAR(100),
    year INT,
    length INT,
    PRIMARY KEY (title, year)
);
```

---

# IV. An Algebraic Query Language

## 1. Bản chất và Mục đích của Đại số Quan hệ (Relational Algebra)

Đại số quan hệ là một ngôn ngữ truy vấn dựa trên các phép toán đại số (gồm các toán tử và các toán hạng nguyên tử là những biến quan hệ hoặc hằng số quan hệ).

* **Lý do cần ngôn ngữ chuyên biệt:** Nó cố tình **kém mạnh mẽ hơn** các ngôn ngữ lập trình thông thường như C hay Java (ví dụ: không thể dùng Đại số quan hệ để kiểm tra tổng số dòng của một bảng là số chẵn hay số lẻ). Nhờ sự giới hạn này, trình dịch DBMS có thể dễ dàng tối ưu hóa câu truy vấn để đạt hiệu năng cực cao.

* **Vai trò:** Dù không được dùng trực tiếp làm ngôn ngữ truy vấn giao diện trong DBMS thương mại, đại số quan hệ là nền tảng cốt lõi bên trong của SQL. Khi ta chạy một câu lệnh SQL, DBMS sẽ dịch nó thành biểu thức đại số quan hệ để xử lý.

## 2. Các Phép toán Tập hợp trên Quan hệ (Set Operations)

Áp dụng trên 2 quan hệ `R` và `S`. Để thực hiện được, `R` và `S` **bắt buộc phải có cùng tập thuộc tính (cùng miền giá trị) và xếp theo cùng thứ tự**.

* **Phép hợp (R ∪ S):** Lấy tất cả các bộ dữ liệu thuộc `R`, thuộc `S` hoặc cả hai (loại bỏ trùng lặp).
  * **Ví dụ:** Cho quan hệ `R` chứa diễn viên Carrie Fisher, Mark Hamill và `S` chứa Carrie Fisher, Harrison Ford. Khi đó `R ∪ S` gồm 3 diễn viên: Carrie Fisher, Mark Hamill, và Harrison Ford.

* **Phép giao (R ∩ S):** Chỉ lấy các bộ dữ liệu xuất hiện ở cả `R` và `S`.
  * **Ví dụ:** `R ∩ S` chỉ trả về Carrie Fisher.

* **Phép hiệu (R - S):** Lấy các bộ dữ liệu có trong `R` nhưng không có trong `S`.
  * **Ví dụ:** `R - S` chỉ trả về Mark Hamill.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🧮 MINH HỌA CÁC PHÉP TOÁN TẬP HỢP: HỢP (∪), GIAO (∩), HIỆU (-)
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Hai bảng R và S bắt buộc phải cùng tập thuộc tính và cùng miền giá trị
    </span>
  </div>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1rem; margin: 1rem 0;">
    <div style="border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 0.75rem; background: var(--bg-card);">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); margin-bottom: 0.3rem;">Bảng R (2 dòng):</div>
      <div class="annotated-table-container" style="margin: 0 0 0.75rem 0;">
        <table class="annotated-table" style="font-size: 0.8rem;">
          <thead><tr><th>starName</th></tr></thead>
          <tbody><tr><td>Carrie Fisher</td></tr><tr><td>Mark Hamill</td></tr></tbody>
        </table>
      </div>

      <div style="font-weight: 700; font-size: 0.84rem; color: var(--purple); margin-bottom: 0.3rem;">Bảng S (2 dòng):</div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.8rem;">
          <thead><tr><th>starName</th></tr></thead>
          <tbody><tr><td>Carrie Fisher</td></tr><tr><td>Harrison Ford</td></tr></tbody>
        </table>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; gap: 0.75rem; justify-content: center;">
      <div style="background: rgba(37, 99, 235, 0.08); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--primary);">
        <strong style="color: var(--primary); font-size: 0.86rem;">1. Phép Hợp (R ∪ S): Lấy tất cả (3 người)</strong>
        <div style="font-size: 0.82rem; margin-top: 0.2rem; color: var(--text-main);">
          Carrie Fisher, Mark Hamill, Harrison Ford <em>(tự động loại bỏ trùng lặp)</em>.
        </div>
      </div>

      <div style="background: rgba(124, 58, 237, 0.08); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid var(--purple);">
        <strong style="color: var(--purple); font-size: 0.86rem;">2. Phép Giao (R ∩ S): Chỉ lấy phần chung (1 người)</strong>
        <div style="font-size: 0.82rem; margin-top: 0.2rem; color: var(--text-main);">
          Chỉ có <strong>Carrie Fisher</strong> xuất hiện đồng thời ở cả hai bảng R và S.
        </div>
      </div>

      <div style="background: rgba(245, 158, 11, 0.08); padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); border-left: 3px solid #f59e0b;">
        <strong style="color: #b45309; font-size: 0.86rem;">3. Phép Hiệu (R - S): Có trong R mà không có trong S</strong>
        <div style="font-size: 0.82rem; margin-top: 0.2rem; color: var(--text-main);">
          Chỉ có <strong>Mark Hamill</strong> (Carrie Fisher bị loại vì đã nằm trong S).
        </div>
      </div>
    </div>
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 3. Phép Chiếu (Projection: π)

Dùng để chọn ra một số cột (thuộc tính) nhất định từ một quan hệ và loại bỏ các cột còn lại. Nếu kết quả xuất hiện các dòng trùng lặp hoàn toàn, phép chiếu sẽ tự động loại bỏ để giữ đúng tính chất tập hợp.

* **Ký hiệu:**

$$
\pi_{A_1,A_2,\ldots,A_n}(R)
$$

* **Ví dụ 1:** Lấy 3 cột tiêu đề, năm và thời lượng của bảng phim:

$$
\pi_{title,\ year,\ length}(Movies)
$$

* **Ví dụ 2 (Loại bỏ trùng lặp):** Khi chiếu cột thể loại

$$
\pi_{genre}(Movies)
$$

dù có nhiều phim cùng thể loại `comedy`, kết quả trả về chỉ giữ lại 1 dòng `sciFi` và 1 dòng `comedy`.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      ✂️ MINH HỌA PHÉP CHIẾU (PROJECTION): <code>π<sub>title, length</sub>(Movies)</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Chọn lọc các <strong>CỘT</strong> cần thiết và loại bỏ các cột không dùng
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
    <!-- Bảng ban đầu -->
    <div style="flex: 1.1; min-width: 280px;">
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem; text-align: center;">
        Bảng Gốc: <code>Movies</code> (4 cột)
      </div>
      <table class="annotated-table" style="font-size: 0.84rem;">
        <thead>
          <tr>
            <th style="background: rgba(37, 99, 235, 0.15); color: var(--primary);">title (Lấy ✅)</th>
            <th style="opacity: 0.5;">year (Bỏ ❌)</th>
            <th style="background: rgba(37, 99, 235, 0.15); color: var(--primary);">length (Lấy ✅)</th>
            <th style="opacity: 0.5;">genre (Bỏ ❌)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>"Star Wars"</strong></td>
            <td style="opacity: 0.5;">1977</td>
            <td><strong>124</strong></td>
            <td style="opacity: 0.5;">"sciFi"</td>
          </tr>
          <tr>
            <td><strong>"Gone With the Wind"</strong></td>
            <td style="opacity: 0.5;">1939</td>
            <td><strong>231</strong></td>
            <td style="opacity: 0.5;">"drama"</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mũi tên chuyển đổi -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem;">
      <div style="font-size: 1.8rem; color: var(--purple);">➡️</div>
      <span style="font-size: 0.78rem; font-weight: 800; color: var(--purple); background: rgba(124, 58, 237, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap;">
        Chiếu π
      </span>
    </div>

    <!-- Bảng kết quả -->
    <div style="flex: 0.8; min-width: 220px;">
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--purple); margin-bottom: 0.4rem; text-align: center;">
        Kết Quả Chiếu: <code>π<sub>title, length</sub>(Movies)</code> (2 cột)
      </div>
      <table class="annotated-table" style="font-size: 0.84rem; border-color: var(--purple);">
        <thead>
          <tr style="background: rgba(124, 58, 237, 0.12);">
            <th style="color: var(--purple); border-bottom-color: var(--purple);">title</th>
            <th style="color: var(--purple); border-bottom-color: var(--purple);">length</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>"Star Wars"</strong></td>
            <td>124</td>
          </tr>
          <tr>
            <td><strong>"Gone With the Wind"</strong></td>
            <td>231</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<!-- RELATION_DIAGRAM_END -->
</div>

## 4. Phép Chọn (Selection: σ)

Dùng để lọc ra các hàng (tuples) thỏa mãn một điều kiện `C` nào đó.

* **Ký hiệu:**

$$
\sigma_C(R)
$$

* **Ví dụ 1 (Điều kiện đơn):** Lọc các phim có thời lượng từ 100 phút trở lên:

$$
\sigma_{length \ge 100}(Movies)
$$

* **Ví dụ 2 (Điều kiện kết hợp AND):** Lọc các phim do hãng Fox sản xuất và dài ít nhất 100 phút:

$$
\sigma_{length \ge 100\ AND\ studioName='Fox'}(Movies)
$$

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge" style="background: linear-gradient(135deg, #10b981, #059669);">
      🔍 MINH HỌA PHÉP CHỌN (SELECTION): <code>σ<sub>length ≥ 100</sub>(Movies)</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Lọc giữ lại các <strong>HÀNG</strong> thỏa mãn điều kiện thời lượng ≥ 100 phút
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 1rem; flex-wrap: wrap; margin: 1rem 0;">
    <!-- Bảng ban đầu -->
    <div style="flex: 1.1; min-width: 290px;">
      <div style="font-weight: 700; font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.4rem; text-align: center;">
        Bảng Gốc: <code>Movies</code> (3 hàng)
      </div>
      <table class="annotated-table" style="font-size: 0.84rem;">
        <thead>
          <tr>
            <th>title</th>
            <th>year</th>
            <th>length</th>
            <th>genre</th>
          </tr>
        </thead>
        <tbody>
          <tr style="background: rgba(16, 185, 129, 0.1);">
            <td><strong>"Star Wars"</strong></td>
            <td>1977</td>
            <td><strong>124</strong> (≥ 100 ✅ Giữ)</td>
            <td>"sciFi"</td>
          </tr>
          <tr style="background: rgba(16, 185, 129, 0.1);">
            <td><strong>"Gone With the Wind"</strong></td>
            <td>1939</td>
            <td><strong>231</strong> (≥ 100 ✅ Giữ)</td>
            <td>"drama"</td>
          </tr>
          <tr style="opacity: 0.45; background: rgba(239, 68, 68, 0.05); text-decoration: line-through;">
            <td>"Wayne's World"</td>
            <td>1992</td>
            <td>95 (< 100 ❌ Loại)</td>
            <td>"comedy"</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mũi tên chuyển đổi -->
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 0.5rem;">
      <div style="font-size: 1.8rem; color: #10b981;">➡️</div>
      <span style="font-size: 0.78rem; font-weight: 800; color: #059669; background: rgba(16, 185, 129, 0.12); padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap;">
        Chọn σ
      </span>
    </div>

    <!-- Bảng kết quả -->
    <div style="flex: 1; min-width: 270px;">
      <div style="font-weight: 700; font-size: 0.85rem; color: #059669; margin-bottom: 0.4rem; text-align: center;">
        Kết Quả Chọn: <code>σ<sub>length ≥ 100</sub>(Movies)</code> (2 hàng)
      </div>
      <table class="annotated-table" style="font-size: 0.84rem; border-color: #10b981;">
        <thead>
          <tr style="background: rgba(16, 185, 129, 0.15);">
            <th style="color: #059669; border-bottom-color: #10b981;">title</th>
            <th style="color: #059669; border-bottom-color: #10b981;">year</th>
            <th style="color: #059669; border-bottom-color: #10b981;">length</th>
            <th style="color: #059669; border-bottom-color: #10b981;">genre</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>"Star Wars"</strong></td>
            <td>1977</td>
            <td>124</td>
            <td>"sciFi"</td>
          </tr>
          <tr>
            <td><strong>"Gone With the Wind"</strong></td>
            <td>1939</td>
            <td>231</td>
            <td>"drama"</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
<!-- RELATION_DIAGRAM_END -->
</div>

## 5. Tích Tích đề-các (Cartesian Product: ×)

Ghép từng bộ dữ liệu của quan hệ `R` với từng bộ dữ liệu của quan hệ `S`. Nếu hai quan hệ có thuộc tính trùng tên, ta phải đổi tên dạng `R.A` và `S.A` để tránh nhầm lẫn.

* **Ký hiệu:**

$$
R \times S
$$

* **Ví dụ:** Quan hệ `R` có 2 dòng `(A, B)`, quan hệ `S` có 3 dòng `(B, C, D)`. Phép `R × S` sẽ sinh ra một bảng gồm `2 × 3 = 6` dòng với các cột `(A, R.B, S.B, C, D)`.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      ✖️ MINH HỌA TÍCH ĐỀ-CÁC (CARTESIAN PRODUCT): <code>R × S</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Ghép mọi dòng của R với mọi dòng của S • 2 dòng × 2 dòng = 4 dòng kết quả
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 0.8; min-width: 130px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); text-align: center; margin-bottom: 0.3rem;">
        Bảng R(A, B)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th>A</th><th>B</th></tr></thead>
          <tbody>
            <tr><td>1</td><td>2</td></tr>
            <tr><td>3</td><td>4</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="font-size: 1.5rem; font-weight: 900; color: var(--purple);">×</div>

    <div style="flex: 0.8; min-width: 130px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--purple); text-align: center; margin-bottom: 0.3rem;">
        Bảng S(B, C)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th>B</th><th>C</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>"X"</td></tr>
            <tr><td>4</td><td>"Y"</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="font-size: 1.5rem; color: var(--primary);">➡️</div>

    <div style="flex: 1.4; min-width: 240px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); text-align: center; margin-bottom: 0.3rem;">
        Kết Quả: <code>R × S</code> (4 dòng)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.8rem;">
          <thead>
            <tr>
              <th>A</th>
              <th style="color: var(--primary); background: var(--primary-light);">R.B</th>
              <th style="color: var(--purple); background: rgba(124, 58, 237, 0.1);">S.B</th>
              <th>C</th>
            </tr>
          </thead>
          <tbody>
            <tr><td>1</td><td style="color: var(--primary); font-weight: 700;">2</td><td style="color: var(--purple); font-weight: 700;">2</td><td>"X"</td></tr>
            <tr><td>1</td><td style="color: var(--primary); font-weight: 700;">2</td><td style="color: var(--purple); font-weight: 700;">4</td><td>"Y"</td></tr>
            <tr><td>3</td><td style="color: var(--primary); font-weight: 700;">4</td><td style="color: var(--purple); font-weight: 700;">2</td><td>"X"</td></tr>
            <tr><td>3</td><td style="color: var(--primary); font-weight: 700;">4</td><td style="color: var(--purple); font-weight: 700;">4</td><td>"Y"</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div style="background: rgba(37, 99, 235, 0.08); padding: 0.65rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-main); margin-top: 0.5rem;">
    💡 <strong>Quy tắc đổi tên cột trùng:</strong> Vì cả <code>R</code> và <code>S</code> đều có cột <code>B</code>, hệ thống tự động đổi tên thành <code>R.B</code> và <code>S.B</code> để phân biệt rõ nguồn gốc.
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 6. Phép Nối Tự nhiên (Natural Join: ⋈)

Ghép cặp các dòng từ `R` và `S` **chỉ khi chúng có cùng giá trị ở các thuộc tính chung**. Các thuộc tính trùng tên sẽ được gộp lại thành 1 cột duy nhất.

* **Ký hiệu:**

$$
R \bowtie S
$$

* **Ví dụ:** Cho `R(A, B)` có dòng `(1, 2)` và `S(B, C, D)` có dòng `(2, 5, 6)`. Vì trùng giá trị ở thuộc tính chung `B = 2`, kết quả nối sẽ tạo ra dòng `(1, 2, 5, 6)`.

* **Bộ dữ liệu mồ côi (Dangling tuple):** Dòng nào không tìm thấy dòng tương ứng ở quan hệ bên kia để ghép đôi thì sẽ bị loại khỏi kết quả.

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🔗 MINH HỌA PHÉP NỐI TỰ NHIÊN (NATURAL JOIN): <code>R ⋈ S</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Ghép cặp các dòng có cùng giá trị ở cột chung <code>B</code> • Gộp cột trùng tên
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 0.8; min-width: 140px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); text-align: center; margin-bottom: 0.3rem;">
        Bảng R(A, B)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th>A</th><th style="background: rgba(245, 158, 11, 0.15); color: #b45309;">B (Chung)</th></tr></thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.1);"><td>1</td><td><strong>2 ✅</strong></td></tr>
            <tr style="opacity: 0.45; text-decoration: line-through;"><td>3</td><td><strong>4 ❌</strong></td></tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.72rem; color: var(--danger); margin-top: 0.25rem;">(3, 4) là dòng mồ côi vì S không có B=4</div>
    </div>

    <div style="font-size: 1.5rem; font-weight: 900; color: var(--purple);">⋈</div>

    <div style="flex: 1; min-width: 180px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--purple); text-align: center; margin-bottom: 0.3rem;">
        Bảng S(B, C, D)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th style="background: rgba(245, 158, 11, 0.15); color: #b45309;">B (Chung)</th><th>C</th><th>D</th></tr></thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.1);"><td><strong>2 ✅</strong></td><td>5</td><td>6</td></tr>
            <tr style="opacity: 0.45; text-decoration: line-through;"><td><strong>8 ❌</strong></td><td>7</td><td>9</td></tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.72rem; color: var(--danger); margin-top: 0.25rem;">(8, 7, 9) là dòng mồ côi vì R không có B=8</div>
    </div>

    <div style="font-size: 1.5rem; color: var(--success);">➡️</div>

    <div style="flex: 1.2; min-width: 220px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--success); text-align: center; margin-bottom: 0.3rem;">
        Kết Quả: <code>R ⋈ S</code> (Gộp cột B)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem; border-color: var(--success);">
          <thead>
            <tr style="background: var(--success-light);">
              <th style="color: var(--success);">A</th>
              <th style="color: #b45309; background: rgba(245, 158, 11, 0.2);">B (Gộp 1 cột)</th>
              <th style="color: var(--success);">C</th>
              <th style="color: var(--success);">D</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.15); font-weight: 700;">
              <td>1</td>
              <td style="color: #b45309;">2</td>
              <td>5</td>
              <td>6</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.74rem; color: var(--success); font-weight: 600; margin-top: 0.25rem;">✅ Chỉ ghép được dòng có B=2 trùng nhau</div>
    </div>
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 7. Phép Nối Theta (Theta-Join: ⋈₍C₎)

Là sự kết hợp giữa **Tích Đề-các** và **Phép chọn theo điều kiện C bất kỳ**. Phép nối này không tự động gộp các cột trùng tên như Phép nối tự nhiên.

* **Ký hiệu:**

$$
R \bowtie_C S = \sigma_C(R \times S)
$$

* **Ví dụ 1 (Điều kiện so sánh bé hơn):** Ghép hai bảng `U` và `V` với điều kiện giá trị cột `A` của `U` phải nhỏ hơn giá trị cột `D` của `V`:

$$
U \bowtie_{A<D} V
$$

* **Ví dụ 2 (Điều kiện phức hợp):** Kết hợp thêm điều kiện cột `B` của hai bảng khác nhau:

$$
U \bowtie_{A<D\ AND\ U.B\ne V.B} V
$$

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      📐 MINH HỌA PHÉP NỐI THETA (THETA-JOIN): <code>U ⋈<sub>A &lt; D</sub> V</code>
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Nối theo điều kiện bất kỳ (<code>A &lt; D</code>) • Giữ nguyên cả 2 cột trùng tên (<code>U.B</code> và <code>V.B</code>)
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 0.8rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 0.8; min-width: 140px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--primary); text-align: center; margin-bottom: 0.3rem;">
        Bảng U(A, B)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th>A</th><th>B</th></tr></thead>
          <tbody>
            <tr><td><strong>1</strong></td><td>2</td></tr>
            <tr><td><strong>3</strong></td><td>4</td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="font-size: 1.5rem; font-weight: 900; color: var(--purple);">⋈<sub>A &lt; D</sub></div>

    <div style="flex: 1; min-width: 180px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--purple); text-align: center; margin-bottom: 0.3rem;">
        Bảng V(B, C, D)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead><tr><th>B</th><th>C</th><th style="background: rgba(124, 58, 237, 0.15); color: var(--purple);">D</th></tr></thead>
          <tbody>
            <tr><td>2</td><td>5</td><td><strong>2</strong></td></tr>
            <tr><td>4</td><td>7</td><td><strong>5</strong></td></tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="font-size: 1.5rem; color: var(--success);">➡️</div>

    <div style="flex: 1.5; min-width: 270px;">
      <div style="font-weight: 700; font-size: 0.84rem; color: var(--success); text-align: center; margin-bottom: 0.3rem;">
        Kết Quả: <code>U ⋈<sub>A &lt; D</sub> V</code> (3 dòng thỏa mãn)
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.8rem; border-color: var(--success);">
          <thead>
            <tr style="background: var(--success-light);">
              <th style="color: var(--success);">A</th>
              <th style="color: var(--primary);">U.B</th>
              <th style="color: var(--purple);">V.B</th>
              <th style="color: var(--success);">C</th>
              <th style="color: var(--success);">D</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.12);">
              <td><strong>1</strong></td><td>2</td><td>2</td><td>5</td><td><strong>2</strong> (1 &lt; 2 ✅)</td>
            </tr>
            <tr style="background: rgba(16, 185, 129, 0.12);">
              <td><strong>1</strong></td><td>2</td><td>4</td><td>7</td><td><strong>5</strong> (1 &lt; 5 ✅)</td>
            </tr>
            <tr style="background: rgba(16, 185, 129, 0.12);">
              <td><strong>3</strong></td><td>4</td><td>4</td><td>7</td><td><strong>5</strong> (3 &lt; 5 ✅)</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="font-size: 0.74rem; color: var(--text-muted); margin-top: 0.25rem;">
        (Cặp A=3 với D=2 bị loại vì 3 &lt; 2 là Sai ❌)
      </div>
    </div>
  </div>

  <div style="background: rgba(124, 58, 237, 0.08); padding: 0.65rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-main); margin-top: 0.5rem; border-left: 3px solid var(--purple);">
    💡 <strong>Khác biệt sống còn với Phép nối tự nhiên:</strong> Phép nối Theta <strong>không tự động gộp cột trùng tên</strong>. Cả cột <code>B</code> của bảng U (đổi thành <code>U.B</code>) và cột <code>B</code> của bảng V (đổi thành <code>V.B</code>) đều được bảo lưu đầy đủ trong kết quả!
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 8. Kết hợp các Phép toán thành Câu Truy vấn Phức tạp

Ta có thể lồng ghép nhiều phép toán đại số quan hệ (hoặc biểu diễn dưới dạng cây biểu thức) để giải quyết các truy vấn thực tế.

### Nguyên lý kết hợp các Phép toán (Composition of Operations)

Vì kết quả của bất kỳ phép toán đại số quan hệ nào (như Phép chọn `σ`, Phép chiếu `π`, Phép nối `⋈`) cũng đều là một **quan hệ (bảng)**, nên ta có thể lấy kết quả đó làm đầu vào (toán hạng) cho một phép toán tiếp theo.

### Quy trình tổng quát

1. **Nối (Join):** Ghép nối dữ liệu từ nhiều bảng liên quan lại với nhau.
2. **Lọc (Selection):** Loại bỏ các dòng không đáp ứng điều kiện.
3. **Chiếu (Projection):** Giữ lại các cột cần thiết cho đầu ra cuối cùng.

### Ví dụ Minh họa Bài toán Thực tế

**Bài toán:** *"Tìm tên và tài sản ròng (netWorth) của các nhà sản xuất đã làm ra những bộ phim có sự tham gia của diễn viên 'Harrison Ford' và bộ phim đó được sản xuất sau năm 1990."*

Để giải quyết truy vấn này bằng Đại số quan hệ, ta thực hiện lồng ghép các phép toán:

### Cách 1: Biểu diễn dạng Biểu thức Tuyến tính (Linear / Assignment Steps)

Cách viết này chia nhỏ truy vấn thành từng dòng gán `:=` để theo dõi luồng xử lý dữ liệu:

1. **Lọc danh sách các phim của Harrison Ford đóng sau năm 1990:**

$$
Step1 := \sigma_{starName='Harrison\ Ford'\ AND\ movieYear>1990}(StarsIn)
$$

2. **Nối kết quả trên với bảng Movies để tìm thông tin nhà sản xuất (`producerC#`):**

$$
Step2 := Step1 \bowtie_{movieTitle=title\ AND\ movieYear=year} Movies
$$

3. **Nối tiếp với bảng MovieExec dựa trên mã chứng chỉ nhà sản xuất để lấy tên và tài sản:**

$$
Step3 := Step2 \bowtie_{producerC\#=cert\#} MovieExec
$$

4. **Chiếu lấy các thuộc tính kết quả cuối cùng:**

$$
Answer(name,\ netWorth) := \pi_{name,\ netWorth}(Step3)
$$

### Cách 2: Biểu diễn dạng Biểu thức Đơn dòng (Nested Expression)

Biểu diễn toàn bộ truy vấn trong một dòng duy nhất bằng cách lồng các ký hiệu toán học:

$$
\pi_{name,\ netWorth}
\left(
\sigma_{starName='Harrison\ Ford'\ AND\ year>1990}
(StarsIn \bowtie Movies)
\bowtie_{producerC\#=cert\#}
MovieExec
\right)
$$

Một câu truy vấn có thể được viết bằng nhiều biểu thức đại số quan hệ **tương đương** nhau (cho ra cùng một kết quả). Bộ tối ưu hóa (optimizer) trong hệ quản trị CSDL sẽ tự động biến đổi câu lệnh của người dùng thành biểu thức có chi phí tính toán thấp nhất để thực thi nhanh nhất.

* **Ví dụ:** Hai biểu thức sau cho cùng một kết quả nhưng cách thực thi khác nhau:

  * **Cách 1 (dùng phép giao):**

$$
\pi_{title,\ year}
\left(
\sigma_{length\ge100}(Movies)
\cap
\sigma_{studioName='Fox'}(Movies)
\right)
$$

* **Cách 2 (gộp điều kiện chọn):**

$$
\pi_{title,\ year}
\left(
\sigma_{length\ge100\ AND\ studioName='Fox'}(Movies)
\right)
$$

* *(Cách 2 thường tối ưu hơn vì chỉ cần duyệt qua bảng Movies một lần thay vì lọc hai lần rồi lấy phép giao).*

## 9. Phép Đổi tên (Naming and Renaming: ρ)

Toán tử đổi tên `ρ` được dùng để đổi tên của một quan hệ, tên các thuộc tính của nó, hoặc cả hai. Việc này giúp kiểm soát chính xác tên gọi thuộc tính khi thực hiện các phép toán phức tạp (như Tích Đề-các) nhằm tránh xung đột tên.

* **Ký hiệu:**

$$
\rho_{S(A_1,A_2,\ldots,A_n)}(R)
$$

hoặc đơn giản là:

$$
\rho_S(R)
$$

nếu chỉ đổi tên quan hệ.

* **Ví dụ:** Cho quan hệ `S(B, C, D)`. Để đổi tên thuộc tính `B` thành `X` mà giữ nguyên dữ liệu, ta dùng:

$$
\rho_{S(X,C,D)}(S)
$$

* Khi thực hiện tích Đề-các:

$$
R \times \rho_{S(X,C,D)}(S)
$$

kết quả sẽ có các thuộc tính phân biệt rõ ràng là `(A, B, X, C, D)` thay vì bị trùng thuộc tính `B`.

## 10. Mối quan hệ giữa các Phép toán (Relationships Among Operations)

Một số phép toán đại số quan hệ có thể biểu diễn qua các phép toán cơ bản khác:

### Phép giao biểu diễn qua Phép hiệu

$$
R \cap S = R - (R - S)
$$

* **Ví dụ:** Lấy tập `R` trừ đi phần dữ liệu chỉ có trong `R` mà không có trong `S`, kết quả còn lại chính là phần chung giữa `R` và `S`.

### Phép Nối Theta biểu diễn qua Tích Đề-các và Phép chọn

$$
R \bowtie_C S = \sigma_C(R \times S)
$$

* **Ví dụ:** Phép nối

$$
U \bowtie_{A<D} V
$$

tương đương với việc lấy tích Đề-các `U × V` trước, sau đó lọc dữ liệu bằng:

$$
\sigma_{A<D}
$$

### Phép Nối Tự nhiên biểu diễn qua Tích Đề-các, Phép chọn và Phép chiếu

$$
R \bowtie S = \pi_L(\sigma_C(R \times S))
$$

* **Ví dụ:** Để nối tự nhiên `U ⋈ V` với các thuộc tính chung là `B` và `C`, ta lấy `U × V`, chọn điều kiện:

$$
U.B = V.B\ AND\ U.C = V.C
$$

sau đó chiếu bỏ các cột `B`, `C` dư thừa của `V`.

**Lưu ý:** 6 phép toán độc lập cốt lõi (không thể thay thế lẫn nhau) gồm:

* **Phép hợp (∪)**
* **Phép hiệu (-)**
* **Phép chọn (σ)**
* **Phép chiếu (π)**
* **Tích Đề-các (×)**
* **Phép đổi tên (ρ)**

## 11. Biểu diễn Biểu thức Đại số dạng Cây (Expression Trees)

Với các câu truy vấn phức tạp, ta có thể dựng thành một **Cây biểu thức (Expression Tree)**. Cây này được đánh giá theo thứ tự từ dưới lên (bottom-up): các quan hệ gốc ở dưới cùng, các phép toán nằm ở nút bên trong, và kết quả truy vấn nằm ở đỉnh cây.

* **Ví dụ:** Truy vấn *"Tìm tiêu đề và năm của các bộ phim do hãng Fox sản xuất có thời lượng ≥ 100 phút"*:

  * **Các nút lá (dưới cùng):** Quan hệ `Movies`.
  * **Các nút trung gian:**
    * Nút chọn `σ_{length ≥ 100}` ở nhánh trái.
    * Nút chọn `σ_{studioName = 'Fox'}` ở nhánh phải.
    * Nút giao `∩` nối hai nhánh lại.
  * **Nút gốc (trên cùng):** Nút chiếu `π_{title, year}`.

## 12. Ký hiệu Tuyến tính cho Biểu thức Đại số (Linear Notation)

Bên cạnh dạng cây hay dạng công thức lồng nhau dài dòng, ta có thể viết truy vấn dưới dạng **chuỗi các phép gán theo từng bước (sequential assignments)** bằng toán tử `:=`. Phép gán này cho phép tạo các quan hệ tạm thời giúp câu lệnh rõ ràng, dễ đọc hơn.

* **Ví dụ:** Biểu diễn truy vấn ở Mục 3 thành các bước gán tuyến tính:

1.

$$
R(t,y,l,i,s,p) := \sigma_{length\ge100}(Movies)
$$

2.

$$
S(t,y,l,i,s,p) := \sigma_{studioName='Fox'}(Movies)
$$

3.

$$
T(t,y,l,i,s,p) := R \cap S
$$

4.

$$
Answer(title,\ year) := \pi_{t,y}(T)
$$

---

# V. Constraints in relations

## 1. Biểu diễn Ràng buộc bằng Đại số Quan hệ (Relational Algebra as a Constraint Language)

Đại số quan hệ có thể dùng như một ngôn ngữ để định nghĩa các ràng buộc dữ liệu theo 2 dạng toán học tương đương:

* **Dạng rỗng (`R = ∅`):** Yêu cầu kết quả của biểu thức đại số `R` phải là tập hợp rỗng (không chứa bất kỳ dòng vi phạm nào). Đây là dạng phổ biến nhất trong SQL.

* **Dạng tập con (`R ⊆ S`):** Yêu cầu mọi bộ dữ liệu thu được từ biểu thức `R` đều phải thuộc kết quả của biểu thức `S`.

* **Mối quan hệ:** Ràng buộc

$$
R \subseteq S
$$

hoàn toàn tương đương với:

$$
R - S = \varnothing
$$

## 2. Ràng buộc Toàn vẹn Tham chiếu (Referential Integrity Constraints)

Đảm bảo giá trị xuất hiện ở một cột trong quan hệ này bắt buộc phải tồn tại ở cột tương ứng trong quan hệ khác (tương tự như khái niệm Khóa ngoại - Foreign Key).

* **Biểu diễn toán học:**

$$
\pi_A(R) \subseteq \pi_B(S)
$$

hoặc:

$$
\pi_A(R) - \pi_B(S) = \varnothing
$$

* **Ví dụ 1 (Khóa đơn):** Mã nhà sản xuất `producerC#` trong bảng `Movies` bắt buộc phải là một mã chứng chỉ `cert#` hợp lệ đã có trong bảng `MovieExec`:

$$
\pi_{producerC\#}(Movies)
\subseteq
\pi_{cert\#}(MovieExec)
$$

* **Ví dụ 2 (Khóa kết hợp):** Cặp `(movieTitle, movieYear)` trong bảng `StarsIn` phải tồn tại trong bảng `Movies`:

$$
\pi_{movieTitle,\ movieYear}(StarsIn)
\subseteq
\pi_{title,\ year}(Movies)
$$

<!-- RELATION_DIAGRAM_START -->
<div class="relation-diagram-card">
  <div class="diagram-header">
    <div class="diagram-title-badge">
      🛡️ RÀNG BUỘC TOÀN VẸN THAM CHIẾU (REFERENTIAL INTEGRITY)
    </div>
    <span style="font-size: 0.85rem; color: var(--text-muted); font-weight: 600;">
      Giá trị khóa ngoại ở bảng con <strong>bắt buộc phải tồn tại</strong> ở bảng cha
    </span>
  </div>

  <div style="display: flex; align-items: center; justify-content: center; gap: 1.2rem; flex-wrap: wrap; margin: 1rem 0;">
    <div style="flex: 1.1; min-width: 270px;">
      <div style="font-weight: 700; font-size: 0.86rem; color: var(--primary); margin-bottom: 0.4rem; text-align: center;">
        Bảng Con: <code>Movies</code>
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th>title</th>
              <th>year</th>
              <th style="background: rgba(124, 58, 237, 0.15); color: var(--purple);">
                🔗 producerC# (Khóa ngoại)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.1);">
              <td>"Star Wars"</td>
              <td>1977</td>
              <td><strong>23456</strong> ➔ (Hợp lệ ✅)</td>
            </tr>
            <tr style="background: rgba(239, 68, 68, 0.1);">
              <td>"Phim Lạ"</td>
              <td>2024</td>
              <td><strong style="color: var(--danger);">99999</strong> ➔ (Bị Chặn ❌)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
      <div style="font-size: 1.8rem; color: var(--purple);">➡️</div>
      <span style="font-size: 0.74rem; font-weight: 800; color: var(--purple); background: rgba(124, 58, 237, 0.1); padding: 0.2rem 0.5rem; border-radius: 4px; white-space: nowrap;">
        Tham chiếu Foreign Key
      </span>
    </div>

    <div style="flex: 1; min-width: 260px;">
      <div style="font-weight: 700; font-size: 0.86rem; color: var(--purple); margin-bottom: 0.4rem; text-align: center;">
        Bảng Cha: <code>MovieExec</code>
      </div>
      <div class="annotated-table-container" style="margin: 0;">
        <table class="annotated-table" style="font-size: 0.82rem;">
          <thead>
            <tr>
              <th style="background: rgba(124, 58, 237, 0.15); color: var(--purple);">
                🔑 cert# (Khóa chính)
              </th>
              <th>name</th>
              <th>netWorth</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: rgba(16, 185, 129, 0.1);">
              <td><strong>23456 ✅</strong></td>
              <td>"George Lucas"</td>
              <td>$500,000,000</td>
            </tr>
            <tr>
              <td>12345</td>
              <td>"Steven Spielberg"</td>
              <td>$400,000,000</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>

  <div style="background: rgba(239, 68, 68, 0.08); border-left: 3px solid var(--danger); padding: 0.65rem 0.9rem; border-radius: var(--radius-sm); font-size: 0.82rem; color: var(--text-main); margin-top: 0.5rem;">
    ⚠️ <strong>Nguyên tắc bảo vệ:</strong> Không cho phép chèn bộ phim có mã <code>producerC# = 99999</code> vì trong danh mục nhà sản xuất (<code>MovieExec</code>) chưa hề có mã này!
  </div>
</div>
<!-- RELATION_DIAGRAM_END -->

## 3. Ràng buộc Khóa (Key Constraints)

Sử dụng đại số quan hệ để khẳng định một thuộc tính (hoặc tập thuộc tính) là khóa của quan hệ bằng cách chứng minh không thể có 2 dòng trùng khóa nhưng khác các giá trị còn lại.

* **Cơ chế:** Nối quan hệ với chính nó và tìm các cặp dòng có cùng giá trị khóa nhưng khác giá trị ở thuộc tính khác; tập kết quả này bắt buộc phải bằng `∅`.

* **Ví dụ:** Đảm bảo `name` là khóa của `MovieStar(name, address, gender, birthdate)` (nếu trùng `name` thì không thể khác `address`):

$$
\sigma_{MS1.name=MS2.name\ AND\ MS1.address\ne MS2.address}
(MS1 \times MS2)
=
\varnothing
$$

*(Trong đó `MS1` và `MS2` là hai bản sao đổi tên từ `MovieStar`).*

## 4. Các Ràng buộc Miền giá trị & Điều kiện Phức tạp (Additional Constraints)

Dùng biểu thức chọn `σ` kết hợp điều kiện phủ định để lọc ra các trường hợp dữ liệu vi phạm quy tắc logic và gán kết quả bằng `∅`.

* **Ví dụ 1 (Ràng buộc miền giá trị):** Cột giới tính `gender` của `MovieStar` chỉ chấp nhận giá trị `'F'` hoặc `'M'`:

$$
\sigma_{gender\ne'F'\ AND\ gender\ne'M'}(MovieStar)
=
\varnothing
$$

* **Ví dụ 2 (Ràng buộc logic liên bảng):** Chủ tịch của một hãng phim (`presC#`) bắt buộc phải có tài sản ròng (`netWorth`) từ `10.000.000` trở lên:

$$
\sigma_{netWorth<10000000}
\left(
Studio
\bowtie_{presC\#=cert\#}
MovieExec
\right)
=
\varnothing
$$

*(Hoặc biểu diễn dạng tập con:)*

$$
\pi_{presC\#}(Studio)
\subseteq
\pi_{cert\#}
\left(
\sigma_{netWorth\ge10000000}(MovieExec)
\right)
$$
