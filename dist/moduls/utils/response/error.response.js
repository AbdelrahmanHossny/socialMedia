"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalErrorHandling = exports.NotFoundException = exports.BadrequestException = exports.ApplicationExeption = void 0;
class ApplicationExeption extends Error {
    message;
    statusCode;
    cause;
    constructor(message, statusCode = 400, cause) {
        super();
        this.message = message;
        this.statusCode = statusCode;
        this.cause = cause;
        this.name = this.constructor.name;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.ApplicationExeption = ApplicationExeption;
class BadrequestException extends ApplicationExeption {
    constructor(message, cause) {
        super(message, 400, cause);
    }
}
exports.BadrequestException = BadrequestException;
class NotFoundException extends ApplicationExeption {
    constructor(message, cause) {
        super(message, 404, cause);
    }
}
exports.NotFoundException = NotFoundException;
const GlobalErrorHandling = (error, req, res, next) => {
    return res.status(error.statusCode || 500).json({
        errMessage: error.message || "somting went wrong !!❌",
        stack: process.env.MOOD === "Devolopment" ? error.stack : undefined,
        cause: error.cause,
        error,
    });
};
exports.GlobalErrorHandling = GlobalErrorHandling;
