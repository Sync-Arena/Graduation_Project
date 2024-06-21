import React, { useState, useMemo, useEffect, useContext } from "react";
import { FaCode, FaPlus } from "react-icons/fa6";
import { LuCopy } from "react-icons/lu";
import { GrCheckmark } from "react-icons/gr";
import { useParams } from "react-router-dom";
import AuthContext from "../../Context/AuthProvider";
import axios from "axios";

const TestCases = () => {
  const [activeTab, setActiveTab] = useState(0);
  const { problemId } = useParams();
  const [testCases, setTestCases] = useState(undefined);
  const [copied, setCopied] = useState(undefined);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` },
        };
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest/${problemId}`,
          config
        );

        response.data.tags.push(response.data.difficulty);
        setTestCases(response.data.testCases);
        setCopied(
          response.data.testCases.map(() => ({ input: false, answer: false }))
        );
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [problemId, auth]);

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
      testCases
        ? testCases.map((testCase, index) => (
            <div
              key={index}
              className={`cursor-pointer px-4 py-1 rounded-lg ${
                activeTab === index ? "bg-third_bg_color_dark text-second_font_color_dark" : ""
              } transition-colors ${index < testCases.length - 1 ? "mr-2" : ""}`}
              onClick={() => setActiveTab(index)}
            >
              Case {index + 1}
            </div>
          ))
        : null,
    [activeTab, testCases]
  );

  const activeContent = useMemo(() => {
    if (testCases && copied) {
      const testCase = testCases[activeTab];
      return (
        <div className="flex flex-col gap-4 h-full">
          <div className="border-2 border-main_border_color_dark rounded-md">
            <div className="border-b-2 border-main_border_color_dark flex justify-between">
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
              <pre>
                <code>{testCase.input}</code>
              </pre>
            </div>
          </div>
          <div className="border-2 border-main_border_color_dark rounded-md">
            <div className="border-b-2 border-main_border_color_dark flex justify-between">
              <h3 className="text-lg font-semibold px-4 py-2">Output</h3>
              <div className="flex items-center gap-3 pr-4">
                {copied[activeTab].answer ? (
                  <GrCheckmark className="text-[#00ff00] cursor-pointer" />
                ) : (
                  <LuCopy
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopyClick(testCase.answer, activeTab, "answer")
                    }
                  />
                )}
              </div>
            </div>
            <div className="py-2 px-4">
              <pre>
                <code>{testCase.answer}</code>
              </pre>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Loading...</div>;
    }
  }, [activeTab, copied, testCases]);

  return (
    <div className="bg-second_bg_color_dark flex-1 mt-2 rounded-lg border-2 border-main_border_color_dark text-second_font_color_dark overflow-auto">
      <div className="p-2 gap-2 flex items-center bg-third_bg_color_dark text-medium font-semibold">
        <FaCode className="text-[#01B328]" />
        <p>TestCases</p>
      </div>
      <div className="p-4">
        <div className="flex items-center border-main_border_color_dark">
          {tabs}
          <FaPlus
            className="cursor-pointer text-lg ml-4"
            onClick={() =>
              alert("Add new case functionality not implemented yet")
            }
          />
        </div>
        <div className="mt-8">{testCases ? activeContent : ""}</div>
      </div>
    </div>
  );
};

export default TestCases;
