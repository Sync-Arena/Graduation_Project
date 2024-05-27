import mongosse from "mongoose";

const userContest = new mongosse.Schema(
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

    Rank: {
      type: Number,
      default: 0,
    },

    Penality: {
      type: Number,
      default: 0,
    },

    solvedProblemsIds: [
      {
        type: mongosse.Schema.Types.ObjectId,
        ref: "problem",
      },
    ],
  },
  { timestamps: true }
);

const userContestModel = mongosse.model("UserContestRelation", userContest);

export default userContestModel;
