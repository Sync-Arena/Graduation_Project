import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MdEmail } from "react-icons/md";
import EmailInput from "../../Components/InputField/EmailInput";

import {
  faAnglesRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { LuUser2 } from "react-icons/lu";
import { RiHeartAddFill } from "react-icons/ri";
import AuthContext from "../../Context/AuthProvider";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function UpcomingContests(props) {
  console.log("d;fskj")
  const { auth } = useContext(AuthContext)
  const { upcomingContestsArray } = props
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate()

  async function cancelRegister(contestId, index) {
    console.log(contestId)
    const config = {
      headers: { Authorization: `Bearer ${auth.userData.token}` }
    };
    try {
      const cancel = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/judge/${contestId}/cancel-registration`,
        {},
        config
      )
      console.log(cancel)
      navigate('/contests')
    }
    catch (err) {
      console.error(err)
    }
  }
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function register(contestId, index) {
    navigate(`/contests/${contestId}/ContestRegister`)
  }


  return (
    <div className="upcoming-contests mt-6 text-main_font_color_dark p-8 pr-3 bg-second_bg_color_dark w-full rounded-2xl border-2 border-main_border_color_dark">
      <div className="flex justify-between mr-14 font-semibold mb-4">
        <p className="text-xl">Upcoming Contests</p>
        <NavLink to="#" className="text-main_link_color_dark">
          <RiHeartAddFill className="inline-block mr-2 text-xl" />
          <button className="text-md inline-block" onClick={openModal}>Sponsor a Contest</button>
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
                {
                  <div className="flex flex-col">
                    <p className="mb-0.5 font-semibold hover:text-blue-500">
                      <div>{contest.contestName}</div>
                    </p>
                    <p className="text-fourth_font_color_dark text-sm font-semibold">
                      {contest.startTime}
                    </p>
                  </div>
                }
              </td>
              <td className="py-4">{contest.problems.length}</td>
              <td className="py-4">{`${moment.duration(contest.durationInMinutes, 'minutes').hours()}:${contest.durationInMinutes % 60}`}</td>
              <td className="py-4">{`${moment.duration((moment(contest.startTime).toDate() - new Date())).hours()}:${moment.duration((moment(contest.startTime).toDate() - new Date())).minutes()}`}</td>
              <td className="py-4">{`${moment.duration((moment(contest.startTime).add(30, 'm').toDate() - new Date())).hours()}:${moment.duration((moment(contest.startTime).add(30, 'm').toDate() - new Date())).minutes()}`}</td>
              <td className="py-4">
                {
                  <NavLink to="#" className="flex justify-center items-center hover:text-main_link_color_dark">
                    <LuUser2 style={{ fontSize: "1.2rem" }} />
                    <span className="block ml-2">
                      {contest.participatedUsers.length}
                    </span>
                  </NavLink>
                }
              </td>
              <td className="py-4">
                {contest.participatedUsers.includes(auth.userData.data.id) ? (
                  <button className="bg-[#1D304A] mx-auto text-white font-semibold h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center" onClick={() => cancelRegister(contest.id, index)}>
                    <p className="mr-1.5 -mt-0.5">Cancel Registeration</p>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#FF0000] text-lg"
                    />
                  </button>
                ) : (
                  <button className="bg-[#B02A24] text-white font-semibold mx-auto h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center" onClick={() => register(contest.id, index)}>
                    <p className="mr-1.5 -mt-0.5">Register Now</p>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </button>
                )}
              </td>
            </tr>
          ))}
          {isModalOpen && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-second_bg_color_dark p-16 w-[600px] rounded-md text-second_font_color_dark relative">
                <FontAwesomeIcon
                  icon={faXmark}
                  className="text-lg cursor-pointer absolute top-8 right-8"
                  onClick={closeModal}
                />
                <h2 className="text-lg text-left font-semibold mb-8">
                  Please leave your email, and our team will contact you shortly.
                </h2>
                <EmailInput
                  placeholder="Email"
                  icon={<MdEmail />}
                  name="email"
                  // value={registerFormData.email}
                  // onChange={handleChange}
                />
                <div className="flex justify-start gap-4 items-center mt-8">
                  <button
                    onClick={closeModal}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
                  >
                    Send
                  </button>
                  <button
                    onClick={closeModal}
                    className="bg-third_bg_color_dark text-second_font_color_dark  px-4 py-2 h-10 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UpcomingContests;
