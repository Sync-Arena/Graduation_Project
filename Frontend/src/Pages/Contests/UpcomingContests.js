import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesRight, faXmark } from "@fortawesome/free-solid-svg-icons";
import { LuUser2 } from "react-icons/lu";
import { RiHeartAddFill } from "react-icons/ri";
import AuthContext from "../../Context/AuthProvider";
import moment from "moment";
import axios from "axios";

function UpcomingContests(props) {
  const { auth } = useContext(AuthContext);
  const { upcomingContestsArray } = props;
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  function cancelRegister(contestId, index) {
    const config = {
      headers: { Authorization: `Bearer ${auth.userData.token}` },
    };
    try {
      axios.get(
        `${process.env.REACT_APP_BASE_URL}/api/v1/judge/${contestId}/cancel-registration`,
        config
      );
    } catch (err) {
      console.error(err);
    }
  }

  function register(contestId, index) {
    navigate(`/contests/${contestId}/ContestRegister`);
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  }

  async function handleSponsorSubmit(event) {
    event.preventDefault();
    setIsModalOpen(false);
    try {
      console.log("Submitting form data:", formData);
      // await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/sponsor`, formData);
      setIsThankYouModalOpen(true);
      console.log("Thank you modal should be open now");
    } catch (error) {
      console.error("Failed to submit sponsorship request:", error);
    }
  }

  function closeThankYouModal() {
    setIsThankYouModalOpen(false);
  }

  return (
    <div className="upcoming-contests mt-6 text-main_font_color_dark p-8 pr-3 bg-second_bg_color_dark w-full rounded-2xl border-2 border-main_border_color_dark">
      <div className="flex justify-between mr-14 font-semibold mb-4">
        <p className="text-xl">Upcoming Contests</p>
        <NavLink to="#" className="text-main_link_color_dark" onClick={() => setIsModalOpen(true)}>
          <RiHeartAddFill className="inline-block mr-2 text-xl" />
          <p className="text-md inline-block">Sponsor a Contest</p>
        </NavLink>
      </div>
      <table className="w-full text-center rtl:text-right text-second_font_color_dark">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead className="text-third_font_color_dark">
          <tr>
            <th scope="col" className="py-4 text-left font-semibold">
              Contest
            </th>
            <th scope="col" className="py-4 font-semibold">
              Problems
            </th>
            <th scope="col" className="py-4 font-semibold">
              Length
            </th>
            <th scope="col" className="py-4 font-semibold">
              Before Start
            </th>
            <th scope="col" className="py-4 font-semibold">
              Until Closing
            </th>
            <th scope="col" className="py-4 font-semibold">
              Contestants
            </th>
            <th scope="col" className="py-4 font-semibold text-lg">
              {<GrCircleQuestion className="mx-auto" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {upcomingContestsArray.map((contest, index) => (
            <tr key={index}>
              <td className="py-4 text-left">
                <div className="flex flex-col">
                  <p className="mb-0.5 font-semibold hover:text-blue-500">
                    <div>{contest.contestName}</div>
                  </p>
                  <p className="text-fourth_font_color_dark text-sm font-semibold">
                    {contest.startTime}
                  </p>
                </div>
              </td>
              <td className="py-4">{contest.problems.length}</td>
              <td className="py-4">
                {moment
                  .utc()
                  .startOf("day")
                  .add(contest.durationInMinutes, "minutes")
                  .format("HH:mm:ss")}
              </td>
              <td className="py-4">
                {moment
                  .duration(moment(contest.startTime).toDate() - new Date())
                  .format("HH:mm:ss")}
              </td>
              <td className="py-4">
                {moment
                  .duration(
                    moment(contest.startTime).add(30, "minutes").toDate() -
                      new Date()
                  )
                  .format("HH:mm:ss")}
              </td>
              <td className="py-4">
                <NavLink
                  to="#"
                  className="flex justify-center items-center hover:text-main_link_color_dark"
                >
                  <LuUser2 style={{ fontSize: "1.2rem" }} />
                  <span className="block ml-2">
                    {contest.participatedUsers.length}
                  </span>
                </NavLink>
              </td>
              <td className="py-4">
                {contest.participatedUsers.includes(auth.userData.data.id) ? (
                  <button
                    className="bg-[#1D304A] mx-auto font-semibold h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center"
                    onClick={() => cancelRegister(contest.id, index)}
                  >
                    <p className="mr-1.5 -mt-0.5">Cancel Registration</p>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#FF0000] text-lg"
                    />
                  </button>
                ) : (
                  <button
                    className="bg-[#B02A24] font-semibold mx-auto h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center"
                    onClick={() => register(contest.id, index)}
                  >
                    <p className="mr-1.5 -mt-0.5">Register Now</p>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Sponsor Modal */}
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-second_bg_color_dark p-8 px-16 w-[600px] rounded-md text-second_font_color_dark relative">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-lg cursor-pointer absolute top-8 right-8"
              onClick={() => setIsModalOpen(false)}
            />
            <h2 className="text-lg text-center font-semibold mb-8">Sponsor a Contest</h2>
            <form onSubmit={handleSponsorSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block mb-2">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block mb-2">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2">Phone Number:</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark"
                  required
                />
              </div>
              <div className="mb-8">
                <label htmlFor="message" className="block mb-2">Message:</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full p-2 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark"
                  rows="4"
                  required
                />
              </div>
              <div className="flex justify-start gap-4 items-center">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Thank You Modal */}
      {isThankYouModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-8 px-16 w-[400px] rounded-lg shadow-lg text-gray-800 relative animate-fadeIn">
            <div className="absolute top-0 right-0 -mt-4 -mr-4">
              <div className="bg-blue-600 rounded-full h-8 w-8 flex items-center justify-center">
                <svg
                  onClick={closeThankYouModal}
                  className="text-white cursor-pointer h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
            </div>
            <h2 className="text-2xl text-center font-bold mb-4 text-blue-600">Thank You!</h2>
            <p className="text-center">We will communicate with you soon.</p>
            
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.9); }
            to { opacity: 1; transform: scale(1); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.3s ease-out;
          }
        `}
      </style>
    </div>
  );
}

export default UpcomingContests;
