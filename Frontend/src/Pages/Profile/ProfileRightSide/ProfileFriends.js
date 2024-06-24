import React, { useState, useEffect } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { RiUserFollowFill, RiUserAddFill } from "react-icons/ri";
import { FaUserFriends } from "react-icons/fa";
import Loading from "../../Loading/Loading"; // Assuming correct path to your Loading component

function ProfileFriends() {
  const [loading, setLoading] = useState(true)
  const generateRandomFriends = () => {
    const names = [
      "Alice",
      "Bob",
      "Charlie",
      "David",
      "Eve",
      "Frate",
      "Grace",
      "Hannah",
      "Isaac",
      "Jack",
      "Katie",
      "Liam",
      "Mona",
      "Nathan",
      "Olivia",
      "Paul",
      "Quinn",
      "Rachel",
      "Steve",
      "Tina",
    ];

    return names.map((name) => {
      const rate = Math.floor(Math.random() * 4001); // Random rate between 0 and 4000
      const maxRate = Math.max(rate, Math.floor(Math.random() * 4001)); // Ensure maxRate >= rate
      return {
        name: name,
        rate: rate,
        maxRate: maxRate,
        isFriend: 1,
      };
    });
  };


  const allFriends = [
    {
      name: "mod", 
      rate: 1950, 
      maxRate: 1950,
      isFriend: 1,
    }, 
    {
      name: "Khaled", 
      rate: 1666, 
      maxRate: 1680,
      isFriend: 1,
    }, 
    {
      name: "Kaldish", 
      rate: 966, 
      maxRate: 1150,
      isFriend: 1,
    }, 
    {
      name: "hamdy", 
      rate: 1304, 
      maxRate: 1399,
      isFriend: 1,
    }, 
    {
      name: "abosalem", 
      rate: 847, 
      maxRate: 1000,
      isFriend: 1,
    }, 
  ];


  const pageSize = 30;
  const totalFriends = allFriends.length;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalFriends / pageSize);
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
    if (rate >= 2600 && rate <= 2999) return "text-rating_international_grandmaster";
    if (rate >= 3000 && rate <= 4000) return "text-rating_legendary_grandmaster";
    return "";
  };

  const currentFriends = allFriends.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  useEffect(() => {
    console.log("das")
    setTimeout(() => { setLoading(false) }, 2500)
  }, [loading])

  return (
    <div className="overflow-x-auto mt-6 flex">
      <div className="w-full bg-second_bg_color_dark rounded-md px-8 py-8 text-second_font_color_dark">
        <div className="flex gap-3 items-center mb-8 border-b-2 border-main_border_color_dark pb-8 mx-4">
          <h2 className="font-semibold text-lg">My Friends</h2>
        </div>
        {
          loading ?
            <div className="mt-32 flex justify-center"><Loading /></div>
            :
            <div>
              <table className="w-full">
                <colgroup>
                  <col style={{ width: "10%" }} />
                  <col style={{ width: "30%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "25%" }} />
                  <col style={{ width: "10%" }} />
                </colgroup>
                <thead className="text-third_font_color_dark">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left">
                      #
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Who
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Current Rate
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Max Rate
                    </th>
                    <th scope="col" className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {currentFriends.map((friend, index) => (
                    <tr
                      key={index}
                      className={` text-base font-semibold hover:shadow-custom rounded-md`}
                      style={{ cursor: "pointer" }}
                    >
                      <td className="px-6 py-4 text-left text-third_font_color_dark">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${getrateColorClass(
                          friend.rate
                        )}`}
                      >
                        {friend.name}
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${getrateColorClass(
                          friend.rate
                        )}`}
                      >
                        {friend.rate}
                      </td>
                      <td
                        className={`px-6 py-4 text-center ${getrateColorClass(
                          friend.maxRate
                        )}`}
                      >
                        {friend.maxRate}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div
                          className="text-second_font_color_dark flex justify-center cursor-pointer"
                          onClick={() => {
                            friend.isFriend = 1 - friend.isFriend;
                            setCurrentPage(currentPage);
                          }}
                        >
                          {friend.isFriend ? <RiUserFollowFill /> : <RiUserAddFill />}
                        </div>
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
                      className={`rounded-full mx-1 text-main_font_color_dark ${currentPage === page ? "bg-main_heighlight_color_dark" : ""
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
    </div>
  );
}

export default ProfileFriends;
