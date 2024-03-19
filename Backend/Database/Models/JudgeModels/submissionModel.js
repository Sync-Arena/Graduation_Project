import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
	{
		sourceCode: {
			type: String,
			trim: true,
			required: true,
		},
		languageName: {
			type: String,
			required: true,
		},
		problemId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Problems",
		},
		status: [
			{
				description: String,
				pr: String,
			},
		],
		stdin: [String],
		stdout: [String],
		answers: [String],

		wholeStatus: String,
		time: String,
		memory: Number,

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		contest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Contest",
		},
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

submissionSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "userName",
  });
  next();
});

//populate({ path: "contest", select: "-__v" })

const submissionModel = mongoose.model("Submission", submissionSchema);

export default submissionModel;
