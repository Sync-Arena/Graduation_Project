import React, { useState } from "react";

function PasswordWithPopover({ placeholder, icon, name, onChange }) {
  const [isPopoverVisible, setPopoverVisible] = useState(false);
  const [password, setPassword] = useState("");

  const renderCondition = (length, index) => {
    const colorClass =
      password.length >= length ? "bg-[#FFA116]" : "bg-second_font_color_dark";

    return <div key={index} className={`h-1 ${colorClass} mb-0`}></div>;
  };

  const renderListItem = (text, condition) => {
    const isValidCondition = condition(password);
    const colorClass = isValidCondition
      ? "text-green-400"
      : "text-second_font_color_dark";

    return (
      <div key={text} className={`flex items-center mb-1 ${colorClass}`}>
        {isValidCondition ? (
          <svg
            className="w-3.5 h-3.5 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        ) : (
          <svg
            className="w-3.5 h-3.5 me-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
        {text}
      </div>
    );
  };

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setPopoverVisible(true);
    onChange && onChange({ target: { name, value: newPassword } });
  };

  return (
    <div className="relative mb-6 text-second_font_color_dark text-lg font-medium">
      <div className="relative text-second_font_color_dark text-lg font-medium">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <span className="">{icon}</span>
        </div>
        <input
          data-popover-target="popover-password"
          data-popover-placement="bottom"
          type="password"
          name={name}
          onChange={handlePasswordChange}
          onFocus={() => setPopoverVisible(true)}
          onBlur={() => setPopoverVisible(false)}
          placeholder={placeholder}
          className="bg-second_bg_color_dark border border-main_border_color_dark rounded-md block w-full ps-12 p-2 text-second_font_color_dark focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
      </div>
      <div
        data-popover
        id="popover-password"
        role="tooltip"
        className={`absolute z-20 inline-block text-sm text-second_font_color_dark transition-opacity duration-300 bg-second_bg_color_dark border border-main_border_color_dark rounded-lg  shadow-sm ${
          isPopoverVisible ? "opacity-100" : "opacity-0 invisible"
        } w-full mt-4 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400`}
      >
        <div className="p-3 space-y-2 relative">
          <div className="absolute w-2 h-2 bg-second_bg_color_dark border-t border-l border-solid border-main_border_color_dark transform -translate-x-1/2 rotate-45 left-2/4 top-[-2.8%]"></div>
          <h3 className="font-semibold text-main_font_color_dark mb-2">
            Password Strength
          </h3>
          <div className="mb-2">
            <div className="grid grid-cols-4 gap-2 mb-3">
              {renderCondition(4, 0)}
              {renderCondition(8, 1)}
              {renderCondition(12, 2)}
              {renderCondition(16, 3)}
            </div>
            {renderListItem(
              "At least 8 characters",
              (password) => password.length >= 8
            )}
            {renderListItem("Upper & lower case letters", (password) =>
              /[a-z]/.test(password) && /[A-Z]/.test(password)
            )}
            {renderListItem("Symbol (!, @, #, $, %, or &)", (password) =>
              /[!@#$%^&*(),.?":{}|<>]/.test(password)
            )}
            {renderListItem(
              "Digit from 0 to 9",
              (password) => /[0-9]/.test(password)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordWithPopover;