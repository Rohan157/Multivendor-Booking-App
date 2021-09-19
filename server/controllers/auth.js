import User from "../models/user";
import jwt from "jsonwebtoken";

// export const showMessage = (req, res) => {
//   res.status(200).send(`Here is your message: ${req.params.message}`);
// };

export const register = async (req, res) => {
  try {
    //firstly you should check whether you are recieving data in backend or not
    console.log(req.body);
    const { name, email, password } = req.body;
    //Validation
    if (!name) return res.status(400).send("Name is required");
    if (!password || password.length < 6)
      return res.status(400).send("Min 6 character password");
    //now for email we have to query database to verify that the email is unique and doesn't exist in db before
    let userExist = await User.findOne({ email }).exec();
    if (userExist) return res.status(400).send("Email is taken");
    //If ecerything clear then now we register the user
    const user = new User(req.body);

    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};

export const login = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    let user = await User.findOne({ email }).exec();
    // console.log("USER EXIST", user);
    if (!user) return res.status(400).send("User with that email not found");
    //compare password
    //we have access to user.comparePassword function cuz we have written it in user model
    user.comparePassword(password, (err, match) => {
      console.log("COMPARE PASSWORD IN LOGIN ERR", err);
      if (!match || err) return res.status(400).send("Wrong password");
      //GENERATE A TOKEN AND THEN SEND IT AS A RESPONSE TO CLIENT
      let token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "9d",
      });
      res.json({
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          stripe_account_id: user.stripe_account_id,
          stripe_seller: user.stripe_seller,
          stripeSession: user.stripeSession,
        },
      });
    });
  } catch (err) {
    console.log("LOGIN ERROR", err);
    res.status(400).send("Signin failed");
  }
};
