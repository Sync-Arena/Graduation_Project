import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ProfilePlan = () => {
  const [showModal, setShowModal] = useState(false);

  const planDetails = {
    plan: "STANDARD",
    price: 99,
    users: 10,
    storage: "10GB",
    support: "Basic Support",
    currentDays: 26,
    totalDays: 30,
  };

  const daysRemaining = planDetails.totalDays - planDetails.currentDays;
  const progressPercent =
    (planDetails.currentDays / planDetails.totalDays) * 100;

  const handleUpgradeClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="bg-second_bg_color_dark text-fourth_font_color_dark rounded-md p-6 w-full mt-6 border-2 border-blue-500">
        <div className="bg-blue-950 rounded-sm py-1 px-4 inline-block text-sm text-blue-500">
          {planDetails.plan}
        </div>
        <div className="text-4xl font-bold text-right">
          <span className=" text-blue-500">${planDetails.price}</span>
          <span className="text-lg font-normal ">/month</span>
        </div>
        <ul className="list-none mt-4 space-y-2">
          <li>● {planDetails.users} Users</li>
          <li>● Up to {planDetails.storage} storage</li>
          <li>● {planDetails.support}</li>
        </ul>
        <div className="mt-6">
          <div className="flex justify-between text-sm">
            <span>Days</span>
            <span>
              {planDetails.currentDays} of {planDetails.totalDays} Days
            </span>
          </div>
          <div className="w-full bg-gray-600 h-2 rounded-full mt-1">
            <div
              className="bg-blue-600 h-2 rounded-full"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="text-sm mt-1">{daysRemaining} days remaining</div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded-md w-full py-2 mt-6 font-semibold text-white"
          onClick={handleUpgradeClick}
        >
          UPGRADE PLAN
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-second_bg_color_dark rounded-md w-[600px] text-fourth_font_color_dark relative">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-lg cursor-pointer absolute top-5 right-6"
              onClick={handleCloseModal}
            />
            <h2 className="text-2xl font-semibold mb-4 text-center mt-16">
              Upgrade Plan
            </h2>
            <p className="my-4 text-center">Choose the best plan for you.</p>
            <div className="flex gap-4 px-16 border-b border-main_border_color_dark pb-8">
              <select className="w-full mb-4 py-2 px-4 border border-gray-300 rounded bg-second_bg_color_dark text-fourth_font_color_dark">
                <option value="standard">Standard - $99/month</option>
                <option value="standard">Standard - $99/month</option>
                <option value="standard">Standard - $99/month</option>
              </select>
              <button className="bg-blue-600 hover:bg-blue-700 text-white h-11 px-4 rounded-md">
                UPGRADE
              </button>
            </div>
            <div className="flex px-16 pt-8 pb-16 justify-between items-center">
              <div className="flex flex-col items-start">
                <p className="text-center">
                  Your current plan is standard plan
                </p>
                <div className="text-4xl font-bold text-center text-blue-500">
                  $99{" "}
                  <span className="text-lg font-normal text-fourth_font_color_dark">
                    / month
                  </span>
                </div>
              </div>
              <button
                className="bg-red-600 hover:bg-red-700 text-white px-4 h-11 rounded"
                onClick={handleCloseModal}
              >
                CANCEL SUBSCRIPTION
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePlan;
