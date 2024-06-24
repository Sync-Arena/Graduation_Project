import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { GiTwoCoins } from "react-icons/gi";
import { IoMdNotifications } from "react-icons/io";
import { BiSolidMessageDetail } from "react-icons/bi";
import { TbBrightnessUpFilled } from "react-icons/tb";
import { IoSearchOutline } from "react-icons/io5";
import { FiUser, FiSettings, FiDollarSign, FiLogOut } from "react-icons/fi";
import defaultImg from "../../Assets/Images/default-avatar.jpg";
import AuthContext from "../../Context/AuthProvider";
import axios from "axios"
import { Buffer } from "buffer"
import { useNavigate } from "react-router-dom";
function NavBar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const { auth, setAuth } = useContext(AuthContext)
	const user = auth.userData.data
	const navigate = useNavigate()
	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};
	const logout = () => {
		setAuth({userData: {}, signedIn: false })
		navigate('/')
	}
	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			setIsMenuOpen(false)
		}
	}


	return (
		<div className="py-4 sticky z-20 top-0 bg-main_bg_color_dark">
			<div className="px-8 w-full h-16 rounded-lg bg-second_bg_color_dark flex justify-between items-center">
				<div className="flex">
					<span className="block text-second_font_color_dark text-2xl mr-3">
						<IoSearchOutline />
					</span>
					<p className="text-second_font_color_dark text-lg -mt-1">Search</p>
				</div>
				<div className="flex items-center gap-x-3 font-semibold">
					<span className="block text-second_font_color_dark text-2xl mr-2">
						<TbBrightnessUpFilled />
					</span>
					<Link
						to="messanger"
						className="block text-second_font_color_dark text-2xl mr-2">
						<BiSolidMessageDetail />
					</Link>
					<Link to="notifications"
					className="block text-second_font_color_dark text-2xl mr-4">
						<IoMdNotifications />
					</Link>
					<div className="flex flex-col">
						<div className="flex items-center justify-center gap-x-1 text-yellow_font_color">
							<p>100</p>
							<span className="block text-lg">
								<GiTwoCoins />
							</span>
						</div>
						<p className="text-black -mt-1">{user.userName}</p>
					</div>
					<div className="relative">
						{user.additionalData.pic ? (
							<img
								src={`data:${user.additionalData.pic.contentType
									};base64,${Buffer.from(user.additionalData.pic.data).toString(
										"base64"
									)}`}
								className="w-11 h-11 rounded-full border-2 cursor-pointer"
								alt="Profile"
								onClick={toggleMenu}
							/>
						) : (
							<img src={defaultImg} className="w-11 h-11 rounded-full border-2 cursor-pointer" onClick={toggleMenu}/>
						)}


						{isMenuOpen && (
							<div
								ref={menuRef}
								className="absolute right-0 mt-3 w-40 bg-second_bg_color_dark shadow_custom text-main_font_color_dark rounded-lg shadow-lg py-2 transition-transform duration-300 ease-in-out transform scale-100 opacity-100">
								<Link
									to="/profile/overview"
									className="mt-2 flex  items-center pl-6 py-2 hover:bg-third_bg_color_dark"
									onClick={toggleMenu}>
									<FiUser className="mr-3" /> Profile
								</Link>
								<Link
									to="/settings"
									className="flex items-center pl-6 py-2 hover:bg-third_bg_color_dark"
									onClick={toggleMenu}>
									<FiSettings className="mr-3" /> Settings
								</Link>
								<Link
									to="/pricing"
									className="flex items-center pl-6 py-2 hover:bg-third_bg_color_dark"
									onClick={toggleMenu}>
									<FiDollarSign className="mr-3" /> Pricing
								</Link>
								<div className="border-t border-main_border_color_dark my-2"></div>
								<button
									to="/logout"
									className="flex items-center pl-6 py-2 hover:bg-third_bg_color_dark w-full"
									onClick={logout}
								>
									<FiLogOut className="mr-3" /> Logout
								</button>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavBar;
