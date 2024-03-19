import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Problemsets from "./Pages/Problemsets";
import Contests from "./Pages/Contests/Contests";
import ContestLayout from "./Components/Layouts/ContestLayout"
import Challenges from "./Pages/Challenges";
import Edu, { loader as eduLoader } from "./Pages/Edu";
import Groups from "./Pages/Groups";
import Streams from "./Pages/Streams";
import Top from "./Pages/Top";
import Enter, { action as enterAction, loader as enterLoader } from "./Pages/Enter";
import Register, { action as registerAction } from "./Pages/Register";
import Status from "./Pages/Contests/Status";
import Layout from "./Components/Layouts/Layout";
import MySubmissions from "./Pages/Contests/MySubmissions";
import Problems from "./Pages/Contests/Problems";
import Standing from "./Pages/Contests/Standing";
import RequireAuth, { loader as requireAuthLoader } from "./Components/Other/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="problemsets" element={<Problemsets />} />
          <Route path="contests" element={<Contests />} />
          <Route path="contests/:id" element={<ContestLayout />}>
            <Route index element={<Problems />} />
            <Route path="status" element={<Status />} />
            <Route path="mySubmission" element={<MySubmissions />} />
            <Route path="standing" element={<Standing />} />
          </Route>
          <Route path="challenges" element={<Challenges />} />
          <Route element={<RequireAuth/>}>
            <Route path="edu" element={<Edu />} />
          </Route>
          <Route path="groups" element={<Groups />} />
          <Route path="streams" element={<Streams />} />
          <Route path="top" element={<Top />} />
          <Route path="enter" element={<Enter />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
