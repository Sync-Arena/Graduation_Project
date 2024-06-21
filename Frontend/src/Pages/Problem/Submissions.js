import React, { useRef, useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faUser, faVials } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Modal from '../../Components/Modal/Modal';
import AuthContext from '../../Context/AuthProvider';

const Submissions = () => {
  const InContest = useRef(0);
  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState([]);
  const [submissionsArray, setSubmissionsArray] = useState([]);
  const { auth } = useContext(AuthContext);
  const { problemId } = useParams(); // use destructuring to get problemId

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/submissions/all-submissions`, config);
        const fetchedSubmissions = response.data.users.filter(user => user.problemId === problemId); // filter submissions for specific problemId
        const initialModalOpenState = fetchedSubmissions.map(() => false); // initialize modalOpen state array
        setSubmissionsArray(fetchedSubmissions);
        setModalOpen(initialModalOpenState);
      } catch (error) {
        console.error('Error fetching submissions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [problemId, auth.userData.token]); // ensure useEffect re-runs when problemId or token changes

  const totalNumOfSubmissions = submissionsArray.length;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalNumOfSubmissions);

  const totalPages = Math.ceil(totalNumOfSubmissions / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from({ length: Math.min(5, totalPages - visiblePagesOffset) }, (_, index) => index + 1 + visiblePagesOffset);

  const handleClick = (e) => {
    // handle click logic here
  };

  const [isOpen, setOpen] = useState(false);

  const handleDropDown = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="overflow-x-auto mt-10 flex justify-center">
      {loading ? (
        <div className="text-black text-3xl py-8">Loading...</div>
      ) : (
        <div className="w-full">
          <table className="text-left rtl:text-right text-second_font_color_dark">
            <colgroup>
              <col style={{ width: '5%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '10%' }} />
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
              {submissionsArray.slice(startIndex, endIndex).map((submission, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-second_bg_color_dark' : ''}`}>
                  <td className="px-6 py-4">
                    <button
                      className="openModalBtn"
                      onClick={() => {
                        setModalOpen(prev => prev.map((item, idx) => (idx === index ? true : false)));
                      }}
                    >
                      {submission.id}
                    </button>
                    {modalOpen[index] && <Modal setOpenModal={setModalOpen} data={submission} />}
                  </td>
                  <td className="px-6 py-4">{submission.createdAt}</td>
                  <td className="px-6 py-4">{submission.languageName}</td>
                  <td className="px-6 py-4">{submission.wholeStatus}</td>
                  <td className="px-6 py-4">{submission.time}</td>
                  <td className="px-6 py-4">{submission.memory}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Submissions;
