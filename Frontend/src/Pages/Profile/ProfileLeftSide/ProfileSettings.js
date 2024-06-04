import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfileSettings = ({ closeModal }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
      <div className="bg-second_bg_color_dark rounded-md w-[800px] text-fourth_font_color_dark relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-lg cursor-pointer absolute top-4 right-8"
          onClick={closeModal}
        />
        <h2 className="text-2xl font-semibold text-center mb-2 mt-8">
          Edit Your Information
        </h2>
        <form className="px-32 py-10">
          <div className="flex justify-between gap-4">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">Handle</label>
              <input
                type="text"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">
                Username
              </label>
              <input
                type="text"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-3">Email</label>
            <input
              type="email"
              className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
            />
          </div>
          <div className="flex justify-between gap-4">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">
                Country
              </label>
              <input
                type="text"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">City</label>
              <input
                type="text"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-3">
              Organization
            </label>
            <input
              type="text"
              className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
            />
          </div>
          <div className="flex justify-between gap-4">
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">
                Old Password
              </label>
              <input
                type="password"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
            <div className="mb-4 w-1/2">
              <label className="block text-sm font-semibold mb-3">
                New Password
              </label>
              <input
                type="password"
                className="w-full py-2 px-4 border-2 border-main_border_color_dark rounded bg-second_bg_color_dark text-fourth_font_color_dark"
              />
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <button
              type="submit"
              className="px-8 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
            >
              Submit
            </button>
            <button
              type="button"
              className="px-8 py-2 bg-third_bg_color_dark rounded"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSettings;
