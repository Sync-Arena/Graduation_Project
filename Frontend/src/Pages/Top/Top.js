import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";

function Top() {
  return (
    <div className="text-second_font_color_dark mt-6 flex flex-col justify-center px-16 py-8 bg-second_bg_color_dark rounded-md">
      <div className="w-full rounded-md">
        <div className="flex justify-between items-center mb-12 border-b-2 pb-8 border-main_border_color_dark">
          <div className="flex gap-8">
            <NavLink
              to="rating-all"
              className={({ isActive }) =>
                `px-6 py-2 rounded-md font-semibold ${
                  isActive
                    ? "bg-main_heighlight_color_dark text-white"
                    : "text-second_font_color_dark hover:bg-third_bg_color_dark"
                }`
              }
            >
              RATING
            </NavLink>
            <NavLink
              to="friends-rating"
              className={({ isActive }) =>
                `px-6 py-2 rounded-md font-semibold ${
                  isActive
                    ? "bg-main_heighlight_color_dark text-white"
                    : "text-second_font_color_dark hover:bg-third_bg_color_dark"
                }`
              }
            >
              FRIENDS RATING
            </NavLink>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <label>
                Country:
                <select className="bg-second_bg_color_dark border-main_border_color_dark rounded-md ml-2 px-4 py-2 border-2">
                  <option value="any">any country</option>
                </select>
              </label>
              <label>
                City:
                <select className="bg-second_bg_color_dark border-main_border_color_dark rounded-md ml-2 px-4 py-2 border-2">
                  <option value="any">any city</option>
                </select>
              </label>
            </div>
            <label className="flex items-center">
              <p>Organization:</p>
              <select className="flex-1 bg-second_bg_color_dark border-main_border_color_dark rounded-md ml-2 px-4 py-2 border-2">
                <option value="any">any organization</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="">
        <Outlet />
      </div>
    </div>
  );
}

export default Top;
