// import React, { useState } from "react";
// import SideBar from "../Bars/SideBar";
// import NavBar from "../Bars/NavBar";
// import Problem from "../../Pages/Problem/Problem";

// function Layout() {
//   const [inProblem, setInProblem] = useState(0);

//   // {inProblem && <SideBar />}
//   // <div className="flex-1 p-4 pt-0 px-8">
//   // {inProblem && <NavBar />}

//   return (
//     <>
//       <div className="App bg-main_bg_color_dark w-full max-h-screen">
//           <Problem />
//       </div>
//     </>
//   );
// }

// export default Layout;


import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Bars/SideBar";
import NavBar from "../Bars/NavBar";

function Layout() {
  const [isKnown, setIsKnow] = useState(1);

  return (
    <>
      <div className="App bg-main_bg_color_dark h-full flex">
        {isKnown && <SideBar />}
        <div className="flex-1 p-4 pt-0 px-8">
          <NavBar/>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
