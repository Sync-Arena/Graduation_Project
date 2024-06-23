import React, { useContext, useEffect, useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import moment from "moment"
import AuthContext from "../../Context/AuthProvider"
import axios from "axios"

function CountdownPage() {
	const navigate = useNavigate()
	const location = useLocation()
	const { startTime, contestId, contestName } = location.state

	const calculateTimeLeft = () => {
		const now = moment()
		const startMoment = moment(startTime)
		const difference = startMoment.diff(now, "seconds")
		return difference > 0 ? difference : 0
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

	const { auth } = useContext(AuthContext)

	useEffect(() => {
		if (timeLeft <= 0) {
			const apicall = async () => {
				try {
					const config = {
						headers: { Authorization: `Bearer ${auth.userData.token}` },
					}
					const data = await axios.get(
						`${process.env.REACT_APP_BASE_URL}/api/v1/judge/${contestId}/vitual`,
						config
					)
					console.log(data)
				} catch (err) {
          console.error(err)
				} finally {
        }
			}
      apicall()
			navigate(`/contests/${contestId}`)
		}

		const interval = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(interval)
	}, [timeLeft, navigate, startTime, contestId])

	const formatTime = (seconds) => {
		const duration = moment.duration(seconds, "seconds")
		return `${String(duration.hours()).padStart(2, "0")}:${String(
			duration.minutes()
		).padStart(2, "0")}:${String(duration.seconds()).padStart(2, "0")}`
	}

	return (
		<div className="bg-second_bg_color_dark text-second_font_color_dark p-8 h-[580px] my-auto flex flex-col item-center justify-center rounded-lg shadow-md text-center">
			<h1 className="text-xl font-semibold mb-6">{contestName}</h1>
			<p className="text-lg mb-4">Before the contest</p>
			<p className="text-2xl text-blue-500">{formatTime(timeLeft)}</p>
		</div>
	)
}

export default CountdownPage
