import React from "react";
import { GiTwoCoins } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import img from "../../Assets/Images/hawara.jpg";

function NavBar() {
  return (
    <div className="py-4 sticky z-20 top-0 bg-main_bg_color_dark">
      <div
        className={`px-8 w-full h-16 rounded-lg bg-second_bg_color_dark flex justify-between items-center`}
      >
        <div className="flex">
          <span className="block text-main_font_color_dark text-2xl mr-3">
            <IoSearchOutline />
          </span>
          <p className="text-main_font_color_dark text-lg -mt-1">Search</p>
        </div>
        <div className="flex items-center gap-x-3 font-semibold">
          <span className="block text-main_font_color_dark text-2xl mr-2">
            <TbBrightnessUpFilled />
          </span>
          <span className="block text-main_font_color_dark text-2xl mr-2">
            <BiSolidMessageDetail />
          </span>
          <span className="block text-main_font_color_dark text-2xl mr-4">
            <IoMdNotifications />
          </span>
          <div className="flex flex-col">
            <div className="flex items-center justify-center gap-x-1 text-yellow_font_color">
              <p>1200</p>
              <span className="block text-lg">
                <GiTwoCoins />
              </span>
            </div>
            <p className="text-main_heighlight_color_dark -mt-1">
              Mahmoud-Hawara
            </p>
          </div>
          <img
            src={img}
            className="w-11 h-11 rounded-full border-2 border-main_heighlight_color_dark"
          />
        </div>
      </div>
    </div>
  );
}

export default NavBar;
