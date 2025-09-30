import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.get("/hello", authController.hello);
router.get("/status", authController.status);

export default router;
