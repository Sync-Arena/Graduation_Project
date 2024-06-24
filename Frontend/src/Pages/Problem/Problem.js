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
    setModalStatus("pending");
    setModalStatus("pending");
    setModalMessage("Pending...");
    setModalOpen(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${auth.userData.token}` },
      };
      const requestBody = {
        compiler,
        code: encodeURIComponent(code),
        problemId,
        contestId: state ? state.contestId : undefined,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/api/v1/submissions/submit`,
        requestBody,
        config
      );
      const submission = response.data.submission;

      // Determine modal status based on submission status
      if (submission.wholeStatus == "Accepted") {
        setModalStatus("accepted");
      } else if (submission.wholeStatus == "Compilation Error") {
        setModalStatus("compilation");
      } else if (submission.wholeStatus == "Wrong answer") {
        setModalStatus("wrong");
      } else {
        setModalStatus("wrong");
        setModalStatus(submission.wholeStatus);
      }

      setModalMessage(submission.wholeStatus);
    } catch (err) {
      console.error(err);
      setModalStatus("compilation");
      setModalMessage("Error.");
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
        status={modalStatus}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Problem;
