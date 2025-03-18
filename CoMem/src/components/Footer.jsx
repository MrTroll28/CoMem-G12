import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#3e6807] text-white pt-8 pb-4">
      {/* Khu vực thông tin chia cột */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {/* Cột 1 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Về Cỏ Mềm</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Chuyện của Cỏ
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Về nhà máy
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 2 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Hoạt động cộng đồng</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Xây tủ búp măng
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Chung tay phòng chống COVID
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 3 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Hướng dẫn mua hàng</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Chính sách bảo hành
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Chính sách đổi trả
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-gray-300 transition">
                Chính sách vận chuyển
              </a>
            </li>
          </ul>
        </div>

        {/* Cột 4 */}
        <div>
          <h4 className="text-lg font-semibold mb-3">Thông tin liên hệ</h4>
          <ul className="space-y-2 text-sm">
            <li>Hotline: 0986.821.xxx</li>
            <li>Email: cskh@comem.vn</li>
            <li>Website: <a href="#" className="hover:text-gray-300 transition">co.mem.vn</a></li>
          </ul>
        </div>
      </div>

      {/* Khu vực đăng ký email */}
      <div className="max-w-7xl mx-auto px-4 mt-8">
        <p className="text-sm mb-2">Đăng ký email để nhận ưu đãi:</p>
        <form className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 ">
          <input
            type="email"
            placeholder="Email của bạn"
            className="bg-[#8ab14b] px-3 py-2 text-gray-800 rounded outline-none w-full sm:w-auto"
          />
          <button
            type="submit"
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition"
          >
            Đăng ký
          </button>
        </form>
      </div>

      {/* Khu vực bản quyền và địa chỉ */}
      <div className="max-w-7xl mx-auto px-4 mt-8 border-t border-gray-700 pt-4 text-xs sm:text-sm text-gray-200">
        <p>
          Công ty Cổ phần Mỹ phẩm Thiên nhiên Cỏ Mềm.  
          GPDKKD: 0106888888 do Sở KHĐT TP Hà Nội cấp ngày 20/02/2020  
          Địa chỉ: Số 123, Phường XYZ, Quận ABC, TP Hà Nội
        </p>
        <p className="mt-2">
          Giấy phép Quảng cáo số 9999/2023 do Sở Y tế cấp.  
          Sản phẩm của chúng tôi đảm bảo an toàn, lành tính.  
        </p>
        <p className="mt-2">
          © 2025 - Bản quyền thuộc về Cỏ Mềm. LÀM VÌ THẬT.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
