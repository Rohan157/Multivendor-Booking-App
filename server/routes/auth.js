import express from "express";

const router = express.Router();

//COntrollers
import { showMessage } from "../controllers/auth";

router.get("/:message", showMessage);

module.exports = router;
