import React from "react";

function TextInput({ placeholder, icon, name, onChange }) {
  return (
    <div className="relative mb-6 text-second_font_color_dark text-lg font-medium">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <span>{icon}</span>
      </div>
      <input
        type="text"
        className="bg-second_bg_color_dark border border-main_border_color_dark focus:main_heighlight_color_dark rounded-md block w-full ps-12 p-2"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        autocomplete="username"
        style={{ borderWidth: "1.5px" }}
      />
    </div>
  );
}

export default TextInput;
