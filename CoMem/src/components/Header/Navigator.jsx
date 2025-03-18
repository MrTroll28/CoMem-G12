import React, { useEffect, useState } from "react";

const Navigator = () => {

  const [menuItems, setMenuItem] = useState([]);
  const [hoveredMenu, setHoveredMenu] = useState(null);
  
  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((response) => response.json())
      .then((json) => setMenuItem(json))
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
  }, []);
  
  return (
    <nav className="">
      <ul className="flex justify-between items-center relative">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(index)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <a href={menu.link} className="inline-flex items-center justify-center 
                                          text-white font-medium text-[15.5px] 
                                          h-[42px] px-[15px] relative capitalize 
                                          font-[Verdana] sm:font-[Roboto] md:font-[Tahoma]">
              {menu.title}
            </a>

            {/* SubMenu */}
            {hoveredMenu === index && (
              <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg border rounded-md p-2">
                {menu.subItems.map((sub, subIndex) => (
                  <li key={subIndex}>
                    <a
                      href={sub.link}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      {sub.name}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigator;
