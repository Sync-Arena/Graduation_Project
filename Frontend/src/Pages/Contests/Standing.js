"use client";
import React, { useEffect, useRef, useState, useContext } from "react";

import { useParams } from "react-router-dom";
import { LuUser2 } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { TbBalloonOff } from "react-icons/tb";
import { TbBalloonFilled } from "react-icons/tb";
import { GiBalloons } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import {
  faAngleDown,
  faUser,
  faVials,
} from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import axios from "axios";
import AuthContext from "../../Context/AuthProvider";

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
function handleFilterUserInStatus() {}

function handleFilterTestNumInStatus() {}

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

  const totalNumOfSubmitions = 160;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(totalNumOfSubmitions / pageSize);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );
  function handleClick(e) {
    console.log(e);
  }
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  let noOfPoroblems = noOfProblems;
  let widthForOneCol = 80 / noOfPoroblems;
  let cols = [
    <col style={{ width: "3%" }} />,
    <col style={{ width: "10%" }} />,
    <col style={{ width: "3%" }} />,
    <col style={{ width: "4%" }} />,
  ];
  let problemsIndeces = [];
  for (let i = 0, ch = "A"; i < noOfProblems; ++i, ch++) {
    cols.push(<col style={{ width: `${widthForOneCol}%` }} />);
    problemsIndeces.push(
      <th scope='col' className='px-3 py-3 text-center'>
        {String.fromCharCode("A".charCodeAt(0) + i)}
      </th>
    );
  }

  let standingBody = standingArray.map((row, index) => {
    return (
      <tr
        key={index}
        className={`${index % 2 === 0 ? "bg-second_bg_color_dark" : ""}`}>
        <td className='px-3 py-4 text-center'>{index + 1}</td>
        <td className='px-3 py-4 text-center'>{row.userName}</td>
        <td className='px-3 py-4 text-center'>
          {row.submissionObject.solvedProblems}
        </td>
        <td className='px-3 py-4 text-center'>
          {row.submissionObject.penalty}
        </td>
        {row.submissionObject.problems.map((problem) => {
          return problem.solved ? (
            <td className='px-3 py-4 text-green-600 text-center font-bold'>
              + {problem.wronges ? problem.wronges : ""}
            </td>
          ) : (
            <td className='px-3 py-4 text-red-800 text-center font-bold'>
              {problem.wronges ? `- ${problem.wronges}` : ""}
            </td>
          );
        })}
      </tr>
    );
  });
  return (
    <div className='overflow-x-auto mt-10 flex justify-center'>
      {loading ? (
        <div className='text-white text-3xl py-8'>Loading...</div>
      ) : (
        <div className='w-full md:w-[90%] '>
          <div className='flex justify-between items-center mb-12'>
            <Dropdown
              label=''
              className='w-32'
              dismissOnClick={true}
              renderTrigger={() => (
                <span className='inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark'>
                  Problem
                  <FontAwesomeIcon icon={faAngleDown} className='pl-4' />
                </span>
              )}>
              <Dropdown.Item onClick={handleClick}>A - Problem 1</Dropdown.Item>
              <Dropdown.Item>B - Problem 2</Dropdown.Item>
              <Dropdown.Item>C - Problem 3</Dropdown.Item>
              <Dropdown.Item>D - Problem 4</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=''
              className='w-32'
              dismissOnClick={true}
              renderTrigger={() => (
                <span className='inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark'>
                  Verdict
                  <FontAwesomeIcon icon={faAngleDown} className='pl-4' />
                </span>
              )}>
              <Dropdown.Item>Accepted</Dropdown.Item>
              <Dropdown.Item>Wrong Answer</Dropdown.Item>
              <Dropdown.Item>Time Limit</Dropdown.Item>
              <Dropdown.Item>Run Time Error</Dropdown.Item>
              <Dropdown.Item>Memory Limit</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=''
              className='w-32'
              dismissOnClick={true}
              renderTrigger={() => (
                <span className='inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark'>
                  Language
                  <FontAwesomeIcon icon={faAngleDown} className='pl-4' />
                </span>
              )}>
              <Dropdown.Item>C++</Dropdown.Item>
              <Dropdown.Item>Java</Dropdown.Item>
              <Dropdown.Item>Python</Dropdown.Item>
            </Dropdown>
            <Dropdown
              label=''
              className='w-32'
              dismissOnClick={true}
              renderTrigger={() => (
                <span className='inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark'>
                  Test
                  <FontAwesomeIcon icon={faAngleDown} className='pl-4' />
                </span>
              )}>
              <Dropdown.Item>?</Dropdown.Item>
              <Dropdown.Item>!</Dropdown.Item>
              <Dropdown.Item>$</Dropdown.Item>
              <Dropdown.Item>#</Dropdown.Item>
            </Dropdown>
            <div className='relative text-second_font_color_dark'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3.5'>
                <FontAwesomeIcon icon={faVials} />
              </div>
              <input
                type='text'
                className='bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2'
                placeholder='Test Number'
                onChange={handleFilterTestNumInStatus}
              />
            </div>
            <div className='relative text-second_font_color_dark'>
              <div className='absolute inset-y-0 start-0 flex items-center ps-3.5'>
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type='text'
                className='bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2'
                placeholder='Participant Handler'
                onChange={handleFilterUserInStatus}
              />
            </div>
          </div>
          <table className='w-full text-left rtl:text-right text-main_font_color_dark'>
            <colgroup>{cols}</colgroup>
            <thead className='text-second_font_color_dark'>
              <tr>
                <th scope='col' className='px-3 py-3 text-center'>
                  #
                </th>
                <th scope='col' className='px-3 py-3'>
                  Who
                </th>
                <th scope='col' className='px-3 py-3 text-center'>
                  =
                </th>
                <th scope='col' className='px-3 py-3 text-center'>
                  Penalty
                </th>
                {problemsIndeces}
              </tr>
            </thead>
            <tbody className='text-white'>{standingBody}</tbody>
          </table>
          {totalNumOfSubmitions > 20 && (
            <div className='flex justify-end my-6 items-center'>
              <FaAngleLeft
                className='text-main_font_color_dark cursor-pointer mr-2'
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
                  } cursor-pointer`}>
                  {page}
                </button>
              ))}
              <FaAngleRight
                className='text-main_font_color_dark cursor-pointer ml-2'
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
