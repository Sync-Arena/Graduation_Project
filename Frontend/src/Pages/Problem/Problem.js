import React, { useContext, useEffect, useState } from "react"
import ProblemNavBar from "./ProblemNavBar"
import LeftSide from "./LeftSide"
import RightSide from "./RightSide"
import AuthContext from "../../Context/AuthProvider"
import axios from "axios"
import { useLocation, useParams } from "react-router-dom"


const Problem = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false)
	const [code, setCode] = useState()
	const [compiler, setCompiler] = useState(54)
	const { auth } = useContext(AuthContext)
	const { problemId } = useParams()
	const { state } = useLocation()

	const toggleSidebar = () => {
		setSidebarOpen(!sidebarOpen)
	}

	console.log(compiler, state)
	const handleSubmitCode = async () => {
		try {
			const config = {
				headers: { Authorization: `Bearer ${auth.userData.token}` },
			}
			// setCode(encodeURIComponent(code))
			const requestBody = {
				compiler: compiler ? compiler : 54,
				code: encodeURIComponent(code),
				problemId,
				contestId: state ? state.contestId : undefined,
			}

			console.log(requestBody)
			const data = await axios.post(
				`${process.env.REACT_APP_BASE_URL}/api/v1/submissions/submit`,
				requestBody,
				config
			)
			console.log(data.data.submission)
			alert(data.data.submission.wholeStatus)
		} catch (err) {
			console.error(err)
		}
	}


	return (
		<div className="flex flex-col h-screen px-3 bg-main_bg_color_dark">
			<ProblemNavBar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={toggleSidebar}
				onSubmitCode = {handleSubmitCode}
			/>
			<div
				className={`flex flex-1 gap-3 p-2 pt-0 overflow-auto ${
					sidebarOpen ? "blur-md" : ""
				}`}>
				<LeftSide />
				<RightSide
					code={code}
					setCode={setCode}
					setCompiler = {setCompiler}
				/>
			</div>
		</div>
	)
}

export default Problem
