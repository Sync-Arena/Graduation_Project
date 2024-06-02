import React, { useState } from 'react';
import ProblemNavBar from './ProblemNavBar';
import LeftSide from './LeftSide';
import RightSide from './RightSide';

const Problem = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className='flex flex-col h-screen px-3 bg-main_bg_color_dark'>
      <ProblemNavBar sidebarOpen={sidebarOpen} setSidebarOpen={toggleSidebar} />
      <div className={`flex flex-1 gap-3 p-2 pt-0 overflow-auto ${sidebarOpen ? "blur-md" : ""}`}>
        <LeftSide />
        <RightSide />
      </div>
    </div>
  );
}

export default Problem;
