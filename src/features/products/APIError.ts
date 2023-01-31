import { ApiError } from "../../types/types";

export class APIError extends Error {
  public readonly statusCode: string;
  public readonly message: string;

  constructor(statusCode?: string, message?: string) {
    super(message);

    this.statusCode = statusCode || "500";
    this.message = message || "Internal Server Error";
  }

  public toJSON(): ApiError {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
