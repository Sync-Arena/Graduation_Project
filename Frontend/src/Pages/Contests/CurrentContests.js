import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

function CurrentContests() {
  const currentContestsArray = [
    {
      name: "Div.2 Round 101",
      startTime: "Mar 21, 2024 4:30 AM GMT+2",
      length: "02:00",
      Problems: 6,
      beforeEnd: "12:00:00",
      totalContestants: 22000,
      madeAnySumit: 1,
      rank: 2000,
      registered: 1,
    },
    {
      name: "Div.2 Round 101",
      startTime: "Mar 21, 2024 4:30 AM GMT+2",
      length: "05:00",
      Problems: 10,
      beforeEnd: "12:00:00",
      totalContestants: 12000,
      madeAnySumit: 0,
      rank: 0,
      registered: 0,
    },
  ];

  return (
    <div className="current-contests mt-6 p-8 pr-3 bg-second_bg_color_dark w-full rounded-2xl border-2 border-main_border_color_dark">
      <div>
        <p className="text-xl font-semibold mb-4">Current Contests</p>
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
              Before End
            </th>
            <th scope="col" className="py-4 font-semibold">
              Registered
            </th>
            <th scope="col" className="py-4 font-semibold">
              Ranking
            </th>
            <th scope="col" className="py-4 font-semibold text-lg">
              {<GrCircleQuestion className="mx-auto" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentContestsArray.map((contest, index) => (
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
              <td className="py-4">{contest.beforeEnd}</td>
              <td className="py-4">
                {contest.registered ? (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className="text-[#00FF00] text-2xl"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-[#FF0000] text-2xl"
                  />
                )}
              </td>
              <td className="py-4">{`${
                contest.madeAnySumit ? contest.rank : "-"
              } / ${contest.totalContestants}`}</td>
              <td className="py-4">
                {
                  <button className="bg-second_heighlight_color_dark font-semibold mx-auto px-4 py-1.5 rounded-md text-sm flex justify-center items-center">
                    <p>Standing</p>
                  </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentContests;
