import React, { useEffect, useState, useRef } from "react";
import NavList from "./NavList/NavList";
import { HiHome } from "react-icons/hi2";
import { FaPuzzlePiece } from "react-icons/fa";
import { FaGraduationCap, FaMedal } from "react-icons/fa6";
import { MdGroups } from "react-icons/md";
import { RiLiveFill, RiUserAddFill } from "react-icons/ri";
import { PiAlignTopFill } from "react-icons/pi";
import { GiTrophyCup } from "react-icons/gi";
import { FiLogIn } from "react-icons/fi";

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [activeLink, setActiveLink] = useState(9);
  const navRef = useRef(null);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsCollapsed(true);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && !isCollapsed) {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isCollapsed]);

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navLeftItems = [
    { id: 1, text: "Home", icon: <HiHome />},
    { id: 2, text: "Problemsets", icon: <FaPuzzlePiece />},
    { id: 3, text: "Contests", icon: <FaMedal />},
    { id: 4, text: "Challenges", icon: <GiTrophyCup /> },
    { id: 5, text: "Edu", icon: <FaGraduationCap /> },
    { id: 6, text: "Groups", icon: <MdGroups /> },
    { id: 7, text: "Streams", icon: <RiLiveFill /> },
    { id: 8, text: "Top", icon: <PiAlignTopFill /> },
  ];

  const navRightItems = [
    { id: 9, text: "Enter", icon: <FiLogIn />},
    { id: -1, text: "|"},
    { id: 10, text: "Register", icon: <RiUserAddFill />},
  ];

  const handleLinkClick = (id) => {
    setActiveLink(id);
    console.log(id);
  };

  return (
    <nav
      className="bg-second_bg_color_dark py-2 md:py-0 rounded-md sticky top-4"
      ref={navRef}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between md:px-8 md:mx-auto">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse md:mb-0 ml-10"
        >
          <img src="logo.png" className="h-8" alt="Flowbite Logo" />
        </a>
        <button
          onClick={toggleCollapse}
          type="button"
          className="w-10 h-10 flex justify-center items-center text-second_font_color_dark block md:hidden
                    hover:bg-second_heighlight_color_dark rounded-full mr-10"
          aria-expanded={!isCollapsed}
        >
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`flex md:flex-row md:flex md:flex-1 md:justify-between w-full transition-all
                      flex-col-reverse justify-center ${isCollapsed ? "hidden" : ""}`}
        >
          <NavList
            items={navLeftItems}
            title="Explore & Engage"
            activeLink={activeLink}
            handleLinkClick={handleLinkClick}
          />
          <NavList
            items={navRightItems}
            title="Gateway"
            activeLink={activeLink}
            handleLinkClick={handleLinkClick}
          />
        </div>
      </div>
    </nav>
  );
}

export default Header;
