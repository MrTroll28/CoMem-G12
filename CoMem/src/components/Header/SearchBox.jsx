import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Nếu nhập từ khóa, chuyển hướng đến trang tìm kiếm với query keyword
    if (keyword.trim()) {
      navigate(`/product?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name="keyword"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Tìm sản phẩm, danh mục mong muốn..."
          autoComplete="off"
          className="w-full border border-green-300 rounded-full py-2 pl-4 pr-12 text-green-700 bg-white"
        />
        <button
          type="submit"
          aria-label="Tìm kiếm"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-green-700"
        >
          <CiSearch className="w-6 h-6" />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
