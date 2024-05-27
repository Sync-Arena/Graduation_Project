import React, { useRef, useState, useEffect, useContext } from "react";
import PastContests from "./PastContests";
import UpcomingContests from "./UpcomingContests";
import CurrentContests from "./CurrentContests";
import AuthContext from "../../Context/AuthProvider";
import moment from "moment";
import axios from 'axios'
function Contests() {
  const [pastContestsArray, setPastContestsArray] = useState([])
  const [currentContestsArray, setCurrentContestsArray] = useState([])
  const [upcomingContestsArray, setUpcomingContestsArray] = useState([])
  const { auth } = useContext(AuthContext)
  const [loading, setLoading] = useState(false)
  useEffect(() => {

    const fetchData = async () => {
      setLoading(true)
      const past = [], curr = [], upcoming = [];
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const fetchedContests = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest`, config)
        for (let i = 0; i < fetchedContests.data.length; ++i) {
          
          let endDate = moment(fetchedContests.data[i].startTime).add(fetchedContests.data[0].durationInMinutes[0], 'm').toDate()
          if (endDate < new Date()) past.push(fetchedContests.data[i])
          else if (new Date(fetchedContests.data[i].startTime) > new Date()) upcoming.push(fetchedContests.data[i])
          else curr.push(fetchedContests.data[i])
        }
        setPastContestsArray(past)
        setCurrentContestsArray(curr)
        setUpcomingContestsArray(upcoming)
      } catch (error) {
        console.error(error.message)
      } finally{
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="text-white">
      <CurrentContests currentContestsArray={currentContestsArray} loading={loading}/>
      <UpcomingContests upcomingContestsArray={upcomingContestsArray} loading={loading}/>
      <PastContests pastContestsArray={pastContestsArray} loading={loading}/>
    </div>
  )
}

export default Contests;
