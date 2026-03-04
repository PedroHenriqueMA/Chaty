import { ActionResult } from "./definitions";

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ForbiddenError extends Error {
  constructor(message = "Forbidden") {
    super(message);
    this.name = "ForbiddenError";
  }
}

export class ValidationError extends Error {
  constructor(message = "Invalid data") {
    super(message);
    this.name = "ValidationError";
  }
}

export function handleActionError<T>(error: unknown): ActionResult<T> {
  if (error instanceof UnauthorizedError) {
    return { success: false, error: "You must be logged in." };
  }

  if (error instanceof ForbiddenError) {
    return { success: false, error: "You don't have permission." };
  }

  console.error("Unexpected error:", error);

  return { success: false, error: "Something went wrong." };
}