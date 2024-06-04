import React, { useState } from "react";
import img from "../../../Assets/Images/hawara.jpg";
import { GiTwoCoins } from "react-icons/gi";
import { FiActivity } from "react-icons/fi";
import { BiSolidMessageDetail } from "react-icons/bi";
import { RiUserAddFill, RiUserFollowFill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import ProfileSettings from "./ProfileSettings";

const ProfileDetails = () => {
  const [isFriend, setIsFriend] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-8 pt-16 bg-second_bg_color_dark rounded-md">
      <div className="flex flex-col items-center gap-2">
        <div className="px-12">
          <img src={img} className="rounded-md mb-6" alt="Profile" />
        </div>
        <p className="font-semibold text-lg text-fourth_font_color_dark">
          Mahmoud-Hawara
        </p>
        <p className="text-blue-500 px-3 py-0.5 rounded-sm bg-blue-950">
          EXPERT
        </p>
        <div className="flex gap-12 justify-center items-center mt-6">
          <div className="flex items-center justify-center gap-x-3 text-yellow_font_color">
            <div className="rounded-sm p-3 bg-yellow-950">
              <GiTwoCoins className="text-3xl" />
            </div>
            <div className="text-md flex flex-col">
              <p className="font-bold text-lg">1200</p>
              <p className="-mt-1.5">Coins</p>
            </div>
          </div>
          <div className="flex items-center justify-center gap-x-3 text-blue-500">
            <div className="rounded-sm p-3 bg-blue-950">
              <FiActivity className="text-3xl" />
            </div>
            <div className="text-md flex flex-col">
              <p className="font-bold text-lg">1731</p>
              <p className="-mt-1.5">1731</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-between border-b-2 border-main_border_color_dark pb-4 mb-4 text-fourth_font_color_dark">
          <h2 className="text-xl font-semibold">Details</h2>
          <MdModeEdit
            className="cursor-pointer text-lg"
            onClick={() => setIsModalOpen(true)}
          />
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Username:
          </p>
          <p className="text-fifth_font_color_dark text-md">Mahmoud-Hawara</p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Country:
          </p>
          <p className="text-fifth_font_color_dark text-md">Egypt</p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            City:
          </p>
          <p className="text-fifth_font_color_dark text-md">Cairo</p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Organization:
          </p>
          <p className="text-fifth_font_color_dark text-md">Benha University</p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Email:
          </p>
          <p className="text-fifth_font_color_dark text-md">
            mahmoudhawara115@gmail.com
          </p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Friend of:
          </p>
          <p className="text-fifth_font_color_dark text-md">250 Users</p>
        </div>
        <div className="flex gap-x-1 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Last Visit:
          </p>
          <p className="text-[#2CBB5D] bg-[#283A2E] rounded-sm px-3 text-md">
            Active
          </p>
        </div>
        <div className="flex gap-x-2 mb-2">
          <p className="font-semibold text-fourth_font_color_dark text-md">
            Registered:{" "}
          </p>
          <p className="text-fifth_font_color_dark text-md">2 Years ago</p>
        </div>
        <div className="mt-8 flex gap-4 justify-center items-center text-xl text-fourth_font_color_dark">
          <div
            className="addFriend p-2 rounded-md border-2 border-fourth_font_color_dark cursor-pointer"
            onClick={() => setIsFriend(!isFriend)}
          >
            {isFriend ? <RiUserFollowFill /> : <RiUserAddFill />}
          </div>
          <div className="p-2 rounded-md border-2 border-fourth_font_color_dark cursor-pointer">
            <BiSolidMessageDetail />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProfileSettings closeModal={() => setIsModalOpen(false)} />
      )}
    </div>
  );
};

export default ProfileDetails;
