import React, { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Khi scroll, kiểm tra vị trí và cập nhật state
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 3000) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hàm cuộn về đầu trang
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // cuộn mượt
    });
  };

  return (
    <div>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 right-4 bg-green-700 hover:bg-green-800 
                     text-white p-3 rounded-full shadow-lg 
                     transition-transform duration-300 
                     flex items-center justify-center z-[999]"
        >
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default BackToTopButton;
