import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Problemsets from "./Pages/Problemsets";
import Contests from "./Pages/Contests/Contests";
import ContestLayout from "./Components/Layouts/ContestLayout";
import Challenges from "./Pages/Challenges";
import Edu from "./Pages/Edu";
import Streams from "./Pages/Streams";
import Top from "./Pages/Top/Top";
import Enter from "./Pages/Enter";
import Register from "./Pages/Register";
import Status from "./Pages/Contests/Status";
import Layout from "./Components/Layouts/Layout";
import MySubmissions from "./Pages/Contests/MySubmissions";
import Problems from "./Pages/Contests/Problems";
import Standing from "./Pages/Contests/Standing";
import Problem from "./Pages/Problem/Problem";
import Description from "./Pages/Problem/Description";
import Notes from "./Pages/Problem/Notes";
import Editorial from "./Pages/Problem/Editorial";
import Solutions from "./Pages/Problem/Solutions";
import Submissions from "./Pages/Problem/Submissions";
import RequireAuth from "./Components/Other/RequireAuth";
import Profile from "./Pages/Profile/Profile";
import ProfileOverview from "./Pages/Profile/ProfileRightSide/ProfileOverview/ProfileOverview";
import ProfileFavorite from "./Pages/Profile/ProfileRightSide/ProfileFavourite";
import ProfileGroups from "./Pages/Profile/ProfileRightSide/ProfileGroups";
import ProfileTeams from "./Pages/Profile/ProfileRightSide/ProfileTeams/ProfileTeams";
import ProfileContests from "./Pages/Profile/ProfileRightSide/ProfileContests";
import ProfileSubmissions from "./Pages/Profile/ProfileRightSide/ProfileSubmissions";
import ProfileFriends from "./Pages/Profile/ProfileRightSide/ProfileFriends";
import FriendsRating from "./Pages/Top/FriendsRating";
import RatingAll from "./Pages/Top/RatingAll";
import Groups from "./Pages/Groups/Groups";
import GroupContent from "./Pages/Groups/GroupContent";
import GroupContests from "./Pages/Groups/GroupContests";
import GroupMembers from "./Pages/Groups/GroupMembers";
import ContestRegister from "./Pages/ContestRegister";
import Messenger from "./Components/Messenger/Messenger";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route element={<RequireAuth />}>
            <Route path="problemsets" element={<Problemsets />} />
            <Route path="contests" element={<Contests />} />
            <Route path="contests/:id" element={<ContestLayout />}>
              <Route index element={<Problems />} />
              <Route path="status" element={<Status />} />
              <Route path="mySubmission" element={<MySubmissions />} />
              <Route path="standing" element={<Standing />} />
            </Route>
            <Route path="contests/:id/ContestRegister" element={<ContestRegister />} />
            <Route path="challenges" element={<Challenges />} />
            <Route path="edu" element={<Edu />} />
            <Route path="groups" element={<Groups />} />
            <Route path="groups/:contest-name*" element={<GroupContent />}>
              <Route path="contests" element={<GroupContests />} />
              <Route path="members" element={<GroupMembers />} />
            </Route>
            <Route path="streams" element={<Streams />} />
            <Route path="top" element={<Top />}>
              <Route path="friends-rating" element={<FriendsRating />} />
              <Route path="rating-all" element={<RatingAll />} />
            </Route>
            <Route path="profile" element={<Profile />}>
              <Route path="overview" element={<ProfileOverview />} />
              <Route path="favorite" element={<ProfileFavorite />} />
              <Route path="groups" element={<ProfileGroups />} />
              <Route path="teams" element={<ProfileTeams />} />
              <Route path="contests" element={<ProfileContests />} />
              <Route path="submissions" element={<ProfileSubmissions />} />
              <Route path="friends" element={<ProfileFriends />} />
            </Route>
            <Route path='messanger' element={<Messenger/>}/>
          </Route>
          <Route path="enter" element={<Enter />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route element={<RequireAuth />}>
          <Route path="/:problemId/*" element={<Problem />}>
            <Route path="description" element={<Description />} />
            <Route path="notes" element={<Notes />} />
            <Route path="editorial" element={<Editorial />} />
            <Route path="solutions" element={<Solutions />} />
            <Route path="submissions" element={<Submissions />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
