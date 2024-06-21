import React from 'react';
import { IoClose } from "react-icons/io5"; // Import a close icon from react-icons
import { AiOutlineLoading3Quarters } from "react-icons/ai"; // Import a loading icon for pending state

const statusStyles = {
  accepted: "bg-green-100 text-green-800 border-green-300",
  timelimit: "bg-yellow-100 text-yellow-800 border-yellow-300",
  memorylimit: "bg-yellow-100 text-yellow-800 border-yellow-300",
  wrong: "bg-red-100 text-red-800 border-red-300",
  compilation: "bg-red-100 text-red-800 border-red-300",
  runtime: "bg-red-100 text-red-800 border-red-300",
  pending: "bg-gray-100 text-gray-800 border-gray-300",
  server: "bg-red-100 text-red-800 border-red-300",
  // Add specific styles for runtime errors
  "Runtime Error (SIGSEGV)": "bg-red-100 text-red-800 border-red-300",
  "Runtime Error (SIGXFSZ)": "bg-red-100 text-red-800 border-red-300",
  "Runtime Error (SIGFPE)": "bg-red-100 text-red-800 border-red-300",
  "Runtime Error (SIGABRT)": "bg-red-100 text-red-800 border-red-300",
  "Runtime Error (NZEC)": "bg-red-100 text-red-800 border-red-300",
  "Runtime Error (Other)": "bg-red-100 text-red-800 border-red-300",
};

const statusIcons = {
  accepted: "✅",
  timelimit: "⏳",
  memorylimit: "💾",
  wrong: "❌",
  compilation: "🛠️",
  pending: <AiOutlineLoading3Quarters className="animate-spin" />,
  server: "🚨",
  // Add specific icons for runtime errors
  "Runtime Error (SIGSEGV)": "💥",
  "Runtime Error (SIGXFSZ)": "💥",
  "Runtime Error (SIGFPE)": "💥",
  "Runtime Error (SIGABRT)": "💥",
  "Runtime Error (NZEC)": "💥",
  "Runtime Error (Other)": "💥",
};

const Modal = ({ isOpen, message, status, onClose }) => {
  if (!isOpen) return null;

  const statusStyle = statusStyles[status] ;
  const statusIcon = statusIcons[status];

    console.log(status);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-out">
      <div className={`relative p-8 rounded-lg shadow-lg border-2 ${statusStyle} transform transition-transform duration-300 ease-out scale-100 hover:scale-105 w-96`}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-xl text-gray-600 hover:text-gray-800 focus:outline-none"
        >
          <IoClose />
        </button>
        <div className="flex items-center justify-center flex-col">
          <div className="text-2xl mb-4">{statusIcon}</div>
          <p className="text-lg font-semibold text-center">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
