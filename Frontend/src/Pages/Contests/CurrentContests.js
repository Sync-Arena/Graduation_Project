import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { GrCircleQuestion } from "react-icons/gr";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthContext from "../../Context/AuthProvider";
import { faXmark, faCheck } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

function CurrentContests(props) {
  const { auth } = useContext(AuthContext);
  const currentContestsArray = props.currentContestsArray;

  return (
    <div className="current-contests text-main_font_color_dark mt-6 p-8 pr-3 bg-second_bg_color_dark w-full rounded-2xl border-2 border-main_border_color_dark">
      <div>
        <p className="text-xl font-semibold mb-4">Current Contests</p>
      </div>
      <table className="w-full text-center rtl:text-right text-second_font_color_dark">
        <colgroup>
          <col style={{ width: "20%" }} />
          <col style={{ width: "8%" }} />
          <col style={{ width: "12%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "13%" }} />
          <col style={{ width: "14%" }} />
          <col style={{ width: "20%" }} />
        </colgroup>
        <thead className="text-third_font_color_dark">
          <tr>
            <th scope="col" className="py-4 text-left font-semibold">Contest</th>
            <th scope="col" className="py-4 font-semibold">Problems</th>
            <th scope="col" className="py-4 font-semibold">Length</th>
            <th scope="col" className="py-4 font-semibold">Before End</th>
            <th scope="col" className="py-4 font-semibold">Registered</th>
            <th scope="col" className="py-4 font-semibold">Ranking</th>
            <th scope="col" className="py-4 font-semibold text-lg">
              {<GrCircleQuestion className="mx-auto" />}
            </th>
          </tr>
        </thead>
        <tbody>
          {currentContestsArray.length ? (
            currentContestsArray.map((contest, index) => (
              <tr key={index}>
                <td className="py-4 text-left">
                  <div className="flex flex-col">
                    <p className="mb-0.5 font-semibold hover:text-blue-500">
                      <NavLink to={contest.id}>{contest.contestName}</NavLink>
                    </p>
                    <p className="text-fourth_font_color_dark text-sm font-semibold">
                      {contest.startTime}
                    </p>
                  </div>
                </td>
                <td className="py-4">{contest.problems.length}</td>
                <td className="py-4">
                {moment
                  .utc()
                  .startOf("day")
                  .add(contest.durationInMinutes, "minutes")
                  .format("HH:mm:ss")}
                </td>
                <td className="py-4">
                  {moment.utc(moment(contest.startTime).add(contest.durationInMinutes, 'minutes').diff(moment())).format('HH:mm:ss')}
                </td>
                <td className="py-4">
                  {contest.participatedUsers.includes(auth.userData.data.id) ? (
                    <FontAwesomeIcon icon={faCheck} className="text-[#00FF00] text-xl" />
                  ) : (
                    <FontAwesomeIcon icon={faXmark} className="text-[#FF0000] text-xl" />
                  )}
                </td>
                <td className="py-4">
                  {`${contest.madeAnySumit ? contest.rank : ""} ${
                    contest.totalContestants !== undefined ? `- / ${contest.totalContestants}` : "---"
                  }`}
                </td>
                <td className="py-4">
                  <button className="bg-blue-100 text-[#007AFF] font-semibold mx-auto px-4 py-1.5 rounded-md text-sm flex justify-center items-center">
                    <NavLink to={`${contest.id}/standing`}>Standing</NavLink>
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-2xl">NO RUNNING CONTESTS</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default CurrentContests;
