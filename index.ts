import express from "express";
import { corsMiddleware } from "./task-management/middleware/cors.js";
import {
  errorHandler,
  notFoundHandler,
} from "./task-management/middleware/error.js";
import { globalRateLimiter } from "./task-management/middleware/rate-limit.js";
import { configureSecurity } from "./task-management/middleware/secuity.js";
import dotenv from "dotenv";
import { connectDB } from "./task-management/config/db.js";
import routes from "./task-management/src/routes/allroute.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
configureSecurity(app);
app.use(corsMiddleware);
app.use(globalRateLimiter);
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(routes);

app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    message: "server is running",
  });
});

app.use(notFoundHandler);
app.use(errorHandler);

async function startServer(): Promise<void> {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error: unknown) {
    console.error("Unable to start server because MongoDB connection failed.", error);
    process.exitCode = 1;
  }
}

void startServer();
