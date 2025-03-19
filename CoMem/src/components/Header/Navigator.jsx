import React, { useEffect, useState } from "react";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Navigator = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [activeSubIndex, setActiveSubIndex] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => response.json())
      .then((json) => setMenuItems(json))
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
  }, []);

  // Reset activeSubIndex mỗi khi thay đổi menu chính
  useEffect(() => {
    setActiveSubIndex(0);
  }, [hoveredMenu]);

  return (
    <nav className="">
      <ul className="flex items-center space-x-2 px-4">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(index)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <Link to={menu.link}
              className="inline-flex items-center text-white font-medium 
                         text-[15.5px] h-[42px] px-[15px] capitalize 
                         hover:border-b-2 border-grey-500 ease-in-out transition-all"
            >
              {menu.title}
            </Link>

            {/* Mega Menu xuất hiện khi hover vào menu chính */}
            {hoveredMenu === index && (
              <div
                className="absolute top-full left-0 flex bg-white shadow-lg 
                           border-t-4 border-gray-300 z-50 w-[900px] 
                           min-h-[300px] min-w-[1380px] p-4"
              >
                {/* Cột trái: Danh sách subItem */}
                <div className="w-[270px] border-r border-gray-200 pr-4">
                  <ul>
                    {menu.subItems.map((sub, subIndex) => (
                      <li
                        key={subIndex}
                        onMouseEnter={() => setActiveSubIndex(subIndex)}
                        className={`p-2 cursor-pointer transition ${
                          activeSubIndex === subIndex
                            ? "bg-gray-200"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <Link to={sub.link}
                          className="flex items-center justify-between text-gray-700"
                        >
                          {sub.name}
                          <FaAngleRight className="text-gray-400 ml-2" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cột phải: Danh sách sản phẩm của subItem đang được hover */}
                <div className="flex-1 pl-4">
                  {menu.subItems[activeSubIndex] &&
                  menu.subItems[activeSubIndex].products.length > 0 ? (
                    <div className="grid grid-cols-5 gap-4">
                      {menu.subItems[activeSubIndex].products.map(
                        (product) => (
                          <div key={product.id} className="relative border border-gray-300 p-2">
                          {/* Tag Sale */}
                          {product.tagSale && (
                            <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs font-bold rounded-sm">
                              {product.tagSale}
                            </div>
                          )}

                          {/* Ảnh sản phẩm */}
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full max-h-[165px] object-cover"
                          />

                          {/* Tên sản phẩm */}
                          <p className="mt-2 text-sm font-medium text-gray-700">
                            {product.name}
                          </p>

                          {/* Giá sản phẩm */}
                          <div className="flex items-center space-x-2">
                            <p className="text-red-500">{product.priceNow}</p>
                            {product.priceOld && (
                              <p className="text-gray-500 line-through">{product.priceOld}</p>
                            )}
                          </div>
                        </div>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="text-gray-500">Không có sản phẩm nào</p>
                  )}
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigator;
