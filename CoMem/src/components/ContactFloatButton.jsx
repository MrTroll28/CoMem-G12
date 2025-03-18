import React, { useState } from "react";
import { FaPhone, FaFacebookMessenger, FaMapMarkerAlt } from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import { MdChat } from "react-icons/md";

const ContactFloatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-20 right-4 flex flex-col items-end z-[999]">
      {/* 
        Các nút con 
        Luôn render, nhưng dùng Tailwind để ẩn/hiện với transition
      */}
      <div
        className={`
          flex flex-col items-end space-y-2 mb-2 
          transform origin-bottom-right 
          transition-all duration-300 
          ${isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"}
        `}
      >
        {/* Nút Địa điểm */}
        <a
          href="https://goo.gl/maps/..."
          target="_blank"
          rel="noreferrer"
          className="bg-green-500 hover:bg-green-600 rounded-full p-3 text-white shadow-lg flex items-center justify-center"
        >
          <FaMapMarkerAlt size={20} />
        </a>

        {/* Nút Điện thoại */}
        <a
          href="tel:0986xxxxxx"
          className="bg-yellow-500 hover:bg-yellow-600 rounded-full p-3 text-white shadow-lg flex items-center justify-center"
        >
          <FaPhone size={20} />
        </a>

        {/* Nút Messenger */}
        <a
          href="https://m.me/..."
          target="_blank"
          rel="noreferrer"
          className="bg-blue-600 hover:bg-blue-700 rounded-full p-3 text-white shadow-lg flex items-center justify-center"
        >
          <FaFacebookMessenger size={20} />
        </a>

        {/* Nút Zalo */}
        <a
          href="https://zalo.me/..."
          target="_blank"
          rel="noreferrer"
          className="bg-blue-500 hover:bg-blue-600 rounded-full p-3 text-white shadow-lg flex items-center justify-center"
        >
          <SiZalo size={20} />
        </a>
      </div>

      {/* Nút chính */}
      <button
        onClick={toggleOpen}
        className={`
          bg-green-800 hover:bg-green-900 
          rounded-full p-4 text-white shadow-lg 
          flex items-center justify-center
          transform transition-transform duration-300
          ${isOpen ? "rotate-45" : "rotate-0"}
        `}
      >
        <MdChat size={24} />
      </button>
    </div>
  );
};

export default ContactFloatButton;
