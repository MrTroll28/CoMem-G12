import React from "react";
import { CiSearch } from "react-icons/ci";

const SearchBox = () => {
  return (
    <div className="relative w-full">
      <form className="relative">
        <input
          type="text"
          name="keyword"
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
