import React, { useState, useEffect, useContext } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { MdModeEdit } from "react-icons/md";
import { IoAdd } from "react-icons/io5";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../../Loading/Loading"; // Assuming correct path to your Loading component
import { Buffer } from "buffer";
import EditTeamModal from "./EditTeamModal";
import AuthContext from "../../../../Context/AuthProvider";
import defaultImg from "../../../../Assets/Images/default-avatar.jpg";
import axios from "axios";

function ProfileTeams() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [newTeamName, setNewTeamName] = useState("");
  const [invitedUsers, setInvitedUsers] = useState([]);
  const [inviteInput, setInviteInput] = useState("");
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(null); // Define selectedTeamIndex
  const [myTeams, setMyTeams] = useState([]);
  const { auth } = useContext(AuthContext);
  const [creatingTeam, setCreatingTeam] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${auth.userData.token}` },
  };

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const data = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/teams/myteams`,
          config
        );
        setMyTeams(data.data.data);
        console.log(data.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [creatingTeam]);

  const handleUpdateTeam = async (teamUpdate) => {
    const { teamId, membersToInvite } = teamUpdate;
    console.log(membersToInvite, teamId);

    for (let user of membersToInvite) {
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/teams/${teamId}`,
          { username: user },
          config
        );
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    setCreatingTeam(!creatingTeam);
    setLoading(true);
  };

  const handleEditTeam = (index) => {
    console.log("s");
    setSelectedTeamIndex(index); // Update the selectedTeamIndex when clicking on the edit icon
    setIsModalEditOpen(true); // Open the edit modal
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleCreateTeam = async () => {
    console.log(newTeamName, invitedUsers);
    let createTeamData;
    try {
      createTeamData = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/judge/teams`,
        { teamName: newTeamName },
        config
      );
      console.log(createTeamData.data.data._id);
    } catch (err) {
      console.log(err);
    }
    for (let user of invitedUsers) {
      try {
        const data = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/teams/${createTeamData.data.data._id}`,
          { username: user },
          config
        );
        console.log(data.data);
      } catch (err) {
        console.log(err);
      }
    }
    setCreatingTeam(!creatingTeam);
    setLoading(true);
    setIsModalOpen(false);
    setIsModalEditOpen(false);
    setSelectedTeamIndex(null); // Reset the selectedTeamIndex
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

  const pageSize = 30;
  const totalTeams = myTeams.length;
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

  const getRateColorClass = (rate) => {
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
    if (rate >= 3000 && rate <= 4000) return "text-rating_legendary_grandmaster";
    return "";
  };

  return (
    <div className="overflow-x-auto mt-6 flex">
      <div className="w-full bg-second_bg_color_dark rounded-md px-8 py-8">
        <div className="flex justify-between items-center text-second_font_color_dark mb-8 border-b-2 border-main_border_color_dark pb-8 mx-4">
          <h2 className="font-semibold text-lg">A member of</h2>
          <div
            className="flex items-center gap-2 bg-third_bg_color_dark p-2 px-4 rounded-md cursor-pointer"
            onClick={openModal}
          >
            <p>create new team</p>
            <IoAdd className="text-lg" />
          </div>
        </div>
        {loading ? (
          <div className="mt-32 flex justify-center">
            <Loading />
          </div>
        ) : (
          <div>
            <table className="w-full text-left">
              <colgroup>
                <col style={{ width: "25%" }} />
                <col style={{ width: "70%" }} />
                <col style={{ width: "5%" }} />
              </colgroup>
              <thead className="text-third_font_color_dark">
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
                {myTeams.map((team, index) => (
                  <tr
                    key={index}
                    className={`text-base font-semibold hover:shadow-custom rounded-md`}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="px-6 py-4 text-third_font_color_dark">
                      {team.teamName}
                    </td>
                    <td className="px-6 py-4 flex flex-wrap gap-6">
                      {team.members.map((member, index2) => (
                        <div
                          key={index2}
                          className="flex flex-col justify-center items-center gap-2"
                        >
                          {member.additionalData.pic ? (
                            <img
                              src={`data:${
                                member.additionalData.pic.contentType
                              };base64,${Buffer.from(
                                member.additionalData.pic.data
                              ).toString("base64")}`}
                              className="rounded-md h-20 w-20"
                              alt="profile"
                            />
                          ) : (
                            <img
                              src={defaultImg}
                              className="rounded-md h-20 w-20"
                              alt="profile"
                            />
                          )}
                          <p className={`text-third_font_color_dark`}>
                            {member.userName}
                          </p>
                        </div>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <MdModeEdit
                        className="text-xl text-third_font_color_dark"
                        onClick={() => handleEditTeam(index)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10"
        >
          <div className="bg-second_bg_color_dark p-6 rounded-lg relative">
            <button
              className="absolute top-2 right-2 text-third_font_color_dark"
              onClick={closeModal}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <h3 className="text-lg font-semibold text-main_text_color_dark mb-4">
              Create a new team
            </h3>
            <input
              type="text"
              className="w-full mb-2 p-2 rounded-md bg-third_bg_color_dark text-main_text_color_dark"
              placeholder="Team Name"
              value={newTeamName}
              onChange={handleTeamNameChange}
            />
            <div className="mb-4">
              <div className="flex items-center">
                <input
                  type="text"
                  className="flex-1 p-2 rounded-md bg-third_bg_color_dark text-main_text_color_dark"
                  placeholder="Invite Users"
                  value={inviteInput}
                  onChange={(e) => setInviteInput(e.target.value)}
                />
                <button
                  className="ml-2 px-4 py-2 bg-main_bg_color_dark text-main_text_color_dark rounded-md"
                  onClick={handleInviteUser}
                >
                  Add
                </button>
              </div>
              <div className="mt-2">
                {invitedUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-third_bg_color_dark p-2 rounded-md mb-2"
                  >
                    <span className="text-main_text_color_dark">{user}</span>
                    <button
                      className="text-red-500"
                      onClick={() => handleRemoveInvitedUser(index)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <button
              className="w-full px-4 py-2 bg-main_bg_color_dark text-main_text_color_dark rounded-md"
              onClick={handleCreateTeam}
            >
              Create Team
            </button>
          </div>
        </div>
      )}
      {isModalEditOpen && (
        <EditTeamModal
          teamName={myTeams[selectedTeamIndex]?.teamName || ""}
          members={myTeams[selectedTeamIndex]?.members || []}
          handleUpdateTeam={handleUpdateTeam}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}

export default ProfileTeams;
