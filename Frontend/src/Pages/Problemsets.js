
import React, { useEffect, useRef, useState, useContext } from "react";
import { LuUser2 } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { TbBalloonFilled } from "react-icons/tb";
import { GiBalloons } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios'
import AuthContext from "../Context/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCheck } from '@fortawesome/free-solid-svg-icons';

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomHexColor() {
	return "#" + Math.floor(Math.random() * 16777215).toString(16);
}

function getRandomState() {
	const states = ["", "A", "P", "W", "F", "FSP"];
	return states[Math.floor(Math.random() * states.length)];
}

function convertToAlphabetic(index) {
	let result = "";
	while (index >= 0) {
		result = String.fromCharCode(65 + (index % 26)) + result;
		index = Math.floor(index / 26) - 1;
	}
	return result;
}

function Problemsets() {
	const InContest = useRef(0);

	const pageSize = 10;
	const [currentPage, setCurrentPage] = useState(1);
	const navigate = useNavigate();

	const [problemsArray, setProblemsArray] = useState([])
	const [loading, setLoading] = useState(false)
	const totalProblems = 200;

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const { auth } = useContext(AuthContext)
	const contestId = useParams()
	// console.log(contestId)
	useEffect(() => {
		let fetchData = async () => {
			try {
				setLoading(true)
				const config = {
					headers: { Authorization: `Bearer ${auth.userData.token}` }
				};
				const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/problemset`, config)
				// console.log(data)
				setProblemsArray(data.data.data)
			}
			catch (err) {
				console.error(err)
			}
			finally {
				setLoading(false)
			}
		}
		fetchData()
	}, [])


	const totalPages = Math.ceil(totalProblems / pageSize);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const visiblePagesOffset = Math.floor((currentPage - 1) / 5) * 5;
	const visiblePages = Array.from(
		{ length: Math.min(5, totalPages - visiblePagesOffset) },
		(_, index) => index + 1 + visiblePagesOffset
	);

	const handleProblemClick = (problemId) => {
		navigate(`/${problemId}/description`);
	};

	return (
		<div className="overflow-x-auto mt-10 flex justify-center">
			{loading ?
				<div className="text-white text-3xl py-8">Loading...</div>
				:
				<div className="w-full">
					<table className="w-full text-left rtl:text-right text-main_font_color_dark">
						<colgroup>
							<col style={{ width: "10%" }} />
							<col style={{ width: "70%" }} />
							<col style={{ width: "10%" }} />
							<col style={{ width: "10%" }} />
						</colgroup>
						<thead className="text-second_font_color_dark">
							<tr>
								<th scope="col" className="px-6 py-3">
									#
								</th>
								<th scope="col" className="px-6 py-3">
									Name
								</th>
								<th scope="col" className="px-6 py-3">
									<FontAwesomeIcon icon={faBolt} className='text-2xl' />
								</th>
								<th scope="col" className="px-6 py-3">
									<FontAwesomeIcon
										icon={faCheck}
										className="text-[#00FF00] text-2xl"
									/>
								</th>
							</tr>
						</thead>
						<tbody>
							{problemsArray.map((problem, index) => (
								<tr
									key={index}
									className={`${index % 2 === 0 ? "bg-second_bg_color_dark" : ""
										}`}
									onClick={() => handleProblemClick(problem._id)}
									style={{ cursor: "pointer" }}
								>
									<td className="px-6 py-4">{convertToAlphabetic(index)}</td>
									<td className="px-6 py-4">{problem.name}</td>
									<td className="px-6 py-4">{problem.difficulty}</td>
									<td className="px-6 py-4">
										<div className="flex items-center">
											{InContest.current ? (
												problem.state === "A" ? (
													<TbBalloonFilled
														style={{ fontSize: "1.5rem", color: problem.color }}
													/>
												) : problem.state === "F" ? (
													<GiBalloons
														style={{ fontSize: "1.5rem", color: problem.color }}
													/>
												) : problem.state === "FSP" ? (
													<BsFillBalloonHeartFill
														style={{ fontSize: "1.5rem", color: problem.color }}
													/>
												) : null
											) : (
												<>
													<LuUser2 style={{ fontSize: "1.2rem" }} />
													<span className="block ml-4">
														{problem.numberOfSolvers}
													</span>
												</>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					{totalProblems > 20 && (
						<div className="flex justify-end my-6 items-center">
							<FaAngleLeft
								className="text-main_font_color_dark cursor-pointer mr-2"
								onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
							/>
							{visiblePages.map((page) => (
								<button
									key={page}
									onClick={() => handlePageChange(page)}
									className={`rounded-full mx-1 text-main_font_color_dark ${currentPage === page ? "bg-main_heighlight_color_dark " : ""
										} ${String(page).length === 1 ? "px-3 py-1" : "px-2 py-1"
										} cursor-pointer`}>
									{page}
								</button>
							))}
							<FaAngleRight
								className="text-main_font_color_dark cursor-pointer ml-2"
								onClick={() =>
									handlePageChange(Math.min(currentPage + 1, totalPages))
								}
							/>
						</div>
					)}
				</div>
}
			
		</div>
	)
}

export default Problemsets;

