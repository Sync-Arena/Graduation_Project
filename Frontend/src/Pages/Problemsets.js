
import React, { useEffect, useRef, useState, useContext } from "react";
import { LuUser2 } from "react-icons/lu";
import { FaCheck } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";
import { FaSpinner } from "react-icons/fa";
import { TbBalloonFilled } from "react-icons/tb";
import { GiBalloons } from "react-icons/gi";
import { BsFillBalloonHeartFill } from "react-icons/bs";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import AuthContext from "../Context/AuthProvider";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt, faCheck, faMagnifyingGlass, faAngleDown, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { Dropdown } from "flowbite-react";
import Loading from "./Loading/Loading";

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

	const [problemsArray, setProblemsArray] = useState([]);
	const [loading, setLoading] = useState(false);
	const [loadingPickOne, setLoadingPickOne] = useState(false); // New loading state for Pick One
	const totalProblems = 200;

	const startIndex = (currentPage - 1) * pageSize;
	const endIndex = startIndex + pageSize;
	const { auth } = useContext(AuthContext);
	const contestId = useParams();

	useEffect(() => {
		let fetchData = async () => {
			try {
				setLoading(true);
				const config = {
					headers: { Authorization: `Bearer ${auth.userData.token}` }
				};
				const data = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/judge/problemset`, config);
				setProblemsArray(data.data.data);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};
		fetchData();
	}, [auth.userData.token]);

	async function pickOneFunction() {
		try {
			setLoading(true); // Start loading
			const config = {
				headers: { Authorization: `Bearer ${auth.userData.token}` }
			};
			const recommendedProblems = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/v1/users/recommend`, config);
			const recommendedProlemId = recommendedProblems.data.data[0];
			navigate(`/${recommendedProlemId}/description`);
		} catch (err) {
			console.error(err);
		} finally {
			setLoading(false); // End loading
		}
	}

	const totalPages = Math.ceil(totalProblems / pageSize);

	const handlePageChange = (page) => {
		setCurrentPage(page);
	};

	const handleFilterTestNumInStatus = () => {

	}

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
				<div className="mt-32"><Loading /></div>
				:
				<div className="w-full mx-16">
					<div className="flex justify-between items-center mb-10">
						<Dropdown
							label=""
							className="w-32"
							dismissOnClick={true}
							renderTrigger={() => (
								<span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
									Lists
									<FontAwesomeIcon icon={faAngleDown} className="pl-4" />
								</span>
							)}
						>
							{/* <Dropdown.Item onClick={handleClick}>A - Problem 1</Dropdown.Item>
							<Dropdown.Item>B - Problem 2</Dropdown.Item>
							<Dropdown.Item>C - Problem 3</Dropdown.Item>
							<Dropdown.Item>D - Problem 4</Dropdown.Item> */}
						</Dropdown>
						<Dropdown
							label=""
							className="w-32"
							dismissOnClick={true}
							renderTrigger={() => (
								<span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
									Difficulty
									<FontAwesomeIcon icon={faAngleDown} className="pl-4" />
								</span>
							)}
						>
							{/* <Dropdown.Item>Accepted</Dropdown.Item>
							<Dropdown.Item>Wrong Answer</Dropdown.Item>
							<Dropdown.Item>Time Limit</Dropdown.Item>
							<Dropdown.Item>Run Time Error</Dropdown.Item>
							<Dropdown.Item>Memory Limit</Dropdown.Item> */}
						</Dropdown>

						<Dropdown
							label=""
							className="w-32"
							dismissOnClick={true}
							renderTrigger={() => (
								<span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
									Status
									<FontAwesomeIcon icon={faAngleDown} className="pl-4" />
								</span>
							)}
						>
							{/* <Dropdown.Item>C++</Dropdown.Item>
							<Dropdown.Item>Java</Dropdown.Item>
							<Dropdown.Item>Python</Dropdown.Item> */}
						</Dropdown>

						<Dropdown
							label=""
							className="w-32"
							dismissOnClick={true}
							renderTrigger={() => (
								<span className="inline-block bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
									Tags
									<FontAwesomeIcon icon={faAngleDown} className="pl-4" />
								</span>
							)}
						>
							{/* <Dropdown.Item>?</Dropdown.Item>
							<Dropdown.Item>!</Dropdown.Item>
							<Dropdown.Item>$</Dropdown.Item>
							<Dropdown.Item>#</Dropdown.Item> */}
						</Dropdown>

						<div className="relative text-second_font_color_dark">
							<div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
								<FontAwesomeIcon icon={faMagnifyingGlass} />
							</div>
							<input
								type="text"
								className="bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2"
								placeholder="Search Problems"
								onChange={handleFilterTestNumInStatus}
							/>
						</div>

						<div className="relative text-second_font_color_dark">
							{/* <div className="absolute inset-y-0 start-0 flex items-center ps-3.5">
								<FontAwesomeIcon icon={faUser} />
							</div>
							<input
								type="text"
								className="bg-third_bg_color_dark border border-main_border_color_dark focus:border-main_border_color_dark outline-none focus:ring-0 rounded-md inline-block ps-12 p-2"
								placeholder="Participant Handler"
								onChange={handleFilterUserInStatus}
							/> */}
							<button className="bg-third_bg_color_dark text-second_font_color_dark px-4 py-2 rounded-md border border-main_border_color_dark">
								<FontAwesomeIcon icon={faShuffle} />
								<button className="ml-2" onClick={() => {pickOneFunction()}}>Pick One</button>
							</button>
						</div>
					</div>
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

