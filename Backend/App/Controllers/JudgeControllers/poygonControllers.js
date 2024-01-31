import AsyncHandler from "express-async-handler"
import getURL from "../../../util/apiPolygon.js"
import axios from "axios"

export const handlePolygonGETRequest = AsyncHandler(async (req, res) => {
	const url = getURL(req.params.methodName, req.query)
	const { data } = await axios.get(url)
	res.json(data)
})
