import mongosse from "mongoose"

const RunningContestSchema = new mongosse.Schema({
	contestId: {
		type: mongosse.Schema.Types.ObjectId,
		ref: "Contest",
		required: true,
	},
	userId: {
		type: mongosse.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	expireAt: {
		type: Date,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
})


const RunningContestModel = mongosse.model(
	"RunningContest",
	RunningContestSchema
)

export default RunningContestModel
