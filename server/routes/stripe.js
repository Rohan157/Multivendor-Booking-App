import express from "express";

const router = express.Router();

//middleware
import { requireSignin } from "../middlewares";

//COntrollers
import {
  createConnectAccount,
  getAccountStatus,
  getAccountBalance,
  payoutSetting,
  stripeSessionId,
  stripeSuccess,
} from "../controllers/stripe";

router.post("/create-connect-account", requireSignin, createConnectAccount);
router.post("/get-account-status", requireSignin, getAccountStatus);
router.post("/get-account-balance", requireSignin, getAccountBalance);
router.post("/payout-setting", requireSignin, payoutSetting);
//for checkout
router.post("/stripe-session-id", requireSignin, stripeSessionId);

//related to order schema
router.post("/stripe-success", requireSignin, stripeSuccess);

module.exports = router;
