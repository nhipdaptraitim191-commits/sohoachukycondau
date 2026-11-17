# Phần mềm tạo mã quét QR chuyên nghiệp

Phần mềm tạo mã QR miễn phí, giao diện tiếng Việt. Phần mềm được viết bởi Võ Hữu Ngợi - 0917010170. Mọi thứ chạy ngay trên máy người dùng: không quảng cáo, không tài khoản, không gửi dữ liệu ra ngoài. Mã tạo ra là mã tĩnh, không hết hạn.

## Tính năng

- **10 loại nội dung:** liên kết, văn bản, Wi-Fi, danh thiếp (vCard), chuyển khoản VietQR, Zalo, email, số điện thoại và SMS, vị trí, sự kiện lịch.
- **Tên tiêu đề trên mã QR:** ô nhập nằm ngay dưới phần nội dung, để trống sẵn cho người dùng tự nhập; tiêu đề hiện dưới mã hoặc trên nhãn của khung.
- **Thiết kế:** 22 mẫu có sẵn (12 mẫu hiện đại, 10 mẫu cổ điển), màu chuyển sắc thẳng hoặc toả tròn, màu riêng cho ô định vị, 9 kiểu điểm, 7 kiểu ô định vị, nền trong suốt, chèn logo, 5 kiểu khung và nhãn.
- **Trợ lý AI thiết kế tự động (offline):** phân tích màu logo ngay trên máy, tự phối màu, chọn nền, khung, viền, gợi ý tiêu đề (không tự điền), rồi tự vẽ thử và chỉnh cho tới khi mã quét được. Có nút tự sửa thiết kế khó quét và nút hoàn tác. Không dùng mạng, không gửi dữ liệu đi đâu.
- **Kho mẫu AI:** 1.000 mẫu hiện đại (40 tông màu, 25 kiểu dáng), lọc theo tông màu và kiểu dáng; có nút để AI tự sáng tạo thêm mẫu mới, mỗi mẫu mới đều được giải mã thử trước khi hiện ra.
- **Tự kiểm tra:** sau mỗi thay đổi, phần mềm tự giải mã lại ảnh vừa vẽ và báo ngay nếu thiết kế làm mã khó quét.
- **Xuất file:** PNG tới khoảng 4096 px, SVG vector, sao chép để dán vào Word hoặc Zalo, in trực tiếp.
- **Toàn màn hình:** nút trên thanh đầu trang mở cả phần mềm toàn màn hình để dễ thao tác. Nút "Phóng to mã" hiện mã QR thật to trên nền trắng để trình chiếu cho nhiều người cùng quét.
- **Tạo hàng loạt:** dán danh sách (tối đa 300 dòng), nhận về một file ZIP.
- **Quét mã QR:** quét bằng camera của điện thoại hoặc máy tính, hoặc đọc từ một ảnh có sẵn; hình ảnh được xử lý ngay trên máy.
- Giao diện sáng và tối, lưu các mã gần đây ngay trên máy.

## Ba cách dùng

| Cách dùng | Dành cho | Cách lấy |
| --- | --- | --- |
| Trang web | Điện thoại, máy tính bảng, máy tính | Mở địa chỉ GitHub Pages của kho này. Trên Chrome, Edge hoặc Safari có thể cài thành ứng dụng và dùng khi mất mạng. |
| File `index.html` | Máy không có mạng | Tải file về rồi mở bằng trình duyệt. Cả phần mềm nằm trong một file. |
| Ứng dụng Windows `.exe` | Máy tính Windows 10, 11 (64 bit) | Tải ở mục **Releases**. Bản `portable` chạy ngay không cần cài; bản `setup` cài vào máy và tạo biểu tượng. |

File `.exe` chưa có chữ ký số nên lần đầu mở, Windows có thể hiện bảng "Windows protected your PC". Chọn **More info** rồi **Run anyway**.

## Đưa lên GitHub

1. Tạo một kho mới trên GitHub (ví dụ `tao-ma-qr`), để trống, không tạo sẵn README.
2. Giải nén bộ mã nguồn, vào trang kho vừa tạo, chọn **uploading an existing file**, kéo thả **toàn bộ file và thư mục bên trong** (kể cả thư mục `.github`) rồi bấm **Commit changes**.
3. Bật trang web: **Settings → Pages → Source: Deploy from a branch → Branch: main, thư mục / (root) → Save**. Sau khoảng một phút, trang có tại `https://<tên-tài-khoản>.github.io/<tên-kho>/`.
4. Đóng gói file exe: vào tab **Actions**, chọn **Đóng gói ứng dụng Windows**, bấm **Run workflow**. Khoảng 5 phút sau, tải file ở mục **Artifacts** của lần chạy đó.
5. Phát hành chính thức: **Releases → Draft a new release**, tạo thẻ mới dạng `v2.8.0` rồi **Publish release**. GitHub tự đóng gói và đính hai file `.exe` vào bản phát hành.

Nếu thư mục `.github` không tải lên được bằng cách kéo thả, hãy tạo file trực tiếp trên GitHub: **Add file → Create new file**, đặt tên `.github/workflows/release.yml` rồi dán nội dung của file cùng tên trong bộ mã nguồn.

## Cấu trúc

```
index.html              Toàn bộ phần mềm (giao diện, phông chữ, thư viện đều nằm trong file này)
sw.js                   Giữ bản sao để trang web dùng được khi mất mạng
manifest.webmanifest    Thông tin để cài trang web thành ứng dụng
icons/                  Biểu tượng
desktop/main.js         Vỏ ứng dụng Windows (Electron)
build/                  Biểu tượng dùng khi đóng gói exe
package.json            Cấu hình đóng gói
.github/workflows/      Quy trình tự đóng gói exe trên GitHub
```

## Tự đóng gói trên máy

Cần Node.js 22 trở lên.

```
npm install
npm start        # chạy thử cửa sổ ứng dụng
npm run dist     # tạo file exe trong thư mục dist/
```

## Khi cập nhật

- Sửa `index.html` rồi tải lên lại là trang web được cập nhật.
- Khi đổi số phiên bản, sửa ở ba chỗ: `VERSION` trong `index.html`, `version` trong `package.json`, `CACHE` trong `sw.js`.

## Lưu ý về VietQR

Mã chuyển khoản tạo theo quy cách VietQR của NAPAS, gồm mã BIN ngân hàng, số tài khoản, và tuỳ chọn số tiền, nội dung. Danh sách mã BIN lấy theo danh sách ngân hàng của VietQR (11/2026). Tên chủ tài khoản không nằm trong mã, nên hãy quét thử bằng ứng dụng ngân hàng và kiểm tra tên người nhận trước khi in hoặc gửi đi.

## Giấy phép

Mã nguồn phần mềm phát hành theo giấy phép MIT (file `LICENSE`). Thành phần của bên thứ ba: xem `THIRD-PARTY-NOTICES.md`.
