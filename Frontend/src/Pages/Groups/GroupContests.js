import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { IoAdd } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function GroupContests() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const navigate = useNavigate();

  const handleContestClick = (contestId) => {
    navigate(`/contests/66784812a1f8967460d4a7fc`);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleContestNameChange = (e) => {
    setContestName(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleDurationChange = (e) => {
    setDuration(e.target.value);
  };

  const groupContestsArray = [
    {
      id: 1,
      contestName: "Sheet 3",
      startTime: "2023-01-01 10:00",
      durationInMinutes: 120,
      Solved: 1,
      numOfProblems: 1,
      rank: 1,
      totalContestants: 10,
    },
    {
      id: 2,
      contestName: "Sheet 2",
      startTime: "2023-02-01 11:00",
      durationInMinutes: 90,
      Solved: 3,
      numOfProblems: 8,
      rank: 4,
      totalContestants: 5,
    },
    {
      id: 3,
      contestName: "Sheet 1",
      startTime: "2023-02-01 11:00",
      durationInMinutes: 90,
      Solved: 3,
      numOfProblems: 8,
      rank: 2,
      totalContestants: 4,
    },
    {
      id: 4,
      contestName: "Warm Up",
      startTime: "2023-02-01 11:00",
      durationInMinutes: 90,
      Solved: 3,
      numOfProblems: 8,
      rank: 5,
      totalContestants: 8,
    },
  ];

  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalContests = groupContestsArray.length;

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
    <div className="past-contests flex">
      <div className="contests px-4 py-8 bg-second_bg_color_dark w-full rounded-md text-second_font_color_dark">
        <div className="mx-8 flex justify-between mb-4 pb-8 border-b-2 border-main_border_color_dark">
          <p className="text-xl font-semibold  ">Group Contests</p>
          <div
            className="flex items-center gap-2 bg-third_bg_color_dark p-2 px-4 rounded-md cursor-pointer"
            onClick={openModal}
          >
            <p>add new contest</p>
            <IoAdd className="text-lg" />
          </div>
        </div>
        <table className="w-full text-center rtl:text-right text-main_font_color_dark">
          <colgroup>
            <col style={{ width: "35%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead className="text-third_font_color_dark">
            <tr>
              <th scope="col" className="py-4 text-left font-semibold  px-10">
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
            {groupContestsArray.slice(startIndex, endIndex).map((contest) => (
              <tr
                key={contest.id}
                className="cursor-pointer hover:shadow-custom"
                onClick={() => handleContestClick(contest.id)}
              >
                <td className="px-10 py-4 text-left">
                  <div className="flex flex-col">
                    <p className="mb-0.5 font-semibold hover:text-blue-500">
                      {contest.contestName}
                    </p>
                    <p className="text-fourth_font_color_dark text-sm font-semibold">
                      {contest.startTime}
                    </p>
                  </div>
                </td>
                <td className="py-4">
                  {`${moment
                    .duration(contest.durationInMinutes, "minutes")
                    .hours()}:${contest.durationInMinutes % 60}`}
                </td>
                <td className="py-4">
                  {`${contest.Solved} / ${contest.numOfProblems}`}
                </td>
                <td className="py-4">
                  {`${contest.rank} / ${contest.totalContestants}`}
                </td>
                <td className="py-4">
                  <button className="bg-blue-100 text-blue-500 font-semibold px-4 py-1.5 rounded-md text-sm">
                    Virtual
                  </button>
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
                className={`rounded-full mx-1 text-main_font_color_dark ${
                  currentPage === page ? "bg-main_heighlight_color_dark " : ""
                } ${
                  String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"
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
      {isModalOpen && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-second_bg_color_dark p-16 w-[600px] rounded-md text-second_font_color_dark relative">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-lg cursor-pointer absolute top-8 right-8"
              onClick={closeModal}
            />
            <h2 className="text-lg text-center font-semibold mb-8">
              Add New Contest
            </h2>
            <input
              type="text"
              placeholder="Enter contest's id"
              value={contestName}
              onChange={handleContestNameChange}
              className="text-third_font_color_dark w-full p-2 content-around bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <input
              type="datetime-local"
              placeholder="Enter contest's start time"
              value={startTime}
              onChange={handleStartTimeChange}
              className="text-third_font_color_dark w-full p-2 mt-8 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <input
              type="text"
              placeholder="Enter contest's duration (in minutes)"
              value={duration}
              onChange={handleDurationChange}
              className="text-third_font_color_dark w-full p-2 mt-8 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <div className="flex justify-start gap-4 items-center mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
              >
                Add Contest
              </button>
              <button
                onClick={closeModal}
                className="bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 h-10 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default GroupContests;
