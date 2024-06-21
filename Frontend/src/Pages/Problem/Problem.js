// Problem.js
import React, { useContext, useEffect, useState } from "react";
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSubmitCode = async () => {
    setModalOpen(true);
    setModalMessage("Pending...");
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.userData.token}` },
      };
      const requestBody = {
        compiler,
        code: encodeURIComponent(code),
        problemId,
      };

      console.log(requestBody);
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/submissions/submit`,
        requestBody,
        config
      );
      setModalMessage(response.data.submission.wholeStatus);
    } catch (err) {
      console.error(err);
      setModalMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex flex-col h-screen px-3 bg-main_bg_color_dark'>
      <ProblemNavBar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={toggleSidebar}
        onSubmitCode={handleSubmitCode}
      />
      <div
        className={`flex flex-1 gap-3 p-2 pt-0 overflow-auto ${
          sidebarOpen ? "blur-md" : ""
        }`}>
        <LeftSide />
        <RightSide code={code} setCode={setCode} setCompiler={setCompiler} />
      </div>
      <Modal
        isOpen={modalOpen}
        message={modalMessage}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Problem;
