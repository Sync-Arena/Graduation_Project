import React, { useEffect, useRef, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa";
import {
  faAngleDown,
  faUser,
  faVials,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import AuthContext from "../../Context/AuthProvider";
import Loading from "../Loading/Loading"; // Assuming correct path to your Loading component

function Standing() {
  const InContest = useRef(0);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const contestId = useParams();
  const { auth } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [standingArray, setStandingArray] = useState([]);
  const [noOfProblems, setNoOfProblems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` },
        };
        const standing = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest/${contestId.id}/standing`,
          config
        );
        setStandingArray(standing.data.standing);
        setNoOfProblems(standing.data.noOfProblmes);
        console.log(standing.data.standing);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalNumOfSubmissions = standingArray.length;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(totalNumOfSubmissions / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  const handleFilterUserInStatus = (e) => {
    // Handle filter logic here
  };

  const handleFilterTestNumInStatus = (e) => {
    // Handle filter logic here
  };

  let cols = [];
  if (noOfProblems) {
    let widthForOneCol = 60 / noOfProblems;
    cols = [
      <col style={{ width: "10%" }} key="col1" />,
      <col style={{ width: "15%" }} key="col2" />,
      <col style={{ width: "5%" }} key="col3" />,
      <col style={{ width: "10%" }} key="col4" />,
    ];
    for (let i = 0; i < noOfProblems; ++i) {
      cols.push(
        <col style={{ width: `${widthForOneCol}%` }} key={`col${i + 5}`} />
      );
    }
  }

  const problemsIndices = [];
  for (let i = 0; i < noOfProblems; ++i) {
    const problemIndex = String.fromCharCode("A".charCodeAt(0) + i);
    problemsIndices.push(
      <th scope="col" className="px-3 py-3 text-center" key={`th${i}`}>
        {problemIndex}
      </th>
    );
  }

  const standingBody = standingArray.map((row, index) => (
    <tr
      key={index}
      className={`${index % 2 === 0 ? "bg-second_bg_color_dark" : ""}`}
    >
      <td className="px-3 py-4 text-center">{index + 1}</td>
      <td className="px-3 py-4 text-left">{row.userName}</td>
      <td className="px-3 py-4 text-center">
        {row.submissionObject.solvedProblems}
      </td>
      <td className="px-3 py-4 text-center">{row.submissionObject.penalty}</td>
      {row.submissionObject.problems.map((problem, idx) => (
        <td
          key={idx}
          className={`px-3 py-4 text-center font-bold ${
            problem.solved ? "text-green-600" : "text-red-800"
          }`}
        >
          {problem.solved
            ? `+ ${problem.wronges || ""}`
            : `- ${problem.wronges || ""}`}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="overflow-x-auto mt-10 flex justify-center">
      {loading ? (
        <div className="mt-32"><Loading /></div>
      ) : (
        <div className="w-full">
          <div className="flex justify-between items-center mb-10">
            <Dropdown
              label=""
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block text-second_font_color_dark px-8 py-2 rounded-md border border-main_border_color_dark">
                  Problem
                  <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                </span>
              )}
            >
              <Dropdown.Item onClick={() => console.log("Filter by A")}>
                A - Problem 1
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Filter by B")}>
                B - Problem 2
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Filter by C")}>
                C - Problem 3
              </Dropdown.Item>
              <Dropdown.Item onClick={() => console.log("Filter by D")}>
                D - Problem 4
              </Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=""
              className="w-32"
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block text-second_font_color_dark px-8 py-2 rounded-md border border-main_border_color_dark">
                  Verdict
                  <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                </span>
              )}
            >
              <Dropdown.Item>Accepted</Dropdown.Item>
              <Dropdown.Item>Wrong Answer</Dropdown.Item>
              <Dropdown.Item>Time Limit</Dropdown.Item>
              <Dropdown.Item>Run Time Error</Dropdown.Item>
              <Dropdown.Item>Memory Limit</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=""
              className="w-32"
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block text-second_font_color_dark px-8 py-2 rounded-md border border-main_border_color_dark">
                  Language
                  <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                </span>
              )}
            >
              <Dropdown.Item>C++</Dropdown.Item>
              <Dropdown.Item>Java</Dropdown.Item>
              <Dropdown.Item>Python</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=""
              className="w-32"
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block text-second_font_color_dark px-8 py-2 rounded-md border border-main_border_color_dark">
                  Test
                  <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                </span>
              )}
            >
              <Dropdown.Item>?</Dropdown.Item>
              <Dropdown.Item>!</Dropdown.Item>
              <Dropdown.Item>$</Dropdown.Item>
              <Dropdown.Item>#</Dropdown.Item>
            </Dropdown>
            <div className="relative text-second_font_color_dark">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FontAwesomeIcon icon={faVials} />
              </div>
              <input
                type="text"
                className="border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2 px-8"
                placeholder="Test Number"
                onChange={handleFilterTestNumInStatus}
              />
            </div>
            <div className="relative text-second_font_color_dark">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type="text"
                className="border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2 px-8"
                placeholder="Participant Handler"
                onChange={handleFilterUserInStatus}
              />
            </div>
          </div>
          <table className="w-full text-left text-second_font_color_dark text-center">
            <colgroup>
              {cols}
            </colgroup>
            <thead className="text-third_font_color_dark">
              <tr>
                <th scope="col" className="px-3 py-3">
                  #
                </th>
                <th scope="col" className="px-3 py-3 text-left">
                  Who
                </th>
                <th scope="col" className="px-3 py-3 text-center">
                  =
                </th>
                <th scope="col" className="px-3 py-3">
                  Penalty
                </th>
                {problemsIndices}
              </tr>
            </thead>
            <tbody>{standingBody}</tbody>
          </table>
          {totalNumOfSubmissions > 20 && (
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
                  } ${String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"}`}
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
      )}
    </div>
  );
}

export default Standing;



