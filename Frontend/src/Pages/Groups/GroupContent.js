import React from "react";
import { NavLink, Outlet } from "react-router-dom";

function GroupContent() {
  return (
    <div className="text-fourth_font_color_dark flex flex-col justify-center py-2 rounded-md">
      <div className="w-full rounded-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex gap-6">
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
            <NavLink
              to="members"
              className={({ isActive }) =>
                `px-6 py-2 rounded-md font-semibold ${
                  isActive
                    ? "bg-main_heighlight_color_dark text-white"
                    : "text-third_font_color_dark hover:bg-third_bg_color_dark"
                }`
              }
            >
              MEMEBERS
            </NavLink>
          </div>
        </div>
      </div>

      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default GroupContent;
