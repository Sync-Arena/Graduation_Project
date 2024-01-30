import mongoose from "mongoose"
import Validator from "validator"

const contestSchema = new mongoose.Schema(
	{
		contestName: {
			type: String,
			trim: true,
			maxLnegth: [
				100,
				"Contest name length must be less than or equal 100 chatacters",
			],
			minLength: [
				1,
				"Contest name length must be greater than or equal 1 chatacter",
			],
			required: [true, "Please Enter a name for the contest"],
		},
		description: {
			type: String,
			trim: true,
			maxLnegth: [
				300,
				"Contest description length must be less than or equal 300 chatacters",
			],
		},
		startTime: {
			type: Date,
			default: Date.now,
		},
		durationInMinutes: {
			type: [Number, "You must select a valid number"],
			validate: {
				validator: (value) => Number(value) > 0,
				message: "You must specify a positive number of minutes",
			},
			required: [true, "Please select the contest duration in minutes"],
		},
		paticipatedUsers: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "User",
			},
		],
		problems: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Problem",
			},
		],
		
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

const contestModel = mongoose.model("Contest", contestSchema)

export default contestModel
