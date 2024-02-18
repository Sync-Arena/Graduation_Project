import mongosse from "mongoose"

const standingSchema = new mongosse.Schema(
	{
		contestId: {
			type: mongosse.Schema.Types.ObjectId,
			ref: "Contest",
			required: true,
		},
		userId: {
			type: mongosse.Schema.Types.ObjectId,
			ref: "User",
		},
		status: {
			type: String,
			trim: true,
			default: "practice",
			enum: {
				values: ["offical", "unofficial", "vertial", "practice"],
				message: "Invalid status !!",
			},
		},
		solvedProblemsIds: [
			{
				type: String,
				trim: true,
				default: [],
			},
		],
		TriedProblemsIds: [
			{
				type: String,
				trim: true,
				default: [],
			},
		],
		penality: {
			type: Number,
			default: 0,
		},
	},
	{ timestamps: true }
)

const standingModel = mongosse.model("Standing", standingSchema)

export default standingModel
