import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Home from "./Pages/Home";
import Problemsets from "./Pages/Problemsets";
import Contests from "./Pages/Contests/Contests";
import ContestLayout from "./Components/Layouts/ContestLayout"
import Challenges from "./Pages/Challenges";
import Edu from "./Pages/Edu";
import Groups from "./Pages/Groups";
import Streams from "./Pages/Streams";
import Top from "./Pages/Top";
import Enter from "./Pages/Enter";
import Register from "./Pages/Register";
import Status from "./Pages/Contests/Status";
import Layout from "./Components/Layouts/Layout";
import MySubmissions from "./Pages/Contests/MySubmissions";
import Problems from "./Pages/Contests/Problems";
import Standing from "./Pages/Contests/Standing";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="problemsets" element={<Problemsets />} />
          <Route path="contests" element={<Contests />} />
          <Route path="contests/:id" element={<ContestLayout />}>
            <Route index element={<Problems />}/>
            <Route path="status" element={<Status />} />
            <Route path="mySubmission" element={<MySubmissions />} />
            <Route path="standing" element={<Standing />} />
          </Route>
          <Route path="challenges" element={<Challenges />} />
          <Route path="edu" element={<Edu />} />
          <Route path="groups" element={<Groups />} />
          <Route path="streams" element={<Streams />} />
          <Route path="top" element={<Top />} />
          <Route path="enter" element={<Enter />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
