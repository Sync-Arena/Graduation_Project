import React from "react";
import { NavLink } from "react-router-dom";


function handleTo(item){
  return (item.text=='Home')?'':`${item.text.toLowerCase()}`
}
function NavList({ items, title, activeLink, handleLinkClick }) {
  return (
    <div>
      <p
        className="text-third_font_color_dark relative pl-12 py-3 md:hidden font-semibold	
                  before:absolute before:w-10 before:h-0.5 before:rounded-lg before:top-6 before:left-0 before:block before:bg-third_font_color_dark"
      >
        {title}
      </p>
      <ul className="flex flex-col md:flex-row md:items-center">
        {items.map((item) => (
          <li key={item.id}>
            {item.text === "|" ? (
              <span className="hidden text-second_font_color_dark ml-6 md:block">
                |
              </span>
            ) : (
              <NavLink 
                to={handleTo(item)} 
                className={`ml-12 md:ml-6 flex md:py-5 py-3 relative text-second_font_color_dark items-center
                ${
                  activeLink === item.id
                    ? "text-white bg-gradient-to-r from-transparent  rounded-sm after:absolute after:content-[''] after:block md:after:bg-main_heighlight_color_dark md:py-5 md:text-main_heighlight_color_dark md:to-transparent md:after:bottom-0 md:after:w-full md:after:h-[2.5px] after:transition-all after:duration-300"
                    : ""
                }`}
                onClick={() => handleLinkClick(item.id)}
              >
                <span className="block md:hidden">{item.icon}</span>
                <p
                  className={`ml-4 md:ml-0`}
                >
                  {item.text}
                </p>
              </NavLink>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavList;