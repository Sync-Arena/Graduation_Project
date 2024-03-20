import React from "react";
import { NavLink } from "react-router-dom";

function handleTo(item) {
  return item.text == "Home" ? "" : `${item.text.toLowerCase()}`;
}

function NavList({ items, isCollapsed, activeLink, handleLinkClick }) {
  return (
    <div>
      <ul className="flex flex-col">
        {items.map((item) => (
          <li key={item.id}>
            <NavLink
              to={handleTo(item)}
              className={`flex mt-1 py-2.5 relative text-second_font_color_dark items-center
                ${
                  activeLink === item.id
                    ? "bg-main_heighlight_color_dark rounded-lg text-white after:absolute after:content[''] after:h-full after:w-1 after:top-0 after:-right-5 after:bg-main_heighlight_color_dark after:rounded-tl-lg after:rounded-bl-lg"
                    : ""
                }`}
              onClick={() => handleLinkClick(item.id)}
            >
              <span className={`text-xl ml-4`}>{item.icon}</span>
              <p className={`${isCollapsed ? "hidden" : "ml-4"}`}>{item.text}</p>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavList;
