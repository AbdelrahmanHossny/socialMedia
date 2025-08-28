import { NextFunction, Request, Response } from "express";

export interface Ierror extends Error {
  statusCode: number;
}

export class ApplicationExeption extends Error {
  constructor(
    public override message: string,
    public statusCode: number =400,
    public override cause?: unknown
  ) {
    super();
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class BadrequestException extends ApplicationExeption {
  constructor(message: string, cause?: unknown) {
    super(message, 400, cause);
  }
}

export class NotFoundException extends ApplicationExeption {
  constructor(message: string, cause?: unknown) {
    super(message, 404, cause);
  }
}

export const GlobalErrorHandling = (
  error: Ierror,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return res.status(error.statusCode || 500).json({
    errMessage: error.message || "somting went wrong !!❌",
    stack: process.env.MOOD === "Devolopment" ? error.stack : undefined,
    cause: error.cause,
    error,
  });
};
