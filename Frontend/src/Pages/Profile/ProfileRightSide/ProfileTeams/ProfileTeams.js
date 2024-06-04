import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import img from "../../../../Assets/Images/hawara.jpg";
import { MdModeEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import EditTeamModal from "./EditTeamModal";

function ProfileTeams() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [inviteInput, setInviteInput] = useState("");
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null); // Define selectedTeamIndex

  const handleUpdateTeam = (updatedTeam) => {
    // Update the team data in the original array or wherever you store it
    teams[selectedTeamIndex] = updatedTeam;
    // Perform necessary update action, e.g., updating state or server data
  };

  const handleEditTeam = (index) => {
    setSelectedTeamIndex(index); // Update the selectedTeamIndex when clicking on the edit icon
    setIsModalEditOpen(true); // Open the edit modal
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsModalEditOpen(false);
    setSelectedTeamIndex(null); // Reset the selectedTeamIndex
  };

  const handleTeamNameChange = (e) => {
    setNewTeamName(e.target.value);
  };

  const handleInviteUser = () => {
    if (inviteInput.trim() !== "") {
      setInvitedUsers([...invitedUsers, inviteInput]);
      setInviteInput("");
    }
  };

  const handleRemoveInvitedUser = (index) => {
    const updatedUsers = [...invitedUsers];
    updatedUsers.splice(index, 1);
    setInvitedUsers(updatedUsers);
  };

  const teams = [
    {
      name: "A5r Mra Wallahi",
      members: [
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
      ],
    },
    {
      name: "A5r Mra Wallahi",
      members: [
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
      ],
    },
    {
      name: "A5r Mra Wallahi",
      members: [
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
      ],
    },
    {
      name: "A5r Mra Wallahi",
      members: [
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
        { name: "Hawara", img: img, rate: 1731 },
      ],
    },
  ];

  const pageSize = 30;
  const totalTeams = teams.length;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalTeams / pageSize);
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
      <div className="w-full bg-second_bg_color_dark rounded-md px-8 py-8">
        <div className="flex justify-between items-center text-fourth_font_color_dark mb-8 border-b-2 border-main_border_color_dark pb-8 mx-4">
          <h2 className="font-semibold text-lg">A member of</h2>
          <div
            className="flex items-center gap-2 bg-third_bg_color_dark p-2 px-4 rounded-md cursor-pointer"
            onClick={openModal}
          >
            <p>create new team</p>
            <IoAdd className="text-lg" />
          </div>
        </div>
        <table className="w-full text-left">
          <colgroup>
            <col style={{ width: "25%" }} />
            <col style={{ width: "70%" }} />
            <col style={{ width: "5%" }} />
          </colgroup>
          <thead className="text-second_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Current Members
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, index) => (
              <tr
                key={index}
                className={`hover:bg-third_bg_color_dark text-base font-semibold hover:shadow-custom rounded-md`}
                style={{ cursor: "pointer" }}
              >
                <td className="px-6 py-4 text-fourth_font_color_dark">
                  {team.name}
                </td>
                <td className="px-6 py-4 flex flex-wrap gap-6">
                  {team.members.map((member, index2) => (
                    <div className="flex flex-col justify-center items-center gap-2">
                      <img src={member.img} className="rounded-md h-20 w-20" />
                      <p className={`${getrateColorClass(member.rate)}`}>
                        {member.name}
                      </p>
                    </div>
                  ))}
                </td>
                <td
                  className="px-6 py-4 edit-icon"
                  onClick={() => handleEditTeam(index)}
                >
                  <MdModeEdit className="text-fourth_font_color_dark" />
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
          <div className="bg-second_bg_color_dark p-16 w-[600px] rounded-md text-fourth_font_color_dark relative">
            <FontAwesomeIcon
              icon={faXmark}
              className="text-lg cursor-pointer absolute top-8 right-8"
              onClick={closeModal}
            />
            <h2 className="text-lg text-center font-semibold mb-8">
              Create New Team
            </h2>
            <input
              type="text"
              placeholder="Enter Team Name"
              value={newTeamName}
              onChange={handleTeamNameChange}
              className="w-full p-2 content-around bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
            />
            <div className="flex justify-between gap-4 mt-8">
              <input
                type="text"
                placeholder="Enter User's Handle"
                value={inviteInput}
                onChange={(e) => setInviteInput(e.target.value)}
                className="flex-1 p-2 bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
              />
              <button
                onClick={handleInviteUser}
                className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
              >
                Invite User
              </button>
            </div>
            <div
              className={`flex flex-wrap gap-4 overflow-y-auto max-h-48 ${
                invitedUsers.length ? "mt-8" : "mt-0"
              }`}
            >
              {invitedUsers.map((user, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-4 border-2 border-main_border_color_dark py-2 px-4 rounded-md"
                >
                  <p>{user}</p>
                  <FontAwesomeIcon
                    icon={faXmark}
                    className="text-[#FF0000] text-lg cursor-pointer"
                    onClick={() => handleRemoveInvitedUser(index)}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-start gap-4 items-center mt-8">
              <button
                onClick={closeModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
              >
                Create Team
              </button>
              <button
                onClick={closeModal}
                className="bg-third_bg_color_dark text-white px-4 py-2 h-10 rounded-md"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isModalEditOpen && (
        <EditTeamModal
          team={teams[selectedTeamIndex]}
          onUpdateTeam={handleUpdateTeam}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default ProfileTeams;
