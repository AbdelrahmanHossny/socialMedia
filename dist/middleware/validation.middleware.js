"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validation = void 0;
const error_response_1 = require("../moduls/utils/response/error.response");
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
