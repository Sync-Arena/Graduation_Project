import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faAnglesRight,
  faXmark,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { LuUser2 } from "react-icons/lu";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { RiMedal2Line } from "react-icons/ri";

// before:absolute before:content[''] before:h-1 before:w-[50%] before:bottom-0 before:left-0 before:bg-white

function UpcomingContests() {
  const UpcomingContestsArray = [
    {
      name: "Div.2 Round 101",
      startTime: "Mar 21, 2024 4:30 AM GMT+2",
      length: "02:00",
      Problems: 6,
      beforeStart: "12:00:00",
      untilClosing: "05:00:00",
      totalContestants: 22000,
      registered: 1,
    },
    {
      name: "Div.2 Round 102",
      startTime: "Mar 23, 2024 4:30 AM GMT+2",
      length: "05:00",
      Problems: 7,
      beforeStart: "2 days",
      untilClosing: "1 day",
      totalContestants: 12000,
      registered: 0,
    },
    {
      name: "Div.2 Round 103",
      startTime: "Mar 25, 2024 4:30 AM GMT+2",
      length: "05:00",
      Problems: 8,
      beforeStart: "4 days",
      untilClosing: "2 days",
      totalContestants: 2000,
      registered: 0,
    },
  ];

  return (
    <div className="upcoming-contests mt-6 p-8 pr-3 bg-second_bg_color_dark w-full rounded-2xl border-1 border-main_border_color_dark">
      <div>
        <p className="text-xl font-semibold mb-4">Upcoming Contests</p>
      </div>
      <table className="w-full text-center rtl:text-right text-main_font_color_dark">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead className="text-second_font_color_dark">
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
              Registered
            </th>
            <th scope="col" className="py-4 font-semibold text-lg">
              {<GrCircleQuestion className="mx-auto" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {UpcomingContestsArray.map((contest, index) => (
            <tr key={index}>
              <td className="py-4 text-left">
                {
                  <div className="flex flex-col">
                    <p className="mb-0.5 font-semibold hover:text-main_link_color_dark">
                      <NavLink to="#">{contest.name}</NavLink>
                    </p>
                    <p className="text-second_font_color_dark text-sm font-semibold">
                      {contest.startTime}
                    </p>
                  </div>
                }
              </td>
              <td className="py-4">{contest.Problems}</td>
              <td className="py-4">{contest.length}</td>
              <td className="py-4">{contest.beforeStart}</td>
              <td className="py-4">{contest.untilClosing}</td>
              <td className="py-4">
                {
                  <NavLink to="#" className="flex justify-center items-center hover:text-main_link_color_dark">
                    <LuUser2 style={{ fontSize: "1.2rem" }} />
                    <span className="block ml-2">
                      {contest.totalContestants}
                    </span>
                  </NavLink>
                }
              </td>
              <td className="py-4">
                {contest.registered == 0 ? (
                  <button className="bg-[#B02A24] font-semibold mx-auto h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center">
                    <p className="mr-1.5 -mt-0.5">Register Now</p>
                    <FontAwesomeIcon icon={faAnglesRight} />
                  </button>
                ) : (
                  <button className="bg-[#1D304A] mx-auto font-semibold h-8 w-48 px-3 py-1.5 rounded-md text-sm flex justify-center items-center">
                    <p className="mr-1.5 -mt-0.5">Cancel Registeration</p>
                    <FontAwesomeIcon
                      icon={faXmark}
                      className="text-[#FF0000] text-lg"
                    />
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UpcomingContests;
