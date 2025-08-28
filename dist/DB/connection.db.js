"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const connectDB = async () => {
    try {
        const result = await (0, mongoose_1.connect)(process.env.DB_URI);
        console.log(result.models);
        console.log(`DB connected successfully ✅👌`);
    }
    catch (error) {
        console.log(`Fail to connect DB ❌`);
    }
};
exports.default = connectDB;
