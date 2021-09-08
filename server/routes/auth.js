import express from "express";

const router = express.Router();

//COntrollers
import { register } from "../controllers/auth";

// router.get("/:message", showMessage);
//here 2nd register is controller
router.post("/register", register);

module.exports = router;
