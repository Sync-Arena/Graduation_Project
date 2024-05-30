import React, { useState, useMemo } from "react";
import { FaCode, FaPlus } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { GrCheckmark } from "react-icons/gr";

const testCasesData = [
  { input: "5 2 7", output: "10 6 4 3 2 2 1" },
  { input: "7 7 7 7", output: "7 4 3 2 2 2 1" },
  { input: "1 9 7 6 2 4 7 8 1 3", output: "17 9 5 4 3 3 3 2 1" },
];

const TestCases = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [copied, setCopied] = useState(
    testCasesData.map(() => ({ input: false, output: false }))
  );

  const handleCopyClick = (text, index, type) => {
    navigator.clipboard.writeText(text);
    setCopied((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [type]: true } : item))
    );

    setTimeout(() => {
      setCopied((prev) =>
        prev.map((item, i) => (i === index ? { ...item, [type]: false } : item))
      );
    }, 2000);
  };

  const tabs = useMemo(
    () =>
      testCasesData.map((testCase, index) => (
        <div
          key={index}
          className={`cursor-pointer px-4 py-1 rounded-lg ${
            activeTab === index ? "bg-gray-700 text-white" : ""
          } transition-colors ${
            index < testCasesData.length - 1 ? "mr-2" : ""
          }`}
          onClick={() => setActiveTab(index)}
        >
          Case {index + 1}
        </div>
      )),
    [activeTab]
  );

  const activeContent = useMemo(() => {
    const testCase = testCasesData[activeTab];
    return (
      <div className="flex flex-col gap-4 h-full">
        <div className="border-2 border-gray-600 rounded-md">
          <div className="border-b-2 border-gray-600 flex justify-between">
            <h3 className="text-lg font-semibold px-4 py-2">Input</h3>
            <div className="flex items-center gap-3 pr-4">
              {copied[activeTab].input ? (
                <GrCheckmark className="text-[#00ff00] cursor-pointer" />
              ) : (
                <LuCopy
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(testCase.input, activeTab, "input")
                  }
                />
              )}
            </div>
          </div>
          <div className="py-2 px-4">
            <p>{testCase.input}</p>
          </div>
        </div>
        <div className="border-2 border-gray-600 rounded-md">
          <div className="border-b-2 border-gray-600 flex justify-between">
            <h3 className="text-lg font-semibold px-4 py-2">Output</h3>
            <div className="flex items-center gap-3 pr-4">
              {copied[activeTab].output ? (
                <GrCheckmark className="text-[#00ff00] cursor-pointer" />
              ) : (
                <LuCopy
                  className="cursor-pointer"
                  onClick={() =>
                    handleCopyClick(testCase.output, activeTab, "output")
                  }
                />
              )}
            </div>
          </div>
          <div className="py-2 px-4">
            <p>{testCase.output}</p>
          </div>
        </div>
      </div>
    );
  }, [activeTab, copied]);

  return (
    <div className="bg-second_bg_color_dark flex-1 mt-2 rounded-lg border-2 border-main_border_color_dark text-white overflow-auto">
      <div className="p-2 gap-2 flex items-center bg-third_bg_color_dark text-medium font-semibold">
        <FaCode className="text-[#00ff00]" />
        <p>TestCases</p>
      </div>
      <div className="p-4">
        <div className="flex items-center border-gray-700">
          {tabs}
          <FaPlus
            className="cursor-pointer text-lg ml-4"
            onClick={() =>
              alert("Add new case functionality not implemented yet")
            }
          />
        </div>
        <div className="mt-8">{activeContent}</div>
      </div>
    </div>
  );
};

export default TestCases;
