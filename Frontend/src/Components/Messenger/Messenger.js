import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import { MdOutlineFilterList } from "react-icons/md";
import hamdyImg from "../../Assets/Images/hamdy.jpg";
import ModImg from "../../Assets/Images/mod.jpg";
import khaledImg from "../../Assets/Images/khaled.jpg";
import kaldishImg from "../../Assets/Images/kaldish.jpg";
import aboSalemImg from "../../Assets/Images/aboSalem.jpg";

const Messenger = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hello, Hawara. How do you do?",
      sender: "Ahmed-Hamdy",
      time: "08:45 PM",
    },
    {
      text: "I'm doing well, Ahmed. How about you?",
      sender: "Mahmoud-Hawara",
      time: "08:46 PM",
    },
  ]);

  const [users, setUsers] = useState([
    {
      name: "Ahmed-Hamdy",
      lastMessageTime: "08:45 PM",
      lastSeen: "Last Seen 5 Hours ago",
      profilePicUrl: hamdyImg,
      lastMessage: "I'm doing well, Ahmed. How about you?",
      isOnline: false,
    },
    {
      name: "Mod",
      lastMessageTime: "08:45 PM",
      lastSeen: "Last Seen 10 Hours ago",
      profilePicUrl: ModImg,
      lastMessage: "Hello there!",
      isOnline: false,
    },
    {
      name: "Khaled-Ramadan",
      lastMessageTime: "08:50 PM",
      lastSeen: "Last Seen 3 Hours ago",
      profilePicUrl: khaledImg,
      lastMessage: "Hey, what's up?",
      isOnline: false,
    },
    {
      name: "Kaldish",
      lastMessageTime: "08:52 PM",
      lastSeen: "Online",
      profilePicUrl: kaldishImg,
      lastMessage: "Nice weather today!",
      isOnline: true,
    },
    {
      name: "Abo-Salem",
      lastMessageTime: "08:55 PM",
      lastSeen: "Last Seen 1 Hour ago",
      profilePicUrl: aboSalemImg,
      lastMessage: "Did you finish the project?",
      isOnline: false,
    },
  ]);

  const [input, setInput] = useState("");

  const handleSendMessage = () => {
    if (input.trim() !== "") {
      const newMessage = {
        text: input,
        sender: "Mahmoud-Hawara", // Assuming current user is "Mahmoud-Hawara"
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, newMessage]);
      setInput("");

      // Update last message and time for the recipient (Ahmed-Hamdy)
      const updatedUsers = users.map((user) =>
        user.name === "Ahmed-Hamdy"
          ? { ...user, lastMessage: input, lastMessageTime: newMessage.time }
          : user
      );
      setUsers(updatedUsers);
    }
  };

  return (
    <div className="flex h-screen rounded-md">
      {/* Left Side - Chat Interface */}
      <div className="w-2/3 flex flex-col mr-6">
        {/* Header */}
        <div className="flex items-center p-4 rounded-md mb-4 bg-second_bg_color_dark shadow-md border-b border-main_border_color_dark">
          <img
            src={
              users.find((user) => user.name === "Ahmed-Hamdy").profilePicUrl
            }
            alt="User"
            className="w-12 h-12 rounded-full mr-4 shadow-md relative"
          />
          <div>
            <h2 className="text-second_font_color_dark font-semibold">
              Ahmed-Hamdy
            </h2>
            <p className="text-sm text-gray-400">
              {users.find((user) => user.name === "Ahmed-Hamdy").lastSeen}
            </p>
            {users.find((user) => user.name === "Ahmed-Hamdy").isOnline && (
              <div className="absolute bg-green-500 rounded-full w-3 h-3 bottom-0 right-0"></div>
            )}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto rounded-t-md shadow-md bg-second_bg_color_dark">
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div key={index} className="w-full flex">
                <div
                  className={`shadow-md p-4 rounded-md ${
                    message.sender === "Mahmoud-Hawara"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <p>{message.text}</p>
                  <div className="text-gray-500 text-xs text-right mt-1">
                    {message.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 flex items-center rounded-b-md shadow-md bg-second_bg_color_dark">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 p-3 border border-main_border_color_dark rounded-md mr-3 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSendMessage();
            }}
          />
          <button
            className="bg-blue-500 flex items-center justify-center text-white h-9 w-9 rounded-full hover:bg-blue-600 transition duration-200 shadow-md"
            onClick={handleSendMessage}
          >
            <IoSend />
          </button>
        </div>
      </div>

      {/* Right Side - Recent Conversations */}
      <div className="w-1/3 border-l-2 text-second_font_color_dark border-main_border_color_dark p-4 pl-6 overflow-y-auto">
        <div className="mb-4 flex items-center">
          <input
            type="text"
            placeholder="Search ..."
            className="flex-1 mr-4 p-2 border border-main_border_color_dark rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
          />
          <MdOutlineFilterList className="text-2xl" />
        </div>

        <div className="space-y-4">
          {users.map((user, index) => (
            <div
              className="flex items-center p-3 rounded-md bg-second_bg_color_dark shadow-md 
            hover:bg-third_bg_color_dark transition duration-200 cursor-pointer 
            {user.name === 'Ahmed-Hamdy' ? 'border-2 border-blue-500' : ''}"
            >
              <img
                src={user.profilePicUrl}
                alt="User"
                className={`w-10 h-10 rounded-full mr-4 shadow-md relative 
                ${
                  user.isOnline
                    ? 'after::absolute after::container-[""] after::bg-green-500 after::rounded-full after::w-3 after::h-3 after::bottom-0 after::right-0'
                    : ""
                }`}
              />
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <div className="font-semibold flex items-center">
                    <p>{user.name}</p>
                    {user.name === "Mod" && (
                      <p className="ml-1.5 h-5 w-5 text-xs flex justify-center items-center rounded-full bg-[#FDD7D7] text-[#F63737]">
                        2
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-semibold">
                    {user.lastMessageTime}
                  </p>
                </div>
                <p
                  className={`text-sm ${
                    user.name === "Mod"
                      ? "text-third_font_color_dark"
                      : "text-fourth_font_color_dark"
                  }`}
                >
                  {user.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
