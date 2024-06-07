import React, { useContext, useEffect, useState } from "react"
import ProblemNavBar from "./ProblemNavBar"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import AuthContext from "../../Context/AuthProvider"
import axios from "axios"
import { useParams } from "react-router-dom"

const Problem = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const { auth } = useContext(AuthContext)
	const [problem, setProblem] = useState()
	const { problemId } = useParams()

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}
	useEffect(() => {
		let fetchData = async () => {
			try {
				const config = {
					headers: { Authorization: `Bearer ${auth.userData.token}` },
				}
				const data = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest/${problemId}`,
					config
				)
				data.data.tags.push(data.data.difficulty)
				setProblem(data.data)
			} catch (err) {
				console.error(err)
			} finally {
			}
		}
		fetchData()
	}, [problemId])

	return (
		<div className="flex flex-col h-screen px-3 bg-main_bg_color_dark">
			<ProblemNavBar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={toggleSidebar}
			/>
			<div
				className={`flex flex-1 gap-3 p-2 pt-0 overflow-auto ${
					sidebarOpen ? "blur-md" : ""
				}`}>
				<LeftSide problem={problem}/>
				<RightSide problem={problem} />
			</div>
		</div>
	)
}

export default Problem
