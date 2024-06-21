import React, { useState } from "react";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

function ProfileContests() {
  const contests = [
    {
      contest: "Educational Codeforces Round 156 (Rated for Div. 2)",
      startTime: "Oct/09/2023 17:35",
      rank: 2028,
      solved: 3,
      ratingChange: -2,
      newRating: 1637,
    },
    {
      contest: "Codeforces Round 902 (Div. 2, based on COMPFEST 15 - Final Round)",
      startTime: "Oct/08/2023 12:05",
      rank: 1099,
      solved: 4,
      ratingChange: 11,
      newRating: 1639,
    },
    {
      contest: "Codeforces Round 882 (Div. 2)",
      startTime: "Jul/06/2023 17:35",
      rank: 3473,
      solved: 3,
      ratingChange: -61,
      newRating: 1628,
    },
    {
      contest: "CodeTON Round 5 (Div. 1 + Div. 2, Rated, Prizes!)",
      startTime: "Jun/24/2023 17:05",
      rank: 1616,
      solved: 3,
      ratingChange: 29,
      newRating: 1689,
    },
    {
      contest: "Codeforces Round 855 (Div. 3)",
      startTime: "Mar/02/2023 17:35",
      rank: 336,
      solved: 7,
      ratingChange: 66,
      newRating: 1660,
    },
    {
      contest: "Codeforces Round 853 (Div. 2)",
      startTime: "Feb/25/2023 17:20",
      rank: 671,
      solved: 3,
      ratingChange: 93,
      newRating: 1594,
    },
    {
      contest: "Educational Codeforces Round 143 (Rated for Div. 2)",
      startTime: "Feb/16/2023 17:35",
      rank: 1467,
      solved: 4,
      ratingChange: 53,
      newRating: 1501,
    },
  ];

  const pageSize = 20;
  const totalContests = contests.length;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(totalContests / pageSize);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getRatingChangeColor = (change) => {
    if (change > 0) return "text-green-500";
    if (change < 0) return "text-red-500";
    return "text-fourth_font_color_dark";
  };

  const getNewRatingColor = (rating) => {
    if (rating >= 0 && rating <= 1199) return "text-rating_newbie";
    if (rating >= 1200 && rating <= 1399) return "text-rating_pupil";
    if (rating >= 1400 && rating <= 1599) return "text-rating_specialist";
    if (rating >= 1600 && rating <= 1899) return "text-rating_expert";
    if (rating >= 1900 && rating <= 2099) return "text-rating_candidate_master";
    if (rating >= 2100 && rating <= 2299) return "text-rating_master";
    if (rating >= 2300 && rating <= 2399) return "text-rating_international_master";
    if (rating >= 2400 && rating <= 2599) return "text-rating_grandmaster";
    if (rating >= 2600 && rating <= 2999) return "text-rating_international_grandmaster";
    if (rating >= 3000 && rating <= 4000) return "text-rating_legendary_grandmaster";
    return "";
  };

  const formatRatingChange = (change) => {
    if (change > 0) return `+${change}`;
    return `${change}`;
  };

  const currentContests = contests.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const getContestNumber = (index) => totalContests - ((currentPage - 1) * pageSize + index);

  return (
    <div className="overflow-x-auto mt-6 flex">
      <div className="w-full bg-second_bg_color_dark rounded-md px-8 py-8">
        <div className="flex gap-3 items-center text-second_font_color_dark mb-8 border-b-2 border-main_border_color_dark pb-8 mx-4">
          <h2 className="font-semibold text-lg">Contests History</h2>
        </div>
        <table className="w-full text-left">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "45%" }} />
            <col style={{ width: "20%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "5%" }} />
            <col style={{ width: "7%" }} />
            <col style={{ width: "8%" }} />
          </colgroup>
          <thead className="text-third_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3 text-left">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Contest
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Solved
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Rating Change
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                New Rating
              </th>
            </tr>
          </thead>
          <tbody>
            {currentContests.map((contest, index) => (
              <tr
                key={index}
                className={`text-base font-semibold hover:shadow-custom rounded-md`}
              >
                <td className="px-6 py-4 text-second_font_color_dark">
                  {getContestNumber(index)}
                </td>
                <td className="px-6 py-4 text-blue-500 hover:cursor-pointer hover:text-blue-700">
                  {contest.contest}
                </td>
                <td className="px-6 py-4 text-center text-fourth_font_color_dark">
                  {contest.startTime}
                </td>
                <td className="px-6 py-4 text-center text-fourth_font_color_dark">
                  {contest.rank}
                </td>
                <td className="px-6 py-4 text-center text-fourth_font_color_dark">
                  {contest.solved}
                </td>
                <td className={`px-6 py-4 text-center ${getRatingChangeColor(contest.ratingChange)}`}>
                  {formatRatingChange(contest.ratingChange)}
                </td>
                <td className={`px-6 py-4 text-center ${getNewRatingColor(contest.newRating)}`}>
                  {contest.newRating}
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
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(
              (page) => (
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
              )
            )}
            <FaAngleRight
              className="text-main_font_color_dark cursor-pointer ml-2"
              onClick={() =>
                handlePageChange(Math.min(currentPage + 1, totalPages))
              }
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfileContests;
