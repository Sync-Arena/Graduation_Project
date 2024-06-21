// Problem.js
import React, { useContext, useState } from "react";
import ProblemNavBar from "./ProblemNavBar";
import LeftSide from "./LeftSide";
import RightSide from "./RightSide";
import AuthContext from "../../Context/AuthProvider";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Modal from "./Modal";

const Problem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [code, setCode] = useState("");
  const [compiler, setCompiler] = useState(71);
  const { auth } = useContext(AuthContext);
  const { problemId } = useParams();
  const { state } = useLocation();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalStatus, setModalStatus] = useState("");

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmitCode = async () => {
    setModalOpen(true);
    setModalMessage("Pending...");
    setModalStatus("pending");
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.userData.token}` },
      };
      const requestBody = {
        compiler,
        code: encodeURIComponent(code),
        problemId,
        contestId: state && state.contestId ? state.contestId : "66619eae2d21573750c49a1e",
      };

      console.log("Request Body: ", requestBody);

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/submissions/submit`,
        requestBody,
        config
      );

      console.log("Response: ", response);

      const status = response.data.submission.wholeStatus.toLowerCase();
      setModalMessage(response.data.submission.wholeStatus);

      switch (status) {
        case "accepted":
          setModalStatus("accepted");
          break;
        case "time limit exceeded":
          setModalStatus("timelimit");
          break;
        case "memory limit exceeded":
          setModalStatus("memorylimit");
          break;
        case "wrong answer":
          setModalStatus("wrong");
          break;
        case "compilation error":
          setModalStatus("compilation");
          break;
        case "runtime error":
          setModalStatus("runtime");
          break;
        default:
          setModalStatus("server");
          break;
      }
    } catch (err) {
      console.error("Error: ", err);

      if (err.response) {
        console.error("Response Data: ", err.response.data);
        console.error("Response Status: ", err.response.status);
        console.error("Response Headers: ", err.response.headers);
        setModalMessage(err.response.data.message || "An error occurred. Please try again.");
        setModalStatus("server");
      } else if (err.request) {
        console.error("Request Data: ", err.request);
        setModalMessage("No response received from the server. Please try again.");
        setModalStatus("server");
      } else {
        console.error("Error Message: ", err.message);
        setModalMessage("An error occurred. Please try again.");
        setModalStatus("server");
      }
    }
  };

  return (
    <div className="flex flex-col h-screen px-3 bg-main_bg_color_dark">
      <ProblemNavBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={toggleSidebar}
        onSubmitCode={handleSubmitCode}
		onRunCode={handleSubmitCode}
      />
      <div
        className={`flex flex-1 gap-3 p-2 pt-0 overflow-auto ${
          sidebarOpen ? "blur-md" : ""
        }`}
      >
        <LeftSide />
        <RightSide code={code} setCode={setCode} setCompiler={setCompiler} />
      </div>
      <Modal
        isOpen={modalOpen}
        message={modalMessage}
        status={modalStatus}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Problem;
