import React, { useState, useEffect } from "react";
import CalenderHeatMap from "./CalenderHeatMap";
import RatingProgress from "./RatingProgress";
import Loading from "../../../Loading/Loading"; // Assuming correct path to your Loading component

const ProfileOverview = () => {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    console.log("das")
    setTimeout(() => { setLoading(false) }, 2000)
  }, [loading])
  return (
    <div className="my-6">
      {loading ?
        <div className="mt-32 flex justify-center"><Loading /></div>

        :
        <div>
          <div className="bg-second_bg_color_dark rounded-md p-8">
            <h2 className="font-semibold text-lg mb-8 text-center text-second_font_color_dark">
              Rating Progress Over Time
            </h2>
            <RatingProgress />
          </div>
          <div className="mt-6 bg-second_bg_color_dark rounded-md p-8">
            <h2 className="font-semibold text-lg mb-8 text-center text-second_font_color_dark">
              Last Year Activities
            </h2>
            <CalenderHeatMap />
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                20 Problems
              </p>
              <p className="text-sm text-fourth_font_color_dark">
                solved for all time
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                20 Problems
              </p>
              <p className="text-sm text-fourth_font_color_dark">
                solved for the last year
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                15 Problems
              </p>
              <p className="text-sm text-fourth_font_color_dark">
                solved for the last month
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                2 Days
              </p>
              <p className="text-sm text-fourth_font_color_dark">in a row max</p>
            </div>
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                2 Days
              </p>
              <p className="text-sm text-fourth_font_color_dark">
                in a row for the last year
              </p>
            </div>
            <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
              <p className="font-semibold text-lg text-third_font_color_dark">
                1 Day
              </p>
              <p className="text-sm text-fourth_font_color_dark">
                in a row for the last month
              </p>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default ProfileOverview;
