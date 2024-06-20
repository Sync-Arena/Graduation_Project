import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { GiTwoCoins } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser, FiSettings, FiDollarSign, FiLogOut } from "react-icons/fi";
import img from "../../Assets/Images/default-avatar.jpg";

function NavBarDefault() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsMenuOpen(false);
        }
    };

    useEffect(() => {
        if (isMenuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <div className="py-4 sticky z-20 top-0 bg-main_bg_color_dark">
            <div className="px-8 w-full h-16 rounded-lg bg-second_bg_color_dark flex justify-between items-center">
                <div className="flex">
                    <span className="block text-main_font_color_dark text-2xl mr-3">
                        <IoSearchOutline />
                    </span>
                    <p className="text-main_font_color_dark text-lg -mt-1">Search</p>
                </div>
                <div className="flex items-center gap-x-3 font-semibold">
                    <span className="block text-main_font_color_dark text-2xl mr-2">
                        <TbBrightnessUpFilled />
                    </span>
                    <span className="block text-main_font_color_dark text-2xl mr-2">
                        <BiSolidMessageDetail />
                    </span>
                    <span className="block text-main_font_color_dark text-2xl mr-4">
                        <IoMdNotifications />
                    </span>
                    <div className="flex flex-col">
                        <div className="flex items-center justify-center gap-x-1 text-yellow_font_color">
                            <p>--</p>
                            <span className="block text-lg">
                                <GiTwoCoins />
                            </span>
                        </div>
                        <p className="text-blue-500 -mt-1">Guest User</p>
                    </div>
                    <div className="relative">
                        <img
                            src={img}
                            onClick={toggleMenu}
                            className="w-11 h-11 rounded-full border-2 cursor-pointer"
                        />
                        {isMenuOpen && (
                            <div
                                ref={menuRef}
                                className="absolute right-0 mt-3 w-40 bg-third_bg_color_dark text-main_font_color_dark rounded-lg shadow-lg py-2 transition-transform duration-300 ease-in-out transform scale-100 opacity-100"
                            >
                                <Link to="/profile" className="mt-2 flex  items-center pl-6 py-2 hover:bg-gray-700"
                                    onClick={toggleMenu}
                                >
                                    <FiUser className="mr-3" /> Profile

                                </Link>
                                <Link to="/settings" className="flex items-center pl-6 py-2 hover:bg-gray-700"
                                    onClick={toggleMenu}
                                >
                                    <FiSettings className="mr-3" /> Settings
                                </Link>
                                <Link to="/pricing" className="flex items-center pl-6 py-2 hover:bg-gray-700"
                                    onClick={toggleMenu}
                                >
                                    <FiDollarSign className="mr-3" /> Pricing
                                </Link>
                                <div className="border-t border-main_border_color_dark my-2"></div>
                                <Link to="/logout" className="flex items-center pl-6 py-2 hover:bg-gray-700"
                                    onClick={toggleMenu}
                                >
                                    <FiLogOut className="mr-3" /> Logout
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NavBarDefault;