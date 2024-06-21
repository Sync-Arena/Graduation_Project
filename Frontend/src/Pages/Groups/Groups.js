import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { IoAdd } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

function Groups() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [inviteInput, setInviteInput] = useState("");

  const groups = [
    {
      title: "To ICPC 2024 Contests",
      author: "Hussien_Ibrahim",
      authorRank: "2000",
      date: "Jun/07/2024 14:10",
      isJoined: 0,
      description: "Discussion about ICPC 2024 contests.",
    },
    {
      title: "Montgomery Blair Informatics Tournament 2024",
      author: "DanTheMan.",
      authorRank: "2100",
      date: "Jun/07/2024 06:40",
      isJoined: 1,
      description:
        "The fifth edition of the Montgomery Blair Informatics Tournament.",
    },
    {
      title: "who doesn't solve problems enough is gay",
      author: "I_Love_Sonechka",
      authorRank: "2500",
      date: "Jun/03/2024 17:19",
      isJoined: 2,
      description: "A humorous take on the importance of problem-solving.",
    },
    {
      title: "KBO CAMP JUNIOR jetiler",
      author: "Kalashnikov",
      authorRank: "3000",
      date: "Jun/03/2024 07:00",
      isJoined: 0,
      description: "Junior camp for aspiring problem solvers.",
    },
    {
      title: "Tutoring with Bảo",
      author: "KhanhHoa_NNTan_1",
      authorRank: "1600",
      date: "May/28/2024 09:41",
      isJoined: 1,
      description: "Personal tutoring sessions with Bảo.",
    },
    {
      title: "After School Program",
      author: "teraqqq",
      authorRank: "1400",
      date: "May/25/2024 16:52",
      isJoined: 2,
      description: "After school program for students.",
    },
    {
      title: "Seminar for Teachers",
      author: "Messi",
      authorRank: "2000",
      date: "May/21/2024 12:41",
      isJoined: 0,
      description: "Seminar dedicated to teachers' professional development.",
    },
    {
      title: "Endless Trails of Wind",
      author: "Sakuya_maid",
      authorRank: "2000",
      date: "May/20/2024 10:52",
      isJoined: 1,
      description: "A discussion on the endless trails of wind.",
    },
    {
      title: "Tutoring with Triết",
      author: "KhanhHoa_NNTan_1",
      authorRank: "2000",
      date: "May/18/2024 09:11",
      isJoined: 2,
      description: "Personal tutoring sessions with Triết.",
    },
    {
      title: "CS UNSA - Competitive Programming",
      author: "DonChipilin",
      authorRank: "2000",
      date: "May/18/2024 08:44",
      isJoined: 0,
      description: "Competitive programming discussions at CS UNSA.",
    },
  ];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleTeamNameChange = (e) => {
    setNewTeamName(e.target.value);
  };

  const pageSize = 5;
  const totalGroups = groups.length;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalGroups / pageSize);
  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getrateColorClass = (rate) => {
    if (rate >= 0 && rate <= 1199) return "text-rating_newbie";
    if (rate >= 1200 && rate <= 1399) return "text-rating_pupil";
    if (rate >= 1400 && rate <= 1599) return "text-rating_specialist";
    if (rate >= 1600 && rate <= 1899) return "text-rating_expert";
    if (rate >= 1900 && rate <= 2099) return "text-rating_candidate_master";
    if (rate >= 2100 && rate <= 2299) return "text-rating_master";
    if (rate >= 2300 && rate <= 2399) return "text-rating_international_master";
    if (rate >= 2400 && rate <= 2599) return "text-rating_grandmaster";
    if (rate >= 2600 && rate <= 2999)
      return "text-rating_international_grandmaster";
    if (rate >= 3000 && rate <= 4000)
      return "text-rating_legendary_grandmaster";
    return "";
  };

  return (
    <div className="overflow-x-auto mt-6 flex">
      <div className="w-full bg-second_bg_color_dark rounded-lg px-8 py-8">
        <div className="flex justify-between items-center text-second_font_color_dark mb-8 border-b-2 border-main_border_color_dark pb-8 mx-4">
          <h2 className="font-semibold text-lg">All Groups</h2>
          <div
            className="flex items-center gap-2 bg-third_bg_color_dark p-2 px-4 rounded-md cursor-pointer"
            onClick={openModal}
          >
            <p>create new group</p>
            <IoAdd className="text-lg" />
          </div>
        </div>
        <table className="w-full text-left">
          <colgroup>
            <col style={{ width: "45%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead className="text-third_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3">
                Group Name
              </th>
              <th scope="col" className="px-6 py-3">
                Creator
              </th>
              <th scope="col" className="px-6 py-3">
                Creation time
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {groups.map((group, index) => (
              <tr
                key={index}
                className={`text-base font-semibold hover:shadow-custom rounded-md`}
                style={{ cursor: "pointer" }}
              >
                <td className="px-6 py-4">
                  <div>
                    <NavLink 
                      to={`${group.title}/contests`}
                      className="text-blue-600 hover:text-blue-700">
                      {group.title}
                    </NavLink>
                    <p className="text-fourth_font_color_dark text-sm">
                      {group.description}
                    </p>
                  </div>
                </td>
                <td
                  className={`px-6 py-4 flex flex-wrap gap-6 ${getrateColorClass(
                    group.authorRank
                  )}`}
                >
                  {group.author}
                </td>
                <td className="px-6 py-4 edit-icon text-fourth_font_color_dark">
                  {group.date}
                </td>
                <td className="px-6 py-4 edit-icon text-fourth_font_color_dark">
                  {group.isJoined == 0 && (
                    <button className="bg-blue-100 text-main_heighlight_color_dark w-24 py-1 rounded-md cursor-pointer">
                      Join
                    </button>
                  )}
                  {group.isJoined == 1 && (
                    <button className="bg-[#FDD7D7] text-[#F63737] w-24 py-1 rounded-md cursor-pointer">
                      Leave
                    </button>
                  )}
                  {group.isJoined == 2 && (
                    <button className="bg-[#FFF1CC] text-[#FFB700] w-24 py-1 rounded-md cursor-pointer">
                      Pending
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalPages > 1 && (
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
                  currentPage === page ? "bg-main_heighlight_color_dark" : ""
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
              Create New Group
            </h2>
            <input
              type="text"
              placeholder="Enter group's name"
              value={newTeamName}
              onChange={handleTeamNameChange}
              className="w-full p-2 content-around bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <input
              type="text"
              placeholder="Enter group's description"
              value={inviteInput}
              onChange={(e) => setInviteInput(e.target.value)}
              className="w-full p-2 mt-8 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <div className="flex justify-start gap-4 items-center mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
              >
                Create Group
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

export default Groups;
