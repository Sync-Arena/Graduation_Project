import React from "react";

function OR() {
  return (
    <div 
        className="mb-6 relative flex items-center justify-center before:w-full before:h-px before:rounded-lg before:bg-main_font_color_dark before:content-[''] before:absolute before:top-1/2 before:left-0"
    >
        <span 
            className="bg-main_bg_color_dark px-3 text-main_font_color_dark font-semibold relative z-10"
        >
            OR
        </span>
    </div>
  );
}

export default OR;
