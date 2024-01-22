import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const re = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}/;

// create user schema
const userSchema = new mongoose.Schema(
  {
    fName: {
      type: String,
      trim: true,
      required: true,
      match: /^[A-Za-z]{3,20}$/,
    },
    lName: {
      type: String,
      trim: true,
      required: true,
      match: /^[A-Za-z]{3,20}$/,
    },
    age: {
      type: Number,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isEmail(value)) throw new Error("Invalid email format");
      },
    },
    countryCode: {
      type: String,
      trim: true,
      require: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        if (!validator.isMobilePhone(value, this.countryCode))
          throw new Error("Invalid phone number");
      },
    },
    password: {
      type: String,
      trim: true,
      required: true,
      validate(value) {
        //Minimum eight characters, at least one uppercase letter,
        // one lowercase letter, one number and one special character:
        const s = String(value);
        const check = s.match(re);
        if (!check) throw new Error("Invalid Password");
      },
    },
    confirmedPassword: {
      type: String,
      trim: true,
      required: true,
      async validate(value) {
        if (!(String(value) === String(this.password)))
          throw new Error("two password doesn't match");
      },
    },
    image: {
      type: String,
    },
    status: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      trim: true,
      enum: ["male", "female"],
    },
    dateOfBirth: {
      type: Date,
      max: "2020-01-01",
      min: "1950-01-01",
    },
    userType: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    tokens: [
      {
        token: {
          type: String,
          trim: true,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

// handle data for each user
userSchema.methods.toJSON = function () {
  const data = this.toObject();
  delete data.__v;
  return data;
};

// generate token for user each time he log in
userSchema.methods.generateToken = async function () {
  try {
    const token = jwt.sign({ _id: this._id }, process.env.TOKEN_KEY);
    this.tokens.push({ token });
    await userModel.findByIdAndUpdate(this._id, this);
    return token;
  } catch (e) {
    throw e;
  }
};

// handle log in process
userSchema.statics.logMe = async function (email, password) {
  try {
    const userData = await userModel.findOne({ email });
    if (!userData) throw new Error("Invalid Email");
    const isValidPass = await bcrypt.compare(password, userData.password);
    if (!isValidPass) throw new Error("Invalid Password");
    return userData;
  } catch (e) {
    throw e;
  }
};

// not encrypt passord again if not changed (only encrypt it in case of changing)
userSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      if (this.password === this.confirmedPassword) {
        this.confirmedPassword = this.password = await bcrypt.hash(
          this.password,
          10
        );
      } else throw new Error("passwords don't match");
    }
  } catch (e) {
    throw e;
  }
});

// create usermodel
const userModel = new mongoose.model("users", userSchema);
export default userModel;
