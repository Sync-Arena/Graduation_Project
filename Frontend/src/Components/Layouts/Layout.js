import React, { useState, useContext } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Bars/SideBar";
import NavBar from "../Bars/NavBar";
import AuthContext from "../../Context/AuthProvider";
import NavBarDefault from "../Bars/NavBarDefault";

function Layout() {
  const [isKnown, setIsKnow] = useState(1);
  const { auth } = useContext(AuthContext)

  return (
    <>
      <div className="App bg-main_bg_color_dark h-full flex">
        {isKnown && <SideBar />}
        <div className="flex-1 p-4 pt-0 px-8">
          {auth.signedIn ? <NavBar /> : <NavBarDefault />}
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
