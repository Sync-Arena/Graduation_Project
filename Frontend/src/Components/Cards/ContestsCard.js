import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBullhorn,
  faAngleRight,
  faTimes,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
import { FaArrowRightLong } from "react-icons/fa6";

function ContestsCard() {
  const [isRegisteredRunning, setIsRegisteredRunning] = useState(false);
  const [isRegisteredBefore, setIsRegisteredBefore] = useState(false);
  const [isRunning1, setIsRunning1] = useState(false);
  const [isRunning2, setIsRunning2] = useState(false);
  const [timeRunning, setTimeRunning] = useState(7200);
  const [timeBefore1, setTimeBefore1] = useState(5); // Changed initial value for demonstration
  const [timeBefore2, setTimeBefore2] = useState(5400);

  const navigate = useNavigate();

  const handleRegisterClickRunning = () => {
    setIsRegisteredRunning(true);
  };

  const handleCancelClickRunning = () => {
    setIsRegisteredRunning(false);
  };

  const handleRegisterClickBefore = () => {
    setIsRegisteredBefore(true);
  };

  const handleCancelClickBefore = () => {
    setIsRegisteredBefore(false);
  };

  const handleEnterClick = () => {
    navigate("/contests/66619eae2d21573750c49a1e");
  };

  useEffect(() => {
    const intervalBefore = setInterval(() => {
      setTimeBefore1((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsRunning1(true);
          clearInterval(intervalBefore);
          return 0;
        }
      });

      setTimeBefore2((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          setIsRunning2(true);
          clearInterval(intervalBefore);
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(intervalBefore);
  }, []);

  useEffect(() => {
    let interval1;
    let interval2;

    const runTimer1 = () => {
      interval1 = setInterval(() => {
        setTimeRunning((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    };

    const runTimer2 = () => {
      interval2 = setInterval(() => {
        setTimeRunning((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    };

    if (isRunning1) {
      runTimer1();
    } else {
      clearInterval(interval1);
    }

    if (isRunning2) {
      runTimer2();
    } else {
      clearInterval(interval2);
    }

    return () => {
      clearInterval(interval1);
      clearInterval(interval2);
    };
  }, [isRunning1, isRunning2]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    return `${String(hours).padStart(2, "0")} : ${String(minutes).padStart(
      2,
      "0"
    )} : ${String(seconds).padStart(2, "0")}`;
  };

  return (
    <div className="bg-second_bg_color_dark p-5 rounded-2xl mb-6 border-2 border-main_border_color_dark">
      <div className="flex items-center mb-5">
        <div className="text-main_font_color_dark mr-2 text-xl">Contests</div>
        <FontAwesomeIcon
          icon={faBullhorn}
          className="text-yellow_font_color text-2xl"
        />
      </div>

      {/* Running Contest Card */}
      {isRunning1 && (
        <div className="flex flex-col justify-center text-main_font_color_dark items-center mb-8 pb-8 border-b-2 border-main_border_color_dark">
          <div className="mb-3 text-sm text-second_font_color_dark font-bold">
            Running
          </div>
          <div className="mb-3 text-lg text-yellow_font_color font-bold">
            {formatTime(timeRunning)}
          </div>
          <div className="text-center mb-5 text-sm">
            The 2023 ICPC Asia Jakarta Regional Mirror Contest stream by
            jonathanirvings, wiwitrifai, and Luqman
          </div>
          <button
            onClick={handleEnterClick}
            className="bg-blue-100 font-semibold px-8 py-2 flex items-center gap-x-2 rounded-md text-sm text-blue-500"
          >
            Enter&nbsp;
            <FaArrowRightLong />
          </button>
        </div>
      )}

      {/* Before Contest Card */}
      {!isRunning1 && (
        <div className="flex flex-col justify-center text-main_font_color_dark items-center mb-8 pb-8 border-b-2 border-main_border_color_dark">
          <div className="mb-3 text-sm text-second_font_color_dark font-bold">
            Before Contest
          </div>
          <div className="mb-3 text-lg text-yellow_font_color font-bold">
            {formatTime(timeBefore1)}
          </div>
          <div className="text-center mb-5 text-sm">
            The 2023 ICPC Asia Jakarta Regional Mirror Contest stream by
            jonathanirvings, wiwitrifai, and Luqman
          </div>
          {isRegisteredRunning ? (
            <button
              onClick={handleCancelClickRunning}
              className="bg-[#FDD7D7] text-[#F63737] font-semibold px-4 py-2 rounded-md text-sm flex items-center"
            >
              Cancel Registration&nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faTimes}
                className="text-[#F63737] text-lg"
              />
            </button>
          ) : (
            <button
              onClick={handleRegisterClickRunning}
              className="bg-[#F63737] font-semibold px-4 py-2 rounded-md text-sm text-white"
            >
              Register Now&nbsp;
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          )}
        </div>
      )}

      {/* View All Button */}
      <div className="flex flex-col justify-center text-main_font_color_dark items-center">
        {/* Before Contest Card */}
        <div className="flex flex-col justify-center text-main_font_color_dark items-center mb-8 pb-8 border-b-0 border-main_border_color_dark">
          <div className="mb-3 text-sm text-second_font_color_dark font-bold">
            Before Contest
          </div>
          <div className="mb-3 text-lg text-yellow_font_color font-bold">
            {formatTime(timeBefore2)}
          </div>
          <div className="text-center mb-5 text-sm">
            The 2023 ICPC Asia Jakarta Regional Mirror Contest stream by
            jonathanirvings, wiwitrifai, and Luqman
          </div>
          {isRegisteredBefore ? (
            <button
              onClick={handleCancelClickBefore}
              className="bg-[#FDD7D7] text-[#F63737] font-semibold px-4 py-2 rounded-md text-sm flex items-center"
            >
              Cancel Registration&nbsp;&nbsp;
              <FontAwesomeIcon
                icon={faTimes}
                className="text-[#F63737] text-lg"
              />
            </button>
          ) : (
            <button
              onClick={handleRegisterClickBefore}
              className="bg-[#F63737] font-semibold px-4 py-2 rounded-md text-sm text-white"
            >
              Register Now&nbsp;
              <FontAwesomeIcon icon={faAngleRight} />
            </button>
          )}
        </div>
        <button className="inline-block rounded-md text-blue_font_color mt-3 ml-auto">
          View All
          <FontAwesomeIcon icon={faArrowRight} className="pl-3" />
        </button>
      </div>
    </div>
  );
}

export default ContestsCard;
