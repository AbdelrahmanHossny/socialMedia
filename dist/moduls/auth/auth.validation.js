"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmEmail = exports.signup = exports.login = void 0;
const zod_1 = require("zod");
const validation_middleware_1 = require("../../middleware/validation.middleware");
exports.login = {
    body: zod_1.z.strictObject({
        email: validation_middleware_1.genralFields.email,
        password: validation_middleware_1.genralFields.password,
    }),
};
exports.signup = {
    body: exports.login.body.extend({
        username: validation_middleware_1.genralFields.username,
        confirmPassword: validation_middleware_1.genralFields.confirmPassword,
    }),
};
exports.confirmEmail = {
    body: zod_1.z.strictObject({
        email: validation_middleware_1.genralFields.email,
        otp: validation_middleware_1.genralFields.otp
    })
};
