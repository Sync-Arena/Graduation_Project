import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import VisitorNavBar from "./Components/NavBar/VisitorNavBar/VisitorNavBar";

import Home from "./Pages/Home";
import ProblemSets from "./Pages/Problemsets";
import Contests from "./Pages/Contests";
import Challenges from "./Pages/Challenges";
import Edu from "./Pages/Edu";
import Groups from "./Pages/Groups";
import Streams from "./Pages/Streams";
import Top from "./Pages/Top";
import Enter from "./Pages/Enter";
import Register from "./Pages/Register";

function App() {
  return (
    <Router>
      <div className="App bg-main_bg_color_dark p-4">
        <VisitorNavBar />
        <div className="container mt-4">
          <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/problemsets" component={ProblemSets} />
            <Route path="/contests" component={Contests} />
            <Route path="/challenges" component={Challenges} />
            <Route path="/edu" component={Edu} />
            <Route path="/groups" component={Groups} />
            <Route path="/streams" component={Streams} />
            <Route path="/top" component={Top} />
            <Route path="/enter" component={Enter} />
            <Route path="/register" component={Register} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
