import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      validate: validator.isEmail,
      unique: true,
      sparse: true,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, "A user must has a username"],
      minLength: 3,
      maxLength: 50,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "A user must has a password"],
      minLength: 8,
      select: false,
      trim: true,
    },
    passwordConfirm: {
      type: String,
      required: [true, "You must confirm your password"],
      validate: {
        validator: function (val) {
          return this.password === val;
        },
        message: "Two passwords doesn't match",
      },
      trim: true,
    },
    changedPasswordAt: {
      type: Date,
      default: new Date(),
    },
    role: {
      type: String,
      trim: true,
      default: "user",
      enum: {
        values: ["user", "admin"],
        message: "Invalid role !!",
      },
    },
    active: {
      type: Boolean,
      default: true,
    },
    tokens: [String],
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// DOCUMENT MIDDLEWARE
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 12);
    this.passwordConfirm = undefined;
  }
  next();
});

// QUERY MIDDLEWARE
userSchema.pre(/^find/, async function (next) {
  this.find({ active: { $ne: false } });
  next();
});

// INSTANCE METHODS
userSchema.methods.correctPassword = async function (
  candidatePassword,
  currentPassword
) {
  return await bcrypt.compare(candidatePassword, currentPassword);
};

userSchema.methods.passwordChangedAfter = function (jwtTimeStamp) {
  if (this.changedPasswordAt) {
    const changedPasswordTime = Math.floor(
      this.changedPasswordAt.getTime() / 1000
    );
    return jwtTimeStamp < changedPasswordTime;
  }
  return false;
};

const userModel = mongoose.model("User", userSchema);

export default userModel;
