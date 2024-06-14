import React, { useState } from "react";
import { TbNotes } from "react-icons/tb";
import { FaRegNoteSticky } from "react-icons/fa6";
import { IoBookOutline } from "react-icons/io5";
import { RxCountdownTimer } from "react-icons/rx";
import { NavLink, Outlet } from "react-router-dom";

const LeftSide = (props) => {
  const [activeLink, setActiveLink] = useState("description");

  const getLinkClass = (path) =>
    activeLink === path ? "text-[#0000FF]" : "text-[#0000FF] opacity-40";

  const getTextClass = (path) =>
    activeLink === path
      ? "text-white font-semibold"
      : "text-gray-400 font-normal";

  return (
    <div className="bg-second_bg_color_dark w-[50%] h-full flex flex-col rounded-lg border-2 border-main_border_color_dark">
      <nav className="p-2 flex items-center bg-third_bg_color_dark text-medium">
        <NavLink
          to="description"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveLink("description")}
        >
          <TbNotes className={getLinkClass("description")} />
          <p className={getTextClass("description")}>Description</p>
        </NavLink>
        <p className="mx-3 text-xs text-gray-400">|</p>
        <NavLink
          to="editorial"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveLink("editorial")}
        >
          <IoBookOutline className={getLinkClass("editorial")} />
          <p className={getTextClass("editorial")}>Editorial</p>
        </NavLink>
        <p className="mx-3 text-xs text-gray-400">|</p>
        <NavLink
          to="solutions"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveLink("solutions")}
        >
          <TbNotes className={getLinkClass("solutions")} />
          <p className={getTextClass("solutions")}>Solutions</p>
        </NavLink>
        <p className="mx-3 text-xs text-gray-400">|</p>
        <NavLink
          to="submissions"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveLink("submissions")}
        >
          <RxCountdownTimer className={getLinkClass("submissions")} />
          <p className={getTextClass("submissions")}>Submissions</p>
        </NavLink>
        <p className="mx-3 text-xs text-gray-400">|</p>
        <NavLink
          to="notes"
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActiveLink("notes")}
        >
          <FaRegNoteSticky className={getLinkClass("notes")} />
          <p className={getTextClass("notes")}>Notes</p>
        </NavLink>
      </nav>
      <div className="flex-1 overflow-auto text-white">
        <Outlet/>
      </div>
    </div>
  );
};

export default LeftSide;
