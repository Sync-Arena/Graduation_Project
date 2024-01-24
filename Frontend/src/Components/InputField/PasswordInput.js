import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function PasswordInput({ placeholder, icon, showPass, name, onChange }) {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative mb-6 text-second_font_color_dark text-lg font-medium">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <span className="">{icon}</span>
      </div>
      <input
        type={showPassword ? "text" : "password"}
        className="bg-second_bg_color_dark border border-main_border_color_dark rounded-md block w-full ps-12 p-2"
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        style={{ borderWidth: "1.5px" }}
      />
      {showPass && (
        <div
          className="absolute inset-y-0 end-0 flex items-center pe-3.5 cursor-pointer"
          onClick={toggleShowPassword}
        >
          {showPassword ? <FaEye /> : <FaEyeSlash />}
        </div>
      )}
    </div>
  );
}

export default PasswordInput;
