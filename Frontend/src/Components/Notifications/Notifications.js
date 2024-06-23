import React, { useContext, useEffect, useState } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import {
	CheckCircleIcon,
	ExclamationCircleIcon,
	InformationCircleIcon,
} from "@heroicons/react/24/solid"
import AuthContext from "../../Context/AuthProvider"
import axios from "axios"

const forshow = [		{
  _id: 1,
  type: "group_acceptance",
  groupName: "Alpha Group",
  time: "2024-06-23 10:30 AM",
  message: "join our group",
  state: "accepted"
},
{
  _id: 2,
  type: "join_request",
  userName: "John Doe",
  groupName: "Beta Group",
  time: "2024-06-23 11:00 AM",
},
{
  _id: 3,
  type: "contest_notification",
  contestName: "Monthly Challenge",
  contestDate: "2024-07-01",
  time: "2024-06-23 12:00 PM",
},
{
  _id: 11,
  type: "earned_coins",
  amount: 50,
  reason: "registration of the contest CollabColde round 2",
  time: "2024-06-23 08:00 PM",
},
{
  _id: 12,
  type: "rank_changed",
  newRank: 1700,
  time: "2024-06-23 08:30 PM",
}]

const Notifications = () => {
	const [notifications, setNotifications] = useState([])
	const { auth } = useContext(AuthContext)
	const config = {
		headers: { Authorization: `Bearer ${auth.userData.token}` },
	}

	const [hoveredNotification, setHoveredNotification] = useState(null)

	useEffect(() => {
		const getNotifications = async () => {
			try {
				const data = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/api/v1/notifications/`,
					config
				)
        console.log(data.data.data)
				setNotifications([...data.data.data, ...forshow])
			} catch (err) {
				console.error(err)
			}
		}
		getNotifications()
		console.log(notifications)
	}, [])
	const handleMouseEnter = (id) => {
		setHoveredNotification(id)
	}

	const handleMouseLeave = () => {
		setHoveredNotification(null)
	}

	const getColorClass = (notification) => {
		if (notification.type === "group_acceptance") {
			return hoveredNotification === notification.id
				? "bg-green-100 border-green-500"
				: "bg-second_bg_color_dark border-l-4 border-green-500"
		} else if (
			notification.type === "join_request" ||
			notification.type === "teamInvitaion"
		) {
			return hoveredNotification === notification.id
				? "bg-yellow-100 border-yellow-500"
				: "bg-second_bg_color_dark border-l-4 border-yellow-500"
		} else if (notification.type === "earned_coins") {
			return hoveredNotification === notification.id
				? "bg-purple-100 border-purple-500"
				: "bg-second_bg_color_dark border-l-4 border-purple-500"
		} else if (notification.type === "rank_changed") {
			return hoveredNotification === notification.id
				? "bg-indigo-100 border-indigo-500"
				: "bg-second_bg_color_dark border-l-4 border-indigo-500"
		} else {
			return hoveredNotification === notification.id
				? "bg-blue-100 border-blue-500"
				: "bg-second_bg_color_dark border-l-4 border-blue-500"
		}
	}

	const handleAccept = async (notificationId) => {
		console.log(`Accepted notification with id: ${notificationId}`)
		try {
			const data = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/v1/notifications/${notificationId}`,
				{ accept: true },
				config
			)
			console.log(data)
		} catch (err) {
			console.log(err)
		}
		// Handle accept logic here
	}

	const handleReject = async (notificationId) => {
		console.log(`Rejected notification with id: ${notificationId}`)
		try {
			const data = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/v1/notifications/${notificationId}`,
				{ accept: false },
				config
			)
			console.log(data)
		} catch (err) {
			console.log(err)
		}
		// Handle reject logic here
	}
	return (
		<div className="space-y-4 p-6">
			<h1 className="text-3xl font-semibold mb-6 text-gray-800 border-b-2 border-main_border_color_dark pb-4">
				Notifications
			</h1>
			<TransitionGroup>
				{notifications.map((notification) => (
					<CSSTransition
						key={notification._id}
						classNames="notification"
						timeout={300}>
						<div
							onMouseEnter={() => handleMouseEnter(notification._id)}
							onMouseLeave={handleMouseLeave}
							style={{
								transition: "opacity 0.3s, transform 0.3s",
								opacity: 1,
								transform: "translateY(0)",
								marginBottom: "1rem",
								cursor: "pointer", // Add cursor pointer
							}}
							className={`p-4 rounded-lg shadow-md flex items-center justify-between ${getColorClass(
								notification
							)}`}>
							<div className="flex items-center">
								{(notification.type === "group_acceptance" ||
									(notification.type === "teamInvitaion" &&
										notification.state === "accepted")) && (
									<CheckCircleIcon className="w-6 h-6 mr-3 text-green-500" />
								)}
								{notification.type === "join_request" && (
									<ExclamationCircleIcon className="w-6 h-6 mr-3 text-yellow-500" />
								)}
								{notification.type === "teamInvitaion" &&
									notification.state === "pending" && (
										<ExclamationCircleIcon className="w-6 h-6 mr-3 text-yellow-500" />
									)}
								{notification.type === "contest_notification" && (
									<InformationCircleIcon className="w-6 h-6 mr-3 text-blue-500" />
								)}
								{notification.type === "earned_coins" && (
									<InformationCircleIcon className="w-6 h-6 mr-3 text-purple-500" />
								)}
								{notification.type === "rank_changed" && (
									<InformationCircleIcon className="w-6 h-6 mr-3 text-indigo-500" />
								)}
								<div>
									<p className="text-gray-800">
										{(notification.type === "group_acceptance" ||
											(notification.type === "teamInvitaion" &&
												notification.state === "accepted")) && (
											<>
												{notification.sender && (
													<>
														from : {notification.sender.teamName} team:{" "}
														<br></br>
													</>
												)}
												{notification.message}{" "}
												<strong className="font-semibold">
													{notification.groupName}
												</strong>
												<br /> state : {notification.state}.
											</>
										)}
										{notification.type === "join_request" && (
											<div className="flex gap-x-[4px] items-center ">
												<strong className="font-semibold">
													{notification.userName}
												</strong>{" "}
												wants to join your group{" "}
												<strong className="font-semibold">
													{notification.groupName}
												</strong>
												.
												<div className="">
													<button
														onClick={() => handleAccept(notification._id)}
														className="px-4 ml-6 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
														Accept
													</button>
													<button
														onClick={() => handleReject(notification._id)}
														className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
														Reject
													</button>
												</div>
											</div>
										)}
										{notification.type === "teamInvitaion" &&
											notification.state === "pending" && (
												<div className="flex gap-x-[4px] items-center ">
													<strong className="font-semibold">
														{notification.userName}
													</strong>{" "}
													from : {notification.sender.teamName} team: <br></br>
													{notification.message}{" "}
													<strong className="font-semibold">
														{notification.groupName}
													</strong>
													.
													<div className="">
														<button
															onClick={() => handleAccept(notification._id)}
															className="px-4 ml-6 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300">
															Accept
														</button>
														<button
															onClick={() => handleReject(notification._id)}
															className="ml-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300">
															Reject
														</button>
													</div>
												</div>
											)}
										{notification.type === "contest_notification" && (
											<>
												New contest "
												<strong className="font-semibold">
													{notification.contestName}
												</strong>
												" starts on{" "}
												<strong className="font-semibold">
													{notification.contestDate}
												</strong>
												.
											</>
										)}
										{notification.type === "earned_coins" && (
											<>
												You have earned{" "}
												<strong className="font-semibold">
													{notification.amount} coins
												</strong>{" "}
												for {notification.reason}.
											</>
										)}
										{notification.type === "rank_changed" && (
											<>
												Your rank changed to{" "}
												<strong className="font-semibold">
													{notification.newRank}
												</strong>
												.
											</>
										)}
									</p>
									<p className="text-sm text-gray-500">{notification.time}</p>
								</div>
							</div>
						</div>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	)
}

export default Notifications
