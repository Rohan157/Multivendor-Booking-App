import express from "express";

const router = express.Router();

//COntrollers
import { register, login } from "../controllers/auth";

// router.get("/:message", showMessage);
//here 2nd register is controller
router.post("/register", register);
router.post("/login", login);

module.exports = router;
