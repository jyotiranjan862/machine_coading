import type {
  NextFunction,
  Request,
  Response,
} from "express";
import {
  getErrorMessage,
  isOperationalError,
} from "../utils/error.js";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly isOperational: boolean;
  public readonly details?: unknown;

  constructor(
    message: string,
    statusCode = 500,
    code = "INTERNAL_SERVER_ERROR",
    details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = statusCode < 500;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class NotFoundError extends AppError {
  constructor(path: string) {
    super(`Route not found: ${path}`, 404, "ROUTE_NOT_FOUND");
    this.name = "NotFoundError";
  }
}

export function notFoundHandler(
  request: Request,
  _response: Response,
  next: NextFunction,
): void {
  next(new NotFoundError(request.originalUrl));
}

export function errorHandler(
  error: unknown,
  _request: Request,
  response: Response,
  _next: NextFunction,
): void {
  const operationalError = isOperationalError(error);
  const appError = operationalError
    ? error
    : new AppError("An unexpected error occurred.");

  if (!operationalError) {
    console.error(error);
  }

  const body: {
    status: "error";
    code: string;
    message: string;
    details?: unknown;
  } = {
    status: "error",
    code: appError.code,
    message:
      appError.statusCode >= 500
        ? getErrorMessage(appError)
        : appError.message,
  };

  if (appError.details !== undefined && appError.statusCode < 500) {
    body.details = appError.details;
  }

  response.status(appError.statusCode).json(body);
}