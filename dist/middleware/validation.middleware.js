"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.genralFields = exports.validation = void 0;
const error_response_1 = require("../utils/response/error.response");
const zod_1 = require("zod");
const validation = (Schema) => {
    return (req, res, next) => {
        console.log(Schema);
        console.log(Object.keys(Schema));
        const validationErrors = [];
        for (const key of Object.keys(Schema)) {
            if (!Schema[key])
                continue;
            const validationRuselt = Schema[key].safeParse(req[key]);
            if (!validationRuselt.success) {
                const errors = validationRuselt.error;
                validationErrors.push({
                    key,
                    issues: errors.issues.map((issue) => {
                        return { message: issue.message, path: issue.path[0] };
                    }),
                });
            }
        }
        if (validationErrors.length) {
            throw new error_response_1.BadrequestException("validation-Error", {
                validationErrors,
            });
        }
        return next();
    };
};
exports.validation = validation;
exports.genralFields = {
    username: zod_1.z.string().min(2).max(20),
    email: zod_1.z.email(),
    password: zod_1.z
        .string()
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])(?!.*\s).{8,64}$/, {
        error: "Password must be 8-64 chars, include upper, lower, digit, special, and no spaces.",
    }),
    confirmPassword: zod_1.z.string(),
    otp: zod_1.z.string().regex(/^\d{6}$/),
};
