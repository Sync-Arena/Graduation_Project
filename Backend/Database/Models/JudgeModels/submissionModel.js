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
			ref: "Problem",
		},
		virtualId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RunningContest",
		},
		problemName: {
			type: String,
			required: true,
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
		// offical => 0 = pratice  1 = offical    2 = virtual
		isOfficial: Number,

		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		contest: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Contest",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
	},
	{
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

// Post-save middleware to update solved problems array
submissionSchema.post("save", async function (doc, next) {
  const user = await doc.populate("user").execPopulate();

  if (doc.wholeStatus === "accepted") {
    const problemAlreadySolved = user.solvedProblems.some((problem) =>
      problem.problemId.equals(doc.problemId)
    );

    if (!problemAlreadySolved) {
      user.solvedProblems.push({ problemId: doc.problemId });
      await user.save();
    }
  }

  next();
});

// Post-update middleware to ensure data consistency in solved problem array
submissionSchema.post("updateOne", async function (doc, next) {
  const submission = await this.model.findOne(this.getQuery()).populate("user");
  const user = submission.user;

  if (submission.wholeStatus === "accepted") {
    const problemAlreadySolved = user.solvedProblems.some((problem) =>
      problem.problemId.equals(submission.problemId)
    );

    if (!problemAlreadySolved) {
      user.solvedProblems.push({ problemId: submission.problemId });
      await user.save();
    }
  } else {
    user.solvedProblems = user.solvedProblems.filter(
      (problem) => !problem.problemId.equals(submission.problemId)
    );
    await user.save();
  }

  next();
});

//populate({ path: "contest", select: "-__v" })

const submissionModel = mongoose.model("Submission", submissionSchema);

export default submissionModel;
