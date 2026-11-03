import express from "express";
const router = express.Router();
import {UserController} from "../controller/user.controller.js";

router.post("/register", UserController.createUser);

router.get("/:id", UserController.getByUserId);

router.get("/", UserController.getAllUsers);

router.put("/:id", UserController.updateUser);

router.post("/login", UserController.loginUser);

router.delete("/:id", UserController.deleteUser);

export default router;