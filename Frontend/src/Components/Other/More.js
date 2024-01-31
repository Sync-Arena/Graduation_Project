import React from "react";
import { FaArrowRightLong } from "react-icons/fa6";

function More() {
  return (
    <div className="mt-4 flex justify-end text-main_link_color_dark items-center">
      <span className="block mr-3">more</span>
      <FaArrowRightLong className="mt-1" />
    </div>
  );
}

export default More;
