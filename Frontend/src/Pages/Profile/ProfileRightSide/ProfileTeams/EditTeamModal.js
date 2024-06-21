import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const EditTeamModal = ({ team, onUpdateTeam, onClose }) => {
  const [editedTeamName, setEditedTeamName] = useState(team.name);
  const [editedTeamMembers, setEditedTeamMembers] = useState([...team.members]);

  const handleTeamNameChange = (e) => {
    setEditedTeamName(e.target.value);
  };

  const handleUpdateTeam = () => {
    onUpdateTeam({ name: editedTeamName, members: editedTeamMembers });
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-second_bg_color_dark p-16 w-[600px] rounded-md text-second_font_color_dark relative">
        <FontAwesomeIcon
          icon={faXmark}
          className="text-lg cursor-pointer absolute top-8 right-8"
          onClick={onClose}
        />
        <h2 className="text-lg text-center font-semibold mb-8">Edit Team</h2>
        <input
          type="text"
          placeholder="Enter The New Team Name"
          value={team.name}
          className="text-third_font_color_dark w-full p-2 content-around bg-second_bg_color_dark rounded-md border-2 border-main_border_color_dark h-10"
        />
        <div className="flex justify-between gap-4 mt-8">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
          >
            Invite User
          </button>
        </div>

        <div className="flex justify-start gap-4 items-center mt-8">
          <button
            onClick={onClose}
            className="bg-blue-600 text-white px-4 py-2 rounded-md h-10"
          >
            Save Changes
          </button>
          <button
            onClick={onClose}
            className="bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 h-10 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditTeamModal;
