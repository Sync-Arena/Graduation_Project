import React, { useContext, useEffect, useRef, useState } from "react"
import { Buffer } from "buffer"
import img from "../../../Assets/Images/hawara.jpg"
import { GiTwoCoins } from "react-icons/gi"
import { FiActivity } from "react-icons/fi"
import { BiSolidMessageDetail } from "react-icons/bi"
import { RiUserAddFill, RiUserFollowFill } from "react-icons/ri"
import { MdModeEdit } from "react-icons/md"
import ProfileSettings from "./ProfileSettings"
import AuthContext from "../../../Context/AuthProvider"
import defaultImg from "../../../Assets/Images/default-avatar.jpg"
import axios from "axios"

// <div className="mt-8 flex gap-4 justify-center items-center text-xl text-second_font_color_dark">
// <div
// 	className="addFriend p-2 rounded-md border-2 border-third_font_color_dark cursor-pointer"
// 	onClick={() => setIsFriend(!isFriend)}>
// 	{isFriend ? <RiUserFollowFill /> : <RiUserAddFill />}
// </div>
// <div className="p-2 rounded-md border-2 border-third_font_color_dark cursor-pointer">
// 	<BiSolidMessageDetail />
// </div>
// </div>

const ProfileDetails = () => {
	const { auth,setAuth } = useContext(AuthContext)
	const [isFriend, setIsFriend] = useState(false)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const fileInputRef = useRef(null)

	const handleChangePhoto = (e) => {
		fileInputRef.current.click()
		// implement code here
	}
	const handleFileChange = async (event) => {
		const config = {
			headers: {
				Authorization: `Bearer ${auth.userData.token}`,
				"Content-Type": "multipart/form-data",
			},
		}

		const file = event.target.files[0]
		const formData = new FormData()
		formData.append("photo", file)
		for (var p of formData) {
			let name = p[0]
			let value = p[1]

			console.log(name, value)
		}

		try {
			const data = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/v1/users/uploadprofilepicture`,
				formData,
				config
			)

			console.log(data)
		} catch (err) {
			console.log(err)
		} 
		setAuth(auth)
		// if (file) {
		// 	const reader = new FileReader()
		// 	reader.onloadend = () => {
		// 		setImageSrc(reader.result)
		// 	}
		// 	reader.readAsDataURL(file)
		// }
	}

	const user = auth.userData.data
	return (
		<div className="p-8 pt-16 bg-second_bg_color_dark rounded-md">
			<div className="flex flex-col items-center gap-2">
				<div className="px-12">
					{user.additionalData.pic ? (
						<img
							src={`data:${
								user.additionalData.pic.contentType
							};base64,${Buffer.from(user.additionalData.pic.data).toString(
								"base64"
							)}`}
							className="rounded-md mb-6"
							alt="Profile"
							onClick={handleChangePhoto}
						/>
					) : (
						<img
							src={defaultImg}
							alt="Profile"
							onClick={handleChangePhoto}
							className="rounded-md mb-6"
						/>
					)}
					<input
						type="file"
						ref={fileInputRef}
						style={{ display: "none" }}
						accept="image/*"
						onChange={handleFileChange}
					/>
				</div>
				<p className="font-semibold text-lg text-second_font_color_dark">
					{user.userName}
				</p>
				<p className="text-blue-500 px-3 py-0.5 rounded-sm bg-blue-100">
					EXPERT
				</p>
				<div className="flex gap-12 justify-center items-center mt-6">
					<div className="flex items-center justify-center gap-x-3 text-[#FFB700]">
						<div className="rounded-sm p-3 bg-[#FFF1CC]">
							<GiTwoCoins className="text-3xl" />
						</div>
						<div className="text-md flex flex-col">
							<p className="font-bold text-lg">100</p>
							<p className="-mt-1.5">Coins</p>
						</div>
					</div>
					<div className="flex items-center justify-center gap-x-3 text-blue-500">
						<div className="rounded-sm p-3 bg-blue-100">
							<FiActivity className="text-3xl" />
						</div>
						<div className="text-md flex flex-col">
							<p className="font-bold text-lg">1700</p>
							<p className="-mt-1.5">1700</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-10">
				<div className="flex justify-between border-b-2 border-main_border_color_dark pb-4 mb-4 text-second_font_color_dark">
					<h2 className="text-xl font-semibold">Details</h2>
					<MdModeEdit
						className="cursor-pointer text-lg"
						onClick={() => setIsModalOpen(true)}
					/>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Username:
					</p>
					<p className="text-third_font_color_dark text-md">{user.userName}</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Country:
					</p>
					<p className="text-third_font_color_dark text-md">Egypt</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						City:
					</p>
					<p className="text-third_font_color_dark text-md">Cairo</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Organization:
					</p>
					<p className="text-third_font_color_dark text-md">Benha University</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Email:
					</p>
					<p className="text-second_font_color_dark text-md">{user.email}</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Friend of:
					</p>
					<p className="text-third_font_color_dark text-md">
						{user.additionalData.friends.length}
					</p>
				</div>
				<div className="flex gap-x-1 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Last Visit:
					</p>
					<p className="text-[#87BB5D] bg-[#EFF9E2] rounded-sm px-3 text-md">
						Active
					</p>
				</div>
				<div className="flex gap-x-2 mb-2">
					<p className="font-semibold text-second_font_color_dark text-md">
						Registered:{" "}
					</p>
					<p className="text-third_font_color_dark text-md">2 years</p>
				</div>
			</div>

			{isModalOpen && (
				<ProfileSettings closeModal={() => setIsModalOpen(false)} />
			)}
		</div>
	)
}

export default ProfileDetails
