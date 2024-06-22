import React from 'react'
import { useRef, useState, useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { faAngleDown, faUser, faVials } from "@fortawesome/free-solid-svg-icons";
import { Dropdown } from "flowbite-react";
import AuthContext from "../../../Context/AuthProvider";
import axios from 'axios'
import { useParams } from "react-router-dom";
import Modal from "../../../Components/Modal/Modal"
import Loading from '../../Loading/Loading';

function handleFilterUserInStatus() {
}

function handleFilterTestNumInStatus() {

}

const ProfileSubmissions = () => {
  const InContest = useRef(0);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false)
  const [modalOpen, setModalOpen] = useState([]);
  const [submissionsArray, setSubmissionsArray] = useState([])
  const totalNumOfSubmitions = submissionsArray.length;
  const { auth } = useContext(AuthContext)

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
        console.log(auth.userData)
        for (let i = 0; i < fetchedSubmissionsArray.data.users.length; ++i) {
          console.log(fetchedSubmissionsArray.data.users[i].user.id, auth.userData.data.id)
          if (fetchedSubmissionsArray.data.users[i].user.id == auth.userData.data.id) {
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
        <div className="mt-32"><Loading /></div>
        :
        <div className="w-full ">

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
        </div>
    }
  </div>
  )
}

export default ProfileSubmissions
