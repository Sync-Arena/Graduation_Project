import mongoose from 'mongoose';

const problemDataSchema = new mongoose.Schema({
	title: {
		type: String,
		trim: true,
	},

	legend: {
		type: String,
		trim: true,
	},

	input: {
		type: String,
		trim: true,
	},

	output: {
		type: String,
		trim: true,
	},

	notes: {
		type: String,
		trim: true,
	},

	tutorial: {
		type: String,
		trim: true,
	},

	checker: {
		type: String,
		required: true,
	},
})

export const problemDataModel = mongoose.model("ProblemData", problemDataSchema)

const problemTestCasesSchema = new mongoose.Schema({
	input: {
		type: String,
	},
	answer: {
		type: String,
	},
})

export const problemTestCasesModel = mongoose.model(
	"TestCases",
	problemTestCasesSchema
)
// polygonId must be an index for the problem
const problemSchema = new mongoose.Schema(
	{
		polygonId: {
			type: String,
			trim: true,
			required: true,
		},
		name: {
			type: String,
			required: true,
		},
		timeLimit: {
			type: Number,
			required: true,
		},
		memoryLimit: {
			type: Number,
		},
		difficulty: {
			type: Number,
			validate: {
				validator: function (value) {
					return value % 100 == 0 && value >= 800 && value <= 3600
				},
				message:
					"The difficulty must be a number between 800 and 3600 and divisible by 100",
			},
			default: 800,
		},
		existsIn: [
			{
				contestId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Contest",
				},
				IndexInContest: { type: String, trim: true },
			},
		],
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},

		ProblemDataId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "ProblemData",
		},
		testCases: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "TestCases",
			},
		],
	},
	{ timestamps: true }
)

const problemModel = mongoose.model("Problem", problemSchema)

export default problemModel