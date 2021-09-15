import expressJwt from "express-jwt";

//if information is correct it will give us information in req.user by default
export const requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});
