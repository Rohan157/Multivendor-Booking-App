import express from "express";

const router = express.Router();

//middleware
import { requireSignin } from "../middlewares";

//COntrollers
import { createConnectAccount } from "../controllers/stripe";

router.post("/create-connect-account", requireSignin, createConnectAccount);
module.exports = router;
