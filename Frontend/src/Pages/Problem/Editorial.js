import React, { useState } from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

const Editorial = () => {
  const [isHintOpen, setIsHintOpen] = useState(false);
  const [isSolutionOpen, setIsSolutionOpen] = useState(false);

  const toggleHint = () => setIsHintOpen(!isHintOpen);
  const toggleSolution = () => setIsSolutionOpen(!isSolutionOpen);

  return (
    <div className="text-second_font_color_dark p-8 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">1917B - Tesla Vs Bahy</h2>
      <div className="mb-4 bg-third_bg_color_dark p-4 rounded-md">
        <div className="">
          <span className="font-semibold">Author</span>
          <a
            href="https://example.com/author"
            className="ml-[200px] text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            MOD Essam
          </a>
        </div>
        <div className="my-2">
          <span className="font-semibold">Editorial</span>
          <a
            href="https://example.com/editorial"
            className="ml-[190px] text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Kaldish
          </a>
        </div>
        <div className="">
          <span className="font-semibold">Solution</span>
          <a
            href="https://ideone.com/bHtDuK"
            className="ml-[190px] text-blue-600 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            659855412
          </a>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center cursor-pointer" onClick={toggleHint}>
          <div className="mr-1.5 text-lg">
            {isHintOpen ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <h3 className="font-semibold text-lg">Hint</h3>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isHintOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="mt-2 bg-third_bg_color_dark p-2 rounded-md">
            How is the absolute value of the integer changed, when we apply the
            given operation on that integer?
          </p>
        </div>
      </div>
      <div>
        <div
          className="flex items-center cursor-pointer"
          onClick={toggleSolution}
        >
          <div className="mr-1.5 text-lg">
            {isSolutionOpen ? <FaAngleDown /> : <FaAngleRight />}
          </div>
          <h3 className="font-semibold text-lg">Solution</h3>
        </div>
        <div
          className={`overflow-hidden transition-all duration-500 ${
            isSolutionOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="mt-2 bg-third_bg_color_dark p-2 rounded-md">
            First, let's find the minimum product we can get. If one of the
            numbers is or becomes 00, then the product will be 00...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Editorial;
