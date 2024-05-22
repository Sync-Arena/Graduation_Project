"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
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
import { faAngleDown, faUser, faVials } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import AuthContext from "../../Context/AuthProvider";
import axios from 'axios'
import { useParams } from "react-router-dom";


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

function handleFilterUserInStatus() {
}

function handleFilterTestNumInStatus() {

}

function Status() {
  const InContest = useRef(0);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const totalNumOfSubmitions = 160;
  const [submissionsArray, setSubmissionsArray] = useState([])
  const {auth} = useContext(AuthContext)
  const contestId = useParams()
  useEffect(() => {
    console.log(contestId.id)
    const fetchData = async() =>{
      console.log(auth.userData)
      try{
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const body = {
          "contestId" : "65fac826bd7ff7f01908d554"
        }
        const fetchedSubmissionsArray = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest/all-submissions`, 
        body,
        config)
        console.log(fetchedSubmissionsArray)
        setSubmissionsArray(fetchedSubmissionsArray.data)
      }catch(error){
        console.error(error)
      }
    }
    fetchData()
  }, [])
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  // const submissionsArray = Array.from(
  //   { length: totalNumOfSubmitions },
  //   (_, index) => ({
  //     id: getRandomInt(0, 10000),
  //     CreateionTime: new Date(),
  //     user: "Ahmed Hamdy",
  //     problem: "problem Name",
  //     lang: "C++",
  //     state: "Accepted",
  //     time: "280 ms",
  //     memory: "2600 KB",
  //   })
  // ).slice(startIndex, endIndex);

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
    console.log(e)
  }
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  return (
      <div className="overflow-x-auto mt-10 flex justify-center">
        <div className="w-full md:w-[90%] ">
          <div className="flex justify-between items-center mb-12">
            <Dropdown
              label=""
              className="w-32"
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
                  Problem
                  <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                </span>
              )}
            >
              <Dropdown.Item onClick={handleClick}>A - Problem 1</Dropdown.Item>
              <Dropdown.Item>B - Problem 2</Dropdown.Item>
              <Dropdown.Item>C - Problem 3</Dropdown.Item>
              <Dropdown.Item>D - Problem 4</Dropdown.Item>
            </Dropdown>

            <Dropdown
              label=""
              className="w-32"
              dismissOnClick={true}
              renderTrigger={() => (
                <span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
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
                <span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
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
                <span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
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
                className="bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2"
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
                className="bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2"
                placeholder="Participant Handler"
                onChange={handleFilterUserInStatus}
              />
            </div>
          </div>
          <table className="w-full text-left rtl:text-right text-main_font_color_dark">
            <colgroup>
              <col style={{ width: "10%" }} />
              <col style={{ width: "20%" }} />
              <col style={{ width: "17.5%" }} />
              <col style={{ width: "17.5%" }} />
              <col style={{ width: "5%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead className="text-second_font_color_dark">
              <tr>
                <th scope="col" className="px-6 py-3">
                  ID
                </th>
                <th scope="col" className="px-6 py-3">
                  When
                </th>
                <th scope="col" className="px-6 py-3">
                  Who
                </th>
                <th scope="col" className="px-6 py-3">
                  Problem
                </th>
                <th scope="col" className="px-6 py-3">
                  Lang
                </th>
                <th scope="col" className="px-6 py-3">
                  Verdict
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Memory
                </th>
              </tr>
            </thead>
            <tbody>
              {submissionsArray.map((submission, index) => (
                <tr
                  key={index}
                  className={`${index % 2 === 0 ? "bg-second_bg_color_dark" : ""
                    }`}
                >
                  <td className="px-6 py-4">{submission.id}</td>
                  <td className="px-6 py-4">
                    {submission.CreateionTime.toUTCString()}
                  </td>
                  <td className="px-6 py-4">{submission.user}</td>
                  <td className="px-6 py-4">{submission.problem}</td>
                  <td className="px-6 py-4">{submission.lang}</td>
                  <td className="px-6 py-4">{submission.state}</td>
                  <td className="px-6 py-4">{submission.time}</td>
                  <td className="px-6 py-4">{submission.memory}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {totalNumOfSubmitions > 20 && (
            <div className="flex justify-end my-6 items-center">
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
      </div>
  );
}

export default Status;
