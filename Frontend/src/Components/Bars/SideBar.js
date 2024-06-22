import React, { useContext, useEffect, useRef, useState } from "react";
import { HiHome } from "react-icons/hi";
import { FaPuzzlePiece, FaGraduationCap, FaMedal } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { RiLiveFill, RiUserAddFill } from "react-icons/ri";
import { PiAlignTopFill } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import NavList from "./NavList";
import AuthContext from "../../Context/AuthProvider";
import logoImg from "../../Assets/Images/logo.png"

const SideBar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState(null);
  const { auth } = useContext(AuthContext)
  const navLeftItems = [
    { id: 1, text: "Home", icon: <HiHome /> },
    { id: 2, text: "Problemsets", icon: <FaPuzzlePiece /> },
    { id: 3, text: "Contests", icon: <FaMedal /> },
    { id: 4, text: "Challenges", icon: <GiTrophyCup /> },
    { id: 5, text: "Edu", icon: <FaGraduationCap /> },
    { id: 6, text: "Groups", icon: <MdGroups /> },
    { id: 7, text: "Streams", icon: <RiLiveFill /> },
    { id: 8, text: "Top", icon: <PiAlignTopFill /> },
  ];

  const navRightItems = [
    { id: 9, text: "Enter", icon: <FiLogIn /> },
    { id: 10, text: "Register", icon: <RiUserAddFill /> },
  ];

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleLinkClick = (id) => {
    setActiveLink(id);
    window.localStorage.setItem("active-link", JSON.stringify(id));
  };

  useEffect(() => {
    try {
      let active_link = JSON.parse(window.localStorage.getItem("active-link"));
      if (active_link === null) active_link = 0;
      setActiveLink(active_link);
    } catch {
      console.error("Error while retrieving theme from localStorage");
    }
  }, []);

  return (
    <div
      className={`text-second_font_color_dark sticky top-0 ${isCollapsed ? "w-24" : "w-72 "
        } bg-second_bg_color_dark h-screen p-5 pt-8 relative duration-300`}
    >
      <span
        className={`flex duration-300 items-center justify-center absolute cursor-pointer -right-5 top-7 w-9 h-9 text-white border-8 border-main_bg_color_dark bg-[#007AFF] text-xs rounded-full  ${!isCollapsed && "rotate-180"
          }`}
        onClick={toggleCollapse}
      >
        <FaAngleRight />
      </span>

      <div className="flex gap-x-2 ">
        <img
          src={logoImg}
          className={`cursor-pointer w-10 h-8 ml-2`}
        />
        <h1
          className={` origin-left text-xl font-bold ${isCollapsed && "hidden"
            }`}
        >
          Collab
        </h1>
      </div>
      <div className="mt-5">
        <NavList
          items={navLeftItems}
          isCollapsed={isCollapsed}
          activeLink={activeLink}
          handleLinkClick={handleLinkClick}
        />
        { !auth.signedIn && 
          <NavList
            items={navRightItems}
            isCollapsed={isCollapsed}
            activeLink={activeLink}
            handleLinkClick={handleLinkClick}
          />
        }
      </div>
    </div>
  );
};

export default SideBar;