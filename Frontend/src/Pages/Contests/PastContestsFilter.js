import React from "react";

function PastContestsFilter() {
  return (
    <div className="filter text-black flex-1 h-[450px] ml-8 p-8 bg-second_bg_color_dark rounded-2xl border-2 border-main_border_color_dark">
      <div>
        <p className="text-xl font-semibold mb-4">Past Contests Filter</p>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Contest type:</label>
        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-third_font_color_dark  text-base border-main_border_color_dark focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="any">Any</option>
          {/* Add other options here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Rated:</label>
        <select className="mt-1 block w-full pl-3 pr-10 text-third_font_color_dark py-2 text-base border-main_border_color_dark focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="doesnt_matter">Doesn't matter</option>
          {/* Add other options here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Tried:</label>
        <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base text-third_font_color_dark border-main_border_color_dark focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md">
          <option value="doesnt_matter">Doesn't matter</option>
          {/* Add other options here */}
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Substring:</label>
        <input
          type="text"
          className="mt-1 block w-full pl-3 pr-3 py-2 border border-main_border_color_dark text-third_font_color_dark rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          placeholder="In contest title and writers"
        />
      </div>
      <div className="text-center">
        <button className="bg-blue-500 mt-2 w-full text-white font-semibold py-1 px-8 rounded hover:bg-blue-700">
          Filter
        </button>
      </div>
    </div>
  );
}

export default PastContestsFilter;
