import React, { useContext, useEffect, useRef, useState } from "react"
import { FaTags } from "react-icons/fa"
import {  useParams } from "react-router-dom"
import AuthContext from "../../Context/AuthProvider"
import axios from "axios"

const Description = (props) => {

  const {problemId} = useParams()
	const [tagsVisible, setTagsVisible] = useState(false)
	const tagsRef = useRef(null) 
	const { auth } = useContext(AuthContext)
	const [problem, setProblem] = useState()



	const toggleVisibility = () => {
		setTagsVisible(!tagsVisible)
	}

	useEffect(() => {
		let fetchData = async () => {
			try {
				const config = {
					headers: { Authorization: `Bearer ${auth.userData.token}` },
				}
				console.log(problemId)
				const data = await axios.get(
					`${process.env.REACT_APP_BASE_URL}/api/v1/judge/contest/${problemId}`,
					config
				)
				console.log(data)
        data.data.tags.push(data.data.difficulty)
				setProblem(data.data)
			} catch (err) {
				console.error(err)
			} finally {
			}
		}
		fetchData()
	}, [problemId])

	useEffect(() => {
    if(tagsRef.current != null){
		if (tagsVisible) {
			tagsRef.current.style.maxHeight = `${tagsRef.current.scrollHeight}px`
		} else {
			tagsRef.current.style.maxHeight = "0"
		}}
	}, [tagsVisible])


	return (
		<>
			{problem ? (
				<div className="p-10 text-second_font_color_dark">
					<div className="info flex flex-col items-center ">
						<div className="flex text-xl font-semibold">
							<h1 className="ml-2 mb-2 text-second_font_color_dark">{problem.name}</h1>
						</div>
						<div className="flex flex-col items-center">
							<p className="text-s">
								time limit per test: {problem.timeLimit} seconds
							</p>
							<p className="text-s">
								memory limit per test: {problem.memoryLimit} megabytes
							</p>
						</div>
					</div>

					<div className="description">
						<p className="mt-8">{problem.ProblemDataId.legend}</p>
					</div>

					<div className="input">
						<h2 className="text-lg font-semibold mt-4">Input</h2>
						<p className="mt-4">{problem.ProblemDataId.input}</p>
					</div>

					<div className="output">
						<h2 className="text-lg font-semibold mt-4">Output</h2>
						<p className="mt-4">{problem.ProblemDataId.output}</p>
					</div>

					{problem.ProblemDataId.notes !== "" && (
						<div className="explanation">
							<h2 className="text-lg font-semibold mt-4">
								TestCases Explanation
							</h2>
							<p className="mt-4">{problem.ProblemDataId.notes}</p>
						</div>
					)}

					<div className="border-y-2 mt-8 p-4 border-main_border_color_dark">
						<div
							className="w-full flex justify-between cursor-pointer"
							onClick={toggleVisibility}>
							<div className="flex gap-2 font-semibold cursor-pointer w-full items-center">
								<FaTags />
								<p>Tags</p>
							</div>
							<div className="text-third_font_color_dark">
								<svg
									className={`w-5 h-5 ml-2 transition-transform duration-300 ${
										tagsVisible ? "transform rotate-180" : ""
									}`}
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24"
									xmlns="http://www.w3.org/2000/svg">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M19 9l-7 7-7-7"></path>
								</svg>
							</div>
						</div>

						<div
							ref={tagsRef}
							className="overflow-hidden transition-all duration-500 ease-in-out max-h-0">
							<div className="flex flex-wrap gap-2 mt-4">
								{problem.tags.map((tag, index) => (
									<span
										key={index}
										className="bg-third_bg_color_dark px-3 py-1 rounded-full text-sm">
										{tag}
									</span>
								))}

							</div>
						</div>
					</div>

					<div className="flex justify-between bg-third_bg_color_dark px-8 py-2 rounded text-second_font_color_dark mt-4">
						<div className="text-center">
							<span className="block text-xl font-bold">
								{problem.numberOfSolvers}
							</span>
							<span className="block text-sm">Accepted</span>
						</div>
						<div className="text-center">
							<span className="block text-xl font-bold">
								{problem.numberOfTotalSubmissions}
							</span>
							<span className="block text-sm">Submissions</span>
						</div>
						<div className="text-center">
							<span className="block text-xl font-bold">
								{problem.numberOfTotalSubmissions === 0 ? 0 : (problem.numberOfSolvers / problem.numberOfTotalSubmissions).toFixed(2)}%
							</span>
							<span className="block text-sm">Acceptance Rate</span>
						</div>
					</div>
				</div>
			) : (
				<div>Looding...</div>
			)}
		</>
	)
}

export default Description
