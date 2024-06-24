import React, { useState } from "react";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"; // Importing the icons

const data = [
  {
    username: "mod",
    rating: 1957,
    contests: 89,
    country: "eg", // Egypt
  },
  {
    username: "hawara",
    rating: 1764,
    contests: 132,
    country: "eg", // Belarus
  },
  {
    username: "Khaled",
    rating: 1666,
    contests: 98,
    country: "eg", // USA
  },
  {
    username: "hamdy",
    rating: 1306,
    contests: 74,
    country: "eg", // China
  },
  {
    username: "kaldish",
    rating: 966,
    contests: 10,
    country: "eg", // China
  },
  { username: "abosalem", rating: 847, contests: 23, country: "eg" }, // Japan
];

const FriendsRating = () => {

    const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const totalPages = Math.ceil(data.length / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
  const visiblePages = Array.from(
    { length: Math.min(5, totalPages - visiblePagesOffset) },
    (_, index) => index + 1 + visiblePagesOffset
  );

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
    <div>
      <table className="w-full text-left rtl:text-right text-main_font_color_dark">
        <colgroup>
          <col style={{ width: "10%" }} />
          <col style={{ width: "40%" }} />
          <col style={{ width: "20%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead className="text-third_font_color_dark">
          <tr>
            <th scope="col" className="px-6 py-3 text-center">
              Rank
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Contests
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Rating
            </th>
          </tr>
        </thead>
        <tbody>
          {data.slice(startIndex, endIndex).map((user, index) => (
            <tr
              key={index}
              className={`text-base font-semibold hover:shadow-custom rounded-md cursor-pointer`}
            >
              <td className="px-6 py-4 text-fourth_font_color_dark text-center">
                {startIndex + index + 1}
              </td>
              <td className="px-6 py-4 flex items-center gap-4">
                <img
                  src={`https://flagcdn.com/w20/${user.country}.png`} // Flag URL
                  alt={user.country}
                  width="25"
                  height="25"
                />
                <p className={`${getrateColorClass(user.rating)}`}>
                  {user.username}
                </p>
              </td>
              <td className="px-6 py-4 text-center text-fourth_font_color_dark ">
                {user.contests}
              </td>
              <td
                className={`px-6 py-4 text-center ${getrateColorClass(
                  user.rating
                )}`}
              >
                {user.rating}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {data.length > pageSize && (
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
                currentPage === page ? "bg-main_heighlight_color_dark " : ""
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
  );
};

export default FriendsRating;
