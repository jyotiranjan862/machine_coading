import { Router } from "express";
import taskRouter from "./task.route.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/user", userRouter);
router.use("/task", taskRouter);

export default router;