import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//to ensure that its only allowed to logged in user
//middleware
import { requireSignin, hotelOwner } from "../middlewares";

//COntrollers
import {
  create,
  hotels,
  image,
  sellerHotels,
  remove,
  read,
  update,
} from "../controllers/hotel";

//Formidable here is necessary for the purpose of conversion of Form data
router.post("/create-hotel", requireSignin, formidable(), create);
//TO get the hotels so we can show them on the Home screen, we use get request
router.get("/hotels", hotels);
//to get img
router.get("/hotel/image/:hotelId", image);
//all hotels of a specific user
router.get("/seller-hotels", requireSignin, sellerHotels);
//to del hotels
router.delete("/delete-hotel/:hotelId", requireSignin, hotelOwner, remove);
//to get a single hotel for showing and editing(filling the form)
router.get("/hotel/:hotelId", read);
//sending the filled form for updating
router.put(
  "/update-hotel/:hotelId",
  requireSignin,
  hotelOwner,
  formidable(),
  update
);

module.exports = router;
