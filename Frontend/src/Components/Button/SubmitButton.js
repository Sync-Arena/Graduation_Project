import React from "react";

function SubmitButton({ title }) {
  return (
    <button
      type="submit"
      className="mb-6 bg-gradient-to-r from-main_heighlight_color_dark to-main_link_color_dark border-0 rounded-md block w-full p-2 text-main_font_color_dark font-semibold"
    >
      {title}
    </button>
  );
}

export default SubmitButton;
