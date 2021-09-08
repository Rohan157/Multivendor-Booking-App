import User from "../models/user";

// export const showMessage = (req, res) => {
//   res.status(200).send(`Here is your message: ${req.params.message}`);
// };

export const register = async (req, res) => {
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
  try {
    await user.save();
    console.log("USER CREATED", user);
    return res.json({ ok: true });
  } catch (err) {
    console.log("CREATE USER FAILED", err);
    return res.status(400).send("Error. Try again.");
  }
};
