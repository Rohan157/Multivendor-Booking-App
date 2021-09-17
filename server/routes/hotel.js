import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//to ensure that its only allowed to logged in user
//middleware
import { requireSignin } from "../middlewares";

//COntrollers
import { create, hotels, image } from "../controllers/hotel";

//Formidable here is necessary for the purpose of conversion of Form data
router.post("/create-hotel", requireSignin, formidable(), create);
//TO get the hotels so we can show them on the Home screen, we use get request
router.get("/hotels", hotels);
//to get img
router.get("/hotel/image/:hotelId", image);

module.exports = router;
