import React, { useRef, useState } from "react";
import { LuUser2 } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { TbBalloonFilled } from "react-icons/tb";
import { GiBalloons } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import ContestTop3 from "../Components/Tables/ContestTop3";
import VirtualContest from "../Components/VirtualContest";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function getRandomState() {
  const states = ["", "A", "P", "W", "F", "FSP"];
  return states[Math.floor(Math.random() * states.length)];
}

function convertToAlphabetic(index) {
  let result = "";
  while (index >= 0) {
    result = String.fromCharCode(65 + (index % 26)) + result;
    index = Math.floor(index / 26) - 1;
  }
  return result;
}

function Contests() {
  const InContest = useRef(0);
  const pageSize = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalProblems = 200;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const problemsArray = Array.from({ length: totalProblems }, (_, index) => ({
    name: `Problem ${index + 1}`,
    state: getRandomState(),
    tried: getRandomInt(0, 10000),
    color: getRandomHexColor(),
  })).slice(startIndex, endIndex);

  const totalPages = Math.ceil(totalProblems / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  return (
    <div className="overflow-x-auto mt-10 flex">
      <div className="w-full">
        <table className="w-full text-left rtl:text-right text-main_font_color_dark">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "70%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="text-second_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {problemsArray.map((problem, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-second_bg_color_dark" : ""
                }`}
              >
                <td className="px-6 py-4">{convertToAlphabetic(index)}</td>
                <td className="px-6 py-4">{problem.name}</td>
                <td className="px-6 py-4 text-center">
                  {problem.state === "A" ||
                  problem.state === "F" ||
                  problem.state === "FSP" ? (
                    <FaCheck style={{ color: "green", fontSize: "1.3rem" }} />
                  ) : problem.state === "P" ? (
                    <FaSpinner
                      className="animate-spin"
                      style={{ color: "orange", fontSize: "1.3rem" }}
                    />
                  ) : (
                    problem.state === "W" && (
                      <IoClose style={{ color: "red", fontSize: "1.3rem" }} />
                    )
                  )}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    {InContest.current ? (
                      problem.state === "A" ? (
                        <TbBalloonFilled
                          style={{ fontSize: "1.5rem", color: problem.color }}
                        />
                      ) : problem.state === "F" ? (
                        <GiBalloons
                          style={{ fontSize: "1.5rem", color: problem.color }}
                        />
                      ) : problem.state === "FSP" ? (
                        <BsFillBalloonHeartFill
                          style={{ fontSize: "1.5rem", color: problem.color }}
                        />
                      ) : null
                    ) : (
                      <>
                        <LuUser2 style={{ fontSize: "1.2rem" }} />
                        <span className="block ml-4">{problem.tried}</span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalProblems > 20 && (
          <div className="flex justify-end my-6 items-center">
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
      <div className="w-[60%] ml-8">
        <ContestTop3 />

      </div>
    </div>
  );
}

export default Contests;
