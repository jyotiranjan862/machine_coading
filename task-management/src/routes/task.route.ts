import express from "express";
const router = express.Router();

import { TaskController } from "../controller/task.controller.js";



router.post("/", TaskController.createTask);
router.get("/:id", TaskController.getTaskById);
router.get("/", TaskController.getAllTasks);
router.put("/:id", TaskController.updateTask);
router.delete("/:id", TaskController.deleteTask);

export default router;
