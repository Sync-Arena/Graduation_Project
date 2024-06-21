import React from 'react'
import { useRef, useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { faAngleDown, faUser, faVials } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import AuthContext from "../../Context/AuthProvider";
import axios from 'axios'
import { useParams } from "react-router-dom";
import Modal from "../../Components/Modal/Modal"

function handleFilterUserInStatus() {
}

function handleFilterTestNumInStatus() {

}

const Submissions = () => {
  const InContest = useRef(0);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState([]);
  const [submissionsArray, setSubmissionsArray] = useState([])
  const totalNumOfSubmitions = submissionsArray.length;
  const { auth } = useContext(AuthContext)
  const problemId = useParams()

  useEffect(() => {
    // console.log(contestId.id)
    setLoading(true)
    const fetchData = async () => {
      // console.log(auth.userData)
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const fetchedSubmissionsArray = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/submissions/all-submissions`,
          config)
        console.log(fetchedSubmissionsArray)
        let arr = []
        let submissionsForProblem = []
        for (let i = 0; i < fetchedSubmissionsArray.data.users.length; ++i) {
          console.log(fetchedSubmissionsArray.data.users[i].problemId, problemId.problemId)
          if (fetchedSubmissionsArray.data.users[i].problemId == problemId.problemId) {
            submissionsForProblem.push(fetchedSubmissionsArray.data.users[i])
            arr.push(false)
          }
        }
        console.log(submissionsForProblem)
        setModalOpen(prv => arr)
        setSubmissionsArray(submissionsForProblem)
      } catch (error) {
        console.error(error)
      }
      finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])
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
    // console.log(e)
  }
  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };
  return (<div className="overflow-x-auto mt-10 flex justify-center">

    {
      loading ?
        <div className="text-black text-3xl py-8">Loading...</div>
        :
        <div className="w-full ">
          <div className="flex justify-start items-center mb-10">
            <div className='mx-2'>
              <Dropdown

                label=""
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
            </div>
            <div className='mx-2'>
              <Dropdown
                label=""
                className="w-32"
                dismissOnClick={true}
                renderTrigger={() => (
                  <span className="inline-block  text-second_font_color_dark px-8 py-2 rounded-md border border-main_border_color_dark">
                    Language
                    <FontAwesomeIcon icon={faAngleDown} className="pl-4" />
                  </span>
                )}
              >
                <Dropdown.Item>C++</Dropdown.Item>
                <Dropdown.Item>Java</Dropdown.Item>
                <Dropdown.Item>Python</Dropdown.Item>
              </Dropdown>
            </div>

            <div className="relative text-second_font_color_dark mx-2">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <input
                type="text"
                className=" border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2 px-8"
                placeholder="Participant Handler"
                onChange={handleFilterUserInStatus}
              />
            </div>
          </div>
          <table className="w-full text-left rtl:text-right text-second_font_color_dark">
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
            <thead className="text-third_font_color_dark">
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
                  <td className="px-6 py-4">                    <button
                    className="openModalBtn"
                    onClick={() => {
                      let arr = []
                      for (let i = 0; i < modalOpen.length; ++i) {
                        if (i == index) arr[i] = true;
                        else arr[i] = false
                      }
                      setModalOpen(arr);
                    }}
                  >
                    {submission.id}
                  </button>
                    {modalOpen[index] && <Modal setOpenModal={setModalOpen} data={submission} />}</td>
                  <td className="px-6 py-4">{submission.createdAt}</td>
                  <td className="px-6 py-4">{submission.user.userName}</td>
                  <td className="px-6 py-4">{submission.problemName}</td>
                  <td className="px-6 py-4">{submission.languageName}</td>
                  <td className="px-6 py-4">{submission.wholeStatus}</td>
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
    }
  </div>
  )
}

export default Submissions
