const BASE_URL = "https://polygon.codeforces.com/api"
const apiKey = "76dde285b8d0e71d5867698378e6fa4a7dd9564d"
const secret = "413410bf056e3ab26ab0ee10a1166db306e4563b"

const btn = document.getElementById("btn")
const out = document.getElementById("out")

function generateRandomString() {
	let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
	return chars
		.repeat(6)
		.replace(/./g, (c) => chars[(Math.random() * chars.length) | 0])
		.slice(0, 6)
}

const getURL = (methodName, additionalParams = {}) => {
	const rand = generateRandomString()
	const params = {
		apiKey,
		time: Math.floor(Date.now() / 1000),
		...additionalParams,
	}

	let sortedParams = Object.entries(params)
		.sort(([a], [b]) => a.localeCompare(b))
		.map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
		.join("&")

	const stringToHash = `${rand}/${methodName}?${sortedParams}#${secret}`
	const hash = CryptoJS.SHA512(stringToHash).toString(CryptoJS.enc.Hex)

	sortedParams += `&apiSig=${rand + hash}`
	console.log(sortedParams)

	const url = `${BASE_URL}/${methodName}?${sortedParams}`
	return url
}

btn.addEventListener("click", async () => {
	// const url = getURL("problem.statements", {problemId : 230041})
	const url = getURL("problems.list")
	const config = {
		method: "GET",
		mode: "no-cors",
		headers: {
			"Content-Type": "application/json",
			"Content-Type": "application/x-www-form-urlencoded",
		},
        credentials: "same-origin",
	}
	out.innerText = url
	console.log(url)
	const res = await fetch(url, config)
	const data = await res.json()
	console.log(data)
	// try {
	// 	const data = await axios({
	// 		method: "get",
	// 		url,
	// 		withCredentials: false,
	// 	})
	// 	console.log(data)
	// } catch (err) {
	// 	console.log(err)
	// }
})
