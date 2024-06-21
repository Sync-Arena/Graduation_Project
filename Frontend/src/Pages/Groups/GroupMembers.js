import React, { useState } from "react";
import moment from "moment";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function GroupMembers() {
  const groupMembersArray = [
    {
      id: 1,
      member: "0xEssam",
      membershipType: "Manager",
      confirmation: "Accepted",
      memberSince: "2023-10-17 19:22",
      invitedOn: "2023-10-17 19:10",
      invitedBy: "M-Sa3dy",
      memberRate: 2500,
      inviterRate: 2100,
    },
    {
      id: 2,
      member: "24ahmedsherif",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-10-17 19:43",
      invitedOn: "2023-10-17 19:43",
      invitedBy: "No confirmation required",
      memberRate: 1800,
      inviterRate: 0,
    },
    {
      id: 3,
      member: "44AHmEd94",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-10-19 10:49",
      invitedOn: "2023-10-19 10:19",
      invitedBy: "Abdelrahman_Eltohamy",
      memberRate: 1600,
      inviterRate: 2200,
    },
    {
      id: 4,
      member: "A7medAboBakr",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2024-03-16 15:27",
      invitedOn: "2024-03-16 08:31",
      invitedBy: "Tesla.",
      memberRate: 1400,
      inviterRate: 2400,
    },
    {
      id: 5,
      member: "Abanoub_Adel",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2024-03-16 00:28",
      invitedOn: "2024-03-16 00:09",
      invitedBy: "Tesla.",
      memberRate: 2000,
      inviterRate: 2400,
    },
    {
      id: 6,
      member: "Abdelhady17",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-10-31 20:45",
      invitedOn: "2023-10-31 18:39",
      invitedBy: "Striker009",
      memberRate: 1200,
      inviterRate: 1900,
    },
    {
      id: 7,
      member: "Abdelrahman_Eltohamy",
      membershipType: "Manager",
      confirmation: "Accepted",
      memberSince: "2023-10-17 20:06",
      invitedOn: "2023-10-17 20:03",
      invitedBy: "Striker009",
      memberRate: 2200,
      inviterRate: 1900,
    },
    {
      id: 8,
      member: "AbdelrahmanAtef_01",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-10-31 09:22",
      invitedOn: "2023-10-31 08:50",
      invitedBy: "Abdelrahman_Eltohamy",
      memberRate: 1700,
      inviterRate: 2200,
    },
    {
      id: 9,
      member: "abdelrhmanosama814",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2024-03-16 05:34",
      invitedOn: "2024-03-16 05:18",
      invitedBy: "Tesla.",
      memberRate: 1900,
      inviterRate: 2400,
    },
    {
      id: 10,
      member: "abdelwahab_hanz",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-11-02 15:07",
      invitedOn: "2023-11-02 15:01",
      invitedBy: "0xEssam",
      memberRate: 1300,
      inviterRate: 2500,
    },
    {
      id: 11,
      member: "abdo_hema",
      membershipType: "Participant",
      confirmation: "Accepted",
      memberSince: "2023-10-31 20:24",
      invitedOn: "2023-10-17 20:20",
      invitedBy: "M-Sa3dy",
      memberRate: 1500,
      inviterRate: 2500,
    },
  ];

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
    if (rate >= 3000 && rate <= 4000)
      return "text-rating_legendary_grandmaster";
    return "";
  };

  const getConfirmationClass = (confirmation) => {
    if (confirmation === "Accepted") return "text-green-500";
  };


  // State to store membership type for each member
  const [membershipTypes, setMembershipTypes] = useState(
    groupMembersArray.reduce((acc, member) => {
      acc[member.id] = member.membershipType;
      return acc;
    }, {})
  );

  const handleMembershipTypeChange = (id, newMembershipType) => {
    setMembershipTypes((prevMembershipTypes) => ({
      ...prevMembershipTypes,
      [id]: newMembershipType,
    }));
  };

  const pageSize = 20;
  const [currentPage, setCurrentPage] = useState(1);

  const totalMembers = groupMembersArray.length;

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const totalPages = Math.ceil(totalMembers / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

  return (
    <div className="past-contests flex">
      <div className="contests px-4 py-8 bg-second_bg_color_dark w-full rounded-md text-second_font_color_dark">
        <div className="mx-8">
          <p className="text-xl font-semibold mb-4 pb-8 border-b-2 border-main_border_color_dark ">
            Group Members
          </p>
        </div>
        <table className="w-full text-center rtl:text-right text-main_font_color_dark">
          <colgroup>
            <col style={{ width: "20%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "15%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead className="text-third_font_color_dark">
            <tr>
              <th scope="col" className="py-4 text-left font-semibold  px-10">
                Member
              </th>
              <th scope="col" className="py-4 font-semibold">
                Membership type
              </th>
              <th scope="col" className="py-4 font-semibold">
                Confirmation
              </th>
              <th scope="col" className="py-4 font-semibold">
                Member since
              </th>
              <th scope="col" className="py-4 font-semibold">
                Invited on
              </th>
              <th scope="col" className="py-4 font-semibold">
                Invited by
              </th>
            </tr>
          </thead>
          <tbody>
            {groupMembersArray.slice(startIndex, endIndex).map((member, index) => (
              <tr key={index} className="cursor-pointer hover:shadow-custom">
                <td className={`px-10 py-6 text-left ${getRateColorClass(member.memberRate)}`}>
                  {member.member}
                </td>
                <td className="py-4">
                  <select
                    id={`membershipType-${member.id}`}
                    className="px-4 py-1 bg-second_bg_color_dark border-2 border-main_border_color_dark rounded-md focus:outline-none"
                    value={membershipTypes[member.id]}
                    onChange={(e) => handleMembershipTypeChange(member.id, e.target.value)}
                  >
                    <option value="Participant">Participant</option>
                    <option value="Manager">Manager</option>
                  </select>
                </td>
                <td className={`py-4 ${getConfirmationClass(member.confirmation)}`}>
                  {member.confirmation}
                </td>
                <td className="py-4 text-fourth_font_color_dark">
                  {moment(member.memberSince).format("MMM/D/YYYY HH:mm")}
                </td>
                <td className="py-4 text-fourth_font_color_dark">
                  {moment(member.invitedOn).format("MMM/D/YYYY HH:mm")}
                </td>
                <td className={`py-4 ${getRateColorClass(member.inviterRate)}`}>
                  {member.invitedBy}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {totalMembers > 20 && (
          <div className="flex justify-end mt-6 items-center mr-8">
            <FaAngleLeft
              className="text-main_font_color_dark cursor-pointer mr-2"
              onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
            />
            {visiblePages.map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`rounded-full mx-1 text-main_font_color_dark ${currentPage === page ? "bg-main_heighlight_color_dark " : ""} ${String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"} cursor-pointer`}
              >
                {page}
              </button>
            ))}
            <FaAngleRight
              className="text-main_font_color_dark cursor-pointer ml-2"
              onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GroupMembers;