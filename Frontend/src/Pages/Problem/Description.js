import React, { useEffect, useRef, useState } from "react";
import { FaTags } from "react-icons/fa";

const Description = () => {
  const problem = {
    id: "A",
    name: "Following the String",
    description:
      "Polycarp lost the string s\
        of length n\
        consisting of lowercase Latin letters, but he still has its trace.\
       The trace of the string s\
        is an array a\
        of n\
        integers, where ai\
        is the number of such indices j\
        (j<i\
       ) that si=sj\
       . For example, the trace of the string abracadabra is the array [0,0,0,1,0,2,0,3,1,1,4\
       ].\
       Given a trace of a string, find any string s\
        from which it could have been obtained. The string s\
        should consist only of lowercase Latin letters a-z.",
    input:
      "The first line of the input contains a single integer t\
        (1≤t≤104\
       ) — the number of test cases. Then the descriptions of the test cases follow.\
       The first line of each test case contains a single integer n\
        (1≤n≤2⋅105\
       ) — the length of the lost string.\
       The second line of each test case contains n\
        integers a1,a2,…,an\
        (0≤ai<n\
       ) — the trace of the string. It is guaranteed that for the given trace, there exists a suitable string s\
       .\
       It is guaranteed that the sum of n\
        over all test cases does not exceed 2⋅105\
       .",
    output: "For each k\
    from 1\
    to max(a1,a2,…,an)\
   , output the minimum number of seconds it takes to kill all the monsters.",
    testCasesExplanation: "",
    timeLimit: 1,
    memoryLimit: 256,
    testCases: [],
    tags: ["dp", "greedy", "binary search", 1800],
    accepted: "67.2K",
    submissions: "117.4K",
    accetanceRate: "57.3",
  };

  const [tagsVisible, setTagsVisible] = useState(false);
  const tagsRef = useRef(null);

  const toggleVisibility = () => {
    setTagsVisible(!tagsVisible);
  };

  useEffect(() => {
    if (tagsVisible) {
      tagsRef.current.style.maxHeight = `${tagsRef.current.scrollHeight}px`;
    } else {
      tagsRef.current.style.maxHeight = "0";
    }
  }, [tagsVisible]);

  return (
    <div className="p-10">
      <div className="info flex flex-col items-center">
        <div className="flex text-xl font-semibold">
          <h1>{problem.id}</h1>
          <h1>.</h1>
          <h1 className="ml-2 mb-2">{problem.name}</h1>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-s">
            time limit per test: {problem.timeLimit} seconds
          </p>
          <p className="text-s">
            memory limit per test: {problem.memoryLimit} megabytes
          </p>
        </div>
      </div>

      <div className="description">
        <p className="mt-8">{problem.description}</p>
      </div>

      <div className="input">
        <h2 className="text-lg font-semibold mt-4">Input</h2>
        <p className="mt-4">{problem.input}</p>
      </div>

      <div className="output">
        <h2 className="text-lg font-semibold mt-4">Output</h2>
        <p className="mt-4">{problem.output}</p>
      </div>

      {problem.testCasesExplanation !== "" && (
        <div className="explanation">
          <h2 className="text-lg font-semibold mt-4">TestCases Explanation</h2>
          <p className="mt-4">{problem.testCasesExplanation}</p>
        </div>
      )}

      <div className="border-y-2 mt-8 p-4 border-third_font_color_dark">
        <div
          className="w-full flex justify-between cursor-pointer"
          onClick={toggleVisibility}
        >
          <div className="flex gap-2 text-white font-semibold cursor-pointer w-full items-center">
            <FaTags />
            <p>Tags</p>
          </div>
          <div className="text-third_font_color_dark">
            <svg
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${
                tagsVisible ? "transform rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </div>
        </div>

        <div
          ref={tagsRef}
          className="overflow-hidden transition-all duration-500 ease-in-out max-h-0"
        >
          <div className="flex flex-wrap gap-2 mt-4">
            {problem.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between bg-gray-800 px-8 py-2 rounded text-white mt-4">
        <div className="text-center">
          <span className="block text-xl font-bold">{problem.accepted}</span>
          <span className="block text-sm">Accepted</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold">{problem.submissions}</span>
          <span className="block text-sm">Submissions</span>
        </div>
        <div className="text-center">
          <span className="block text-xl font-bold">
            {problem.accetanceRate}%
          </span>
          <span className="block text-sm">Acceptance Rate</span>
        </div>
      </div>
    </div>
  );
};

export default Description;
