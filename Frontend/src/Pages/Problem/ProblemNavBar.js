import React, { useState } from "react";
import { FaPlay, FaThumbsUp, FaThumbsDown, FaStar } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { IoMdList, IoMdClose } from "react-icons/io";

const ProblemNavBar = ({ sidebarOpen, setSidebarOpen, onSubmitCode}) => {
  const [likes, setLikes] = useState(150);
  const [dislikes, setDislikes] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
    } else {
      setLikes(likes - 1);
    }
    setHasLiked(!hasLiked);
  };

  const handleDislike = () => {
    if (!hasDisliked) {
      setDislikes(dislikes + 1);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
    } else {
      setDislikes(dislikes - 1);
    }
    setHasDisliked(!hasDisliked);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };



  return (
    <div className="relative">
      {/* Sidebar */}
      <div className={`fixed h-full bg-second_bg_color_dark shadow-md transition-all duration-300 ${sidebarOpen ? "w-[40%] z-10" : "w-0 z-0"}`}>
        <IoMdClose className="absolute top-4 right-4 text-second_font_color_dark cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className={`text-second_font_color_dark p-8 flex flex-col gap-4 ${sidebarOpen ? "" : "hidden"}`}>
          <h2 className="border-b-2 border-main_border_color_dark pb-4 font-semibold text-lg">Grad Project Contest</h2>
          <div className="flex flex-col">
            <div className="flex gap-2 bg-third_bg_color_dark border-blue-500 border-2 rounded-md hover:font-semibold px-4 py-2">
              <p>A.</p>
              <p>Tesla Vs Bahy</p>
            </div>
            <div className="flex gap-2 rounded-md hover:font-semibold px-4 py-2">
              <p>B.</p>
              <p>A+B</p>
            </div>
            <div className="flex gap-2 bg-third_bg_color_dark rounded-md hover:font-semibold px-4 py-2">
              <p>C.</p>
              <p>Local Maximum</p>
            </div>
            <div className="flex gap-2 rounded-md hover:font-semibold px-4 py-2">
              <p>D.</p>
              <p>Profit Tree</p>
            </div>
          </div>
          </div>
      </div>

      {/* Main content */}
      <div className={`flex flex-col flex-1 ${sidebarOpen ? "blur-sm" : ""}`}>
        {/* Top bar */}
        <div className="py-4 px-2 flex items-center justify-between text-second_font_color_dark text-medium font-semibold">
          <div className="w-32 flex items-center gap-2">
            <IoMdList className="text-lg cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
            <p>Problem List</p>
          </div>
          <div className="flex text-center text-third_font_color_dark cursor-pointer">
            <div className="flex items-center py-2 px-4 bg-third_bg_color_dark rounded-l-md">
              <FaPlay />
              <p className="ml-2">Run</p>
            </div>
            <div className="ml-0.5 flex items-center py-2 px-4 bg-third_bg_color_dark rounded-r-md text-[#01B328] cursor-pointer"
            onClick={onSubmitCode}
            >
              <TbCloudUpload className="text-xl" />
              <p className="ml-2">Submit</p>
            </div>
          </div>
          <div className="flex text-center text-third_font_color_dark cursor-pointer">
            <div
              className="flex items-center py-2 px-3 gap-2 bg-second_bg_color_dark rounded-l-md"
              onClick={handleLike}
            >
              <FaThumbsUp
                className={hasLiked ? "text-[#01B328]" : "text-third_font_color_dark"}
              />
              {likes}
            </div>
            <div
              className="ml-0.5 flex items-center py-2 px-3 gap-2 bg-second_bg_color_dark cursor-pointer"
              onClick={handleDislike}
            >
              <FaThumbsDown
                className={hasDisliked ? "text-red-600" : "text-third_font_color_dark"}
              />
              {dislikes}
            </div>
            <div
              className="ml-0.5 flex items-center py-2 px-3 gap-1 bg-second_bg_color_dark rounded-r-md cursor-pointer"
              onClick={handleFavorite}
            >
              <FaStar className={isFavorite ? "text-yellow-400" : "third_font_color_dark"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavBar;