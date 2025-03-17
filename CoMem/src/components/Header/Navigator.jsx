import React, { useState } from "react";

const menuItems = [
  {
    title: "Khuyến mãi & Combo",
    link: "/cm/khuyen-mai-va-combo",
    subItems: [
      { name: "Combo chăm sóc da", link: "/cm/combo-cham-soc-da" },
      { name: "Combo chăm sóc tóc", link: "/cm/combo-cham-soc-toc" },
      { name: "Combo chăm sóc môi", link: "/cm/combo-moi-xinh" },
      { name: "Combo khác", link: "/cm/combo-khac" },
      { name: "Black Green Day", link: "/cm/black-green-day" },
    ],
  },
  {
    title: "Trang điểm",
    link: "/cm/trang-diem",
    subItems: [
      { name: "Son dưỡng môi", link: "/cm/son-duong-moi" },
      { name: "Son màu không chì", link: "/cm/son-mau-khong-chi" },
      { name: "Tẩy da chết môi", link: "/cm/tay-da-chet-moi" },
      { name: "Kem nền", link: "/cm/kem-nen" },
      { name: "Kem má", link: "/cm/kem-ma-hong" },
    ],
  },
];

const Navigator = () => {
  const [hoveredMenu, setHoveredMenu] = useState(null);

  return (
    <nav className="">
      <ul className="flex space-x-6 p-4">
        {menuItems.map((menu, index) => (
          <li
            key={index}
            className="relative group"
            onMouseEnter={() => setHoveredMenu(index)}
            onMouseLeave={() => setHoveredMenu(null)}
          >
            <a href={menu.link} className="text-white font-medium">
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
