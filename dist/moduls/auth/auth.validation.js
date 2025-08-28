"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = void 0;
const zod_1 = require("zod");
exports.signup = {
    body: zod_1.z.object({
        username: zod_1.z.string().min(2).max(20),
        email: zod_1.z.email(),
        password: zod_1.z
            .string()
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])(?!.*\s).{8,64}$/, {
            error: "Password must be 8-64 chars, include upper, lower, digit, special, and no spaces.",
        }),
        confirmPassword: zod_1.z.string(),
    }),
};
