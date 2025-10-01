import express from "express";
import authController from "../controller/authController.js";
const router = express.Router();

router.get("/users", authController.listUsers);
router.get("/users/:id", authController.getUserById);
router.post("/signin", authController.signin);

export default router;
