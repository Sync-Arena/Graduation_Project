import crypto from "crypto-js"
/**
 * @documentaion
 *
 */

const apiKey = process.env.POLYGON_APIKEY
const secret = process.env.POLYON_SECERT

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
	const hash = crypto.SHA512(stringToHash).toString(crypto.enc.Hex)
	sortedParams += `&apiSig=${rand + hash}`
	const url = `${process.env.POLGON_BASE_URL}/${methodName}?${sortedParams}`
	return url
}

export default getURL

