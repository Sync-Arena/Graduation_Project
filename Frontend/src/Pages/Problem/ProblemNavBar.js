import React, { useState } from "react";
import { FaPlay, FaThumbsUp, FaThumbsDown, FaStar } from "react-icons/fa";
import { TbCloudUpload } from "react-icons/tb";
import { IoMdList, IoMdClose } from "react-icons/io";

const ProblemNavBar = ({ sidebarOpen, setSidebarOpen }) => {
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
      <div className={`fixed h-full bg-[#161B22] shadow-md transition-all duration-300 ${sidebarOpen ? "w-[40%] z-10" : "w-0 z-0"}`}>
        <IoMdClose className="absolute top-4 right-4 text-white cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
        {/* Sidebar content goes here */}
      </div>

      {/* Main content */}
      <div className={`flex flex-col flex-1 ${sidebarOpen ? "blur-sm" : ""}`}>
        {/* Top bar */}
        <div className="py-4 px-2 flex items-center justify-between text-white text-medium font-semibold">
          <div className="w-32 flex items-center gap-2">
            <IoMdList className="text-lg cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)} />
            <p>Problem List</p>
          </div>
          <div className="flex text-center text-gray-300 cursor-pointer">
            <div className="flex items-center py-2 px-4 bg-gray-800 rounded-l-md">
              <FaPlay />
              <p className="ml-2">Run</p>
            </div>
            <div className="ml-0.5 flex items-center py-2 px-4 bg-gray-800 rounded-r-md text-[#00FF00] cursor-pointer">
              <TbCloudUpload className="text-xl" />
              <p className="ml-2">Submit</p>
            </div>
          </div>
          <div className="flex text-center text-gray-300 cursor-pointer">
            <div
              className="flex items-center py-2 px-3 gap-2 bg-gray-800 rounded-l-md"
              onClick={handleLike}
            >
              <FaThumbsUp
                className={hasLiked ? "text-[#00FF00]" : "text-gray-300"}
              />
              {likes}
            </div>
            <div
              className="ml-0.5 flex items-center py-2 px-3 gap-2 bg-gray-800 cursor-pointer"
              onClick={handleDislike}
            >
              <FaThumbsDown
                className={hasDisliked ? "text-red-600" : "text-gray-300"}
              />
              {dislikes}
            </div>
            <div
              className="ml-0.5 flex items-center py-2 px-3 gap-1 bg-gray-800 rounded-r-md cursor-pointer"
              onClick={handleFavorite}
            >
              <FaStar className={isFavorite ? "text-yellow-400" : "text-gray-300"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemNavBar;