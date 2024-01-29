import React from "react";

function CircleCheckbox({ label, name, checked, onChange }) {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        id={name} 
        name={name}
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded-full text-main_heighlight_color_dark bg-third_bg_color_dark border-main_border_color_dark focus:ring-main_heighlight_color_dark focus:ring-2"
        style={{ borderWidth: "1.5px" }}
      />
      <label
        htmlFor={name}
        className="ms-2 text-sm font-medium text-main_font_color_dark"
      >
        {label}
      </label>
    </div>
  );
}

export default CircleCheckbox;
