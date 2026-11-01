import express from "express";
import { corsMiddleware } from "./task-management/middleware/cors.js";
import {
  errorHandler,
  notFoundHandler,
} from "./task-management/middleware/error.js";
import { globalRateLimiter } from "./task-management/middleware/rate-limit.js";
import { configureSecurity } from "./task-management/middleware/secuity.js";


const app = express();
const port = process.env.PORT || 3000;

configureSecurity(app);
app.use(corsMiddleware);
app.use(globalRateLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});