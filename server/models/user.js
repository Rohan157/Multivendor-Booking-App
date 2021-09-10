import mongoose from "mongoose";
import bcrypt from "bcrypt";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: "Name is required",
    },
    email: {
      type: String,
      trim: true,
      required: "Email is required",
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 64,
    },
    stripe_account_id: "",
    stripe_seller: {},
    stripeSession: {},
  },
  { timestamps: true }
);

//to hash the password field, we will use a mongoose fuction called pre middleware
// no arrow functions are allowed in the pre middleware function
userSchema.pre("save", function (next) {
  let user = this;
  //the next statements will make sure to hash password only when changing or registering for the first time
  //else there will be an issue of automatic password update and user won't be allowed to login again
  // we will use bcrypt for hashing
  if (user.isModified("password")) {
    return bcrypt.hash(user.password, 12, function (err, hash) {
      if (err) {
        console.log("BCRYPT HASH ERR", err);
        return next(err);
      }
      user.password = hash;
      return next();
    });
  } else {
    return next();
  }
});

//this is for login. Here we will compare the incoming hashed pw to pw in db
userSchema.methods.comparePassword = function (password, next) {
  bcrypt.compare(password, this.password, function (err, match) {
    if (err) {
      console.log("COMPARE PASSWORD ERR", err);
      return next(err, false);
    }
    //if no error we get null
    console.log("MATCH PASSWORD", match);
    return next(null, match);
  });
};

export default mongoose.model("User", userSchema);
