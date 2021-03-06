import expressJwt from "express-jwt";
import Hotel from "../models/hotel";

//if information is correct it will give us information in req.user by default
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

//to check if the account belongs to specific user
//next is requiruirement of every middleware function
export const hotelOwner = async (req, res, next) => {
  let hotel = await Hotel.findById(req.params.hotelId).exec();
  // == for simple
  // let owner = hotel.postedBy._id == req.user._id
  //if we want === then we have to convert them in strings
  let owner = hotel.postedBy._id.toString() === req.user._id.toString();
  if (!owner) {
    return res.status(403).send("Unauthorized");
  }
  next();
};
