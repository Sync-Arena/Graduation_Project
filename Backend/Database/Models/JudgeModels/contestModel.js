import mongoose from "mongoose";
import Validator from "validator";

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
		participatedUsers: [
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
		createdBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		admins: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
	},
	{
		timestamps: true,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
)

contestSchema.virtual("submissions", {
  ref: "Submission",
  localField: "_id",
  foreignField: "contest",
});
// Method to register a user for the contest
contestSchema.methods.registerUser = function(userId){
	if(!this.paticipatedUsers.includes(userId)){
		this.paticipatedUsers.push(userId);
		return this.save();
	}
	return Promise.resolve(this);
}

// Method to cancel registration for a user
contestSchema.methods.cancelRegistration = function (userId) {
	if (this.participatedUsers.includes(userId)) {
	  this.participatedUsers.pull(userId);
	  return this.save();
	}
	return Promise.resolve(this);
  };
  
const contestModel = mongoose.model("Contest", contestSchema)


export default contestModel;
