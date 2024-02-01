import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import VisitorNavBar from "./Components/NavBar/VisitorNavBar/VisitorNavBar";

import Home from "./Pages/Home";
import Problemsets from "./Pages/Problemsets";
import Contests from "./Pages/Contests";
import Challenges from "./Pages/Challenges";
import Edu from "./Pages/Edu";
import Groups from "./Pages/Groups";
import Streams from "./Pages/Streams";
import Top from "./Pages/Top";
import Enter from "./Pages/Enter";
import Register from "./Pages/Register";
import Standing from "./Pages/Standing";

function App() {
  return (
    <Router>
      <div className="App bg-main_bg_color_dark p-4 h-full min-h-screen flex flex-col">
        <VisitorNavBar />
        <div className="mt-4 flex-1 container mx-auto">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/problemsets" element={<Problemsets />} />
            <Route path="/contests" element={<Contests />} />
            <Route path="/standing" element={<Standing />} />
            <Route path="/challenges" element={<Challenges />} />
            <Route path="/edu" element={<Edu />} />
            <Route path="/groups" element={<Groups />} />
            <Route path="/streams" element={<Streams />} />
            <Route path="/top" element={<Top />} />
            <Route path="/enter" element={<Enter />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
