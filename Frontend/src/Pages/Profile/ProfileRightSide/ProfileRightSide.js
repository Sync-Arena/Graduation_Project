import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const ProfileRightSide = () => {
  return (
    <div className="ml-6 flex-1">
      <nav className="flex justify-between items-center text-medium">
        <NavLink
          to="overview"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          OVERVIEW
        </NavLink>
        <NavLink
          to="friends"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          FRIENDS
        </NavLink>
        <NavLink
          to="favorite"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          FAVOURITE
        </NavLink>
        <NavLink
          to="teams"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          TEAMS
        </NavLink>
        <NavLink
          to="submissions"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          SUBMISSIONS
        </NavLink>
        <NavLink
          to="groups"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          GROUPS
        </NavLink>
        <NavLink
          to="contests"
          className={({ isActive }) =>
            `px-6 py-2 rounded-md font-semibold ${
              isActive
                ? "bg-main_heighlight_color_dark text-white"
                : "text-third_font_color_dark hover:bg-third_bg_color_dark"
            }`
          }
        >
          CONTESTS
        </NavLink>
      </nav>
      <div className="overflow-auto text-white">
        <Outlet />
      </div>
    </div>
  );
};

export default ProfileRightSide;
