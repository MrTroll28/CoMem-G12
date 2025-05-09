import React from "react";
import { Link } from "react-router-dom";
import SearchBox from "./Header/SearchBox";
import Navigator from "./Header/Navigator";
import { FaStoreAlt } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import DropMenuUser from "./DropMenuUser";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { totalQuantity } = useCart();
  
  return (
    <header className="w-full z-50">
      <div className="bg-[url(/HeaderBG.webp)]">
        {/* HeaderTop */}
        <div className="block py-[12px] mx-auto max-w-[1410px] px-[15px] w-full">
          <div className="flex justify-between items-center relative">
            {/* Logo */}
            <Link to="/">
              <div className="max-w-full pr-[15px] w-[300px]">
                <div className="bg-[url(/background-comem.webp)] bg-[0px_-82px] block h-[60px] w-[165px]"></div>
              </div>
            </Link>
            {/* SearchBox */}
            <div className="relative flex-1 mr-[70px]">
              <SearchBox />
            </div>
            {/* Map & User */}
            <div className="flex items-center justify-center mx-[-5px]">
              <Link to="/" className="mr-[30px] flex items-center">
                <FaStoreAlt className="text-white text-[34px]" />
                <div className="text-[13px] font-medium ml-[8px] uppercase text-white">
                  hệ thống
                  <br />
                  cửa hàng
                </div>
              </Link>
              <div className="mr-[30px]">
               
                  <DropMenuUser />
                
              </div>
              <div className="mr-[30px]">
                <Link to="/favorites">
                  <FaHeart className="text-white text-[28px]" />
                </Link>
              </div>
              <div className="mr-[30px]">
              <Link to="/cart" className="relative">
                <FaShoppingCart className="text-white text-[28px]" />
                {totalQuantity > 0 && (
                  <span className="bg-[rgba(230,126,34,0.8)] rounded-full text-white text-[13px] leading-[1em] px-[7px] py-[4px] absolute right-[-13px] top-[-11px]">
                    {totalQuantity}
                  </span>
                )}
              </Link>
              </div>
            </div>
          </div>
        </div>
        {/* HeaderBottom */}
        <div className="mx-auto max-w-[1410px] px-[15px] w-full">
          <Navigator />
        </div>
      </div>
    </header>
  );
};

export default Header;