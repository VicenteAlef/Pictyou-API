import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.get("/hello", authController.hello);
router.get("/status", authController.status);
router.get("/users", authController.listUsers);
router.post("/users", authController.createUser);

export default router;
