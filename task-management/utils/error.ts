export interface OperationalError {
  statusCode: number;
  code: string;
  message: string;
  details?: unknown;
  isOperational: true;
}

export function isOperationalError(
  error: unknown,
): error is OperationalError {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  const candidate = error as Record<string, unknown>;

  return (
    candidate.isOperational === true &&
    typeof candidate.statusCode === "number" &&
    typeof candidate.code === "string" &&
    typeof candidate.message === "string"
  );
}

export function getErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "An unexpected error occurred.";
}
