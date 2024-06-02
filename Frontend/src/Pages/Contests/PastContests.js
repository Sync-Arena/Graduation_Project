import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { RiMedal2Line } from "react-icons/ri";
import PastContestsFilter from "./PastContestsFilter";
import moment from "moment";
function PastContests(props) {
  const pastContestsArray = props.pastContestsArray
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalContests = 200;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const totalPages = Math.ceil(totalContests / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  return (
    <div className="past-contests flex mt-8">
      <div className="contests pl-8 pr-2 py-8 bg-second_bg_color_dark w-[70%] rounded-2xl border-2 border-main_border_color_dark">
        <div>
          <p
            className="text-xl font-semibold mb-4
                "
          >
            Past Contests
          </p>
        </div>
        <table className="w-full text-center rtl:text-right text-main_font_color_dark">
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead className="text-second_font_color_dark">
            <tr>
              <th scope="col" className="py-4 text-left font-semibold">
                Contest
              </th>
              <th scope="col" className="py-4 font-semibold">
                Length
              </th>
              <th scope="col" className="py-4 font-semibold">
                Solved
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
            {pastContestsArray.map((contest, index) => (
              <tr key={index}>
                <td className="py-4 text-left">
                  {
                    <div className="flex flex-col">
                      <p className="mb-0.5 font-semibold hover:text-main_link_color_dark">
                        <NavLink to={contest.id}>{contest.contestName}</NavLink>
                      </p>
                      <p className="text-second_font_color_dark text-sm font-semibold">
                        {contest.startTime}
                      </p>
                    </div>
                  }
                </td>
                <td className="py-4">{`${moment.duration(contest.durationInMinutes, 'minutes').hours()}:${contest.durationInMinutes%60}`}</td>
                <td className="py-4">{/*{`${contest.Solved} / ${contest.numOfProblems}`}*/}</td>
                <td className="py-4">{/*{`${contest.rank} / ${contest.totalContestants}`}*/}</td>
                <td className="py-4">
                  {
                    <button className="bg-main_heighlight_color_dark font-semibold px-3 py-1.5 rounded-md text-sm">
                      Virtual
                    </button>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalContests > 20 && (
          <div className="flex justify-end mt-6 items-center mr-8">
            <FaAngleLeft
              className="text-main_font_color_dark cursor-pointer mr-2"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-full mx-1 text-main_font_color_dark ${currentPage === page ? "bg-main_heighlight_color_dark " : ""
                  } ${String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"
                  } cursor-pointer`}
              >
                {page}
              </button>
            ))}
            <FaAngleRight
              className="text-main_font_color_dark cursor-pointer ml-2"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </div>
        )}
      </div>
      <PastContestsFilter />
    </div>
  );
}

export default PastContests;
