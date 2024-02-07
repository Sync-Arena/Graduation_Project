import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema(
  {
    language: {
      type: String,
      trim: true,
      required: true,
    },
    code: {
      type: String,
      trim: true,
      required: true,
    },
    verdict: {
      type: String,
      trim: true,
      required: true,
      enum: {
        values: [
          "Accepted",
          "Wrong Answer",
          "MemoryLimitExceeded",
          "TimeLimitExceeded",
        ],
        message: "Invalid verdict !!",
      },
    },
    submissionTime: { type: Date, default: new Date(), required: true },

    executionTime: { type: String, trim: true, required: true },

    memoryUsage: { type: String, trim: true, required: true },

    targetMinute: { type: Date, required: true },

    // Parent Referencing
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },

    // Parent Referencing
    problem: {
      type: mongoose.Schema.ObjectId,
      ref: "Problem",
    },

    // Parent Referencing
    contest: {
      type: mongoose.Schema.ObjectId,
      ref: "Contest",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

submissionSchema.pre(/^find/, function (next) {
  this.populate({ path: "contest", select: "-__v" }).populate({
    path: "user",
    select: "userName",
  });
  next();
});

const submissionModel = mongoose.model("Submission", submissionSchema);

export default submissionModel;
