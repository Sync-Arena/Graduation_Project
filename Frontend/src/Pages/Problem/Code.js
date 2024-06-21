import React, { useState, useEffect } from "react";
import { FaCode } from "react-icons/fa";
import { GrPowerReset, GrCheckmark } from "react-icons/gr";
import { FiDownload } from "react-icons/fi";
import { PiBracketsCurly } from "react-icons/pi";
import { LuCopy } from "react-icons/lu";
import Editor, { loader } from "@monaco-editor/react";

// Compiler codes definition
const compilerCodes = {
  "cpp": 54,
  "python": 71,
  "java": 62
};

// Define custom light theme
const defineLightTheme = (monaco) => {
  monaco.editor.defineTheme("lightBackground", {
    base: "vs",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#FFFFFF",
    },
  });
};

const Code = ({ code, setCode, setCompiler }) => {
  const [copied, setCopied] = useState(false);
  const [selectedCompiler, setSelectedCompiler] = useState("cpp");

  useEffect(() => {
    loader.init().then((monaco) => {
      monaco.languages.register({ id: "cpp" });
      defineLightTheme(monaco);  // Use the custom light theme
    });
  }, []);

  useEffect(() => {
    setCompiler(compilerCodes[selectedCompiler]);
  }, [selectedCompiler]);

  const handleCopyClick = () => {
    navigator.clipboard.writeText(code); // Copy the actual code
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div className="bg-main_bg_color_dark h-[60%] text-second_font_color_dark rounded-lg border-2 border-main_border_color_dark">
      <div className="p-2 gap-2 flex items-center bg-third_bg_color_dark">
        <FaCode className="text-[#01B328]" />
        <p className="text-medium font-semibold">Code</p>
      </div>
      <div className="px-2 py-1.5 gap-2 flex items-center justify-between border-b-[1px] border-main_border_color_dark text-second_font_color_dark">
        <select
          className="bg-main_bg_color_dark cursor-pointer border-0 p-0 text-second_font_color_dark"
          style={{ outline: "none", border: "none" }}
          onChange={(e) => setSelectedCompiler(e.target.value)}
          value={selectedCompiler}
        >
          <option value="cpp">C++</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
        </select>

        <div className="flex items-center gap-3">
          {copied ? (
            <GrCheckmark className="text-[#00ff00] cursor-pointer" />
          ) : (
            <LuCopy className="cursor-pointer" onClick={handleCopyClick} />
          )}
          <FiDownload className="cursor-pointer" />
          <PiBracketsCurly className="cursor-pointer text-xl" />
          <GrPowerReset className="cursor-pointer" />
        </div>
      </div>
      <div className="h-[80%] py-2">
        <Editor
          onChange={(value) => setCode(value)}
          height="100%"
          language={selectedCompiler}
          theme="lightBackground"  // Apply the custom light theme
          value={code}
        />
      </div>
    </div>
  );
};

export default Code;
