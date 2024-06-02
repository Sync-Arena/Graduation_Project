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
  const [upcomingContestsInfoArray, setUpcomingContestsInfoArray] = useState([])
  const { auth } = useContext(AuthContext)
  const [ref, setRef] = useState(false)

  const [loading, setLoading] = useState(false)

  function changeRef(){
    console.log("ads;klf")
    console.log(ref)
    setRef(prv => !prv)
  }

  useEffect(() => {

    const fetchData = async () => {
      console.log("a;dlkfj")
      setLoading(true)
      let past = [], curr = [], upcoming = [];
      let upcomingInfo = []
      try {
        const config = {
          headers: { Authorization: `Bearer ${auth.userData.token}` }
        };
        const fetchedContests = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest`, config)
        for (let i = 0; i < fetchedContests.data.length; ++i) {
          // console.log(fetchedContests)
          let endDate = moment(fetchedContests.data[i].contest.startTime).add(fetchedContests.data[i].contest.durationInMinutes[0], 'm').toDate()
          if (endDate < new Date()) past.push(fetchedContests.data[i].contest)
          else if (new Date(fetchedContests.data[i].contest.startTime) > new Date()) {
            upcoming.push(fetchedContests.data[i].contest)
            upcomingInfo.push({isRegistered: fetchedContests.data[i].contest.participatedUsers.includes(auth.userData.data.id), noOfUsers:fetchedContests.data[i].contest.participatedUsers.length})
          }
          else curr.push(fetchedContests.data[i].contest)
        }
        setPastContestsArray(past)
        setCurrentContestsArray(curr)
        setUpcomingContestsArray(upcoming)
        setUpcomingContestsInfoArray(upcomingInfo)
      } catch (error) {
        console.error(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="text-white">
      <CurrentContests currentContestsArray={currentContestsArray} loading={loading} />
      <UpcomingContests upcomingContestsArray={upcomingContestsArray} loading={loading} changeRef={changeRef} />
      <PastContests pastContestsArray={pastContestsArray} loading={loading} />
    </div>
  )
}

export default Contests;
