import React, { useEffect, useRef, useState, useContext } from "react";
import { LuUser2 } from "react-icons/lu";
import { FaCheck, FaSpinner } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { TbBalloonFilled } from "react-icons/tb";
import { GiBalloons } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../Context/AuthProvider";
import Loading from "../Loading/Loading"; // Assuming correct path to your Loading component

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

function Problems() {
  const InContest = useRef(0);

  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const [problemsArray, setProblemsArray] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const { auth } = useContext(AuthContext);
  const contestId = useParams();

  useEffect(() => {
    let fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` },
        };
        const { data } = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest?contestId=${contestId.id}`,
          config
        );
        setProblemsArray(data[0].contest.problems);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // Set loading to false when data is fetched
      }
    };
    fetchData();
  }, [auth, contestId.id]);

  const totalPages = Math.ceil(problemsArray.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  const handleProblemClick = (problemId) => {
    navigate(`/${problemId}/description`, {
      state: { contestId: contestId.id, problemId: problemId },
    });
  };

  if (isLoading) {
    return <div className="mt-48"><Loading /></div>; // Render loading screen while fetching data
  }

  return (
    <div className="overflow-x-auto mt-10 flex">
      <div className="w-full">
        <table className="w-full text-left rtl:text-right text-second_font_color_dark">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "50%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
          </colgroup>
          <thead className="text-third_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {problemsArray.map((problem, index) => (
              <tr
                key={index}
                className={`${index % 2 === 0 ? "bg-second_bg_color_dark" : ""}`}
                onClick={() => handleProblemClick(problem._id)}
                style={{ cursor: "pointer" }}
              >
                <td className="px-6 py-4">{convertToAlphabetic(index)}</td>
                <td className="px-6 py-4 font-semibold">{problem.name}</td>
                <td className="px-6 py-4">
                  1S, 256MB
                </td>
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
                        <span className="block ml-4">
                          {problem.numberOfSolvers}
                        </span>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {problemsArray.length > 20 && (
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
                } ${String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"} cursor-pointer`}
              >
                {page}
              </button>
            ))}
            <FaAngleRight
              className="text-main_font_color_dark cursor-pointer ml-2"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Problems;
