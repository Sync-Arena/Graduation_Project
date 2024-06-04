import React from "react";
import CalenderHeatMap from "./CalenderHeatMap";
import RatingProgress from "./RatingProgress";

const ProfileOverview = () => {
  return (
    <div className="my-6">
      <div className="bg-second_bg_color_dark rounded-md p-8">
        <h2 className="font-semibold text-lg mb-8 text-center text-fourth_font_color_dark">
          Rating Progress Over Time
        </h2>
        <RatingProgress />
      </div>
      <div className="mt-6 bg-second_bg_color_dark rounded-md p-8">
        <h2 className="font-semibold text-lg mb-8 text-center text-fourth_font_color_dark">
          Rating Progress Over Time
        </h2>
        <CalenderHeatMap />
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            100 Problems
          </p>
          <p className="text-sm text-fifth_font_color_dark">
            solved for all time
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            50 Problems
          </p>
          <p className="text-sm text-fifth_font_color_dark">
            solved for the last year
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            25 Problems
          </p>
          <p className="text-sm text-fifth_font_color_dark">
            solved for the last month
          </p>
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            20 Days
          </p>
          <p className="text-sm text-fifth_font_color_dark">in a row max</p>
        </div>
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            1 Day
          </p>
          <p className="text-sm text-fifth_font_color_dark">
            in a row for the last year
          </p>
        </div>
        <div className="flex flex-col items-center rounded-md py-8 bg-second_bg_color_dark max-w-[280px] w-[280px]">
          <p className="font-semibold text-lg text-fourth_font_color_dark">
            0 Days
          </p>
          <p className="text-sm text-fifth_font_color_dark">
            in a row for the last month
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
