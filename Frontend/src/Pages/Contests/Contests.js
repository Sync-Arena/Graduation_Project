import React, { useState, useContext, useEffect } from "react";
import PastContests from "./PastContests";
import UpcomingContests from "./UpcomingContests";
import CurrentContests from "./CurrentContests";
import AuthContext from "../../Context/AuthProvider";
import moment from "moment";
import axios from 'axios';
import { useTheme } from "../../Context/ThemeProvider"; // Assuming you have a ThemeContext for managing dark/light theme

function Contests() {
  const { auth } = useContext(AuthContext);
  const { theme } = useTheme(); // Use theme from context

  const [pastContestsArray, setPastContestsArray] = useState([]);
  const [currentContestsArray, setCurrentContestsArray] = useState([]);
  const [upcomingContestsArray, setUpcomingContestsArray] = useState([]);
  const [upcomingContestsInfoArray, setUpcomingContestsInfoArray] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let past = [], curr = [], upcoming = [];
      let upcomingInfo = [];
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const fetchedContests = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest`, config);
        fetchedContests.data.forEach(contestData => {
          const { contest, participatedUsers } = contestData;
          const endDate = moment(contest.startTime).add(contest.durationInMinutes[0], 'm').toDate();
          const now = new Date();

          if (endDate < now) {
            past.push(contest);
          } else if (contest.startTime > now) {
            upcoming.push(contest);
            upcomingInfo.push({
              isRegistered: participatedUsers.includes(auth.userData.data.id),
              noOfUsers: participatedUsers.length
            });
          } else {
            curr.push(contest);
          }
        });
        setPastContestsArray(past);
        setCurrentContestsArray(curr);
        setUpcomingContestsArray(upcoming);
        setUpcomingContestsInfoArray(upcomingInfo);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [auth.userData.token]);

  return (
    <div className={`text-white ${theme === 'light' ? 'bg-white' : 'bg-second_bg_color_dark'}`}>
      <CurrentContests currentContestsArray={currentContestsArray} loading={loading} />
      <UpcomingContests upcomingContestsArray={upcomingContestsArray} loading={loading} />
      <PastContests pastContestsArray={pastContestsArray} loading={loading} />
    </div>
  );
}

export default Contests;
