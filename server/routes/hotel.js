import express from "express";
import formidable from "express-formidable";

const router = express.Router();

//to ensure that its only allowed to logged in user
//middleware
import { requireSignin } from "../middlewares";

//COntrollers
import { create } from "../controllers/hotel";

//Formidable here is necessary for the purpose of conversion of Form data
router.post("/create-hotel", requireSignin, formidable(), create);

module.exports = router;
