
import { rateLimit } from "express-rate-limit";

const parseEnvNumber = (
  value: string | undefined,
  fallback: number
): number => {
  if (!value) return fallback;

  const parsed = Number(value);

  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw new Error(`Invalid rate limit configuration: ${value}`);
  }

  return parsed;
};

const windowMinutes = parseEnvNumber(
  process.env.RATE_LIMIT_TIMER,
  15
);

const windowMs = windowMinutes * 60 * 1000;

const globalLimit = parseEnvNumber(
  process.env.GLOBAL_RATE_LIMIT_MAX,
  150
);

const authLimit = parseEnvNumber(
  process.env.AUTH_RATE_LIMIT_MAX,
  15
);

export const globalRateLimiter = rateLimit({
  windowMs,
  limit: globalLimit,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many requests. Please try again later.",
  },
});

export const authRateLimiter = rateLimit({
  windowMs,
  limit: authLimit,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  message: {
    status: "error",
    message: "Too many authentication attempts. Please try again later.",
  },
});
