import React from "react";
import More from "../Other/More";
import AvatarGroup from "../Avatar/AvatarGroup";
import { TbMedal } from "react-icons/tb";

function ContestTop3() {
  const top3 = [
    {
      name: "K % H <3",
      score: 50,
    },
    {
      name: "K % H <3",
      score: 50,
    },
    {
      name: "K % H <3",
      score: 50,
    },
  ];

  return (
    <div>
      <div className="pt-8 pb-[6px] pl-8 relative 
        before:absolute before:content-[''] before:w-8 before:h-full before:border-t-[3px] before:border-l-[3px] before:border-b-[3px] before:border-[#FFA116] before:top-3 before:left-0 
        after:absolute after:mt-[15.5px] after:content-[''] after:w-full after:border-b-[3px] after:border-[#FFA116] after:left-0">
        <div className="absolute top-0 left-[40px] mb-3 text-lg text-main_font_color_dark">
          <span className="inline-block font-semibold">Top </span>
          <TbMedal className="inline-block mr-1 text-[24px]" />
        </div>

        <table className="w-full text-left text-main_font_color_dark">
          <colgroup>
            <col style={{ width: "2%" }} />
            <col style={{ width: "96%" }} />
            <col style={{ width: "2%" }} />
          </colgroup>
          <thead className="text-second_font_color_dark">
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-normal">
                Rank
              </th>
              <th scope="col" className="px-6 py-3 text-left font-normal">
                Who
              </th>
              <th scope="col" className="px-6 py-3 text-left font-normal">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {top3.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-second_bg_color_dark" : ""
                }`}
              >
                <td className="px-6 py-2.5 text-center">{index + 1}</td>
                <td className="px-6 py-2.5">
                  <div className="flex items-center">
                    <AvatarGroup top3={top3} />
                    <span className="block ml-4 ">{user.name}</span>
                  </div>
                </td>
                <td className="px-6 py-2.5 text-center">{user.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <More />
      </div>
    </div>
  );
}

export default ContestTop3;
