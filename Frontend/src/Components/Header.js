import React, { useEffect, useState } from "react";

function Header() {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
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

  return (
    <nav
      className="bg-second_bg_color_dark py-2
                    md:py-0 duration-300"
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between ml-8 md:px-8 md:mx-auto">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse mb-2 md:mb-0"
        >
          <img src="logo.png" className="h-8" alt="Flowbite Logo" />
        </a>
        <button
          onClick={toggleCollapse}
          type="button"
          className="w-10 h-10 mb-2 flex justify-center items-center text-second_font_color_dark block md:hidden
                    hover:bg-second_heighlight_color_dark rounded-full mr-8"
          aria-controls="navbar-solid-bg"
          aria-expanded={!isCollapsed}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
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
          className={`md:flex-row md:flex md:flex-1 md:justify-between w-full
                        flex-col justify-center  ${isCollapsed ? "hidden" : ""}`}
          id="navbar-solid-bg"
        >
          <ul
            className="flex flex-col  
                        md:flex-row"
          >
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                           md:ml-6"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                         md:ml-6"
              >
                Problemsets
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                       md:ml-6"
              >
                Contests
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                     md:ml-6"
              >
                Challenges
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                   md:ml-6"
              >
                Edu
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
                 md:ml-6"
              >
                Groups
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
               md:ml-6"
              >
                Streams
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark
             md:ml-6"
              >
                Top
              </a>
            </li>
          </ul>
          <ul
            className="flex flex-col 
                        md:flex-row md:items-center"
          >
            <li>
              <a
                href="#"
                className="block py-3 text-main_font_color_dark bg-gradient-to-r from-transparent to-main_heighlight_color_dark rounded-sm
                                      relative after:absolute after:content-[''] after:block md:after:bg-main_heighlight_color_dark
                                      md:py-5 md:text-main_heighlight_color_dark md:from-second_bg_color_dark md:to-second_bg_color_dark md:after:bottom-0 md:after:w-full md:after:h-1"
              >
                Enter
              </a>
            </li>
            <li
              className="hidden text-second_font_color_dark px-6
                           md:block"
            >
              |
            </li>
            <li>
              <a
                href="#"
                className="block py-3 md:py-5 text-second_font_color_dark"
              >
                Register
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
