import axios from "axios";
import fs from "fs";
import zipper from "zip-local";
// to copmile code an object must be sent with important fields , with names
// id: the id of the compiler you want to use, as provided most important ones are 54 for cpp, 71 for python and 62 for java
// code: the code to be compiled
// input: the input if exist
// answer: the right answer for the input
// checker : the code of the checker from polygon
// time_limit: if it is not send it will be 2 sec
// memory_limit: if it is not send it will be 128000 kilobytes
//note to make it work go to rapidapi then judge0 api their and subiscribe for free plan the put the the url and key to the env file
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//return : object with one of the following status
// {
//   "id": 2,
//   "description": "Processing"
// },
// {
//   "id": 3,
//   "description": "Accepted"
// },
// {
//   "id": 4,
//   "description": "Wrong Answer"
// },
// {
//   "id": 5,
//   "description": "Time Limit Exceeded"
// },
// {
//   "id": 6,
//   "description": "Compilation Error"
// },
// {
//   "id": 7,
//   "description": "Runtime Error (SIGSEGV)"
// },
// {
//   "id": 8,
//   "description": "Runtime Error (SIGXFSZ)"
// },
// {
//   "id": 9,
//   "description": "Runtime Error (SIGFPE)"
// },
// {
//   "id": 10,
//   "description": "Runtime Error (SIGABRT)"
// },
// {
//   "id": 11,
//   "description": "Runtime Error (NZEC)"
// },
// {
//   "id": 12,
//   "description": "Runtime Error (Other)"
// },
// {
//   "id": 13,
//   "description": "Internal Error"
// },
// and will have other status.pr string which is the final value to be printed returned from the checker
let folderName = "./temp";
export const compile = async function (req) {
	let options = {
		method: "POST",
		url: process.env.CompilerApiUrl,
		params: {
			base64_encoded: "false",
			wait: "true",
			fields: "*",
		},
		headers: {
			"content-type": "application/json",
			"Content-Type": "application/json",
			"X-RapidAPI-Key": process.env.CompilerApikey,
			"X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
		},
		data: {
			language_id: req.id,
			source_code: req.code,
			stdin: req.input,
			expected_output: null,
			cpu_time_limit: 2,
			cpu_extra_time: 1,
			wall_time_limit: 20,
			stack_limit: 128000,
			memory_limit: 128000,
		},
	}
	if (req.time_limit) options.data.cpu_time_limit = req.time_limit
	if (req.memory_limit) options.data.memory_limit = req.memory_limit

	try {
		console.log(options)
		let response = await axios.request(options)
		if (response.status.id == 3) {
			options.data.id = 89
			options.data.source_code = ""
			options.data.additional_files = data
			options.data.cpu_time_limit = 20
			options.data.memory_limit = 256000
			try {
				if (!fs.existsSync(folderName)) {
					fs.mkdirSync(folderName)
				}
				var folder2 = "t1-"
				folderName = folderName + "/" + folder2
				const cur = fs.mkdtempSync(folderName, (err, folder) => {
					if (err) throw err
				})
				console.log(cur)
				fs.copyFileSync("./util/testlib.h", cur + "/testlib.h")
				fs.copyFileSync("./util/compile", cur + "/compile")
				fs.copyFileSync("./util/run", cur + "/run")
				fs.writeFileSync(cur + "/input.txt", req.input)
				fs.writeFileSync(cur + "/answer.txt", req.answer)
				fs.writeFileSync(cur + "/output.txt", response.stdout)
				fs.writeFileSync(cur + "/code.cpp", req.checker)
				zipper.sync
					.zip(cur)
					.compress()
					.save(cur + "/addfiles.zip")
				fs.readFile(
					cur + "/addfiles.zip",
					{ encoding: "base64" },
					async (e, data) => {
						try {
							options.data.additional_files = data
							let response2 = await axios.request(options)
							delete response2.data.additional_files
							response.checker = response2
							if (response2.status.id != 3) {
								response.status.id = 4
							}
							response.status.pr = response2.stderr
							return response
						} catch (error) {
							console.error("error")
							res.send(error)
						}
					}
				)
				fs.rmSync(cur, { recursive: true })
			} catch (err) {
				console.error(err)
			}
		} else return response
	} catch (error) {
		console.error("error")
		throw error
	}
}
